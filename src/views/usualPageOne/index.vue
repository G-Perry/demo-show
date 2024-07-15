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
}

::v-deep .el-table__body-wrapper {
  flex: 1;
  overflow-y: auto;
}
</style>


<!-- 

你好，这里是葛王华，今天摸鱼抽空把这个写一下。

    对于我一二月那会儿的迷惑操作向你道歉，希望不会对你后续的相亲造成排斥心理。
以下是我后续反思自省之后对当初迷惑操作的解释，我把整个10月到2月梳理了一下，把整个过程分割为：
    阶段一：十月份初识--“歧视”事件
    阶段二：断联的一个月
    阶段三：十二月中旬--一月你断崖式断联
    阶段四：一月中旬开的迷之操作--你单删

    简单描述下就是：
    阶段一：一个在恋爱方面心理年龄还很幼稚的男生，忽然转变思想接受相亲，跑上来遇到一个能看上眼的，
就使劲找你身上的优点、契合点，并因此逐渐上头。
    阶段二：并没有因断联而冷静，反而是自我洗脑、自我感动式持续上头
    阶段三：问题就出在这里，回顾起来这里思绪相当混乱。入局之后，并没有相关的经验，又不得其法，
反而急于求成疏忽边界感，同时潜意识将你抬高，心理上产生不安和自卑，越陷越深。
    很感谢你当时给了我第二次机会，不过当时自己并没有窥得全貌，给再多机会都没用。
    阶段末期你断崖式断联那会儿，有过一周时间缓冲，其实我已经有了心理准备。可还记得你给出祝福之后，
我曾邀请你复盘本次相亲，如果你当时能与我理性讨论交流，咱们大概率还能停留在朋友这一层关系，也就
没有之后的迷惑操作了。（这一点后续解释）
    阶段四：（这一段我都不想回忆，简直是黑历史，天知地知你知我知，当笑料就行别外传，谢谢了。）
为啥会这样呢，是因为你当时一言不发，我自己又没有外力指点破局，思维进了死胡同。当时你真的一句话
不说，我真的以为你给我屏蔽了。反正发啥你都不看，那我就心安理得地将你当个潜在的激励意象，当作磨
刀石罢了。（好尴尬啊，想想就想给自己一巴掌）



    以上大部分是表象，贯穿始终一直到现在的还有一条内在的线，那就是“意义”，我一直在寻找能够解释
你出现的意义，这也是阶段三末期和阶段四以及之后很长一段时间我思绪混乱、操作混乱和头疼的点。
    这边我采用“定果寻因”的方式来解释。
    问：我为什么执着于寻找所谓的意义？
    答：


-->
