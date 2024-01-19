<template>
  <div class="son_fit_father">
    <el-date-picker
      v-model="birthTime"
      type="datetime"
      placeholder="请选择出生时间"
      value-format="yyyy|MM|dd|HH|mm|ss"
    ></el-date-picker>
    <div>{{ birthTime }}</div>
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
    for (let i = 2000; i < 2020; i++) {}


    // console.log(CNyear);
    // const celestialStems = [
    //   "甲",
    //   "乙",
    //   "丙",
    //   "丁",
    //   "戊",
    //   "己",
    //   "庚",
    //   "辛",
    //   "壬",
    //   "癸",
    // ];
    // const earthlyBranches = [
    //   "子",
    //   "丑",
    //   "寅",
    //   "卯",
    //   "辰",
    //   "巳",
    //   "午",
    //   "未",
    //   "申",
    //   "酉",
    //   "戌",
    //   "亥",
    // ];

    // function getJiaZiYear(year) {
    //   const totalStemsBranches = 60; // 天干地支总数
    //   const celestialIndex = (year - 1) % 10;
    //   const earthlyIndex = (year - 1) % 12;

    //   const index = (celestialIndex * 12 + earthlyIndex) % totalStemsBranches;
    //   const celestialStem = celestialStems[index % 10];
    //   const earthlyBranch = earthlyBranches[index % 12];

    //   return celestialStem + earthlyBranch + "年";
    // }

    // // 示例用法
    // for (let year = 2000; year <= 2030; year++) {
    //   console.log(`${year}年是${getJiaZiYear(year)}`);
    // }
  },
};
</script>

<style>
</style>