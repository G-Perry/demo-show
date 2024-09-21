<template>
  <div class="son_fit_father" style="position: relative;  border-radius: 10px;">
    <div class="index_page_overall">
      <div class="bar_item_1 son_fit_father">
        <div class="bar_subtitle">XXXXX</div>
        <div class="bar_1_top">
          <div class="bar_1_top_left">
            <span class="title">XXXX平台已服务</span>
            <div class="day_count">
              <span class="day_count_num">0</span>
              <span class="day_count_num">3</span>
              <span class="day_count_num">4</span>
              <span class="day_count_num">0</span>
              <span class="day_count_text">天</span>
            </div>
          </div>
          <div class="bar_1_top_right">
            <div class="bar_1_top_right_item">
              <div class="item_img_1"></div>
              <span class="item_num">108</span>
              <span class="item_text">XXX</span>
            </div>
            <div class="bar_1_top_right_item">
              <div class="item_img_1"></div>
              <span class="item_num">177</span>
              <span class="item_text">XXX</span>
            </div>
          </div>
        </div>
        <div class="bar_1_middle">
          <div class="bar_1_middle_left">
            <span class="date">2023-9-4</span>
            <span class="date" style="margin-left: 15px;">星期一</span>
            <span class="num">4</span>
          </div>
          <div class="bar_1_middle_right">
            <span class="text">XXXXXXX</span>
            <div class="btn flex_center">XXXXXX</div>
          </div>
        </div>
        <!-- <div class="bar_1_bottom son_fit">
        <div class="bar_subtitle" style="border: none;">XXXX</div>
        </div>-->
        <div class="bottom_line" style="margin:24px 0 12px"></div>
        <div class="bar_subtitle" style="border: none;">XXXX</div>
        <div class="bar_1_bottom son_fit">
          <some-search></some-search>
        </div>
      </div>
      <!--  -->
      <div class="bar_item_2 son_fit_father">
        <div class="bar_title bottom_line">XXXXXX</div>
        <div class="bar_2 son_fit">
          <div class="bar_2_top bottom_line">
            <div class="son_fit_father">
              <div class="bar_subtitle">XXXX</div>
              <word-cloud class="son_fit"></word-cloud>
            </div>
          </div>
          <div class="bar_2_bottom_left">
            <div class="son_fit_father">
              <div class="bar_subtitle">XXXX</div>
              <Echarts class="son_fit gauge_echart" optionType="indexGauge" :chartData="gaugeData"></Echarts>
            </div>
          </div>
          <div class="bar_2_bottom_right">
            <div class="son_fit_father">
              <div class="bar_subtitle">XXXX</div>
              <div class="bar_1_top_right son_fit left_line" style="background-color: #fff;">
                <div class="bar_1_top_right_item">
                  <div class="item_img_3"></div>
                  <span class="item_num">108</span>
                  <span class="item_text">XXXXXX</span>
                </div>
                <div class="bar_1_top_right_item">
                  <div class="item_img_4"></div>
                  <span class="item_num">177</span>
                  <span class="item_text">XXXXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bar_item_3 son_fit_father">
        <div class="bar_title bottom_line">XXXXXX</div>
        <div class="gird_column_2_5">
          <div class="bar_subtitle">XXXXXXXXX</div>
          <div class="bar_subtitle">XXXXXTOP 5</div>
        </div>

        <div class="gird_column_2_5 son_fit">
          <Echarts optionType="pie" :chartData="pieDataOne" fromWhere="index_server"></Echarts>
          <asset-top-five-table :tableData="tableDataOne"></asset-top-five-table>
        </div>
      </div>
      <div class="bar_item_5 son_fit_father">
        <div class="bar_title bottom_line">XXXXXX</div>
        <div class="gird_column_2_5">
          <div class="bar_subtitle">XX统计图</div>
          <div class="bar_subtitle">XX趋势图</div>
        </div>
        <div class="gird_column_2_5 son_fit">
          <Echarts optionType="pieOne" :chartData="pieDataTwo" fromWhere="index_threaten_count"></Echarts>
          <div class="fill_content">
            <Echarts
              optionType="indexLine"
              :chartData="lineData"
              fromWhere="index_terminal"
              class="left_line"
            ></Echarts>
          </div>
          <!-- <Echarts optionType="barFour" :chartData="barFourData" fromWhere="index_terminal"></Echarts> -->
        </div>
      </div>
      <div class="bar_item_6 son_fit_father">
        <div class="bar_title bottom_line">XXXX</div>
        <div class="bar_subtitle">XXXX统计（XX数）</div>
        <div class="son_fit countRanking">
          <div v-for="item in countRanking" :key="item.id">
            <div
              class="flex_row"
              style="justify-content: space-between;padding-right:50px;box-sizing:border-box;margin-bottom: 5px;"
            >
              <span style="font-size: 12px;color:#9095ab;">{{item.name}}</span>
              <span style="font-size: 12px;color:#c2c2c2;">{{item.count}}</span>
            </div>
            <el-progress
              :stroke-width="12"
              :percentage="parseInt(item.percentage)"
              color="#295bf9"
              define-back-color="#eff2ff"
            ></el-progress>
          </div>
        </div>
      </div>
      <div class="bar_item_7 son_fit_father">
        <!-- <div class="bar_title bottom_line">XXXX</div> -->
        <div class="bar_title bottom_line flex_row_center" style="justify-content: space-between;">
          <span>XXXX</span>
          <self-tabs :selfTabs="selfTabs" @tab-click="handleTabClick"></self-tabs>
        </div>
        <index-report-table :tableData="tableDataTwo"></index-report-table>
      </div>
    </div>
  </div>
</template>

<script>
import WordCloud from "./components/WordCloud.vue";
import Echarts from "./components/Echarts.vue";
import assetTopFiveTable from "./components/assetTopFiveTable.vue";
import indexReportTable from "./components/indexReportTable.vue";
import selfTabs from "./components/selfTabs.vue";
import someSearch from "./components/someSearch.vue";
import { homePageData } from "./mixins/homePageData";
export default {
  mixins: [homePageData],
  components: {
    WordCloud,
    Echarts,
    assetTopFiveTable,
    indexReportTable,
    selfTabs,
    someSearch,
  },
  data() {
    return {
      selfTabs: [
        { label: "类型一", sign: 1 },
        { label: "类型二", sign: 2 },
        { label: "类型三", sign: 3 },
      ],
    };
  },
  methods: {
    handleTabClick(sign) {
      this.tableDataTwo.forEach((item) => {
        item.type = sign;
      });
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0;
  /* 滚动条宽度 */
  height: 0;
}
.index_page_overall {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  box-sizing: border-box;
  border-radius: 10px;
  background: #e9ecef !important;
  display: grid;
  /* grid-template-rows: repeat(auto-fit, 1fr); */
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.index_page_overall > div {
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 8px 24px 24px;
  min-width: 740px;
}
.bar_item_1,
.bar_item_2 {
  height: 81vh;
  box-sizing: border-box;
  min-height: 750px;
}
.bar_item_3,
.bar_item_4,
.bar_item_5 {
  grid-column: span 2;
  height: 43vh;
  min-height: 380px;
}
.bar_item_6,
.bar_item_7 {
  height: 53vh;
  min-height: 480px;
}
@media screen and (max-width: 1600px) {
  .bar_item_1,
  .bar_item_2,
  .bar_item_6,
  .bar_item_7 {
    grid-column: span 2;
  }
}
.bar_subtitle {
  height: 32px;
  line-height: 32px;
  font-weight: 700;
  font-size: 14px;
  color: #000000;
  width: 100%;
  box-sizing: border-box;
  /* border-bottom: 1px solid #ebeff7; */
}
@font-face {
  font-family: "segment7";
  src: url("@/assets/fonts/segment7-4gml.ttf");
}

.bar_1_top {
  width: 100%;
  display: flex;
  gap: 24px;
  height: 31vh;
  min-height: 260px;
}
.bar_1_top > div {
  flex: 1;
  min-width: 340px;
}
.bar_1_top_left {
  background: url(@/assets/images/homePage/day_count_bg.jpg) no-repeat;
  background-size: 100% 100%;
  border-radius: 8px;
}
.bar_1_top_left > .title {
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
  display: inline-block;
  height: 90px;
  line-height: 90px;
  padding-left: 48px;
}
.day_count {
  display: flex;
  align-items: center;
  justify-content: center;
}
.day_count_num {
  display: inline-block;
  width: 60px;
  height: 80px;
  background: #ffffff3b;
  border-radius: 8px;
  margin: 0 8px;
  font-size: 60px;
  color: #ffffff;
  font-family: segment7;
  vertical-align: middle;
  display: flex;
  align-items: self-end;
  justify-content: center;
}
.day_count_text {
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
}
.bar_1_top_right {
  background: #f2f5fd;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  gap: 60px;
}
.bar_1_top_right_item {
  width: 130px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item_img_1 {
  width: 105px;
  height: 94px;
  background: url(@/assets/images/homePage/alarm.png) 100% 100% no-repeat;
}
.item_img_3 {
  width: 68px;
  height: 68px;
  background: url(@/assets/images/homePage/img_1.jpg) 100% 100% no-repeat;
}
.item_img_4 {
  width: 68px;
  height: 68px;
  background: url(@/assets/images/homePage/img_2.jpg) 100% 100% no-repeat;
}
.gauge_echart {
  background: url(@/assets/images/homePage/guage_echart_bg.png) center no-repeat;
  background-size: 50% auto;
  position: relative;
}
.gauge_echart::before {
  content: "";
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 55%;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.item_num {
  margin-top: 30px;
  font-size: 36px;
  color: #000000;
}
.item_text {
  margin-top: 12px;
  font-weight: 400;
  font-size: 14px;
  color: #8086a0;
}
.bar_1_middle {
  width: 100%;
  height: 150px;
  background: #f2f5fd;
  border-radius: 12px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.bar_1_middle_left {
  display: flex;
  align-items: center;
}
.bar_1_middle_left > .date {
  font-weight: 400;
  font-size: 24px;
  color: #2d5bf9;
}
.bar_1_middle_left > .num {
  font-size: 48px;
  color: #2d5bf9;
  margin-left: 36px;
}
.bar_1_middle_right {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bar_1_middle_right > .text {
  font-weight: 400;
  font-size: 16px;
  color: #000000;
}
.bar_1_middle_right > .btn {
  width: 180px;
  height: 50px;
  background: #2d5df91e;
  color: #2d5bf9;
  border-radius: 25px;
  margin-top: 12px;
  cursor: pointer;
}
/* .bar_1_bottom {
} */
.bar_title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-weight: 400;
  font-size: 16px;
  color: #2d5bf9;
}
.bar_2 {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}
.bar_2 > div {
  display: grid;
  place-items: center;
}
.bar_2_top {
  grid-column: 1 / 3;
}
.gird_column_2_5 {
  display: grid;
  grid-template-columns: 2fr 5fr;
}
::v-deep .el-table .el-table__cell {
  padding: 0;
  height: 50px;
  line-height: 50px;
  font-size: 12px;
}
::v-deep .el-table__header .el-table__cell {
  background: #f5f7fb;
  font-weight: normal;
  color: #000;
  font-weight: 700;
}
::v-deep .el-table__header .el-table__cell {
  height: 40px !important;
  line-height: 40px !important;
}
::v-deep .el-table .cell {
  padding: 0;
}
::v-deep.el-table::before {
  height: 0;
}
.countRanking {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>