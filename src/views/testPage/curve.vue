<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  mounted() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let width = (canvas.width = this.$parent.$el.offsetWidth);
    let height = (canvas.height = this.$parent.$el.offsetHeight / 2);
    //声明参数
    let A = 50; // 振幅
    let W = 1 / 120; // 频率
    let Q = 0; // 相位
    let H = (height * 3) / 4 +15; // 高度
    let speed = -0.009; // 速度
    //绘图方法
    (function draw() {
      window.requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height); //清空画布
      ctx.beginPath(); //开始路径
      ctx.fillStyle = "#01aecd"; //设置线条颜色
      ctx.lineWidth = 1; //设置线条宽度
      ctx.moveTo(0, H);
      Q += speed;
      for (let x = 0; x <= width; x += 8) {
        // 绘制x对应y的   y=Asin（wx+φ）+h
        let y = A * Math.sin(W * x + Q);
        ctx.fillRect(x, y + H, 2, 3);
        ctx.fillRect(x, -y + H, 2, 3);
        ctx.fillRect(x, H, 2, 3);
      }
    })();
  },
};
</script>

<style>
</style>