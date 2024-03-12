<template>
  <el-table :data="tableData">
    <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
    <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
    <el-table-column prop="type" label="类型" width="80">
      <template slot-scope="scope">{{ typeMap[scope.row.type] }}</template>
    </el-table-column>
    <el-table-column prop="createTime" label="时间" width="180"></el-table-column>
    <el-table-column label="操作" width="80">
      <template slot-scope="scope">
        <span style="color: #4677c6; cursor: pointer" @click="handleDownload(scope.row)">操作</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["tableData"],
  data() {
    return {
      typeMap: {
        1: "类型一",
        2: "类型二",
        3: "类型三",
      },
    };
  },
  methods: {
    handlePageChange(row) {
      row;
    },
  },
};
</script>

<style>
</style>