<template>
  <div class="overview">
    <div class="rippling_water">
      <div class="aaa">
        <div class="ccc bbb">
          <!-- 登录框 -->
        </div>
        <div class="ccc bbb1"></div>
        <div class="ccc bbb2"></div>
        <div class="ccc bbb3"></div>
        <div class="ccc bbb4"></div>
        <div class="ccc bbb5"></div>
        <div class="ccc bbb6"></div>
      </div>
    </div>
    <curve></curve>
    <wave></wave>
  </div>
</template>

<script>
import wave from "./wave.vue";
import curve from "./curve.vue";
export default {
  components: {
    wave,
    curve,
  },
};
</script>

<style scoped>
.overview {
  width: 100%;
  height: 100%;
  background: #000 !important;
  position: relative;
}
.rippling_water {
  position: absolute;
  width: 300px;
  height: 300px;
  color: #fff;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.aaa {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  transform-style: preserve-3d;
  transform: rotateX(65deg);
}
.ccc {
  border-radius: 50%;
  position: absolute;
  margin: auto;
  width: 300px;
  height: 300px;
}
.bbb {
  box-shadow: -1px -1px 10px 10px #01d9ff;
}
.bbb1 {
  animation: circle 6s linear 1s infinite none;
}
.bbb2 {
  animation: circle 6s linear 2s infinite none;
}
.bbb3 {
  animation: circle 6s linear 3s infinite none;
}
.bbb4 {
  animation: circle 6s linear 4s infinite none;
}
.bbb5 {
  animation: circle 6s linear 5s infinite none;
}
.bbb6 {
  animation: circle 6s linear 6s infinite none;
}
@keyframes circle {
  from {
    transform: scale(1);
    box-shadow: 0px 0px 10px 10px #01d9ff;
  }
  to {
    transform: scale(2);
    box-shadow: 0px 0px 1px 1px transparent;
  }
}
</style>