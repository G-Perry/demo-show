<template>
  <div class="aaa three_form">
    <section class="form_merge one">
      <!-- <my-form :option="formOption" :row="rowOne"></my-form> -->
      <!-- <el-checkbox-group v-model="checkedOne" @change="handleCheckedChange('left')"> -->
      <div style="display: flex;flex-direction: column;gap: 20px;margin-left:20px;margin-top:20px">
        <el-checkbox
          v-for="(item) in option"
          :label="item.id"
          :key="item.id"
          :disabled="item.checkedPosition&&item.checkedPosition=='right'"
          @change="handleCheckedChange($event,'left',item)"
        >
          <!-- @change="handleCheckedChange" -->
          <span>{{item.label+':'+rowOne[item.propName]}}</span>
        </el-checkbox>
      </div>
      <!-- </el-checkbox-group> -->
    </section>
    <section class="arrow">
      <el-button type="primary" icon="el-icon-arrow-right"></el-button>
    </section>
    <section class="form_merge two"></section>
    <section class="arrow">
      <el-button type="primary" icon="el-icon-arrow-left"></el-button>
    </section>
    <section class="form_merge three">
      <!-- <my-form :option="formOption" :row="rowTwo"></my-form> -->
      <!-- <el-checkbox-group v-model="checkedTwo" @change="handleCheckedChange()"> -->
      <div style="display: flex;flex-direction: column;gap: 20px;margin-left:20px;margin-top:20px">
        <el-checkbox
          v-for="(item) in option"
          :label="item.id"
          :key="item.id"
          @change="handleCheckedChange($event,'right',item)"
          :disabled="item.checkedPosition&&item.checkedPosition=='left'"
        >
          <!-- @change="handleCheckedChange" -->
          <span>{{item.label+':'+rowTwo[item.propName]}}</span>
        </el-checkbox>
      </div>
      <!-- </el-checkbox-group> -->
    </section>
  </div>
</template>

<script>
// import myForm from "./testForm.vue";
export default {
  // components: { myForm },
  data() {
    return {
      checkedOne: [],
      checkedTwo: [],
      option: [
        {
          id: 1,
          label: "111",
          propName: "aaa",
          checkedPosition: null,
        },
        {
          id: 2,
          label: "222",
          propName: "bbb",
          checkedPosition: null,
        },
        {
          id: 3,
          label: "333",
          propName: "ccc",
          checkedPosition: null,
        },
        {
          id: 4,
          label: "444",
          propName: "ddd",
          checkedPosition: null,
        },
        {
          id: 5,
          label: "555",
          propName: "eee",
          checkedPosition: null,
        },
      ],
      rowOne: {
        aaa: "asdadsas",
        bbb: "jhgjgjhg",
        ccc: "vbnvbnvbn",
        ddd: "uiouoiuo",
        eee: "ewweweew",
      },
      rowTwo: {
        aaa: "oipipopio",
        bbb: "zcxzxcxzc",
        ccc: "mbnmbnm",
        ddd: "fggfgfg",
        eee: "tryrtyr",
      },
      rowMiddle: {},
    };
  },
  methods: {
    handleCheckedChange(val, sign, item) {
      console.log(val, sign, item);
      item.checkedPosition = sign;
    },
  },
};
</script>

<style scoped>
.aaa {
  width: 90vw;
  height: 90vh;
  margin: 0 auto;
  background: #bfa !important;
}
.three_form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}
.three_form > section {
  background: #fff;
}
.form_merge {
  flex: 1;
}
.arrow {
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>