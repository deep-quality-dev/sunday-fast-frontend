<template>
  <el-dialog :title="'订单通知设置'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="auto">
      <el-form-item label="邮件" prop="email">
        <el-tag
          :key="tag"
          v-for="tag in emails"
          closable
          :disable-transitions="false"
          @close="handleEmailClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="emailInputVisible"
          v-model="emailInputValue"
          ref="saveEmailInput"
          size="small"
        >
          <el-button slot="append" icon="el-icon-plus" @click="handleEmailInputConfirm()"></el-button>
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showEmailInput">+ 新增</el-button>
        <span class="tips">输入邮箱，用于接收预定消息</span>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-tag
          :key="tag"
          v-for="tag in mobiles"
          closable
          :disable-transitions="false"
          @close="handleMobileClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="mobileInputVisible"
          v-model="mobileInputValue"
          ref="saveMobileInput"
          size="small"
        >
          <el-button slot="append" icon="el-icon-plus" @click="handleMobileInputConfirm()"></el-button>
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showMobileInput()">+ 新增</el-button>
        <span class="tips">输入手机号，用于接收预定消息</span>
      </el-form-item>
      <el-form-item label="短信开关" prop="smsSwitch">
        <el-radio-group v-model="dataForm.smsSwitch">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
        <span class="tips">开启短信通知，及时接受订房通知</span>
      </el-form-item>
      <el-form-item label="邮件开关" prop="emailSwitch">
        <el-radio-group v-model="dataForm.emailSwitch">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
        <span class="tips">开启邮件通知，及时接受订房通知</span>
      </el-form-item>
      <el-form-item label="pc弹窗开关" prop="pcSwitch">
        <el-radio-group v-model="dataForm.pcSwitch">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
        <span class="tips">开启弹窗通知，及时接受订房通知</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isEmail, isMobile } from "@/utils/validate";
export default {
  data() {
    return {
      visible: false,
      mobiles: [],
      mobileInputVisible: false,
      mobileInputValue: "",
      emails: [],
      emailInputVisible: false,
      emailInputValue: "",
      dataForm: {
        id: 0,
        email: "",
        mobile: "",
        smsSwitch: 0,
        emailSwitch: 0,
        pcSwitch: 0
      },
      dataRule: {
        // email: [{ required: true, message: "邮件不能为空", trigger: "blur" }],
        // mobile: [{ required: true, message: "手机不能为空", trigger: "blur" }],
        smsSwitch: [
          { required: true, message: "短信开关不能为空", trigger: "blur" }
        ],
        emailSwitch: [
          { required: true, message: "邮件开关不能为空", trigger: "blur" }
        ],
        pcSwitch: [
          { required: true, message: "pc弹窗开关不能为空", trigger: "blur" }
        ],
        sellerId: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.$http({
          url: this.$http.adornUrl(`/hotel/hotelordernotification/info`),
          method: "get",
          params: this.$http.adornParams()
        }).then(({ data }) => {
          if (data && data.code === 0) {
            if (data.hotelOrderNotification) {
              this.dataForm.id  = data.hotelOrderNotification.id
              this.dataForm.email = data.hotelOrderNotification.email;
              this.dataForm.mobile = data.hotelOrderNotification.mobile;
              this.dataForm.smsSwitch = data.hotelOrderNotification.smsSwitch;
              this.dataForm.emailSwitch =
                data.hotelOrderNotification.emailSwitch;
              this.dataForm.pcSwitch = data.hotelOrderNotification.pcSwitch;
              this.dataForm.sellerId = data.hotelOrderNotification.sellerId;
              if (data.hotelOrderNotification.email) {
                this.emails = data.hotelOrderNotification.email.split(",");
              }
              if (data.hotelOrderNotification.mobile) {
                this.mobiles = data.hotelOrderNotification.mobile.split(",");
              }
            }
          }
        });
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelordernotification/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              email: this.dataForm.email,
              mobile: this.dataForm.mobile,
              smsSwitch: this.dataForm.smsSwitch,
              emailSwitch: this.dataForm.emailSwitch,
              pcSwitch: this.dataForm.pcSwitch,
              sellerId: this.dataForm.sellerId
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
    handleMobileClose(tag) {
      this.mobiles.splice(this.mobiles.indexOf(tag), 1);
      if (this.mobiles.length > 0) {
        this.dataForm.mobile = this.mobiles.join(",");
      }
    },

    showMobileInput() {
      this.mobileInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveMobileInput.$refs.input.focus();
      });
    },
    handleEmailInputBlur() {
      this.mobileInputVisible = false;
      this.mobileInputValue = "";
    },
    handleMobileInputConfirm() {
      let mobileInputValue = this.mobileInputValue;
      if (!isMobile(this.mobileInputValue)) {
        this.$message.error("手机格式不正确");
        return;
      }
      if (mobileInputValue) {
        this.mobiles.push(mobileInputValue);
      }
      this.mobileInputVisible = false;
      this.mobileInputValue = "";
      this.dataForm.mobile = this.mobiles.join(",");
    },
    //邮件处理
    handleEmailClose(tag) {
      this.emails.splice(this.emails.indexOf(tag), 1);
      if (this.emails.length > 0) {
        this.dataForm.email = this.emails.join(",");
      }
    },

    showEmailInput() {
      this.emailInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveEmailInput.$refs.input.focus();
      });
    },
    handleEmailInputBlur() {
      this.emailInputVisible = false;
      this.emailInputValue = "";
    },
    handleEmailInputConfirm() {
      if (!isEmail(this.emailInputValue)) {
        this.$message.error("邮箱格式不正确");
        return;
      }
      let emailInputValue = this.emailInputValue;
      if (emailInputValue) {
        this.emails.push(emailInputValue);
      }
      this.emailInputVisible = false;
      this.emailInputValue = "";
      this.dataForm.email = this.emails.join(",");
    }
  }
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 200px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
