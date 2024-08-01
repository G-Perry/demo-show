<template>
  <section class="goods_show">
    <!-- 原始图 -->
    <div class="original_pic">
      <img :src="img_src" style="width: 500px; height: 500px" alt="" />
      <div
        class="preview_bar"
        :style="`display:${preview_bar_display};top:${preview_bar_y}px;left:${preview_bar_x}px`"
      ></div>
      <div
        class="mask"
        @mousemove="handleMouseMove"
        @mouseout="handleMouseOut"
      ></div>
    </div>
    <!-- 预览大图 -->
    <div class="preview_pic" :style="`display:${preview_bar_display};`">
      <img
        :src="img_src"
        alt=""
        class="preview_img"
        :style="`
                  top:-${preview_bar_y * 1.67}px;
                  left:-${preview_bar_x * 1.67}px
                  `"
      />
    </div>
    <!-- 小图列表 -->
    <div class="pic_list">
      <img
        class="small_pic"
        v-for="i in 16"
        :key="i"
        :src="require(`@/assets/images/shoppingMall/${i}.avif`)"
        alt=""
        @mouseover="handlePicClick(i)"
      />
    </div>
    <!-- 右侧描述 -->
    <section class="goods_info_wrap">
      <div class="sku-name">
        几何未来（GeometricFuture）M4 亚瑟王 电脑机箱
        白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）
      </div>
      <div class="goods_price">
        <span>积分：</span>
        <span style="font-size: 18px; color: #fa3e93">800</span>
        <span style="margin-left: 5px">积分</span>
        <span style="margin-left: 10px">2人已兑换</span>
      </div>
      <div class="goods_num">
        <span>数量：</span>
        <el-input-number v-model="num" :min="1" :max="10"></el-input-number>
      </div>
      <div class="goods_num">
        <span>配送至：</span>
        <el-button type="primary" size="small">添加收货地址</el-button>
      </div>
      <div class="goods_btns">
        <el-button type="info" style="width: 120px">加入购物车</el-button>
        <el-button type="info" style="width: 120px">立即兑换</el-button>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      preview_bar_display: "none",
      preview_bar_x: 0,
      preview_bar_y: 0,
      img_src: require("@/assets/images/shoppingMall/1.avif"),
      num: 1,
    };
  },
  methods: {
    handleMouseMove(e) {
      this.preview_bar_display = "block";
      let x = e.layerX - 100;
      let y = e.layerY - 100;
      x < 0 && (x = 0);
      x > 300 && (x = 300);
      y < 0 && (y = 0);
      y > 300 && (y = 300);
      this.preview_bar_x = x;
      this.preview_bar_y = y;
    },
    handleMouseOut() {
      this.preview_bar_display = "none";
    },
    handlePicClick(i) {
      this.img_src = require(`@/assets/images/shoppingMall/${i}.avif`);
    },
  },
};
</script>

<style scoped>
.goods_show {
  width: 1300px;
  height: 560px;
  margin: 0px auto;
  display: flex;
  gap: 20px;
  position: relative;
  margin-top: 20px;
}
.original_pic {
  width: 500px;
  height: 500px;
  border: 1px solid #eee;
  box-sizing: content-box;
  position: relative;
}
.preview_bar {
  width: 200px;
  height: 200px;
  background: #6969694d;
  position: absolute;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: move;
}
.preview_pic {
  width: 500px;
  height: 500px;
  border: 1px solid #eee;
  box-sizing: content-box;

  position: absolute;
  left: 520px;
  overflow: hidden;
  z-index: 10;
}
.preview_img {
  width: 500px;
  height: 500px;
  transform-origin: 0 0;
  transform: scale(2);
  position: absolute;
}
.pic_list {
  width: 120px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow: auto;
}
.small_pic {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.goods_info_wrap {
  flex: 1;
}
.sku-name {
  font: 700 16px Arial, "microsoft yahei";
  color: #666;
  padding-top: 10px;
  line-height: 28px;
  margin-bottom: 5px;
}
.goods_price {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #9b9b9b;
  height: 30px;
  line-height: 30px;
  margin-top: 36px;
}
.goods_num {
  margin-top: 36px;
}
.goods_btns {
  margin-top: 150px;
}
::v-deep .el-input__inner {
  height: 40px;
  line-height: 40px;
}
</style>