<template>
  <div class="full-container">
    <div class="header">
      <button type="button" class="btn pageBack" @click="pageBack">
        <i class="el-icon-back"></i>
      </button>
    </div>
    <section class="subPage">
      <div class="left">
        <div
          v-for="(item, listIndex) in leftComponents"
          :key="listIndex"
          class="components_classify"
        >
          <div class="components_title">
            <svg-icon icon-class="component" />
            {{ item.title }}
          </div>
          <draggable
            class="components_list"
            :list="item.list"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            :sort="false"
            :clone="cloneComponent"
            @start="clearFormItemColor"
            @end="onEnd"
          >
            <!-- @change="log" -->
            <div
              class="component_item"
              v-for="element in item.list"
              :key="element.label"
            >
              <svg-icon :icon-class="element.config.tagIcon" />
              {{ element.config.label }}
            </div>
          </draggable>
        </div>
      </div>
      <div class="middle">
        <div class="container">
          <div class="header">
            <el-button type="text" @click="previewForm">
              <i class="el-icon-view"></i> 预览
            </el-button>
            <el-button type="text">
              <i class="el-icon-edit-outline"></i> 清空
            </el-button>
            <el-button type="text">
              <i class="el-icon-document"></i> 保存
            </el-button>
          </div>
          <el-form class="form_container">
            <draggable
              class="drawing-board"
              :list="drawingList"
              :animation="340"
              group="componentsGroup"
            >
              <draggable-item
                v-for="element in drawingList"
                :ref="element.id"
                :key="element.id"
                :formItem="element"
                @itemSelected="itemSelected"
              ></draggable-item>
            </draggable>
          </el-form>
        </div>
      </div>
      <div class="right">
        <form-item-config
          v-if="configIsShow && activedItem"
          v-model="activedItem"
        ></form-item-config>
      </div>
    </section>
    <form-preview ref="formPreview" :originData="drawingList"></form-preview>
  </div>
</template>
  
<script>
import draggable from "vuedraggable";
import { inputComponents, selectComponents } from "./config";
import { deepClone } from "@/utils/index";
import DraggableItem from "./DraggableItem.vue";
import formItemConfig from "./formItemConfig.vue";
import formPreview from "./formPreview/index.vue";
import { UUID } from "@/utils/handleObjMethods";
// let activedItemId = null;
export default {
  name: "customForm",
  components: { draggable, DraggableItem, formItemConfig, formPreview },
  data() {
    return {
      leftComponents: [
        {
          title: "基础组件",
          list: inputComponents,
        },
        {
          title: "高级组件",
          list: selectComponents,
        },
      ],
      drawingList: [],
      configIsShow: false,
      activedItem: null,
      // rules: {},
    };
  },
  computed: {
    // activedItem() {
    //   let obj = this.drawingList.find((item) => item.id === this.activedItemId);
    //   console.log(obj);
    //   return obj;
    // },
    // rules() {
    //   let arr = this.drawingList;
    //   console.log(arr);
    //   arr.map((item) => {
    //     let obj1 = {
    //       required: true,
    //       message: "请输入邮箱地址",
    //       trigger: "blur",
    //     };
    //     return item.id;
    //   });
    // },
  },
  watch: {
    // drawingList: {
    //   deep: true,
    //   immediate: true,
    //   handler: function (val, oldVal) {
    //     let arr = val.map((item) => {
    //       return item.id;
    //     });
    //     console.log(arr);
    //   },
    // },
    // activedItem: {
    //   handler(val) {
    //     this.$nextTick(() => {
    //       // this.$refs[val.id].focus();
    //       console.log(val);
    //       console.log(this.$refs[val.id]);
    //     });
    //   },
    // },
  },
  methods: {
    pageBack() {
      this.$router.go(-1);
    },
    cloneComponent(item) {
      this.configIsShow = false;
      let e = deepClone(item);
      e.id = UUID("form_item");
      e.propName = UUID("field");
      this.activedItem = e;
      return e;
    },
    // 用于切换当前选中的表单项的颜色
    clearFormItemColor() {
      let formItems = document.querySelectorAll(".formItem");
      formItems.forEach((item) => {
        item.style.backgroundColor = "#f7f7f7";
      });
    },
    fillFormItemColor() {
      let dom = this.$refs[this.activedItem.id][0].$el;
      dom.style.backgroundColor = "#e7f2ff";
    },
    onEnd(val) {
      if (val.from !== val.to) {
        this.configIsShow = true;
        this.fillFormItemColor();
      }
    },
    itemSelected(item) {
      this.activedItem = item;
      this.clearFormItemColor();
      this.fillFormItemColor();
    },
    previewForm() {
      this.$refs.formPreview.open();
    },
  },
};
</script>
  
  
  
  <style lang='scss' scoped>
.full-container {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: var(--headerHeight);
  background: #fff;
  position: relative;
}
.subPage {
  flex: 1;
  overflow: auto;
  border-top: 1px solid #ddd;
  display: flex;
}
.left {
  flex: 1;
  user-select: none;
}
.middle {
  flex: 4;
  background: #f5f5f5;
  padding: 10px 10px 0;
  overflow: auto;
}
.container {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.container > .header {
  width: 100%;
  height: 36px;
  padding-right: 20px;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: flex-end;
}
.right {
  flex: 1;
}

.components_classify {
  width: 100%;
  padding: 10px;
}

.components_title {
  font-size: 16px;
  color: #222;
  margin-bottom: 10px;
}
.components_list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.component_item {
  flex-basis: calc(50% - 10px);
  height: 30px;
  line-height: 30px;
  color: #5a6066;
  background: #e1efff;
  font-size: 14px;
  padding-left: 10px;
  border: 1px dashed transparent;
  white-space: nowrap; /* 文本不换行 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 溢出部分用省略号表示 */
  cursor: move;
}
.component_item:hover {
  border-color: #787be8;
}
::v-deep .sortable-ghost {
  color: #5a6066 !important;
  background: #e1efff !important;
}
.form_container {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 10px;
}
.drawing-board {
  width: 100%;
  height: 100%;
}
::v-deep .drawing-board {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  gap: 10px;
}
::v-deep .drawing-board .component_item {
  grid-column: span 2;
}
</style>
  