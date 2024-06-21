export const commonCURD = {
  data() {
    return {
      //api相关
      getListApi: undefined,
      getDetailsById: undefined,
      deleteApi: undefined,
      exportApi: undefined,
      idName: "",
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 表格数据
      tableData: [],
    };
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item[this.idName]);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 搜索回调 参数为搜索对象
    handleSearch(obj) {
      Object.assign(this.queryParams, obj);
      this.$nextTick(() => {
        this.getList();
      });
    },
    // 重置回调
    handleRefresh() {
      this.queryParams.pageNum = 1;
      this.resetQueryParams();
      this.$nextTick(() => {
        this.getList();
      });
    },
    // 分页
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.queryParams.pageNum = 1;
      this.$nextTick(() => {
        this.getList();
      });
    },
    // 分页
    handlePageChange(val) {
      this.queryParams.pageNum = val;
      this.$nextTick(() => {
        this.getList();
      });
    },
    // 获取列表
    getList() {
      this.loading = true;
      this.tableData = [];
      console.log("请求参数：", this.queryParams);
      this.getListApi(this.queryParams).then((res) => {
        if (res.code == 200) {
          console.log("返回的列表结果：", res.rows);
          this.tableData = res.rows;
          this.total = res.total;
          this.loading = false;
        }
      });
    },
    handleAdd() {
      this.$refs.addOrEditDialog.reset();
      this.$refs.addOrEditDialog.dialogTitle = "新增";
      this.$refs.addOrEditDialog.dialogVisible = true;
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将删除账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const id = row[this.idName] || this.ids;
          this.deleteApi(id).then((res) => {
            if (res.code == 200) {
              this.getList();
              this.$message({
                type: "success",
                message: "操作成功",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
  },
};
