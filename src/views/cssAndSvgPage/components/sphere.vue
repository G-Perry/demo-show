<template>
  <div class="wrap" :style="'width:'+diameter+'px;'+'height:'+diameter+'px;'">
    <div class="J">
      <!-- 经线 -->
      <div class="J0" style="transform: rotateY(0deg);"></div>
      <div class="J15" style="transform: rotateY(15deg);"></div>
      <div class="J30" style="transform: rotateY(30deg);"></div>
      <div class="J45" style="transform: rotateY(45deg);"></div>
      <div class="J60" style="transform: rotateY(60deg);"></div>
      <div class="J75" style="transform: rotateY(75deg);"></div>
      <div class="J90" style="transform: rotateY(90deg);"></div>
      <div class="J105" style="transform: rotateY(105deg);"></div>
      <div class="J120" style="transform: rotateY(120deg);"></div>
      <div class="J135" style="transform: rotateY(135deg);"></div>
      <div class="J150" style="transform: rotateY(150deg);"></div>
      <div class="J165" style="transform: rotateY(165deg);"></div>
      <!-- 纬线 -->
      <div class="W"></div>
      <div
        class="W30"
        :style="'width:'+W30_diameter+';height:'+W30_diameter+';top:'+W30_top+';left:'+W30_top+';transform: rotateX(90deg) translateZ('+W30_height+'px);'"
      ></div>
      <div class="W60" :style="'transform: rotateX(90deg) translateZ('+W60_height+'px)'"></div>
      <div
        class="W-30"
        :style="'width:'+W30_diameter+';height:'+W30_diameter+';top:'+W30_top+';left:'+W30_top+';transform: rotateX(90deg) translateZ(-'+W30_height+'px);'"
      ></div>
      <div class="W-60" :style="'transform: rotateX(90deg) translateZ(-'+W60_height+'px)'"></div>
    </div>
  </div>
</template>
    
    <script>
export default {
  props: ["diameter"],
  data() {
    // 比例(根号3 / 2),用于计算30°、60°纬线的直径和translateZ属性
    let proportion = (Math.sqrt(3) / 2) * 100; //86.60254037844386
    return {
      W30_diameter: proportion + "%",
      W30_height: this.diameter / 4,
      W30_top: (100 - proportion) / 2 + "%",
      W60_height: (this.diameter / 200) * proportion,
    };
  },
  mounted() {},
};
</script>
    
    <style scoped>
.wrap {
  position: relative;
  box-sizing: border-box;
  /* transform: rotateX(90deg); */
}
.J,
.W {
  /* width: 200px;
      height: 200px; */
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.J {
  position: relative;
  /* border: 1px solid #056ef4; */
  transform-style: preserve-3d;
  animation: mymove 10s linear infinite;
  /* transform: rotateX(30deg) rotateZ(15deg); */
}

.J0,
.J15,
.J30,
.J45,
.J60,
.J75,
.J90,
.J105,
.J120,
.J135,
.J150,
.J165 {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  top: 0;
  left: 0;
  border: 1px solid #056ef4;
}

/* .J15 {
      transform: rotateY(15deg);
    }
    .J30 {
      transform: rotateY(30deg);
    }
    .J45 {
      transform: rotateY(45deg);
    }
    .J60 {
      transform: rotateY(60deg);
    }
    .J75 {
      transform: rotateY(75deg);
    }
    .J90 {
      transform: rotateY(90deg);
    }
    .J105 {
      transform: rotateY(105deg);
    }
    .J120 {
      transform: rotateY(120deg);
    }
    .J135 {
      transform: rotateY(135deg);
    }
    .J150 {
      transform: rotateY(150deg);
    }
    .J165 {
      transform: rotateY(165deg);
    } */
.W {
  top: 0;
  left: 0;
  border: 1px solid #0099ff;
  transform: rotateX(90deg);
}
.W30 {
  position: absolute;
  /* width: 86.6%;
      height: 86.6%; */
  border-radius: 50%;
  /* top: 6.7%;
      left: 6.7%; */
  border: 1px solid #056ef4;
  /* transform: rotateX(90deg) translateZ(50px); */
}
.W60 {
  position: absolute;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  top: 25%;
  left: 25%;
  border: 1px solid #056ef4;
  /* transform: rotateX(90deg) translateZ(86.6px); */
}
.W-30 {
  position: absolute;
  /* width: 86.6%;
      height: 86.6%; */
  border-radius: 50%;
  /* top: 6.7%;
      left: 6.7%; */
  border: 1px solid #056ef4;
  /* transform: rotateX(90deg) translateZ(-50px); */
}
.W-60 {
  position: absolute;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  top: 25%;
  left: 25%;
  border: 1px solid #056ef4;
  /* transform: rotateX(90deg) translateZ(-86.6px); */
}
.J div {
  box-shadow: 0 0 12px rgba(31, 107, 234, 0.4);
}
@keyframes mymove {
  from {
    /* transform: rotateX(30deg) rotateZ(15deg) rotateY(0deg); */
    transform: rotateY(0deg);
  }
  to {
    /* transform: rotateX(30deg) rotateZ(15deg) rotateY(360deg); */
    transform: rotateY(360deg);
  }
}
</style>