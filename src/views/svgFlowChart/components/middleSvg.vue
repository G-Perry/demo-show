<template>
  <!-- @mouseup="handleMouseUp" -->
  <!-- @mousedown="handleMouseDown" -->
  <!-- @mousemove="handleMouseMove" -->
  <!-- @wheel.stop="handleWheel" -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="100%"
    height="100%"
    ref="svg"
  >
    <defs>
      <marker
        v-for="m in arrowMarkerColor"
        :key="m.id"
        :id="m.id"
        markerWidth="10"
        markerHeight="10"
        refX="6"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <!-- :fill="m.color" -->
        <path
          d="M 1 5 L 6 3 L 1 1"
          stroke-width="1"
          fill="none"
          :stroke="m.color"
        />
      </marker>
    </defs>
    <g
      ref="canvas"
      :transform="`translate(${translateX},${translateY})scale(${scaleCoefficient})`"
    >
      <path
        v-if="temporaryLineIsShow"
        :d="`M ${temporaryLine.srcX} ${temporaryLine.srcY} L ${temporaryLine.tarX} ${temporaryLine.tarY}`"
        :stroke="temporaryLine.color"
        stroke-width="2"
        fill="none"
      />
      <path
        v-for="line in lines"
        :key="line.id"
        :d="`M ${line.srcX} ${line.srcY} L ${line.tarX} ${line.tarY}`"
        :stroke="line.color"
        stroke-width="2"
        fill="none"
        :marker-end="`url(#${line.markerId})`"
      />
      <template v-for="nodeClassification in nodesCollection">
        <g
          v-for="node in nodeClassification"
          :key="node.id"
          :transform="`translate(${node.x},${node.y})`"
          @mousedown="
            (event) => handleFlowNodeMouseDown(event, node.nodeType, node)
          "
          :class="{ showReceiveDot: showReceiveDot, dotNodeFocus: node.focus }"
        >
          <foreignObject
            :width="node.width"
            :height="node.height"
            v-html="$options.filters.htmlFilter(node)"
            @click="(event) => handleNodeSettingOpen(event, node)"
          >
          </foreignObject>
          <circle
            r="4"
            v-for="(dot, index) in node.points"
            :id="dot.id"
            :key="dot.id"
            :fill="dot.color"
            :transform="dot | transformDotPosition(index, node)"
            :class="dot.attribute"
            @mousedown="(event) => handleNodeDotMouseDown(event, dot, node)"
          ></circle>
        </g>
      </template>
    </g>
  </svg>
</template>

<script>
// import { svgMoveEvent } from "./svgMoveEvent";
// import { UUID } from "@/utils/handleObjMethods";
export default {
  // mixins: [svgMoveEvent],
  data() {
    return {
      // 整个svg的位置调整
      translateX: 0,
      translateY: 0,
      savedTranslateX: 0,
      savedTranslateY: 0,
      // 整个svg的缩放比例
      scaleCoefficient: 1,
      // 节点信息
      nodesCollection: {
        node_start: [],
        node_branch: [],
        node_examine: [],
        node_manual: [],
        node_auto: [],
        node_end: [],
      },
      // 用于移动单个节点位置时暂存的数据
      selectedNode: null,
      // 连线信息，起始点的id，对应节点id
      connectionInfo: [],
      // 用于连线的起始点的位置信息
      srcDotPosition: null,
      // 临时的线用于从点出发画线
      temporaryLine: null,
      temporaryLineIsShow: false,
      // 绘制最终连线的信息
      lines: [],
      // 用于不同颜色连线的箭头
      arrowMarkerColor: [],
      // 点击发出点时显示接收点
      showReceiveDot: false,
      // 用于节点移动时忽略点击事件
      allowClick: true,
    };
  },
  filters: {
    htmlFilter(node) {
      const regex = />([^<]+)</;
      const replacedString = node.html.replace(regex, `>${node.text}<`);
      return replacedString;
    },
    transformDotPosition(dot, index, node) {
      let nodeType = node.nodeType;
      let dotCount = node.points.length;

      switch (dot.attribute) {
        case "receive":
          return "matrix(1, 0, 0, 1, 83, -5)";
        case "emit":
          if (nodeType == "node_examine") {
            if (index == 1) return "matrix(1, 0, 0, 1, 50, 63)";
            if (index == 2) return "matrix(1, 0, 0, 1, 116, 63)";
          } else if (nodeType == "node_branch") {
            if (index == 1) return "matrix(1, 0, 0, 1, 0, 44)";
            if (index == 2) return "matrix(1, 0, 0, 1, 168, 44)";
            if (dotCount > 3) {
            }
          } else {
            return "matrix(1, 0, 0, 1, 83, 63)";
          }
          break;

        default:
          break;
      }
    },
  },
  computed: {
    // 所有的点信息合集，用于校验能否连线
    allDotInfos() {
      let infos = [];
      for (let i in this.nodesCollection) {
        this.nodesCollection[i].forEach((item) => {
          infos.push(...item.points);
        });
      }
      return infos;
    },
  },
  methods: {
    // 获取自身在视口内的位置
    getSelfRect() {
      return this.$el.getBoundingClientRect();
    },
    // 用于节点的移动
    handleFlowNodeMouseDown(event, sign, item) {
      let that = this.$parent;
      that.svgFlowNodeEvent = { x: event.clientX, y: event.clientY };
      that.mouseDownRegion = "svgRegion";
      this.selectedNode = {
        sign: sign,
        id: item.id,
        x: item.x,
        y: item.y,
      };
      event.stopPropagation();
    },
    // 获取点在视口的位置
    getDotCenterPositionInWindow(id) {
      let dotRect = document.getElementById(id).getBoundingClientRect();
      return { x: dotRect.x + 4, y: dotRect.y + 4 };
    },
    // 获取点在svg中相对的位置
    getDotCenterPositionInSvg(id) {
      let dotRect = document.getElementById(id).getBoundingClientRect();
      let that = this.$parent;
      return {
        x: dotRect.x + 4 - that.svgRect.left - this.translateX,
        y: dotRect.y + 4 - that.svgRect.top - this.translateY,
      };
    },
    // 用于连线设置临时的连线信息
    handleNodeDotMouseDown(event, dot, node) {
      this.showReceiveDot = true;
      node.focus = true;
      let that = this.$parent;
      that.mouseDownRegion = "svgRegion";
      that.svgNodeDotEvent = this.getDotCenterPositionInWindow(dot.id);
      let x = that.svgNodeDotEvent.x - that.svgRect.left - this.translateX;
      let y = that.svgNodeDotEvent.y - that.svgRect.top - this.translateY;
      this.temporaryLine = {
        srcDotId: dot.id,
        srcX: x,
        srcY: y,
        tarX: x,
        tarY: y,
        color: dot.color,
        node,
      };
      this.srcDotPosition = {
        x: x,
        y: y,
      };
      event.stopPropagation();
    },
    // 根据颜色选择对应的箭头复用模板
    getArrowMarkerIdByColor(color) {
      return (
        this.arrowMarkerColor.find((item) => item.color == color)?.id || ""
      );
    },
    // 通过始末点的id寻找对应位置，再绘制连线
    drawLinesByIds() {
      this.lines = [];
      this.connectionInfo.forEach((item) => {
        let p1 = this.getDotCenterPositionInSvg(item.srcDotId);
        let p2 = this.getDotCenterPositionInSvg(item.tarDotId);
        let markerId = this.getArrowMarkerIdByColor(item.color);
        this.lines.push({
          id: item.id,
          srcX: p1.x,
          srcY: p1.y,
          tarX: p2.x,
          tarY: p2.y,
          color: item.color,
          markerId,
        });
      });
    },
    // 点击节点打开配置
    handleNodeSettingOpen(event, node) {
      if (this.allowClick) {
        this.$emit("openNodeSetting", node);
        this.$parent.allowMove = false;
      }
      event.stopPropagation();
    },
  },
  mounted() {},
};
</script>

<style scoped>
svg {
  cursor: grab;
}
circle {
  cursor: crosshair;
}
.showReceiveDot .receive {
  visibility: visible;
}
.dotNodeFocus .receive,
.receive {
  visibility: hidden;
}
</style>