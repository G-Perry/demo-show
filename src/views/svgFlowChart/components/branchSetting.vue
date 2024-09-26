<template>
  <section class="node_branch_setting">
    <div
      v-for="item in branch"
      :key="item.label"
      class="branch_item"
      :style="`border-left-color:${item.leftBorderColor}`"
    >
      <div class="top">
        <span>{{ item.label }}</span>
      </div>
      <div class="node_text">
        <el-input
          ref="textEditInput"
          v-if="item.editable"
          v-model="input"
          placeholder="请输入内容"
          style="width: 160px"
          @blur="textEditEnd"
        ></el-input>
        <span v-else>{{ item.label }}</span>
        <i
          class="el-icon-edit node_text_edit"
          @click="branchLabelEdit(item)"
        ></i>
      </div>
    </div>
  </section>
</template>
aaa  &&  bb || sss ||  aa  ||  bb   &&  cc  ||
<script>
export default {
  data() {
    return {
      input: "",
      branch: [
        {
          label: "分支1",
          editable: true,
          editInputIsShow: false,
          status: true,
          leftBorderColor: "#67cb8a",
          rules: [],
        },
        {
          label: "其他",
          editable: false,
          status: true,
          leftBorderColor: "#a5a9bc",
        },
      ],
    };
  },
  methods: {
    branchLabelEdit(item) {
      item.editable = true;
    },
  },
};
</script>

<style scoped>
.node_branch_setting {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.branch_item {
  width: 100%;
  height: 120px;
  box-shadow: 0 -2px 4px rgba(151, 164, 197, 0.1),
    0 2px 4px rgba(151, 164, 197, 0.1);
  margin-bottom: 20px;
  border-left: 3px solid transparent;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
}
.branch_item .top {
}
</style>