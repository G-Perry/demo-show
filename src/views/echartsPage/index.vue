<template>
  <div class="son_fit_father" style="position: relative">
    <div class="echartsPage">
      <section class="echart echartOne">
        <Echarts optionType="first" :chartData="firstData"></Echarts>
        <el-slider v-model="firstData.value" class="echartOne_slider"></el-slider>
      </section>
      <section class="echart">
        <Echarts optionType="second" :chartData="secondData"></Echarts>
      </section>
      <section class="echart" style="background-color: #000726;">
        <Echarts optionType="third" :chartData="thirdData"></Echarts>
      </section>
      <section class="echart" style="background-color: #000726;">
        <echarts optionType="forth" :chartData="forthData"></echarts>
      </section>
      <section class="echart two_cells">
        <echarts optionType="fifth" :chartData="fifthData"></echarts>
      </section>
      <section class="echart">
        <Echarts optionType="sixth" :chartData="sixthData"></Echarts>
      </section>
      <section class="echart four_cells" style="background-color: #183c57;">
        <Echarts optionType="seventh" :chartData="seventhData"></Echarts>
      </section>
      <section class="echart"></section>
      <section class="echart four_cells">
        <Echarts optionType="eighth" :chartData="eighthData"></Echarts>
      </section>
    </div>
  </div>
</template>

<script>
import Echarts from "@/components/echarts.vue";
import {
  secondChartData,
  thirdChartData,
  forthChartData,
  fifthChartData,
  sixthChartData,
  seventhChartData,
  eighthChartData,
} from "./chartData";
export default {
  components: {
    Echarts,
  },
  data() {
    return {
      firstData: { value: 0 },
      secondData: { xData: [], yData: [] },
      thirdData: { xData: [], yDataOne: [], yDataTwo: [] },
      forthData: { xData: [], yData: [] },
      fifthData: { xData: [], yData: [] },
      sixthData: {
        pieData: [
          { value: 0, name: "等级一", itemStyle: { color: "#cc3333" } },
          { value: 0, name: "等级二", itemStyle: { color: "#ed5454" } },
          { value: 0, name: "等级三", itemStyle: { color: "#ff9900" } },
          { value: 0, name: "等级四", itemStyle: { color: "#4d8dd9" } },
        ],
        count: 0,
        msg: "",
      },
      seventhData: {
        scatterList: [],
        lineList: [],
        dataList: [],
      },
      eighthData: {
        scatterList: [],
        redLineList: [],
        yellowLineList: [],
        blueLineList: [],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      // 1
      this.firstData.value = 10;
      // 2
      secondChartData.forEach((item) => {
        this.secondData.xData.push(
          new Date(item.datetime).toLocaleString().slice(0, -9)
        );
        this.secondData.yData.push(item.num);
      });
      // 3
      this.thirdData.xData = thirdChartData.offLine
        .map((item) => item.key)
        .reverse();
      this.thirdData.yDataOne = thirdChartData.offLine
        .map((item) => item.value)
        .reverse();
      this.thirdData.yDataTwo = thirdChartData.onLine
        .map((item) => item.value)
        .reverse();
      // 4
      this.forthData.xData = forthChartData.map(
        (item) => item.protocol + "[" + item.port + "]"
      );
      this.forthData.yData = forthChartData.map((item) => item.count);
      // 5
      let levelMap = {
        1: "等级一",
        2: "等级二",
        3: "等级三",
        4: "等级四",
        5: "等级五",
      };
      this.fifthData.xData = fifthChartData.map((item) => item.date);
      this.fifthData.yData = fifthChartData.map((item) => levelMap[item.level]);
      // 6
      sixthChartData.forEach((item) => {
        this.sixthData.pieData[item.level - 1].value = item.num;
        this.sixthData.count += item.num;
      });
      this.sixthData.msg = "XXXX";
      // 7
      seventhChartData.forEach((item) => {
        this.seventhData.scatterList.push({
          name: item.regionName,
          value: [item.longitude, item.latitude],
        });
        this.seventhData.lineList.push({
          coords: [
            [item.longitude, item.latitude],
            // [118.77799, 32.06167],
            [115, 35],
          ],
        });
        this.seventhData.dataList.push({
          name: item.regionName,
          value: item.num,
        });
      });
      // 8
      eighthChartData.map((item) => {
        this.eighthData.scatterList.push({
          name: item.regionName,
          value: [item.longitude, item.latitude],
        });
      });
      for (var i = 0; i < eighthChartData.length; i++) {
        if (
          eighthChartData[i].levelInfos.find((item) => item.level == "0") ||
          eighthChartData[i].levelInfos.find((item) => item.level == "1")
        ) {
          this.eighthData.redLineList.push({
            coords: [
              [eighthChartData[i].longitude, eighthChartData[i].latitude],
              [118.77799, 32.06167],
            ],
          });
        } else if (
          eighthChartData[i].levelInfos.find((item) => item.level == "2")
        ) {
          this.eighthData.yellowLineList.push({
            coords: [
              [eighthChartData[i].longitude, eighthChartData[i].latitude],
              [118.77799, 32.06167],
            ],
          });
        } else {
          this.eighthData.blueLineList.push({
            coords: [
              [eighthChartData[i].longitude, eighthChartData[i].latitude],
              [118.77799, 32.06167],
            ],
          });
        }
      }
    }, 0);
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
  grid-auto-rows: 33vh; /* 设置自动放置的行高为 33vh */
}
.echart {
  /* height: 33vh; */
  border: 1px solid #ddd;
}
.echart.two_cells {
  grid-column: span 2;
}
.echart.four_cells {
  grid-row: span 2; /*让元素跨足两行 */
  grid-column: span 2; /* 默认占一列 */
}
.echart.nine_column {
  grid-row: span 3;
  grid-column: span 3; /* 默认占一列 */
}
.echartOne {
  position: relative;
}
.echartOne_slider {
  position: absolute;
  margin: 0 10%;
  width: 80%;
  bottom: 10px;
}
</style>