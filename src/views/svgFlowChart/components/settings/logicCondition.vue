<template>
  <section class="condition">
    <section class="logic" v-if="rootData[childrenName].length > 1">
      <div class="selection">
        <el-select v-model="rootData.joint" size="mini">
          <el-option label="且" value="AND"></el-option>
          <el-option label="或" value="OR"></el-option>
        </el-select>
      </div>
    </section>
    <div class="item" v-for="item in rootData[childrenName]" :key="item.id">
      <template v-if="item[childrenName].length == 0">
        <div class="inputs">
          <treeselect
            v-model="item[leftValueName]"
            :options="leftTreeData.data"
            :normalizer="leftTreeData.normalizer"
            :show-count="true"
            :disable-branch-nodes="true"
            placeholder="请选择"
            style="width: 200px"
            append-to-body
            zIndex="9999"
            @select="(node) => handleSelectChange(node, item)"
            @input="item[rightValueName] = null"
          />
          <treeselect
            v-model="item.filters"
            :options="middleTreeData.data"
            :normalizer="middleTreeData.normalizer"
            :clearable="false"
            :searchable="false"
            style="width: 85px"
            append-to-body
            zIndex="9999"
          />
          <treeselect
            v-if="rightTreeData"
            v-model="item[rightValueName]"
            :options="rightTreeData.data"
            :normalizer="rightTreeData.normalizer"
            :show-count="true"
            :disable-branch-nodes="true"
            placeholder="请选择"
            style="width: 200px"
            append-to-body
            zIndex="9999"
          >
            <div slot="value-label" slot-scope="{ node }">
              {{ node.raw.customLabel }}
            </div>
          </treeselect>
          <el-time-picker
            v-else-if="timeSign.includes(item[leftValueName])"
            v-model="item[rightValueName]"
            placeholder="请选择时间"
            value-format="HH:mm"
            format="HH:mm"
            size="mini"
            style="width: 200px"
          >
          </el-time-picker>
          <treeselect
            v-else-if="item[leftValueName] == 'procExecInfo_suspension'"
            v-model="item[rightValueName]"
            :options="suspensionOptions"
            :normalizer="normalizer"
            :clearable="false"
            :searchable="false"
            placeholder="请选择"
            style="width: 200px"
            append-to-body
            zIndex="9999"
          />
          <el-input
            v-else
            v-model="item[rightValueName]"
            placeholder="请输入内容"
            style="width: 200px"
            size="mini"
          ></el-input>
        </div>
        <el-button
          type="text"
          @click="deleteItem(item)"
          icon="el-icon-remove-outline"
        ></el-button>
        <el-dropdown @command="handleCommand" size="mini">
          <el-button type="text" icon="el-icon-circle-plus-outline"></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{ sign: 'addBroItem', item }"
              >添加同级</el-dropdown-item
            >
            <el-dropdown-item :command="{ sign: 'addSonItem', item }"
              >添加子级</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <logic-condition
        v-else
        :rootData="item"
        @edit="edit"
        :leftTreeData="leftTreeData"
        :middleTreeData="middleTreeData"
        :rightTreeData="rightTreeData"
        :type="type"
      ></logic-condition>
    </div>
  </section>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  // compareOptions,
  suspensionOptions,
  // getTreeSelectOptions,
} from "../confg";
export default {
  name: "logicCondition",
  props: {
    rootData: {
      type: Object,
      required: true,
    },
    leftTreeData: {
      type: Object,
      required: true,
    },
    middleTreeData: {
      type: Object,
      required: true,
    },
    rightTreeData: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
  components: { Treeselect },
  data() {
    return {
      // treeSelectOptions: getTreeSelectOptions(),
      // compareOptions,
      suspensionOptions,
      timeSign: ["start_time", "this_time", "procExecInfo_start_time"],
    };
  },
  computed: {
    // 左侧树
    childrenName() {
      switch (this.type) {
        case "node_branch":
          return "conditions";
        case "node_auto":
          return "subConditions";
        default:
          break;
      }
    },
    leftValueName() {
      switch (this.type) {
        case "node_branch":
          return "field";
        case "node_auto":
          return "modelField";
        default:
          break;
      }
    },
    rightValueName() {
      switch (this.type) {
        case "node_branch":
          return "value";
        case "node_auto":
          return "orderField";
        default:
          break;
      }
    },
  },
  methods: {
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.propName,
        label: node.name,
        children: node.children,
      };
    },
    deleteItem(item) {
      this.$emit("edit", "deleteItem", item);
    },
    // addBroItem(item) {
    //   this.$emit("edit", "addBroItem", item);
    // },
    // addSonItem(item) {
    //   this.$emit("edit", "addSonItem", item);
    // },
    edit(aciton, val) {
      this.$emit("edit", aciton, val);
    },
    handleCommand({ sign, item }) {
      this.$emit("edit", sign, item);
    },
    handleSelectChange(node, item) {
      item.taskNodeId = node.taskNodeId || null;
    },
  },
  // created() {
  //   console.log(
  //     this.childrenName,
  //     this.leftValueName,
  //     this.rightValueName,
  //     12121
  //   );
  // },
};
</script>

<style scoped>
.component-box {
  padding-left: 30px;
}
.condition {
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  padding: 15px 0;
}
.logic {
  position: absolute;
  width: 20px;
  height: calc(100% - 30px);
  border: 1px solid #a5afbc;
  border-right: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}
.logic::before {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  border: 1px solid #a5afbc;
  border-radius: 3px;
  position: absolute;
  top: -3px;
  right: -6px;
}
.logic::after {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  border: 1px solid #a5afbc;
  border-radius: 3px;
  position: absolute;
  bottom: -3px;
  right: -6px;
}
.selection {
  width: 45px;
  position: absolute;
  left: -100%;
}
::v-deep .selection .el-input__inner {
  padding-left: 5px;
  padding-right: 5px;
}
::v-deep .selection .el-input__suffix {
  right: 0;
}
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin-left: 50px;
  position: relative;
}
.inputs {
  width: 500px;
  display: flex;
  gap: 5px;
}
::v-deep .inputs .el-input__inner {
  background: #f7f7f7;
}
</style>