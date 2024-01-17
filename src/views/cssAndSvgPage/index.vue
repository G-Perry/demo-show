<template>
  <div class="son_fit_father" style="background-color: #2f6594;">
    <section class="top_nav">
      <div
        class="nav_item"
        v-for="(item, index) in option_select"
        :key="item.label"
        @click="handleOptionClick(item,index)"
        :class="{ active: item ? item.isActive : false }"
      >{{ item.label }}</div>
    </section>
    <section v-show="option_select[0].isActive" class="son_fit">
      <page-one></page-one>
    </section>
    <section v-show="option_select[1].isActive" class="son_fit"></section>
  </div>
</template>

<script>
import pageOne from "./components/pageOne.vue";
export default {
  components: {
    pageOne,
  },
  data() {
    return {
      option_select: [],
    };
  },
  methods: {
    resetOptionSelectBeforeMount() {
      this.option_select = [
        {
          label: "CSS 3D Sphere",
          isActive: true,
        },
        {
          label: "Configuration",
          isActive: false,
        },
      ];
    },
    handleOptionClick(item, index) {
      this.option_select.forEach((item) => (item.isActive = false));
      this.option_select[index].isActive = true;
      switch (item.label) {
        case "":
          break;
        case "":
          break;
        default:
          break;
      }
    },
  },
  beforeMount() {
    this.resetOptionSelectBeforeMount();
  },
  mounted() {},
};
</script>

<style scoped>
.top_nav {
  width: 100%;
  height: 36px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav_item {
  width: fit-content;
  height: 38px;
  line-height: 38px;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 0 10px;
  font-size: 14px;
  color: #575757;
  cursor: pointer;
  /* 禁止用户选择文本 */
  user-select: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}
.nav_item:hover,
.nav_item.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}
</style>