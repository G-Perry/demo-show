<template>
  <div class="son_fit_father" ref="three_demo"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
export default {
  mounted() {
    // 创建场景
    // 场景能够让你在什么地方、摆放什么东西来交给three.js渲染,这是你放置物体\灯光\摄像机的地方
    const scene = new THREE.Scene();

    // 添加背景色
    // scene.background = new THREE.Color(0x666666);
    scene.background = new THREE.CubeTextureLoader()
      .setPath("/")
      .load(["01.png", "01.png", "01.png", "01.png", "01.png", "01.png"]);

    // 添加雾
    scene.fog = new THREE.Fog(0xcccccc, 10, 15);

    // 创建相机
    const camera = new THREE.PerspectiveCamera();
    camera.position.y = 5;
    camera.position.z = 10;

    // 创建立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // 网格
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(3, 3, 3);
    scene.add(cube);

    // 添加网格地面
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 180, window.innerHeight - 80);

    // 将染器添加到页面
    // document.body.appendChild(renderer.domElement);
    this.$refs.three_demo.appendChild(renderer.domElement);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 对轨道控制器改变时候进行监听
    controls.addEventListener("change", function () {
      //   console.log("触发change");
    });

    // 添加阻尼
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    // 自动旋转
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // 添加坐标轴
    const axesHelper = new THREE.AxesHelper(5);
    axesHelper.position.y = 3;
    scene.add(axesHelper);

    // 进行渲染
    renderer.render(scene, camera);

    // 让立方体动起来
    function animate() {
      //   requestAnimationFrame(animate);
      //   cube.rotation.x += 0.01;

      requestAnimationFrame(animate);
      //   cube.rotation.x + 0.01;
      //   cube.rotation.y += 0.01;
      //   cube.rotation.z += 0.01;
      // 轨道控制器更新
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  },
};
</script>

<style></style>