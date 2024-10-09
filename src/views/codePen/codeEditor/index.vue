<template>
  <section class="editorContainer" :style="codeSectionIsShow ? 'flex: 1' : ''">
    <div class="topHeaderControl">
      <div class="tagName">&lt;{{ modelName }}&gt;</div>
      <div class="zoomIcon" @click="handleSelectZoom">
        <i class="el-icon-minus" v-if="codeSectionIsShow"></i>
        <i class="el-icon-plus" v-else></i>
      </div>
    </div>
    <div class="tagName script" v-if="modelName == 'script'">
      export default {
    </div>
    <ace-editor
      ref="aceEditor"
      v-model="content"
      @init="editorInit"
      :lang="languageType"
      theme="chrome"
      :options="{
        showPrintMargin: false, //去除编辑器里的竖线
      }"
    ></ace-editor>
    <div class="tagName script" v-if="modelName == 'script'">}</div>
    <div class="tagName">&lt;/{{ modelName }}&gt;</div>
  </section>
</template>

<script>
import aceEditor from "vue2-ace-editor";
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
    languageType: {
      type: String,
      default: "",
    },
    formatCodeCount: {
      type: Number,
      default: 0,
    },
    editorResizeCount: {
      type: Number,
      default: 0,
    },
  },
  components: {
    aceEditor,
  },
  watch: {
    value: {
      handler: function (val) {
        this.content = val;
      },
      immediate: true,
    },
    content: function (val) {
      this.$emit("input", val);
    },
    formatCodeCount: function () {
      this.formatCode();
    },
    editorResizeCount: function () {
      this.editorResize();
    },
  },
  data() {
    return {
      content: "",
      codeSectionIsShow: true,
    };
  },
  methods: {
    editorInit: function () {
      require("brace/ext/language_tools"); //language extension prerequsite...
      // require("brace/mode/html");
      // // require("brace/mode/javascript"); //language
      // require("brace/mode/css");
      // require("brace/mode/abc");
      require("brace/mode/" + this.languageType);
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    },

    handleSelectZoom() {
      this.codeSectionIsShow = !this.codeSectionIsShow;
      this.$parent.editorResizeCount++;
    },
    editorResize() {
      this.$nextTick(() => {
        this.$refs.aceEditor.editor.resize();
      });
    },
    formatCode() {
      let str = this.content;
      const jsBeautify = require("js-beautify");
      switch (this.languageType) {
        case "html":
          str = jsBeautify.html(str, { indent_size: 2 });
          break;
        case "abc":
          str = jsBeautify.js(str, { indent_size: 2 });
          break;
        case "css":
          str = jsBeautify.css(str, { indent_size: 2 });
          break;

        default:
          break;
      }
      this.content = str;
    },
  },
};
</script>

<style scoped>
/* .topHeader {
  height: 30px;
  line-height: 30px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
} */
.editorContainer {
  /* flex: 1; */
  display: flex;
  flex-direction: column;
}
.editorContainer + .editorContainer {
  margin-top: 10px;
}
.tagName {
  padding-left: 10px;
  font-size: 14px;
  color: #930f80;
  user-select: none;
}
.tagName.script {
  padding-left: 20px;
}
.topHeaderControl {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.zoomIcon {
  width: 12px;
  height: 12px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 12px;
  color: #999;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
}
</style>