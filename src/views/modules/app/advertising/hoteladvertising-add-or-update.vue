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
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="轮播图标题"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="logo">
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="dataForm.logo" :src="dataForm.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="链接" prop="src">
        <el-input v-model="dataForm.src" placeholder="链接"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="orderby">
        <el-input v-model="dataForm.orderby" placeholder="排序"></el-input>
      </el-form-item>
      <el-form-item label="外部链接" prop="wbSrc">
        <el-input v-model="dataForm.wbSrc" placeholder="外部链接"></el-input>
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
      uploadAction:'',
      visible: false,
      dataForm: {
        id: 0,
        title: "",
        logo: "",
        status: "",
        src: "",
        orderby: "",
        sellerId: "",
        type: "",
        wbSrc: "",
        state: ""
      },
      dataRule: {
        title: [
          { required: true, message: "轮播图标题不能为空", trigger: "blur" }
        ],
        logo: [{ required: true, message: "图片不能为空", trigger: "blur" }],
        src: [{ required: true, message: "链接不能为空", trigger: "blur" }],
        orderby: [{ required: true, message: "排序不能为空", trigger: "blur" }],
        type: [{ required: true, message: "1开屏不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.uploadAction = this.$http.adornUrl(`/sys/oss/upload?token=${this.$cookie.get('token')}`)
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hoteladvertising/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.title = data.hotelAdvertising.title;
              this.dataForm.logo = data.hotelAdvertising.logo;
              this.dataForm.src = data.hotelAdvertising.src;
              this.dataForm.orderby = data.hotelAdvertising.orderby;
              this.dataForm.type = data.hotelAdvertising.type;
              this.dataForm.wbSrc = data.hotelAdvertising.wbSrc;
              this.dataForm.state = data.hotelAdvertising.state;
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
              `/hotel/hoteladvertising/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              title: this.dataForm.title,
              logo: this.dataForm.logo,
              src: this.dataForm.src,
              orderby: this.dataForm.orderby,
              type: this.dataForm.type,
              wbSrc: this.dataForm.wbSrc
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
      this.dataForm.logo = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
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
    border-color: #409EFF;
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
