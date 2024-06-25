<template>
  <div
    class="son_fit_father"
    style="
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    "
  >
    <div class="flex1">
      <div class="flex_1">
        <section class="resizable"></section>
      </div>
      <div class="aaa"></div>
    </div>
    <div class="flex2">
      <div style="flex: 1;display: flex;overflow-y: auto;">
        <div class="flex_1">
          <section class="resizable"></section>
        </div>
        <div class="aaa"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.flex1 {
  width: 40vw;
  height: 80vh;
  border: 1px dashed red;
  display: flex;
}
.flex2 {
  width: 40vw;
  height: 80vh;
  border: 1px dashed red;
  display: flex;
}
.flex_1 {
  flex: 1;
  background: #abf;
  overflow: auto;
}
.aaa {
  border-left: 1px solid #aaa;
  width: 100px;
  height: 100%;
}
</style>