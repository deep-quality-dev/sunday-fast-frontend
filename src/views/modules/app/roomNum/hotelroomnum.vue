<template>
  <div v-loading="dataListLoading"  element-loading-text="拼命加载中">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-date-picker
          v-model="value1"
          type="daterange"
          :clearable="false"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
         <el-select v-model="dataForm.roomType" placeholder="请选择">
           <el-option
            v-for="item in roomTyps"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
         <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="setRoomNumHandler()">批量设置房态</el-button>
      </el-form-item>
    </el-form>
    <el-table 
    :data="dataList" 
    :span-method="objectSpanMethod" border="" row-key="id" :row-class-name="tableRowClassName" 
    :expand-row-keys="['room_2']"
    >
      <el-table-column  align="left" prop="name" label="房型">

      </el-table-column>
      <el-table-column
        :label="item.substring(5, item.length)"
        :key="item"
        :prop="item"
        v-for="item in date"
        align="center"
        width="140"
      >
      <template slot-scope="scope">
          <div v-if="scope.row.type ===0">
            <el-button size="mini" v-if="scope.row[scope.column.property] === 1" @click="handlerRoomState(scope.row,scope.column.property,0)"  type="primary">有房</el-button>
            <el-button size="mini" v-else type="danger" @click="handlerRoomState(scope.row,scope.column.property,1)">满房</el-button>
          </div>
          <div v-else>
            <el-button size="mini" v-if="scope.row[scope.column.property].hasRoom != 0" @click="handlerRoomMoneyState(scope.row,scope.column.property,0)" type="primary">有房</el-button>
            <el-button size="mini"  v-else type="danger" @click="handlerRoomMoneyState(scope.row,scope.column.property,1)">满房</el-button>
            <div style="margin-top:10px">
                <span>{{ scope.row[scope.column.property].num }}</span>
              <i
                class="el-icon-edit"
                @click="onEdit(scope)"
              />
            </div>
           </div>
        </template>
        </el-table-column>
    </el-table>
    <el-dialog
     :close-on-click-modal="false"
      width="40%"
      :title="`修改【${updateCurrent.row.roomName}】【${updateCurrent.row.name}】【${updateCurrent.column.property}】的房量`"
      :visible="showUpdateModal"
      :before-close="closeUpdateModal"
    >
      <el-input v-model="updateCurrentPrice" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateModal">取 消</el-button>
        <el-button type="primary" @click="onUpdateSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <SetRoomNum v-if="setRoomNumVisible" @refreshDataList="getDataList" ref="setRoomNum"></SetRoomNum>
  </div>
</template>
<script>
import moment from "moment";
import SetRoomNum from './set-room-num';
import { treeDataTranslate } from "@/utils";
export default {
  data() {
    return {
      expandRowKeys:[],
      setRoomNumVisible:false,
      value1: [moment().format("YYYY-MM-DD"),moment().add(7, 'days').format('YYYY-MM-DD')],
      roomTyps:[
         {
          label:'全日房',
          value:1
        },
        {
          label:'钟点房',
          value:0
        }
      ],
      dataForm: {
        roomType:1
      },
      date: [],
      dataList: [],
      showUpdateModal: false,
        updateCurrent: { row: {}, column: {} },
        updateCurrentPrice: '',
      dataListLoading: false
    };
  },
  components: {
    SetRoomNum
  },
  activated() {
    this.getDataList();
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        if (row.type === 0 ) {
          return 'success-row';
        }
        return '';
      },
    setRoomNumHandler(){
      this.setRoomNumVisible = true;
      this.$nextTick(() => {
        this.$refs.setRoomNum.init();
      });
    },
     closeUpdateModal() {
        this.showUpdateModal = false;
      },
      onEdit(scope) {
        this.showUpdateModal = true;
        this.updateCurrent = scope;
        this.updateCurrentPrice = scope.row[scope.column.property].num;
      },
       onUpdateSubmit() {
        this.$http({
          url: this.$http.adornUrl("/hotel/hotelroomnum/update4Day"),
          method: "post",
          data: this.$http.adornParams({
           date:this.updateCurrent.column.property,
           priceId:this.updateCurrent.row.id.slice(6), //price_11111
           num: this.updateCurrentPrice
          })
        }).then(({ data }) => {
         if (data && data.code === 0){
           this.getDataList();
         }
         this.closeUpdateModal()
        });
      },
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
          startDate: this.value1[0],
          endDate: this.value1[1],
          roomType:this.dataForm.roomType
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.date = data.data.date;
          this.dataList = treeDataTranslate(data.data.dataList, "id", "pid");//this.handlerData(data.data.dataList);
          if(this.dataList.length){
              this.expandRowKeys.push(this.dataList[0].id)
          }
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
    handlerRoomState(row,date,status){
      console.log(row)
      this.$http({
          url: this.$http.adornUrl(`/hotel/hotelroom/roomSwitch`),
          method: "post",
          data: this.$http.adornParams({
           id:row.id.slice(5),
           status:status, //price_11111
           date: date
          })
        }).then(({ data }) => {
         if (data && data.code === 0){
           this.getDataList();
         }
        });
    },
    handlerRoomMoneyState(row,date,status){
      this.$http({
          url: this.$http.adornUrl(`/hotel/hotelroom/moneySwitch/`),
          method: "post",
          data: this.$http.adornParams({
           id:row.id.slice(6),
           status:status, //price_11111
           date: date
          })
        }).then(({ data }) => {
         if (data && data.code === 0){
           this.getDataList();
         }
        });
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
