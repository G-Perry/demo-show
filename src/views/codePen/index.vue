<template>
  <section class="codePen">
    <section class="preview" ref="preview"></section>
    <section class="codeEditor">
      <editor-content :editor="editor" />
      <textarea
        v-model="templateCode"
        placeholder="在这里输入 template 代码"
      ></textarea>
      <textarea
        v-model="scriptCode"
        placeholder="在这里输入 script 代码"
      ></textarea>
      <textarea
        v-model="styleCode"
        placeholder="在这里输入 style 代码"
      ></textarea>
      <button type="button" @click="renderPage">1234</button>
    </section>
  </section>
</template>
  
  <script>
import Vue from "vue/dist/vue.esm.js";
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
      templateCode: `<h1>Hello World</h1>`,
      scriptCode: `data() { return { message: "Hello from script!" }; },created() {console.log(this, 111);},`,
      styleCode: "h1 { color: red; }",
    };
  },
  methods: {
    renderPage() {
      this.$refs.preview.innerHTML = "";
      let dom = document.createElement("div");
      dom.id = "abcd";
      this.$refs.preview.appendChild(dom);

      const config = new Function(`return ({${this.scriptCode}})`)();
      // 直接定义组件
      const Profile = {
        template: `
          <div>
            ${this.templateCode}
          </div>
        `,
        ...config,
      };
      new Vue(Profile).$mount("#abcd");

      this.updateDynamicStyles(this.styleCode);
    },
    updateDynamicStyles: function (cssCode) {
      if (!cssCode) {
        cssCode = this.cssCode;
      }

      // 创建 <style> 标签
      const styleElement = document.createElement("style");
      styleElement.innerHTML = cssCode;

      // 插入到页面中
      document.head.appendChild(styleElement);

      // 移除旧的 <style> 标签
      const oldStyleElements = document.querySelectorAll(
        "style[data-dynamic-css]"
      );
      oldStyleElements.forEach((oldStyle) => {
        document.head.removeChild(oldStyle);
      });

      // 设置新 <style> 标签的属性
      styleElement.setAttribute("data-dynamic-css", "");
    },
  },
  mounted() {
    this.editor = new Editor({
      content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
      extensions: [StarterKit],
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
  
  <style scoped>
.codePen {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  gap: 10px;
}
.preview {
  flex: 5;
  overflow: auto;
  padding: 10px;
  border: 1px solid #ccc;
}

.codeEditor {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>