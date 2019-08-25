<template>
    <el-dialog title="房价管理" :close-on-click-modal="false" :visible.sync="visible">
        <el-table :data="dataList" style="width: 100%">
            <el-table-column prop="name" label="价格名称" width="180" align="center"></el-table-column>
            <el-table-column prop="price" label="价格" width="180" align="center"></el-table-column>
            <el-table-column prop="isVip" label="使用会员折扣" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isVip === 0" size="small" type="danger">否</el-tag>
                    <el-tag v-else size="small">是</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                header-align="center"
                align="center"
                width="200"
                label="操作"
            >
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
                <el-input
                    style="width:90px"
                    size="small"
                    v-model="dataForm.name"
                    placeholder="价格名称"
                ></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input style="width:90px" size="small" v-model="dataForm.price" placeholder="价格"></el-input>
            </el-form-item>
            <el-form-item label="会员折扣">
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
      visible: false,
      uploadAction: "",
      dialogImageUrl: "",
      dialogVisible: false,
      roomId: 0,
      dataForm: {
        id: 0,
        name: "",
        price: "",
        isVip: 0
      },
      dataList: [],
      dataRule: {
        name: [{ required: true, message: "价格字不能为空", trigger: "blur" }],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }]
      }
    };
  },
  activated() {},
  methods: {
    init(id) {
      this.roomId = id;
      this.visible = true;
      this.getDataList(id);
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
              idVip: this.dataForm.isVip,
              roomId: this.roomId
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
      this.dataForm.isVip = row.isVip;
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
    }
  }
};
</script>