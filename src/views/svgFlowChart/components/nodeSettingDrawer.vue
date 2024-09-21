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
    open(node) {
      this.nodeInfo = node;
      this.drawerVisible = true;
    },
    handleClose() {
      this.drawerVisible = false;
    },
    handleSettingSave() {
      this.nodeInfo.text = this.input;
      this.$emit("settingSave", this.nodeInfo);
      this.handleClose();
    },
  },
};
</script>

<style>
</style>