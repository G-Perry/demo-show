<template>
  <div class="son_fit_father">
    <div class="wordCloud" ref="wordCloud">
      <div
        v-for="(item, index) in wordList"
        :ref="index"
        :key="index"
        :class="item.wordCount > 0 ? 'wordRed' : 'word'"
        :style="`top:${item.top}px;left:${item.left}px`"
      >
        {{
        item.wordDesc + (item.wordCount > 0 ? "(" + item.wordCount + ")" : "")
        }}
      </div>
    </div>
    <div class="changeBtn">
      <button class="button plain-btn" style="height: 24px" @click="resetWordCloud">
        <span>重置</span>
      </button>
    </div>
  </div>
</template>
  
  <script>
import Mock from "mockjs";
export default {
  //   props: {
  //     words: {
  //       type: Array,
  //       default: () => {
  //         function randomText() {
  //           return Mock.Random.string("壹贰叁肆伍陆柒捌玖拾", 3, 10);
  //         }
  //         function randomNum() {
  //           return Mock.Random.integer(0, 5);
  //         }
  //         return [
  //           {
  //             wordDesc: randomText(),
  //             wordCount: randomNum(),
  //           },
  //         ];
  //       },
  //     },
  //   },
  data() {
    return {
      // 外部整体的宽高
      outerWidth: 0,
      outerHeight: 0,
      // 单个词条的最大宽度，防止随机后右侧溢出
      elementMaxWidth: 0,
      // 随机生成的词
      words: [],
      // 最终用于渲染的词条
      wordList: [],
      // 暂存随机位置
      wordPosition: [],
    };
  },
  methods: {
    // 获取总体和每个div的宽高
    getWH() {
      let wordCloud = this.$refs.wordCloud;
      // 获取整个展示区的宽高
      this.outerWidth = wordCloud.offsetWidth;
      this.outerHeight = wordCloud.offsetHeight;
      let element, className;
      //由于style使用scope，需要获取元素的 data-v-？ 属性名，否则css不显示
      let vue_data_Attribute = wordCloud.getAttributeNames()[0];
      this.words.forEach((item) => {
        //创建出元素
        className = item.wordCount > 0 ? "wordRed" : "word";
        element = document.createElement("div");
        element.setAttribute(vue_data_Attribute, "");
        element.classList.add(className);
        element.innerText =
          item.wordDesc +
          (item.wordCount > 0 ? "(" + item.wordCount + ")" : "");
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
    // mock生成随机的词
    setWords() {
      function randomText() {
        return Mock.Random.string("壹贰叁肆伍陆柒捌玖拾", 3, 10);
      }
      function randomNum() {
        return Mock.Random.integer(0, 5);
      }
      for (let i = 0; i < 10; i++) {
        this.words.push({
          wordDesc: randomText(),
          wordCount: i == 0 ? 0 : randomNum(),
        });
      }
    },
    // 生成词的随机位置
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
    // 重新生成词云位置
    resetWordCloud() {
      this.setWordPosition();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setWords();
      this.getWH();
      this.setWordPosition();
    });
  },
};
</script>
  
  <style scoped>
.wordCloud {
  width: 600px;
  height: 400px;
  background: #3fd8d036;
  margin: 100px auto 0;
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
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  cursor: pointer;
}

.word:hover {
  color: #fff;
  border: 1px solid #ddd;
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
  border: 1px solid #ffcccc;
  background-color: #ffeded;
  cursor: pointer;
}

.wordRed:hover {
  color: #fff;
  border: 1px solid #ee5555;
  background-color: #ee5555;
  z-index: 100;
}
.changeBtn {
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  text-align: center;
}
</style>
  