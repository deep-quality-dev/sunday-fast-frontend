<template>
  <el-dialog
    title="房价管理"
    width="80%"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <el-table :data="dataList" style="width: 100%">
      <el-table-column prop="name" label="价格名称" align="center"></el-table-column>
       <el-table-column prop="oprice" label="原价" align="center"></el-table-column>
      <el-table-column prop="price" label="现价" align="center"></el-table-column>
      <el-table-column label="适用时段" align="center" v-if="room.classify == 0">
        <template slot-scope="scope" v-if="scope.row.startTime&&scope.row.endTime">
          <span
            v-if="scope.row.startTime&&scope.row.endTime"
          >{{scope.row.startTime + '-' + scope.row.endTime}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="prepay" label="预付" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.prepay === 0" size="small" type="danger">否</el-tag>
          <el-tag v-else size="small">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="integral" label="积分" align="center" v-if="room.classify == 1"></el-table-column>
      <el-table-column prop="num" label="数量" align="center"></el-table-column>
      <el-table-column prop="isVip" label="使用会员折扣" align="center" v-if="room.classify == 1">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isVip === 0" size="small" type="danger">否</el-tag>
          <el-tag v-else size="small">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form
      size="“small”"
      :inline="true"
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      class="demo-form-inline"
      style="margin-top:50px;"
    >
      <el-form-item label="价格名称" prop="name">
        <el-input style="width:150px" size="small" v-model="dataForm.name" placeholder="价格名称"></el-input>
      </el-form-item>
      <el-form-item label="原价" prop="oprice">
        <el-input style="width:90px" size="small" v-model="dataForm.oprice" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="现价" prop="price">
        <el-input style="width:90px" size="small" v-model="dataForm.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item v-if="room.classify == 0" label="适用时间" prop="timeRange">
        <el-time-picker size="mini" value-format="HH:mm" v-model="dataForm.timeRange" is-range></el-time-picker>
      </el-form-item>
      <el-form-item label="预付">
        <el-radio-group v-model="dataForm.prepay">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="room.classify == 1" label="积分" prop="integral">
        <el-input style="width:90px" size="small" v-model="dataForm.integral" placeholder="请输入积分"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="num">
        <el-input style="width:90px" size="small" v-model="dataForm.num" placeholder="价格"></el-input>
      </el-form-item>
      <el-form-item v-if="room.classify == 1" label="会员折扣">
        <el-radio-group v-model="dataForm.isVip">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" v-if="dataForm.id>0" @click="onCancelEdit">取消</el-button>
        <el-button size="medium" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
  <script>
export default {
  data() {
    return {
      timeRange: ["18:00", "20:00"],
      room: {},
      visible: false,
      uploadAction: "",
      dialogImageUrl: "",
      dialogVisible: false,
      roomId: 0,
      dataForm: {
        id: 0,
        name: "",
        price: "",
        oprice:"",
        timeRange: ["18:00", "20:00"],
        num: 0,
        integral: 0,
        prepay: 0,
        isVip: 0
      },
      dataList: [],
      dataRule: {
        name: [{ required: true, message: "价格字不能为空", trigger: "blur" }],
        timeRange: [
          { required: true, message: "适用时段不能为空", trigger: "blur" }
        ],
        price: [{ required: true, message: "现价不能为空", trigger: "blur" }],
        oprice: [{ required: true, message: "原价不能为空", trigger: "blur" }]
      }
    };
  },
  activated() {},
  methods: {
    init(room) {
      this.room = room;
      this.roomId = room.id;
      this.visible = true;
      this.getDataList(room.id);
    },
    // 获取数据列表
    getDataList(id) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelroommoney/list"),
        method: "get",
        params: this.$http.adornParams({
          roomId: id
        })
      }).then(({ data }) => {
        console.log(data);
        if (data && data.code === 0) {
          this.dataList = data.data;
        }
        this.dataListLoading = false;
      });
    },
    onSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelroommoney/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              price: this.dataForm.price,
              oprice:this.dataForm.oprice,
              num: this.dataForm.num,
              idVip: this.dataForm.isVip,
              integral: this.dataForm.integral,
              startTime: this.dataForm.timeRange[0],
              endTime: this.dataForm.timeRange[1],
              roomId: this.roomId,
              prepay: this.dataForm.prepay
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$refs["dataForm"].resetFields();
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.getDataList(this.roomId);
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    addOrUpdateHandle(row) {
      this.dataForm.id = row.id;
      this.dataForm.name = row.name;
      this.dataForm.price = row.price;
      this.dataForm.oprice = row.oprice;
      this.dataForm.isVip = row.isVip;
      this.dataForm.integral = row.integral;
      this.dataForm.num = row.num;
      this.dataForm.prepay = row.prepay;
      if (row.startTime && row.endTime) {
        this.dataForm.timeRange = [];
        this.dataForm.timeRange.push(row.startTime);
        this.dataForm.timeRange.push(row.endTime);
      } else {
        this.dataForm.timeRange = ["18:00", "20:00"];
      }
    },
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
          url: this.$http.adornUrl("/hotel/hotelroommoney/delete"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList(this.roomId);
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
    onCancelEdit() {
      this.dataForm.id = 0;
      this.$refs["dataForm"].resetFields();
      this.dataForm.timeRange = ["18:00", "20:00"];
    },
    handleClose() {
      this.dataForm.id = 0;
      this.$refs["dataForm"].resetFields();
      this.room = {};
      this.visible = false;
    }
  }
};
</script>