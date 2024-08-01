<template>
  <section class="shoppingMall">
    <shop-header></shop-header>
    <shop-suggest></shop-suggest>
    <shop-goods></shop-goods>
    <shop-goods></shop-goods>
    <shop-goods></shop-goods>
    <shop-goods></shop-goods>
  </section>
</template>

<script>
import shopHeader from "./components/shopHeader.vue";
import shopSuggest from "./components/shopSuggest.vue";
import shopGoods from "./components/shopGoods.vue";
export default {
  components: { shopHeader, shopSuggest, shopGoods },
};
</script>

<style scoped>
/* .shoppingMall {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 0 20px;
} */
</style>
<style>
/* .section_title {
  display: inline-block;
  font-size: 24px;
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
}
.section_title::before {
  content: "";
  display: inline-block;
  height: 100%;
  width: 3px;
  margin-right: 8px;
  background: #5d8efc;
} */
</style>