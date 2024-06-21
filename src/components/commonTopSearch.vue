<template>
    <div class="search-container" :class="[{ bottom_border: bottomBorder }]"
        :style="'height:' + (!isExpand ? sectionHeight : '110px')" ref="npSearch">
        <section class="search_left">
            <section class="search_item" v-for="item in list" :key="item.name">
                <span class="item_lable">{{ item.name }}:</span>
                <section class="item_input">
                    <el-select v-model="item.value" v-if="item.type == 'select'" :placeholder="`请选择${item.name}`" clearable
                        @change="handleForceUpdate">
                        <el-option v-for="items in item.list" :key="items.label" :label="items.label"
                            :value="items.value"></el-option>
                    </el-select>
                    <el-select v-model="item.value" v-else-if="item.type == 'select-filter'" :placeholder="`请选择${item.name}`" clearable
                        filterable @change="handleForceUpdate">
                        <el-option v-for="items in item.list" :key="items.label" :label="items.label"
                            :value="items.value"></el-option>
                    </el-select>
                    <!-- <treeselect v-model="item.value" :options="item.list" :normalizer="normalizer" :show-count="true"
                        placeholder="选择" v-else-if="item.type == 'tree'" /> -->
                    <el-date-picker v-model="item.value" v-else-if="item.type == 'date'" type="datetimerange"
                        align="right" clearable start-placeholder="开始日期" end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss"
                        style="display: inline-flex"></el-date-picker>
                    <el-input v-model="item.value" v-else :placeholder="`请输入${item.name}`" clearable
                        @input="handleForceUpdate"></el-input>
                </section>
            </section>
        </section>
        <section class="search_right">
            <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">查询</el-button>
            <el-button size="small" icon="el-icon-refresh-right" @click="handleRefresh">重置</el-button>
        </section>
        <el-button icon="el-icon-d-arrow-left" circle class="circleBtn" :class="{ 'arrow-down': isExpand }"
            @click="handleToggleExpand" v-if="expandBtnIsShow"></el-button>
    </div>
</template>

<script>
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import Treeselect from "@riophae/vue-treeselect";
export default {
    // searchConfig: [{name: 'XX', key: 'XX', type: 'XX', list: [{label: 'XX', value: 'XX'}], value: undefined}]
    // name - 字段名称
    // key - 传参字段
    // type - 'input': 输入框 ； 'date': 开始结束时间；'select': 选择框; 'select-filter': 可筛选选择框, 'tree': 树形选择
    // list - type为'select'或'select-filter'或'tree'时传入，为选择框的选项，label为选项名称，value为选项值
    props: {
        searchConfig: {
            type: Array,
            default: () => [],
        },
        bottomBorder: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            list: [],
            isExpand: true,
            expandBtnIsShow: false,
            sectionHeight: "",
        };
    },
    components: {
        // Treeselect,
    },
    created() {
        this.list = this.searchConfig;
        this.list.map((item, index) => {
            !item.value && this.$set(this.list[index], "value", undefined);
        });
    },
    methods: {
        // 搜索
        handleSearch: function () {
            var obj = {};
            this.list.map((item) => {
                obj[item.key] = item.value;
            });
            this.$emit("handleSearch", obj);
        },
        // 重置
        handleRefresh: function () {
            var obj = {};
            this.list.map((item, index) => {
                (obj[item.key] = undefined),
                    this.$set(this.list[index], "value", undefined);
            });
            this.$forceUpdate();
            this.$emit("handleRefresh", obj);
        },
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
            }
            if (node.children == null || node.children == "null") {
                delete node.children;
            }
            return {
                id: node.id,
                label: node.name,
                children: node.children,
            };
        },
        handleForceUpdate: function () {
            this.$forceUpdate();
        },
        handleToggleExpand() {
            this.isExpand = !this.isExpand;
        },
        handleExpandBtnIsShow() {
            this.isExpand = true;
            this.$nextTick(() => {
                let a = this.$refs.npSearch.offsetHeight;
                let b = this.$refs.npSearch.children[0].offsetHeight;
                this.sectionHeight = b + 33 + "px";
                this.expandBtnIsShow = a < b;
            });
        },
    },
    mounted() {
        this.handleExpandBtnIsShow();
        window.addEventListener("resize", this.handleExpandBtnIsShow);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleExpandBtnIsShow);
    },
    deactivated() {
        window.removeEventListener("resize", this.handleExpandBtnIsShow);
    },
};
</script>

<style scoped>
::v-deep .el-input__inner,
::v-deep .vue-treeselect__control {
    background-color: #f2f3f5;
    height: 32px;
    line-height: 32px;
    border-radius: 2px;
    border: none;
}

::v-deep .el-range-input {
    background-color: #f2f3f5;
}

.search-container {
    /* margin: 0 20px; */
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    transition: height 0.4s;
    overflow: hidden;
    container-type: inline-size;
    container-name: npSearch;
}

::v-deep .el-button {
    height: 36px;
}

::v-deep .el-button+.el-button {
    margin-left: 0;
}

.search_left {
    flex: 1;
}

.search_left {
    display: grid;
    gap: 10px;
}

.search_right {
    box-sizing: border-box;
    padding-top: 1px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

@container npSearch (inline-size > 2400px) {
    .search_left {
        grid-template-columns: repeat(8, 1fr);
    }
}

@container npSearch (inline-size < 2400px) {
    .search_left {
        grid-template-columns: repeat(7, 1fr);
    }
}

@container npSearch (inline-size < 2100px) {
    .search_left {
        grid-template-columns: repeat(6, 1fr);
    }
}

@container npSearch (inline-size < 1800px) {
    .search_left {
        grid-template-columns: repeat(4, 1fr);
    }
}

@container npSearch (inline-size < 1500px) {
    .search_left {
        grid-template-columns: repeat(3, 1fr);
    }
}

@container npSearch (inline-size < 1200px) {
    .search_left {
        grid-template-columns: repeat(2, 1fr);
    }
}

@container npSearch (inline-size < 600px) {
    .search_left {
        grid-template-columns: repeat(1, 1fr);
    }
}

.search_item {
    height: 36px;
    line-height: 36px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
}

.item_lable {
    min-width: 80px;
    font-size: 14px;
    text-align: right;
    padding-right: 10px;
}

.item_input {
    flex: 1;
}

.item_input>div {
    display: block;
    width: 100%;
}

.circleBtn {
    margin-left: 10px;
    width: 32px;
    height: 32px;
    padding: 0;
    transform: translateY(50%) rotate(90deg);
}

.circleBtn.arrow-down {
    transform: translateY(50%) rotate(-90deg);
}

.bottom_border {
    border-bottom: 1px solid #eee;
}
</style>
