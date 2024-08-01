<template>
  <section class="goods_classify">
    <div class="goods_classify_top">
      <!-- <span class="section_title">XXXXX</span> -->
      XXXXXX
      <span class="goods_more" @click="pageToGoodsList">
        <span> 更多 </span>
        <i class="el-icon-arrow-right"></i>
      </span>
    </div>
    <div class="goods_items">
      <div class="good_item" v-for="i in 8" :key="i" @click="pageToDetails">
        <div class="pic"></div>
        <div class="desc">
          <span>fsdfsdfsdfsdfs</span>
          <div class="desc_bottom">
            <span>9积分</span>
            <span>8人兑换</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    pageToDetails() {
      this.$router.push({
        name: "goodsDetails",
      });
    },
    pageToGoodsList() {
      this.$router.push({
        name: "goodsList",
      });
    },
  },
};
</script>

<style scoped>
.goods_classify {
  width: 1200px;
  height: 750px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
}
.goods_classify_top {
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 24px;
  position: relative;
}
.goods_more {
  position: absolute;
  right: 0;
  /* float: right; */
  font-size: 14px;
  color: #7e7e7e;
  cursor: pointer;
}
/* .goods_items {
  flex: 1;
  display: flex;
} */
.goods_items {
  padding: 10px;
  flex: 1;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
.good_item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px inset;
}
.good_item:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 15px;
}
.good_item > .pic {
  width: 100%;
  height: 75%;
  background: #bfa;
}
.good_item > .desc {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.desc_bottom {
  display: flex;
  gap: 10px;
  font-size: 14px;
  color: #9b9b9b;
}
</style>