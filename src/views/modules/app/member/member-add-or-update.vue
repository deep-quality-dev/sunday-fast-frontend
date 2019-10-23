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
      label-width="auto"
    >
      <el-form-item label="昵称" prop="name">
        <el-input v-model="dataForm.name" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="img">
        <!--<el-input v-model="dataForm.img" placeholder="头像"></el-input>-->
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="dataForm.img" :src="dataForm.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="dataForm.tel" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="zsName">
        <el-input v-model="dataForm.zsName" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="identityNo">
        <el-input v-model="dataForm.identityNo" placeholder="身份证"></el-input>
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
      uploadAction: "",
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        joinTime: "",
        img: "",
        tel: "",
        type: "",
        zsName: "",
        number: "",
        identityNo: ""
      },
      dataRule: {
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        identityNo: [
          { required: true, message: "身份证不能为空", trigger: "blur" }
        ],
        img: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        tel: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        zsName: [
          { required: true, message: "真是姓名不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id) {
      this.uploadAction = this.$http.adornUrl(
        `/sys/oss/upload?token=${this.$cookie.get("token")}`
      );
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelmember/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.hotelMember.name;
              this.dataForm.joinTime = data.hotelMember.joinTime;
              this.dataForm.identityNo = data.hotelMember.identityNo;
              this.dataForm.img = data.hotelMember.img;
              this.dataForm.tel = data.hotelMember.tel;
              this.dataForm.type = data.hotelMember.type;
              this.dataForm.zsName = data.hotelMember.zsName;
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
              `/hotel/hotelmember/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              joinTime: this.dataForm.joinTime,
              img: this.dataForm.img,
              tel: this.dataForm.tel,
              identityNo: this.dataForm.identityNo,
              type: this.dataForm.type,
              zsName: this.dataForm.zsName
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
    },
    handleAvatarSuccess(res, file) {
      this.dataForm.img = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
