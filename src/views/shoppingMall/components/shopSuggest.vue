<template>
  <section class="navigation">
    <!-- <div class="selections">
      <div
        class="selections_item"
        v-for="i in 8"
        :key="i"
        @click="pageToGoodsList"
      >
        <span>XXXX</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div> -->
    <!-- <div class="nav_right">
      <div class="one">wqeqweqweqweqw</div> -->
    <!-- <div class="two"> -->
    <span class="goods_classify_top">热门推荐 </span>
    <div class="recommend_items">
      <div
        class="recommend_item"
        v-for="i in 6"
        :key="i + 17"
        @click="pageToDetails"
      >
        <div class="pic"></div>
        <div class="desc">
          <span>sfsaghgfdshdfg</span>
          <span>2积分</span>
          <span>2人兑换</span>
        </div>
      </div>
      <!-- </div> -->
      <!-- </div> -->
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
.navigation {
  width: 1200px;
  height: 450px;
  margin: 0px auto;
  /* background: #bfa; */
  display: flex;
  flex-direction: column;
}
.selections {
  width: 200px;
  height: 100%;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 36px;
  padding: 8px 0;
  box-sizing: border-box;
}
.selections_item {
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.selections_item > span {
  font-size: 14px;
  color: #7e7e7e;
}
.selections_item:hover > span {
  color: #000;
}
.nav_right {
  flex: 1;
  /* background: red; */
  position: relative;
  display: grid;
  grid-template-columns: 0fr;
  transition: grid-template-columns 0.3s;
}
/* .selections:hover + .nav_right { */

.selections:has(> .selections_item:hover) + .nav_right {
  grid-template-columns: 1fr;
}
.nav_right > .one {
  background: #fff;
  z-index: 1;
  /* box-shadow: 10px -10px 36px 10px rgba(0, 0, 0, 0.1); */
  box-shadow: rgba(0, 0, 0, 0.1) 10px 0px 20px 0px;
}
/* .one:hover{
  width: 100%;
  } */
.nav_right:has(> .one:hover) {
  grid-template-columns: 1fr;
}
.nav_right > .two {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  box-sizing: border-box;
  padding: 10px 10px 0;
  display: flex;
  flex-direction: column;
}

.recommend_items {
  padding: 10px;
  flex: 1;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
.recommend_item {
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px inset;
}
.recommend_item:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 15px;
}
.recommend_item > .pic {
  width: 120px;
  height: 120px;
  background: #bfa;
  margin-left: 15px;
}
.recommend_item > .desc {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recommend_item > .desc > span {
  font-size: 12px;
  color: #9b9b9b;
  margin-bottom: 5px;
}
.recommend_item > .desc > span:nth-child(1) {
  font-size: 18px;
  color: #000;
  margin-bottom: 15px;
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
</style>