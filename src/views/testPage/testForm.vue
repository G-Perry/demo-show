<template>
  <section style="margin-left: 20px;">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <div style="display: flex;flex-direction: column;gap: 20px;">
        <el-checkbox v-for="(item) in option" :label="item.id" :key="item.id">
          <span>{{item.label+':'+row[item.propName]}}</span>
        </el-checkbox>
      </div>
    </el-checkbox-group>
  </section>
</template>
<script>
export default {
  props: ["option", "row"],
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      isIndeterminate: false,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      let options = this.option.map((item) => item.id);
      this.checkedCities = val ? options : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.option.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.option.length;
    },
  },
  mounted() {
    console.log(this.row);
  },
};
</script>