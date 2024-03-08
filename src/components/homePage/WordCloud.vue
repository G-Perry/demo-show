<template>
  <!-- <div class="wordCloud" id="wordCloud" ref="wordCloud">
    <div
      v-for="(item, index) in wordList"
      :key="index"
      :class="(item.asset_num>0 ? 'wordRed' : 'word')"
      :style="item.style ? item.style : ' '"
      @click="handleWordClick(item)"
    >{{ item.event_desc + (item.asset_num >0 ? '('+ item.asset_num +')' : '')}}</div>
    <!~~ <el-button @click="abcd">111</el-button> ~~>
  </div>-->
  <div class="wordCloud" ref="wordCloud">
    <div
      v-for="(item, index) in wordList"
      :ref="index"
      :key="index"
      :class="item.asset_num > 0 ? 'wordRed' : 'word'"
      :style="`top:${item.top}px;left:${item.left}px`"
      @click="handleWordClick(item)"
    >
      {{
      item.event_desc + (item.asset_num > 0 ? "(" + item.asset_num + ")" : "")
      }}
    </div>
    <div
      v-if="words.length==0"
      style="width: 100%;text-align: center;color: #909399;font-size: 14px;"
    >暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    words: {
      type: Array,
      default: () => {
        return [
          { event_desc: "ZLoader银行木马", asset_num: 0 },
          { event_desc: "BuleHero 4.0挖矿摆虫", asset_num: 0 },
          { event_desc: "GravityRAT间谍软件", asset_num: 0 },
          { event_desc: "飞客蠕虫", asset_num: 1 },
          { event_desc: "LoggerMiner挖矿木马", asset_num: 0 },
          { event_desc: "APT32", asset_num: 0 },
          { event_desc: "LazarusAPT", asset_num: 0 },
          { event_desc: "TroubleGrabber恶意软件", asset_num: 10 },
          { event_desc: "systemdMine挖矿病毒", asset_num: 0 },
          { event_desc: "CLOP勒索病毒新变种", asset_num: 0 },
        ];
      },
    },
  },
  watch: {
    words: {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        if (this.words.length >= 0) {
          this.$nextTick(() => {
            this.getWH();
            if (this.outerWidth > 0 && this.outerHeight > 0) {
              this.setWordPosition();
            }
          });
        }
      },
    },
  },
  data() {
    return {
      // wordList: [],
      // wordPosition: []

      // 外部整体的宽高
      outerWidth: 0,
      outerHeight: 0,
      // 单个词条的最大宽度，防止随机后右侧溢出
      elementMaxWidth: 0,
      // 最终用于渲染的词条
      wordList: [],
      // 暂存随机位置
      wordPosition: [],
    };
  },
  methods: {
    // initWordList() {
    //   this.wordList = [];
    //   this.words.forEach((item, index) => {
    //     item.style = this.getStyle(item, index);
    //     this.wordList.push(item);
    //   });
    // },
    // isCollision(arr, position) {
    //   for (let item of arr) {
    //     let top = Math.max(item[0], position[0]); //上
    //     let bottom = Math.min(item[1], position[1]); //下
    //     let left = Math.max(item[2], position[2]); //左
    //     let right = Math.min(item[3], position[3]); //右

    //     if (left <= right && top <= bottom) {
    //       return true;
    //     }
    //   }
    //   return false;
    // },

    // //获取随机位置
    // setPosition(item) {
    //   let wordCloud, width, height, top, bottom, left, right;

    //   // wordCloud = document.getElementById("wordCloud");
    //   wordCloud = this.$refs.wordCloud;
    //   width = wordCloud.clientWidth * 0.7;
    //   height = wordCloud.clientHeight * 0.8;
    //   top = Math.floor(Math.random() * height + 1);
    //   bottom = top + (item.asset_num > 0 ? 40 : 30);
    //   left = Math.floor(Math.random() * width + 1);
    //   right = left + item.event_desc.length * 14;

    //   return [top, bottom, left, right];
    // },

    // getStyle(item, index) {
    //   let count = 0;
    //   let position, res;
    //   position = this.setPosition(item);
    //   if (index == 0) {
    //     this.wordPosition.push(position);
    //   }
    //   while (index > 0) {
    //     count++;
    //     if (this.isCollision(this.wordPosition, position)) {
    //       position = this.setPosition(item);
    //       if (count > 80) {
    //         // console.log(count);
    //         this.wordPosition.push(position);
    //         break;
    //       }
    //     } else {
    //       this.wordPosition.push(position);
    //       break;
    //     }
    //   }
    //   res = " top:" + position[0] + "px;left:" + position[2] + "px;";
    //   return res;
    // },

    // 获取总体和每个div的宽高
    getWH() {
      let wordCloud = this.$refs.wordCloud;
      // 获取整个展示区的宽高
      this.outerWidth = wordCloud.offsetWidth;
      this.outerHeight = wordCloud.offsetHeight;
      // console.log(this.outerWidth, this.outerHeight,1,2,3);
      let element, className;
      //由于style使用scope，需要获取元素的 data-v-？ 属性名，否则css不显示
      let vue_data_Attribute = wordCloud.getAttributeNames()[0];
      this.words.forEach((item) => {
        //创建出元素
        className = item.asset_num > 0 ? "wordRed" : "word";
        element = document.createElement("div");
        element.setAttribute(vue_data_Attribute, "");
        element.classList.add(className);
        element.innerText =
          item.event_desc +
          (item.asset_num > 0 ? "(" + item.asset_num + ")" : "");
        element.style.top = 0;
        element.style.left = 0;
        wordCloud.appendChild(element);
        //获取元素的宽高并添加top、left属性，初始为0
        item.width = element.offsetWidth;
        item.height = element.offsetHeight;
        item.top = 0;
        item.left = 0;
        // 获取单个词条的最大宽度，防止随机后右侧溢出
        this.elementMaxWidth < item.width &&
          (this.elementMaxWidth = item.width);
        //删除元素
        element.remove();
      });
    },
    // 碰撞检测
    isCollision(arr, position) {
      for (let item of arr) {
        let top = Math.max(item[0], position[0]); //上
        let bottom = Math.min(item[1], position[1]); //下
        let left = Math.max(item[2], position[2]); //左
        let right = Math.min(item[3], position[3]); //右

        if (left <= right && top <= bottom) {
          return true;
        }
      }
      return false;
    },
    //获取随机位置
    setPosition(item) {
      let top, bottom, left, right;
      //生成随机top、left，整体展示区宽高减去单个元素最大的宽高防止溢出
      top = Math.floor(Math.random() * (this.outerHeight - 40));
      left = Math.floor(
        Math.random() * (this.outerWidth - this.elementMaxWidth)
      );
      bottom = top + item.height;
      right = left + item.width;

      return [top, bottom, left, right];
    },
    setWordPosition() {
      this.wordList = [];
      this.wordPosition = [];
      this.words.forEach((item, index) => {
        // 防止外部宽高过小造成死循环
        let count = 0;
        let position;
        position = this.setPosition(item);
        index == 0 && this.wordPosition.push(position);
        while (index > 0) {
          // 当前生成的随机位置，与之前已经暂存在wordPosition中随机位置碰撞检测
          count++;
          if (this.isCollision(this.wordPosition, position)) {
            position = this.setPosition(item);
            if (count > 80) {
              this.wordPosition.push(position);
              break;
            }
          } else {
            this.wordPosition.push(position);
            break;
          }
        }
        item.top = position[0];
        item.left = position[2];
      });
      this.wordList = this.words;
    },
    handleWordClick(item) {
      if (item.asset_num > 0) {
        this.$router.push({
          // path: "/secevent/risksafeevent/risksafeeventlist"
          name: "Risksafeeventlist",
          params: {
            fromWhere: "wordCloud",
            search: item.event_desc,
            threat_id: item.threat_id,
          },
        });
      }
    },
    // handleReSize() {
    //   console.log(121212);
    //   this.$nextTick(() => {
    //     this.getWH();
    //     this.setWordPosition();
    //   });
    // },
  },
  // mounted() {
  //   window.addEventListener("resize", () => {
  //     // this.$nextTick(() => {
  //     //   this.getWH();
  //     //   this.setWordPosition();
  //     // });
  //     this.handleReSize();
  //   });
  // },
  // beforeDestroy() {
  //   window.removeEventListener("resize", () => {
  //     this.handleResize();
  //   });
  // },
};
</script>

<style scoped>
.wordCloud {
  width: 100%;
  height: 100%;
  position: relative;
}
.word {
  position: absolute;
  box-sizing: border-box;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  padding: 0 10px;
  font-size: 12px;
  /* border: 1px solid #ddd; */
  background-color: #f8f8f8;
  border-radius: 25px 25px 25px 0;
  cursor: pointer;
}
.word:hover {
  color: #fff;
  /* border: 1px solid #ddd; */
  background-color: #ddd;
  z-index: 100;
}
.wordRed {
  position: absolute;
  box-sizing: border-box;
  display: inline-block;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #ee5555;
  /* border: 1px solid #ffcccc; */
  background-color: #ffeded;
  border-radius: 25px 25px 25px 0;
  cursor: pointer;
}
.wordRed:hover {
  color: #fff;
  /* border: 1px solid #ee5555; */
  background-color: #ee5555;
  z-index: 100;
}
</style>