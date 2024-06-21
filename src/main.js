import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./mock/mock";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "./assets/style/style.scss";
import "./assets/iconFont/style.css";

Vue.use(ElementUI);

import MyTable from "@/components/my_table_pagination.vue";
import TopSearch from "@/components/commonTopSearch.vue";
Vue.component("my-table", MyTable);
Vue.component("top-search", TopSearch);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
