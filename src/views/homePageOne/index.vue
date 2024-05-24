<template>
  <section class="son_fit_father" style="position: relative;  border-radius: 10px;">
    <div class="top_bar fff son_fit_father">
      <div class="subtitle">
        <span class="title">资产概览</span>
        <span class="last_time">最近更新：2024 05-23 13:30:00</span>
      </div>
      <div class="son_fit cards">
        <div class="card">
          <span class="desc">7天内即将退库资产</span>
          <span class="num">0</span>
          <img src="@/assets/images/homePageOne/card_1.png" alt />
        </div>
        <div class="card">
          <span class="desc">全部资产</span>
          <span class="num">30497</span>
          <img src="@/assets/images/homePageOne/card_2.png" alt />
        </div>
        <div class="card">
          <span class="desc">核心资产数</span>
          <span class="num">1</span>
          <img src="@/assets/images/homePageOne/card_3.png" alt />
        </div>
        <div class="card">
          <span class="desc">数据库</span>
          <span class="num">3</span>
          <img src="@/assets/images/homePageOne/card_4.png" alt />
        </div>
        <div class="card">
          <span class="desc">中间件</span>
          <span class="num">30494</span>
          <img src="@/assets/images/homePageOne/card_5.png" alt />
        </div>
      </div>
    </div>
    <div class="son_fit bg_gray three_two_grid overall">
      <div class="card fff son_fit_father">
        <span class="title">安全部署统计</span>
        <div class="son_fit lock_son">
          <div class="card_1">
            <div class="bar">
              <span class="desc">正常台数（台）</span>
              <span class="num">500</span>
            </div>
            <div class="bar">
              <span class="desc">下线台数（台）</span>
              <span class="num">10</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card fff son_fit_father">
        <span class="title">数据库TOP5</span>
        <div class="son_fit lock_son">
          <div class="card_2">
            <div class="bar">
              <span class="desc">
                MySQL
                <span>（mysql）</span>
              </span>
              <span class="num">5</span>
            </div>
            <div class="bar">
              <span class="desc">
                MSSQL
                <span>（mssql）</span>
              </span>
              <span class="num">4</span>
            </div>
            <div class="bar">
              <span class="desc">
                Oracle
                <span>（oracle）</span>
              </span>
              <span class="num">3</span>
            </div>
            <div class="bar">
              <span class="desc">
                Redis
                <span>（radis）</span>
              </span>
              <span class="num">2</span>
            </div>
            <div class="bar">
              <span class="desc">
                Mongodb
                <span>（mongodb）</span>
              </span>
              <span class="num">2</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card fff son_fit_father">
        <span class="title">中间件TOP5</span>
        <div class="son_fit lock_son">
          <div class="card_2">
            <div class="bar">
              <span class="desc">
                Apache
                <span>（apache）</span>
              </span>
              <span class="num">2</span>
            </div>
            <div class="bar">
              <span class="desc">
                Nginx
                <span>（nginx）</span>
              </span>
              <span class="num">2</span>
            </div>
            <div class="bar">
              <span class="desc">
                Tomcat
                <span>（tomcat）</span>
              </span>
              <span class="num">1</span>
            </div>
            <div class="bar">
              <span class="desc">
                IIS
                <span>（iis）</span>
              </span>
              <span class="num">0</span>
            </div>
            <div class="bar">
              <span class="desc">
                Zookeeper
                <span>（zookeeper）</span>
              </span>
              <span class="num">0</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card fff son_fit_father">
        <span class="title">资产类型</span>
        <div class="son_fit lock_son">
          <Echarts
            optionType="assetOverviewBar"
            :chartData="assetOverviewBarData"
            fromWhere="index_server"
          ></Echarts>
        </div>
      </div>
      <div class="card fff son_fit_father">
        <span class="title">操作系统分布</span>
        <div class="son_fit lock_son">
          <Echarts optionType="pie" :chartData="pieDataOne" fromWhere="index_server"></Echarts>
        </div>
      </div>
      <div class="card fff son_fit_father">
        <span class="title">当月新增资产</span>
        <div class="son_fit lock_son" ref="newAssetTable">
          <el-table :data="tableData" :height="tableHeight">
            <el-table-column prop="assetName" label="资产名称" width="100"></el-table-column>
            <el-table-column prop="time" label="新增时间" width="90"></el-table-column>
            <el-table-column prop="deptName" label="单位名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="type" label="类型" width="80"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
import Echarts from "./echarts.vue";
export default {
  components: { Echarts },
  data() {
    return {
      pieDataOne: {},
      assetOverviewBarData: {},
      tableData: [],
      tableHeight: 0,
    };
  },
  methods: {
    // 表格高度自适应
    setTableHeight() {
      this.tableHeight = 0;
      this.$nextTick(() => {
        this.tableHeight = this.$refs["newAssetTable"].offsetHeight - 1;
      });
    },
  },
  mounted() {
    this.setTableHeight();
    window.addEventListener("resize", this.setTableHeight);
    this.$nextTick(() => {
      this.assetOverviewBarData = {};
      this.pieDataOne = {
        pieData: [
          { value: 300, name: "主机资产", itemStyle: { color: "#2f82ff" } },
          { value: 100, name: "应用资产", itemStyle: { color: "#82b4ff" } },
          {
            value: 100,
            name: "APP/小程序资产",
            itemStyle: { color: "#accdff" },
          },
        ],
        count: 500,
        msg: "资产数",
      };
      this.tableData = [
        {
          assetName: "10.239.220.82",
          time: "2024/05/22",
          deptName: "xxxxxxxxxxxxxxxxxxxxxxxxx",
          type: "xxxxx",
        },
        {
          assetName: "10.239.220.82",
          time: "2024/05/22",
          deptName: "xxxxxxxxxxxxxxxxxxxxxxxxx",
          type: "xxxxx",
        },
        {
          assetName: "10.239.220.82",
          time: "2024/05/22",
          deptName: "xxxxxxxxxxxxxxxxxxxxxxxxx",
          type: "xxxxx",
        },
        {
          assetName: "10.239.220.82",
          time: "2024/05/22",
          deptName: "xxxxxxxxxxxxxxxxxxxxxxxxx",
          type: "xxxxx",
        },
        {
          assetName: "10.239.220.82",
          time: "2024/05/22",
          deptName: "xxxxxxxxxxxxxxxxxxxxxxxxx",
          type: "xxxxx",
        },
        {
          assetName: "10.239.220.82",
          time: "2024/05/22",
          deptName: "xxxxxxxxxxxxxxxxxxxxxxxxx",
          type: "xxxxx",
        },
      ];
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setTableHeight);
  },
};
</script>
  
<style lang="scss" scoped>
.main-title {
  display: none;
}
.top_bar {
  width: 100%;
  height: 160px;
  min-height: 160px;

  .subtitle {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 16px;
    .title {
      font-weight: 700;
      font-size: 16px;
      color: #000000;
      margin-right: 20px;
    }

    .last_time {
      font-weight: 400;
      font-size: 12px;
      color: #7c869c;
    }
  }
  .cards {
    padding: 0 16px 16px;
    display: flex;
    gap: 16px;
    .card {
      flex: 1;
      border-radius: 6px;
      position: relative;
      color: #ffffff;
      min-width: 130px;
      .desc {
        font-size: 14px;
        letter-spacing: 2px;
        position: absolute;
        top: 16px;
        left: 24px;
      }
      .num {
        font-size: 24px;
        position: absolute;
        bottom: 16px;
        left: 24px;
      }
      img {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
      }
      &:nth-of-type(1) {
        background-color: #ff5b5b;
      }
      &:nth-of-type(2) {
        background: #19b9ff;
      }
      &:nth-of-type(3) {
        background: #5975e9;
      }
      &:nth-of-type(4) {
        background: #2cd0c8;
      }
      &:nth-of-type(5) {
        background: #44d571;
      }
    }
  }
}
.three_two_grid {
  padding-top: 16px;
  display: grid;
  grid-template-columns: 3fr 4fr 4fr; /* 设置三列，比例为1:2:2 */
  grid-template-rows: auto auto; /* 两行 */
  gap: 16px; /* 网格间隙 */
  .card {
    .title {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #7c869c;
      padding-left: 16px;
    }
    .card_1 {
      box-sizing: border-box;
      padding: 16px 30px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      .bar {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 30px;
        padding-right: 30px;
        .desc {
          display: flex;
          align-items: center;
          font-weight: 400;
          font-size: 16px;
        }
        .num {
          font-size: 24px;
          color: #000000;
        }
        &:nth-of-type(1) {
          background: #f0f6ff;
          border: 1px solid #a6baff;
          border-radius: 4px;
          .desc {
            color: #0030d5;
            &::before {
              content: "";
              display: inline-block;
              width: 36px;
              height: 36px;
              background: #cad8fe;
              border-radius: 4px;
              margin-right: 16px;
            }
          }
        }
        &:nth-of-type(2) {
          background: #f9942d1a;
          border: 1px solid #edc481;
          border-radius: 4px;
          .desc {
            color: #9b6100;
            &::before {
              content: "";
              display: inline-block;
              width: 36px;
              height: 36px;
              background: #fce4c2;
              border-radius: 4px;
              margin-right: 16px;
            }
          }
        }
      }
    }
    .card_2 {
      box-sizing: border-box;
      padding: 0 10px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .bar {
        flex: 1;
        background: #f3f6fb;
        border-radius: 4px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .desc {
          font-weight: 700;
          font-size: 12px;
          color: #000000;
          span {
            font-weight: 400;
            font-size: 12px;
            color: #868da5;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1500px) {
  .overall {
    overflow: auto;
  }
  .three_two_grid {
    display: grid;
    grid-template-rows: 40vh;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 40vh;
    gap: 10px; /* 你可以根据需要调整行之间的间距 */
  }
}
@media screen and (max-width: 990px) {
  .overall {
    overflow: auto;
  }
  .three_two_grid {
    display: grid;
    grid-template-rows: 40vh;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: 40vh;
    gap: 10px; /* 你可以根据需要调整行之间的间距 */
  }
}
</style>
