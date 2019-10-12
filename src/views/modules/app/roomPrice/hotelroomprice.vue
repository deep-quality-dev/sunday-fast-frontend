<template>
  <div v-loading="dataListLoading"  element-loading-text="拼命加载中">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-form-item>
      <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <el-table
      :data="dataList"
      :span-method="objectSpanMethod"
      border=""
    >
      <el-table-column align="center" prop="roomName">
        <template slot="header" width="100" slot-scope="scope">
          <div>房型/日期</div>
        </template>
      </el-table-column>

      <el-table-column prop="priceName" width="100" label="价格名称" align="center" />

      <el-table-column align="center" width="40">
        <template slot="header" slot-scope="scope">
          <i class="el-icon-arrow-left"></i>
        </template>
      </el-table-column>

      <el-table-column
        v-for="item in date"
        :label="item.substring(5, item.length)"
        :key="item"
        :prop="item"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[scope.column.property] }}</span>
          <i
            class="el-icon-edit"
            @click="onEdit(scope)"
          />
        </template>
      </el-table-column>

      <el-table-column align="right" width="40">
        <template slot="header" slot-scope="scope" align="center">
          <i class="el-icon-arrow-right"></i>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      width="40%"
      :title="`修改【${updateCurrent.row.roomName}】【${updateCurrent.row.priceName}】【${updateCurrent.column.property}】的价格`"
      :visible="showUpdateModal"
      :before-close="closeUpdateModal"
    >
      <el-input v-model="updateCurrentPrice" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateModal">取 消</el-button>
        <el-button type="primary" @click="onUpdateSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
  export default {
    data() {
      return {
        dataListLoading:false,
        value1: '',
        dataForm: {},
        date: [],
        dataList: [],
        showUpdateModal: false,
        updateCurrent: { row: {}, column: {} },
        updateCurrentPrice: '',
      };
    },
    activated() {
      this.getDataList();
    },
    methods: {
      closeUpdateModal() {
        this.showUpdateModal = false;
      },
      onEdit(scope) {
        this.showUpdateModal = true;
        this.updateCurrent = scope;
        this.updateCurrentPrice = scope.row[scope.column.property];
      },
      onUpdateSubmit() {
        this.$http({
          url: this.$http.adornUrl("/hotel/hotelroomprice/update4Day"),
          method: "post",
          data: this.$http.adornParams({
           date:this.updateCurrent.column.property,
           priceId:this.updateCurrent.row.priceId,
           money: this.updateCurrentPrice
          })
        }).then(({ data }) => {
         if (data && data.code === 0){
           this.getDataList();
         }
        });
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl("/hotel/hotelroomprice/list"),
          method: "get",
          params: this.$http.adornParams({
            page: this.pageIndex,
            limit: this.pageSize,
            key: this.dataForm.key,
            startDate: moment().format("YYYY-MM-DD"),
            endDate: moment().add(15, 'days').format('YYYY-MM-DD') //默认维护15天房价
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            console.log(data);
            this.date = data.data.date;
            this.dataList = this.handlerData(data.data.dataList)
            // this.dataList = data.page.list;
            // this.totalPage = data.page.totalCount;
            console.log(this.handlerData(data.data.dataList))
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
