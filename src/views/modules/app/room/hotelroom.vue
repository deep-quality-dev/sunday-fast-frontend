<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button
          v-if="isAuth('hotel:hotelroom:save')"
          type="primary"
          @click="addOrUpdateHandle()"
        >新增</el-button>
        <el-button
          v-if="isAuth('hotel:hotelroom:delete')"
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
      <el-table-column prop="sellerId" header-align="center" align="center" label="商家ID"></el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="房型名字"></el-table-column>
      <el-table-column prop="price" header-align="center" align="center" label="价格"></el-table-column>
      <el-table-column prop="img" header-align="center" align="center" label="图片"></el-table-column>
      <el-table-column prop="floor" header-align="center" align="center" label="楼层"></el-table-column>
      <el-table-column prop="people" header-align="center" align="center" label="可住人数"></el-table-column>
      <el-table-column prop="bed" header-align="center" align="center" label="加床"></el-table-column>
      <el-table-column prop="breakfast" header-align="center" align="center" label="早餐"></el-table-column>
      <el-table-column prop="facilities" header-align="center" align="center" label="房间设施"></el-table-column>
      <el-table-column prop="windows" header-align="center" align="center" label="窗户"></el-table-column>
      <el-table-column prop="logo" header-align="center" align="center" label="房型大图"></el-table-column>
      <el-table-column prop="totalNum" header-align="center" align="center" label="数量"></el-table-column>
      <el-table-column prop="uniacid" header-align="center" align="center" label=""></el-table-column>
      <el-table-column prop="size" header-align="center" align="center" label="床型尺寸"></el-table-column>
      <el-table-column prop="isRefund" header-align="center" align="center" label="押金是否可退,1否，2是"></el-table-column>
      <el-table-column prop="yjState" header-align="center" align="center" label="1在线,2到店,3入住+到店"></el-table-column>
      <el-table-column prop="yjCost" header-align="center" align="center" label="押金金额"></el-table-column>
      <el-table-column prop="sort" header-align="center" align="center" label="排序"></el-table-column>
      <el-table-column prop="state" header-align="center" align="center" label="房间状态"></el-table-column>
      <el-table-column prop="classify" header-align="center" align="center" label="房间类别"></el-table-column>
      <el-table-column prop="rzTime" header-align="center" align="center" label="入住时长"></el-table-column>
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
import AddOrUpdate from "./hotelroom-add-or-update";
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
        url: this.$http.adornUrl("/hotel/hotelroom/list"),
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
          url: this.$http.adornUrl("/hotel/hotelroom/delete"),
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
