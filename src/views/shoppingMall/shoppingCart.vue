<template>
  <section class="shoppingMall">
    <shop-header></shop-header>
    <!-- <goods-details-top></goods-details-top>
    <goods-details-pics></goods-details-pics> -->
    <section class="cart_body">
      <div class="cart_top_desc">
        <span>全部商品（3）</span>
        <span>剩余积分：</span>
        <span>100积分</span>
      </div>
      <section class="cart_table">
        <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          highlight-selection-row
          :row-style="selectedHighlight"
        >
          <el-table-column type="selection" width="55" align="center"> </el-table-column>
          <el-table-column label="商品">
            <template slot-scope="scope">
              <div class="goods_pic_desc">
                <img
                  :src="scope.row.pic"
                  alt=""
                  style="width: 80px; height: 80px"
                />
                <span>{{ scope.row.desc }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="积分价格"
            width="120"
          ></el-table-column>
          <el-table-column prop="number" label="数量" width="220">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.number"
                @change="handleChange($event, scope.row)"
                :min="1"
                :step="1"
                step-strictly
                size="small"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="共计" width="120">
            <template slot-scope="scope">{{
              scope.row.price * scope.row.number
            }}</template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
        </el-table>
      </section>
      <section class="cart_bottom">
        <span
          >共计
          <span style="color: red">{{ tableData.length }}</span>
          件商品</span
        >
        <span
          >已选
          <span style="color: red">{{ selectRow.length }}</span> 件商品</span
        >
        <span
          >总价
          <span style="color: red; font-size: 16px">{{ priceCount }}</span>
          积分</span
        >
        <span>剩余 <span style="color: red">0</span> 积分</span>
        <el-button type="warning" size="small" style="width: 120px"
          >结 算</el-button
        >
      </section>
    </section>
  </section>
</template>
  
  
  <script>
import shopHeader from "./components/shopHeader.vue";
// import goodsDetailsTop from "./components/goodsDetailsTop.vue";
// import goodsDetailsPics from "./components/goodsDetailsPics.vue";
export default {
  components: {
    shopHeader,
    // goodsDetailsTop, goodsDetailsPics
  },
  data() {
    return {
      tableData: [
        {
          pic: require("@/assets/images/shoppingMall/1.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 100,
          number: 1,
        },
        {
          pic: require("@/assets/images/shoppingMall/2.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 200,
          number: 3,
        },
        {
          pic: require("@/assets/images/shoppingMall/3.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 300,
          number: 1,
        },
        {
          pic: require("@/assets/images/shoppingMall/4.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 500,
          number: 2,
        },
        {
          pic: require("@/assets/images/shoppingMall/5.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 100,
          number: 6,
        },
        {
          pic: require("@/assets/images/shoppingMall/6.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 220,
          number: 6,
        },
        {
          pic: require("@/assets/images/shoppingMall/7.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 320,
          number: 1,
        },
        {
          pic: require("@/assets/images/shoppingMall/8.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 320,
          number: 1,
        },
        {
          pic: require("@/assets/images/shoppingMall/9.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 320,
          number: 1,
        },
        {
          pic: require("@/assets/images/shoppingMall/10.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 320,
          number: 1,
        },
        {
          pic: require("@/assets/images/shoppingMall/11.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 320,
          number: 1,
        },
        {
          pic: require("@/assets/images/shoppingMall/12.avif"),
          desc: "几何未来（GeometricFuture）M4 亚瑟王 电脑机箱白色（支持EATX主板/40显卡/240/360冷排/侧透/TypeC接口）",
          price: 320,
          number: 1,
        },
      ],
      selectRow: [],
      priceCount: 0,
    };
  },
  methods: {
    selectedHighlight({ row }) {
      if (this.selectRow.includes(row)) {
        return {
          "background-color": "#fff7ec",
        };
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRow = selection;
      this.priceCount = selection.reduce((prev, curr) => {
        return prev + curr.price * curr.number;
      }, 0);
      // this.ids = selection.map((item) => item.id);
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
    },
    handleChange(value, row) {
      row.number = value;
      this.priceCount = this.selectRow.reduce((prev, curr) => {
        return prev + curr.price * curr.number;
      }, 0);
    },
  },
};
</script>
  
<style scoped>
.cart_body {
  width: 1200px;
  margin: 0px auto;
}
.cart_top_desc {
  width: 100%;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  padding-left: 20px;
  font-size: 14px;
}
.cart_top_desc > span:nth-child(1) {
  font-weight: 700;
  font-size: 16px;
  font-family: Arial, "microsoft yahei";
}
.cart_top_desc > span:nth-child(2) {
  margin-left: 20px;
}
.cart_top_desc > span:nth-child(3) {
  color: red;
}
.goods_pic_desc {
  display: flex;
  align-items: center;
}
.goods_pic_desc > span {
  flex: 1;
  font-size: 12px;
  margin-left: 10px;
}
.cart_table {
  width: 1200px;
  min-height: 600px;
}
::v-deep.el-table tbody tr:hover > td {
  background-color: unset !important;
}
.cart_bottom {
  width: 1200px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  padding-right: 10px;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 100;
}
</style>