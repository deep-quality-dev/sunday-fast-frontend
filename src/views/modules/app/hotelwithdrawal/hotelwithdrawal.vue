<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.sellerName" placeholder="酒店名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!-- <el-button
          v-if="isAuth('hotel:hotelwithdrawal:save')"
          type="primary"
          @click="addOrUpdateHandle()"
        >新增</el-button>-->

        <el-button
          v-if="isAuth('hotel:hotelwithdrawal:save')"
          type="primary"
          @click="withdrawalSettingHandler()"
        >提现设置</el-button>
        <el-button
          v-if="isAuth('hotel:hotelwithdrawal:delete')"
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
        >批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border=""
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        width="250"
        label="酒店"
        v-if="userId === 1"
      ></el-table-column>
      <el-table-column prop="withdrawCost" header-align="center" align="center" label="提现金额"></el-table-column>
      <el-table-column prop="realityCost" header-align="center" align="center" label="到账金额"></el-table-column>
      <el-table-column prop="username" header-align="center" align="center" width="280" label="账号"></el-table-column>
      <el-table-column prop="type" header-align="center" align="center" label="账户类型">
        <template slot-scope="scope">
          <el-tag size="small">{{accountType[scope.row.type]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" header-align="center" align="center" width="200" label="申请时间"></el-table-column>
      <el-table-column
        prop="auditTime"
        header-align="center"
        align="center"
        width="200"
        label="审核时间"
      ></el-table-column>
      <el-table-column prop="state" header-align="center" align="center" label="提现状态">
        <template slot-scope="scope">
          <el-tag size="small">{{txState[scope.row.state]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
        v-if="userId === 1"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="isAuth('hotel:hotelwithdrawal:withdrawalapplyaudit')"
            size="small"
            @click="handlerAudit(scope.row.id)"
          >审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <WithdrawalSetting v-if="withdrawalSettingVisible" ref="withdrawalSetting"></WithdrawalSetting>
  </div>
</template>

<script>
import AddOrUpdate from "./hotelwithdrawal-add-or-update";
import WithdrawalSetting from "./hotelwithdrawal-setting";
export default {
  data() {
    return {
      accountType: {
        "1": "支付宝",
        "2": "微信",
        "3": "银行"
      },
      txState: {
        "1": "待审核",
        "2": "已通过",
        "3": "拒绝"
      },
      dataForm: {
        sellerName: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      withdrawalSettingVisible: false,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: {
    AddOrUpdate,
    WithdrawalSetting
  },
  activated() {
    this.getDataList();
  },
  computed: {
    userId: {
      get() {
        return this.$store.state.user.id;
      }
    }
  },
  methods: {
    withdrawalSettingHandler() {
      this.withdrawalSettingVisible = true;
      this.$nextTick(() => {
        this.$refs.withdrawalSetting.init();
      });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelwithdrawal/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          sellerName: this.dataForm.sellerName
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    //审核
    handlerAudit(id) {
      this.$confirm(`确定审核通过?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl(
            `/hotel/hotelwithdrawal/withdrawalApplyAudit/${id}`
          ),
          method: "post"
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/hotel/hotelwithdrawal/delete"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
