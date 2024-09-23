<template>
  <section v-if="tableIsShow">
    <el-table :data="tableData">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="id" label="id" show-overflow-tooltip></el-table-column>
      <el-table-column
        v-for="item in tableColumnSetting"
        :key="item.key"
        :label="item.label"
        :prop="item.propName"
      >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.editable"
            v-model="scope.row[item.propName]"
            :class="{'noInput':scope.row.noInput&&scope.row[item.propName]==''}"
            @focus="scope.row.noInput=false"
            style="width: 80%;"
          ></el-input>
          <span v-else>{{ scope.row[item.propName] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" v-if=" scope.row.editable" @click="handleConfirm(scope.row)">确定</el-button>
          <!-- <template> -->
          <el-button v-else type="text" @click="handleEdit(scope.row)">修改</el-button>
          <!-- </template> -->
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { UUID } from "../../../utils/handleObjMethods";

export default {
  props: {
    value: {},
    columnInfo: {
      type: Array,
      default: [],
      required: true,
    },
  },
  data() {
    return {
      tableIsShow: false,
      tableColumnSetting: [],
      tableData: [],
      dataFormat: {},
    };
  },
  watch: {
    // 用于外部数据的双向绑定
    tableData: {
      deep: true,
      immediate: true,
      handler: function (newVal) {
        let arr = newVal.map((item) => {
          if (!item.editable) {
            let { id, editable, noInput, ...res } = item;
            return res;
          } else {
            return null;
          }
        });
        this.$emit(
          "input",
          arr.filter((item) => item)
        );
      },
    },
  },
  methods: {
    // 初始化表格列信息和每条数据的格式
    init() {
      this.tableColumnSetting = [];
      this.tableData = [];
      this.dataFormat = {};
      this.tableColumnSetting = this.columnInfo.map((item) => {
        return {
          key: UUID(),
          ...item,
        };
      });
      this.columnInfo
        .map((item) => {
          return item.propName;
        })
        .forEach((item) => {
          this.dataFormat[item] = "";
        });
    },
    addTableData() {
      this.tableData.push({
        id: UUID(),
        editable: true,
        noInput: false,
        ...this.dataFormat,
      });
    },
    // 新增一条数据
    addNewItem() {
      if (this.tableIsShow == false) {
        this.tableIsShow = true;
        this.$nextTick(() => {
          this.addTableData();
        });
      } else {
        if (this.handleConfirm()) {
          this.addTableData();
        }
      }
    },
    // 必填校验
    handleConfirm(row) {
      if (this.tableData.length === 0) return true;
      let fromWhere = row == undefined; //判断是来自外面true还是表格false
      if (fromWhere) {
        row = this.tableData.slice(-1)[0];
      }
      let noEmptyInput = Object.keys(this.dataFormat).every((item) => {
        return row[item] !== "";
      });
      if (noEmptyInput) {
        row.noInput = false;
        row.editable = false;
      } else {
        row.noInput = true;
      }
      return noEmptyInput;
    },
    // 编辑
    handleEdit(row) {
      row.editable = true;
    },
    // 删除
    handleDelete(row) {
      this.tableData = this.tableData.filter((item) => item.id != row.id);
      if (this.tableData.length == 0) this.tableIsShow = false;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped>
::v-deep .el-table .el-table__cell {
  padding: 5px 0;
}
::v-deep .noInput > .el-input__inner {
  border-color: red;
}
::v-deep .el-table__header .el-table__cell {
  font-size: 14px;
  font-weight: 500;
}
</style>