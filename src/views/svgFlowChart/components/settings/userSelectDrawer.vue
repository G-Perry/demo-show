<template>
  <el-drawer
    title="用户选择"
    append-to-body
    :visible.sync="visible"
    :with-header="false"
    size="38%"
  >
    <div class="drawer_content">
      <el-form
        :model="queryParams"
        ref="queryForm"
        size="small"
        class="search_form"
        label-position="top"
      >
        <el-form-item label="部门" prop="userName">
          <treeselect
            v-model="queryParams.deptId"
            :default-expand-level="2"
            :options="$parent.deptOptions"
            :normalizer="$parent.normalizer"
            placeholder="选择上级部门"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入用户名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
          ></el-button>
        </el-form-item>
      </el-form>

      <el-table
        ref="table"
        :data="tableData"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        v-model="selectedData"
        row-key="userId"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
          :reserve-selection="true"
        />
        <el-table-column label="用户编号" key="userId" prop="userId" />
        <el-table-column
          label="用户名称"
          prop="userName"
          show-overflow-tooltip
        />
        <el-table-column
          label="用户昵称"
          prop="nickName"
          show-overflow-tooltip
        />
        <el-table-column
          label="部门"
          prop="dept.deptName"
          show-overflow-tooltip
        />
      </el-table>
      <section class="footer_pagination">
        <section>
          <button
            style="height: 30px"
            type="button"
            class="btn btn_Confirm"
            @click="handleConfirm"
          >
            确定
          </button>
          <button
            style="height: 30px"
            type="button"
            class="btn btn_Cancel"
            @click="close"
          >
            取消
          </button>
        </section>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="queryParams.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryParams.pageSize"
          layout="total, prev, pager, next, sizes"
          :total="total"
        ></el-pagination>
      </section>
    </div>
  </el-drawer>
</template>

<script>
// import { listUser } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: { Treeselect },
  data() {
    return {
      visible: false,
      //   visible: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        deptId: undefined,
      },
      loading: true,
      total: 0,
      tableData: [],
      selectedData: [],
    };
  },
  methods: {
    // 查询分页相关
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    handleSizeChange(size) {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = size;
      this.getList();
    },
    handlePageChange(page) {
      this.queryParams.pageNum = page;
      this.getList();
    },
    getList() {
      this.loading = true;
      // listUser(this.queryParams).then((res) => {
      //   this.tableData = res.rows;
      //   this.total = res.total;
      //   this.loading = false;
      // });
    },
    handleSelectionChange(selection) {
      this.selectedData = selection;
    },
    handleConfirm() {
      this.$emit("confirmUserSelect", this.selectedData);
      this.close();
    },
    open(haveSelectedData) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.table.clearSelection();
        if (haveSelectedData.length > 0) {
          haveSelectedData.forEach((item) => {
            this.$refs.table.toggleRowSelection(item);
          });
        }
        this.getList();
      });
    },
    close() {
      this.visible = false;
    },
  },
  created() {},
};
</script>

<style scoped>
.drawer_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
::v-deep .el-form-item__label {
  padding: 0;
}
.search_form {
  padding: 20px 20px 0;
  display: flex;
  align-items: flex-end;
}
.search_form > div:nth-child(1),
.search_form > div:nth-child(2) {
  flex: 1;
}
::v-deep .vue-treeselect__control {
  height: 32px;
  background-color: #f4f5f9;
}
.footer_pagination {
  height: 40px;
  border-bottom: 1px solid #e6ebf5;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>