<template>
  <div class="son_fit_father pageOne">
    <sphere class="sphere" :diameter="200"></sphere>
  </div>
</template>

<script>
import sphere from "./sphere.vue";
export default {
  components: {
    sphere,
  },
};
</script>

<style scoped>
.pageOne {
  background: #000726;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sphere {
  transform: rotateX(30deg) rotateZ(15deg);
  transform-style: preserve-3d;
}
</style>