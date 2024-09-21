<template>
  <el-table :data="tableData">
    <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
    <el-table-column prop="victim_ip" label="IP" width="180">
      <template slot-scope="scope">
        <span class="ipClass">{{ scope.row.victim_ip }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="branch_name" label="XXXXX" width="180"></el-table-column>
    <el-table-column prop="address" label="XXXX">
      <template slot-scope="scope">
        <div
          style="
            display: flex;
            width: 100%;
            align-items: center;
            overflow: hidden;
          "
        >
          <template v-for="(item, index) in scope.row.tag">
            <div
              v-if="index < 3"
              :key="index"
              :class="{
                eventDesc: true,
                handled: item.status == '3',
              }"
              :title="
                item.status == '3'
                  ? item.event_desc + '  已完成'
                  : item.event_desc
              "
              style="overflow: hidden"
            >{{ item.event_desc }}</div>
          </template>
          <div v-if="scope.row.tag.length > 3">...</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="risk_level" label="XX等级" width="80" align="center">
      <template slot-scope="scope">
        <i
          class="icon-warning"
          :style="'font-size:14px;color:' + iconColorMap[scope.row.risk_level]"
        ></i>
        {{ riskLevelMap[scope.row.risk_level] }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["tableData"],
  data() {
    return {
      riskLevelMap: {
        1: "高",
        2: "中",
        3: "低",
      },
      iconColorMap: {
        1: "#ee5555",
        2: "#ff9900",
        3: "#4d8dd9",
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.ipClass {
  font-size: 12px;
  cursor: pointer;
  color: #1d39c4;
}
.eventDesc {
  width: fit-content;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  margin-right: 5px;
  box-sizing: border-box;
  background: #ffeded;
  color: #ee5555;
  border: 1px solid #ffcccc;
}
.handled {
  background: #f8f8f8;
  color: #999999;
  border: 1px solid #ddd;
}
</style>
