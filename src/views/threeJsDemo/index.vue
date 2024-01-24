<template>
  <div ref="son_fit_father" class="son_fit_father" style="position: relative;">
    <!-- 
      设置两层是为了window.resize时，three_demo不被canvas高度撑开
      设置绝对定位，并转而获取父级元素的宽高
      以保证three_demo始终撑满却又不溢出
    -->
    <div ref="three_demo" style="position: absolute;width: 100%;height: 100%;"></div>
  </div>
</template>

<script>
// 引入threeJS
import * as THREE from "three";
// 引入GLTF加载器
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//Capsule胶囊体 用于处理角色的碰撞
import { Capsule } from "three/addons/math/Capsule.js";
// Octree八叉树 用于提高场景中对象之间的碰撞检测效率。
import { Octree } from "three/addons/math/Octree.js";
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
      NUM_SPHERES: 100, //球的编号，也是球的个数
      SPHERE_RADIUS: 0.2, //球半径
      sphereGeometry: null,
      sphereMaterial: null,
      spheres: [], //存储球
      sphereIdx: 0, //扔球地编号
      vector1: new THREE.Vector3(),
      vector2: new THREE.Vector3(),
      vector3: new THREE.Vector3(),
      STEPS_PER_FRAME: 5,
      GRAVITY: 30, //模拟重力
      keyStates: {}, // 存储按键位置
      playerOnFloor: false, // 检测是否在地面
      playerVelocity: new THREE.Vector3(), // 表示玩家当前速度的 THREE.Vector3 向量,用于跟踪玩家在三维空间中的运动速度。
      playerDirection: new THREE.Vector3(), // 表示玩家当前朝向的 THREE.Vector3 向量
      playerCollider: new Capsule( //创建一个胶囊体对象
        new THREE.Vector3(0, 0.35, 0), //表示胶囊体的起始点
        new THREE.Vector3(0, 1, 0), //表示胶囊体的终点
        0.35 //表示胶囊体的半径
      ),
      worldOctree: new Octree(),
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
        this.worldOctree.fromGraphNode(gltf.scene); //使场景与人物存在碰撞，不加人就会向下掉
      });
      // 创建球但并不显示出来
      this.sphereGeometry = new THREE.IcosahedronGeometry(
        this.SPHERE_RADIUS,
        5
      );
      this.sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xdede8d });
      for (let i = 0; i < this.NUM_SPHERES; i++) {
        const sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        this.scene.add(sphere);

        this.spheres.push({
          mesh: sphere,
          collider: new THREE.Sphere(
            new THREE.Vector3(0, -100, 0),
            this.SPHERE_RADIUS
          ),
          velocity: new THREE.Vector3(),
        });
      }
    },
    getForwardVector() {
      // 方向键获取前后矢量
      this.camera.getWorldDirection(this.playerDirection); // camera.getWorldDirection()调用该函数的结果将复制给该Vector3对象。返回一个能够表示当前摄像机所正视的世界空间方向的Vector3对象。 （注意：摄像机俯视时，其Z轴坐标为负。）
      this.playerDirection.y = 0;
      this.playerDirection.normalize();

      return this.playerDirection;
    },
    getSideVector() {
      // 方向键获取左右矢量
      this.camera.getWorldDirection(this.playerDirection);
      this.playerDirection.y = 0;
      this.playerDirection.normalize();
      this.playerDirection.cross(this.camera.up);

      return this.playerDirection;
    },
    handleKeyDownCauseMove(deltaTime) {
      // WASD移动，shift加速
      // const speedDelta = deltaTime * (this.playerOnFloor ? 25 : 8);
      let shiftSpeedDelta = this.keyStates["ShiftLeft"] ? 30 : 15;
      const speedDelta = deltaTime * (this.playerOnFloor ? shiftSpeedDelta : 4);

      if (this.keyStates["KeyW"]) {
        this.playerVelocity.add(
          // THREE.Vector3().add ( v : Vector3 )将传入的向量v和这个向量相加。
          this.getForwardVector().multiplyScalar(speedDelta) // THREE.Vector3().multiplyScalar(s:Float)将该向量与所传入的标量s进行相乘。
        );
      }
      if (this.keyStates["KeyS"]) {
        this.playerVelocity.add(
          this.getForwardVector().multiplyScalar(-speedDelta)
        );
      }
      if (this.keyStates["KeyA"]) {
        this.playerVelocity.add(
          this.getSideVector().multiplyScalar(-speedDelta)
        );
      }
      if (this.keyStates["KeyD"]) {
        this.playerVelocity.add(
          this.getSideVector().multiplyScalar(speedDelta)
        );
      }
      if (this.playerOnFloor) {
        if (this.keyStates["Space"]) {
          this.playerVelocity.y = 15;
        }
      }
    },
    playerCollisions() {
      const result = this.worldOctree.capsuleIntersect(this.playerCollider);
      // console.log(result,1111);

      this.playerOnFloor = false;

      if (result) {
        this.playerOnFloor = result.normal.y > 0;

        if (!this.playerOnFloor) {
          this.playerVelocity.addScaledVector(
            result.normal,
            -result.normal.dot(this.playerVelocity)
          );
        }

        this.playerCollider.translate(
          result.normal.multiplyScalar(result.depth)
        );
      }
    },
    spheresCollisions() {
      // 球与球的碰撞
      for (let i = 0, length = this.spheres.length; i < length; i++) {
        const s1 = this.spheres[i];

        for (let j = i + 1; j < length; j++) {
          const s2 = this.spheres[j];

          const d2 = s1.collider.center.distanceToSquared(s2.collider.center);
          const r = s1.collider.radius + s2.collider.radius;
          const r2 = r * r;

          if (d2 < r2) {
            const normal = this.vector1
              .subVectors(s1.collider.center, s2.collider.center)
              .normalize();
            const v1 = this.vector2
              .copy(normal)
              .multiplyScalar(normal.dot(s1.velocity));
            const v2 = this.vector3
              .copy(normal)
              .multiplyScalar(normal.dot(s2.velocity));

            s1.velocity.add(v2).sub(v1);
            s2.velocity.add(v1).sub(v2);

            const d = (r - Math.sqrt(d2)) / 2;

            s1.collider.center.addScaledVector(normal, d);
            s2.collider.center.addScaledVector(normal, -d);
          }
        }
      }
    },
    throwBall() {
      const sphere = this.spheres[this.sphereIdx];

      this.camera.getWorldDirection(this.playerDirection);

      sphere.collider.center
        .copy(this.playerCollider.end)
        .addScaledVector(
          this.playerDirection,
          this.playerCollider.radius * 1.5
        );

      // throw the ball with more force if we hold the button longer, and if we move forward

      // const impulse =
      //   15 + 30 * (1 - Math.exp((mouseTime - performance.now()) * 0.001));

      // sphere.velocity.copy(playerDirection).multiplyScalar(impulse);
      sphere.velocity.copy(this.playerDirection).multiplyScalar(30);
      sphere.velocity.addScaledVector(this.playerVelocity, 2);

      this.sphereIdx = (this.sphereIdx + 1) % this.spheres.length;
    },
    updatePlayer(deltaTime) {
      // 更新人位置
      let damping = Math.exp(-4 * deltaTime) - 1;

      if (!this.playerOnFloor) {
        this.playerVelocity.y -= this.GRAVITY * deltaTime;

        // small air resistance
        damping *= 0.1;
      }

      // Vector3.addScaledVector ( v : Vector3, s : Float ) : this将所传入的v与s相乘所得的乘积和这个向量相加。
      this.playerVelocity.addScaledVector(this.playerVelocity, damping);

      const deltaPosition = this.playerVelocity
        .clone()
        .multiplyScalar(deltaTime);
      this.playerCollider.translate(deltaPosition);

      this.playerCollisions();

      this.camera.position.copy(this.playerCollider.end);
    },
    updateSpheres(deltaTime) {
      // 更新球位置
      this.spheres.forEach((sphere) => {
        // console.log(111);
        sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);

        const result = this.worldOctree.sphereIntersect(sphere.collider);

        if (result) {
          sphere.velocity.addScaledVector(
            result.normal,
            -result.normal.dot(sphere.velocity) * 1.5
          );
          sphere.collider.center.add(
            result.normal.multiplyScalar(result.depth)
          );
        } else {
          sphere.velocity.y -= this.GRAVITY * deltaTime;
        }

        const damping = Math.exp(-1.5 * deltaTime) - 1;
        sphere.velocity.addScaledVector(sphere.velocity, damping);

        // playerSphereCollision(sphere);
      });

      // this.spheresCollisions();

      for (const sphere of this.spheres) {
        sphere.mesh.position.copy(sphere.collider.center);
      }
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
      for (let i = 0; i < this.STEPS_PER_FRAME; i++) {
        this.handleKeyDownCauseMove(deltaTime);
        this.updatePlayer(deltaTime);
        // this.updateSpheres(deltaTime);
        // teleportPlayerIfOob();
      }

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
    handleMouseAndKeyAction() {
      this.$refs.three_demo.addEventListener("mousedown", () => {
        document.body.requestPointerLock();
        // console.log(1111);
        // mouseTime = performance.now();
      });
      document.addEventListener("mouseup", () => {
        // if (document.pointerLockElement !== null) this.throwBall();
      });
      document.body.addEventListener("mousemove", (event) => {
        /**
         * 建议使用原生的监控事件，因为document.body.requestPointerLock() 用于锁定鼠标光标，
         * 并将其限制在全屏元素内，这样其他 DOM 元素就无法监听到鼠标移动事件。在 Pointer Lock 模式下，
         * 鼠标移动事件不再传递给常规的鼠标事件监听器。
         */
        if (document.pointerLockElement === document.body) {
          this.camera.rotation.y -= event.movementX / 500;
          this.camera.rotation.x -= event.movementY / 500;
        }
      });
      document.addEventListener("keydown", (event) => {
        if (document.pointerLockElement === document.body) {
          this.keyStates[event.code] = true;
        }
      });
      document.addEventListener("keyup", (event) => {
        if (document.pointerLockElement === document.body) {
          this.keyStates[event.code] = false;
        }
      });
    },
  },
  mounted() {
    this.getWidthHeight();
    this.init();
    this.animate();
    this.handleMouseAndKeyAction();
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
};
</script>

<style>
</style>