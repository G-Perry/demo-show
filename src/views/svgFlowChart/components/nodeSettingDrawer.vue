<template>
  <el-drawer
    :visible.sync="drawerVisible"
    :before-close="handleClose"
    :with-header="false"
    size="600px"
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
          ></el-input>
          <span v-else>{{ nodeInfo.text }}</span>
          <i
            class="el-icon-edit node_text_edit"
            @click="handleNodeTextEdit"
          ></i>
        </div>
        <div class="editForm">编辑表单 ></div>
      </section>
      <section class="middle_setting">
        <button @click="branchAdd" v-if="nodeInfo.nodeType == 'node_branch'">
          +1
        </button>
      </section>
      <section class="bottom_btns">
        <button type="button" class="btn_Confirm" @click="handleSettingSave">
          保存
        </button>
        <button type="button" class="btn_Cancel" @click="handleClose">
          取消
        </button>
      </section>
    </section>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible: false,
      // drawerVisible: true,
      nodeInfo: {},
      input: "",
      couldEditText: false,
    };
  },
  methods: {
    setDrawerHeight() {
      let windowHeight = window.innerHeight;
      let domRect = this.$parent.$el.getBoundingClientRect();
      let top = domRect.top;
      let bottom = Math.max(windowHeight - domRect.bottom, 0);
      let drawerElement = document.querySelector(".el-drawer.rtl");
      drawerElement.style.top = top + "px";
      // drawerElement.style.bottom = bottom + "px";
      drawerElement.style.height = windowHeight - top - bottom + "px";
    },
    open(node) {
      this.nodeInfo = { ...node };
      this.drawerVisible = true;
    },
    handleClose() {
      let that = this.$parent;
      that.allowMove = true;
      this.nodeInfo = {};
      this.input = "";
      this.drawerVisible = false;
    },
    handleSettingSave() {
      this.nodeInfo.text = this.input;
      this.$emit("settingSave", this.nodeInfo);
      this.handleClose();
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
    branchAdd() {
      console.log(this.nodeInfo);
      
    },
  },
  mounted() {
    this.setDrawerHeight();
    window.addEventListener("resize", this.setDrawerHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setDrawerHeight);
  },
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
.node_branch_setting {
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
}
::v-deep.el-input__inner {
  padding-left: 5px;
}
button {
  width: 70px;
  border: 1px solid transparent;
  border-radius: 2px;
}
button + button {
  margin-left: 10px;
}
.btn_Confirm,
.btn_Confirm:focus {
  color: #fff;
  background-color: #2f54eb;
  border-color: #2f54eb;
}
.btn_Confirm:hover {
  background-color: #597ef7;
  border-color: #597ef7;
}
.btn_Confirm:active {
  background-color: #1d39c4;
  border-color: #1d39c4;
}
.btn_Cancel,
.btn_Cancel:focus {
  color: #595959;
  background-color: #fff;
  border-color: #e4e7ed;
}
.btn_Cancel:hover {
  color: #597ef7;
  border-color: #597ef7;
}
.btn_Cancel:active {
  color: #1d39c4;
  border-color: #1d39c4;
}
.editForm {
  cursor: pointer;
}
</style>