<template>
  <section class="three_column">
    <div class="left">
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
      <button type="button" @click="handleProcessDeployment">流程部署</button>
      <button type="button" @click="abcd">下载配置的JSON</button>
      <button type="button">
        <label for="fileInput" style="font-weight: 500">导入配置的JSON </label>
      </button>
      <input
        type="file"
        id="fileInput"
        @change="handleFileUpload"
        style="display: none"
      />
    </div>
    <node-setting
      ref="nodeSettingDrawer"
      @settingSave="handleSettingSave"
    ></node-setting>
    <ul
      v-show="contextMenuVisible"
      :style="{ left: menuInfo.left + 'px', top: menuInfo.top + 'px' }"
      class="contextMenu"
    >
      <li @click.prevent="handleContextMenuDelete">{{ menuInfo.label }}</li>
    </ul>
  </section>
</template>

<script>
import middleSvg from "./components/middleSvg.vue";
import nodeOptions from "./components/leftFlowNodeOption.vue";
import nodeSetting from "./components/nodeSettingDrawer.vue";
import {
  UUID,
  saveToStorage,
  readFromStorage,
  clearStorage,
} from "@/utils/handleObjMethods";
// import { flowDeploy } from "@/api/itsm/flowDefine.js";

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
      // 右键删除菜单
      contextMenuVisible: false,
      menuInfo: {
        left: 0,
        top: 0,
        label: "",
        actionType: "",
        elementType: "",
        actionId: "",
      },
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
      if (event.button === 2) {
        // 右键点击
        return;
      }
      // 隐藏右键菜单
      setTimeout(() => {
        this.contextMenuVisible = false;
      }, 200);
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
                    this.$message.error("流程只能有一个开始点");
                  } else {
                    SVG.nodesCollection[sign].push(node);
                  }
                  break;
                case "node_end":
                  if (SVG.nodesCollection[sign].length > 0) {
                    this.$message.error("流程只能有一个结束点");
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
          // 初次摆放后向缓存存数据
          this.handleExport();
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
                  let srcNodeId = SVG.temporaryLine.node.id;
                  let tarNodeId = tarDotInfo.belongedNodeId;
                  if (this.checkIsOnlyOneLine(SVG.temporaryLine.srcDotId)) {
                    SVG.temporaryLine = null;
                    SVG.temporaryLineIsShow = false;
                    this.$message.error("一个下发点只能连一个接收点");
                  } else if (this.checkIsLoop(srcNodeId, tarNodeId)) {
                    // 首先校验是否循环
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
                      lineHaveText: SVG.temporaryLine.lineHaveText,
                      lineText: SVG.temporaryLine.lineText,
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
          // 移动节点或连线后向缓存存数据
          this.handleExport();
          break;

        default:
          break;
      }
    },
    // 校验连线是否形成循环
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
    // 校验是否只连了一条线
    checkIsOnlyOneLine(srcDotId) {
      let SVG = this.$refs.middleSvg;
      let srcIds = SVG.connectionInfo.map((item) => item.srcDotId);
      return srcIds.includes(srcDotId);
    },
    colorIsExist(arr, color) {
      return arr.some((obj) => Object.values(obj).includes(color));
    },
    // 初始化节点的点信息,用于连线
    initNodePoints(node) {
      let dot = null;
      function createDotAndPush(count, attribute, colorMap, haveText, text) {
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
                haveText: haveText,
                text: text[i % text.length],
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
          createDotAndPush(1, "emit", ["#8ec9ff"], false, []);
          break;
        case "node_branch":
          createDotAndPush(1, "receive");
          createDotAndPush(2, "emit", ["#67cb8a", "#bcc0ce"], true, [
            "分支1",
            "其他",
          ]);
          break;
        case "node_examine":
          createDotAndPush(1, "receive");
          createDotAndPush(2, "emit", ["#52be70", "#fd4c6a"], true, [
            "通过",
            "拒绝",
          ]);
          break;
        case "node_manual":
          createDotAndPush(1, "receive");
          createDotAndPush(1, "emit", ["#8ec9ff"], true, ["提交"]);
          break;
        case "node_auto":
          createDotAndPush(1, "receive");
          createDotAndPush(1, "emit", ["#8ec9ff"], false, []);
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
      clearStorage();
    },
    // 向缓存存入节点、连线的配置信息
    handleExport() {
      let SVG = this.$refs.middleSvg;
      let nodes = SVG.nodesCollection;
      let connectionInfo = SVG.connectionInfo;
      saveToStorage("svgNodesInfo", nodes);
      saveToStorage("svgLinesInfo", connectionInfo);
    },
    // 从缓存读取数据并渲染
    handleInport() {
      let SVG = this.$refs.middleSvg;
      let nodes = readFromStorage("svgNodesInfo");
      SVG.nodesCollection = nodes || {
        node_start: [],
        node_branch: [],
        node_examine: [],
        node_manual: [],
        node_auto: [],
        node_end: [],
      };

      let connectionInfo = readFromStorage("svgLinesInfo");
      SVG.connectionInfo = connectionInfo || [];
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
      // localStorage.clear();
      // sessionStorage.clear();
      clearStorage();
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
      node.points = nodeInfo.points;
      if (nodeInfo.nodeType == "node_branch") {
        SVG.connectionInfo = readFromStorage("svgLinesInfo") || [];
        SVG.connectionInfo.forEach((item) => {
          SVG.arrowMarkerColor.push({
            id: UUID("arrorColor"),
            color: item.color,
          });
        });
        SVG.$nextTick(() => {
          SVG.drawLinesByIds();
        });
      }
    },
    // 右键删除节点或边
    handleContextMenuDelete() {
      let SVG = this.$refs.middleSvg;
      switch (this.menuInfo.actionType) {
        case "delLine":
          //删除SVG.connectionInfo中的连线信息
          SVG.connectionInfo = SVG.connectionInfo.filter(
            (item) => item.id != this.menuInfo.actionId
          );
          saveToStorage("svgLinesInfo", SVG.connectionInfo);
          break;
        case "delNode":
          let nodeType = this.menuInfo.elementType;
          // 删除节点
          SVG.nodesCollection[nodeType] = SVG.nodesCollection[nodeType].filter(
            (item) => item.id != this.menuInfo.actionId
          );
          //删除SVG.connectionInfo中的连线信息
          SVG.connectionInfo = SVG.connectionInfo.filter(
            (item) =>
              item.srcNodeId != this.menuInfo.actionId &&
              item.tarNodeId != this.menuInfo.actionId
          );
          // 删除节点设置以及缓存中的信息
          // let settingDrawer = this.$refs.nodeSettingDrawer;
          // delete settingDrawer.nodeSettings[this.menuInfo.actionId];
          saveToStorage("svgNodesInfo", SVG.nodesCollection);
          saveToStorage("svgLinesInfo", SVG.connectionInfo);

          let nodeSettings = readFromStorage("nodeSettings") || {};
          delete nodeSettings[this.menuInfo.actionId];
          saveToStorage("nodeSettings", nodeSettings);

          let formInfo = readFromStorage("formInfo") || {};
          delete formInfo[this.menuInfo.actionId];
          saveToStorage("formInfo", formInfo);

          break;
        default:
          break;
      }
      SVG.drawLinesByIds();
    },
    // 流程部署(保存到后端)
    handleProcessDeployment() {
      const nodeTypeMapping = {
        node_start: "startEvent",
        node_branch: "chooseEvent",
        node_examine: "approveTask",
        node_manual: "userTask",
        node_auto: "autoTask",
        node_end: "endEvent",
      };
      let obj = {
        defId: "",
        processNodes: [],
        sequenceNodes: [],
        userTaskNodes: [],
        approvalNodes: [],
        autoNodes: [],
        chooseNodes: [],
        linesInfo: "",
        nodesInfo: "",
        settingInfo: "",
        formInfo: "",
      };
      // 节点信息
      let nodesCollection = readFromStorage("svgNodesInfo") || {
        node_start: [],
        node_branch: [],
        node_examine: [],
        node_manual: [],
        node_auto: [],
        node_end: [],
      };
      obj.nodesInfo = JSON.stringify(nodesCollection);
      // 连线信息
      let connectionInfo = readFromStorage("svgLinesInfo") || [];
      obj.linesInfo = JSON.stringify(connectionInfo);

      // 设置信息
      let nodeSettings = readFromStorage("nodeSettings") || {};
      obj.settingInfo = JSON.stringify(nodeSettings);

      // 表单信息
      let formInfo = readFromStorage("formInfo") || [];
      obj.formInfo = JSON.stringify(formInfo);

      let nodesArr = [];
      for (let key in nodesCollection) {
        nodesArr = nodesArr.concat(nodesCollection[key]);
      }
      obj.defId = this.$route.params.id;
      obj.processNodes = nodesArr.map((item) => {
        let node = {
          nodedefId: item.id,
          actName: item.text,
          actType: nodeTypeMapping[item.nodeType],
        };
        if (item.nodeType == "node_manual") {
          node.formContent = JSON.stringify(formInfo[item.id]) || "";
        }

        return node;
      });
      obj.sequenceNodes = connectionInfo.map((item) => {
        return {
          sequenceId: item.id,
          startNodedefId: item.srcNodeId,
          endNodedefId: item.tarNodeId,
          sequenceName: item.lineText,
        };
      });
      nodesCollection.node_manual.forEach((item) => {
        let cell = nodeSettings[item.id];
        if (cell) {
          // console.log(cell, 333);

          cell.assigneeId = cell.assigneeId.join(",");
          cell.assigneeGroup = cell.assigneeGroup.join(",");
          cell.assigneeDept = cell.assigneeDept.join(",");
          obj.userTaskNodes.push({
            nodedefId: item.id,
            ...cell,
          });
        }
      });
      nodesCollection.node_examine.forEach((item) => {
        let a = connectionInfo.find((i) => {
          return i.srcNodeId == item.id && i.lineText == "通过";
        })?.tarNodeId;
        let b = connectionInfo.find((i) => {
          return i.srcNodeId == item.id && i.lineText == "拒绝";
        })?.tarNodeId;
        let cell = nodeSettings[item.id];
        cell.approvalAssigneeId = cell.approvalAssigneeId.join(",");
        obj.approvalNodes.push({
          nodedefId: item.id,
          nextNodeDefIdY: a,
          nextNodeDefIdN: b,
          ...cell,
        });
      });
      nodesCollection.node_auto.forEach((item) => {
        let cell = nodeSettings[item.id];
        if (cell) {
          if (cell.invokeParam.filteringModelField.subConditions.length == 1) {
            cell.invokeParam.filteringModelField =
              cell.invokeParam.filteringModelField.subConditions[0];
          }

          cell.invokeParam = JSON.stringify(cell.invokeParam);
          obj.autoNodes.push({
            nodedefId: item.id,
            ...cell,
          });
        }
      });
      nodesCollection.node_branch.forEach((item) => {
        let arr = nodeSettings[item.id]?.branches || [];
        let cell;
        arr.forEach((element) => {
          // console.log(element);

          let rules = element.rules;
          if (rules?.conditions.length == 1) {
            rules = rules.conditions[0];
          }
          cell = {
            nodedefId: item.id,
            // conditionId: element.id,
            conditionName: element.label,
            nextNodedefId: connectionInfo.find((i) => i.srcDotId == element.id)
              ?.tarNodeId,
            status: element.status,
            // conditions: rules,
            conditions: JSON.stringify(rules),
          };
          obj.chooseNodes.push(cell);
        });
      });

      // console.log(obj);
      // flowDeploy(obj).then((res) => {
      //   if (res.code == 200) {
      //     this.$message.success("流程部署成功");
      //   }
      // });
    },
    abcd() {
      // 节点信息
      let svgNodesInfo = readFromStorage("svgNodesInfo") || {
        node_start: [],
        node_branch: [],
        node_examine: [],
        node_manual: [],
        node_auto: [],
        node_end: [],
      };
      // 连线信息
      let svgLinesInfo = readFromStorage("svgLinesInfo") || [];
      // 设置信息
      let nodeSettings = readFromStorage("nodeSettings") || {};
      // 表单信息
      let formInfo = readFromStorage("formInfo") || [];
      let obj = JSON.stringify({
        svgNodesInfo,
        svgLinesInfo,
        nodeSettings,
        formInfo,
      });
      const blob = new Blob([obj], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${UUID("JSON_Config")}.txt`;
      a.click();

      // 释放 URL 对象
      URL.revokeObjectURL(url);
    },
    handleFileUpload(event) {
      const reader = new FileReader();
      const file = event.target.files[0];
      if (file) {
        reader.readAsText(file, "UTF-8");
        reader.onload = (e) => {
          let obj = JSON.parse(e.target.result);
          localStorage.clear();
          for (let key in obj) {
            saveToStorage(key, obj[key]);
          }
          this.handleInport();
        };
        reader.onerror = (error) => {
          console.error("读取文件时出错:", error);
        };
      }
    },
  },
  mounted() {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.$notify({
      title: "提示",
      type: "warning",
      message:
        "在未点保存前，所有配置信息只会暂存在本地，关闭页面所有配置会消失。",
      duration: 0,
    });
    // // document.addEventListener("contextmenu", this.rightClick);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    // window.removeEventListener("contextmenu", this.rightClick);
  },
};
</script>

<style lang="scss" scoped>
.three_column {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  position: relative;
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
.contextMenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
