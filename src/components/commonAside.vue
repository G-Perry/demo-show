<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>通用后台管理系统</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.label"
      :index="item.label"
      @click="handleMenuClick(item)"
    >
      <i :class="item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="element in item.children" :key="element.label">
        <el-menu-item :index="element.label" @click="handleMenuClick(element)">{{element.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuData: [
        {
          path: "/",
          name: "homePage",
          label: "首页",
          icon: "",
          url: "",
        },
        {
          path: "/",
          name: "usualPage",
          label: "通用模板页面",
          icon: "",
          url: "",
        },
        {
          path: "/",
          name: "homePage",
          label: "标签二",
          icon: "",
          url: "",
        },
        {
          label: "其他",
          icon: "",
          children: [
            {
              path: "/",
              name: "homePage",
              label: "标签三  一",
              icon: "",
              url: "",
            },
            {
              path: "/",
              name: "homePage",
              label: "标签三  二",
              icon: "",
              url: "",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleMenuClick(item) {
      this.$router.push({
        name: item.name,
      });
    },
  },
};
</script>

<style scoped>
.el-menu {
  width: 100%;
  height: 100vh;
  border: none;
}
h3 {
  color: #fff;
  margin: 0;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
  font-weight: 400;
}
</style>