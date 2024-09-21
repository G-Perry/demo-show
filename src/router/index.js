import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export const routes = [
  {
    path: "/",
    component: () => import("../views/index.vue"),
    redirect: "home",
    children: [
      {
        path: "home",
        name: "homePage",
        component: () => import("../views/homePage/index.vue"),
        visible: true,
        meta: { label: '首页', icon: 'icon-home', sort: 1 }
      },
      {
        path: "homeOne",
        name: "homePageOne",
        component: () => import("../views/homePageOne/index.vue"),
        visible: true,
        meta: { label: '首页-1', icon: 'icon-home', sort: 2 }
      },
      {
        path: "usual",
        name: "usualPage",
        component: () => import("../views/usualPage/index.vue"),
        visible: true,
        meta: { label: '通用模板页面1', icon: 'icon-file-text', sort: 3 }
      },
      {
        path: "anotherUsualPage",
        name: "anotherUsualPage",
        component: () => import("../views/usualPageOne/index.vue"),
        visible: true,
        meta: { label: '通用模板页面2', icon: 'icon-file-text', sort: 4 }
      },
      {
        path: "echarts",
        name: "echartsPage",
        component: () => import("../views/echartsPage/index.vue"),
        visible: true,
        meta: { label: 'Echarts_Show', icon: 'icon-echart', sort: 5 }
      },
      {
        path: "threeLearning",
        name: "threeJsDemoPage",
        component: () => import("../views/threeJsDemo"),
        visible: true,
        meta: { label: 'ThreeJs_Learn', icon: 'icon-codepen', sort: 6 }
      },
      {
        path: "cssAndSvg",
        name: "cssAndSvgPage",
        component: () => import("../views/cssAndSvgPage"),
        visible: true,
        meta: { label: 'Achieve_By_Oneself', icon: 'icon-command', sort: 7 }
      },
      {
        path: "metaphysics",
        name: "metaphysicsPage",
        component: () => import("../views/metaphysicsPage"),
        visible: false,
        meta: { label: 'metaphysicsPage', icon: 'icon-command', sort: 8 }
      },
      {
        path: "test",
        name: "testPage",
        component: () => import("../views/testPage"),
        visible: true,
        meta: { label: 'testPage', icon: 'icon-file-empty', sort: 9 }
      },
      {
        path: "testOne",
        name: "testPageOne",
        component: () => import("../views/testPage/testPageOne.vue"),
        visible: false,
        meta: { label: 'testPageOne', icon: 'icon-file-empty', sort: 10 }
      },
      {
        path: "testTwo",
        name: "testPageTwo",
        component: () => import("../views/testPage/testPageTwo.vue"),
        visible: false,
        meta: { label: 'testPageTwo', icon: 'icon-file-empty', sort: 11 }
      },
      {
        path: "shoppingMall",
        name: "shoppingMall",
        component: () => import("../views/shoppingMall/index"),
        visible: true,
        meta: { label: 'Shopping_Mall', icon: 'el-icon-goods', sort: 12 }
      },
      {
        path: "goodsList",
        name: "goodsList",
        component: () => import("../views/shoppingMall/goodsList.vue"),
        visible: false,
      },
      {
        path: "goodsDetails",
        name: "goodsDetails",
        component: () => import("../views/shoppingMall/goodsDetails.vue"),
        visible: false,
      },
      {
        path: "shoppingCart",
        name: "shoppingCart",
        component: () => import("../views/shoppingMall/shoppingCart.vue"),
        visible: false,
      },
      {
        path: "shoppingOrder",
        name: "shoppingOrder",
        component: () => import("../views/shoppingMall/shoppingOrder.vue"),
        visible: false,
      },
      {
        path: "svgFlowChart",
        name: "svgFlowChart",
        component: () => import("../views/svgFlowChart/index.vue"),
        visible: true,
        meta: { label: 'Svg_Flow_Chart', icon: 'el-icon-link', sort: 20 }
      },
      {
        path: "serverRoom",
        name: "serverRoom",
        component: () => import("../views/serverRoom/index.vue"),
        visible: true,
        meta: { label: '3D_Server_Room', icon: 'el-icon-link', sort: 14 }
      },
      // {
      //   path: "flowChartTest",
      //   name: "flowChartTest",
      //   component: () => import("../views/flowChartTest/index.vue"),
      // },
    ],
  },
  {
    path: "/documentCatalogue",
    name: "documentCatalogue",
    component: () => import("../views/documentCatalogue/index.vue"),
    meta: { label: 'Document_Catalogue', icon: 'el-icon-link', sort: 13 }
  },
  // {
  //   path: "/serverRoom",
  //   name: "serverRoom",
  //   component: () => import("../views/serverRoom/index.vue"),
  // },
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
