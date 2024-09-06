<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="100%"
    height="100%"
    ref="svg"
    @wheel.stop="handleWheel"
    @mouseup="handleMouseUp"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
  >
    <g
      ref="canvas"
      :transform="`translate(${translateX},${translateY})scale(${scaleCoefficient})`"
    >
      <text v-for="item in text" :key="item.key" :x="item.x" :y="item.y" @click="">
        {{ item.text }}
      </text>
    </g>
  </svg>
</template>

<script>
import { svgMoveEvent } from "./svgMoveEvent";
import { UUID } from "@/utils/handleObjMethods";

export default {
  mixins: [svgMoveEvent],
  data() {
    return {
      text: [],
    };
  },
  methods: {
    initItemPosition() {
      const svgRect = this.$refs.svg.getBoundingClientRect();
      const centerX = svgRect.width / 2;
      const centerY = svgRect.height / 2;
      return { x: centerX, y: centerY };
    },
    itemAdd() {
      let position = this.initItemPosition();
      let text = {
        key: UUID(),
        text: "aaa",
        ...position,
      };
      this.text.push(text);
    },
  },
};
</script>

<style>
</style>