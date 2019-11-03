<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入入住人姓名/手机号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="dataForm.date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.status" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- <el-button @click="getDataList()">修改</el-button> -->
        <el-button @click="getDataList()">查询</el-button>
        <!-- <setting></setting> -->
        <el-button
          @click="orderSettingHandler()"
          v-if="isAuth('hotel:hotelordersetting:info')"
          type="primary"
        >接单设置</el-button>
        <el-button
          @click="orderNotificationHandler()"
          v-if="isAuth('hotel:hotelordersetting:info')"
          type="primary"
        >通知设置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border=""
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <!-- <el-table-column prop="orderNo" header-align="center" align="center" label="订单号"></el-table-column> -->
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="160"
        label="预定时间"
      ></el-table-column>
      <el-table-column
        prop="sellerName"
        header-align="center"
        align="center"
        width="150"
        label="商家"
      ></el-table-column>
      <el-table-column
        prop="arrivalTime"
        header-align="center"
        align="center"
        width="120"
        label="入住"
      ></el-table-column>
      <el-table-column
        prop="departureTime"
        header-align="center"
        align="center"
        width="120"
        label="离店"
      ></el-table-column>
      <el-table-column prop="ddTime" header-align="center" align="center" label="到店"></el-table-column>
      <!-- <el-table-column prop="price" header-align="center" align="center" label="价格"></el-table-column> -->
      <el-table-column prop="num" header-align="center" align="center" width="50" label="数量"></el-table-column>
      <el-table-column prop="days" header-align="center" align="center" width="50" label="天数"></el-table-column>
      <el-table-column prop="roomType" header-align="center" align="center" width="120" label="房型"></el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="预定人"></el-table-column>
      <el-table-column prop="tel" header-align="center" align="center" width="110" label="联系电话"></el-table-column>
      <!--1未付款,2已付款，3取消,4完成,5已入住,6申请退款,7退款,8拒绝退款-->
      <el-table-column prop="status" header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small">未付款</el-tag>
          <el-tag v-if="scope.row.status === 2" size="small">已付款</el-tag>
          <el-tag v-if="scope.row.status === 3" size="small">已取消</el-tag>
          <el-tag v-if="scope.row.status === 4" size="small">已完成</el-tag>
          <el-tag v-if="scope.row.status === 5" size="small">已入住</el-tag>
          <el-tag v-if="scope.row.status === 6" size="small">退款中</el-tag>
          <el-tag v-if="scope.row.status === 9" size="small">待入住</el-tag>
          <el-tag v-if="scope.row.status === 11" size="small">待确认</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="payMethod"
        header-align="center"
        width="120"
        align="center"
        label="支付方式"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.payMethod === 'wx'" size="small">微信支付</el-tag>
          <el-tag v-if="scope.row.payMethod === 'balance'" size="small">余额支付</el-tag>
          <el-tag v-if="scope.row.payMethod === 'integral'" size="small">积分支付</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="disCost" header-align="center" align="center" label="折后价格"></el-table-column>
      <el-table-column prop="yhqCost" header-align="center" align="center" label="优惠券"></el-table-column>
      <el-table-column prop="yyzkCost" header-align="center" align="center" label="会员折扣"></el-table-column>-->
      <el-table-column prop="totalCost" header-align="center" align="center" label="价格"></el-table-column>
      <el-table-column prop="orderNo" header-align="center" align="center" width="180" label="订单号"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="120" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.status === 11" @click="orderAffirmHandler(scope.row.id)">确认</el-button>
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">查看</el-button>
          <el-button
            type="text"
            v-if="scope.row.status === 2"
            size="small"
            @click="orderCheckInHandler(scope.row.id)"
          >入住</el-button>
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
    <Setting v-if="orderSettingVisible" ref="orderSetting" @refreshDataList="getDataList"></Setting>
    <OrderNotification v-if="orderNotificationVisible" ref="orderNotification"></OrderNotification>
  </div>
</template>

<script>
import AddOrUpdate from "./hotelorder-add-or-update";
import Setting from "./setting";
import OrderNotification from "./hotelordernotification-add-or-update";

export default {
  data() {
    return {
      dataForm: {
        key: "",
        status: "0",
        date: []
      },
      statusOptions: [
        { value: "0", label: "全部订单" },
        { value: "1", label: "待支付" },
        { value: "2", label: "已付款" },
        { value: "3", label: "已取消" },
        { value: "4", label: "已完成" },
        { value: "5", label: "已入住" },
        { value: "6", label: "退款中" },
        { value: "11", label: "待确认" }
      ],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      orderSettingVisible: false,
      orderNotificationVisible: false
    };
  },
  components: {
    AddOrUpdate,
    Setting,
    OrderNotification
  },
  activated() {
    this.getDataList();
  },
  methods: {
    orderNotificationHandler() {
      this.orderNotificationVisible = true;
      this.$nextTick(() => {
        this.$refs.orderNotification.init();
      });
    },
    orderSettingHandler() {
      this.orderSettingVisible = true;
      this.$nextTick(() => {
        this.$refs.orderSetting.init();
      });
    },
    //订单确认
    orderAffirmHandler(orderId) {
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelorder/orderAffirm/${orderId}`),
        method: "POST"
      }).then(({ data }) => {
        console.log(date);
        if (data && data.code === 0) {
          this.getDataList();
        }
      });
    },
    //订单入住
    orderCheckInHandler(orderId) {
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelorder/orderCheckIn/${orderId}`),
        method: "POST"
      }).then(({ data }) => {
        console.log(date);
        if (data && data.code === 0) {
          this.getDataList();
        }
      });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelorder/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key
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
          url: this.$http.adornUrl("/hotel/hotelorder/delete"),
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
