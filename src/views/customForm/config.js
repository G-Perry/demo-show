// 输入型组件 【左面板】
export const inputComponents = [
  {
    // 组件的自定义配置
    config: {
      tag: "el-input", //组件的标签字段
      tagIcon: "input", //图标
      title: "单行文本", //标题
      label: "单行文本", //标签名
      defaultValue: null, //默认值，用于双向绑定
      ratioEntire: true, //是否占满一行
      labelWidth: 80, //标签宽度
      placeholder: "请输入", //提示文字
      disabled: false,
    },
    // 其余的为可直接写在组件标签上的属性
    // clearable: true,
    required: true, //是否必填
    regExpObj: {}, // 正则校验规则
    limitLetter: false,
    minlength: null,
    maxlength: null,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-input",
      tagIcon: "textarea",
      title: "多行文本",
      label: "多行文本",
      defaultValue: undefined,
      ratioEntire: true,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    type: "textarea",
    autosize: {
      minRows: 4,
      maxRows: 4,
    },
    labelWidth: 80,
    placeholder: "请输入",
    clearable: true,
    readonly: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-input",
      tagIcon: "number",
      label: "数字",
      defaultValue: undefined,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入数字",
    clearable: true,
    readonly: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-input",
      tagIcon: "link1",
      label: "链接",
      defaultValue: undefined,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    clearable: true,
    readonly: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-time-picker",
      tagIcon: "time-range",
      label: "起止时间",
      defaultValue: undefined,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    clearable: true,
    readonly: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-time-picker",
      tagIcon: "time",
      label: "日期",
      defaultValue: undefined,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    clearable: true,
    readonly: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-input",
      tagIcon: "phone",
      label: "手机号码",
      defaultValue: undefined,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    clearable: true,
    readonly: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-input",
      tagIcon: "email",
      label: "邮箱",
      defaultValue: undefined,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    clearable: true,
    readonly: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-input",
      tagIcon: "radio",
      label: "单项选择",
      defaultValue: undefined,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    clearable: true,
    readonly: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-input",
      tagIcon: "checkbox",
      label: "多项选择",
      defaultValue: undefined,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    clearable: true,
    readonly: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    config: {
      tag: "el-input",
      tagIcon: "upload",
      label: "附件上传",
      defaultValue: undefined,
      required: false,
      // 正则校验规则
      regList: [],
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    clearable: true,
    readonly: false,
    disabled: false,
  },
];

export const selectComponents = [];

export const regularVerification = [
  {
    label: "字母",
    type: "letter",
    expression: `^[A-Za-z]+$`,
    tip: "请输入字母",
  },
  {
    label: "数字",
    type: "number",
    expression: `^-?(?!0\\d+)\\d+(\\.\\d+)?$`,
    tip: "请输入数字",
  },
  {
    label: "字母和数字",
    type: "letterAndNumber",
    expression: `^[A-Za-z0-9.]+$`,
    tip: "请输入字母和数字",
  },
  {
    label: "手机号码",
    type: "phoneNumber",
    expression: `^1[3-9]\\d{9}$`,
    tip: "请输入正确的手机号码",
  },
  {
    label: "座机",
    type: "linePhoneNumber",
    expression: `^(?:(?:\\d{3}-)?\\d{8}|^(?:\\d{4}-)?\\d{7,8})(?:-\\d+)?$`,
    tip: "请输入正确的座机号码",
  },
  {
    label: "邮政编码",
    type: "postalCode",
    expression: `^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\\d{4}$`,
    tip: "请输入正确的邮政编码",
  },
  {
    label: "身份证号",
    type: "IdNumber",
    expression: `(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}$)`,
    tip: "请输入正确的身份证号",
  },
  {
    label: "IPv4地址",
    type: "IPv4Address",
    expression: `^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`,
    tip: "请输入正确IP地址",
  },
  {
    label: "邮箱",
    type: "email",
    expression: `^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$`,
    tip: "请输入正确的邮箱",
  },
  {
    label: "链接",
    type: "link",
    expression: `^(https://www\\.|http://www\\.|https://|http://)?[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})(\\.[a-zA-Z0-9]{2,})?$`,
    tip: "请输入正确的链接",
  },
  {
    label: "货币金额",
    type: "monetaryAmount",
    expression: `^-?\\d+(,\\d{3})*(\\.\\d{1,2})?$`,
    tip: "请输入正确的货币金额",
  },
  {
    label: "自定义",
    type: "selfCustomize",
    expression: ``,
    tip: "",
  },
];
