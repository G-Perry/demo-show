<template>
  <el-drawer
    :visible.sync="drawerVisible"
    :before-close="handleClose"
    :with-header="false"
    size="600px"
    ><el-input v-model="input" placeholder="请输入内容"></el-input>
    <button type="button" @click="handleSettingSave">1111</button>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible: false,
      nodeInfo: null,
      input: "",
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
      this.nodeInfo = node;
      this.drawerVisible = true;
    },
    handleClose() {
      let that = this.$parent;
      that.allowMove = true;
      this.drawerVisible = false;
    },
    handleSettingSave() {
      this.nodeInfo.text = this.input;
      this.$emit("settingSave", this.nodeInfo);
      this.handleClose();
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

<style>
</style>