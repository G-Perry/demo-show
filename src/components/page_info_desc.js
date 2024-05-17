export default [
  {
    name: "首页",
    desc: "一个简易的首页，Echarts、词云、响应式布局",
  },
  {
    name: "通用模板页面",
    desc: "通用后台管理页面模板，使用elementUI并对其样式二次修改，包含基本的增删改查、分页、表单校验、批量操作、表格高度自适应等功能，增删改查的实现是使用axios请求接口，并通过mockjs库拦截请求模拟获取数据",
  },
  {
    name: "Echarts_Show",
    desc: "部分项目中曾配置过的Echarts图表，使用grid布局，数据均为假数据",
  },
  {
    name: "ThreeJs_Learn",
    desc: "年前空闲的时候学习的一个threeJS官网案例。有个疑问若能解答万分感谢：最开始的时候将配置项、方法以vue2的语法写在data和methods中，在写到球的碰撞检测时页面很卡，发现是因为循环函数走的是CPU不是GPU，一直没能解决，后来改成原生的写法就好了。对比了下两者，从js的语法角度看，无非一个的配置绑在了vue实例上，其他并没有区别，但为什么一个循环走的是CPU而另一个是GPU呢？",
  },
  {
    name: "Achieve_By_Oneself",
    desc: "这一部分均是自己手写的代码，有参考但并未调用任何库。",
  },
  {
    name: "Achieve_By_Oneself - CSS 3D Sphere",
    desc: '使用css的"border-radius: 50%;transform-style: preserve-3d;transform: rotateY(deg)"等属性绘制的一个带有经纬度的3D球',
  },
  {
    name: "Achieve_By_Oneself - SVG IMITATE 3D",
    desc: "使用svg实现的一个模拟3D的页面。实现思路：使用透视投影算法，将3D坐标投影到2D平面上，根据相机的角度和距离计算点的2D坐标，通过监听鼠标和滚轮事件改变点的坐标，实现模拟3d的效果。参考地址：https://codepen.io/strangerintheq/pen/KKpRdav",
  },
  {
    name: "Achieve_By_Oneself - SVG + Sphere",
    desc: "前两个页面的结合",
  },
  {
    name: "Achieve_By_Oneself - Sphere System",
    desc: "一个使用 CSS 模拟星系效果的页面，文字跟随效果有瑕疵",
  },
  {
    name: "Achieve_By_Oneself - SVG Connector",
    desc: '不知道怎么描述页面。实现思路：通过将角度转换为弧度并使用三角函数计算出圆周上每个点的坐标，点与点之间通过[{from: "",to: ""}]表示连接关系，并以此表示线，鼠标移入的时候通过循环找到要显示的线改变颜色',
  },
  {
    name: "Achieve_By_Oneself - SVG 拓扑图 1",
    desc: '使用svg实现的一个拓扑图页面。实现思路：先渲染方形div并给它绑定id，使用[{from: "id1",to: "id2"}]表示连接关系,使用document.getElementById()方法循环找出连接双方的对应点，再将点push进线的数组并渲染。鼠标移入时根据ID使用递归算法找到路径并改变颜色。',
  },
  {
    name: "Achieve_By_Oneself - SVG 拓扑图 2",
    desc: "仿照flink监控的一个页面，实现思路：将数据转成树形数据，再得出每一条的相应层级，根据层级循环摆放，并计算出每个方块的中心点，再以此连线；通过svg的':transform=`translate(${translateX},${translateY})scale(${scaleCoefficient})`'属性来实现鼠标拖拽和滚动缩放效果",
  },
  {
    name: "Achieve_By_Oneself - Word Cloud",
    desc: "词云组件，实现思路：先求出字符的长度，再循环随机摆放位置，逐个与之前的进行碰撞检测，并设置上限防止死循环",
  },
  {
    name: "Achieve_By_Oneself - Calendar And Plan",
    desc: "日历、计划，实现思路：grid布局，先使用new Date(year, month, 0).getDate()求上个月和这个月天数，getDay()求上月末所在星期数，以此为基准推导本月的数据信息；再根据计划的日期查找对应坐标，使用`grid-column: ${x} / span 1; grid-row: ${y};`将计划放在对应位置。参考地址：https://codepen.io/knyttneve/pen/QVqyNg",
  },
];
