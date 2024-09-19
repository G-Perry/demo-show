<template>
  <section class="three_column">
    <div class="left">
      <span>options</span>
      <node-options ref="leftOptions"></node-options>
    </div>
    <div class="middle">
      <middle-svg ref="middleSvg"></middle-svg>
    </div>
    <div class="right">
      <button type="button" @click="handleExport">保存到缓存</button>
      <button type="button" @click="handleInport">从缓存读取</button>
      <button type="button" @click="handleClear">清除缓存</button>
    </div>
  </section>
</template>

<script>
import middleSvg from "./components/middleSvg.vue";
import nodeOptions from "./components/leftFlowNodeOption.vue";
import { UUID } from "@/utils/handleObjMethods";
export default {
  components: { middleSvg, nodeOptions },
  data() {
    return {
      // 左侧选项的位置信息
      optionRect: null,
      // 中间svg的位置信息
      svgRect: null,
      // 鼠标按下的区域
      mouseDownRegion: null,
      // 左侧选项区域点击信息
      optionRegionMosueEvent: null,
      // svg区域的点击信息
      svgMosueEvent: null,
      // svg中点击了流程节点
      svgFlowNodeEvent: null,
      // svg中点击了流程节点的点
      svgNodeDotEvent: null,
      // 被点击dom的初始位置
      domInitPosition: null,
      // 点击坐标与被点击dom的偏移量
      eventOffsetTarget: null,
    };
  },
  methods: {
    // 当页面resize是重新获取两者的位置信息
    handleWindowResize() {
      this.optionRect = this.$refs.leftOptions.getSelfRect();
      this.svgRect = this.$refs.middleSvg.getSelfRect();
    },
    //获取鼠标点击的区域
    getMouseDownPosition(moseDownEvent) {
      const rect1 = this.optionRect;
      const rect2 = this.svgRect;
      const mouseX = moseDownEvent.clientX;
      const mouseY = moseDownEvent.clientY;

      let insideOptionRect =
        mouseX >= rect1.left &&
        mouseX <= rect1.right &&
        mouseY >= rect1.top &&
        mouseY <= rect1.bottom;
      let insideSvgRect =
        mouseX >= rect2.left &&
        mouseX <= rect2.right &&
        mouseY >= rect2.top &&
        mouseY <= rect2.bottom;
      if (insideOptionRect) {
        return "optionRegion";
      } else if (insideSvgRect) {
        return "svgRegion";
      } else {
        return null;
      }
    },

    findTarget(obj, depth = 0, sign = "flow_node") {
      if (depth > 1) {
        return undefined;
      }
      if (obj.classList.contains(sign)) {
        return obj;
      } else if (obj.parentNode) {
        return this.findTarget(obj.parentNode, depth + 1, sign);
      } else {
        return undefined;
      }
    },
    handleMouseDown(event) {
      // 先获取点击的区域
      this.mouseDownRegion = this.getMouseDownPosition(event);
      switch (this.mouseDownRegion) {
        case "optionRegion":
          let target = this.findTarget(event.target);
          if (target) {
            let domCopy = target.cloneNode(true);
            domCopy.classList.add("moveDom");
            domCopy.id = target.id + "_copy";

            let position = target.getBoundingClientRect();
            domCopy.style.left = position.left + "px";
            domCopy.style.top = position.top + "px";

            document.body.appendChild(domCopy);
            this.optionRegionMosueEvent = {
              x: event.clientX,
              y: event.clientY,
            };
            this.domInitPosition = {
              x: position.left,
              y: position.top,
            };
            this.eventOffsetTarget = {
              x: event.clientX - position.left,
              y: event.clientY - position.top,
            };
          }
          break;
        case "svgRegion":
          this.svgMosueEvent = { x: event.clientX, y: event.clientY };
          document.querySelector("svg").style.cursor = "grabbing";

          break;

        default:
          break;
      }
    },
    handleMouseMove(event) {
      switch (this.mouseDownRegion) {
        case "optionRegion":
          // 用于移动左侧的选项
          if (this.optionRegionMosueEvent) {
            let dom = document.querySelector(".moveDom");
            dom.style.left =
              this.domInitPosition.x +
              event.clientX -
              this.optionRegionMosueEvent.x +
              "px";
            dom.style.top =
              this.domInitPosition.y +
              event.clientY -
              this.optionRegionMosueEvent.y +
              "px";
          }
          break;
        case "svgRegion":
          let SVG = this.$refs.middleSvg;
          // 用于移动svg
          if (this.svgMosueEvent) {
            SVG.translateX =
              SVG.savedTranslateX + event.clientX - this.svgMosueEvent.x;
            SVG.translateY =
              SVG.savedTranslateY + event.clientY - this.svgMosueEvent.y;
          }
          // 用于移动流程节点
          if (this.svgFlowNodeEvent) {
            let node = SVG.nodesCollection[SVG.selectedNode.sign].find(
              (item) => item.key == SVG.selectedNode.key
            );
            node.x =
              SVG.selectedNode.x + event.clientX - this.svgFlowNodeEvent.x;
            node.y =
              SVG.selectedNode.y + event.clientY - this.svgFlowNodeEvent.y;
            SVG.$nextTick(() => {
              SVG.drawLinesByIds();
            });
          }
          if (this.svgNodeDotEvent) {
            // let lineCount = SVG.lines.length;
            // let line = SVG.lines[lineCount - 1];
            // line.tarX =
            //   SVG.srcDotPosition.x + event.clientX - this.svgNodeDotEvent.x;
            // line.tarY =
            //   SVG.srcDotPosition.y + event.clientY - this.svgNodeDotEvent.y;
            SVG.temporaryLineIsShow = true;
            SVG.temporaryLine.tarX =
              SVG.srcDotPosition.x + event.clientX - this.svgNodeDotEvent.x;
            SVG.temporaryLine.tarY =
              SVG.srcDotPosition.y + event.clientY - this.svgNodeDotEvent.y;
          }

          break;

        default:
          break;
      }
    },

    handleMouseUp(event) {
      let SVG = this.$refs.middleSvg;
      switch (this.mouseDownRegion) {
        case "optionRegion":
          let dom = document.querySelector(".moveDom");
          if (dom) {
            if (
              !(
                event.clientX < this.svgRect.left ||
                event.clientX > this.svgRect.right ||
                event.clientY < this.svgRect.top ||
                event.clientY > this.svgRect.bottom
              )
            ) {
              let domCopy = dom.cloneNode(true);
              let sign = domCopy.id.replace("_copy", "");
              domCopy.removeAttribute("id");
              domCopy.removeAttribute("style");
              domCopy.classList.remove("moveDom");

              let node = {
                key: UUID(),
                nodeType: sign,
                x:
                  event.clientX -
                  this.svgRect.left -
                  SVG.translateX -
                  this.eventOffsetTarget.x,
                y:
                  event.clientY -
                  this.svgRect.top -
                  SVG.translateY -
                  this.eventOffsetTarget.y,
                width: dom.offsetWidth,
                height: dom.offsetHeight,
                html: domCopy.outerHTML,
                points: [],
                // point: {
                //   receivePoint: [],
                //   emitPoint: [],
                // },
              };
              this.initNodePoints(node);
              // console.log(sign, 111);

              SVG.nodesCollection[sign].push(node);
              // console.log(SVG.nodesCollection, 111);
            }
            dom.remove();
            this.optionRegionMosueEvent = null;
            this.domInitPosition = null;
            this.eventOffsetTarget = null;
            this.mouseDownRegion = null;
          }
          break;
        case "svgRegion":
          this.svgMosueEvent = null;

          this.svgFlowNodeEvent = null;
          SVG.selectedNode = null;

          if (this.svgNodeDotEvent) {
            let element = document.elementFromPoint(
              event.clientX,
              event.clientY
            );
            if (element.tagName.toUpperCase() === "CIRCLE") {
              let rect = SVG.getDotCenterPositionInWindow(element.id);
              // let lineCount = SVG.lines.length;
              // let line = SVG.lines[lineCount - 1];
              // line.tarX = rect.x - this.svgRect.left - SVG.translateX;
              // line.tarY = rect.y - this.svgRect.top - SVG.translateY;
              SVG.temporaryLine.tarX =
                rect.x - this.svgRect.left - SVG.translateX;
              SVG.temporaryLine.tarY =
                rect.y - this.svgRect.top - SVG.translateY;
              SVG.connectionInfo.push({
                id: UUID(),
                srcDotId: SVG.temporaryLine.srcDotId,
                tarDotId: element.id,
                color: SVG.temporaryLine.color,
              });
              // console.log(SVG.temporaryLine,111);

              SVG.temporaryLineIsShow = false;
              SVG.$nextTick(() => {
                SVG.drawLinesByIds();
              });
            } else {
              // SVG.lines.pop();
              SVG.temporaryLineIsShow = false;
            }
            this.svgNodeDotEvent = null;
            SVG.srcDotPosition = null;
          }

          SVG.savedTranslateX = SVG.translateX;
          SVG.savedTranslateY = SVG.translateY;
          SVG.$el.style.cursor = "grab";
          break;

        default:
          break;
      }
    },
    // 初始化节点的点信息,用于连线
    initNodePoints(node) {
      let dot = null;
      function createDotAndPush(count, attribute, colorMap) {
        switch (attribute) {
          case "receive":
            dot = {
              id: UUID(),
              attribute: attribute,
              color: "#52c41a",
            };
            node.points.push(dot);
            break;
          case "emit":
            for (let i = 0; i < count; i++) {
              dot = {
                id: UUID(),
                attribute: attribute,
                color: colorMap[i % colorMap.length],
              };
              node.points.push(dot);
            }
            break;

          default:
            break;
        }
      }
      switch (node.nodeType) {
        case "node_start":
          createDotAndPush(1, "emit", ["#8ec9ff"]);
          break;
        case "node_branch":
          createDotAndPush(1, "receive");
          createDotAndPush(2, "emit", ["#67cb8a", "#bcc0ce"]);
          break;
        case "node_examine":
          createDotAndPush(1, "receive");
          createDotAndPush(2, "emit", ["#52be70", "#fd4c6a"]);
          break;
        case "node_manual":
          createDotAndPush(1, "receive");
          createDotAndPush(1, "emit", ["#8ec9ff"]);
          break;
        case "node_auto":
          createDotAndPush(1, "receive");
          createDotAndPush(1, "emit", ["#8ec9ff"]);
          break;
        case "node_end":
          createDotAndPush(1, "receive");
          break;

        default:
          break;
      }
    },
    handleExport() {
      let SVG = this.$refs.middleSvg;

      let nodes = SVG.nodesCollection;
      let lines = SVG.connectionInfo;
      localStorage.setItem("svgNodesInfo", JSON.stringify(nodes));
      localStorage.setItem("svgLinesInfo", JSON.stringify(lines));
    },
    handleInport() {
      let SVG = this.$refs.middleSvg;
      let nodes = localStorage.getItem("svgNodesInfo");
      SVG.nodesCollection = nodes
        ? JSON.parse(nodes)
        : {
            node_start: [],
            node_branch: [],
            node_examine: [],
            node_manual: [],
            node_auto: [],
            node_end: [],
          };
      let lines = localStorage.getItem("svgLinesInfo");
      SVG.connectionInfo = lines ? JSON.parse(lines) : [];
      SVG.$nextTick(() => {
        SVG.drawLinesByIds();
      });
    },
    handleClear() {
      localStorage.clear();
      alert("Local Storage cleared!");
    },
  },
  mounted() {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  },
};
</script>

<style scoped>
.three_column {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
}
.left,
.right {
  flex: 1;
  overflow: hidden;
}
.middle {
  flex: 5;
  overflow: hidden;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.right {
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>