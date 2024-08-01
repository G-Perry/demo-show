import Vue from "vue";
import Vuex from "vuex";
import tab from "./modules/tab";
import shoppingMall from "./modules/shoppingMall";

Vue.use(Vuex);

// 创建Vuex的实例
export default new Vuex.Store({
  modules: {
    tab,
    shoppingMall,
  },
});
