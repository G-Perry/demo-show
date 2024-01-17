<template>
  <section class="common_aside">
    <span class="aside_title" :class="{ small : isCollapse }">DEMO SHOW</span>
    <span class="side_title" :class="{ small : isCollapse }">MENU</span>
    <div class="side_menu" :class="{ small : isCollapse }">
      <div
        v-for="item in noChildren"
        :key="item.label"
        :index="item.label"
        class="side_menu_item_self"
        :class="{ small : isCollapse }"
        @click="handleMenuClick(item)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      menuData: [
        {
          path: "/",
          name: "homePage",
          label: "首页",
          icon: "icon-home",
          url: "",
        },
        {
          path: "/",
          name: "usualPage",
          label: "通用模板页面",
          icon: "icon-file-text",
          url: "",
        },
        {
          path: "/",
          name: "echartsPage",
          label: "Echarts_Show",
          icon: "icon-echart",
          url: "",
        },
        {
          path: "/",
          name: "threeJsDemoPage",
          label: "ThreeJs_Demo",
          icon: "icon-codepen",
          url: "",
        },
        {
          path: "/",
          name: "cssAndSvgPage",
          label: "CSS_&_SVG_Show",
          icon: "icon-command",
          url: "",
        },
        {
          path: "/",
          name: "testPage",
          label: "testPage",
          icon: "icon-file-empty",
          url: "",
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

    isCollapse() {
      return this.$store.state.tab.isCollapse;
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
.common_aside {
  height: 100%;
  width: fit-content;
  background: #545c64;
}
.aside_title {
  display: inline-block;
  font-size: 15px;
  color: #fff;
  font-weight: 600;
  text-align: center;
  height: 68px;
  line-height: 68px;
  letter-spacing: 4px;
  width: 100%;
}

.side_title {
  display: inline-block;
  color: rgb(161, 164, 182);
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  padding: 0 20px;
}
.side_menu {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  white-space: nowrap;
  color: rgb(187, 187, 192);
}
.side_menu_item_self {
  height: 36px;
  line-height: 36px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  cursor: pointer;
}
.side_menu_item_self span {
  margin-left: 10px;
}
.side_menu_item_self:hover {
  color: #fff;
  background: #74808b;
}

.aside_title.small {
  display: none;
}
.side_title.small {
  padding: 10px;
}
.side_menu_item_self.small {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}
.side_menu_item_self.small span {
  display: none;
}
@media screen and (max-width: 930px) {
  .aside_title {
    display: none;
  }
  .side_title {
    padding: 10px;
  }
  .side_menu_item_self {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
  .side_menu_item_self span {
    display: none;
  }
}
</style>