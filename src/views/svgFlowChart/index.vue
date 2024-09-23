<template>
  <section class="three_column">
    <div class="left">
      <span>options</span>
      <node-options ref="leftOptions"></node-options>
    </div>
    <div class="middle">
      <middle-svg
        ref="middleSvg"
        @openNodeSetting="openNodeSetting"
      ></middle-svg>
    </div>
    <div class="right">
      <button type="button" @click="handleClearAll">清空重画</button>
      <button type="button" @click="handleExport">保存到缓存</button>
      <button type="button" @click="handleInport">从缓存读取</button>
      <button type="button" @click="handleClearStorage">清除缓存</button>
    </div>
    <node-setting
      ref="nodeSettingDrawer"
      @settingSave="handleSettingSave"
    ></node-setting>
  </section>
</template>

<script>
import middleSvg from "./components/middleSvg.vue";
import nodeOptions from "./components/leftFlowNodeOption.vue";
import nodeSetting from "./components/nodeSettingDrawer.vue";
import { UUID } from "@/utils/handleObjMethods";
export default {
  components: { middleSvg, nodeOptions, nodeSetting },
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
      // 用于打开设置drawer时禁止svg移动
      allowMove: true,
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
          if (this.allowMove && this.svgMosueEvent) {
            SVG.translateX =
              SVG.savedTranslateX + event.clientX - this.svgMosueEvent.x;
            SVG.translateY =
              SVG.savedTranslateY + event.clientY - this.svgMosueEvent.y;
          }
          // 用于移动流程节点
          if (this.svgFlowNodeEvent) {
            SVG.allowClick = false;
            let node = SVG.nodesCollection[SVG.selectedNode.sign].find(
              (item) => item.id == SVG.selectedNode.id
            );
            node.x =
              SVG.selectedNode.x + event.clientX - this.svgFlowNodeEvent.x;
            node.y =
              SVG.selectedNode.y + event.clientY - this.svgFlowNodeEvent.y;
            SVG.$nextTick(() => {
              SVG.drawLinesByIds();
            });
          }
          // 用于绘制临时的连线
          if (this.svgNodeDotEvent) {
            SVG.temporaryLineIsShow = true;
            SVG.temporaryLine.tarX =
              SVG.srcDotPosition.x + event.clientX - this.svgNodeDotEvent.x;
            SVG.temporaryLine.tarY =
              SVG.srcDotPosition.y + event.clientY - this.svgNodeDotEvent.y;
            // SVG.showReceiveDot = true;
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
                id: UUID(sign),
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
                text: dom.textContent,
                points: [],
                focus: false,
              };
              this.initNodePoints(node);
              switch (sign) {
                case "node_start":
                  if (SVG.nodesCollection[sign].length > 0) {
                    this.$message.error("只能有一个开始点呢 喵");
                  } else {
                    SVG.nodesCollection[sign].push(node);
                  }
                  break;
                case "node_end":
                  if (SVG.nodesCollection[sign].length > 0) {
                    this.$message.error("只能有一个结束点呢 喵");
                  } else {
                    SVG.nodesCollection[sign].push(node);
                  }
                  break;

                default:
                  SVG.nodesCollection[sign].push(node);
                  break;
              }
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
          setTimeout(() => {
            SVG.allowClick = true;
          }, 0);

          // 处理从发射点连线的逻辑
          if (this.svgNodeDotEvent) {
            SVG.temporaryLine.node.focus = false;
            let element = document.elementFromPoint(
              event.clientX,
              event.clientY
            );

            if (
              element.id !== SVG.temporaryLine.srcDotId &&
              element.tagName.toUpperCase() === "CIRCLE"
            ) {
              let tarDotInfo = SVG.allDotInfos.find(
                (item) => item.id === element.id
              );

              // 获取目标点性质，只有是接收点才能连上
              switch (tarDotInfo.attribute) {
                case "emit":
                  SVG.temporaryLine = null;
                  SVG.temporaryLineIsShow = false;
                  this.$message.error("连不了下发点");
                  break;
                case "receive":
                  // 首先校验是否循环
                  let srcNodeId = SVG.temporaryLine.node.id;
                  let tarNodeId = tarDotInfo.belongedNodeId;
                  if (this.checkIsLoop(srcNodeId, tarNodeId)) {
                    SVG.temporaryLine = null;
                    SVG.temporaryLineIsShow = false;
                    this.$message.error("循环了");
                  } else {
                    let rect = SVG.getDotCenterPositionInWindow(element.id);
                    SVG.temporaryLine.tarX =
                      rect.x - this.svgRect.left - SVG.translateX;
                    SVG.temporaryLine.tarY =
                      rect.y - this.svgRect.top - SVG.translateY;
                    SVG.connectionInfo.push({
                      id: UUID("connection"),
                      srcDotId: SVG.temporaryLine.srcDotId,
                      tarDotId: element.id,
                      color: SVG.temporaryLine.color,
                      srcNodeId,
                      tarNodeId,
                    });
                    if (
                      !this.colorIsExist(
                        SVG.arrowMarkerColor,
                        SVG.temporaryLine.color
                      )
                    ) {
                      SVG.arrowMarkerColor.push({
                        id: UUID("arrorColor"),
                        color: SVG.temporaryLine.color,
                      });
                    }
                    SVG.temporaryLine = null;
                    SVG.temporaryLineIsShow = false;
                    SVG.$nextTick(() => {
                      SVG.drawLinesByIds();
                    });
                  }

                  break;

                default:
                  break;
              }
            } else {
              SVG.temporaryLineIsShow = false;
            }
            this.svgNodeDotEvent = null;
            SVG.srcDotPosition = null;
            SVG.showReceiveDot = false;
          }

          SVG.savedTranslateX = SVG.translateX;
          SVG.savedTranslateY = SVG.translateY;
          SVG.$el.style.cursor = "grab";
          break;

        default:
          break;
      }
    },
    checkIsLoop(nodeWaitCheck_id, prevNodeId) {
      let SVG = this.$refs.middleSvg;
      let nextNodeIds = SVG.connectionInfo.filter(
        (item) => item.srcNodeId == prevNodeId
      );
      return nextNodeIds.some((item) => {
        let id = item.tarNodeId;
        if (id == nodeWaitCheck_id) {
          return true;
        } else {
          return this.checkIsLoop(nodeWaitCheck_id, id);
        }
      });

      // for (let i = 0; i < nextNodeIds.length; i++) {
      //   let id = nextNodeIds[i].tarNodeId;
      //   if (id == nodeWaitCheck_id) {
      //     return true;
      //   } else {
      //     return this.checkIsLoop(nodeWaitCheck_id, id);
      //   }
      // }
      // return false;
    },
    colorIsExist(arr, color) {
      return arr.some((obj) => Object.values(obj).includes(color));
    },
    // 初始化节点的点信息,用于连线
    initNodePoints(node) {
      let dot = null;
      function createDotAndPush(count, attribute, colorMap) {
        switch (attribute) {
          case "receive":
            dot = {
              id: UUID("dot"),
              attribute: attribute,
              color: "#52c41a",
              belongedNodeId: node.id,
            };
            node.points.push(dot);
            break;
          case "emit":
            for (let i = 0; i < count; i++) {
              dot = {
                id: UUID("dot"),
                attribute: attribute,
                color: colorMap[i % colorMap.length],
                belongedNodeId: node.id,
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
    handleClearAll() {
      let SVG = this.$refs.middleSvg;
      SVG.nodesCollection = {
        node_start: [],
        node_branch: [],
        node_examine: [],
        node_manual: [],
        node_auto: [],
        node_end: [],
      };
      SVG.connectionInfo = [];
      SVG.lines = [];
    },
    handleExport() {
      let SVG = this.$refs.middleSvg;

      let nodes = SVG.nodesCollection;
      let connectionInfo = SVG.connectionInfo;
      localStorage.setItem("svgNodesInfo", JSON.stringify(nodes));
      localStorage.setItem("svgLinesInfo", JSON.stringify(connectionInfo));
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

      let connectionInfo = localStorage.getItem("svgLinesInfo");
      SVG.connectionInfo = connectionInfo ? JSON.parse(connectionInfo) : [];
      SVG.connectionInfo.forEach((item) => {
        SVG.arrowMarkerColor.push({
          id: UUID("arrorColor"),
          color: item.color,
        });
      });
      SVG.$nextTick(() => {
        SVG.drawLinesByIds();
      });
    },
    handleClearStorage() {
      localStorage.clear();
      alert("Local Storage cleared!");
    },
    openNodeSetting(node) {
      let nodeSetting = this.$refs.nodeSettingDrawer;
      nodeSetting.open(node);
    },
    handleSettingSave(nodeInfo) {
      let SVG = this.$refs.middleSvg;
      let node = SVG.nodesCollection[nodeInfo.nodeType].find(
        (item) => item.id == nodeInfo.id
      );
      node.text = nodeInfo.text;
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