<template>
  <section class="codePen">
    <section class="preview" ref="preview"></section>
    <div class="Mobile_Bar"></div>
    <section class="codeEditorSection" ref="codeEditorSection">
      <div class="controlContainer">
        <div style="display: flex">
          <el-button
            type="primary"
            @click="renderPage"
            size="mini"
            style="border-radius: unset"
          >
            <i class="el-icon-video-play"></i>
            运行
          </el-button>
          <el-button
            type="primary"
            @click="formatCode"
            size="mini"
            style="border-radius: unset"
          >
            <i class="icon-code"></i>
            格式化代码
          </el-button>
        </div>
        <self-tabs
          :selfTabs="selfTabs"
          @tab-click="handleTabClick"
          style="height: 100%"
        ></self-tabs>
        <!-- <i class="icon-code formatCode" @click="formatCode"></i> -->
      </div>
      <section class="editorsContainer">
        <codeEditor
          modelName="template"
          languageType="html"
          v-model="templateCode"
          :formatCodeCount="formatCodeCount"
          :editorResizeCount="editorResizeCount"
        ></codeEditor>
        <codeEditor
          modelName="script"
          languageType="abc"
          v-model="scriptCode"
          :formatCodeCount="formatCodeCount"
          :editorResizeCount="editorResizeCount"
        ></codeEditor>
        <codeEditor
          modelName="style"
          languageType="css"
          v-model="styleCode"
          :formatCodeCount="formatCodeCount"
          :editorResizeCount="editorResizeCount"
        ></codeEditor>
      </section>
    </section>
  </section>
</template>
  
  <script>
import Vue from "vue/dist/vue.esm.js";
import codeEditor from "./codeEditor";
import selfTabs from "../homePage/components/selfTabs.vue";
import exampleData from "./exampleData";
export default {
  components: {
    codeEditor,
    selfTabs,
  },
  data() {
    return {
      moveEvent: null,
      selfTabs: [
        { label: "清空", sign: "exampleOne" },
        { label: "示例一", sign: "exampleTwo" },
        { label: "示例二", sign: "exampleThree" },
      ],
      templateCode: "",
      scriptCode: "",
      styleCode: "",
      formatCodeCount: 0,
      editorResizeCount: 0,
    };
  },
  methods: {
    renderPage() {
      this.$refs.preview.innerHTML = "";
      let dom = document.createElement("div");
      dom.id = "content";
      this.$refs.preview.appendChild(dom);
      // 获取配置，并定义组件
      const config = new Function(`return ({${this.scriptCode}})`)();
      const Profile = {
        template: this.templateCode,
        ...config,
      };
      // 挂载到页面
      new Vue(Profile).$mount("#content");
      this.updateDynamicStyles(this.styleCode);
    },
    updateDynamicStyles: function (cssCode) {
      if (!cssCode) {
        cssCode = this.cssCode || "";
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
    formatCode() {
      this.formatCodeCount++;
    },
    handleMouseDown(event) {
      if (event.detail === 2) {
        // 检查是否为双击
        event.preventDefault();
        document.body.style.userSelect = "none"; // 动态设置样式
      } else {
        document.body.style.userSelect = "auto"; // 取消禁用
      }
      if (event.target.className == "Mobile_Bar") {
        this.moveEvent = {
          x: event.clientX,
          y: event.clientY,
          sectionWidth: this.$refs.codeEditorSection.offsetWidth,
        };
      }
    },
    handleMouseMove(event) {
      if (this.moveEvent) {
        document.body.style.userSelect = "none"; // 动态设置样式
        let section = this.$refs.codeEditorSection;
        section.style.width =
          this.moveEvent.sectionWidth - event.clientX + this.moveEvent.x + "px";
      }
    },
    handleMouseUp() {
      if (this.moveEvent) {
        document.body.style.userSelect = "auto"; // 取消禁用
        this.moveEvent = null;
        this.editorResizeCount++;
        this.renderPage();
      }
    },
    handleTabClick(sign) {
      this.templateCode = exampleData[sign].templateCode;
      this.scriptCode = exampleData[sign].scriptCode;
      this.styleCode = exampleData[sign].styleCode;
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
::v-deep .tab_items {
  width: fit-content;
  padding: 0 10px;
  height: 100%;
  border-radius: 0 !important;
  border: none !important;
  font-size: 12px;
}
::v-deep .tab_items.actived {
  background: #409eff;
}
.codePen {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  /* gap: 10px; */
}
.preview {
  flex: 1;
  overflow: auto;
  padding: 10px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.Mobile_Bar {
  width: 10px;
  background: #e1e4e7;
  cursor: col-resize;
}

.codeEditorSection {
  min-width: 360px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.editorsContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.controlContainer {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-right: 10px; */
  box-sizing: border-box;
}
/* .formatCode {
  font-size: 12px;
  color: #666;
  cursor: pointer;
}
.formatCode:hover {
  color: #5cb6ff;
} */
</style>