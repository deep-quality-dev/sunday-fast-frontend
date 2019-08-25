<template>
    <div>
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-date-picker v-model="dataForm.date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border=""
            style="width: 100%; margin-top: 20px"
        >
            <el-table-column align="center" prop="name">
                <template slot="header" slot-scope="scope">
                    <div>房型/日期</div>
                </template>
            </el-table-column>
            <el-table-column prop="pricename" label="价格名称" align="center"></el-table-column>
            <el-table-column align="center" width="40">
                <template slot="header" slot-scope="scope">
                    <i class="el-icon-arrow-left"></i>
                </template>
            </el-table-column>
            <el-table-column prop="08-23" label="08-23" align="center"></el-table-column>
            <el-table-column prop="08-24" label="08-24" align="center"></el-table-column>
            <el-table-column prop="08-25" label="08-25" align="center"></el-table-column>
            <el-table-column prop="08-26" label="08-26" align="center"></el-table-column>
            <el-table-column prop="08-27" label="08-27" align="center"></el-table-column>
            <el-table-column prop="08-28" label="08-28" align="center"></el-table-column>
            <el-table-column prop="08-29" label="08-29" align="center"></el-table-column>
            <el-table-column prop="08-30" label="08-30" align="center"></el-table-column>
            <el-table-column prop="09-01" label="09-01" align="center"></el-table-column>
            <el-table-column prop="09-02" label="09-02" align="center"></el-table-column>
            <el-table-column align="right" width="40">
                <template slot="header" slot-scope="scope" align="center">
                    <i class="el-icon-arrow-right"></i>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dataForm: {},
      tableData: [
        {
          id: "12987122",
          name: "标准房",
          priceId: 1,
          pricename: "价格1",
          rowSpan: 2,
          colSpan: 1,
          "08-23": 100,
          "08-24": 100,
          "08-25": 100,
          "08-26": 100,
          "08-27": 100,
          "08-28": 100,
          "08-29": 100,
          "08-30": 100,
          "09-01": 100,
          "09-02": 100
        },
        {
          id: "12987122",
          name: "标准房",
          priceId: 1,
          pricename: "价格1",
          rowSpan: 2,
          colSpan: 1,
          "08-23": 100,
          "08-24": 100,
          "08-25": 100,
          "08-26": 100,
          "08-27": 100,
          "08-28": 100,
          "08-29": 100,
          "08-30": 100,
          "09-01": 100,
          "09-02": 100
        },
        {
          id: "12987122",
          name: "标准房",
          priceId: 2,
          pricename: "价格2",
          rowSpan: 0,
          colSpan: 0,
          "08-23": 100,
          "08-24": 100,
          "08-25": 100,
          "08-26": 100,
          "08-27": 100,
          "08-28": 100,
          "08-29": 100,
          "08-30": 100,
          "09-01": 100,
          "09-02": 100
        },
        {
          id: "12987122",
          name: "标准房",
          priceId: 3,
          pricename: "价格2",
          "08-23": 100,
          "08-24": 100,
          "08-25": 100,
          "08-26": 100,
          "08-27": 100,
          "08-28": 100,
          "08-29": 100,
          "08-30": 100,
          "09-01": 100,
          "09-02": 100
        },
        {
          id: "12987125",
          name: "标准房",
          priceId: 3,
          pricename: "价格2",
          "08-23": 100,
          "08-24": 100,
          "08-25": 100,
          "08-26": 100,
          "08-27": 100,
          "08-28": 100,
          "08-29": 100,
          "08-30": 100,
          "09-01": 100,
          "09-02": 100
        },
        {
          id: "12987125",
          name: "标准房1",
          priceId: 2,
          pricename: "价格2",
          "08-23": 100,
          "08-24": 100,
          "08-25": 100,
          "08-26": 100,
          "08-27": 100,
          "08-28": 100,
          "08-29": 100,
          "08-30": 100,
          "09-01": 100,
          "09-02": 100
        },
        {
          id: "12987126",
          name: "标准房1",
          priceId: 2,
          pricename: "价格2",
          "08-23": 100,
          "08-24": 100,
          "08-25": 100,
          "08-26": 100,
          "08-27": 100,
          "08-28": 100,
          "08-29": 100,
          "08-30": 100,
          "09-01": 100,
          "09-02": 100
        }
      ]
    };
  },
  activated() {
    this.tableData = this.handlerData();
  },
  methods: {
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
    handlerData() {
      let newData = [];
      let data = {};
      this.tableData.forEach((item, index) => {
        if (!data[String(item.id)]) {
          data[String(item.id)] = this.tableData.filter(
            _item => _item.id === item.id
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
      console.log(newData);
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
