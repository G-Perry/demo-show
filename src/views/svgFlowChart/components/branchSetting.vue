<template>
  <section class="node_branch_setting">
    <div
      style="width: 100%; height: 40px; text-align: right"
      v-if="branch.length < 8"
    >
      <el-button type="primary" plain size="mini" @click="branchAdd">
        <i class="el-icon-plus"></i>
        <span>新增分支</span>
      </el-button>
    </div>
    <transition-group name="fade">
      <div
        v-for="item in branch"
        :key="item.id"
        class="branch_item"
        :style="`border-left-color:${item.leftBorderColor}`"
      >
        <div class="top">
          <div class="top_left">
            <el-input
              ref="textEditInput"
              v-if="item.editInputIsShow"
              v-model="item.label"
              placeholder="请输入内容"
              style="width: 160px"
              @blur="textEditEnd(item)"
            ></el-input>
            <span v-else>{{ item.label }}</span>
            <i
              class="el-icon-edit branch_label_edit"
              v-if="item.editable"
              @click="branchLabelEdit(item)"
            ></i>
          </div>
          <div class="top_right">
            <el-switch
              v-model="item.status"
              active-color="#2f54eb"
              inactive-color="#bfbfbf"
            >
              <!-- active-value="1"
            inactive-value="0" -->
            </el-switch>
            <i
              class="el-icon-delete branch_delete"
              v-if="item.editable"
              @click="branchDelete(item)"
            ></i>
          </div>
        </div>
        <div class="middle" v-if="item.editable">
          <div class="logic">
            <div v-for="e in item.rules.logic" :key="e.id" class="logic_item">
              {{ e.a }}
            </div>
          </div>
          <div class="condition">
            <div
              v-for="(e, index) in item.rules.condition"
              :key="e.id"
              class="condition_item"
            >
              {{ e.a }}
              <i
                class="el-icon-remove-outline condition_delete"
                @click="conditionDelete(item, index)"
              ></i>
            </div>
          </div>
        </div>
        <div class="bottom" v-if="item.editable">
          <el-button type="text" size="mini" @click="conditionAdd(item)"
            >添加</el-button
          >
        </div>
      </div>
    </transition-group>
  </section>
</template>
<script>
import { UUID } from "@/utils/handleObjMethods";

export default {
  data() {
    return {
      branch: [
        {
          id: UUID(),
          label: "分支1",
          editable: true,
          editInputIsShow: false,
          status: true,
          leftBorderColor: "#67cb8a",
          rules: {
            logic: [],
            condition: [{ id: UUID(), a: "1", b: "2", c: "3" }],
          },
        },
        {
          id: UUID(),
          label: "其他",
          editable: false,
          status: true,
          leftBorderColor: "#a5a9bc",
        },
      ],
      count: 2,
    };
  },
  methods: {
    branchLabelEdit(item) {
      item.editInputIsShow = true;
      this.$nextTick(() => {
        this.$refs.textEditInput[0].focus();
      });
    },
    textEditEnd(item) {
      item.editInputIsShow = false;
    },
    branchAdd() {
      function randomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
      }
      let length = this.branch.length;
      let obj = {
        id: UUID(),
        label: `分支${length}`,
        editable: true,
        editInputIsShow: false,
        status: true,
        leftBorderColor: randomColor(),
        rules: {
          logic: [],
          condition: [{ id: UUID(), a: "1", b: "2", c: "3" }],
        },
      };
      this.branch.splice(-1, 0, obj);
    },
    branchDelete(item) {
      let index = this.branch.indexOf(item);
      if (index !== -1) {
        this.branch.splice(index, 1);
      }
    },
    conditionAdd(item) {
      item.rules.condition.push({
        id: UUID(),
        a: this.count,
        b: "",
        c: "",
      });
      if (item.rules.condition.length > 1) {
        item.rules.logic.push({
          id: UUID(),
          a: this.count,
          b: "",
          c: "",
        });
      }
      this.count++;
    },
    conditionDelete(item, index) {
      item.rules.logic.splice(index - 1, 1);
      item.rules.condition.splice(index, 1);
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
  /* height: 120px; */
  box-shadow: 0 -2px 4px rgba(151, 164, 197, 0.1),
    0 2px 4px rgba(151, 164, 197, 0.1);
  margin-bottom: 20px;
  border-left: 3px solid transparent;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  transition: all 0.3s;
}
.branch_item .top {
  height: 25px;
  line-height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top_left,
.top_right {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
}
.branch_label_edit {
  cursor: pointer;
  color: #aaa;
}
.branch_delete {
  cursor: pointer;
  color: #ff0000;
}
.condition_delete {
  cursor: pointer;
  color: #4465ed;
}
.branch_item .middle {
  display: flex;
  position: relative;
  gap: 40px;
}
.logic {
  width: 40px;
}
.condition {
  flex: 1;
}
.logic,
.condition {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}
.logic::after {
  content: "";
  display: block;
  width: 1px;
  height: calc(100% - 24px);
  background-color: #aaa;
  position: absolute;
  left: 58px;
}
.logic_item::after {
  content: "";
  display: block;
  width: 16px;
  height: 1px;
  background-color: #aaa;
  position: absolute;
  left: 42px;
}
.condition_item::before {
  content: "";
  display: block;
  width: 18px;
  height: 1px;
  background-color: #aaa;
  position: absolute;
  left: -22px;
}
.condition_item:only-child::before {
  content: none;
}
.condition_item,
.logic_item {
  width: 100%;
  height: 24px;
  background-color: #f7f8fa;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
::v-deep .el-switch__core {
  width: 30px !important;
  height: 16px;
}
::v-deep .el-switch__core:after {
  width: 12px;
  height: 12px;
}
::v-deep .el-switch.is-checked .el-switch__core::after {
  margin-left: -13px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在 Vue 2.x 中 */ {
  opacity: 0;
}
/* .v-move {
  transition: transform 0.3s;
} */
</style>