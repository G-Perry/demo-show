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
    @contextmenu.prevent="rightClick"
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
      <g v-for="line in lines" :key="line.id" :id="line.id">
        <path
          :d="`M ${line.srcX} ${line.srcY} L ${line.tarX} ${line.tarY}`"
          stroke="transparent"
          stroke-width="15"
          fill="none"
          :class="{ showReceiveDot: showReceiveDot }"
          stroke-linejoin="round"
          stroke-linecap="round"
          cursor="pointer"
          self-attr-type="relatedLine"
          :self-attr-id="line.id"
        />
        <path
          :d="`M ${line.srcX} ${line.srcY} L ${line.tarX} ${line.tarY}`"
          :stroke="line.color"
          stroke-width="2"
          fill="none"
          :marker-end="`url(#${line.markerId})`"
          :class="{ showReceiveDot: showReceiveDot }"
          cursor="pointer"
          self-attr-type="relatedLine"
          :self-attr-id="line.id"
        />
        <g v-if="line.lineHaveText">
          <rect
            v-if="line.textRectIsShow"
            :x="line.lineText.x - line.lineText.textWidth / 2"
            :y="line.lineText.y - 8"
            :width="line.lineText.textWidth"
            height="16"
            fill="#fff"
            stroke="none"
            stroke-width="0"
            self-attr-type="relatedLine"
            :self-attr-id="line.id"
          ></rect>
          <text
            :x="line.lineText.x"
            :y="line.lineText.y"
            font-size="12"
            fill="#9094a6"
            text-anchor="middle"
            transform="translate(0, 4.8)"
            cursor="pointer"
            self-attr-type="relatedLine"
            :self-attr-id="line.id"
          >
            {{ line.lineText.text }}
          </text>
        </g>
      </g>
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
            @contextmenu.prevent.stop="(event) => rightClick(event, node)"
          >
          </foreignObject>
          <!-- <text
            :x="50"
            :y="50"
            font-size="12"
            fill="#9094a6"
            text-anchor="middle"
            transform="translate(0, 4.8)"
            cursor="pointer"
            self-attr-type="relatedLine"
          >
            {{ node.id }}
          </text> -->
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
      // 绘制最终连线和描述的信息
      lines: [],
      texts: [],
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
      function setBranchDot(count, index) {
        switch (count) {
          case 1:
            return "matrix(1, 0, 0, 1, 83, 95)";
          case 2:
            if (index == 1) return "matrix(1, 0, 0, 1, 0, 44)";
            if (index == 2) return "matrix(1, 0, 0, 1, 168, 44)";
            break;
          case 3:
            if (index == 1) return "matrix(1, 0, 0, 1, 0, 44)";
            if (index == 2) return "matrix(1, 0, 0, 1, 83, 95)";
            if (index == 3) return "matrix(1, 0, 0, 1, 168, 44)";
            break;
          case 4:
            if (index == 1) return "matrix(1, 0, 0, 1, 0, 44)";
            if (index == 2) return "matrix(1, 0, 0, 1, 44, 72)";
            if (index == 3) return "matrix(1, 0, 0, 1, 124, 72)";
            if (index == 4) return "matrix(1, 0, 0, 1, 168, 44)";
            break;
          case 5:
            if (index == 1) return "matrix(1, 0, 0, 1, 0, 44)";
            if (index == 2) return "matrix(1, 0, 0, 1, 44, 72)";
            if (index == 3) return "matrix(1, 0, 0, 1, 83, 95)";
            if (index == 4) return "matrix(1, 0, 0, 1, 124, 72)";
            if (index == 5) return "matrix(1, 0, 0, 1, 168, 44)";
            break;
          case 6:
            if (index == 1) return "matrix(1, 0, 0, 1, 0, 44)";
            if (index == 2) return "matrix(1, 0, 0, 1, 33, 66)";
            if (index == 3) return "matrix(1, 0, 0, 1, 66, 85)";
            if (index == 4) return "matrix(1, 0, 0, 1, 102, 85)";
            if (index == 5) return "matrix(1, 0, 0, 1, 135, 66)";
            if (index == 6) return "matrix(1, 0, 0, 1, 168, 44)";
            break;
          case 7:
            if (index == 1) return "matrix(1, 0, 0, 1, 0, 44)";
            if (index == 2) return "matrix(1, 0, 0, 1, 25, 63)";
            if (index == 3) return "matrix(1, 0, 0, 1, 53, 80)";
            if (index == 4) return "matrix(1, 0, 0, 1, 83, 95)";
            if (index == 5) return "matrix(1, 0, 0, 1, 113, 80)";
            if (index == 6) return "matrix(1, 0, 0, 1, 143, 63)";
            if (index == 7) return "matrix(1, 0, 0, 1, 168, 44)";
            break;
          case 8:
            if (index == 1) return "matrix(1, 0, 0, 1, 0, 44)";
            if (index == 2) return "matrix(1, 0, 0, 1, 24, 62)";
            if (index == 3) return "matrix(1, 0, 0, 1, 48, 76)";
            if (index == 4) return "matrix(1, 0, 0, 1, 72, 88)";
            if (index == 5) return "matrix(1, 0, 0, 1, 96, 88)";
            if (index == 6) return "matrix(1, 0, 0, 1, 120, 76)";
            if (index == 7) return "matrix(1, 0, 0, 1, 144, 62)";
            if (index == 8) return "matrix(1, 0, 0, 1, 168, 44)";
            break;

          default:
            break;
        }
      }

      switch (dot.attribute) {
        case "receive":
          return "matrix(1, 0, 0, 1, 83, -5)";
        case "emit":
          if (nodeType == "node_examine") {
            if (index == 1) return "matrix(1, 0, 0, 1, 50, 63)";
            if (index == 2) return "matrix(1, 0, 0, 1, 116, 63)";
          } else if (nodeType == "node_branch") {
            return setBranchDot(dotCount - 1, index);
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
      if (event.button === 2) {
        // 右键点击
        return;
      }
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
      if (event.button === 2) {
        // 右键点击
        return;
      }
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
        lineHaveText: dot.haveText,
        lineText: dot.text,
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
      this.texts = [];
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
          markerId: markerId,
          lineHaveText: item.lineHaveText,
          textRectIsShow: false,
          lineText: {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
            text: item.lineText,
            textWidth: 0,
          },
        });
      });
      this.$nextTick(() => {
        this.drawTextRects();
      });
    },
    // 等文字渲染完成后，获取文字宽度，再绘制文字的矩形背景
    drawTextRects() {
      this.lines.forEach((item) => {
        if (item.lineHaveText) {
          let textRect = document.getElementById(item.id).lastChild.getBBox();
          item.lineText.textWidth = textRect.width;
          item.textRectIsShow = true;
        }
      });
    },
    // 点击节点打开配置
    handleNodeSettingOpen(event, node) {
      if (
        this.allowClick &&
        ["node_start", "node_end"].indexOf(node.nodeType) == -1
      ) {
        this.$emit("openNodeSetting", node);
        this.$parent.allowMove = false;
      }
      // 关闭右键菜单
      let that = this.$parent;
      that.contextMenuVisible = false;
      event.stopPropagation();
    },
    // 打开右键菜单并配置字段信息
    rightClick(event, node) {
      let that = this.$parent;
      // that.contextMenuVisible = false;
      // that.menuInfo = {
      //   left: 0,
      //   top: 0,
      //   label: "",
      //   actionType: "",
      //   elementType: "",
      //   actionId: "",
      // };
      let rect = this.$el.getBoundingClientRect();
      let thatRect = that.$el.getBoundingClientRect();
      let left = event.clientX - rect.left + thatRect.left + 20;
      let top = event.clientY - rect.top;
      let maxLeft = rect.right - rect.left + thatRect.left - 75;
      let maxTop = rect.bottom - rect.top - 45;
      that.menuInfo.left = left > maxLeft ? maxLeft : left;
      that.menuInfo.top = top > maxTop ? maxTop : top;
      if (node) {
        that.menuInfo.label = "删除节点";
        that.menuInfo.actionType = "delNode";
        that.menuInfo.actionId = node.id;
        that.menuInfo.elementType = node.nodeType;
        that.contextMenuVisible = true;
      } else {
        let element = document.elementFromPoint(event.clientX, event.clientY);
        let type = element.getAttribute("self-attr-type");
        let id = element.getAttribute("self-attr-id");
        if (type == "relatedLine") {
          that.menuInfo.label = "删除连线";
          that.menuInfo.actionType = "delLine";
          that.menuInfo.actionId = id;
          that.menuInfo.elementType = "line";
          that.contextMenuVisible = true;
        }
      }
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
text {
  user-select: none;
}
</style>