<template>
  <div class="son_fit_father" style="position: relative;">
    <div class="echartsPage">
      <section class="echart">
        <Echarts optionType="gauge" :chartData="firstData"></Echarts>
      </section>
      <section class="echart"></section>
      <section class="echart"></section>
      <section class="echart"></section>
      <section class="echart"></section>
      <section class="echart"></section>
      <section class="echart"></section>
      <section class="echart"></section>
      <section class="echart"></section>
      <section class="echart"></section>
    </div>
  </div>
</template>

<script>
import Echarts from "@/components/echarts.vue";

export default {
  components: {
    Echarts,
  },
  data() {
    return {
      firstData: { value: 0 },
    };
  },
  mounted() {
    this.firstData.value = 10;
  },
};
</script>

<style scoped>
.echartsPage {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  display: grid;
  padding: 10px;
  box-sizing: border-box;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.echart {
  height: 33vh;
  border: 1px solid #ddd;
}
</style>