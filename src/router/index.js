import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: () => import("../views/index.vue"),
    redirect: "home",
    children: [
      {
        path: "home",
        name: "homePage",
        component: () => import("../views/homePage/index.vue"),
      },
      {
        path: "homeOne",
        name: "homePageOne",
        component: () => import("../views/homePageOne/index.vue"),
      },
      {
        path: "usual",
        name: "usualPage",
        component: () => import("../views/usualPage/index.vue"),
      },
      {
        path: "anotherUsualPage",
        name: "anotherUsualPage",
        component: () => import("../views/usualPageOne/index.vue"),
      },
      {
        path: "echarts",
        name: "echartsPage",
        component: () => import("../views/echartsPage/index.vue"),
      },
      {
        path: "threeLearning",
        name: "threeJsDemoPage",
        component: () => import("../views/threeJsDemo"),
      },
      {
        path: "cssAndSvg",
        name: "cssAndSvgPage",
        component: () => import("../views/cssAndSvgPage"),
      },
      {
        path: "metaphysics",
        name: "metaphysicsPage",
        component: () => import("../views/metaphysicsPage"),
      },
      {
        path: "test",
        name: "testPage",
        component: () => import("../views/testPage"),
      },
      {
        path: "testOne",
        name: "testPageOne",
        component: () => import("../views/testPage/testPageOne.vue"),
      },
      {
        path: "testTwo",
        name: "testPageTwo",
        component: () => import("../views/testPage/testPageTwo.vue"),
      },
      {
        path: "shoppingMall",
        name: "shoppingMall",
        // meta: { title: "商城", activeMenu: "whitehat" },
        component: () => import("../views/shoppingMall/index"),
      },
      {
        path: "goodsList",
        name: "goodsList",
        // meta: { title: "商品列表", activeMenu: "whitehat" },
        component: () => import("../views/shoppingMall/goodsList.vue"),
      },
      {
        path: "goodsDetails",
        name: "goodsDetails",
        // meta: { title: "商品详情", activeMenu: "whitehat" },
        component: () => import("../views/shoppingMall/goodsDetails.vue"),
      },
      {
        path: "shoppingCart",
        name: "shoppingCart",
        // meta: { title: "购物车", activeMenu: "whitehat" },
        component: () => import("../views/shoppingMall/shoppingCart.vue"),
      },
      {
        path: "shoppingOrder",
        name: "shoppingOrder",
        // meta: { title: "订单中心", activeMenu: "whitehat" },
        component: () => import("../views/shoppingMall/shoppingOrder.vue"),
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
