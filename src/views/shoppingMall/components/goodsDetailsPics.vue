<template>
  <section class="info_pics_show">
    <img
      class="info_pic"
      v-for="i in 11"
      :key="i"
      :src="require(`@/assets/images/shoppingMall/a${i}.jpg`)"
      alt=""
    />
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.info_pics_show {
  width: 1200px;
  margin: 0px auto;
}
.info_pic {
  width: 100%;
}
img + img {
  margin-top: -4px;
}
</style>