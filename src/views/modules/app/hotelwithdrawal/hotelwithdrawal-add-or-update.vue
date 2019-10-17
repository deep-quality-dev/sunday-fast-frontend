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
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="dataForm.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="1支付宝 2.微信 3.银行" prop="type">
        <el-input v-model="dataForm.type" placeholder="1支付宝 2.微信 3.银行"></el-input>
      </el-form-item>
      <el-form-item label="申请时间" prop="time">
        <el-input v-model="dataForm.time" placeholder="申请时间"></el-input>
      </el-form-item>
      <el-form-item label="审核时间" prop="auditTime">
        <el-input v-model="dataForm.auditTime" placeholder="审核时间"></el-input>
      </el-form-item>
      <el-form-item label="1.待审核 2.通过  3.拒绝" prop="state">
        <el-input v-model="dataForm.state" placeholder="1.待审核 2.通过  3.拒绝"></el-input>
      </el-form-item>
      <el-form-item label="提现金额" prop="withdrawCost">
        <el-input v-model="dataForm.withdrawCost" placeholder="提现金额"></el-input>
      </el-form-item>
      <el-form-item label="实际金额" prop="realityCost">
        <el-input v-model="dataForm.realityCost" placeholder="实际金额"></el-input>
      </el-form-item>
      <el-form-item label="商家id" prop="sellerId">
        <el-input v-model="dataForm.sellerId" placeholder="商家id"></el-input>
      </el-form-item>
      <el-form-item label="1显示,0删除" prop="enabled">
        <el-input v-model="dataForm.enabled" placeholder="1显示,0删除"></el-input>
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
        name: "",
        username: "",
        type: "",
        time: "",
        auditTime: "",
        state: "",
        withdrawCost: "",
        realityCost: "",
        sellerId: "",
        enabled: ""
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
        ],
        state: [
          {
            required: true,
            message: "1.待审核 2.通过  3.拒绝不能为空",
            trigger: "blur"
          }
        ],
        withdrawCost: [
          { required: true, message: "提现金额不能为空", trigger: "blur" }
        ],
        realityCost: [
          { required: true, message: "实际金额不能为空", trigger: "blur" }
        ],
        sellerId: [
          { required: true, message: "商家id不能为空", trigger: "blur" }
        ],
        enabled: [
          { required: true, message: "1显示,0删除不能为空", trigger: "blur" }
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
              `/hotel/hotelwithdrawal/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.hotelwithdrawal.name;
              this.dataForm.username = data.hotelwithdrawal.username;
              this.dataForm.type = data.hotelwithdrawal.type;
              this.dataForm.time = data.hotelwithdrawal.time;
              this.dataForm.auditTime = data.hotelwithdrawal.auditTime;
              this.dataForm.state = data.hotelwithdrawal.state;
              this.dataForm.withdrawCost = data.hotelwithdrawal.withdrawCost;
              this.dataForm.realityCost = data.hotelwithdrawal.realityCost;
              this.dataForm.sellerId = data.hotelwithdrawal.sellerId;
              this.dataForm.enabled = data.hotelwithdrawal.enabled;
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
              `/hotel/hotelwithdrawal/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              username: this.dataForm.username,
              type: this.dataForm.type,
              time: this.dataForm.time,
              auditTime: this.dataForm.auditTime,
              state: this.dataForm.state,
              withdrawCost: this.dataForm.withdrawCost,
              realityCost: this.dataForm.realityCost,
              sellerId: this.dataForm.sellerId,
              enabled: this.dataForm.enabled
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
