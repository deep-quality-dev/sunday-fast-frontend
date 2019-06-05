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
      <el-form-item label="存储方式" prop="storage">
        <el-input v-model="dataForm.storage" placeholder="存储方式"></el-input>
      </el-form-item>
      <el-form-item label="文件分组id" prop="groupId">
        <el-input v-model="dataForm.groupId" placeholder="文件分组id"></el-input>
      </el-form-item>
      <el-form-item label="存储域名" prop="fileUrl">
        <el-input v-model="dataForm.fileUrl" placeholder="存储域名"></el-input>
      </el-form-item>
      <el-form-item label="文件路径" prop="fileName">
        <el-input v-model="dataForm.fileName" placeholder="文件路径"></el-input>
      </el-form-item>
      <el-form-item label="文件大小(字节)" prop="fileSize">
        <el-input v-model="dataForm.fileSize" placeholder="文件大小(字节)"></el-input>
      </el-form-item>
      <el-form-item label="文件类型" prop="fileType">
        <el-input v-model="dataForm.fileType" placeholder="文件类型"></el-input>
      </el-form-item>
      <el-form-item label="文件扩展名" prop="extension">
        <el-input v-model="dataForm.extension" placeholder="文件扩展名"></el-input>
      </el-form-item>
      <el-form-item label="软删除" prop="isDelete">
        <el-input v-model="dataForm.isDelete" placeholder="软删除"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
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
        storage: "",
        groupId: "",
        fileUrl: "",
        fileName: "",
        fileSize: "",
        fileType: "",
        extension: "",
        isDelete: "",
        createTime: ""
      },
      dataRule: {
        storage: [
          { required: true, message: "存储方式不能为空", trigger: "blur" }
        ],
        groupId: [
          { required: true, message: "文件分组id不能为空", trigger: "blur" }
        ],
        fileUrl: [
          { required: true, message: "存储域名不能为空", trigger: "blur" }
        ],
        fileName: [
          { required: true, message: "文件路径不能为空", trigger: "blur" }
        ],
        fileSize: [
          { required: true, message: "文件大小(字节)不能为空", trigger: "blur" }
        ],
        fileType: [
          { required: true, message: "文件类型不能为空", trigger: "blur" }
        ],
        extension: [
          { required: true, message: "文件扩展名不能为空", trigger: "blur" }
        ],
        isDelete: [
          { required: true, message: "软删除不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
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
              `/app/uploadfile/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.storage = data.uploadfile.storage;
              this.dataForm.groupId = data.uploadfile.groupId;
              this.dataForm.fileUrl = data.uploadfile.fileUrl;
              this.dataForm.fileName = data.uploadfile.fileName;
              this.dataForm.fileSize = data.uploadfile.fileSize;
              this.dataForm.fileType = data.uploadfile.fileType;
              this.dataForm.extension = data.uploadfile.extension;
              this.dataForm.isDelete = data.uploadfile.isDelete;
              this.dataForm.createTime = data.uploadfile.createTime;
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
              `/admin/uploadfile/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              storage: this.dataForm.storage,
              groupId: this.dataForm.groupId,
              fileUrl: this.dataForm.fileUrl,
              fileName: this.dataForm.fileName,
              fileSize: this.dataForm.fileSize,
              fileType: this.dataForm.fileType,
              extension: this.dataForm.extension,
              isDelete: this.dataForm.isDelete,
              createTime: this.dataForm.createTime
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
