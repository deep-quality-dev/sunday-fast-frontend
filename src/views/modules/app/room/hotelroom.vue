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
      <el-table-column prop="logo" header-align="center" align="center" label="房型大图">
        <template slot-scope="scope">
          <img-view :imgSrc="scope.row.logo"></img-view>
        </template>
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="房型名字"></el-table-column>
      <el-table-column prop="oprice" header-align="center" align="center" label="门市价"></el-table-column>
      <el-table-column prop="floor" header-align="center" align="center" label="楼层"></el-table-column>
      <el-table-column prop="people" header-align="center" align="center" label="可住人数"></el-table-column>
      <el-table-column prop="totalNum" header-align="center" align="center" label="数量"></el-table-column>
      <el-table-column prop="size" header-align="center" align="center" label="床型尺寸"></el-table-column>
      <!-- <el-table-column prop="yjCost" header-align="center" align="center" label="押金金额"></el-table-column> -->
      <el-table-column prop="state" header-align="center" align="center" label="房间状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="classify" header-align="center" align="center" label="房间类别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.classify === 0" size="small">钟点房</el-tag>
          <el-tag v-else size="small">普通房</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.state === 0" @click="show(scope.row.id)">启用</el-button>
          <el-button type="text" size="small" v-else-if="scope.row.state === 1" @click="hide(scope.row.id)">禁用</el-button>
          <el-button type="text" size="small" @click="mgrRoomMoenyHandler(scope.row)">价格管理</el-button>
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
    <RoomMoney v-if="mgrRoomMoenyVisible" ref="roomMoney"></RoomMoney>
  </div>
</template>

<script>
import AddOrUpdate from "./hotelroom-add-or-update";
import RoomMoney from "./hotelroom-money";
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
      addOrUpdateVisible: false,
      mgrRoomMoenyVisible: false
    };
  },
  components: {
    AddOrUpdate,
    RoomMoney
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
    show(id) {
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelroom/show/${id}`),
        method: "post"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.getDataList();
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    hide(id) {
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelroom/hide/${id}`),
        method: "post"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.getDataList();
        } else {
          this.$message.error(data.msg);
        }
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
    //价格管理
    mgrRoomMoenyHandler(room) {
      this.mgrRoomMoenyVisible = true;
      this.$nextTick(() => {
        this.$refs.roomMoney.init(room);
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
