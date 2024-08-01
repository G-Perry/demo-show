<template>
  <section class="shoppingMall">
    <shop-header></shop-header>
    <!-- <goods-details-top></goods-details-top>
    <goods-details-pics></goods-details-pics> -->
    <section class="classify_selections">
      <div class="label_selection">
        <span>类别：</span>
        <div class="selections">
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
          <div class="selection_item">XXXXX</div>
        </div>
      </div>
      <div class="label_selection">
        <span>积分价格：</span>
        <div class="selections">
          <div class="selection_item">全部</div>
          <div class="selection_item">0 - 10</div>
          <div class="selection_item">10 - 20</div>
          <div class="selection_item">20 - 40</div>
          <div class="selection_item">40 - 100</div>
          <div class="selection_item">100 以上</div>
        </div>
      </div>
    </section>
    <section class="goods_items">
      <div class="good_item" v-for="i in 50" :key="i" @click="pageToDetails">
        <div class="pic"></div>
        <div class="desc">
          <span>fsdfsdfsdfsdfs</span>
          <div class="desc_bottom">
            <span>9积分</span>
            <span>8人兑换</span>
          </div>
        </div>
      </div>
    </section>
    <section class="footer_pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </section>
  </section>
</template>
  
  
<script>
import shopHeader from "./components/shopHeader.vue";
// import goodsDetailsTop from "./components/goodsDetailsTop.vue";
// import goodsDetailsPics from "./components/goodsDetailsPics.vue";
export default {
  components: {
    shopHeader,
    // goodsDetailsTop,
    // goodsDetailsPics
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    pageToDetails() {
      this.$router.push({
        name: "goodsDetails",
      });
    },
  },
};
</script>

<style scoped>
.goods_items {
  width: 1200px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  flex: 1;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
}
.good_item {
  height: 300px;
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
.classify_selections {
  margin-top: 10px;
}
.label_selection {
  width: 1200px;
  min-height: 50px;
  margin: 0 auto;
  display: flex;
}
.label_selection > span {
  display: inline-block;
  width: 120px;
  line-height: 50px;
  color: #9e9e9e;
  font-size: 16px;
  padding-left: 10px;
}
.label_selection > .selections {
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.selection_item {
  width: fit-content;
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
  /* border-width: 1px; */
  border: 1px solid transparent;
}
.selection_item:hover {
  background: #fef1e7;
  border-color: #ff7514;
  border-radius: 5px;
}
.footer_pagination {
  width: 1200px;
  height: 50px;
  margin: 0 auto;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 100;
}
</style>

