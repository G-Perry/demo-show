<template>
  <section class="top_header">
    <section class="logo_selection">
      <div class="search_cart">
        <el-input v-model="input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="pageToCart" style="color: #189dff; border-radius: 0">
          <i class="el-icon-shopping-cart-1"></i>
          <span>我的购物车</span>
        </el-button>
      </div>
      <div class="selections">
        <div class="selectionOne" :class="activeIndex == 0 ? 'active' : ''">
          全部类别
        </div>
        <div
          class="selectionTwo"
          :class="activeIndex == 1 ? 'active' : ''"
          @click="pageToMall"
        >
          我能兑换
        </div>
        <div
          class="selectionThree"
          :class="activeIndex == 2 ? 'active' : ''"
          @click="pageToOrder"
        >
          订单中心
        </div>
        <!-- <section class="aaa"> -->
        <section class="options">
          <div
            class="option_item"
            v-for="i in 8"
            :key="i"
            @click="pageToGoodsList"
          >
            <span>XXXX</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </section>
        <section class="more_option"></section>
        <!-- </section> -->
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      // activeIndex: 0,
    };
  },
  computed: {
    activeIndex() {
      return this.$store.state.shoppingMall.topActiveIndex;
    },
  },
  methods: {
    // handleAllTypeClick() {
    //   this.$store.dispatch("changeActiveIndex", 0);
    // },
    pageToMall() {
      this.$store.dispatch("changeActiveIndex", 1);
      this.$router.push({
        name: "shoppingMall",
      });
    },
    pageToOrder() {
      this.$store.dispatch("changeActiveIndex", 2);
      this.$router.push({
        name: "shoppingOrder",
      });
    },
    pageToCart() {
      this.$store.dispatch("changeActiveIndex", 0);
      this.$router.push({
        name: "shoppingCart",
      });
    },
    pageToGoodsList() {
      this.$store.dispatch("changeActiveIndex", 0);
      this.$router.push({
        name: "goodsList",
      });
    },
  },
  created() {
    // console.log(this,222);
    this.$store.dispatch("initActiveIndex", this.$route.name);
  },
};
</script>

<style scoped>
@media screen and (max-height: 910px) {
  .top_header {
    position: relative;
    top: 0;
  }
}
.top_header {
  width: 100%;
  /* height: 74px; */
  border-bottom: 3px solid #189dff;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}
.logo_selection {
  width: 1200px;
  margin: 0 auto;
}
.selections {
  /* flex: 5; */
  display: flex;
  align-items: center;
  position: relative;
}
.selectionOne {
  width: 200px !important;
  position: relative;
}
.selections > div {
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.selections > div:hover {
  color: #189dff;
}
.selections > div.active {
  background: #189dff;
  color: #fff;
}
.search_cart {
  width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 200px;
  padding-right: 20px;
  box-sizing: border-box;
}
::v-deep .el-input__inner,
::v-deep .el-input-group__append {
  border-radius: 0;
  border-width: 2px;
  border-color: #189dff;
}
::v-deep .el-input-group__append {
  background: #189dff;
  color: #fff;
  font-size: 16px;
}
.options {
  position: absolute;
  top: 50px;
  width: 200px;
  height: 0px;
  overflow: hidden;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 36px;
  /* padding: 8px 0;
  box-sizing: content-box; */
  transition: height 0.3s;
}
.selections:has(> .selectionOne:hover) > .options,
.selections:has(> .more_option:hover) > .options,
.selections:has(> .options:hover) > .options {
  height: 450px;
}

.option_item {
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.option_item > span,
.option_item > i {
  font-size: 14px;
  color: #7e7e7e;
}
.option_item:hover > span,
.option_item:hover > i {
  color: #000;
}
.more_option {
  position: absolute;
  top: 50px;
  left: 200px;
  width: 0px;
  height: 450px;
  overflow: hidden;
  background: #fff;
  transition: width 0.5s;
  box-shadow: rgba(0, 0, 0, 0.1) 10px 0px 20px 0px;
}
.options:has(> .option_item:hover) + .more_option,
.selections:has(> .more_option:hover) > .more_option {
  width: 1000px;
}
::v-deep .el-input__inner {
  height: 40px;
  line-height: 40px;
}
</style>