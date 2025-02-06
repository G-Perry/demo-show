<template>
  <section class="node_manual_setting">
    <div class="setting_classify">
      <span class="title">审批用户</span>
      <el-radio-group
        v-model="manualSetting.assigneeType"
        @change="radioGroupChange"
        class="radio_group"
      >
        <el-radio label="dept">按部门</el-radio>
        <el-radio label="user">按用户</el-radio>
        <!-- <el-radio label="group">按分组</el-radio> -->
      </el-radio-group>
    </div>
    <div class="setting_classify">
      <template v-if="manualSetting.assigneeType === 'dept'">
        <span class="title">请选择部门</span>
        <treeselect
          v-model="manualSetting.assigneeDept"
          :multiple="true"
          :flat="true"
          :default-expand-level="2"
          :options="deptOptions"
          :normalizer="normalizer"
          placeholder="选择上级部门"
        />
      </template>
      <template v-if="manualSetting.assigneeType === 'user'">
        <span class="title">请选择用户</span>
        <button
          type="button"
          class="btn btn_Cancel"
          @click="openUserSelectDrawer"
        >
          选择
        </button>
        <el-table :data="selectedUsers">
          <el-table-column label="编号" width="80" key="userId" prop="userId" />
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
          <el-table-column width="50" align="center" label="操作">
            <template slot-scope="scope">
              <i
                class="el-icon-delete del_icon"
                @click="selectedUserDelete(scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <user-select-drawer
          ref="userSelectDrawer"
          @confirmUserSelect="userSelect"
        >
        </user-select-drawer>
      </template>
      <template v-if="manualSetting.assigneeType === 'group'">
        <span class="title">请选择分组</span>
        <div style="color: red">暂时没做</div>
      </template>
    </div>
  </section>
</template>
  
  <script>
// import { listDept } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import userSelectDrawer from "./userSelectDrawer.vue";
export default {
  props: ["settingInfo"],
  components: { Treeselect, userSelectDrawer },
  watch: {
    settingInfo: {
      handler(val) {
        this.init(val);
      },
      immediate: true,
    },
    // deptIds: {
    //   handler(val) {
    //     this.manualSetting.approvalAssigneeId = val;
    //   },
    // },
    selectedUsers: {
      handler(val) {
        this.manualSetting.assigneeId = val.map((item) => item.userId);
        this.manualSetting.userList = JSON.stringify(val);
      },
      deep: true,
    },
    manualSetting: {
      handler(val) {
        this.$emit("settingChange", {
          nodeType: "manual",
          data: val,
        });
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      // 部门树选项
      deptOptions: [],
      // 选中的部门id
      // deptIds: [],

      selectedUsers: [],

      manualSetting: {},
    };
  },
  methods: {
    init(val) {
      if (val) {
        this.manualSetting = val;
        if (val.assigneeType == "dept") {
          this.deptIds = val.approvalAssigneeId;
        } else if (val.assigneeType == "user") {
          this.selectedUsers = JSON.parse(val.userList);
        }
      } else {
        this.manualSetting = {
          assigneeType: "dept", //dept user group
          // approvalAssigneeId: [],
          assigneeId: [],
          assigneeDept: [],
          assigneeGroup: [],
          userList: "",
        };
      }
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children,
      };
    },
    getTreeData() {
      // listDept().then((response) => {
      //   this.deptOptions = this.handleTree(response.data, "deptId");
      // });
    },
    openUserSelectDrawer() {
      let that = this.$refs.userSelectDrawer;
      that.open(this.selectedUsers);
    },
    userSelect(data) {
      this.selectedUsers = data;
    },
    selectedUserDelete(row) {
      this.selectedUsers = this.selectedUsers.filter(
        (item) => item.userId !== row.userId
      );
    },
    radioGroupChange() {
      // this.deptIds = [];
      this.selectedUsers = [];
      this.manualSetting.assigneeId = [];
      this.manualSetting.assigneeDept = [];
      this.manualSetting.assigneeGroup = [];
    },
  },
  mounted() {
    this.getTreeData();
  },
};
</script>
  
  <style scoped>
.node_manual_setting {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
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
  gap: 10px;
}
.del_icon {
  cursor: pointer;
}
.del_icon:hover {
  color: red;
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