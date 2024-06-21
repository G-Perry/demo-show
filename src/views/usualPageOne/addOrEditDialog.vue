<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleClose" width="420px">
    <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker type="date" placeholder="请选择日期" v-model="form.birth" style="width: 100%"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="籍贯" prop="address">
        <el-cascader v-model="address" :options="cityData" clearable separator=" "
          :props="{ label: 'title', value: 'title', children: 'children' }" filterable
          @change="handleCascaderChange"></el-cascader>
        <el-tooltip class="item" placement="right" effect="light">
          <span slot="content">如果打开"修改dialog"时显示空白，原因如下：<br />mock模拟生成的籍贯地址数据，与cascader组件所绑定的地址数据层级对应有区别</span>
          <i class="el-icon-warning-outline" style="margin-left: 10px" v-show="dialogTitle == '修改'"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="身份证号" prop="identityCard">
        <el-input v-model="form.identityCard" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="form.phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <div class="dialog_footer">
      <button class="button blue_btn" @click="handleDataSubmit">
        <span>确定</span>
      </button>
      <button class="button plain-btn" @click="handleClose">
        <span>取消</span>
      </button>
    </div>
  </el-dialog>
</template>

<script>
import cityDataJson from "../usualPage/cityDataJson";
import { userAdd, userEdit } from "@/api/index";
export default {
  data() {
    // 自定义的身份证号校验函数
    var validateIdentityCard = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入身份证号"));
      } else if (!/^\d{17}[\d|X|x]$/.test(value)) {
        // 字符串的开头必须是 17 个连续的数字。
        // 接下来可以是一个数字（0-9）或者是字母 X（大小写不限）。
        // 字符串的总长度应该是 18。
        callback(new Error("身份证号格式不正确"));
      } else {
        callback();
      }
    };
    return {
      dialogTitle: "",
      dialogVisible: false,
      address: [],
      form: {},
      formRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "用户名长度在 3 到 20 个字符之间",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z\u4e00-\u9fa5\s]+$/,
            message: "姓名只能包含字母、汉字和空格",
            trigger: "blur",
          },
        ],
        birth: [
          {
            type: "string",
            required: true,
            message: "请选择出生日期",
            trigger: "change",
          },
        ],
        address: [
          {
            type: "string",
            required: true,
            message: "请选择籍贯",
            trigger: "change",
          },
        ],
        identityCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            validator: validateIdentityCard,
            trigger: "blur",
          },
        ],
        phoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            // 必须以数字 1 开头。
            // 第二位是 3、4、5、6、7、8、9 中的一个。
            // 后面必须是连续的 9 个数字。
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    cityData() {
      return cityDataJson;
    },
  },
  methods: {
    reset() {
      this.form = {
        name: "",
        sex: 1,
        birth: "",
        address: "",
        identityCard: "",
        phoneNum: "",
        status: 1,
      };
      this.isDisabled = false;
      this.$refs.form?.resetFields();
    },
    handleCascaderChange() {
      this.form.address = this.address.join(" ");
    },
    handleDataSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id == undefined) {
            userAdd(this.form).then((res) => {
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  message: "编辑成功",
                  type: "success",
                });
                this.dialogVisible = false;
                this.$parent.getList();
              }
            });
          } else {
            userEdit(this.form).then((res) => {
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success",
                });
                this.dialogVisible = false;
                this.$parent.getList();
              }
            });
          }
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.reset()
    },
  },
  mounted() {
    // console.log(cityDataJson);
  },
};
</script>

<style scoped>
::v-deep .el-form-item {
  width: 100%;
  margin-bottom: 15px;
}

::v-deep .el-form-item__label {
  padding-right: 12px !important;
}
</style>