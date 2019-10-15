<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-table
            ref="multipleTable"
            :data="dataList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-loading="dataListLoading"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="有效日期" width="120">
                <template slot-scope="scope">{{ scope.row.endTime }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="conditions" label="优惠条件" show-overflow-tooltip></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      type: 0,
      title: "",
      dialogVisible: false,
      dataList: [],
      multipleSelection: [],
      dataListLoading: false
    };
  },
  methods: {
    close() {
      this.dataList = [];
      this.dialogVisible = false;
    },
    init(type) {
      if (type === 1) {
        this.title = "请选择免房券";
        this.getCounpons();
      }
      if (type === 2) {
        this.title = "请选择优惠券";
        this.getCashCounpons();
      }
      if (type === 3) {
        this.title = "请选择早餐券";
        this.getBreakfastCounpons();
      }
      this.type = type;
      this.dialogVisible = true;
    },
    //免房券
    getCounpons() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelcoupons/listAll"),
        method: "get"
      }).then(({ data }) => {
        this.dataListLoading = false;
        if (data && data.code === 0) {
          this.dataList = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    //优惠券
    getCashCounpons() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelcouponscash/listAll"),
        method: "get"
      }).then(({ data }) => {
        this.dataListLoading = false;
        if (data && data.code === 0) {
          this.dataList = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    //早餐券
    getBreakfastCounpons() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelcouponsbreakfast/listAll"),
        method: "get"
      }).then(({ data }) => {
        this.dataListLoading = false;
        if (data && data.code === 0) {
          this.dataList = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
