<template>
  <div class="item_config">
    <section style="flex: 1; overflow: auto">
      <div class="config_title">{{ value.config.title }}</div>
      <div class="config_item">
        <div class="item_title">组件ID</div>
        <el-input size="small" v-model="value.id" disabled></el-input>
      </div>
      <div class="config_item">
        <div class="item_title">字段名</div>
        <el-input size="small" v-model="value.propName" disabled></el-input>
      </div>
      <div class="config_item">
        <div class="item_title">标签名</div>
        <el-input size="small" v-model="value.config.label"></el-input>
      </div>
      <div class="config_item">
        <div class="item_title">标签宽度(px)</div>
        <el-input
          size="small"
          v-model="value.config.labelWidth"
          oninput="value=value.replace(/[^\d]/g,'')"
        ></el-input>
      </div>
      <div class="config_item">
        <div class="item_title">提示</div>
        <el-input
          size="small"
          v-model="value.config.placeholder"
          placeholder="请输入提示内容"
        ></el-input>
      </div>
      <div class="config_item">
        <div class="item_title">默认内容</div>
        <el-input
          size="small"
          v-model="value.config.defaultValue"
          required
        ></el-input>
      </div>
      <div class="config_item">
        <div class="item_title">正则校验</div>
        <el-popover placement="bottom" width="360" trigger="click">
          <regular-verification
            v-model="value.regExpObj"
          ></regular-verification>
          <el-input
            slot="reference"
            size="small"
            :value="value.regExpObj.label"
            clearable
            @clear="value.regExpObj = {}"
          ></el-input>
        </el-popover>
      </div>
      <!-- <el-input size="small" v-model="aaa"></el-input>
      <el-input size="small" :value="aaa"></el-input> -->
      <div class="config_item">
        <div class="item_title">字段占比</div>
        <el-radio-group v-model="value.config.ratioEntire">
          <el-radio-button :label="false">50</el-radio-button>
          <el-radio-button :label="true">100</el-radio-button>
        </el-radio-group>
      </div>
      <div class="config_item">
        <div class="item_title">限制选项</div>
        <div class="item_checkbox">
          <el-checkbox v-model="value.required">必填</el-checkbox>
        </div>
        <div class="item_checkbox">
          <el-checkbox v-model="value.config.disabled">可编辑</el-checkbox>
        </div>
        <!-- <div class="item_checkbox">
          <el-checkbox v-model="checked">可见</el-checkbox>
          <el-input size="mini"></el-input>
        </div> -->
        <div class="item_checkbox">
          <el-checkbox v-model="value.limitLetter">限制字数</el-checkbox>
          <template v-if="value.limitLetter">
            <el-input size="mini" v-model="value.minlength"></el-input>
            ~
            <el-input size="mini" v-model="value.maxlength"></el-input>
          </template>
        </div>
        <!-- <div class="item_checkbox">
          <el-checkbox v-model="checked">是否生成知识</el-checkbox>
        </div> -->
      </div>
    </section>
    <!-- <section class="config_footer">
      <el-button size="mini">取消</el-button>
      <el-button type="primary" size="mini">保存</el-button>
    </section> -->
  </div>
</template>

<script>
import RegularVerification from "./regularVerification.vue";
export default {
  props: ["value"],
  components: { RegularVerification },
  watch: {
    value: {
      handler(val) {
        // console.log(this, 222111);

        this.$emit("input", val);
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      //   aaa: "",
      checked: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.item_config {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #333333;
}
.config_title {
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  height: 35px;
  line-height: 35px;
}
.config_item {
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
  padding: 0 10px;
}
.config_item + .config_item {
  margin-top: 10px;
}
.item_title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}
.radio_group {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
/* .config_footer {
  width: 100%;
  height: 36px;
  padding: 5px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
} */
.item_checkbox {
  width: 100%;
  height: 36px;
  line-height: 36px;
  display: flex;
  gap: 10px;
}
/* 双击出现阴影 */
::v-deep .el-radio-button {
  user-select: none;
  box-shadow: unset !important;
}
</style>