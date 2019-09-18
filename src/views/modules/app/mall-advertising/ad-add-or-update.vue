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
      <el-form-item label="类型" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择">
          <el-option v-for="item in adType" :key="item.type" :label="item.value" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <el-upload
          class="upload-demo"
          :action="actionUrl"
          :limit="1"
          :on-preview="handlePreview"
          :on-success="uploadSuccess"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
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
      actionUrl: this.$http.adornUrl(
        `/sys/oss/upload?token=${this.$cookie.get("token")}`
      ),
      fileList: [],
      adType: [{ type: 1, value: "首页" }],
      dataForm: {
        id: 0,
        type: "",
        title: "",
        img: "",
        gid: "",
        sort: 1
      },
      dataRule: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        sort: [{ required: true, message: "排序不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.fileList = [];
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/app/ad/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.type = data.ad.type;
              this.dataForm.title = data.ad.title;
              this.dataForm.sort = data.ad.sort;
              this.fileList = [
                {
                  name: data.ad.title,
                  url: data.ad.img
                }
              ];
            }
          });
        }
      });
    },
    uploadSuccess(res, file) {
      console.log(res);
      this.dataForm.img = res.url;
      console.log(this.dataForm)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          console.log(JSON.stringify(this.dataForm));
          this.$http({
            url: this.$http.adornUrl(
              `/app/ad/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              type: this.dataForm.type,
              title: this.dataForm.title,
              img: this.dataForm.img,
              sort: this.dataForm.sort
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
