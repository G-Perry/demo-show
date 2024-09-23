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
      <circle
        v-for="item in points"
        :key="item.x+item.cy"
        :cx="item.cx"
        :cy="item.cy"
        r="10"
        fill="#fff"
      />
      <path
        v-for="item in lines"
        :key="item.x1+item.y2"
        :d="'M '+item.x1+' '+item.y1+' L '+item.x2+' '+item.y2"
        fill="none"
        stroke="#fff"
      />
    </svg>
  </div>
</template>
  
  <script>
export default {
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
    };
  },
  methods: {
    setPoints() {
      let conut = 8;
      let divideDeg = 360 / conut;
      let divideSize = 120;
    //   let lines = [];
      this.points = [{ x: 0, y: 0, z: 0 }];
      for (let i = 0; i < conut; i++) {
        let deg = divideDeg * (i - 1);
        let x, y, z;
        x =
          Math.floor(divideSize * Math.sin((deg * Math.PI) / 180)) +
          Math.floor(Math.random() * 120 - 60);
        y =
          Math.floor(divideSize * Math.cos((deg * Math.PI) / 180)) +
          Math.floor(Math.random() * 120 - 60);
        z = Math.floor(Math.random() * 180 - 90);
        this.points.push({ x: x, y: y, z: z });
      }
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
    },

    handleWheel(event) {
      this.k *= 1 - Math.sign(event.deltaY) * 0.1;
      this.draw();
    },
    handleMouseUp() {
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
  },
  mounted() {
    this.$nextTick(() => {
      let svgSize = this.$refs.starLineSvg.getBoundingClientRect();
      this.w = svgSize.width;
      this.h = svgSize.height;
      this.setPoints();
      this.draw();
    });
  },
};
</script>
  
  <style scoped>
.full_content {
  width: 100%;
  height: 98vh;
  background: #000726;
}
.starSelf {
  position: absolute;
  /* top: 50%;
    left: 50%; */
  transform: translate(-50%, -50%) rotateX(30deg);
  transform-style: preserve-3d;
}
</style>