<template>
  <div class="son_fit_father">
    <div class="grid-container">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>
      <div class="grid-item">7</div>
      <div class="grid-item">8</div>
      <div class="grid-item">9</div>
      <!-- <div class="grid-item" v-for="item in aaa" :key="item.name">
        <span>{{ item.name }}</span>
        <i :class="`icon-${item.icon}`"></i>
        <span></span>
      </div>-->
    </div>
  </div>
</template>

<script>
import { eight_Diagrams_details } from "./metaphysicsDatas";
export default {
  data() {
    return {
      aaa: [],
    };
  },
  beforeMount() {
    this.aaa = eight_Diagrams_details;
  },
  mounted() {},
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 300px;
  height: 300px;
  border: 1px solid #333;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border: 1px solid #333;
}
</style>