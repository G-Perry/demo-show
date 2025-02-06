<template>
  <el-drawer
    :visible.sync="drawerVisible"
    :before-close="handleClose"
    :with-header="false"
    size="40%"
  >
    <section class="drawerContent">
      <section class="top_set" :class="`${nodeInfo.nodeType || ''}_setting`">
        <div class="node_text">
          <i class="el-icon-s-opportunity"></i>
          <el-input
            ref="textEditInput"
            v-if="couldEditText"
            v-model="input"
            placeholder="请输入内容"
            style="width: 160px"
            @blur="textEditEnd"
            size="mini"
          ></el-input>
          <span v-else>{{ input }}</span>
          <!-- <span v-else>{{ nodeInfo.text }}</span> -->
          <i
            class="el-icon-edit node_text_edit"
            @click="handleNodeTextEdit"
          ></i>
        </div>
        <!-- <div
          class="editForm"
          @click="pageToCustomForm"
          v-if="nodeInfo.nodeType == 'node_manual'"
        >
          编辑表单 >
        </div> -->
      </section>
      <section class="middle_setting">
        <template v-if="nodeInfo.nodeType == 'node_branch'">
          <branch-setting
            :settingInfo="branchSettingInfo.emit"
            @settingChange="handleNodeSettingChange"
            @deleteBranch="branchWaitToDeleteById"
          ></branch-setting>
        </template>
        <template v-if="nodeInfo.nodeType == 'node_examine'">
          <examine-setting
            :settingInfo="examineSettingInfo"
            @settingChange="handleNodeSettingChange"
          ></examine-setting>
        </template>
        <template v-if="nodeInfo.nodeType == 'node_manual'">
          <manual-setting
            :settingInfo="manualSettingInfo"
            @settingChange="handleNodeSettingChange"
          ></manual-setting>
        </template>
        <template v-if="nodeInfo.nodeType == 'node_auto'">
          <auto-setting
            :settingInfo="autoSettingInfo"
            @settingChange="handleNodeSettingChange"
          ></auto-setting>
        </template>
      </section>
      <section class="bottom_btns">
        <button
          type="button"
          class="btn btn_Confirm"
          @click="handleSettingSave"
        >
          保存
        </button>
        <button type="button" class="btn btn_Cancel" @click="handleClose">
          取消
        </button>
      </section>
    </section>
  </el-drawer>
</template>

<script>
import branchSetting from "./settings/branchSetting.vue";
import examineSetting from "./settings/examineSetting.vue";
import manualSetting from "./settings/manualSetting.vue";
import autoSetting from "./settings/autoSetting.vue";
import { saveToStorage, readFromStorage } from "@/utils/handleObjMethods";
import { setNowSettingNode } from "./confg";

export default {
  components: { branchSetting, examineSetting, manualSetting, autoSetting },
  data() {
    return {
      drawerVisible: false,
      // drawerVisible: true,
      nodeInfo: {},
      nodeSettings: {},
      input: "",
      couldEditText: false,
      branchSettingInfo: {},
      examineSettingInfo: {},
      manualSettingInfo: {},
      autoSettingInfo: {},
      delLineByDotIds: [],
      // settingSaveInStorage: {},
    };
  },
  methods: {
    // setDrawerHeight() {
    //   let windowHeight = window.innerHeight;
    //   let domRect = this.$parent.$el.getBoundingClientRect();
    //   let top = domRect.top;
    //   let bottom = Math.max(windowHeight - domRect.bottom, 0);
    //   let drawerElement = document.querySelector(".el-drawer.rtl");
    //   drawerElement.style.top = top + "px";
    //   // drawerElement.style.bottom = bottom + "px";
    //   drawerElement.style.height = windowHeight - top - bottom + "px";
    // },
    open(node) {
      this.nodeInfo = { ...node };
      this.nodeSettings = readFromStorage("nodeSettings") || {};
      // this.nodeSettings =
      //   JSON.parse(sessionStorage.getItem("nodeSettings")) || {};
      // console.log(this.nodeSettings, this.nodeInfo);
      this.input = this.nodeSettings[node.id]?.nodeName || node.text;
      setNowSettingNode(node);
      switch (node.nodeType) {
        case "node_branch":
          this.delLineByDotIds = [];
          this.branchSettingInfo.emit = node.points.filter((item) => {
            return item.attribute == "emit";
          });
          this.branchSettingInfo.receive = node.points.filter((item) => {
            return item.attribute == "receive";
          });
          break;
        case "node_examine":
          this.examineSettingInfo = this.nodeSettings[node.id];
          break;
        case "node_manual":
          this.manualSettingInfo = this.nodeSettings[node.id];
          break;
        case "node_auto":
          this.autoSettingInfo = this.nodeSettings[node.id];
          break;

        default:
          break;
      }
      this.drawerVisible = true;
    },
    // 修改节点描述文本
    handleNodeTextEdit() {
      this.input = this.nodeInfo.text;
      this.couldEditText = true;
      this.$nextTick(() => {
        this.$refs.textEditInput.focus();
      });
    },
    textEditEnd() {
      this.nodeInfo.text = this.input;
      this.couldEditText = false;
    },
    handleNodeSettingChange(obj) {
      // console.log(obj, 55555);

      let { nodeType, data } = obj;
      this.nodeSettings[this.nodeInfo.id] = data;
      switch (nodeType) {
        case "branch":
          this.nodeInfo.points = [];
          let arr = [];
          arr.push(this.branchSettingInfo.receive[0]);
          data.branches.forEach((item) => {
            if (item.status) {
              arr.push({
                attribute: "emit",
                belongedNodeId: this.nodeInfo.id,
                color: item.leftBorderColor,
                haveText: true,
                id: item.id,
                text: item.label,
              });
            } else {
              this.branchWaitToDeleteById(item.id);
            }
          });

          this.nodeInfo.points = arr;
          break;

        default:
          break;
      }
    },
    saveNodeToStorage() {
      let that = this.$parent;
      that.handleExport();
      this.nodeSettings[this.nodeInfo.id].nodeName = this.input;
      saveToStorage("nodeSettings", this.nodeSettings);
    },
    handleSettingSave() {
      if (this.nodeInfo.nodeType === "node_branch") {
        let svgLinesInfo = readFromStorage("svgLinesInfo");
        this.delLineByDotIds.forEach((id) => {
          svgLinesInfo = svgLinesInfo.filter((item) => item.srcDotId != id);
        });
        saveToStorage("svgLinesInfo", svgLinesInfo);
      }

      setNowSettingNode(null);
      this.$emit("settingSave", this.nodeInfo);
      this.saveNodeToStorage();
      this.handleClose();
    },
    handleClose() {
      let that = this.$parent;
      that.allowMove = true;
      this.nodeInfo = {};
      this.input = "";
      this.drawerVisible = false;
      setNowSettingNode(null);
    },
    pageToCustomForm() {
      this.saveNodeToStorage();
      this.$router.push("/itsm/customForm/" + this.nodeInfo.id);
    },
    branchWaitToDeleteById(id) {
      if (!this.delLineByDotIds.includes(id)) {
        this.delLineByDotIds.push(id);
      }
    },
  },
  // mounted() {
  //   this.setDrawerHeight();
  //   window.addEventListener("resize", this.setDrawerHeight);
  // },
  // beforeDestroy() {
  //   window.removeEventListener("resize", this.setDrawerHeight);
  // },
};
</script>

<style scoped>
.drawerContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.middle_setting {
  flex: 1;
  overflow: auto;
}
.top_set,
.bottom_btns {
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
}
.top_set {
  padding: 0 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}
.bottom_btns {
  padding: 6px 10px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
}
.node_text {
  height: 100%;
  font-size: 14px;
  display: flex;
  gap: 5px;
  align-items: center;
}
.node_text_edit {
  cursor: pointer;
  color: #aaa;
}
/* .node_branch_setting {
  color: #3930e0;
}
.node_examine_setting {
  color: #ee8100;
}
.node_manual_setting {
  color: #2f54eb;
}
.node_auto_setting {
  color: #00b5b5;
} */
::v-deep.el-input__inner {
  padding-left: 5px;
}

.editForm {
  cursor: pointer;
}
</style>