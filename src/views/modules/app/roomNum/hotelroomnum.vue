<template>
  <div v-loading="dataListLoading"  element-loading-text="拼命加载中">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" :span-method="objectSpanMethod" border="" key="roomId">
      <el-table-column align="center" prop="roomName">
        <template slot="header" slot-scope="scope">
          <div>房型/日期</div>
        </template>
      </el-table-column>
      <el-table-column prop="priceName" label="价格名称" align="center"/>
      <el-table-column align="center" width="40">
        <template slot="header" slot-scope="scope">
          <i class="el-icon-arrow-left"></i>
        </template>
      </el-table-column>
      <el-table-column
        :label="item.substring(5, item.length)"
        :key="item"
        :prop="item"
        v-for="item in date"
        align="center"
        width="60"
      />
      <el-table-column align="right" width="40">
        <template slot="header" slot-scope="scope" align="center">
          <i class="el-icon-arrow-right"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      value1: [],
      dataForm: {},
      date: [],
      dataList: [],
      dataListLoading: false
    };
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelroomnum/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key,
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment().add(15, 'days').format('YYYY-MM-DD')
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.date = data.data.date;
          this.dataList = this.handlerData(data.data.dataList);
          // this.dataList = data.page.list;
          // this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (typeof row.rowSpan !== "undefined") {
          return {
            rowspan: row.rowSpan,
            colspan: row.colSpan
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1
          };
        }
      }
    },
    handlerData(dataList) {
      let newData = [];
      let data = {};
      dataList.forEach((item, index) => {
        if (!data[String(item.roomId)]) {
          data[String(item.roomId)] = dataList.filter(
            _item => String(_item.roomId) === String(item.roomId)
          );
        }
      });
      console.log(data);
      for (let key in data) {
        let arr = data[key];
        arr.forEach((item, index) => {
          if (0 == index) {
            item.rowSpan = arr.length;
            item.colSpan = 1;
          } else {
            item.rowSpan = 0;
            item.colSpan = 0;
          }
          newData.push(item);
        });
      }
      return newData;
    }
  }
};
</script>
<style type="text/css">
.table {
  margin-bottom: 0px;
  border: 1px solid #eee;
  border-top: 0px;
}
.table td {
  text-align: center;
}
.room {
  background-color: #f5f5f5;
}
</style>
