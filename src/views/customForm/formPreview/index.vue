<template>
  <el-dialog
    title="表单预览"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="800px"
  >
    <el-form ref="form" :model="form" :rules="formRules">
      <form-item
        v-for="element in formItems"
        :key="element.id"
        :form="form"
        :formItem="element"
      ></form-item>
      <el-form-item> </el-form-item>
    </el-form>
    <div class="dialog_footer">
      <el-button @click="$refs.form.clearValidate()">清除校验</el-button>
      <el-button type="primary" @click="handleDataSubmit">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
  
  <script>
import { deepClone } from "@/utils/handleObjMethods";

import formItem from "./formItem.vue";
export default {
  props: ["originData"],
  components: { formItem },
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      form: {},
      formRules: {},
      formItems: [],
    };
  },
  computed: {},
  methods: {
    handleCascaderChange() {
      this.form.address = this.address.join(" ");
    },
    handleDataSubmit() {},
    init() {
      this.form = {};
      this.formRules = {};
      this.formItems = deepClone(this.originData);

      this.originData.forEach((item) => {
        let {
          config,
          propName,
          required,
          limitLetter,
          minlength,
          maxlength,
          regExpObj,
        } = item;
        let obj1, obj2, obj3;
        if (required) {
          obj1 = {
            required: true,
            message: "请输入" + config.label,
            trigger: "blur",
          };
        }
        if (limitLetter) {
          if (minlength && maxlength) {
            obj2 = {
              min: minlength,
              max: maxlength,
              message: `${config.label}输入长度在${minlength}到${maxlength}个字符`,
              trigger: "blur",
            };
          } else if (minlength && maxlength == null) {
            obj2 = {
              min: minlength,
              message: `${config.label}输入长度至少为${minlength}个字符`,
              trigger: "blur",
            };
          } else if (maxlength && minlength == null) {
            obj2 = {
              max: maxlength,
              message: `${config.label}输入长度最多为${maxlength}个字符`,
              trigger: "blur",
            };
          }
        }
        if (!(JSON.stringify(regExpObj) === "{}")) {
          obj3 = {
            pattern: new RegExp(regExpObj.expression),
            message: regExpObj.tip,
            trigger: "blur",
          };
        }

        this.$set(this.form, propName, config.defaultValue);
        this.$set(
          this.formRules,
          propName,
          [obj1, obj2, obj3].filter((item) => item)
        );
      });
    },
    open() {
      this.init();
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
      // console.log(this.formRules);
    },
    close() {
      // 关闭前清除表单校验
      this.$refs.form.clearValidate();
      this.dialogVisible = false;
    },
  },
  mounted() {},
};
</script>
  
  <style scoped>
::v-deep .el-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  gap: 10px;
}
.dialog_footer {
  width: 100%;
  height: 40px;
  text-align: right;
}
</style>