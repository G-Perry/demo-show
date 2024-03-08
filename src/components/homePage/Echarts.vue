<template>
  <div ref="echart" style="width: 100%;height: 100%;"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "EchartsPage",
  props: {
    optionType: {
      type: String,
      required: true,
    },
    fromWhere: {
      type: String,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  data() {
    return {
      pieOption: {
        // color: ["#cc3333", "#ed5454", "#ff9900", "#4d8dd9"],
        tooltip: {
          show: true, // 是否显示
          trigger: "item", // 触发类型  'item'图形触发：散点图，饼图等无类目轴的图表中使用； 'axis'坐标轴触发；'none'：什么都不触发。
          axisPointer: {
            // 坐标轴指示器配置项。
            type: "shadow", // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示器  'cross' 十字准星指示器。
            axis: "auto", // 指示器的坐标轴。
            snap: true, // 坐标轴指示器是否自动吸附到点上
          },
          renderMode: "html", // 浮层的渲染模式，默认以 'html 即额外的 DOM 节点展示 tooltip；
          backgroundColor: "#fff", // 提示框浮层的背景颜色。
          borderColor: "#dedede", // 提示框浮层的边框颜色。
          borderRadius: 1,
          borderWidth: 1, // 提示框浮层的边框宽。
          padding: 5, // 提示框浮层内边距，
          textStyle: {
            // 提示框浮层的文本样式。
            color: "#000",
            fontStyle: "normal",
            fontWeight: "normal",
            fontFamily: "sans-serif",
            fontSize: 14,
          },
          confine: false, // 是否将 tooltip 框限制在图表的区域内。
          formatter: "{b} : {c} 个",
        },
        legend: {
          icon: "circle",
          itemlength: 20,
          itemWidth: 10,
          itemGap: 20,
          orient: "vertical",
          align: "left",
          top: "middle",
          // right: "17%",
          left: "55%",
          textStyle: {
            color: "#959caf",
            rich: {
              a: {
                width: 50,
              },
              b: {
                // fontSize: 12,
                color: "#0C1646",
              },
            },
          },
          height: 150,
          formatter: (name) => {
            let num = this.pieOption.series[0].data.find(
              (item) => item.name === name
            ).value;
            return `{a|${name}\t:}{b|${num}}`;
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: [50, 65],
            center: ["29%", "50%"],
            // hoverAnimation: false,已弃用
            emphasis: {
              scale: false,
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            label: {
              // normal: {
              show: true,
              position: "center",
              color: "#4c4a4a",
              formatter:
                "{a|" + "8" + "}" + "{b| 个}" + "\n" + "{c|风险服务器}",
              rich: {
                a: {
                  fontSize: 30,
                },
                b: {
                  fontSize: 14,
                  lineHeight: 40,
                },
                c: {
                  fontSize: 14,
                  color: "#999",
                },
              },
              // },
            },
            emphasis: {
              disabled: true,
            },
            data: [],
            // { value: 1048, name: "已失陷" },
            // { value: 735, name: "高危" },
            // { value: 580, name: "中危" },
            // { value: 484, name: "低危" }
          },
        ],
      },
      pieOneOption: {
        legend: { show: false },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["40%", "60%"],
            itemStyle: { borderColor: "#fff", borderWidth: 2 },
            color: [
              "#005de8",
              "#1a6dea",
              "#337ded",
              "#4d8eef",
              "#669ef1",
              "#80aef4",
              "#99bef6",
              "#b3cef8",
              "#ccdffa",
              "#e6effd",
            ],
            avoidLabelOverlap: true,
            minShowLabelAngle: 10,
            label: {
              formatter: "{dot|}{name|{b}}\n{value|{c}个}",
              // alignTo: "edge",
              // edgeDistance: 10,
              minMargin: 5,
              lineHeight: 15,
              rich: {
                dot: {
                  width: 8,
                  height: 8,
                  backgroundColor: "inherit",
                  borderRadius: 5,
                },
                name: {
                  fontSize: 14,
                  color: "inherit",
                  padding: [0, 20, 0, 8],
                },
                value: {
                  fontSize: 12,
                  align: "left",
                  color: "#8a8ea6",
                  padding: [8, 0, 0, 18],
                },
                // c: {
                //   fontSize: 12,
                //   align: "left",
                //   color: "#666666",
                //   padding: [8, 0, 0, 8],
                // },
              },
            },
            data: [
              { value: 28, name: "xxx" },
              { value: 18, name: "xxx" },
              { value: 11, name: "xxx" },
              { value: 3, name: "xxx" },
              { value: 11, name: "xxx" },
              { value: 2, name: "xxx" },
              { value: 6, name: "xxx" },
            ],
          },
        ],
      },
      // 首页得分仪表图
      indexGaugeOption: {
        series: [
          {
            type: "gauge",
            min: 0,
            max: 100,
            splitNumber: 10,
            radius: "70%",
            axisLine: {
              // 半圆弧线
              show: false,
            },
            splitLine: {
              // 大分隔线
              distance: -26,
              length: 10,
              lineStyle: {
                color: "#D8D8D8",
                width: 1,
              },
            },
            axisTick: {
              // 小分隔线
              splitNumber: 4,
              distance: -20,
              length: 6,
              lineStyle: {
                color: "#D8D8D8",
              },
            },
            axisLabel: {
              // 数字
              distance: -20,
              color: "#b0b3c3",
              fontSize: 12,
            },
            progress: {
              // 进度条选项
              distance: 0,
              show: true,
              roundCap: true,
              width: 12,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0.2,
                  y: 1,
                  x2: 1,
                  y2: 0.6,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#cad7fd", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#295bf9", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            anchor: {
              show: false,
            },
            pointer: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              formatter: function (value) {
                function getScore(value) {
                  if (value < 60) {
                    return "差";
                  } else if (value < 80) {
                    return "中";
                  } else if (value < 90) {
                    return "良";
                  } else if (value <= 100) {
                    return "优";
                  }
                }
                return "{a|" + getScore(value) + "\n}" + "{b|" + value + "分}";
              },
              rich: {
                a: {
                  fontSize: 25,
                  fontWeight: 600,
                  color: "#000",
                  lineHeight: 40,
                },
                b: {
                  fontSize: 12,
                  color: "#000",
                },
              },
              offsetCenter: [0, "0%"],
            },
            title: {
              offsetCenter: [0, "-50%"],
            },
            data: [
              {
                value: 70,
              },
            ],
          },
        ],
      },
      // 首页威胁趋势折线图
      indexLineOption: {
        // backgroundColor: '#000',
        grid: {
          left: "2%",
          right: "3%",
          top: "10%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "axis",
          padding: 0,
          borderWidth: 0,
          // alwaysShowContent: true,//提示框常现
          formatter: (params) => {
            // name=>{b}
            // value=>{c}
            let reg = /(?!^)(?=(\d{3})+$)/g;
            let valueStr = params[0].value + "";
            valueStr = valueStr.replace(reg, ",");
            return `<div
        style="display: flex;flex-direction: column;text-align:center"
      >
        <div style="box-sizing:border-box;padding:0 20px;background: #edf0f6;height:25px;line-height:25px">${params[0].name}</div>
        <div style="box-sizing:border-box;padding:0 20px;height:40px;line-height:40px">${valueStr}</div>
      </div>`;
          },
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#b8bed0",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              // color: '#8BC4F2',
              margin: 6,
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            // boundaryGap: ["5%", "5%"],
            data: [
              "2024-3-1",
              "2024-3-2",
              "2024-3-3",
              "2024-3-4",
              "2024-3-5",
              "2024-3-6",
              "2024-3-7",
              "2024-3-8",
              "2024-3-9",
              "2024-3-10",
              "2024-3-11",
              "2024-3-12",
              "2024-3-13",
              "2024-3-14",
              "2024-3-15",
              // "2024-3-6",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              // color: '#8BC4F2',
              margin: 6,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            // stack: "总量",
            symbolSize: 6,
            itemStyle: {
              color: "#2D5BF9",
              borderWidth: 2,
            },
            showSymbol: false, //不显示圆点，鼠标移入显示圆点
            // symbol: 'none',不显示圆点，鼠标移入也不显示圆点
            areaStyle: {
              //区域填充渐变颜色
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(128, 180, 242, 1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(237, 243, 251,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: [
              1811120, 441312, 881601, 1111324, 224322, 455251, 1222234, 312230,
              823310, 881812, 511191, 235514, 992390, 888330, 1662766,
            ],
          },
        ],
      },
      echart: null,
    };
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.option);
      } else {
        this.echart = echarts.init(this.$refs.echart, null, {
          renderer: "svg",
        });
        this.echart.setOption(this.option);
      }

      // 处理echarts点击事件
      this.echart.off("click"); //防止单机一次触发多次事件
      this.echart.on("click", (params) => {
        params;
      });
    },
    initChartData() {
      switch (this.optionType) {
        case "pie":
          this.pieOption.series[0].data = this.chartData.pieData;
          // this.pieOption.series[0].label.normal.formatter =
          this.pieOption.series[0].label.formatter =
            "{a|" +
            this.chartData.count +
            "}" +
            "{b| 个}" +
            "\n" +
            "{c|" +
            this.chartData.msg +
            "}";
          break;
        case "pieOne":
          this.pieOneOption.series[0].data = this.chartData.data;
          break;
        case "indexGauge":
          break;
        case "indexLine":
          break;
        default:
          break;
      }
    },
  },
  computed: {
    option() {
      switch (this.optionType) {
        case "pie":
          return this.pieOption;
        case "pieOne":
          return this.pieOneOption;
        case "indexGauge":
          return this.indexGaugeOption;
        case "indexLine":
          return this.indexLineOption;
        default:
          break;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.echart.resize();
    });
  },
};
</script>

<style>
</style>