<template>
  <el-dialog
    class="withdrawal-setting"
    :title="'提现设置'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="120px"
    >
      <el-form-item label="提现方式" prop="txMode">
        <el-radio-group v-model="dataForm.txMode">
          <el-radio :label="1">支付宝</el-radio>
          <el-radio :disabled="true" :label="2">微信</el-radio>
          <el-radio :disabled="true" :label="3">银行卡</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最低提现金额" prop="zdMoney">
        <el-input v-model="dataForm.zdMoney" placeholder="最低提现金额"></el-input>
      </el-form-item>
      <el-form-item label="提现费率" prop="txSxf">
        <el-input v-model="dataForm.txSxf" placeholder="提现费率"></el-input>
      </el-form-item>
      <el-form-item label="提现须知" prop="txNotice">
        <quill-editor
          style="height:200px"
          class="editor"
          v-model="dataForm.txNotice"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
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
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike", "link", "image", "align"],
            ["blockquote", "code-block"]
          ]
        }
      },
      visible: false,
      dataForm: {
        id: 0,
        zdMoney: "",
        txSxf: "",
        txNotice: "",
        txMode: ""
      },
      dataRule: {
        name: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" }
        ],
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "1支付宝 2.微信 3.银行不能为空",
            trigger: "blur"
          }
        ],
        time: [
          { required: true, message: "申请时间不能为空", trigger: "blur" }
        ],
        auditTime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.$http({
          url: this.$http.adornUrl(`/hotel/hotelsystem/info`),
          method: "get",
          params: this.$http.adornParams()
        }).then(({ data }) => {
          if (data && data.code === 0 && data.hotelSystem) {
            this.dataForm.zdMoney = data.hotelSystem.zdMoney;
            this.dataForm.txSxf = data.hotelSystem.txSxf;
            this.dataForm.txNotice = data.hotelSystem.txNotice;
            this.dataForm.txMode = data.hotelSystem.txMode;
          }
        });
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/hotel/hotelsystem/withdrawSetting`),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              zdMoney: this.dataForm.zdMoney,
              txSxf: this.dataForm.txSxf,
              txNotice: this.dataForm.txNotice,
              txMode: this.dataForm.txMode
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
    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    }
  }
};
</script>
<style lang="less">
.withdrawal-setting {
  .el-dialog__body {
    max-height: 88vh;
    min-height: 50vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

