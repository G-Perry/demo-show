<template>
  <div class="son_fit_father" ref="three_demo"></div>
</template>

<script>
import * as THREE from "three";
// 引入扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import dat from "dat.gui";
export default {
  mounted() {
    // 创建控制对象
    const controlData = {
      rotationSpeed: 0.02,
      color: "#66ccff",
      wireframe: false,
    };
    // 创建gui实例
    const gui = new dat.GUI();
    const f = gui.addFolder("配置");
    f.add(controlData, "rotationSpeed").min(0.01).max(0.1).step(0.01);
    f.addColor(controlData, "color");
    f.add(controlData, "wireframe");
    f.domElement.id = "gui";
    f.open();
    // 创建场景
    // 场景能够让你在什么地方、摆放什么东西来交给three.js渲染,这是你放置物体\灯光\摄像机的地方
    const scene = new THREE.Scene();

    // 添加背景色
    scene.background = new THREE.Color(0x666666);
    // scene.background = new THREE.CubeTextureLoader()
    //   .setPath("/")
    //   .load(["01.png", "01.png", "01.png", "01.png", "01.png", "01.png"]);

    // 添加雾
    // scene.fog = new THREE.Fog(0xcccccc, 10, 15);

    // 创建相机
    const camera = new THREE.PerspectiveCamera();
    camera.position.y = 5;
    camera.position.z = 10;

    // 创建立方体
    // const geometry = new THREE.BoxGeometry(1, 6, 2);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ff00, //设置材质颜色
      transparent: true, //开启透明
      opacity: 0.5, //设置透明度
    });

    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    //点光源位置
    pointLight.position.set(0, 1, 0); //点光源放在x轴上
    pointLight.decay = 0.0; //设置光源不随距离衰减

    // 你可以对比不同光照强度明暗差异(传播同样距离)
    pointLight.intensity = 10000.0; //光照强度
    pointLight.intensity = 50000.0; //光照强度
    scene.add(pointLight);

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
    scene.add(pointLightHelper);

    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // 网格模型
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(3, 3, 3);
    // cube.position.set(0, 0, 0);
    scene.add(cube);

    // 添加网格地面
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth - 180, window.innerHeight - 80);
    renderer.setSize(1000, 1000);

    // 将染器添加到页面
    // document.body.appendChild(renderer.domElement);
    this.$refs.three_demo.appendChild(renderer.domElement);
    this.$refs.three_demo.appendChild(f.domElement);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 对轨道控制器改变时候进行监听
    controls.addEventListener("change", function () {
      // console.log('camera.position',camera.position);
      //   console.log("触发change");
    });

    // 添加阻尼
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    // 自动旋转
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // 添加坐标轴
    const axesHelper = new THREE.AxesHelper(10);
    axesHelper.position.y = 3;
    scene.add(axesHelper);

    // 进行渲染
    renderer.render(scene, camera);

    // 让立方体动起来
    // let i = 0;
    function animate() {
      //   requestAnimationFrame(animate);
      //   cube.rotation.x += 0.01;
      // i += 1;
      // console.log("执行次数" + i);
      requestAnimationFrame(animate);
      //   cube.rotation.x + 0.01;
      //   cube.rotation.y += 0.01;
      //   cube.rotation.z += 0.01;
      cube.rotation.x += controlData.rotationSpeed;
      cube.material.color = new THREE.Color(controlData.color);
      material.wireframe = controlData.wireframe;
      // 轨道控制器更新
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // 渲染循环
    // const clock = new THREE.Clock();
    // function render() {
    //   const spt = clock.getDelta() * 1000; //毫秒
    //   console.log("两帧渲染时间间隔(毫秒)", spt);
    //   console.log("帧率FPS", 1000 / spt);
    //   renderer.render(scene, camera); //执行渲染操作
    //   cube.rotateY(0.01); //每次绕y轴旋转0.01弧度
    //   requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    // }
    // render();
  },
};
</script>

<style></style>