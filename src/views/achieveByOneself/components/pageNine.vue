<template>
  <div class="son_fit_father">
    <section class="date">
      <button @click="handleMonthChange('prev')">{{ "<--" }}</button>
      <span>{{ `${nowYear}-${nowMonth}-${nowDate}` }}</span>
      <button @click="handleMonthChange('next')">{{ "-->" }}</button>
    </section>
    <section class="day_names">
      <span class="name">Sun</span>
      <span class="name">Mon</span>
      <span class="name">Tue</span>
      <span class="name">Wed</span>
      <span class="name">Thu</span>
      <span class="name">Fri</span>
      <span class="name">Sat</span>
    </section>
    <div class="son_fit fff calendar" :class="calendarRowClass">
      <div
        class="day"
        v-for="item in dateList"
        :key="`${item.month}-${item.date}`"
        :class="{ 'day--disabled': !item.isThisMonth }"
      >
        <!-- @click="handleDayClick(item)" -->
        <span>{{ item.date }}</span>
        <!-- <span>{{item.position_row}}--{{ item.position_column }}</span> -->
      </div>
      <!-- <section class="task task--warning">Projects</section>
        <section class="task task--danger">Design Sprint</section>
        <section class="task task--primary">
          Product Checkup 1
          <div class="task__detail">
            <h2>Product Checkup 1</h2>
            <p>15-17th November</p>
          </div>
        </section>
      <section class="task task--info">Product Checkup 2</section>-->
      <section
        class="task"
        v-for="item in tasksList"
        :class="[`task_${item.sort}`, `task--${item.type}`]"
        :key="`${item.date}-${item.id}`"
        :style="`grid-column: ${item.position_column} / span 1; grid-row: ${item.position_row};`"
      >
        {{ item.desc }}
      </section>
    </div>
  </div>
</template>

<script>
import { tasks } from "./resData";
export default {
  data() {
    let date = new Date();
    return {
      nowYear: date.getFullYear(), //当前年
      nowMonth: date.getMonth() + 1, //当前月,（0–11），0 表示一年中的第一月。
      // let nowDay = ref(date.getDay()); //当前星期几，一周中的第几天（0-6），0 表示星期天。
      nowDate: date.getDate(), //当前日期，（1-31）
      dateList: [], //日期数组
      tasksList: [], //计划数组
      calendarRowClass: "", //用于判断渲染几行
      calendarRowClassMap: {
        //用于控制展示几行
        4: "four_rows",
        5: "five_rows",
        6: "six_rows",
      },
    };
  },
  methods: {
    setDateList(year, month) {
      // 首先置空
      this.dateList = [];
      let calendarRowCount = 5;
      let isThisMonth = false; //用于标识是否为本月
      let Month = month; //日期所在月份
      let prevMonthLastDay = new Date(year, month - 1, 0); //上个月最后一天
      let thisMonthLastDay = new Date(year, month, 0); //这个月最后一天
      let prevMonthDaysCount = prevMonthLastDay.getDate(); //上个月最后一天日期,即上个月天数
      let prevMonthLastDayIndexInWeek = prevMonthLastDay.getDay(); //上个月最后一天在一星期中的的排序（0-6）
      let thisMonthDaysCount = thisMonthLastDay.getDate(); //这个月最后一天日期,即这个月天数
      // 判断日历为四行五行还是六行
      if (
        prevMonthLastDayIndexInWeek < 6 &&
        prevMonthLastDayIndexInWeek + thisMonthDaysCount > 34
      ) {
        calendarRowCount = 6;
      }
      if (prevMonthLastDayIndexInWeek == 6 && thisMonthDaysCount == 28) {
        calendarRowCount = 4;
      }
      // 先向数组插入上月的日期信息
      for (let i = 0; i < prevMonthLastDayIndexInWeek + 1; i++) {
        if (prevMonthLastDayIndexInWeek == 6) break;
        this.dateList.unshift({
          key: `${year}-${Month - 1}-${prevMonthDaysCount - i}`,
          month: Month - 1,
          date: prevMonthDaysCount - i,
          // indexInWeek: prevMonthLastDayIndexInWeek - i,
          isThisMonth: isThisMonth,
          position_row: 1,
          position_column: prevMonthLastDayIndexInWeek - i + 1,
        });
      }
      isThisMonth = true;
      // 再向数组插入本月及下个月的日期信息
      for (
        let i = 0;
        i < calendarRowCount * 7 - ((prevMonthLastDayIndexInWeek + 1) % 7);
        i++
      ) {
        let thisDate = (i + 1) % thisMonthDaysCount;
        if (thisDate == 0) {
          thisDate = thisMonthDaysCount;
        }
        // let indexInWeek = (i + prevMonthLastDayIndexInWeek) % 6;
        this.dateList.push({
          key: `${year}-${Month}-${thisDate}`,
          month: Month,
          date: thisDate,
          // indexInWeek: indexInWeek,
          isThisMonth: isThisMonth,
          position_row: Math.ceil((prevMonthLastDayIndexInWeek + 2 + i) / 7),
          position_column: ((i + 1 + prevMonthLastDayIndexInWeek) % 7) + 1,
        });
        if (thisDate == thisMonthDaysCount) {
          Month++;
          isThisMonth = false;
        }
      }
      this.calendarRowClass = this.calendarRowClassMap[calendarRowCount];
    },
    handleMonthChange(sign) {
      switch (sign) {
        case "prev":
          if (this.nowMonth-- == 1) {
            this.nowYear--;
            this.nowMonth = 12;
          }
          break;
        case "next":
          if (this.nowMonth++ == 12) {
            this.nowYear++;
            this.nowMonth = 1;
          }
          break;

        default:
          break;
      }
      this.setDateList(this.nowYear, this.nowMonth);
      this.setTaskList();
    },
    setTaskList() {
      this.tasksList = [];
      setTimeout(() => {
        console.log(tasks, 2222);
        // 模拟异步请求
        let res = tasks;
        res.forEach((item) => {
          let obj = this.dateList.find((e) => e.key == item.date);
          if (obj) {
            item.tasks.forEach((element, index) => {
              this.tasksList.push({
                date: item.date,
                sort: index + 1,
                position_row: obj.position_row,
                position_column: obj.position_column,
                ...element,
              });
            });
          }
        });
        // console.log(this.tasksList , 111);
      }, 500);
    },
  },
  mounted() {
    this.setDateList(this.nowYear, this.nowMonth);
    this.setTaskList();
  },
};
</script>

<style lang="scss" scoped>
.date {
  width: 100%;
  height: 40px;
  // line-height: 40px;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  border-bottom: 1px solid #dbdee6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.day_names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 40px;
  .name {
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    color: #99a1a7;
    border-bottom: 1px solid #dbdee6;
    border-right: 1px solid #dbdee6;
    &:first-of-type {
      border-left: 1px solid #dbdee6;
    }
  }
}
.four_rows {
  grid-template-rows: repeat(4, 1fr);
}
.five_rows {
  grid-template-rows: repeat(5, 1fr);
}
.six_rows {
  grid-template-rows: repeat(6, 1fr);
}
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  // grid-template-rows: repeat(5, 1fr);

  .day {
    border-bottom: 1px solid #dbdee6;
    border-right: 1px solid #dbdee6;
    // padding: 14px 20px;
    letter-spacing: 1px;
    box-sizing: border-box;
    font-size: 60px;
    color: #595f633b;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    // text-align: right;
    // font-size: 16px;
    // color: #595f63;
    position: relative;
    // pointer-events: none;
    z-index: 1;
    &:nth-of-type(7n + 1) {
      border-left: 1px solid #dbdee6;
    }
    &--disabled {
      // color: rgba(rgb(199, 199, 199), 0.6);
      color: #b2b7bb;
      background-color: #ffffff;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23edf1f4' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
      cursor: not-allowed;
    }
    &:nth-of-type(n + 1):nth-of-type(-n + 7) {
      grid-row: 1;
    }

    &:nth-of-type(n + 8):nth-of-type(-n + 14) {
      grid-row: 2;
    }

    &:nth-of-type(n + 15):nth-of-type(-n + 21) {
      grid-row: 3;
    }

    &:nth-of-type(n + 22):nth-of-type(-n + 28) {
      grid-row: 4;
    }

    &:nth-of-type(n + 29):nth-of-type(-n + 35) {
      grid-row: 5;
    }
    &:nth-of-type(n + 36):nth-of-type(-n + 42) {
      grid-row: 6;
    }

    &:nth-of-type(7n + 1) {
      grid-column: 1/1;
    }

    &:nth-of-type(7n + 2) {
      grid-column: 2/2;
    }

    &:nth-of-type(7n + 3) {
      grid-column: 3/3;
    }

    &:nth-of-type(7n + 4) {
      grid-column: 4/4;
    }

    &:nth-of-type(7n + 5) {
      grid-column: 5/5;
    }

    &:nth-of-type(7n + 6) {
      grid-column: 6/6;
    }
    &:nth-of-type(7n + 7) {
      grid-column: 7/7;
    }
  }

  .task {
    border-left-width: 3px;
    padding: 3px 12px;
    margin: 10px;
    border-left-style: solid;
    font-size: 14px;
    position: relative;
    align-self: start;
    overflow: hidden;
    // 四行展示五个，五行展示四个，六行展示三个
    &_1 {
      transform: translateY(0%);
    }
    &_2 {
      transform: translateY(120%);
    }
    &_3 {
      transform: translateY(240%);
    }
    &_4 {
      transform: translateY(360%);
    }
    &_5 {
      transform: translateY(480%);
    }

    &--warning {
      // grid-column: 6 / span 1;
      // grid-row: 3;
      // align-self: center;
      // align-self: end;
      // margin-top: -5px;
      border-left-color: #fdb44d;
      background: #fef0db;
      color: darken(#fdb44d, 12%);
    }

    &--danger {
      // grid-column: 2 / span 3;
      // grid-row: 3;
      // margin-top: 15px;
      // align-self: end;
      border-left-color: #fa607e;
      background: rgba(#fdc5d0, 0.7);
      color: darken(#fa607e, 12%);
    }

    &--info {
      // grid-column: 6 / span 2;
      // grid-row: 5;
      // margin-top: 15px;
      // align-self: end;
      border-left-color: #4786ff;
      background: rgba(#dae7ff, 0.7);
      color: darken(#4786ff, 12%);
    }

    &--primary {
      // grid-column: 3 / span 3;
      // grid-row: 4;
      // align-self: end;
      border: 0;
      border-radius: 4px;
      box-shadow: 0 10px 14px rgba(#4786ff, 0.4);
      background: #4786ff;
      color: #fff;
    }

    &__detail {
      position: absolute;
      left: 0;
      top: calc(100% + 10px);
      background: #fff;
      border: 1px solid rgba(166, 168, 179, 0.2);
      color: #000;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      z-index: 2;

      &:after,
      &:before {
        bottom: 100%;
        left: 30%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }

      &:before {
        border-bottom-color: rgba(166, 168, 179, 0.2);
        border-width: 8px;
        margin-left: -8px;
      }

      &:after {
        border-bottom-color: #fff;
        border-width: 6px;
        margin-left: -6px;
      }

      h2 {
        font-size: 15px;
        margin: 0;
        color: #51565d;
      }

      p {
        margin-top: 4px;
        font-size: 12px;
        margin-bottom: 0;
        font-weight: 500;
        color: rgba(#51565d, 0.7);
      }
    }
  }
}
</style>