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
      <el-form-item label="轮播图标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="轮播图标题"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="logo">
        <el-input v-model="dataForm.logo" placeholder="图片"></el-input>
      </el-form-item>
      <el-form-item label="1.开启  2.关闭" prop="status">
        <el-input v-model="dataForm.status" placeholder="1.开启  2.关闭"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="src">
        <el-input v-model="dataForm.src" placeholder="链接"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="orderby">
        <el-input v-model="dataForm.orderby" placeholder="排序"></el-input>
      </el-form-item>
      <el-form-item label="商家ID" prop="sellerId">
        <el-input v-model="dataForm.sellerId" placeholder="商家ID"></el-input>
      </el-form-item>
      <el-form-item label="1开屏" prop="type">
        <el-input v-model="dataForm.type" placeholder="1开屏"></el-input>
      </el-form-item>
      <el-form-item label="外部链接" prop="wbSrc">
        <el-input v-model="dataForm.wbSrc" placeholder="外部链接"></el-input>
      </el-form-item>
      <el-form-item label="1内部，2外部,3跳转" prop="state">
        <el-input v-model="dataForm.state" placeholder="1内部，2外部,3跳转"></el-input>
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
        status: [
          { required: true, message: "1.开启  2.关闭不能为空", trigger: "blur" }
        ],
        src: [{ required: true, message: "链接不能为空", trigger: "blur" }],
        orderby: [{ required: true, message: "排序不能为空", trigger: "blur" }],
        sellerId: [
          { required: true, message: "商家ID不能为空", trigger: "blur" }
        ],
        type: [{ required: true, message: "1开屏不能为空", trigger: "blur" }],
        wbSrc: [
          { required: true, message: "外部链接不能为空", trigger: "blur" }
        ],
        state: [
          {
            required: true,
            message: "1内部，2外部,3跳转不能为空",
            trigger: "blur"
          }
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
              `/hotel/hoteladvertising/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.title = data.hoteladvertising.title;
              this.dataForm.logo = data.hoteladvertising.logo;
              this.dataForm.status = data.hoteladvertising.status;
              this.dataForm.src = data.hoteladvertising.src;
              this.dataForm.orderby = data.hoteladvertising.orderby;
              this.dataForm.sellerId = data.hoteladvertising.sellerId;
              this.dataForm.type = data.hoteladvertising.type;
              this.dataForm.wbSrc = data.hoteladvertising.wbSrc;
              this.dataForm.state = data.hoteladvertising.state;
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
              status: this.dataForm.status,
              src: this.dataForm.src,
              orderby: this.dataForm.orderby,
              sellerId: this.dataForm.sellerId,
              type: this.dataForm.type,
              wbSrc: this.dataForm.wbSrc,
              state: this.dataForm.state
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
