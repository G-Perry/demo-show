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
  
      // // 创建立方体
      // // const geometry = new THREE.BoxGeometry(1, 6, 2);
      // const geometry = new THREE.BoxGeometry(1, 1, 1);
      // // const material = new THREE.MeshBasicMaterial({
      // const material = new THREE.MeshLambertMaterial({
      //   color: 0x00ff00, //设置材质颜色
      //   transparent: true, //开启透明
      //   opacity: 0.5, //设置透明度
      // });
  
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
  
      // // 网格模型
      // const cube = new THREE.Mesh(geometry, material);
      // cube.position.set(3, 3, 3);
      // // cube.position.set(0, 0, 0);
      // scene.add(cube);
  
      // const geometry = new THREE.BoxGeometry(1, 1, 1);
      // //材质对象Material
      // const material = new THREE.MeshLambertMaterial({
      //   color: 0x00ffff, //设置材质颜色
      //   transparent: true, //开启透明
      //   opacity: 0.5, //设置透明度
      // });
      // for (let i = 0; i < 10; i++) {
      //   const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      //   // 沿着x轴分布
      //   mesh.position.set(i * 2, i, i);
      //   scene.add(mesh); //网格模型添加到场景中
      // }
  
      //创建一个长方体几何对象Geometry
      const geometry = new THREE.BoxGeometry(1, 2, 1);
      //BoxGeometry：长方体
      // const geometry = new THREE.BoxGeometry(100, 100, 100);
      // SphereGeometry：球体
      // const geometry = new THREE.SphereGeometry(50);
      // CylinderGeometry：圆柱
      // const geometry = new THREE.CylinderGeometry(50, 50, 100);
      // PlaneGeometry：矩形平面
      // const geometry = new THREE.PlaneGeometry(100, 50);
      // CircleGeometry：圆形平面
      // const geometry = new THREE.CircleGeometry(50);
      //材质对象Material
      // const material = new THREE.MeshLambertMaterial({
      //   color: 0x00ffff, //设置材质颜色
      //   transparent: true, //开启透明
      //   opacity: 0.5, //设置透明度
      // });
      // const material = new THREE.MeshPhongMaterial({
      //   color: 0xff0000,
      //   shininess: 20, //高光部分的亮度，默认30
      // });
      // 模拟镜面反射，产生一个高光效果
      // const material = new THREE.MeshPhongMaterial({
      //   color: 0xff0000,
      //   shininess: 20, //高光部分的亮度，默认30
      //   specular: 0x444444, //高光部分的颜色
      // });
  
      // for (let i = 0; i < 10; i++) {
      //   for (let j = 0; j < 10; j++) {
      //     const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      //     // 在XOZ平面上分布
      //     mesh.position.set(i * 2, 0, j * 2);
      //     scene.add(mesh); //网格模型添加到场景中
      //   }
      // }
  
      // 点渲染模式
      const material = new THREE.PointsMaterial({
        color: 0xffff00,
        size: 1.0, //点对象像素尺寸
      });
  
      const points = new THREE.Points(geometry, material); //点模型对象
      scene.add(points);
  
      // 添加网格地面
      const gridHelper = new THREE.GridHelper(10, 10);
      scene.add(gridHelper);
  
      // 创建渲染器
      // const renderer = new THREE.WebGLRenderer();
    //   const renderer = new THREE.WebGLRenderer({
    //     antialias: true,
    //   });
    //   renderer.setSize(window.innerWidth - 180, window.innerHeight - 80);
      // renderer.setSize(1000, 1000);
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
      // axesHelper.position.y = 3;
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
        // cube.rotation.x += controlData.rotationSpeed;
        // cube.material.color = new THREE.Color(controlData.color);
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
      // onresize 事件会在窗口被调整大小时发生
      window.onresize = function () {
        // 重置渲染器输出画布canvas尺寸
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = window.innerWidth / window.innerHeight;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix();
      };
      console.log("查看当前屏幕设备像素比", window.devicePixelRatio);
    },
  };
  </script>
  
  <style></style>