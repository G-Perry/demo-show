<template>
  <logic-condition
    :rootData="rootData"
    @edit="logicEdit"
    :leftTreeData="leftTreeData"
    :middleTreeData="middleTreeData"
    :rightTreeData="rightTreeData"
    :type="type"
  ></logic-condition>
</template>

<script>
import logicCondition from "./logicCondition.vue";
import { deepClone } from "@/utils/index";

import {
  removeNodeById,
  addSiblingNodeById,
  addSonNodeById,
  initObjAndName,
} from "@/utils/handleObjMethods";
export default {
  name: "conditionsUnit",
  props: ["value", "type", "leftTreeData", "middleTreeData", "rightTreeData"],
  components: {
    logicCondition,
  },
  data() {
    return {
      rootData: deepClone(this.value),
    };
  },
  watch: {
    rootData: {
      deep: true,
      immediate: true,
      handler: function (val) {
        // console.log(JSON.parse(JSON.stringify(val)));
        this.$emit("input", val);
      },
    },
  },
  methods: {
    logicEdit(action, val) {
      let { obj, childrenName } = initObjAndName(this.type);
      switch (action) {
        case "deleteItem":
          if (this.rootData[childrenName].length > 1) {
            removeNodeById(this.rootData, val.id);
            if (
              this.rootData[childrenName].length === 1 &&
              this.rootData[childrenName][0][childrenName].length > 1
            ) {
              this.rootData = this.rootData[childrenName][0];
            }
          } else {
            this.$message.error("至少有一个条件");
          }
          break;
        case "addBroItem":
          addSiblingNodeById(this.rootData, val.id, obj);
          break;
        case "addSonItem":
          if (this.rootData[childrenName].length == 1) {
            addSiblingNodeById(this.rootData, val.id, obj);
          } else {
            addSonNodeById(this.rootData, val.id, obj);
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
</style>