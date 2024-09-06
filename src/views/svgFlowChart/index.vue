<template>
  <section class="three_column">
    <div class="left">
      <span>options</span>
      <div class="left_options">
        <button @click="handleItemAdd('aaa')">1</button>
        <button>1</button>
        <button>1</button>
        <button>1</button>
      </div>
    </div>
    <div class="middle">
      <middle-svg ref="middleSvg"></middle-svg>
    </div>
    <div class="right"></div>
  </section>
</template>

<script>
import middleSvg from "./components/middleSvg.vue";
export default {
  components: { middleSvg },
  methods: {
    handleItemAdd(){
        this.$refs.middleSvg.itemAdd()
    }
  },
};
</script>

<style scoped>
.three_column {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
}
.left,
.right {
  flex: 1;
  overflow: hidden;
}
.middle {
  flex: 5;
  overflow: hidden;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.left_options {
  box-sizing: border-box;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}
</style>