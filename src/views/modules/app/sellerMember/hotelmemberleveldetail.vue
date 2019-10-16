<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="会员名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.mobile" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button
          v-if="isAuth('hotel:hotelmemberleveldetail:save')"
          type="primary"
          @click="registerCardHandler()"
          :disabled="dataListSelections.length <= 0"
        >办卡</el-button>
        <el-button
          v-if="isAuth('hotel:hotelmemberleveldetail:save')"
          type="primary"
          @click="sendCouponsHandler(2)"
          :disabled="dataListSelections.length <= 0"
        >发放优惠券</el-button>
        <el-button
          v-if="isAuth('hotel:hotelmemberleveldetail:save')"
          type="primary"
          @click="sendCouponsHandler(3)"
          :disabled="dataListSelections.length <= 0"
        >发放早餐券</el-button>
        <el-button
          v-if="isAuth('hotel:hotelmemberleveldetail:save')"
          type="primary"
          @click="sendCouponsHandler(1)"
          :disabled="dataListSelections.length <= 0"
        >发放免房券</el-button>
        <el-button
          v-if="isAuth('hotel:hotelmemberleveldetail:delete')"
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
        >批量删除</el-button>
      </el-form-item>
      <!-- @click="addOrUpdateHandle()" -->
    </el-form>
    <el-table
      :data="dataList"
      border=""
      row-key="userId"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="img" header-align="center" align="center" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" style="with:30px;height:30px">
        </template>
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="姓名">
        <template slot-scope="scope">
          <span v-if="scope.row.name">{{scope.row.name}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="tel" header-align="center" align="center" width="150" label="手机">
        <template slot-scope="scope">
          <span v-if="scope.row.tel">{{scope.row.tel}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="gender" header-align="center" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.gender === 0?'男':'女' || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cardNo" header-align="center" align="center" width="200" label="卡号">
        <template slot-scope="scope">
          <span v-if="scope.row.cardNo">{{scope.row.cardNo}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="是否本店会员">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.id" size="small">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="levelName" header-align="center" align="center" label="会员类型">
        <template slot-scope="scope">
          <span v-if="scope.row.levelName">{{scope.row.levelName}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="certificateNo"
        header-align="center"
        align="center"
        width="200"
        label="证件号"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.certificateNo">{{scope.row.certificateNo}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        header-align="center"
        align="center"
        width="200"
        label="创建时间"
      ></el-table-column>
      <el-table-column prop="salesman" header-align="center" align="center" label="推荐员工">
        <template slot-scope="scope">
          <span v-if="scope.row.salesman">{{scope.row.salesman}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="score" header-align="center" align="center" label="积分">
        <template slot-scope="scope">
          <span v-if="scope.row.score">{{scope.row.score}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column prop="balance" header-align="center" align="center" label="余额">
        <template slot-scope="scope">
          <span v-if="scope.row.balance">{{scope.row.balance}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
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
    <CouponsSelect v-if="couponsSelectVisible" ref="couponsSelect" @refreshDataList="getDataList"></CouponsSelect>
  </div>
</template>

<script>
import AddOrUpdate from "./hotelmemberleveldetail-add-or-update";
import CouponsSelect from "../../../../components/coupons-select";
export default {
  data() {
    return {
      dataForm: {
        name: "",
        mobile: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      couponsSelectVisible: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: {
    AddOrUpdate,
    CouponsSelect
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelmemberleveldetail/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          ...this.dataForm
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.records;
          this.totalPage = data.page.total;
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
    //发放优惠券

    sendCouponsHandler(type) {
      this.couponsSelectVisible = true;
      this.$nextTick(() => {
        this.$refs.couponsSelect.init(type, this.dataListSelections);
      });
    },
    //办卡
    registerCardHandler() {
      if (this.dataListSelections.length > 1) {
        this.$message.error("请选择一条数据");
        return;
      }

      if (this.dataListSelections[0].id) {
        this.$message.error("用户已办理会员");
        return;
      }
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(this.dataListSelections[0]);
      });
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
          url: this.$http.adornUrl("/hotel/hotelmemberleveldetail/delete"),
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
