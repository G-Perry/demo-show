<template>
  <div class="son_fit_father">
    <span class="pageTitle">页面标题</span>
    <top-search
      :searchConfig="searchConfig"
      @handleSearch="handleSearch"
      @handleRefresh="handleRefresh"
      bottom-border
    ></top-search>
    <section class="table_up_btns">
      <button class="hover_blue_btn" @click="handleAddDialogOpen">
        <i class="el-icon-circle-plus"></i>
        <span>新增</span>
      </button>
      <div class="line"></div>
      <button
        class="hover_blue_btn"
        :disabled="single"
        @click="handleEditDialogOpen"
      >
        <i class="el-icon-edit" style="font-weight: 600"></i>
        <span>修改</span>
      </button>
      <div class="line"></div>
      <button
        class="hover_blue_btn"
        :disabled="multiple"
        @click="handleStatusChange('on')"
      >
        <i class="el-icon-check" style="font-weight: 600"></i>
        <span>启用</span>
      </button>
      <div class="line"></div>
      <button
        class="hover_blue_btn"
        :disabled="multiple"
        @click="handleStatusChange('off')"
      >
        <i class="el-icon-close" style="font-weight: 600"></i>
        <span>禁用</span>
      </button>
      <div class="line"></div>
      <button class="hover_blue_btn" :disabled="multiple" @click="handleDelete">
        <i class="el-icon-delete-solid"></i>
        <span>删除</span>
      </button>
    </section>
    <el-table
      :data="tableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      height="0"
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
      <el-table-column label="操作" width="80" align="center" fixed="right">
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
    <div ref="pagination-bar" class="bottom_pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="queryParams.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryParams.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="total"
      ></el-pagination>
    </div>
    <addOrEditDialog ref="addOrEditDialog"></addOrEditDialog>
  </div>
</template>

<script>
import {
  getUserList,
  updateUserStatusById,
  getUserDetailsById,
  userDeleteById,
} from "@/api/index";
import addOrEditDialog from "./addOrEditDialog.vue";
import { commonCURD } from "./commonCURD";
export default {
  mixins: [commonCURD],
  components: {
    addOrEditDialog,
  },
  data() {
    return {
      // 请求参数
      queryParams: {},
      // 顶部搜索表单配置
      searchConfig: [
        { name: "AAA", key: "aaa", type: "input" },
        { name: "BBBbbbBBB", key: "bbb", type: "input" },
        {
          name: "CCC",
          key: "ccc",
          type: "select-filter",
          list: [],
        },
        {
          name: "DDDdddDDD",
          key: "ddd",
          type: "select-filter",
          list: [],
        },
        { name: "EEE", key: "eee", type: "input" },
        { name: "FFF", key: "fff", type: "input" },
        { name: "GGGgggGGG", key: "ggg", type: "input" },
        { name: "HHH", key: "hhh", type: "date" },
        { name: "III", key: "iii", type: "input" },
        { name: "JJJ", key: "jjj", type: "input" },
        {
          name: "KKK",
          key: "kkk",
          type: "select",
          list: [],
        },
        {
          name: "LLL",
          key: "lll",
          type: "select",
          list: [],
        },
        {
          name: "MMM",
          key: "mmm",
          type: "select",
          list: [],
        },
      ],
    };
  },
  filters: {
    sexMatch(sexNum) {
      return sexNum == 1 ? "男" : "女";
    },
  },
  methods: {
    resetQueryParams() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 20,
        aaa: undefined,
        bbb: undefined,
        ccc: undefined,
        ddd: undefined,
        eee: undefined,
        fff: undefined,
        ggg: undefined,
        hhh: undefined,
        iii: undefined,
        jjj: undefined,
        kkk: undefined,
        lll: undefined,
        mmm: undefined,
      };
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
    handleAddDialogOpen() {
      this.$refs.addOrEditDialog.reset();
      this.$refs.addOrEditDialog.address = [];
      this.$refs.addOrEditDialog.dialogTitle = "新增";
      this.$refs.addOrEditDialog.dialogVisible = true;
    },
    handleEditDialogOpen(row) {
      this.$refs.addOrEditDialog.reset();
      const id = row.id || this.ids[0];
      getUserDetailsById(id).then((res) => {
        if (res.code == 200) {
          this.$refs.addOrEditDialog.dialogTitle = "修改";
          this.$refs.addOrEditDialog.form = res.row;
          this.$refs.addOrEditDialog.address = res.row.address.split(" ");
          this.$refs.addOrEditDialog.dialogVisible = true;
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
  },
  created() {
    this.searchConfig.forEach((item) => {
      item.key == "ddd" &&
        (item.list = [
          {
            label: "已完善",
            value: true,
          },
          {
            label: "未完善",
            value: false,
          },
        ]);
      item.key == "ccc" &&
        (item.list = [
          {
            label: "111111",
            value: 1,
          },
          {
            label: "222222",
            value: 2,
          },
          {
            label: "333333",
            value: 2,
          },
        ]);
    });
    this.idName = "id";
    this.getListApi = getUserList;
    this.getDetailsById = getUserDetailsById;
    this.deleteApi = userDeleteById;
    this.resetQueryParams();
    this.getList();
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

.table_up_btns {
  width: 100%;
  height: 36px;
  line-height: 36px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.bottom_pagination {
  height: 36px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

::v-deep .cell:empty::before {
  content: "-";
  color: gray;
}

::v-deep .el-table {
  display: flex;
  flex-direction: column;
  min-height: 36px;
}

::v-deep .el-table__body-wrapper {
  flex: 1;
  overflow-y: auto;
}
</style>