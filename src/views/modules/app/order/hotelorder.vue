<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button
          v-if="isAuth('hotel:hotelorder:save')"
          type="primary"
          @click="addOrUpdateHandle()"
        >新增</el-button>
        <el-button
          v-if="isAuth('hotel:hotelorder:delete')"
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
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="orderNo" header-align="center" align="center" label="订单号"></el-table-column>
      <el-table-column prop="sellerName" header-align="center" align="center" label="商家名字"></el-table-column>
      <el-table-column prop="sellerAddress" header-align="center" align="center" label="商家地址"></el-table-column>
      <el-table-column prop="coordinates" header-align="center" align="center" label="经纬度"></el-table-column>
      <el-table-column prop="arrivalTime" header-align="center" align="center" label="入住时间"></el-table-column>
      <el-table-column prop="departureTime" header-align="center" align="center" label="离店时间"></el-table-column>
      <el-table-column prop="ddTime" header-align="center" align="center" label="到店时间"></el-table-column>
      <el-table-column prop="price" header-align="center" align="center" label="价格"></el-table-column>
      <el-table-column prop="num" header-align="center" align="center" label="房间数量"></el-table-column>
      <el-table-column prop="days" header-align="center" align="center" label="入住天数"></el-table-column>
      <el-table-column prop="roomType" header-align="center" align="center" label="房型"></el-table-column>
      <el-table-column prop="roomLogo" header-align="center" align="center" label="房间主图">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" style="with:80px;height:80px">
        </template>
      </el-table-column>
      <el-table-column prop="bedType" header-align="center" align="center" label="床型"></el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="预定人"></el-table-column>
      <el-table-column prop="tel" header-align="center" align="center" label="联系电话"></el-table-column>
      <!--1未付款,2已付款，3取消,4完成,5已入住,6申请退款,7退款,8拒绝退款-->
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="订单状态"
      ></el-table-column>
      <el-table-column prop="outTradeNo" header-align="center" align="center" label="商户单号"></el-table-column>
      <el-table-column prop="disCost" header-align="center" align="center" label="折后价格"></el-table-column>
      <el-table-column prop="yjCost" header-align="center" align="center" label="押金金额"></el-table-column>
      <el-table-column prop="yhqCost" header-align="center" align="center" label="优惠券价格"></el-table-column>
      <el-table-column prop="yyzkCost" header-align="center" align="center" label="会员折扣金额"></el-table-column>
      <el-table-column prop="totalCost" header-align="center" align="center" label="总价格"></el-table-column>
      <el-table-column prop="enabled" header-align="center" align="center" label="是否删除"></el-table-column>
      <el-table-column prop="createTime" header-align="center" align="center" label="创建时间"></el-table-column>
      <el-table-column prop="retreatCost" header-align="center" align="center" label="已退押金"></el-table-column>
      <el-table-column prop="classify" header-align="center" align="center" label="分类"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
  </div>
</template>

<script>
import AddOrUpdate from "./hotelorder-add-or-update";
export default {
  data() {
    return {
      dataForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.getDataList();
  },
  methods: {
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
