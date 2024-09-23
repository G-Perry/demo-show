<template>
  <div class="son_fit_father">
    <svg
      ref="starLineSvg"
      stroke-width="1"
      width="100%"
      height="100%"
      @wheel="handleWheel"
      @mouseup="handleMouseUp"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
    >
      <!-- <circle
        v-for="item in points"
        :key="item.x+item.cy"
        :cx="item.cx"
        :cy="item.cy"
        r="10"
        fill="#fff"
      />-->
      <path
        v-for="item in lines"
        :key="item.x1+item.y2"
        :d="'M '+item.x1+' '+item.y1+' L '+item.x2+' '+item.y2"
        fill="none"
        stroke="#05ece066"
      />
      <foreignObject width="100%" height="100%">
        <div style="width:100%;height:100%;position:relative">
          <!-- :diameter="item.nowZ | setDiameterByZ" -->
          <sphere
            class="starSelf"
            v-for="(item,index) in points"
            :diameter="index == 0 ? 100 : 60"
            :key="item.y+item.cy"
            :style="'top:'+item.cy+'px;left:'+item.cx+'px'"
          />
          <span
            class="starSelf"
            style="color: #fff;"
            v-for="(item,index) in points"
            :key="item.y*item.cy"
            :style="'top:'+ ( item.cy + ( index == 0 ? 0 : 50 ))+'px;left:'+item.cx+'px;font-size:14px;cursor:pointer'"
            @click="handleDeptNameClick(platformNames[index])"
          >{{platformNames[index] == undefined ? '-' : platformNames[index].deptName}}</span>
        </div>
      </foreignObject>
    </svg>
  </div>
</template>
  
<script>
import sphere from "./sphere.vue";
export default {
  components: {
    sphere,
  },
  data() {
    return {
      // s：定义图形中每个部分的大小。

      k: 500, // k：用于控制投影的缩放比例，通过鼠标滚轮事件来调整。
      p: null, // p：一个对象，用于存储鼠标点击事件的位置和旋转角度。
      a1: 0, // a1：控制图形的水平旋转角度，通过鼠标移动事件来调整。
      a2: 0, // a2：控制图形的垂直旋转角度，通过鼠标移动事件来调整。
      far: 400, // far：表示图形离相机的远近距离，影响图形的缩放效果。
      w: 0, // w：SVG画布的宽度。
      h: 0, // h：SVG画布的高度。
      points: [], //一个数组，用于存储图形中的所有点的坐标。
      lines: [], // lines：一个数组，用于存储图形中的所有线段的坐标。
      // 资产名称
      platformNames: [],
    };
  },
  filters: {
    setDiameterByZ(val) {
      let d = Math.floor((val / 90) * 10 + 80);
      return d;
    },
  },
  methods: {
    setPoints(data) {
      this.points = [{ x: 0, y: 0, z: 0 }];
      let num = data.length;
      let radius = 250;
      let minDistance = 100;

      let points = [];
      for (let i = 0; i < num; i++) {
        let validPoint = false;
        let x, y, z;

        while (!validPoint) {
          const theta = Math.random() * Math.PI; // 极角范围 [0, π]
          const phi = Math.random() * 2 * Math.PI; // 方位角范围 [0, 2π]
          x = radius * Math.sin(theta) * Math.cos(phi);
          y = radius * Math.sin(theta) * Math.sin(phi);
          z = radius * Math.cos(theta);
          validPoint = true;
          for (const existingPoint of points) {
            const distance = Math.sqrt(
              Math.pow(x - existingPoint.x, 2) +
                Math.pow(y - existingPoint.y, 2) +
                Math.pow(z - existingPoint.z, 2)
            );
            if (distance < minDistance) {
              validPoint = false;
              break;
            }
          }
        }
        points.push({ x: x, y: y, z: z });
      }
      this.points.push(...points);
    },
    setLines() {
      let x1, y1, x2, y2;
      x1 = this.points[0].cx;
      y1 = this.points[0].cy;
      this.lines = [];
      for (let i = 1; i < this.points.length; i++) {
        x2 = this.points[i].cx;
        y2 = this.points[i].cy;
        this.lines.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
      }
    },
    trans3Dto2D(point) {
      // 用于将3D坐标投影到2D平面上，根据相机的角度和距离计算线段的新的2D坐标。
      let cosa1 = Math.cos(this.a1);
      let sina1 = Math.sin(this.a1);
      let cosa2 = Math.cos(this.a2);
      let sina2 = Math.sin(this.a2);
      let x = point.x * cosa1 + point.z * sina1;
      let z = point.z * cosa1 - point.x * sina1;
      let y = point.y * cosa2 + z * sina2;
      let d = z * cosa2 - point.y * sina2 + this.far;
      point.cx = (this.k / d) * x + this.w / 2;
      point.cy = (this.k / d) * y + this.h / 2;
      // point.nowZ = z;
    },

    handleWheel(event) {
      this.k *= 1 - Math.sign(event.deltaY) * 0.1;
      this.draw();
    },
    handleMouseUp() {
      // console.log(this.points);
      this.p = null;
    },
    handleMouseDown(event) {
      this.p = { x: event.clientX, y: event.clientY, a1: this.a1, a2: this.a2 };
      this.draw();
    },
    handleMouseMove(event) {
      if (this.p) {
        this.a1 = this.p.a1 - (event.clientX - this.p.x) / 100;
        this.a2 = this.p.a2 - (event.clientY - this.p.y) / 100;
      }
      this.draw();
    },
    draw() {
      this.points.forEach(this.trans3Dto2D);
      this.setLines();
    },
    init(data) {
      this.platformNames = [{ deptName: "本平台", deptId: null }];
      this.platformNames.push(...data);
      // console.log(this.platformNames);
      this.setPoints(data);
      this.draw();
    },
    // handleDeptNameClick(obj) {
    //   if (obj.deptName !== "本平台") {
    //     this.$parent.btn_is_active = [false, false, true];
    //     this.$parent.pageThreeStarName = obj == undefined ? "-" : obj.deptName;
    //     this.$parent.pageThreeDeptName = obj == undefined ? "-" : obj.deptName;
    //     this.$parent.pageThreeInit(obj.deptId);
    //   }
    // },
  },
  mounted() {
    this.$nextTick(() => {
      let svgSize = this.$refs.starLineSvg.getBoundingClientRect();
      this.w = svgSize.width;
      this.h = svgSize.height;
    });
  },
};
</script>
  
<style scoped>
.starSelf {
  position: absolute;
  transform: translate(-50%, -50%) rotateX(30deg);
  transform-style: preserve-3d;
}
</style>