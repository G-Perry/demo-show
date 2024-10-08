import Vue from "vue";

const BaseComponent = function (template) {
  // 使用 Vue.compile 编译模板
  const compiled = Vue.compile(template);
  //   return Vue.extend(template, ...script);
  return Vue.extend({ template: compiled.render });
};

export default BaseComponent;
