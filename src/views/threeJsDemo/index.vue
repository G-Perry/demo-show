<template>
  <div ref="son_fit_father" class="son_fit_father" style="position: relative;">
    <!-- 
      设置两层是为了window.resize时，three_demo不被canvas高度撑开
      设置绝对定位，并转而获取父级元素的宽高
      以保证three_demo始终撑满却又不溢出
    -->
    <div
      ref="three_demo"
      style="position: absolute;width: 100%;height: 100%;"
      tabindex="0"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
    ></div>
    <!-- 
      @keydown="handleKeyDown"
      @keyup="handleKeyUp"
      @wheel.stop="handleWheel"
    -->
  </div>
</template>

<script>
// 引入threeJS
import * as THREE from "three";
// 引入GLTF加载器
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
export default {
  data() {
    return {
      width: 0,
      height: 0,
      scene: null,
      camera: null,
      renderer: null,
      loader: null,
      controls: null,
      clock: null,
      STEPS_PER_FRAME: 5,
    };
  },
  methods: {
    getWidthHeight() {
      // 获取容器的宽高
      this.width = this.$refs.son_fit_father.offsetWidth;
      this.height = this.$refs.son_fit_father.offsetHeight;
    },
    init() {
      // 该对象用于跟踪时间
      this.clock = new THREE.Clock();
      // 初始化场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x88ccee); //  设置背景色
      this.scene.fog = new THREE.Fog(0x88ccee, 0, 50); //  设置场景雾

      // 初始化相机
      this.camera = new THREE.PerspectiveCamera(
        70, // fov 相机视锥体竖直方向视野角度
        this.width / this.height, // aspect相机视锥体水平方向和竖直方向长度比，一般设置为Canvas画布宽高比width / height
        0.1, // near	相机视锥体近裁截面相对相机距离
        1000 // far	相机视锥体远裁截面相对相机距离，far-near构成了视锥体高度方向
      );
      this.camera.rotation.order = "YXZ";
      this.camera.position.z = 5;

      // 初始化渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true }); //抗锯齿
      this.renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比。通常用于避免HiDPI设备上绘图模糊
      this.renderer.setSize(this.width, this.height); //将输出canvas的大小调整为(width, height)
      this.renderer.shadowMap.enabled = true; //设置开启，允许在场景中使用阴影贴图
      this.renderer.shadowMap.type = THREE.VSMShadowMap; //使用Variance Shadow Map (VSM)算法来过滤阴影映射。当使用VSMShadowMap时，所有阴影接收者也将会投射阴影。
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping; //色调映射的曝光级别,ACES Filmic Tone Mapping 主要用于模拟电影胶片的色调映射效果，提供更自然、更富有动感的渲染结果。
      this.$refs.three_demo.appendChild(this.renderer.domElement);

      // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // 初始化平行光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
      directionalLight.position.set(-5, 25, -1);
      directionalLight.castShadow = true;
      directionalLight.shadow.camera.near = 0.01;
      directionalLight.shadow.camera.far = 500;
      directionalLight.shadow.camera.right = 30;
      directionalLight.shadow.camera.left = -30;
      directionalLight.shadow.camera.top = 30;
      directionalLight.shadow.camera.bottom = -30;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.radius = 4;
      directionalLight.shadow.bias = -0.00006;
      this.scene.add(directionalLight);

      // 半球光（HemisphereLight）光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
      const fillLight = new THREE.HemisphereLight(0x8dc1de, 0x00668d, 1.5);
      fillLight.position.set(2, 1, 1);
      this.scene.add(fillLight);
      // 加载glb类型的建模
      this.loader = new GLTFLoader().setPath("./threeJsModel/gltf/");
      this.loader.load("collision-world.glb", (gltf) => {
        this.scene.add(gltf.scene);
      });
    },
    animate() {
      /**
       * this.clock.getDelta()方法返回自上一次调用以来经过的时间（秒）
       * Math.min(0.05, ...)：这一部分确保 deltaTime 不会过大，限制在 0.05 秒内。这是为了防止由于性能原因导致的巨大的时间间隔，从而造成物理模拟和动画的不稳定性。
       * STEPS_PER_FRAME 将 deltaTime 分成多个小步骤，以便在每个小步骤中进行部分更新。这可以帮助提高模拟的稳定性，特别是在动画和物理计算中。
       * 这一行代码的目的是计算一个适当的小时间步 deltaTime，以确保在每一帧内都有合适的时间来进行模拟和动画的更新，而不至于出现过大的变化。
       */
      const deltaTime =
        Math.min(0.05, this.clock.getDelta()) / this.STEPS_PER_FRAME;

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      // this.controls.update();
    },
    onWindowResize() {
      this.getWidthHeight();
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    },
    handleMouseDown(e) {
      document.body.requestPointerLock();

      console.log(e, document.body);
    },
    handleMouseUp() {},
    handleMouseMove(e) {
      if (document.pointerLockElement === document.body) {
        console.log(e);
        this.camera.rotation.y -= e.movementX / 500;
        this.camera.rotation.x -= e.movementY / 500;
      }
    },
    handleKeyDown(e) {
      console.log(111, e);
    },
    handleKeyUp() {},
  },
  mounted() {
    this.getWidthHeight();
    this.init();
    this.animate();
    window.addEventListener("resize", this.onWindowResize);
    document.addEventListener("keydown", (event) => {
      console.log(222, event, document.pointerLockElement);
      // keyStates[event.code] = true;
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
};
</script>

<style>
</style>