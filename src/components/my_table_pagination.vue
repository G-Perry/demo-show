<template>
  <div class="son_fit" style="position: relative">
    <el-table v-bind="$attrs" v-on="$listeners" ref="idsTable" :height="tableHeight">
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-table>
    <div ref="pagination-bar" class="footer_pagination">
      <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange"-->
      <!-- <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes"
        :total="total"
      ></el-pagination>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: 800,
    };
  },
  mounted() {
    setTimeout(() => {
      console.log(this, 111);
    }, 5000);
  },
};
</script>

<style>
</style>