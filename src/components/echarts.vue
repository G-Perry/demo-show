<template>
  <div ref="echart" style="width: 100%; height: 100%"></div>
</template>
  
  <script>
import * as echarts from "echarts";
import { nameMap } from "@/utils/echartsMapData";
import worldMap from "@/utils/world.json";
import "echarts-gl";
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
        // console.log(111);
        this.initChart();
      },
      deep: true,
    },
  },
  data() {
    return {
      firstOption: {
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
                // name: ""
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
      secondOption: {
        grid: {
          left: "2%",
          right: "6%",
          top: "10%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "axis",
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                // color: '#85C1D9'
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
            boundaryGap: ["5%", "5%"],
            data: [
              "0点",
              "1点",
              "2点",
              "3点",
              "4点",
              "5点",
              "6点",
              "7点",
              "8点",
              "9点",
              "10点",
              "11点",
              "12点",
              "13点",
              "14点",
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
              lineStyle: {
                // color: 'red',
                type: "dashed",
              },
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
              color: "#c07f80",
              // borderColor: 'red',
              borderWidth: 2,
            },
            data: [
              120, 132, 101, 134, 90, 432, 421, 234, 230, 210, 182, 191, 234,
              290, 330,
            ],
          },
        ],
      },
      thirdOption: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["类别一", "类别二"],
          bottom: "0%",
          icon: "rect",
          itemGap: 40,
          itemHeight: 12,
          itemWidth: 12,
          textStyle: {
            color: "#c2c2c2",
          },
        },
        grid: {
          left: "3%",
          right: "8%",
          top: "5%",
          bottom: "3%",
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          show: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "#3d3d3d",
            },
          },
        },
        series: [
          {
            name: "类别一",
            type: "line",
            // stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#1a63fa",
                lineStyle: {
                  width: 1,
                },
              },
            },
          },
          {
            name: "类别二",
            type: "line",
            // stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#6dd400",
                lineStyle: {
                  width: 1,
                },
              },
            },
          },
        ],
      },
      forthOption: {
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
          data: ["口岸医院", "镇政府", "某某商城", "邮储银行", "菜市场"],
          axisLine: {
            lineStyle: {
              color: "#325c65",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              fontFamily: "Microsoft YaHei",
              color: "#fff",
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
              color: "#fff",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#1f3445",
              type: [5, 10],
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
                color: "#8df5ff",
                barBorderRadius: 11,
                label: {
                  show: true,
                  position: "top",
                },
              },
            },
            data: [400, 600, 700, 700, 1000, 400],
          },
        ],
      },
      fifthOption: {
        grid: {
          top: "3%",
          left: "6%",
          right: "6%",
          bottom: "15%",
        },
        tooltip: {
          trigger: "axis",
          show: true,
          borderWidth: 1,
          borderRadius: 0,
          extraCssText: "box-shadow: 0 0 0;",
          borderColor: "#dddddd",
          formatter: (params) => {
            let iconColorMap = {
              等级一: "#aa0000",
              等级二: "#ee5555",
              等级三: "#ff9900",
              等级四: "#4d8dd9",
              等级五: "#39bba2",
            };
            let result =
              '<span style="font-size:12px">' +
              params[0].name +
              "</span>" +
              "<br />" +
              '<sapn style="font-size:12px;color:' +
              iconColorMap[params[0].data] +
              '">' +
              params[0].data +
              "</span>";
            return result;
          },
          position: "top",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#999",
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: "#d8e0f0",
            },
          },
        },
        yAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#999",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#ddd",
            },
          },
          boundaryGap: false,
          data: ["等级五", "等级四", "等级三", "等级二", "等级一"],
        },
        series: [
          {
            type: "line",
            // data: ["等级五", "等级五", "等级三", "等级四", "等级二", "等级一", "等级一"],
            // silent: true,
            showSymbol: false,
            lineStyle: {
              width: 1, //外边线宽度
              color: "#4f8eda", //外边线颜色
            },
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
            smooth: true,
          },
        ],
      },
      sixthOption: {
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
          right: "17%",
          textStyle: {
            color: "#000",
          },
          height: 150,
          formatter: (name) => {
            return (
              name +
              ": " +
              this.sixthOption.series[0].data.find((item) => item.name === name)
                .value +
              "个"
            );
          },
          // formatter: "{b} : {c} 个"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: [50, 65],
            center: ["29%", "50%"],
            hoverAnimation: false,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            label: {
              normal: {
                show: true,
                position: "center",
                color: "#4c4a4a",
                formatter: "{a|" + "8" + "}" + "{b| 个}" + "\n" + "{c|XXXX}",
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
              },
            },
            emphasis: {
              disabled: true,
            },
            data: [
              { value: 1048, name: "已失陷" },
              { value: 735, name: "高危" },
              { value: 580, name: "中危" },
              { value: 484, name: "低危" },
            ],
          },
        ],
      },
      seventhOption: {
        tooltip: {
          trigger: "item",
        },
        geo: {
          type: "map",
          map: "world",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          nameMap: nameMap,
          label: {
            show: false,
            fontFamily: " Microsoft YaHei",
            fontSize: 12,
            color: "#fff",
          },
          selectedMode: "single",
          itemStyle: {
            borderColor: "rgb(26,43,66)", //边界线颜色
            areaColor: "rgb(43,84,88)", //默认区域颜色
          },
          emphasis: {
            label: {
              color: "#fff",
            },
            itemStyle: {
              show: true,
              areaColor: "rgb(115,243,229)", //鼠标滑过区域颜色
            },
          },
          select: {
            itemStyle: {
              areaColor: "rgb(115,243,229)",
            },
            label: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "circle",
            symbolSize: 3,
            itemStyle: {
              color: "yellow",
            },
            emphasis: {
              itemStyle: {
                borderColor: "yellow",
              },
              label: {
                show: true,
                formatter: "{b}",
                position: "bottom",
              },
            },
            data: [],
          },
          {
            type: "lines",
            coordinateSystem: "geo",
            // 动画效果
            effect: {
              show: true,
              period: 4, //特效动画的时间，单位为 s
              trailLength: 0.2, //特效尾迹的长度。0~1数值越大尾迹越长
              trailColor: "#FF2A2E",
              trailWidth: 3,
              trailOpacity: 1,
            },
            lineStyle: {
              color: "#FF2A2E",
              width: 2,
              opacity: 0.1,
              curveness: 0.2,
            },
            blendMode: "lighter",
            data: [],
          },
          {
            name: "总攻击个数",
            type: "map",
            geoIndex: 0,
            data: [],
          },
        ],
      },
      eightPrevOption: {
        backgroundColor: "rgb(22,56,124)",
        series: [
          {
            id: "worldMap",
            type: "map",
            map: "world",
            // 绘制完整尺寸的 echarts 实例
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            nameMap: nameMap,
            boundingCoords: [
              [-180, 90],
              [180, -90],
            ],
            itemStyle: {
              borderColor: "rgb(13,70,103)", //边界线颜色
              areaColor: "rgb(0,4,8)", //默认区域颜色
            },
            emphasis: {
              label: {
                color: "#fff",
              },
              itemStyle: {
                show: true,
                areaColor: "rgb(8,51,102)", //鼠标滑过区域颜色
              },
            },
            select: {
              itemStyle: {
                areaColor: "rgb(8,51,102)",
              },
              label: {
                color: "#fff",
              },
            },
          },
        ],
      },
      eighthOption: {
        backgroundColor: "#000",
        globe: {
          show: true,
          shading: "lambert",
          // baseTexture: texture,
          // baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
          atmosphere: {
            show: false, //显示大气层
            offset: 8,
            color: "#fff",
          },
          globeRadius: 80,
          emphasis: {
            focus: "self",
          },
          displacementScale: 0,
          environment: require("@/assets/images/star_bg.png"),
          light: {
            ambient: {
              intensity: 0.8, //环境光源强度
            }, //环境光
            main: {
              intensity: 0.2, //光源强度
            },
            postEffect: {
              enable: true,
              bloom: {
                enable: true,
                bloomIntensity: 1,
              },
            },
          },
          viewControl: {
            autoRotate: true, // 是否开启视角绕物体的自动旋转查看
            autoRotateSpeed: 3, //物体自转的速度,单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
            autoRotateAfterStill: 2, // 在鼠标静止操作后恢复自动旋转的时间间隔,默认 3s
            rotateSensitivity: 2, // 旋转操作的灵敏度，值越大越灵敏.设置为0后无法旋转。[1, 0]只能横向旋转.[0, 1]只能纵向旋转
            targetCoord: [116.46, 39.92], // 定位到北京
            maxDistance: 200,
            minDistance: 200,
          },
          layers: [
            {
              //地球表面层的配置，你可以使用该配置项加入云层，或者对 baseTexture 进行补充绘制出国家的轮廓等等。
              show: true,
              type: "blend",
              texture: {},
            },
          ],
        },
        series: [
          {
            type: "scatter3D",
            coordinateSystem: "globe",
            symbol: "circle",
            symbolSize: 3,
            itemStyle: {
              color: "#FF2A2E",
            },
            emphasis: {
              itemStyle: {
                borderColor: "yellow",
              },
              label: {
                show: true,
                formatter: "{b}",
                position: "bottom",
              },
            },
            // data: scatterList,
            data: [],
          },
          {
            type: "lines3D",
            coordinateSystem: "globe",
            // 动画效果
            effect: {
              show: true,
              period: 4, //特效动画的时间，单位为 s
              trailLength: 0.2, //特效尾迹的长度。0~1数值越大尾迹越长
              trailColor: "#FF2A2E",
              trailWidth: 3,
              trailOpacity: 1,
            },
            lineStyle: {
              color: "#FF2A2E",
              width: 2,
              opacity: 0.1,
            },
            blendMode: "lighter",
            // data: redLineList,
            data: [],
          },
          {
            type: "lines3D",
            coordinateSystem: "globe",
            // 动画效果
            effect: {
              show: true,
              period: 4, //特效动画的时间，单位为 s
              trailLength: 0.2, //特效尾迹的长度。0~1数值越大尾迹越长
              trailColor: "#F9D056",
              trailWidth: 3,
              trailOpacity: 1,
            },
            lineStyle: {
              color: "#F9D056",
              width: 2,
              opacity: 0.1,
            },
            blendMode: "lighter",
            // data: yellowLineList,
            data: [],
          },
          {
            type: "lines3D",
            coordinateSystem: "globe",
            // 动画效果
            effect: {
              show: true,
              period: 4, //特效动画的时间，单位为 s
              trailLength: 0.2, //特效尾迹的长度。0~1数值越大尾迹越长
              trailColor: "#00d7dc",
              trailWidth: 3,
              trailOpacity: 1,
            },
            lineStyle: {
              color: "#00d7dc",
              width: 2,
              opacity: 0.1,
            },
            blendMode: "lighter",
            // data: blueLineList,
            data: [],
          },
        ],
      },
      echart: null,
    };
  },
  methods: {
    initChart() {
      this.initChartData();
      // console.log(this.echart, 333);
      if (this.echart) {
        this.echart.setOption(this.option);
      } else {
        if (this.optionType == "seventh") {
          echarts.registerMap("world", { geoJSON: worldMap });
          this.echart = echarts.init(this.$refs.echart);
        } else if (this.optionType == "eighth") {
          echarts.registerMap("world", { geoJSON: worldMap });
          const canvas = document.createElement("canvas");
          const mapChart = echarts.init(canvas, null, {
            //作为3d地球表面图层的对象
            width: 2048,
            height: 1024,
          });
          mapChart.setOption(this.eightPrevOption);
          this.eighthOption.globe.layers[0].texture = mapChart;
          this.echart = echarts.init(this.$refs.echart);
          // console.log(mapChart, 444);
        } else {
          this.echart = echarts.init(this.$refs.echart, null, {
            renderer: "svg",
          });
        }
        this.echart.setOption(this.option);
      }
      this.echart.off("click"); //防止单机一次触发多次事件
      this.echart.on("click", (params) => {
        params;
      });
    },
    initChartData() {
      switch (this.optionType) {
        case "first":
          this.firstOption.series[0].data[0].value = this.chartData.value;
          let colorOne, colorTwo;
          function getScore(value) {
            if (value < 60) {
              colorOne = "#fc8484";
              colorTwo = "#f9c0c0";
            } else if (value < 80) {
              colorOne = "#ffa359";
              colorTwo = "#ffd9a0";
            } else if (value < 90) {
              colorOne = "#4d9cda";
              colorTwo = "#bfd6f1";
            } else if (value <= 100) {
              colorOne = "#0fb68d";
              colorTwo = "#ade2ce";
            }
          }
          getScore(this.chartData.value);
          this.firstOption.series[0].progress.itemStyle.color = colorOne;
          this.firstOption.series[0].detail.rich.a.color = colorOne;
          this.firstOption.series[0].pointer.itemStyle.borderColor.colorStops[0].color =
            colorOne;
          this.firstOption.series[1].axisLine.lineStyle.color[0][1] = colorTwo;
          this.firstOption.series[1].splitLine.lineStyle.color = colorTwo;
          this.firstOption.series[1].axisTick.lineStyle.color = colorTwo;
        case "second":
          this.secondOption.xAxis[0].data = this.chartData.xData;
          this.secondOption.series[0].data = this.chartData.yData;
          break;
        case "third":
          this.thirdOption.xAxis.data = this.chartData.xData;
          this.thirdOption.series[0].data = this.chartData.yDataOne;
          this.thirdOption.series[1].data = this.chartData.yDataTwo;
        case "forth":
          this.forthOption.series[0].data = this.chartData.yData;
          this.forthOption.xAxis.data = this.chartData.xData;
          break;
        case "fifth":
          this.fifthOption.xAxis.data = this.chartData.xData;
          this.fifthOption.series[0].data = this.chartData.yData;
          break;
        case "sixth":
          this.sixthOption.series[0].data = this.chartData.pieData;
          this.sixthOption.series[0].label.normal.formatter =
            "{a|" +
            this.chartData.count +
            "}" +
            "{b| 个}" +
            "\n" +
            "{c|" +
            this.chartData.msg +
            "}";
          break;
        case "seventh":
          this.seventhOption.series[0].data = this.chartData.scatterList;
          this.seventhOption.series[1].data = this.chartData.lineList;
          this.seventhOption.series[2].data = this.chartData.dataList;
          break;
        case "eighth":
          // console.log(this.chartData, 222);
          this.eighthOption.series[0].data = this.chartData.scatterList;
          this.eighthOption.series[1].data = this.chartData.redLineList;
          this.eighthOption.series[2].data = this.chartData.yellowLineList;
          this.eighthOption.series[3].data = this.chartData.blueLineList;

          break;

        default:
          break;
      }
    },
  },
  computed: {
    option() {
      switch (this.optionType) {
        case "first":
          return this.firstOption;
        case "second":
          return this.secondOption;
        case "third":
          return this.thirdOption;
        case "forth":
          return this.forthOption;
        case "fifth":
          return this.fifthOption;
        case "sixth":
          return this.sixthOption;
        case "seventh":
          return this.seventhOption;
        case "eighth":
          return this.eighthOption;
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