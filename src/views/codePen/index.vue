<template>
  <div>
    <div
      ref="preview"
      style="width: 100%; height: 500px; border: 1px solid #ddd"
    >
      <div id="mount-point"></div>
    </div>
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
    <button type="button" @click="aaa">1111</button>
  </div>
</template>
  
  <script>
import BaseComponent from "./baseComponent";

export default {
  data() {
    return {
      templateCode: `<h1>Hello World</h1>`,
      scriptCode: 'data() { return { message: "Hello from script!" }; }',
      styleCode: "h1 { color: red; }",
    };
  },
  watch: {},
  methods: {
    aaa() {
      console.log(this);

      const Component = BaseComponent(this.templateCode);
      //   console.log(BaseComponent(this.templateCode));
      new Component().$mount("#mount-point");
    },
  },
};
</script>
  
  <style scoped>
.preview {
  flex: 1;
  overflow: auto;
  padding: 10px;
  border: 1px solid #ccc;
}
textarea {
  height: 200px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>