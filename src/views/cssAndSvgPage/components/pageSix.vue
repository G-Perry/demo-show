<template>
  <div class="son_fit_father fff">
    <div style="width:100%;height:100%">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" :height="svgHeight" width="100%">
        <foreignObject width="100%" height="100%">
          <div class="abcd">
            <div>
              <div
                v-for="item in source"
                :key="item.id"
                class="aaa"
                :id="item.id"
                @mouseover="handleMouseover(item.id)"
                @mouseout="handleMouseout"
              >
                {{ item.id }}
                <div style="width:50px;height:50px;background:aquamarine" />
              </div>
            </div>
            <div>
              <div
                v-for="item in target"
                :key="item.id"
                class="aaa"
                :id="item.id"
                @mouseover="handleMouseover(item.id)"
                @mouseout="handleMouseout"
              >
                {{ item.id }}
                <div style="width:50px;height:50px;background:aquamarine" />
              </div>
            </div>
            <div>
              <div
                v-for="item in target"
                :key="item.id"
                class="aaa"
                :id="item.id+20"
                @mouseover="handleMouseover(item.id+20)"
                @mouseout="handleMouseout"
              >
                {{ item.id+20 }}
                <div style="width:50px;height:50px;background:aquamarine" />
              </div>
            </div>
          </div>
          <div class="bbb" v-show="loadingIsShow" @click="loadingIsShow = false" />
        </foreignObject>
        <path
          v-for="(item,index) in resultLine"
          :key="index"
          :d="'M '+ item[0] + ' ' + item[1] + ' ' + 'C '+ item[2] +' '+ item[3] + ' ' + item[4] + ' ' + item[5] + ' ' + item[6] + ' ' + item[7]"
          :stroke="item[8] ? '#ecf3fa' : '#4e8ed9'"
          stroke-width="2"
          fill="none"
        />
        <!-- 浅色  深色 -->
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      svgHeight: 0,
      source: [
        {
          id: 1,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 2,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 3,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 4,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 5,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 6,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 7,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 8,
          name: "asdaad",
          count: 1212,
        },
      ],
      target: [
        {
          id: 11,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 12,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 13,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 14,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 15,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 16,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 17,
          name: "asdaad",
          count: 1212,
        },
        {
          id: 18,
          name: "asdaad",
          count: 1212,
        },
      ],
      line: [
        {
          from: 2,
          to: 14,
        },
        {
          from: 2,
          to: 11,
        },
        {
          from: 16,
          to: 37,
        },
        {
          from: 11,
          to: 36,
        },
        {
          from: 14,
          to: 32,
        },
        {
          from: 14,
          to: 34,
        },
        {
          from: 14,
          to: 35,
        },
        {
          from: 14,
          to: 37,
        },
        {
          from: 1,
          to: 18,
        },
        {
          from: 18,
          to: 38,
        },
        {
          from: 3,
          to: 18,
        },
        {
          from: 2,
          to: 17,
        },
        {
          from: 2,
          to: 15,
        },
        {
          from: 1,
          to: 16,
        },
        {
          from: 7,
          to: 17,
        },
        {
          from: 4,
          to: 18,
        },
        {
          from: 5,
          to: 17,
        },
        {
          from: 6,
          to: 17,
        },
        {
          from: 15,
          to: 33,
        },
        {
          from: 17,
          to: 33,
        },

        {
          from: 8,
          to: 12,
        },
        {
          from: 8,
          to: 13,
        },
        {
          from: 12,
          to: 31,
        },
        {
          from: 13,
          to: 31,
        },

        {
          from: 12,
          to: 33,
        },
      ],
      resultLine: [], //用于渲染路径
      loadingIsShow: false, //用于鼠标移入显示遮罩层
      showIds: [], //用于鼠标移入显示div
      showLines: [], //用于鼠标移入显示路径
    };
  },
  methods: {
    pushLine() {
      for (let item of this.line) {
        let fromId = document.getElementById(item.from);
        let toId = document.getElementById(item.to);
        let aRightPointX = fromId.offsetLeft + fromId.offsetWidth;
        let aRightPointY = fromId.offsetTop + fromId.offsetHeight / 2;
        let bLeftPointX = toId.offsetLeft;
        let bLeftPointY = toId.offsetTop + toId.offsetHeight / 2;
        this.resultLine.push([
          aRightPointX, //三次贝塞尔曲线起点
          aRightPointY, //三次贝塞尔曲线起点
          aRightPointX + (bLeftPointX - aRightPointX) / 3, //第一个控制点坐标
          aRightPointY, //第一个控制点坐标
          bLeftPointX - (bLeftPointX - aRightPointX) / 3, //第二个控制点坐标
          bLeftPointY, //第二个控制点坐标
          bLeftPointX, //三次贝塞尔曲线终点
          bLeftPointY, //三次贝塞尔曲线终点
          false, //曲线是否淡化
        ]);
      }
    },
    handleMouseover(id) {
      // this.showIds = [id];
      // for (let [index, item] of this.line.entries()) {
      //   this.resultLine[index][8] = true;
      //   if (item.from == id || item.to == id) {
      //     this.resultLine[index][8] = false;
      //     this.showIds.push(item.to == id ? item.from : item.to);
      //   }
      // }
      this.showLines = [];
      this.searchLineToRight(id);
      this.searchLineToLeft(id);
      // 处理需要显示的路径
      for (let item of this.resultLine) {
        item[8] = true;
      }
      for (let line of this.showLines) {
        for (let [index, item] of this.line.entries()) {
          if (line[0] == item.from && line[1] == item.to) {
            this.resultLine[index][8] = false;
          }
        }
      }
      // 处理路径上需要显示的节点
      this.showIds = [...new Set(this.showLines.flat(1))];
      for (let id of this.showIds) {
        let abc = document.getElementById(id);
        abc.classList.add("ccc");
      }

      this.loadingIsShow = true;
    },
    handleMouseout() {
      for (let item of this.resultLine) {
        item[8] = false;
      }
      for (let id of this.showIds) {
        let abc = document.getElementById(id);
        abc.classList.remove("ccc");
      }
      this.showIds = [];
      this.loadingIsShow = false;
    },
    searchLineToRight(id) {
      //寻找节点的下游节点
      for (let item of this.line) {
        if (item.from == id) {
          this.showLines.push([id, item.to]);
          this.searchLineToRight(item.to);
        }
      }
      return null;
    },
    searchLineToLeft(id) {
      //寻找节点的上游节点
      for (let item of this.line) {
        if (item.to == id) {
          this.showLines.push([item.from, id]);
          this.searchLineToLeft(item.from);
        }
      }
      return null;
    },
  },
  mounted() {
    // let a = document.getElementById(2);
    // let aRightPointX = a.offsetLeft + a.offsetWidth;
    // let aRightPointY = a.offsetTop + a.offsetHeight / 2;
    // let b = document.getElementById(17);
    // let bLeftPointX = b.offsetLeft;
    // let bLeftPointY = b.offsetTop + b.offsetHeight / 2;

    // this.mx = aRightPointX;
    // this.my = aRightPointY;
    // this.lx = bLeftPointX;
    // this.ly = bLeftPointY;
    // // console.log("h", a.offsetHeight);
    // // console.log("w", a.offsetWidth);
    // // console.log("x", a.offsetLeft);
    // // console.log("y", a.offsetTop);
    // // console.log(aRightPointX, aRightPointY);
    // // console.log(bLeftPointX, bLeftPointY);
    // document.addEventListener("click", function(e) {
    //   console.log(e.clientX, e.clientY);
    // });
    this.pushLine();
    let abcd = document.getElementsByClassName("abcd");
    this.svgHeight = abcd[0].offsetHeight;
    // console.log();
  },
};
</script>

<style scoped>
.abcd {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.aaa {
  width: 300px;
  height: 80px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  margin: 20px 10px;
  cursor: pointer;
}
.bbb {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
.ccc {
  background: #fff;
  position: relative;
  z-index: 2000;
}
</style>