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
    chartData: {
      type: Object,
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
      gaugeOption: {
        series: [
          {
            type: "gauge",
            min: 0,
            max: 100,
            progress: {
              //进度条
              show: true,
              itemStyle: {
                color: "red",
              },
              roundCap: false,
              width: 15,
            },
            radius: "95%",

            axisLine: {
              //阴影背景
              lineStyle: {
                width: 15,
                color: [[1, "#eeeeee"]],
              },
              roundCap: false,
            },

            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            anchor: {
              show: false,
              // show: true,
              showAbove: true,
              size: 25,
              itemStyle: {
                borderWidth: 10,
              },
            },

            title: {
              show: true,
              fontSize: 36,
              offsetCenter: [0, "50%"],
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
                  fontSize: 30,
                  fontWeight: 600,
                  color: "red",
                  lineHeight: 60,
                },
                b: {
                  fontSize: 14,
                  color: "#000",
                  width: 70,
                  height: 25,
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: "#edf3fb",
                  backgroundColor: "#f5f8fd",
                },
              },
              offsetCenter: [0, "0%"],
            },
            pointer: {
              icon: "path://M1111,597 L1132.11539,618.106994 C1232.09323,628.651417 1310,713.227657 1310,816 C1310,925.904665 1220.90467,1015 1111,1015 C1001.09533,1015 912,925.904665 912,816 C912,713.227315 989.907293,628.650853 1089.88561,618.106888 L1111,597 Z",
              length: "140%",
              width: "136%",
              offsetCenter: [0, "66%"],
              itemStyle: {
                color: "transparent",
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "red", // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#fff", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 15,
                borderWidth: 1,
              },
            },
            data: [
              {
                value: 90,
                // name: "高风险事件"
              },
            ],
          },
          {
            type: "gauge",
            min: 0,
            max: 100,
            splitNumber: 5,
            radius: "78%",
            axisLine: {
              lineStyle: {
                color: [[1, "red"]],
                width: 1,
              },
            },
            splitLine: {
              distance: 0,
              length: 5,
              lineStyle: {
                color: "red",
                width: 1,
              },
            },
            axisTick: {
              distance: 0,
              length: 3,
              lineStyle: {
                color: "red",
                width: 1,
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            title: {
              show: false,
            },
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
      this.echart.off("click"); //防止单机一次触发多次事件
      this.echart.on("click", (params) => {
        params;
      });
    },
    initChartData() {
      switch (this.optionType) {
        case "":
          break;
        case "gauge":
          this.gaugeOption.series[0].data[0].value = this.chartData.value;
        default:
          break;
      }
    },
  },
  computed: {
    option() {
      switch (this.optionType) {
        case "gauge":
          return this.gaugeOption;
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