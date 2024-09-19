<template>
  <section class="three_column">
    <div class="left">
      <span>options</span>
      <div class="left_options">
        <section id="flow_start" class="flow_node flow_start option_item">
          <span> 开始 </span>
        </section>
        <section id="flow_branch" class="flow_node flow_branch option_item">
          <span> 分支节点 </span>
        </section>
        <section id="flow_examine" class="flow_node flow_examine option_item">
          <span> 审批节点 </span>
        </section>
        <section id="flow_manual" class="flow_node flow_manual option_item">
          <span> 人工节点 </span>
        </section>
        <section id="flow_auto" class="flow_node flow_auto option_item">
          <span> 自动任务 </span>
        </section>
        <section id="flow_end" class="flow_node flow_end option_item">
          <span> 结束 </span>
        </section>
      </div>
    </div>
    <div class="middle">
      <middle-svg ref="middleSvg"></middle-svg>
    </div>
    <div class="right"></div>
  </section>
</template>

<script>
import middleSvg from "./components/middleSvg.vue";
import { UUID } from "@/utils/handleObjMethods";

export default {
  components: { middleSvg },
  data() {
    return {
      // targetIds: [
      //   "flow_start",
      //   "flow_branch",
      //   "flow_examine",
      //   "flow_manual",
      //   "flow_auto",
      //   "flow_end",
      // ],
      mosueEvent: null,
      // 被点击dom的初始位置
      domInitPosition: null,
      // 点击坐标与被点击dom的偏移量
      eventOffsetTarget: null,
    };
  },
  methods: {
    findTarget(obj, depth = 0, sign = "flow_node") {
      if (depth > 1) {
        return undefined;
      }
      // if (this.targetIds.includes(obj.id)) {
      // console.log(obj, depth, sign);

      // if (obj.classList.contains("flow_node")) {
      if (obj.classList.contains(sign)) {
        return obj;
      } else if (obj.parentNode) {
        return this.findTarget(obj.parentNode, depth + 1, sign);
      } else {
        return undefined;
      }
    },
    handleMouseDown(event) {
      let target = this.findTarget(event.target);
      if (target) {
        let domCopy = target.cloneNode(true);
        domCopy.classList.add("moveDom");
        domCopy.id = target.id + "_copy";

        let position = target.getBoundingClientRect();
        domCopy.style.left = position.left + "px";
        domCopy.style.top = position.top + "px";

        document.body.appendChild(domCopy);
        this.mosueEvent = { x: event.clientX, y: event.clientY };
        this.domInitPosition = {
          x: position.left,
          y: position.top,
        };
        this.eventOffsetTarget = {
          x: event.clientX - position.left,
          y: event.clientY - position.top,
        };
      }
    },
    handleMouseMove(event) {
      if (this.mosueEvent) {
        let dom = document.querySelector(".moveDom");
        dom.style.left =
          this.domInitPosition.x + event.clientX - this.mosueEvent.x + "px";
        dom.style.top =
          this.domInitPosition.y + event.clientY - this.mosueEvent.y + "px";
      }
    },

    handleMouseUp(event) {
      let dom = document.querySelector(".moveDom");
      let SVG = this.$refs.middleSvg;
      if (dom) {
        let svgPosition = SVG.$el.getBoundingClientRect();
        if (
          !(
            event.clientX < svgPosition.left ||
            event.clientX > svgPosition.right ||
            event.clientY < svgPosition.top ||
            event.clientY > svgPosition.bottom
          )
        ) {
          let domCopy = dom.cloneNode(true);
          let sign = domCopy.id.replace("_copy", "");
          domCopy.removeAttribute("id");
          domCopy.removeAttribute("style");
          domCopy.classList.remove("moveDom");
          // domCopy.classList.remove("flow_node");
          // domCopy.classList.add("flow_node_copy");

          let obj = {
            key: UUID(),
            x:
              event.clientX -
              svgPosition.left -
              SVG.translateX -
              this.eventOffsetTarget.x,
            y:
              event.clientY -
              svgPosition.top -
              SVG.translateY -
              this.eventOffsetTarget.y,
            width: dom.offsetWidth,
            height: dom.offsetHeight,
            html: domCopy.outerHTML,
          };
          // console.log(sign, 111);

          SVG[sign].push(obj);
        }
        dom.remove();
        this.mosueEvent = null;
        this.domInitPosition = null;
        this.eventOffsetTarget = null;
      }
    },
  },
  mounted() {
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  },
  beforeDestroy() {
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  },
};
</script>

<style scoped>
.three_column {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
}
.left,
.right {
  flex: 1;
  overflow: hidden;
}
.middle {
  flex: 5;
  overflow: hidden;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.left_options {
  box-sizing: border-box;
  padding: 10px;
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
.option_item {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #666;
  font-size: 14px;
  text-align: center;
  width: 168px;
  height: 63px;
}
.flow_start {
  background: url(./components/node_start.png) no-repeat;
  background-size: contain;
}
.flow_branch {
  height: 89px;
  padding-left: 30px;
  box-sizing: border-box;
  background: url(./components/node_branch.png) no-repeat;
  background-size: 100% 100%;
}
.flow_examine {
  background: url(./components/node_examine.png) no-repeat;
  background-size: contain;
}
.flow_manual {
  background: url(./components/node_manual.png) no-repeat;
  background-size: contain;
}
.flow_auto {
  background: url(./components/node_auto.png) no-repeat;
  background-size: contain;
}
.flow_end {
  background: url(./components/node_end.png) no-repeat;
  background-size: contain;
}
/* .fullPage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #65da74;
} */
.moveDom {
  opacity: 0.6;
  position: fixed;
  cursor: move;
}
svg .flow_node_copy,
.flow_node {
  cursor: move;
}
</style>