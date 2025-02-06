<template>
  <section class="field-mapping item">
    <div class="field_item left">
      <treeselect
        v-model="value.key"
        :options="firstOptions"
        :normalizer="normalizer"
        :show-count="true"
        :disable-branch-nodes="true"
        placeholder="请选择"
        zIndex="9999"
        @select="handleSelect"
      >
        <div slot="value-label" slot-scope="{ node }">
          {{ node.raw.customLabel }}
        </div>
      </treeselect>
    </div>
    <div class="field_item middle">
      <div class="line"></div>
    </div>
    <div class="field_item right">
      <treeselect
        v-model="value.value"
        :options="secondOptions"
        :normalizer="secondNormalizer"
        :show-count="true"
        :disable-branch-nodes="true"
        placeholder="请选择"
        zIndex="9999"
        @select="handleSelect"
      />
    </div>
  </section>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import { getFieldMappingTreeSelectOptions } from "../confg";
export default {
  props: ["firstOptions", "secondOptions", "value"],
  components: { Treeselect },
  data() {
    return {
      aaa: null,
      bbb: null,
      // treeSelectOptions: getFieldMappingTreeSelectOptions(),
    };
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
    secondNormalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.comment,
        children: node.children,
      };
    },
    handleSelect(aaa) {
      console.log(aaa);

      this.$emit("input", this.value);
    },
  },
};
</script>

<style scoped>
.field-mapping {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.field_item.left,
.field_item.right {
  width: 200px;
}
.middle {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.middle::before {
  content: "";
  width: 4px;
  height: 4px;
  background-color: #2f54eb;
  border-radius: 50%;
  border: 4px solid #e1efff;
  box-sizing: content-box;
}
.line {
  width: 120px;
  border-top: 1px solid #ccc;
}
.middle::after {
  content: "";
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-left-color: #cacdd9;
}
</style>