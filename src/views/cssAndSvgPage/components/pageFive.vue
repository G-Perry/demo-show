<template>
  <div class="son_fit_father">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      ref="mySvg"
      width="100%"
      height="100%"
      style="display:block"
    >
      <path :d="outerSemiCircleData" fill="none" stroke="#7fcef3" />
      <path :d="innerSemiCircleData" fill="none" stroke="#7fcef3" />
      <!-- :key="Math.floor(item[0]*item[2])+index" -->
      <path
        v-for="(item) in lines"
        :key="item[5]"
        :d="'M '+item[0]+' '+item[1]+' L '+item[2]+' '+item[3]"
        fill="none"
        :stroke="item[4]"
      />
      <!-- :key="Math.floor(item.cy+item.cx)+index" -->
      <circle
        v-for="(item) in points"
        :key="item.uuid"
        :cx="item.cx"
        :cy="item.cy"
        r="10"
        fill="#fff"
        @mouseover="handleMouseover(item)"
        @mouseout="handleMouseout"
      />
    </svg>
  </div>
</template>
  
  <script>
import Mock from "mockjs";
export default {
  data() {
    return {
      outerSemiCircleData: "",
      innerSemiCircleData: "",
      points: [],
      lines: [],
      showLines: [],
      linesMsg: [
        {
          from: "outer0",
          to: "inner0",
        },
        {
          from: "outer0",
          to: "inner2",
        },
        {
          from: "outer1",
          to: "inner1",
        },
        {
          from: "outer10",
          to: "inner2",
        },
        {
          from: "outer10",
          to: "inner3",
        },
        {
          from: "outer10",
          to: "inner4",
        },
        {
          from: "outer1",
          to: "inner1",
        },
        {
          from: "outer2",
          to: "inner1",
        },
        {
          from: "outer3",
          to: "inner1",
        },
        {
          from: "outer4",
          to: "inner1",
        },
        {
          from: "outer5",
          to: "inner1",
        },
        {
          from: "outer6",
          to: "inner1",
        },
        {
          from: "outer6",
          to: "inner2",
        },
        {
          from: "outer7",
          to: "inner1",
        },
        {
          from: "outer7",
          to: "inner2",
        },
        {
          from: "outer12",
          to: "inner2",
        },
        {
          from: "outer8",
          to: "inner1",
        },
        {
          from: "outer9",
          to: "inner1",
        },
        {
          from: "outer10",
          to: "inner1",
        },
        {
          from: "outer11",
          to: "inner1",
        },
        {
          from: "outer12",
          to: "inner1",
        },
        {
          from: "outer13",
          to: "inner1",
        },
        {
          from: "outer14",
          to: "inner1",
        },
        {
          from: "outer15",
          to: "inner4",
        },
        {
          from: "outer16",
          to: "inner1",
        },
        {
          from: "outer17",
          to: "inner1",
        },
        {
          from: "outer18",
          to: "inner4",
        },
        {
          from: "outer19",
          to: "inner1",
        },
        {
          from: "outer19",
          to: "inner4",
        },
        {
          from: "outer9",
          to: "inner5",
        },
        {
          from: "outer16",
          to: "inner3",
        },
        {
          from: "outer13",
          to: "inner0",
        },
        {
          from: "outer3",
          to: "inner2",
        },
        {
          from: "outer8",
          to: "inner4",
        },
      ],
    };
  },
  methods: {
    setCircleAndPointData() {
      let size = this.$refs.mySvg.getBoundingClientRect();
      //   console.log(size, 222);
      let Olx = Math.floor((size.width * 3) / 100); //外圆左点x值
      let Orx = Math.floor((size.width * 97) / 100); //外圆右点x值

      let Ilx = Math.floor((size.width * 18) / 100); //内园左点x值
      let Irx = Math.floor((size.width * 82) / 100); //内圆右点x值

      let y = Math.floor((size.height * 98) / 100); //几个点的y值
      let ox = Math.floor(size.width / 2); //圆心x值
      this.outerSemiCircleData =
        "M " + Olx + " " + y + " A 1 1 0 0 1 " + Orx + " " + y;
      this.innerSemiCircleData =
        "M " + Ilx + " " + y + " A 1 1 0 0 1 " + Irx + " " + y;

      let innerR = Irx - ox; //内圆半径
      let outerR = Orx - ox; //外圆半径
      this.setPoint(20, ox, y, outerR, "outer");
      this.setPoint(6, ox, y, innerR, "inner");
    },
    setPoint(count, x, y, R, sign) {
      //count计数; (x, y)圆心坐标; R半径; sign标识内圆or外圆
      let bigIntervalDeg =
        sign == "outer" ? 170 / (count - 1) : 150 / (count - 1); //点与点的间隔
      let smallIntervalDeg = sign == "outer" ? 5 : 15; //两边的始末点与底部的间隔
      let cx, cy;
      for (let i = 0; i < count; i++) {
        cx =
          R *
            Math.cos(
              ((smallIntervalDeg + i * bigIntervalDeg) * Math.PI) / 180
            ) +
          x;
        cy =
          y -
          R *
            Math.sin(((smallIntervalDeg + i * bigIntervalDeg) * Math.PI) / 180);
        this.points.push({
          id: sign + i,
          cx: cx,
          cy: cy,
          uuid: Mock.Random.guid(),
        });
      }
    },
    setLines() {
      this.linesMsg.forEach((item) => {
        let from = this.points.find((i) => i.id == item.from);
        let to = this.points.find((i) => i.id == item.to);
        this.lines.push([
          from.cx,
          from.cy,
          to.cx,
          to.cy,
          "#f7b85a",
          Mock.Random.guid(),
        ]);
      });
    },
    searchLineById(id) {
      //寻找节点的下游节点
      for (let item of this.linesMsg) {
        if (item.from == id || item.to == id) {
          this.showLines.push({ from: item.from, to: item.to });
        }
      }
    },
    handleMouseover(item) {
      this.showLines = [];
      this.searchLineById(item.id);
      // // 处理需要显示的路径
      for (let item of this.lines) {
        item[4] = "#f7b85a";
      }
      for (let line of this.showLines) {
        for (let [index, item] of this.linesMsg.entries()) {
          if (line.from == item.from && line.to == item.to) {
            this.lines[index][4] = "#fff";
            this.$forceUpdate();
          }
        }
      }
    },
    handleMouseout() {
      for (let item of this.lines) {
        item[4] = "#f7b85a";
        this.$forceUpdate();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setCircleAndPointData();
      this.setLines();
    });
  },
};
</script>
  
<style scoped>
</style>