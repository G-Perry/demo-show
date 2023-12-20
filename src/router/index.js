import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: () => import("../components/main.vue"),
    redirect: "home",
    children: [
      {
        path: "home",
        name: "homePage",
        component: () => import("../views/index.vue"),
      },
      {
        path: "usual",
        name: "usualPage",
        component: () => import("../views/usualPage/index.vue"),
      },
    ],
  },
];

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history", // 去掉url中的#
  routes,
});

export default router;
