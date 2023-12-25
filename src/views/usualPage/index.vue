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
          <el-input v-model="queryParams.condition_one" placeholder="请输入条件一"></el-input>
        </el-form-item>
        <el-form-item label="条件二">
          <el-select v-model="queryParams.condition_two" placeholder="请选择条件二">
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
        <button class="button plain-btn" style="height: 24px" @click="handleTest">
          <span>重置</span>
        </button>
      </div>
    </section>
    <section class="table_up_btns">
      <button class="hover_blue_btn">
        <i class="el-icon-circle-plus"></i>
        新增
      </button>
      <div class="line"></div>
      <button class="hover_blue_btn" :disabled="single">
        <i class="el-icon-edit" style="font-weight:600"></i>
        修改
      </button>
      <div class="line"></div>
      <button class="hover_blue_btn" :disabled="multiple">
        <i class="el-icon-check" style="font-weight:600"></i>
        启用
      </button>
      <div class="line"></div>
      <button class="hover_blue_btn" :disabled="multiple">
        <i class="el-icon-close" style="font-weight:600"></i>
        禁用
      </button>
      <div class="line"></div>
      <button class="hover_blue_btn" :disabled="multiple">
        <i class="el-icon-delete-solid"></i>
        删除
      </button>
    </section>
    <div class="son_fit" style="position: relative;">
      <el-table :data="tableData" :height="tableHeight" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <div ref="pagination-bar" class="footer-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20,  50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      // 请求参数
      queryParams: {
        condition_one: "",
        condition_two: "",
        time_range: {
          time_range_type: "last30d",
        },
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
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      // this.ids = selection.map((item) => item.id);
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
      this.queryParams.limit = pageSize;
      // this.getList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.queryParams.page = currentPage;
      // this.getList();
    },
    setTableHeight() {
      this.tableHeight = 0;
      this.$nextTick(() => {
        this.tableHeight = this.$refs["pagination-bar"].offsetTop;
      });
    },
    handleTest() {
      console.log(this.multiple, "multiple");
      console.log(this.single, "single");
    },
  },
  mounted() {
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