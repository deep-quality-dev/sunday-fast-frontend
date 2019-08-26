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
      <el-form-item label="会员名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="会员名称"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleIconSuccess"
          :before-upload="beforeIconUpload"
        >
          <img v-if="dataForm.icon" :src="dataForm.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="背景图" prop="bgImage">
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleBgImageSuccess"
          :before-upload="beforeBgImageUpload"
        >
          <img v-if="dataForm.bgImage" :src="dataForm.bgImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="会员折扣" prop="discount">
        <el-input v-model="dataForm.discount" placeholder="折扣"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="orderby">
        <el-input v-model="dataForm.orderby" placeholder="排序"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input v-model="dataForm.content" placeholder="描述"></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否需要支付" prop="payFlag">
        <el-input v-model="dataForm.payFlag" placeholder="是否需要支付"></el-input>
      </el-form-item>
      <el-form-item label="费用" prop="payAmount">
        <el-input v-model="dataForm.payAmount" placeholder="费用"></el-input>
      </el-form-item>-->
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
        icon: "",
        discount: "",
        bgImage: "",
        orderby: 1,
        content: "",
        payFlag: "",
        payAmount: ""
      },
      dataRule: {
        name: [
          { required: true, message: "会员名称不能为空", trigger: "blur" }
        ],
        icon: [{ required: true, message: "图标不能为空", trigger: "blur" }],
        orderby: [{ required: true, message: "排序不能为空", trigger: "blur" }]
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
              `/hotel/hotelmemberlevel/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.hotelMemberLevel.name;
              this.dataForm.icon = data.hotelMemberLevel.icon;
              this.dataForm.discount = data.hotelMemberLevel.discount;
              this.dataForm.bgImage = data.hotelMemberLevel.bgImage;
              this.dataForm.orderby = data.hotelMemberLevel.orderby;
              this.dataForm.content = data.hotelMemberLevel.content;
              this.dataForm.payFlag = data.hotelMemberLevel.payFlag;
              this.dataForm.payAmount = data.hotelMemberLevel.payAmount;
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
              `/hotel/hotelmemberlevel/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              icon: this.dataForm.icon,
              discount: this.dataForm.discount,
              orderby: this.dataForm.orderby,
              content: this.dataForm.content,
              bgImage:this.dataForm.bgImage,
              payFlag: this.dataForm.payFlag,
              payAmount: this.dataForm.payAmount
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
    handleIconSuccess(res, file) {
      this.dataForm.icon = res.url;
    },
    beforeIconUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleBgImageSuccess(res, file) {
      this.dataForm.bgImage = res.url;
    },
    beforeBgImageUpload(file) {
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
