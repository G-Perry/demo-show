<template>
  <section class="common_aside">
    <span class="aside_title" :class="{ small: isCollapse }">DEMO SHOW</span>
    <span class="side_title" :class="{ small: isCollapse }">MENU</span>
    <div class="side_menu" :class="{ small: isCollapse }">
      <div
        v-for="item in menuData"
        :key="item.name"
        class="side_menu_item_self"
        :class="{ small: isCollapse }"
        @click="handleMenuClick(item)"
      >
        <i :class="item.meta?.icon"></i>
        <span>{{ item.meta?.label }}</span>
      </div>
    </div>
    <el-popover placement="right" width="360" trigger="hover">
      <section class="page_info">
        <span>
          页面：
          <span style="font-size: 12px">{{ pageInfoName }}</span>
        </span>
        <span>
          简述：
          <span style="font-size: 12px">{{ pageInfoDesc }}</span>
        </span>
      </section>
      <i class="el-icon-info page_info_icon" slot="reference"></i>
    </el-popover>
  </section>
</template>

<script>
import page_info_desc from "./page_info_desc";
import { findObjectById } from "../utils/handleObjMethods";
import { routes } from "../router/index";
export default {
  data() {
    return {};
  },
  computed: {
    menuData() {
      let arr = [];
      routes.forEach((item) => {
        if (item.path == "/") {
          item.children.forEach((e) => {
            if (e.visible) {
              arr.push({ ...e });
            }
          });
        } else {
          arr.push(item);
        }
      });
      arr.sort((a, b) => a.meta.sort - b.meta.sort);
      return arr;
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    pageInfoName() {
      return this.$store.state.tab.activedPageName;
    },
    pageInfoDesc() {
      let obj = findObjectById(page_info_desc, this.pageInfoName, "name") || {
        desc: "",
      };
      return obj.desc;
    },
  },
  methods: {
    handleMenuClick(item) {
      this.$store.dispatch("changeTab", item.meta.label);
      this.$store.commit("PAGE_CHANGE", item.meta.label);
      // if (item.name == "documentCatalogue" || item.name == "serverRoom") {
      if (item.name == "documentCatalogue") {
        const routeUrl = this.$router.resolve({ name: item.name });
        window.open(routeUrl.href, "_blank");
      } else {
        this.$router.push({
          name: item.name,
        });
      }
    },
  },
  mounted() {
    let pathName = window.location.href.match(/\/([^\/]+)$/)[1];
    let label = this.menuData.find((item) => item.path == pathName).meta.label;
    this.$store.dispatch("changeTab", label);

    this.$store.commit(
      "PAGE_CHANGE",
      label === "Achieve_By_Oneself"
        ? "Achieve_By_Oneself - CSS 3D Sphere"
        : label
    );
  },
};
</script>

<style scoped>
.common_aside {
  height: 100%;
  width: fit-content;
  background: #545c64;
  position: relative;
}
.page_info {
  display: flex;
  flex-direction: column;
}
.page_info_icon {
  position: absolute;
  font-size: 36px;
  color: #909399;
  cursor: pointer;
  left: 16px;
  bottom: 16px;
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