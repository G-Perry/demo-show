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
      <!-- <template v-for="name in $parent.targetIds">
        <g
          v-for="item in name"
          :key="item.key"
          :transform="`translate(${item.x},${item.y})`"
        >
          <foreignObject
            :width="item.width"
            :height="item.height"
            v-html="item.html"
          >
          </foreignObject>
        </g>
      </template> -->
      <g
        v-for="item in flow_start"
        :key="item.key"
        :transform="`translate(${item.x},${item.y})`"
        @mousedown="
          (event) => handleFlowNodeMouseDown(event, 'flow_start', item)
        "
      >
        <foreignObject
          :width="item.width"
          :height="item.height"
          v-html="item.html"
        >
        </foreignObject>
      </g>
      <g
        v-for="item in flow_branch"
        :key="item.key"
        :transform="`translate(${item.x},${item.y})`"
        @mousedown="
          (event) => handleFlowNodeMouseDown(event, 'flow_branch', item)
        "
      >
        <foreignObject
          :width="item.width"
          :height="item.height"
          v-html="item.html"
        >
        </foreignObject>
      </g>
      <g
        v-for="item in flow_examine"
        :key="item.key"
        :transform="`translate(${item.x},${item.y})`"
        @mousedown="
          (event) => handleFlowNodeMouseDown(event, 'flow_examine', item)
        "
      >
        <foreignObject
          :width="item.width"
          :height="item.height"
          v-html="item.html"
        >
        </foreignObject>
      </g>
      <g
        v-for="item in flow_manual"
        :key="item.key"
        :transform="`translate(${item.x},${item.y})`"
        @mousedown="
          (event) => handleFlowNodeMouseDown(event, 'flow_manual', item)
        "
      >
        <foreignObject
          :width="item.width"
          :height="item.height"
          v-html="item.html"
        >
        </foreignObject>
      </g>
      <g
        v-for="item in flow_auto"
        :key="item.key"
        :transform="`translate(${item.x},${item.y})`"
        @mousedown="
          (event) => handleFlowNodeMouseDown(event, 'flow_auto', item)
        "
      >
        <foreignObject
          :width="item.width"
          :height="item.height"
          v-html="item.html"
        >
        </foreignObject>
      </g>
      <g
        v-for="item in flow_end"
        :key="item.key"
        :transform="`translate(${item.x},${item.y})`"
        @mousedown="(event) => handleFlowNodeMouseDown(event, 'flow_end', item)"
      >
        <foreignObject
          :width="item.width"
          :height="item.height"
          v-html="item.html"
        >
        </foreignObject>
      </g>
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M 0 6 L 6 3 L 0 0"
            class="arrow-path"
            stroke-width="1"
            fill="none"
          />
        </marker>
      </defs>

      <!-- 画直线并引用箭头标记 -->
      <line
        x1="10"
        y1="10"
        x2="100"
        y2="100"
        stroke="red"
        stroke-width="2"
        class="red-line"
        marker-end="url(#arrow)"
      />
      <line
        x1="10"
        y1="10"
        x2="10"
        y2="100"
        stroke="green"
        stroke-width="2"
        class="green-line"
        marker-end="url(#arrow)"
      />
    </g>
  </svg>
</template>

<script>
import { svgMoveEvent } from "./svgMoveEvent";
// import { UUID } from "@/utils/handleObjMethods";

export default {
  mixins: [svgMoveEvent],
  data() {
    return {
      text: [],
      flow_start: [],
      flow_branch: [],
      flow_examine: [],
      flow_manual: [],
      flow_auto: [],
      flow_end: [],
      svgFlowNodeEvent: null,
      selectedNode: null,
    };
  },
  methods: {
    handleFlowNodeMouseDown(event, sign, item) {
      this.svgFlowNodeEvent = { x: event.clientX, y: event.clientY };
      this.selectedNode = {
        sign: sign,
        key: item.key,
        x: item.x,
        y: item.y,
      };
      event.stopPropagation();
    },
  },
  mounted() {},
};
</script>

<style scoped>
svg {
  cursor: grab;
}
</style>
<style>
.red-line .arrow-path {
  stroke: red;
}

.green-line .arrow-path {
  stroke: green;
}
</style>