<template>
  <section class="shoppingMall">
    <shop-header></shop-header>
    <goods-details-top></goods-details-top>
    <goods-details-pics></goods-details-pics>
  </section>
</template>


<script>
import shopHeader from "./components/shopHeader.vue";
import goodsDetailsTop from "./components/goodsDetailsTop.vue";
import goodsDetailsPics from "./components/goodsDetailsPics.vue";
export default {
  components: { shopHeader, goodsDetailsTop, goodsDetailsPics },
};
</script>

<style scoped>
</style>