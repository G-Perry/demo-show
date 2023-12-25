<template>
  <div class="header_container">
    <div class="left_content">
      <el-button icon="el-icon-menu" size="mini" @click="handleMenuCollapse"></el-button>
      <span class="text">首页</span>
    </div>
    <div class="center_content">
      <el-input v-model="input" prefix-icon="el-icon-search"></el-input>
    </div>
    <div class="right_content">
      <el-dropdown>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    handleMenuCollapse() {
      this.$store.commit("collapseMenu");
    },
  },
};
</script>

<style scoped>
.header_container {
  width: 100%;
  height: 50px;
  background: #494747;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}
.text {
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
}
.left_content {
  flex: 3;
}
.center_content {
  flex: 1;
  transition: all 0.8s;
}
.center_content:focus-within {
  flex: 2;
}
.right_content {
  flex: 3;
  text-align: right;
}
::v-deep .el-input__inner {
  background: transparent;
  border: none;
  border-radius: 20px;
  color: #dcdfe6;
  box-shadow: inset 1px 1px 3px #57585a, inset -1px -1px 3px #353638;
  transition: all 0.5s;
}
::v-deep .el-input__inner:hover,
::v-deep .el-input__inner:focus {
  /* border-color: #3d3a3a !important; */
  box-shadow: inset 2px 2px 4px #353638, inset -1px -1px 3px #57585a;
}
::v-deep .el-input__icon {
  line-height: 25px !important;
  color: #726e6e;
}
.center_content:focus-within ::v-deep .el-input__icon,
.center_content:hover ::v-deep .el-input__icon {
  color: #928e8e;
}
</style>