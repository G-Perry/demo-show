<template>
  <section class="node_manual_setting">
    <div class="setting_classify">
      <span class="title">节点开始时间</span>
      <el-radio-group
        v-model="radio"
        class="radio_group"
        @input="radioGroupChange"
      >
        <el-radio label="0">立即执行</el-radio>
        <el-radio label="1"
          >到达该节点
          <template v-if="radio == '1'">
            <el-input
              v-model.number="hour"
              style="width: 120px; margin: 0 5px"
              size="mini"
              oninput="value=value.replace(/\D/g,'')"
            ></el-input
            >小时后触发
          </template>
        </el-radio>
        <el-radio label="2"
          >固定时间
          <template v-if="radio == '2'">
            <el-time-picker
              v-model="time"
              placeholder="请选择时间"
              value-format="HH:mm"
              format="HH:mm"
              size="mini"
              style="width: 150px"
            >
            </el-time-picker>
          </template>
        </el-radio>
      </el-radio-group>
    </div>
    <div class="setting_classify">
      <span class="title">执行方式(CMDB)</span>
      <el-radio-group v-model="autoSetting.invokeTarget" class="radio_group">
        <el-radio label="insertCMDB()">新增实例</el-radio>
        <el-radio label="updateCMDB()">更新实例</el-radio>
        <el-radio label="deleteCMDB()">删除实例</el-radio>
      </el-radio-group>
    </div>
    <div class="subSection">
      <div class="setting_classify">
        <span class="title">模型</span>
        <treeselect
          v-model="categoryId"
          :show-count="true"
          :disable-branch-nodes="true"
          :default-expand-level="2"
          :options="CMDBmodelTreeData"
          :normalizer="(node) => normalizer(node, 'categoryId', 'categoryName')"
          placeholder="请选择模型"
          @select="handleModelSelect"
          @input="handleModelInput"
        />
      </div>
      <div
        class="setting_classify"
        v-if="
          autoSetting.invokeTarget == 'updateCMDB()' ||
          autoSetting.invokeTarget == 'deleteCMDB()'
        "
      >
        <span class="title">筛选模型字段</span>
        <condition-unit
          ref="conditionUnit"
          v-model="autoSetting.invokeParam.filteringModelField"
          :leftTreeData="{
            data: CMDBprops,
            normalizer: (node) => normalizer(node, 'id', 'comment'),
          }"
          :middleTreeData="{
            data: [
              {
                name: '等于',
                propName: 'EQUALS',
              },
            ],
            normalizer: (node) => normalizer(node, 'propName', 'name'),
          }"
          :rightTreeData="{
            data: firstOptions,
            normalizer: (node) => normalizer(node, 'propName', 'name'),
          }"
          type="node_auto"
        ></condition-unit>
      </div>
      <div
        class="setting_classify"
        v-if="
          autoSetting.invokeTarget == 'insertCMDB()' ||
          autoSetting.invokeTarget == 'updateCMDB()'
        "
      >
        <span class="title">字段映射</span>
        <section
          v-for="(item, index) in fieldMappings"
          :key="index"
          class="field_mappings"
        >
          <field-mapping
            v-model="fieldMappings[index]"
            :firstOptions="firstOptions"
            :secondOptions="CMDBprops"
          ></field-mapping>
          <el-button
            type="text"
            icon="el-icon-circle-plus-outline"
            style="margin-left: 10px"
            @click="mapAdd"
          ></el-button>
          <el-button
            v-show="index > 0"
            type="text"
            icon="el-icon-remove-outline"
            @click="mapDel(item)"
          ></el-button>
        </section>
      </div>
      <div
        class="setting_classify"
        v-if="
          autoSetting.invokeTarget == 'updateCMDB()' ||
          autoSetting.invokeTarget == 'deleteCMDB()'
        "
      >
        <el-checkbox v-model="autoSetting.invokeParam.executeIfMoreThanOne"
          >筛选出多条是否执行</el-checkbox
        >
      </div>
    </div>
  </section>
</template>
    
    <script>
// import { listCategory } from "@/api/cmdb/category";
// import { listCmdbAttr } from "@/api/cmdb/cmdbAttr";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import fieldMapping from "./fieldMapping.vue";
import {
  autoOriginalConditionInfo,
  getFieldMappingTreeSelectOptions,
  normalizer,
} from "../confg";
import conditionUnit from "./conditionsUnit.vue";
import { deepClone } from "@/utils/index";

let CMDBmodelArr = [];
export default {
  props: ["settingInfo"],
  components: { Treeselect, fieldMapping, conditionUnit },
  data() {
    return {
      radio: "0",
      hour: null,
      time: null,
      categoryId: null,
      CMDBmodelTreeData: [],
      CMDBprops: [],
      fieldMappings: [
        {
          key: null,
          value: null,
        },
      ],
      firstOptions: getFieldMappingTreeSelectOptions(),
      autoSetting: {},
    };
  },
  watch: {
    settingInfo: {
      handler(val) {
        this.init(val);
      },
      immediate: true,
    },
    autoSetting: {
      handler(val) {
        this.$emit("settingChange", {
          nodeType: "auto",
          data: val,
        });
      },
      immediate: true,
      deep: true,
    },
    fieldMappings: {
      handler(val) {
        this.autoSetting.invokeParam.fieldsMapping = {};
        val.forEach((item) => {
          this.autoSetting.invokeParam.fieldsMapping[item.value] = item.key;
        });
      },
      deep: true,
    },
    hour: {
      handler: function (val) {
        this.autoSetting.execAfter = val + "";
      },
    },
    time: {
      handler: function (val) {
        this.autoSetting.execAfter = val;
      },
    },
  },
  methods: {
    init(val) {
      if (val) {
        this.autoSetting = val;
        if (this.autoSetting.execAfter == "0") {
          this.radio = "0";
          this.hour = null;
          this.time = null;
        } else if (this.autoSetting.execAfter.includes(":")) {
          this.radio = "2";
          this.hour = null;
          this.time = this.autoSetting.execAfter;
        } else {
          this.radio = "1";
          this.hour = this.autoSetting.execAfter;
          this.time = null;
        }
        this.categoryId = this.autoSetting.categoryId;
        // this.modelId = this.autoSetting.modelId;
        if (this.autoSetting.invokeParam.modelId) {
          this.getCMDBprops(this.autoSetting.invokeParam.modelId);
        }
        let obj = this.autoSetting.invokeParam.fieldsMapping;
        this.fieldMappings = [];
        if (JSON.stringify(obj) == "{}") {
          this.fieldMappings.push({
            key: null,
            value: null,
          });
        } else {
          for (let i in obj) {
            this.fieldMappings.push({
              key: obj[i],
              value: i == "null" ? null : i,
            });
          }
        }
      } else {
        this.autoSetting = {
          execType: "cmdb",
          execAfter: "0",
          invokeTarget: "insertCMDB()",
          categoryId: null,
          // modelId: null,
          invokeParam: {
            modelId: null,
            fieldsMapping: {},
            filteringModelField: autoOriginalConditionInfo,
            executeIfMoreThanOne: false,
          },
        };
      }
      // console.log(this.autoSetting);
    },
    // 获取树形目录
    getCategoryList() {
      CMDBmodelArr = [];
      this.CMDBmodelTreeData = [];
      // listCategory().then((response) => {
      //   CMDBmodelArr = response.data;
      //   this.CMDBmodelTreeData = this.handleTree(response.data, "categoryId");
      // });
    },
    /** 转换部门数据结构 */
    normalizer(node, id, label) {
      return normalizer(node, id, label);
    },
    getCMDBprops(ciId) {
      listCmdbAttr({ ciId }).then((res) => {
        if (res.code == 200) {
          this.CMDBprops = res.data;
        }
      });
    },
    handleModelSelect(node) {
      this.CMDBprops = [];
      let { mainModelId } = node || {};
      if (mainModelId == null) {
        this.$message.error("该类别未绑定模型。");
      } else {
        this.getCMDBprops(mainModelId);
      }
    },
    handleModelInput(categoryId) {
      this.CMDBprops = [];
      this.fieldMappings.forEach((item) => {
        item.value = null;
      });
      let modelId = CMDBmodelArr.find(
        (item) => item.categoryId == categoryId
      )?.mainModelId;
      this.autoSetting.categoryId = categoryId;
      this.autoSetting.invokeParam.modelId = modelId;
      this.autoSetting.invokeParam.filteringModelField =
        autoOriginalConditionInfo;
      if (this.$refs.conditionUnit) {
        this.$refs.conditionUnit.rootData = deepClone(
          autoOriginalConditionInfo
        );
      }
    },
    mapAdd() {
      this.fieldMappings.push({
        key: null,
        value: null,
      });
    },
    mapDel(item) {
      this.fieldMappings = this.fieldMappings.filter((obj) => obj !== item);
    },
    radioGroupChange(val) {
      if (val == "0") {
        this.autoSetting.execAfter = "0";
      } else {
        this.autoSetting.execAfter = "";
        this.hour = null;
        this.time = null;
      }
    },
  },
  mounted() {
    this.getCategoryList();
    // console.log(this.CMDBprops, 222);
  },
};
</script>
    
<style scoped>
.node_manual_setting {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 14px;
}
.setting_classify {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.setting_classify + .setting_classify {
  margin-top: 20px;
}
.setting_classify > .title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}
.radio_group {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
}
.subSection {
  padding-left: 20px;
  margin-top: 20px;
}
.field_mappings {
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
::v-deep .el-radio {
  height: 28px;
  line-height: 28px;
}
</style>