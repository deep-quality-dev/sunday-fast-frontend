<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="dataForm.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="dataForm.password" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        sellerId: "",
        userId: "",
        createTime: "",
        name: "",
        userName: "",
        mobile: "",
        password: "",
        email: ""
      },
      dataRule: {
        sellerId: [{ required: true, message: "不能为空", trigger: "blur" }],
        userId: [{ required: true, message: "不能为空", trigger: "blur" }],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        mobile: [{ required: true, message: "手机不能为空", trigger: "blur" }],
        password: [{ required: true, message: "不能为空", trigger: "blur" }],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelselleremployee/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.sellerId = data.hotelSellerEmployee.sellerId;
              this.dataForm.userId = data.hotelSellerEmployee.userId;
              this.dataForm.createTime = data.hotelSellerEmployee.createTime;
              this.dataForm.name = data.hotelSellerEmployee.name;
              this.dataForm.userName = data.hotelSellerEmployee.userName;
              this.dataForm.mobile = data.hotelSellerEmployee.mobile;
              this.dataForm.password = data.hotelSellerEmployee.password;
              this.dataForm.email = data.hotelSellerEmployee.email;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelselleremployee/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              sellerId: this.dataForm.sellerId,
              userId: this.dataForm.userId,
              createTime: this.dataForm.createTime,
              name: this.dataForm.name,
              userName: this.dataForm.userName,
              mobile: this.dataForm.mobile,
              password: this.dataForm.password,
              email: this.dataForm.email
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    }
  }
};
</script>
