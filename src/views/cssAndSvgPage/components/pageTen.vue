<template>
  <div class="son_fit_father" style=" align-items: center;justify-content: center;">
    <section class="pageTen">
      <el-button
        type="primary"
        plain
        icon="el-icon-circle-plus-outline"
        @click="handleItemAdd"
        style="width: 100%;margin-bottom: 10px;"
      >添加</el-button>
      <addItemInTable ref="addItemInTable" :columnInfo="columnInfo" v-model="resultData"></addItemInTable>
    </section>
    <section class="resultShow">
      <span style="font-size: 20px;">双向绑定数据展示</span>
      <div class="resultItem" v-for="item in resultData" :key="item.id">
        <span>
          labelOne:
          <span>{{ item.propNameOne }}</span>
        </span>
        <span>
          labelTwo:
          <span>{{ item.propNameTwo }}</span>
        </span>
        <span>
          labelThree:
          <span>{{ item.propNameThree }}</span>
        </span>
        <span>
          labelFour:
          <span>{{ item.propNameFour }}</span>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import addItemInTable from "@/components/addItemInTable.vue";

export default {
  components: { addItemInTable },
  data() {
    return {
      columnInfo: [
        {
          label: "labelOne",
          propName: "propNameOne",
        },
        {
          label: "labelTwo",
          propName: "propNameTwo",
        },
        {
          label: "labelThree",
          propName: "propNameThree",
        },
        {
          label: "labelFour",
          propName: "propNameFour",
        },
      ],
      resultData: [],
    };
  },
  methods: {
    handleItemAdd() {
      this.$refs.addItemInTable.addNewItem();
    },
  },
};
</script>

<style scoped>
.pageTen {
  width: 80vw;
  height: 60vh;
  overflow: auto;
}
.resultShow {
  width: 80vw;
  height: 20vh;
  background: #fff;
  overflow: auto;
  text-align: center;
}
.resultItem {
  width: 100%;
  height: 36px;
  line-height: 36px;
}
.resultItem + .resultItem {
  border-top: 1px solid #ddd;
}
.resultItem > span {
  color: #409eff;
  margin-right: 10px;
}
.resultItem > span > span {
  color: #000;
}
</style>