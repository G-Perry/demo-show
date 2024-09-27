<template>
  <div class="left_flow_node_options">
    <section
      class="flow_node"
      v-for="item in flowNodeOptions"
      :key="item.key"
      :id="item.nodeType"
      :class="item.nodeType"
    >
      <span>{{ item.label }}</span>
    </section>
  </div>
</template>

<script>
import { UUID } from "@/utils/handleObjMethods";

export default {
  data() {
    return {
      flowNodeOptions: [
        {
          key: UUID("node_start"),
          label: "开始",
          nodeType: "node_start",
        },
        {
          key: UUID("node_branch"),
          label: "分支节点",
          nodeType: "node_branch",
        },
        {
          key: UUID("node_examine"),
          label: "审批节点",
          nodeType: "node_examine",
        },
        {
          key: UUID("node_manual"),
          label: "人工节点",
          nodeType: "node_manual",
        },
        {
          key: UUID("node_auto"),
          label: "自动任务",
          nodeType: "node_auto",
        },
        {
          key: UUID("node_end"),
          label: "结束",
          nodeType: "node_end",
        },
      ],
    };
  },
  methods: {
    getSelfRect() {
      return this.$el.getBoundingClientRect();
    },
  },
  mounted() {
    // console.log(this.getSelfRect(), 1111);
  },
};
</script>

<style scoped>
.left_flow_node_options {
  box-sizing: border-box;
  padding: 10px;
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
.flow_node {
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
.node_start {
  background: url(./pngs/node_start.png) no-repeat;
  background-size: contain;
}
.node_branch {
  height: 89px;
  padding-left: 30px;
  box-sizing: border-box;
  background: url(./pngs/node_branch.png) no-repeat;
  background-size: 100% 100%;
}
.node_examine {
  background: url(./pngs/node_examine.png) no-repeat;
  background-size: contain;
}
.node_manual {
  background: url(./pngs/node_manual.png) no-repeat;
  background-size: contain;
}
.node_auto {
  background: url(./pngs/node_auto.png) no-repeat;
  background-size: contain;
}
.node_end {
  background: url(./pngs/node_end.png) no-repeat;
  background-size: contain;
}
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