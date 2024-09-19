<template>
  <!-- @wheel.stop="handleWheel" -->
  <!-- @mouseup="handleMouseUp" -->
  <!-- @mousedown="handleMouseDown" -->
  <!-- @mousemove="handleMouseMove" -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="100%"
    height="100%"
    ref="svg"
  >
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
        :key="line.key"
        :d="`M ${line.srcX} ${line.srcY} L ${line.tarX} ${line.tarY}`"
        :stroke="line.color"
        stroke-width="2"
        fill="none"
      />
      <template v-for="nodeClassification in nodesCollection">
        <g
          v-for="node in nodeClassification"
          :key="node.key"
          :transform="`translate(${node.x},${node.y})`"
          @mousedown="
            (event) => handleFlowNodeMouseDown(event, node.nodeType, node)
          "
        >
          <foreignObject
            :width="node.width"
            :height="node.height"
            v-html="node.html"
          >
          </foreignObject>
          <circle
            r="4"
            v-for="(dot, index) in node.points"
            :id="dot.id"
            :key="dot.id"
            :fill="dot.color"
            :transform="dot | transformDotPosition(index, node)"
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
      // 连线信息
      connectionInfo: [],
      // 用于连线的起始点的位置信息
      srcDotPosition: null,
      // 临时的线用于从点出发画线
      temporaryLine: null,
      temporaryLineIsShow: false,
      // 绘制最终连线的信息
      lines: [],
    };
  },
  filters: {
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
  methods: {
    handleWheel(event) {
      // 阻止事件冒泡和默认行为，防止整个页面滚动
      event.preventDefault();
      event.stopPropagation();

      // 获取 svg 元素的尺寸
      const svgRect = this.$refs.svg.getBoundingClientRect();
      const centerX = svgRect.width / 2;
      const centerY = svgRect.height / 2;

      // 计算缩放前的中心点位置
      const oldCenterX = (centerX - this.translateX) / this.scaleCoefficient;
      const oldCenterY = (centerY - this.translateY) / this.scaleCoefficient;

      // 更新缩放系数
      const newScale =
        this.scaleCoefficient * (1 - Math.sign(event.deltaY) * 0.1);

      // 计算新的中心点位置
      const newCenterX = oldCenterX * newScale;
      const newCenterY = oldCenterY * newScale;

      // 调整 translateX 和 translateY 以保持中心点位置不变
      this.translateX = centerX - newCenterX;
      this.translateY = centerY - newCenterY;

      // 为鼠标移动事件存储数据
      this.savedTranslateX = this.translateX;
      this.savedTranslateY = this.translateY;

      // 应用新的缩放系数
      this.scaleCoefficient = newScale;
    },
    handleFlowNodeMouseDown(event, sign, item) {
      let that = this.$parent;
      that.svgFlowNodeEvent = { x: event.clientX, y: event.clientY };
      that.mouseDownRegion = "svgRegion";
      this.selectedNode = {
        sign: sign,
        key: item.key,
        x: item.x,
        y: item.y,
      };

      event.stopPropagation();
    },
    getDotCenterPositionInWindow(id) {
      let dotRect = document.getElementById(id).getBoundingClientRect();
      return { x: dotRect.x + 4, y: dotRect.y + 4 };
    },
    getDotCenterPositionInSvg(id) {
      let dotRect = document.getElementById(id).getBoundingClientRect();
      let that = this.$parent;
      return {
        x: dotRect.x + 4 - that.svgRect.left - this.translateX,
        y: dotRect.y + 4 - that.svgRect.top - this.translateY,
      };
    },

    handleNodeDotMouseDown(event, dot, node) {
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
      };
      this.srcDotPosition = {
        x: x,
        y: y,
      };
      // console.log(this.temporaryLine,222);

      // this.lines.push(data);
      event.stopPropagation();
    },
    getSelfRect() {
      return this.$el.getBoundingClientRect();
    },
    drawLinesByIds() {
      this.lines = [];
      this.connectionInfo.forEach((item) => {
        let p1 = this.getDotCenterPositionInSvg(item.srcDotId);
        let p2 = this.getDotCenterPositionInSvg(item.tarDotId);
        this.lines.push({
          id: item.id,
          srcX: p1.x,
          srcY: p1.y,
          tarX: p2.x,
          tarY: p2.y,
          color: item.color,
        });
      });
      console.log(this.lines, 222);
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
</style>