<template>
  <section class="tabs">
    <div
      v-for="(item) in tabItems"
      :key="item.sign"
      class="tab_items flex_center"
      :class="{actived:item.actived}"
      @click="handleItemClick(item)"
    >{{item.label}}</div>
  </section>
</template>

<script>
export default {
  props: {
    selfTabs: {
      type: Array,
      default: function () {
        return [{ label: "abc", sign: 1 }];
      },
    },
  },
  data() {
    return {
      tabItems: [],
    };
  },
  methods: {
    handleItemClick(item) {
      if (!(this.tabItems.find((item) => item.actived == true) == item)) {
        this.tabItems.forEach((item) => {
          item.actived = false;
          // this.$set(item, "actived", false);
        });
        item.actived = true;
        // this.$set(item, "actived", true);
        this.$emit("tab-click", item.sign);
      }
    },
  },
  beforeMount() {
    this.tabItems = this.selfTabs.map((item, index) => {
      return {
        ...item,
        actived: index == 0,
      };
    });
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
  color: #7c869c;
}
.tab_items {
  width: 76px;
  height: 36px;
  box-sizing: border-box;
  border-top: 1px solid #d8dce6;
  border-bottom: 1px solid #d8dce6;
  user-select: none;
  cursor: pointer;
}
.tab_items.actived {
  background: #295bf9;
  color: #fff;
}
/* 选择同一级别的第三个类名为 "abc" 的 div 元素，并应用样式 */
/* div.abc:nth-of-type(3) {} */
.tab_items:first-of-type {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 1px solid #d8dce6;
}
.tab_items:last-of-type {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 1px solid #d8dce6;
}
</style>