<template>
  <div class="son_fit_father goldenEyeSearch">
    <el-select
      size="small"
      v-model="search_type"
      style="width: 20%;"
      @change.once="goldSelectChange"
    >
      <el-option label="XXXXXXXXXX" :value="1"></el-option>
      <el-option label="通信对" :value="2"></el-option>
    </el-select>
    <div class="second_row">
      <section style="flex: 1;">
        <!-- size="medium " -->
        <el-input
          v-if="search_type == '1'"
          placeholder="请输入XXXXXXXXXX"
          v-model="search_str"
          @keyup.enter.native="pageToGoldEye"
        ></el-input>
        <section
          v-else
          style="
          display: flex;
          align-items: center;
          font-size: 16px;
          "
        >
          <span>源：</span>
          <el-popover placement="bottom" trigger="click" width="600">
            <div
              style="
              display: flex;
              align-items: center;
              width: 100%;
              font-size: 12px;
            "
            >
              <span>源：</span>
              <el-select
                size="small"
                v-model="source_select"
                style="width: 30%"
                @change="ipOrAssetSelectChange($event, 'src')"
              >
                <el-option label="IP" :value="1"></el-option>
                <el-option label="全部资产" :value="2"></el-option>
              </el-select>
              <div style="width: 60%; margin: 0 5px">
                <el-input
                  size="small"
                  placeholder="请输入IP"
                  v-model="src_ip"
                  v-if="source_select == 1"
                ></el-input>
                <el-popover
                  placement="bottom"
                  width="230"
                  trigger="click"
                  popper-class="popper_class"
                  v-else
                >
                  <v-jstree v-if="treeData.length !== 0" :data="treeData" :show-checkbox="false">
                    <template slot-scope="_">
                      <div
                        style="display: inherit; width: 200px"
                        @click="handleTreeSelectClick(_.model, 'src')"
                      >{{ _.model.label }}</div>
                    </template>
                  </v-jstree>
                  <!-- <el-input size="small" slot="reference" v-model="src_asset_select.label"></el-input> -->
                  <el-input size="small" slot="reference" :value="src_asset_select.label"></el-input>
                </el-popover>
              </div>
            </div>
            <el-input style="width: 300px;" v-model="src_total_msg" slot="reference"></el-input>
          </el-popover>

          <span style="display: inline-block; width: fit-content; white-space: nowrap">目标：</span>
          <el-popover placement="bottom" trigger="click" width="600">
            <div
              style="
              display: flex;
              align-items: center;
              width: 100%;
              font-size: 12px;
            "
            >
              <span>目标：</span>
              <el-select
                size="small"
                v-model="target_select"
                style="width: 30%"
                @change="ipOrAssetSelectChange($event, 'target')"
              >
                <el-option label="IP/域名/URL" :value="1"></el-option>
                <el-option label="全部资产" :value="2"></el-option>
              </el-select>
              <div style="width: 40%; margin: 0 5px">
                <el-input
                  size="small"
                  placeholder="请输入IP"
                  v-model="target_ip"
                  v-if="target_select == 1"
                ></el-input>
                <el-popover
                  placement="bottom"
                  width="230"
                  trigger="click"
                  popper-class="popper_class"
                  v-else
                >
                  <v-jstree v-if="treeData.length !== 0" :data="treeData" :show-checkbox="false">
                    <template slot-scope="_">
                      <div
                        style="display: inherit; width: 200px"
                        @click="handleTreeSelectClick(_.model, 'target')"
                      >{{ _.model.label }}</div>
                    </template>
                  </v-jstree>
                  <!-- <el-input size="small" slot="reference" v-model="target_asset_select.label"></el-input> -->
                  <el-input size="small" slot="reference" :value="target_asset_select.label"></el-input>
                </el-popover>
              </div>
              <el-input size="small" placeholder="端口" style="width: 15%" v-model="target_port"></el-input>
            </div>
            <el-input style="width: 300px;" v-model="target_total_msg" slot="reference"></el-input>
            <!-- <el-input style="width: 300px;" :value="target_total_msg" slot="reference"></el-input> -->
          </el-popover>
        </section>
      </section>
      <el-button
        type="primary"
        style="width: 130px;height: 50px;font-size: 17px;"
        class="blue_btn"
      >确定</el-button>
      <!-- style="width: 130px;height: 50px;font-size: 17px;background: #3e68ef;border: none;" -->
    </div>
  </div>
</template>

<script>
// import { getDeptTreeData } from "@/api/handleCenter.js";
import VJstree from "vue-jstree";
import treeData from "./treeData";

export default {
  components: {
    VJstree,
  },
  data() {
    return {
      search_type: 1, //是否通信对
      treeData: [], //资产树
      source_select: 1, //源 选择项：ip或资产
      src_ip: "",
      src_asset_select: {},
      src_asset_select_label: "",
      target_select: 1, //目标 选择项：ip或资产
      target_ip: "",
      target_asset_select: {},
      target_asset_select_label: "",
      target_port: "",
      search_str: "",
    };
  },
  computed: {
    src_total_msg: {
      get() {
        return this.src_ip + this.src_asset_select_label;
      },
      set(value) {},
    },
    target_total_msg: {
      get() {
        return (
          this.target_ip +
          this.target_asset_select_label +
          (this.target_port !== "" ? ":" + this.target_port : "")
        );
      },
      set(value) {},
    },
  },
  methods: {
    getTreeData() {
      // this.treeData = [];
      // getDeptTreeData(this.deptName).then((res) => {
      // res.data[0].id = 0;
      // this.treeData = res.data;
      // this.src_asset_select = res.data[0];
      // this.target_asset_select = res.data[0];
      this.treeData = treeData;
      this.src_asset_select = treeData[0];
      this.target_asset_select = treeData[0];
      // });
    },
    goldSelectChange(sign) {
      if (sign == 2) {
        this.getTreeData();
      }
    },
    handleTreeSelectClick(item, str) {
      if (str == "src") {
        this.src_asset_select = item;
        this.src_asset_select_label = item.label;
      } else if (str == "target") {
        this.target_asset_select = item;
        this.target_asset_select_label = item.label;
      }
    },
    ipOrAssetSelectChange(sign, fromWhere) {
      if (fromWhere == "src") {
        if (sign == 2) {
          this.src_ip = "";
        } else {
          this.src_asset_select_label = "";
        }
      } else if (fromWhere == "target") {
        if (sign == 2) {
          this.target_ip = "";
        } else {
          this.target_asset_select_label = "";
        }
      }
    },
    pageToGoldEye() {
      let data = {
        source_select: this.source_select,
        search_type: this.search_type,
        src_ip: this.src_ip,
        src_asset_select: this.src_asset_select,
        target_select: this.target_select,
        target_ip: this.target_ip,
        target_asset_select: this.target_asset_select,
        target_port: this.target_port,
        search_str: this.search_str,
      };
      this.$router.push({
        path: "/goldeneye/index",
        query: { data: JSON.stringify(data), fromWhere: "index" },
      });
    },
  },
  mounted() {
    // let a = [];
    // for (let i = 0; i < 100; i++) {
    //   a.push({
    //     id: i,
    //     label: Mock.Random.string("壹贰叁肆伍陆柒捌玖拾", 3, 10),
    //   });
    // }
    // console.log(treeData,a);
  },
};
</script>

<style scoped>
::v-deep .el-input__inner {
  height: 50px;
  line-height: 50px;
  background: #f9f9fa;
  border-radius: 6px;
}
/* ::v-deep .el-button--primary:focus,
.el-button--primary:hover {
  background: #537afc !important;
} */
.goldenEyeSearch {
  justify-content: center;
}
.second_row {
  display: flex;
  align-items: center;
  /* padding: 0 10px; */
  box-sizing: border-box;
  margin-top: 16px;
}
::v-deep .tree-children,
.tree-container-ul,
.tree-node {
  overflow-x: visible;
  overflow-y: clip;
}
.blue_btn {
  background: #295bf9;
  border: none;
}
.blue_btn:focus:not(button[disabled]) {
  background: #295bf9;
}

.blue_btn:hover:not(button[disabled]) {
  transition: all 500ms;
  background: #4a74ff;
}

.blue_btn:active:not(button[disabled]) {
  background: #1647e6;
}
</style>
<style>
.popper_class {
  min-height: 200px;
  max-height: 300px;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
