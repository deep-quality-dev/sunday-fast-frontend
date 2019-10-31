<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>提现申请</span>
        </div>
        <div>
            <el-form :rules="dataRule" ref="dataForm" :model="dataForm" label-width="auto">
                <el-form-item label="当前可提现金额">
                    <div>
                        <span style="font-size:24px;color:#e54346;">{{amountInfo.amount}}</span>
                    </div>
                    <span class="tips">
                        *当前账户余额如果小于最低提现金额(
                        <span style="color:#e54346;">{{amountInfo.system}}</span>)，则不能提现,提现手续费为(
                        <span style="color:#e54346;">{{amountInfo.rate}}%</span>),实际到账将扣除手续费用
                    </span>
                </el-form-item>
                <el-form-item label="账户类型" prop="type">
                    <el-radio-group v-model="dataForm.type">
                        <el-radio :label="1">支付宝</el-radio>
                        <el-radio :disabled="true" :label="2">微信</el-radio>
                        <el-radio :disabled="true" :label="3">银行卡</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="账户" prop="username">
                    <el-input v-model="dataForm.username"></el-input>
                    <span class="tips">*请仔细填写账号信息，如果由于您填写错误导致资金流失，平台概不负责</span>
                </el-form-item>
                <el-form-item label="真实姓名" prop="name">
                    <el-input v-model="dataForm.name"></el-input>
                </el-form-item>
                <el-form-item label="提现金额" prop="withdrawCost">
                    <el-input type="number" v-model="dataForm.withdrawCost">
                        <el-button slot="append">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onSubmit"
                        :disabled="dataForm.withdrawCost<1 && submitFlaf ==0"
                    >立即提现</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>
<script>
export default {
  data() {
    return {
      submitFlaf: 0,
      amountInfo: {},
      dataForm: {
        type: 1,
        name: "",
        username: "",
        withdrawCost: ""
      },
      dataRule: {
        name: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" }
        ],
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        withdrawCost: [
          { required: true, message: "提现金额不能为空", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "1支付宝 2.微信 3.银行不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelwithdrawal/withdrawalApplyData`),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.amountInfo = data.data;
        }
      });
    },
    onSubmit() {
      this.submitFlaf = 1;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.dataForm.withdrawCost < 1) {
            this.$message.error("提现金额必须大于1");
            return;
          }
          this.$http({
            url: this.$http.adornUrl(`/hotel/hotelwithdrawal/withdrawalApply`),
            method: "post",
            data: this.$http.adornData({
              amount: this.dataForm.withdrawCost,
              accountType: this.dataForm.type,
              account: this.dataForm.username,
              realName: this.dataForm.name
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.$refs["dataForm"].resetFields();
                  this.submitFlaf = 0;
                  this.getData();
                }
              });
            } else {
              this.submitFlaf = 0;
              this.$message.error(data.msg);
            }
          });
        }
      });
    }
  }
};
</script>