<template>
  <div class="son_fit_father">
    <el-date-picker v-model="birthTime" type="datetime" placeholder="请选择出生时间"></el-date-picker>
    <!-- value-format="yyyy|MM|dd|HH|mm|ss" -->
    <div>{{ birthTime }}</div>
    <!-- <div>{{ birthTime.getLunar() }}</div> -->
  </div>
</template>

<script>
import { eight_Diagrams_details, tianGan, diZhi } from "./metaphysicsDatas";
export default {
  data() {
    return {
      birthTime: "",
    };
  },
  mounted() {
    let index = 1;
    let CNyear = [];
    for (let i = 0; i < 60; i++) {
      CNyear.push(tianGan[i % 10] + diZhi[i % 12]);
    }

    let date = new Date();
    console.log(date);
    console.log(date.toLocaleString());
    console.log(date.getLunar());
  },
};
</script>

<style>
</style>