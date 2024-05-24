<template>
  <div ref="echart" style="width: 100%;height:calc(100% - 1px);"></div>
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
      // 资产总览环形图
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
          left: "62%",
          textStyle: {
            color: "#959caf",
            rich: {
              a: {
                width: 120,
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
            radius: [80, 95],
            center: ["25%", "50%"],
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
      // 资产总览柱状图
      assetOverviewBarOption: {
        // backgroundColor: "#323a5e",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "2%",
          top: "12%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Windows", "Linux", "Mac"],
          axisLine: {
            lineStyle: {
              color: "#b3b7be",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              fontFamily: "Microsoft YaHei",
              color: "#b3b7be",
            },
          },
        },
        yAxis: {
          type: "value",
          // max: "1200",
          name: "个",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#b3b7be",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#b3b7be",
              type: [3],
            },
          },
          axisLabel: {},
        },
        series: [
          {
            name: "",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#2D5BF9",
                // barBorderRadius: 11,
                // label: {
                //   show: true,
                //   position: "top",
                // },
              },
            },
            data: [600, 1000, 700],
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
        case "assetOverviewBar":
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
        case "assetOverviewBar":
          return this.assetOverviewBarOption;
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