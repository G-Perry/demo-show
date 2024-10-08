<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">demo-show</h1>

作者：[G-Perry](https://github.com/G-Perry)

在线预览：[http://106.15.8.47:8080/](http://106.15.8.47:8080/)

## node 相关的版本信息

```
> nvm -v    1.1.11
> node -v   v20.12.2
> npm -v    10.7.0
```

## demo 简介

本 demo 主要是作者日常工作、学习时所写的一些代码，有实际的应用场景，觉得有出彩点便集合起来，用于技术展示。

## 页面简介及技术运用

1. 两个首页
   1. 响应式布局、Echarts、词云
2. 两个通用后台管理系统的增删改查模板页面
   1. 页面过窄时，两种顶部搜索区的展示思路
      1. 直接隐藏区域并留有按钮打开 el-drawer
      2. 容器查询结合 JavaScript 实现搜索区域的响应式布局及开合
   2. 两种表格高度自适应的实现思路
      1. JavaScript 计算赋值给 el-table 的 height 属性
      2. 通过改变 el-table 内部的 css 实现（这种会有 bug，已发现两个均已解决,若发现其他的欢迎提出。1.fixed 固定列功能无法使用 2.el-table 高度被外部压缩为 0 时会触发卡死）
   3. 通过 mockjs 拦截 axios 请求模拟获取数据
3. Echarts_Show
   1. 项目中曾配置过的部分 Echarts 图表
4. ThreeJs_Learn
   1. 自己学习 threeJs 官网的一个案例
5. Achieve_By_Oneself（自己手写的一些效果，部分有参考页面但未调用任何库）
   1. css-3d 实现的含有经纬度的球体、模拟星系旋转
   2. 通过透视投影算法计算点的位置实现 svg 2d 模拟 3d 的效果
   3. svg 实现拓扑图，使用递归算法展示相应路径
   4. 一个词云组件
   5. 一个展示日历、计划的组件
   6. 一个用于表单新增时添加多条同类目数据的组件，必填校验、数据双向绑定
6. Shopping_Mall
   1. 一个 UI 简陋的 pc 端积分商城，有基本的几个页面，商品详情页有个图片放大预览的功能
7. Document_Catalogue
   1. 参考奇安信补天漏洞响应平台的文档阅读页面，手写实现目录、文档、导航等功能，优化了原平台的几个 bug
8. 3D_Server_Room
   1. 使用 threeJs 实现的 3d 机房页面，半成品，有交互效果，建模还在自学中
9. Svg_Flow_Chart
   1. 项目中遇到开发工作流的需求，具有高度定制性，遂参考[维易科技 ITSM 服务流程中心](https://demo.veops.cn/)的页面以及类似的流程图插件手写实现。
   2. 正在开发中，现已实现元素拖拽、连线、路径文字、循环边校验、节点名称修改、添加条件分支等功能
10. Code_Pen
    1. 网上的一些代码只有代码没有效果图，还要复制到本地看效果，于是做了个 vue2 单文件组件的在线编辑器。
