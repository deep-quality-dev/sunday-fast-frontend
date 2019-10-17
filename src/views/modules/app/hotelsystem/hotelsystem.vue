<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button
          v-if="isAuth('hotel:hotelsystem:save')"
          type="primary"
          @click="addOrUpdateHandle()"
        >新增</el-button>
        <el-button
          v-if="isAuth('hotel:hotelsystem:delete')"
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
      <el-table-column prop="id" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="appid" header-align="center" align="center" label="appid"></el-table-column>
      <el-table-column prop="appsecret" header-align="center" align="center" label="appsecret"></el-table-column>
      <el-table-column prop="mchid" header-align="center" align="center" label="商户号"></el-table-column>
      <el-table-column prop="wxkey" header-align="center" align="center" label="商户秘钥"></el-table-column>
      <el-table-column prop="uniacid" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="jfRule" header-align="center" align="center" label="积分规则"></el-table-column>
      <el-table-column prop="bqName" header-align="center" align="center" label="版权名称"></el-table-column>
      <el-table-column prop="linkName" header-align="center" align="center" label="网站名称"></el-table-column>
      <el-table-column prop="linkLogo" header-align="center" align="center" label="网站logo"></el-table-column>
      <el-table-column prop="support" header-align="center" align="center" label="技术支持"></el-table-column>
      <el-table-column prop="bqLogo" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="color" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="tzAppid" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="tzName" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="ptName" header-align="center" align="center" label="平台名称"></el-table-column>
      <el-table-column prop="tel" header-align="center" align="center" label="平台电话"></el-table-column>
      <el-table-column prop="totalNum" header-align="center" align="center" label="访问量"></el-table-column>
      <el-table-column prop="appkey" header-align="center" align="center" label="短信appkey"></el-table-column>
      <el-table-column prop="tplId" header-align="center" align="center" label="短信模板id"></el-table-column>
      <el-table-column prop="sellerId" header-align="center" align="center" label="默认门店ID"></el-table-column>
      <el-table-column prop="apiclientCert" header-align="center" align="center" label="证书"></el-table-column>
      <el-table-column prop="apiclientKey" header-align="center" align="center" label="证书"></el-table-column>
      <el-table-column prop="zdMoney" header-align="center" align="center" label="最低提现金额"></el-table-column>
      <el-table-column prop="txSxf" header-align="center" align="center" label="提现手续费"></el-table-column>
      <el-table-column prop="rcTk" header-align="center" align="center" label="认筹条款"></el-table-column>
      <el-table-column prop="tid1" header-align="center" align="center" label="报名成功通知模板id"></el-table-column>
      <el-table-column prop="txNotice" header-align="center" align="center" label="提现须知"></el-table-column>
      <el-table-column prop="type" header-align="center" align="center" label="风格设置,1单店,2多店"></el-table-column>
      <el-table-column prop="txMode" header-align="center" align="center" label="1手动打款,2自动打款"></el-table-column>
      <el-table-column prop="isSjrz" header-align="center" align="center" label="商家入住1开通,2不开通"></el-table-column>
      <el-table-column prop="clientIp" header-align="center" align="center" label="IP地址"></el-table-column>
      <el-table-column prop="rzNotice" header-align="center" align="center" label="认证须知"></el-table-column>
      <el-table-column prop="hyRule" header-align="center" align="center" label="会员规则"></el-table-column>
      <el-table-column prop="bjLogo" header-align="center" align="center" label="首页背景logo"></el-table-column>
      <el-table-column prop="mapKey" header-align="center" align="center" label="地图key"></el-table-column>
      <el-table-column prop="isDxyz" header-align="center" align="center" label="短信验证1开启,2关闭"></el-table-column>
      <el-table-column prop="plScore" header-align="center" align="center" label="评论积分"></el-table-column>
      <el-table-column prop="xfScore" header-align="center" align="center" label="消费积分"></el-table-column>
      <el-table-column prop="hyImg" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="rzTid" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="openMember" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="jjrzTid" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="isSfz" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="tplId2" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="isOrder" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="tid3" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="tid4" header-align="center" align="center" label=""></el-table-column>
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
import AddOrUpdate from "./hotelsystem-add-or-update";
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
        url: this.$http.adornUrl("/hotel/hotelsystem/list"),
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
          url: this.$http.adornUrl("/hotel/hotelsystem/delete"),
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
