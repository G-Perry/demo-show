<template>
  <div id="serverRoom" ref="three_demo"></div>
</template>

<script>
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default {
  mounted() {
    const CONTAINER = this.$refs.three_demo;
    let WIDTH = CONTAINER.offsetWidth;
    let HEIGHT = CONTAINER.offsetHeight;
    let stats;
    let camera, scene, raycaster, renderer, controls;
    let INTERSECTED;

    const pointer = new THREE.Vector2();

    init();
    animate();

    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 1000);
      camera.position.set(10, 10, 10);
      camera.lookAt(0, 0, 0);

      // const light = new THREE.DirectionalLight(0xffffff, 3);
      // light.position.set(1, 1, 1).normalize();
      // scene.add(light);

      // 在场景上方四角各添加一个聚光灯
      addDirectionalLights();
      // const geometry = new THREE.PlaneGeometry(10, 10); // 平面大小为10x10
      // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // 设置颜色
      // const plane = new THREE.Mesh(geometry, material);
      // plane.rotation.x = -Math.PI / 2; // 旋转平面使其面向上
      // scene.add(plane);

      loadModel();

      raycaster = new THREE.Raycaster();

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(WIDTH, HEIGHT);
      CONTAINER.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      // 添加阻尼
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      // 自动旋转
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      stats = new Stats();
      CONTAINER.appendChild(stats.dom);

      document.addEventListener("mousemove", onPointerMove);
      document.addEventListener("click", onMouseClick);
      window.addEventListener("resize", onWindowResize);
    }
    function addDirectionalLights() {
      let arr = [
        [-10, 3, 10],
        [10, 3, 10],
        [-10, 3, -10],
        [10, 3, -10],
        [0, 3, -10],
        [-10, 3, 0],
        [10, 3, 0],
        [0, 3, 10],
      ];
      addLight(arr);

      // 添加小球表示光源位置
      // addLightHelpers([
      //   directionalLightTopLeft,
      //   directionalLightTopRight,
      //   directionalLightBottomLeft,
      //   directionalLightBottomRight,
      //   aaa,
      //   bbb,
      //   ccc,
      //   ddd,
      // ]);
    }
    function addLight(arr) {
      arr.forEach((item) => {
        let light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(item[0], item[1], item[2]);
        scene.add(light);
      });
    }

    // function addLightHelpers(lights) {
    //   lights.forEach((light) => {
    //     const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    //     const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    //     sphere.position.copy(light.position);
    //     scene.add(sphere);
    //   });
    // }

    function loadModel() {
      const loader = new GLTFLoader().setPath("./threeJsModel/gltf/");

      loader.load(
        // "server_box.glb",
        // "server_rack.glb",
        "server_room.glb",
        (gltf) => {
          const model = gltf.scene;

          // 确保模型及其子对象都是可见的
          // model.traverse((child) => {
          //   if (child.isMesh) {
          //     child.visible = true;
          //     child.frustumCulled = false; // 确保光线投射能穿透所有层级
          //     if (
          //       !child.material ||
          //       (!child.material.isMeshStandardMaterial &&
          //         !child.material.isMeshPhongMaterial)
          //     ) {
          //       console.warn(
          //         "Unsupported material type for raycasting:",
          //         child.material
          //       );
          //     }
          //   }
          // });
          // 确保模型及其子对象都是可见的，并且有独立的材质
          model.traverse((child) => {
            if (child.isMesh) {
              child.visible = true;
              child.frustumCulled = false; // 确保光线投射能穿透所有层级

              // 确保每个模型实例都有独立的材质
              if (child.material) {
                child.material = child.material.clone();
              }

              // 禁用双面渲染
              // child.material.side = THREE.FrontSide;
            }
          });

          scene.add(model);
        }
      );
    }

    function onWindowResize() {
      renderer.setSize(CONTAINER.offsetWidth, CONTAINER.offsetHeight);
      camera.aspect = CONTAINER.offsetWidth / CONTAINER.offsetHeight;
      camera.updateProjectionMatrix();
    }

    function onPointerMove(event) {
      const rect = CONTAINER.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / CONTAINER.offsetWidth) * 2 - 1;
      pointer.y =
        (-(event.clientY - rect.top) / CONTAINER.offsetHeight) * 2 + 1;
    }

    function onMouseClick() {
      controls.autoRotate = false;
      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      console.log(intersects);
      if (intersects.length > 0) {
        let selectedItem = intersects[0];
        if (selectedItem.object.name !== "平面") {
          console.log(selectedItem.object.name);
          let position = selectedItem.object.position;
          console.log(position);
          camera.position.set(position.x, position.y, position.z+5);
          camera.lookAt(position.x, position.y, position.z);
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
      stats.update();
      controls.update();
    }

    function render() {
      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
          if (INTERSECTED && INTERSECTED.name !== "平面") {
            INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
          }

          INTERSECTED = intersects[0].object;
          if (INTERSECTED.name !== "平面") {
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
          }
        }
      } else {
        if (INTERSECTED && INTERSECTED.name !== "平面") {
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        }

        INTERSECTED = null;
      }

      renderer.render(scene, camera);
    }
  },
};
</script>

<style scoped>
#serverRoom {
  width: 100%;
  height: 100%;
}
</style>
