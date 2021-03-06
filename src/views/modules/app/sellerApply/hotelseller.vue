<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!-- <el-button
          v-if="isAuth('hotel:hotelseller:save')"
          type="primary"
          @click="addOrUpdateHandle()"
        >新增</el-button>-->

        <el-button
          v-if="isAuth('hotel:hotelseller:delete')"
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
      <!-- <el-table-column prop="owner" header-align="center" align="center" label="1后台添加,2入住"></el-table-column> -->
      <el-table-column prop="name" header-align="center" align="center" label="名字"></el-table-column>
      <el-table-column prop="star" header-align="center" align="center" label="星级">
        <template slot-scope="scope">
          <el-tag size="small">{{stars[String(scope.row.star)]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="linkName" header-align="center" align="center" label="联系人"></el-table-column>
      <el-table-column prop="linkTel" header-align="center" align="center" label="联系电话"></el-table-column>
      <el-table-column prop="tel" header-align="center" align="center" label="酒店电话"></el-table-column>
      <el-table-column prop="sqTime" header-align="center" align="center" label="申请时间">
        <template slot-scope="scope">
          <span>{{moment(scope.row.sqTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" header-align="center" align="center" width="500" label="地址"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">查看</el-button>
          <el-button type="text" size="small" @click="auditPassHandler(scope.row.id)">通过</el-button>
          <el-button type="text" size="small" @click="auditRefuseHanler(scope.row.id)">拒绝</el-button>
          <!-- <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button> -->
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
import moment from "moment";
import AddOrUpdate from "./hotelseller-add-or-update";
export default {
  data() {
    return {
      stars: {
        "1": "一星级",
        "2": "二星级",
        "3": "三星级",
        "4": "四星级",
        "5": "五星级"
      },
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
    moment(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelseller/applyList"),
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
    //审核通过
    auditPassHandler(id) {
      this.$confirm("确认审核通过吗？")
        .then(_ => {
          this.$http({
            url: this.$http.adornUrl(`/hotel/hotelseller/auditPass/${id}`),
            method: "POST"
          }).then(({ data }) => {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          });
        })
        .catch(_ => {});
    },
    //拒绝审核
    auditRefuseHanler(id) {
      this.$confirm("确认操作？")
        .then(_ => {
          this.$http({
            url: this.$http.adornUrl(`/hotel/hotelseller/auditRefuse/${id}`),
            method: "POST"
          }).then(({ data }) => {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          });
        })
        .catch(_ => {});
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
          url: this.$http.adornUrl("/hotel/hotelseller/delete"),
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
