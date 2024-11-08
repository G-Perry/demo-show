<template>
  <section class="regular_verification">
    <div class="left">
      <span class="title">限定格式</span>
      <div
        type="text"
        v-for="item in regularVerification"
        :key="item.type"
        class="regular_verification_type"
        :class="{ active: item.isActive }"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="right">
      <div class="input_area">
        <span class="title">正则表达式</span>
        <el-input
          v-model="expression"
          size="mini"
          v-if="activeItem.type === 'selfCustomize'"
        ></el-input>
        <span v-else style="font-size: 12px">{{ expression }}</span>
      </div>
      <div class="input_area">
        <span class="title">错误时提示</span>
        <el-input v-model="tip" size="mini"></el-input>
      </div>
      <div class="input_area">
        <span class="title">测试</span>
        <el-input v-model="test" size="mini"></el-input>
        <span v-if="isInputInvalid" class="error_tip">{{ tip }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { regularVerification } from "./config";

export default {
  props: ["value"],
  data() {
    regularVerification.forEach((item) => {
      item.isActive = false;
    });
    return {
      regularVerification,
      activeItem: {},
      expression: "",
      tip: "",
      test: "",
      isInputInvalid: false,
    };
  },
  watch: {
    test: {
      handler: function (val) {
        this.isInputInvalid = this.validateInput(val, this.expression);
      },
    },
    value: {
      handler: function (value) {
        let item = this.regularVerification.find(
          (item) => item.type == value.type
        );
        let val = item ? item : this.regularVerification[0];
        this.setItemActive(val);
        this.activeItem = val;
        this.expression = val.expression || "";
        this.tip = val.tip || "";
        this.test = "";
      },
      immediate: true,
    },
  },
  methods: {
    setItemActive(item) {
      this.regularVerification.forEach((element) => {
        if (element.type === item.type) {
          element.isActive = true;
        } else {
          element.isActive = false;
        }
      });
    },
    handleClick(item) {
      let itemObj = { ...item };
      delete itemObj.isActive;
      this.$emit("input", itemObj);
      this.setItemActive(item);
    },
    validateInput(test, expression) {
      if (test) {
        let regExp = new RegExp(expression);
        return !regExp.test(test);
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.regular_verification {
  display: flex;
  gap: 10px;
}
.regular_verification > div {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
}
.left {
  flex: 3;
}
.right {
  flex: 5;
}
.title {
  /* font-weight: 600; */
  color: #000;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.title::before {
  content: "";
  display: block;
  height: 18px;
  margin-right: 5px;
  border-left: 2px solid blue;
}
.regular_verification_type {
  height: 20px;
  line-height: 20px;
  padding-left: 10px;
  cursor: pointer;
  color: #595959;
}
.regular_verification_type:hover,
.active {
  color: #2f54eb;
}
.input_area + .input_area {
  margin-top: 10px;
}
.error_tip {
  font-size: 12px;
  color: red;
  margin-left: 10px;
}
</style>
