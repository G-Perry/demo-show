<template>
  <div class="son_fit_father" style="position: relative;">
    <div class="video-bg">
      <!-- <video loop muted autoplay playsinline preload="auto">
        <source src="../../assets/video/bgVideo.mp4" type="video/mp4" />Your browser does not support the video tag.
      </video> -->
    </div>
    <div class="main_content son_fit_father">
      <section class="top_nav">
        <div
          class="nav_item"
          v-for="(item, index) in option_select"
          :key="item.label"
          @click="handleOptionClick(item,index)"
          :class="{ active: item ? item.isActive : false }"
        >{{ item.label }}</div>
      </section>
      <section v-if="option_select[0].isActive" class="son_fit">
        <page-one></page-one>
      </section>
      <section v-if="option_select[1].isActive" class="son_fit">
        <page-two></page-two>
      </section>
      <section v-if="option_select[2].isActive" class="son_fit">
        <page-three ref="pageThree"></page-three>
      </section>
      <section v-if="option_select[3].isActive" class="son_fit">
        <page-four ref="pageFour" :innerStarMsgs="innerStarMsgs" :outterStarMsgs="outterStarMsgs"></page-four>
      </section>
      <section v-if="option_select[4].isActive" class="son_fit">
        <page-five></page-five>
      </section>
      <section v-if="option_select[5].isActive" class="son_fit">
        <page-six></page-six>
      </section>
      <section v-if="option_select[6].isActive" class="son_fit">
        <page-seven></page-seven>
      </section>
      <section v-if="option_select[7].isActive" class="son_fit">
        <page-eight></page-eight>
      </section>
    </div> 
  </div>
</template>

<script>
import pageOne from "./components/pageOne.vue";
import pageTwo from "./components/pageTwo.vue";
import pageThree from "./components/pageThree.vue";
import pageFour from "./components/pageFour.vue";
import pageFive from "./components/pageFive.vue";
import pageSix from "./components/pageSix.vue";
import pageSeven from "./components/pageSeven.vue";
import pageEight from "./components/pageEight.vue";
export default {
  components: {
    pageOne,
    pageTwo,
    pageThree,
    pageFour,
    pageFive,
    pageSix,
    pageSeven,
    pageEight,
  },
  data() {
    return {
      option_select: [],
      innerStarMsgs: [],
      outterStarMsgs: [],
      // isPc: !window.matchMedia("(pointer: coarse)").matches,
    };
  },
  methods: {
    resetOptionSelectBeforeMount() {
      this.option_select = [
        {
          label: "CSS 3D Sphere",
          isActive: true,
        },
        {
          label: "SVG IMITATE 3D",
          isActive: false,
        },
        {
          label: "SVG + Sphere",
          isActive: false,
        },
        {
          label: "Sphere System",
          isActive: false,
        },
        {
          label: "SVG Connector",
          isActive: false,
        },
        {
          label: "SVG 拓扑图 1",
          isActive: false,
        },
        {
          label: "SVG 拓扑图 2",
          isActive: false,
        },
        {
          label: "Word Cloud",
          isActive: false,
        },
      ];
    },
    handleOptionClick(item, index) {
      this.option_select.forEach((item) => (item.isActive = false));
      this.option_select[index].isActive = true;
      switch (item.label) {
        case "SVG + Sphere":
          setTimeout(() => {
            this.$refs.pageThree.init([
              { deptId: 1, deptName: "XXX-1" },
              { deptId: 2, deptName: "XXX-2" },
              { deptId: 3, deptName: "XXX-3" },
              { deptId: 4, deptName: "XXX-4" },
              { deptId: 5, deptName: "XXX-5" },
              { deptId: 6, deptName: "XXX-6" },
              { deptId: 7, deptName: "XXX-7" },
              { deptId: 8, deptName: "XXX-8" },
            ]);
          }, 0);
          break;
        case "Sphere System":
          this.innerStarMsgs = [
            {
              name: "内-1",
              value: 22,
            },
            {
              name: "内-2",
              value: 33,
            },
            {
              name: "内-3",
              value: 44,
            },
            {
              name: "内-4",
              value: 33,
            },
            {
              name: "内-5",
              value: 44,
            },
          ];
          this.outterStarMsgs = [
            {
              name: "外-1",
              value: 55,
            },
            {
              name: "外-2",
              value: 66,
            },
            {
              name: "外-3",
              value: 77,
            },
            {
              name: "外-4",
              value: 55,
            },
            {
              name: "外-5",
              value: 66,
            },
            {
              name: "外-6",
              value: 77,
            },
          ];
          break;
        default:
          break;
      }
    },
    // 解决 移动端打开页面时，背景视频会跳出来播放
    // handleVideoPlayWhenMobileMounted() {
    //   if (!window.matchMedia("(pointer: coarse)").matches) {
    //     this.$refs.bgVideo.play();
    //   }
    // },
  },
  beforeMount() {
    this.resetOptionSelectBeforeMount();
  },
  mounted() {
    // console.log(window.matchMedia("(pointer: coarse)").matches);
  },
};
</script>

<style scoped>
.video-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: url("../../assets/images/bg.gif") no-repeat;
  background-size: 100% 100%;
}
/* .video-bg > video {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
.main_content {
  width: 100%;
  height: 100%;
  z-index: 1;
  backdrop-filter: blur(50px);
}
.top_nav {
  width: 100%;
  height: 36px;
  border-bottom: 1px solid #7e7d7d;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav_item {
  width: fit-content;
  height: 38px;
  line-height: 38px;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 0 10px;
  font-size: 14px;
  color: #b6b2b2;
  cursor: pointer;
  /* 禁止用户选择文本 */
  user-select: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}
.nav_item:hover,
.nav_item.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}
</style>