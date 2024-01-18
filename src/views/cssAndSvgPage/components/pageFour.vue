<template>
  <div class="son_fit_father position_relative" style="overflow:hidden">
    <div id="threeD_Box111" class="full_content position_absolute">
      <div class="full_content flex_x_y_center star_circle_star position_relative">
        <sphere class="centerStar" :diameter="120"></sphere>
        <div class="innerCircle"></div>
        <div class="outerCircle"></div>
        <div
          class="full_content flex_x_y_center star_circle_star circle_animation position_absolute"
        >
          <sphere
            class="innerCircleStar"
            :diameter="50"
            v-for="item in innerStarMsgs"
            :key="item.name + item.value"
          ></sphere>
          <!-- <sphere class="innerCircleStar" :diameter="50"></sphere>
          <sphere class="innerCircleStar" :diameter="50"></sphere>-->
        </div>
        <div
          class="full_content flex_x_y_center star_circle_star faster_circle_animation position_absolute"
        >
          <sphere
            class="outerCircleStar"
            :diameter="30"
            v-for="item in outterStarMsgs"
            :key="item.name + item.value"
          ></sphere>
          <!-- <sphere class="outerCircleStar" :diameter="30"></sphere>
          <sphere class="outerCircleStar" :diameter="30"></sphere>-->
        </div>
      </div>
    </div>
    <div class="full_content position_absolute">
      <div class="full_content position_relative">
        <span
          class="aaa"
          v-for="item in innerStarMsgs"
          :key="item.name"
          style="position: absolute;color:#fff;font-size: 12px;"
        >{{item.name+':'+item.value}}</span>
        <span
          class="bbb"
          v-for="item in outterStarMsgs"
          :key="item.name"
          style="position: absolute;color:#fff;font-size: 12px;"
        >{{item.name+':'+item.value}}</span>
      </div>
    </div>
  </div>
</template>
  
  <script>
import sphere from "./sphere.vue";
export default {
  props: ["innerStarMsgs", "outterStarMsgs"],
  components: {
    sphere,
  },
  data() {
    return {
      animationStop: false,
    };
  },
  methods: {
    // 设置threeD_Box下子元素的随机位置（平移方式，但连线实现困难）
    setStarsPosition(className, size) {
      let circleStar = document.querySelectorAll(className);
      let conut = circleStar.length;
      let divideDeg = 360 / conut;
      let divideSize = size;
      //   let lines = [];
      for (let i = 0; i < circleStar.length; i++) {
        let deg = divideDeg * i;
        let x, y, z;
        x = Math.floor(divideSize * Math.sin((deg * Math.PI) / 180));
        y = Math.floor(divideSize * Math.cos((deg * Math.PI) / 180));
        z = 0;
        circleStar[i].style.transform =
          "translate3d(" + x + "px," + y + "px," + z + "px) rotateX(90deg)";
        circleStar[i].ondragstart = function () {
          return false;
        };
      }
    },
    handleMouseover() {
      this.animationStop = true;
    },
    handleMouseout() {
      this.animationStop = false;
    },
    handleClick() {
      let innerCircleStar = document.querySelectorAll(".innerCircleStar");
      let outerCircleStar = document.querySelectorAll(".outerCircleStar");
      let aaa = document.querySelectorAll(".aaa");
      let bbb = document.querySelectorAll(".bbb");
      let position = {};
      innerCircleStar.forEach((item, index) => {
        position = item.getBoundingClientRect();
        aaa[index].style.left = position.x - 220 + "px";
        aaa[index].style.top = position.y - 40 + "px";
      });
      outerCircleStar.forEach((item, index) => {
        position = item.getBoundingClientRect();
        bbb[index].style.left = position.x - 220 + "px";
        bbb[index].style.top = position.y - 60 + "px";
      });
    },
  },
  mounted() {
    this.setStarsPosition(".innerCircleStar", 275);
    this.setStarsPosition(".outerCircleStar", 500);
    this.$nextTick(() => {
      setInterval(this.handleClick, 10);
    });
  },
};
</script>
  
<style scoped>
.full_content {
  width: 100%;
  height: 100%;
}
.flex_x_y_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fff {
  color: #fff;
}
.position_relative {
  position: relative;
}
.position_absolute {
  position: absolute;
}
.innerCircle {
  position: absolute;
  width: 550px;
  height: 550px;
  border: 1px solid #35e7ffb4;
  border-radius: 50%;
}
.outerCircle {
  position: absolute;
  width: 1000px;
  height: 1000px;
  border: 1px solid #35e7ffb4;
  border-radius: 50%;
}
.innerCircleStar,
.outerCircleStar,
.centerStar {
  position: absolute;
  transform-style: preserve-3d;
  cursor: pointer;
}
.centerStar {
  transform: rotateX(90deg);
}
#threeD_Box111 {
  transform-style: preserve-3d;
  transform: rotateX(-65deg);
}
.star_circle_star {
  transform-style: preserve-3d;
}
/* .animation_stop:hover { */
/* animation-play-state: paused;  */
/* 暂停动画 */
/* } */
.circle_animation {
  animation: mymove 40s linear infinite;
}
.faster_circle_animation {
  animation: mymove 30s linear infinite;
}
@keyframes mymove {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}
</style>