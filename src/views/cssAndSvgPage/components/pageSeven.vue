<template>
  <div class="resizeableSvg fff" id="resizeableSvg" ref="resizeableSvg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      @wheel.stop="handleWheel"
      @mouseup="handleMouseUp"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      version="1.1"
      height="100%"
      width="100%"
    >
      <g
        ref="canvas"
        :transform="`translate(${translateX},${translateY})scale(${scaleCoefficient})`"
      >
        <path
          v-for="item in textsAndLines"
          :key="''+item[0]+item[1]+item[4]+item[5]"
          :d="'M '+ item[0] + ' ' + item[1]  + ' L ' + item[2] + ' ' + item[3] + ' L ' + item[4] + ' ' + item[5]"
          stroke="#7d7d7d"
          stroke-width="2"
          fill="none"
        />
        <text
          v-for="item in textsAndLines"
          :key="''+item[7]+item[8]"
          :x="item[7]"
          :y="item[8]"
          font-size="18"
          fill="#262626"
          :transform="`rotate(${item[9]}, ${item[7]}, ${item[8]})`"
        >{{item[6]}}</text>
        <foreignObject
          v-for="(item) in pointData"
          :key="item.id"
          :x="item.x"
          :y="item.y"
          width="400"
          height="300"
        >
          <div
            :ref="item.id"
            class="job_item"
            style="border-color: rgb(24, 144, 255); background-color: rgb(93, 177, 255);"
          >
            <span class="job_title">{{ item.desc }}</span>
            <div class="job_details">
              <span class="job_Parallelism">Parallelism:{{ item.parallelism }}</span>
              <br />
              <span class="job_desc">Backpressured (max): -</span>
              <span class="job_desc">Busy (max): -</span>
              <span class="job_desc">Low Watermark: -</span>
            </div>
          </div>
        </foreignObject>
        <!-- <circle :cx="a" :cy="b" r="10" stroke="black" stroke-width="2" fill="red" /> -->
        <!-- <circle cx="0" cy="0" r="10" stroke="black" stroke-width="2" fill="red" /> -->
      </g>
    </svg>
    <div class="resizeable_icon"></div>
  </div>
</template>
  
  <script>
import {
  resData,
  searchAfterByInputs,
  levelOrderTraversal,
  preorder,
} from "./resData";
export default {
  data() {
    return {
      // 整个svg的位置调整
      translateX: 0,
      translateY: 0,
      // 整个svg的缩放比例
      scaleCoefficient: 1,
      // 鼠标事件
      mosueEvent: null,
      savedTranslateX: 0,
      savedTranslateY: 0,

      treeData: [],
      pointData: [{ x: null, y: null }],
      textsAndLines: [], //用于渲染路径
    };
  },
  methods: {
    drawFirstStep(data) {
      // 对形如{item:...,itemFrom:{}}的数据预处理
      // let data = resData.data.plan.nodes;
      let arr = [];
      this.treeData = [];
      this.pointData = [];
      data.forEach((item) => {
        if (item.inputs == undefined) {
          arr.push(item);
        }
      });
      // 先逆扁平化转换成树形数据
      arr.forEach((item) => {
        item.children = searchAfterByInputs(item.id, data);
        this.treeData.push(item);
      });
      // 再先序遍历树形数据，并带上层级
      let treeDataNeedLevel = preorder(this.treeData);
      let [level, x, y, difference] = [0, 0, -200, 0];
      // 依据层级作图得出放置的位置
      treeDataNeedLevel.forEach((item) => {
        difference = item.level == 0 ? 1 : level - item.level;
        if (level < item.level) {
          x += 550;
        } else {
          x -= 550 * difference;
          y += 320;
        }
        if (item.level == 0) {
          x = 0;
        }
        level = item.level;
        this.pointData.push({
          id: item.id,
          desc: item.desc,
          parallelism: item.parallelism,
          x: x,
          y: y,
        });
      });
      setTimeout(() => {
        this.drawSecondStep();
        this.pushLine(data);
      }, 0);
    },
    drawSecondStep() {
      // 第一步的出的div起点为同一高度，但单个div的高度不同
      // 通过处理使同一行的div竖直居中
      // 并写入每个div左右两边中点的坐标
      let firstElement = {};
      this.pointData.forEach((item) => {
        item.width = this.$refs[item.id][0].offsetWidth;
        item.height = this.$refs[item.id][0].offsetHeight;
        if (JSON.stringify(firstElement) === "{}" || item.y > firstElement.y) {
          firstElement = item;
        } else {
          item.y = firstElement.y - (item.height - firstElement.height) / 2;
        }
        item.MidpointX = item.x + item.width / 2;
        item.MidpointY = item.y + item.height / 2;
      });
    },
    pushLine(data) {
      // 绘制路径连线
      // let data = resData.data.plan.nodes;
      this.textsAndLines = [];
      let from = {};
      let to = {};
      let text = "";
      let aPointX, aPointY, bPointX, bPointY, textX, textY, textAngle;
      data.forEach((item) => {
        if (item.inputs) {
          to = this.pointData.find((obj) => obj.id === item.id);
          item.inputs.forEach((element) => {
            from = this.pointData.find((obj) => obj.id === element.id);
            text = element.ship_strategy;
            aPointX = from.MidpointX;
            aPointY = from.MidpointY;
            bPointX = to.MidpointX;
            bPointY = to.MidpointY;
            textX =
              aPointX +
              ((bPointX - (bPointX - aPointX) / 3 - aPointX) * 5) / 7 -
              20;
            textY = aPointY + ((bPointY - aPointY) * 5) / 7 + 25;
            textAngle = this.calculateAngle(
              aPointX,
              aPointY,
              bPointX - (bPointX - aPointX) / 3,
              bPointY
            );
            this.textsAndLines.push([
              aPointX, //折线起点
              aPointY, //折线起点
              bPointX - (bPointX - aPointX) / 3, //折点坐标
              bPointY, //折点坐标
              bPointX, //折线终点
              bPointY, //折线终点
              text, //线上文字
              textX, //文字坐标
              textY, //文字坐标
              textAngle, //文字旋转角度
            ]);
          });
        }
      });
      this.scaleCoefficient = 1;
      this.$nextTick(() => {
        this.handleSvgResize();
      });
    },
    calculateAngle(x1, y1, x2, y2) {
      // 计算图例文字旋转角度
      let radian = Math.atan2(y2 - y1, x2 - x1);
      let angle = radian * (180 / Math.PI);
      return angle;
    },
    handleSvgResize() {
      // let lastOne = this.pointData.slice(-1)[0];
      let gRect = this.$refs.canvas.getBoundingClientRect();
      let svgRect = this.$refs.resizeableSvg.getBoundingClientRect();
      let scale = svgRect.height / gRect.height;
      // let scale = svgRect.height / (lastOne.x + lastOne.height);
      let svgCenterX = svgRect.width / 2;
      let svgCenterY = svgRect.height / 2;
      // this.a = gRect.width / 2;
      // this.b = gRect.height / 2;
      let gCenterX = (scale * gRect.width) / 2;
      let gCenterY = (scale * gRect.height) / 2;
      this.translateX = svgCenterX - gCenterX;
      this.translateY = svgCenterY - gCenterY;
      // 为鼠标移动事件存储数据
      this.savedTranslateX = this.translateX;
      this.savedTranslateY = this.translateY;

      this.scaleCoefficient = scale;
    },
    handleWheel(event) {
      // 阻止事件冒泡和默认行为，防止整个页面滚动
      event.preventDefault();
      event.stopPropagation();

      // 获取 resizeableSvg 元素的尺寸
      const svgRect = this.$refs.resizeableSvg.getBoundingClientRect();
      const centerX = svgRect.width / 2;
      const centerY = svgRect.height / 2;

      // 计算缩放前的中心点位置
      const oldCenterX = (centerX - this.translateX) / this.scaleCoefficient;
      const oldCenterY = (centerY - this.translateY) / this.scaleCoefficient;

      // 更新缩放系数
      const newScale =
        this.scaleCoefficient * (1 - Math.sign(event.deltaY) * 0.1);

      // 计算新的中心点位置
      const newCenterX = oldCenterX * newScale;
      const newCenterY = oldCenterY * newScale;

      // 调整 translateX 和 translateY 以保持中心点位置不变
      this.translateX = centerX - newCenterX;
      this.translateY = centerY - newCenterY;

      // 为鼠标移动事件存储数据
      this.savedTranslateX = this.translateX;
      this.savedTranslateY = this.translateY;

      // 应用新的缩放系数
      this.scaleCoefficient = newScale;
    },
    handleMouseUp() {
      this.mosueEvent = null;
      this.savedTranslateX = this.translateX;
      this.savedTranslateY = this.translateY;
    },
    handleMouseDown(event) {
      this.mosueEvent = { x: event.clientX, y: event.clientY };
    },
    handleMouseMove(event) {
      if (this.mosueEvent) {
        this.translateX =
          this.savedTranslateX + event.clientX - this.mosueEvent.x;
        this.translateY =
          this.savedTranslateY + event.clientY - this.mosueEvent.y;
      }
    },
  },
  mounted() {
    this.drawFirstStep(resData.data.plan.nodes);
    // this.$nextTick(() => {
    //   this.drawSecondStep();
    //   this.pushLine();
    // });
  },
};
</script>
  
  <style scoped>
.resizeableSvg {
  height: 810px;
  /* height: 800px; */
  min-height: 500px;
  max-height: 820px;
  resize: vertical;
  overflow: hidden;
  position: relative;
}
.resizeable_icon {
  position: absolute;
}
svg {
  cursor: move;
}
.job_item {
  /* width: fit-content; */
  width: 250px;
  height: fit-content;
  padding: 15px;
  color: #000;
  user-select: none;
  cursor: default;
}
.job_details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.job_title {
  font-size: 16px;
  text-align: left;
  /* font-weight: 600; */
  overflow-wrap: break-word; /* 兼容大多数现代浏览器 */
  word-wrap: break-word; /* 兼容 IE */
  -ms-word-wrap: break-word; /* 兼容较旧版本的 IE */
  -webkit-overflow-wrap: break-word; /* 兼容 Safari 和 Chrome 旧版本 */
}
.job_Parallelism {
  line-height: 25px;
}
.job_desc {
  color: #33618c;
  font-size: 16px;
  line-height: 22px;
}
</style>