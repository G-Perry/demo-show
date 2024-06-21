<template>
  <div class="header_container">
    <div class="left_content">
      <el-button icon="el-icon-menu" size="mini" @click="handleMenuCollapse"></el-button>
      <span class="text">{{tabName}}</span>
    </div>
    <div class="center_content">
      <el-input v-model="input" prefix-icon="el-icon-search"></el-input>
    </div>
    <div class="right_content">
      <el-button type="info" icon="icon-code" circle title="查看源代码,密码：123qwe" @click="pageToVsCode"></el-button>
      <!-- <el-dropdown>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
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
  computed: {
    tabName() {
      return this.$store.state.tab.tabName;
    },
  },
  methods: {
    handleMenuCollapse() {
      this.$store.commit("collapseMenu");
    },
    pageToVsCode() {
      let protocol = window.location.protocol;
      let hostname = window.location.hostname;
      let newUrl = `${protocol}//${hostname}:8888`;
      window.open(newUrl, "_blank");
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

::v-deep .el-button{
  width: 36px;
  height: 36px;
  padding: 0;
}
</style>