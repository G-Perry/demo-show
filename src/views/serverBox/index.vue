<template>
    <div style="width: 100%;height: 100%;">
        <div id="serverRoom" ref="container"></div>
        <div class="btns">
            <button id="btnOn">开门</button>
            <button id="btnOff">关门</button>
        </div>
    </div>
</template>

<script>
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
export default {
    mounted() {
        const container = this.$refs.container
        let WIDTH
        let HEIGHT

        let stats;
        let camera, scene, raycaster, renderer, controls, mixer, clock, action, CONTAINER;
        let INTERSECTED;

        function init() {
            CONTAINER = container
            WIDTH = CONTAINER.offsetWidth;
            HEIGHT = CONTAINER.offsetHeight;

            clock = new THREE.Clock();
            raycaster = new THREE.Raycaster();

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf0f0f0);

            camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 1000);
            camera.position.set(0, 30, 20);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(WIDTH, HEIGHT);
            CONTAINER.appendChild(renderer.domElement);


            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true; // 添加阻尼
            controls.dampingFactor = 0.1;
            // controls.autoRotate = true; // 自动旋转
            // controls.autoRotateSpeed = 0.5;

            stats = new Stats();
            CONTAINER.appendChild(stats.dom);

            // 添加坐标系
            const axesHelper = new THREE.AxesHelper(20); // 参数为坐标轴的长度
            scene.add(axesHelper);


            document.addEventListener("mousemove", onPointerMove);
            window.addEventListener("resize", onWindowResize);

            addDirectionalLights()
        }
        function loadModel() {
            const loader = new GLTFLoader().setPath("./threeJsModel/gltf/");

            loader.load("server_box.glb", (gltf) => {
                const model = gltf.scene;
                mixer = new THREE.AnimationMixer(model);
                const animations = gltf.animations;

                // 确保模型及其子对象都是可见的，并且有独立的材质
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.visible = true;
                        child.frustumCulled = false; // 确保光线投射能穿透所有层级
                        // 确保每个模型实例都有独立的材质
                        if (child.material) {
                            child.material = child.material.clone();
                        }
                    }
                });

                if (animations && animations.length > 0) {
                    action = mixer.clipAction(animations[0]); //开门动画
                    action.loop = THREE.LoopOnce; // 设置动画只播放一次
                    action.clampWhenFinished = true; // 动画结束时停留在最后一帧
                }
                scene.add(model);
            });
        }

        const pointer = new THREE.Vector2();

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
        }
        function addLight(arr) {
            arr.forEach((item) => {
                let light = new THREE.DirectionalLight(0xffffff, 1);
                light.position.set(item[0], item[1], item[2]);
                scene.add(light);
            });
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


        function animate() {
            requestAnimationFrame(animate);
            render();
            stats.update();
            controls.update();

            const delta = clock.getDelta(); // 获取时间增量
            if (mixer) {
                mixer.update(delta); // 更新动画
            }
        }

        function render() {
            raycaster.setFromCamera(pointer, camera);
            renderer.render(scene, camera);
        }


        document.getElementById('btnOn').addEventListener('click', () => doorAction('on'))
        document.getElementById('btnOff').addEventListener('click',() => doorAction('off'))

        function doorAction(type) {
            switch (type) {
                case 'on':
                    action.timeScale = 1; // 正向播放
                    action.reset(); // 重置动画时间
                    action.play(); // 播放动画
                    break;
                case 'off':
                    action.timeScale = -1; // 反向播放
                    action.reset(); // 重置动画时间
                    action.time = action.getClip().duration;
                    action.play(); // 播放动画
                    break;

                default:
                    break;
            }
        }

        init();
        loadModel();
        animate();
    }
}
</script>

<style scoped>
.demo {
    width: 100%;
    height: 100%;
    position: relative;
}

#serverRoom {
    width: 100%;
    height: 100%;
}

.btns {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 20px;
}
</style>