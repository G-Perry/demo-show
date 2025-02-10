<template>
  <div class="aaaaa" @scroll="aaaaa" ref="aaaaa">
    <div style="width: 100%;height: 2000px;"></div>
    <button class="bbbbb" v-if="btnIsShow" @click="bbbbb">111</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnIsShow: false
    }
  },
  methods: {
    aaaaa(e) {
      if (e.target.scrollTop > 0) {
        this.btnIsShow = true
      } else if (e.target.scrollTop < 10) {
        this.btnIsShow = false
      }
    },
    bbbbb() {
      let dom = this.$refs.aaaaa
      dom.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.aaaaa {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.bbbbb {
  position: fixed;
  right: 60px;
  bottom: 50px;
}
</style>