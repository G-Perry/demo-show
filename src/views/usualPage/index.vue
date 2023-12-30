<template>
  <div class="son_fit_father">
    <span class="pageTitle">页面标题</span>
    <section class="search_bar">
      <el-form
        ref="form"
        :model="queryParams"
        :inline="true"
        label-width="80px"
        label-position="top"
      >
        <el-form-item label="条件一">
          <el-input
            v-model="queryParams.condition_one"
            placeholder="请输入条件一"
          ></el-input>
        </el-form-item>
        <el-form-item label="条件二">
          <el-select
            v-model="queryParams.condition_two"
            placeholder="请选择条件二"
          >
            <el-option label="AAA" value="shanghai"></el-option>
            <el-option label="BBB" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围" style="width: 220px">
          <el-select
            v-if="queryParams.time_range.time_range_type !== 'custom_time'"
            v-model="queryParams.time_range.time_range_type"
            placeholder="请选择"
            @change="handleselectChange"
          >
            <el-option
              v-for="item in timeRangeMap"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker
            v-else
            ref="el_date_picker"
            v-model="dataRange"
            type="daterange"
            range-separator="至"
            style="width: 220px"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div>
        <button class="button blue_btn" style="height: 24px">
          <span>查询</span>
        </button>
        <button
          class="button plain-btn"
          style="height: 24px"
          @click="handleTest"
        >
          <span>重置</span>
        </button>
      </div>
    </section>
    <section class="table_up_btns">
      <button class="hover_blue_btn" @click="handleAddDialogOpen">
        <i class="el-icon-circle-plus"></i>
        新增
      </button>
      <div class="line"></div>
      <button
        class="hover_blue_btn"
        :disabled="single"
        @click="handleEditDialogOpen"
      >
        <i class="el-icon-edit" style="font-weight: 600"></i>
        修改
      </button>
      <div class="line"></div>
      <button
        class="hover_blue_btn"
        :disabled="multiple"
        @click="handleStatusChange('on')"
      >
        <i class="el-icon-check" style="font-weight: 600"></i>
        启用
      </button>
      <div class="line"></div>
      <button
        class="hover_blue_btn"
        :disabled="multiple"
        @click="handleStatusChange('off')"
      >
        <i class="el-icon-close" style="font-weight: 600"></i>
        禁用
      </button>
      <div class="line"></div>
      <button class="hover_blue_btn" :disabled="multiple" @click="handleDelete">
        <i class="el-icon-delete-solid"></i>
        删除
      </button>
    </section>
    <div class="son_fit" style="position: relative">
      <el-table
        :data="tableData"
        :height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="40"
          align="center"
        ></el-table-column>
        <!-- <el-table-column type="index" width="50" label="序号" align="center"></el-table-column> -->
        <el-table-column
          width="50"
          label="序号"
          align="center"
          prop="index"
        ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">{{ scope.row.sex | sexMatch }}</template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="birth" label="出生日期"></el-table-column>
        <el-table-column
          prop="identityCard"
          show-overflow-tooltip
          label="身份证"
        ></el-table-column>
        <el-table-column prop="phoneNum" label="电话号码"></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          min-width="300"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="status" width="90" label="状态">
          <template slot-scope="scope">
            <!-- <common-button></common-button> -->
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusSwitchChange(scope.row)"
            ></el-switch>
            <!-- <el-switch v-model="scope.row.status | statusMatch"></el-switch> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <button
              class="btn_in_table"
              title="修改"
              @click="handleEditDialogOpen(scope.row)"
            >
              <i class="el-icon-edit"></i>
            </button>
            <button
              class="btn_in_table"
              title="删除"
              @click="handleDelete(scope.row)"
            >
              <i class="el-icon-delete"></i>
            </button>
          </template>
        </el-table-column>
      </el-table>
      <div ref="pagination-bar" class="footer-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <add-edit-dialog ref="addEditDialog"></add-edit-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  updateUserStatusById,
  getUserDetailsById,
  userDeleteById,
} from "@/api/index";
import commonButton from "@/components/commonButton.vue";
import addEditDialog from "./addEditDialog.vue";
export default {
  components: {
    commonButton,
    addEditDialog,
  },
  data() {
    let that = this;
    return {
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 表格数据
      tableData: [],
      // 请求参数
      queryParams: {
        condition_one: "",
        condition_two: "",
        time_range: {
          time_range_type: "last30d",
        },
        pageNum: 1,
        pageSize: 20,
      },
      // 表格高度
      tableHeight: 0,
      // 分页相关
      total: 0,
      currentPage: 1,
      pageSize: 20,
      // 用于处理日期选择
      timeRangeMap: [
        { label: "最近1个月", value: "last30d" },
        { label: "最近7天", value: "last7d" },
        { label: "最近1天", value: "last24h" },
        { label: "自定义", value: "custom_time" },
      ],
      dataRange: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近1个月",
            onClick() {
              that.queryParams.time_range.time_range_type = "last30d";
              that.dataRange = [];
            },
          },
          {
            text: "最近7天",
            onClick() {
              that.queryParams.time_range.time_range_type = "last7d";
              that.dataRange = [];
            },
          },
          {
            text: "最近1天",
            onClick() {
              that.queryParams.time_range.time_range_type = "last24h";
              that.dataRange = [];
            },
          },
          {
            text: "自定义",
            onClick() {
              that.queryParams.time_range.time_range_type = "custom_time";
            },
          },
        ],
      },
    };
  },
  filters: {
    sexMatch(sexNum) {
      return sexNum == 1 ? "男" : "女";
    },
  },
  methods: {
    getList() {
      this.loading = true;
      this.tableData = [];
      getUserList(this.queryParams).then((res) => {
        if (res.code == 200) {
          console.log(res.rows);
          this.tableData = res.rows;
          this.total = res.total;
          this.loading = false;
        }
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 处理时间选择器的切换
    handleselectChange(val) {
      if (val == "custom_time") {
        this.$nextTick(() => {
          this.$refs.el_date_picker.focus();
        });
      }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.queryParams.pageSize = pageSize;
      this.currentPage = 1;
      this.queryParams.pageNum = 1;
      this.getList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.queryParams.pageNum = currentPage;
      this.getList();
    },
    // 表格高度自适应
    setTableHeight() {
      this.tableHeight = 0;
      this.$nextTick(() => {
        this.tableHeight = this.$refs["pagination-bar"].offsetTop;
      });
    },
    handleStatusChange(sign) {
      this.$confirm(
        "此操作将 " + (sign == "off" ? "禁用" : "启用") + " 账号, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let data = {
            id: this.ids,
            status: sign == "off" ? 0 : 1,
          };
          updateUserStatusById(data).then((res) => {
            res.code == 200 && this.getList();
          });
          this.$message({
            type: "success",
            message: "操作成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
    handleDelete(row) {
      this.$confirm("此操作将删除账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const id = row.id || this.ids;
          userDeleteById(id).then((res) => {
            res.code == 200 && this.getList();
          });
          this.$message({
            type: "success",
            message: "操作成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
    handleAddDialogOpen() {
      this.$refs.addEditDialog.dialogTitle = "新增";
      this.$refs.addEditDialog.form = {
        name: "",
        sex: 1,
        birth: "",
        address: "",
        identityCard: "",
        phoneNum: "",
        status: 1,
      };
      this.$refs.addEditDialog.address = [];
      this.$refs.addEditDialog.dialogVisible = true;
      // 再次打开时去除表单校验
      this.$refs.addEditDialog.$nextTick(() => {
        this.$refs.addEditDialog.$refs.form.clearValidate();
      });
    },
    handleEditDialogOpen(row) {
      const id = row.id || this.ids[0];
      getUserDetailsById(id).then((res) => {
        if (res.code == 200) {
          this.$refs.addEditDialog.dialogTitle = "修改";
          this.$refs.addEditDialog.form = res.row;
          this.$refs.addEditDialog.address = res.row.address.split(" ");
          this.$refs.addEditDialog.dialogVisible = true;
        }
      });
    },
    handleStatusSwitchChange(row) {
      this.$confirm(
        "此操作将" +
          (row.status == 0 ? "禁用 " : "启用 ") +
          row.name +
          " 的账号, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let data = {
            id: [row.id],
            status: row.status == 0 ? 0 : 1,
          };
          updateUserStatusById(data).then((res) => {
            res.code == 200 && this.getList();
          });
          this.$message({
            type: "success",
            message: "操作成功",
          });
        })
        .catch(() => {
          row.status = row.status == 0 ? 1 : 0;
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
    handleTest() {
      console.log(this.multiple, "multiple");
      console.log(this.single, "single");
    },
  },
  mounted() {
    this.getList();
    this.setTableHeight();
    window.addEventListener("resize", this.setTableHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setTableHeight);
  },
};
</script>

<style scoped>
.pageTitle {
  display: block;
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;
  padding: 0 20px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}

.search_bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}

.table_up_btns {
  width: 100%;
  height: 36px;
  line-height: 36px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
</style>