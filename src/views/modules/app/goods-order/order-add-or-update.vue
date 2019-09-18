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
      <el-form-item label="订单号，小程序中显示用" prop="orderSn">
        <el-input v-model="dataForm.orderSn" placeholder="订单号，小程序中显示用"></el-input>
      </el-form-item>
      <el-form-item label="订单号，微信支付时提交用，可变" prop="orderSnSubmit">
        <el-input v-model="dataForm.orderSnSubmit" placeholder="订单号，微信支付时提交用，可变"></el-input>
      </el-form-item>
      <el-form-item label="用户id" prop="uid">
        <el-input v-model="dataForm.uid" placeholder="用户id"></el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatus">
        <el-input v-model="dataForm.orderStatus" placeholder="订单状态 待付款0 已完成1 待发货2 待收货3 已取消4"></el-input>
      </el-form-item>
      <el-form-item label="物流单号" prop="expressnum">
        <el-input v-model="dataForm.expressnum" placeholder="物流单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人" prop="consignee">
        <el-input v-model="dataForm.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机"></el-input>
      </el-form-item>
      <el-form-item label="订单总价" prop="amount">
        <el-input v-model="dataForm.amount" placeholder="订单总价"></el-input>
      </el-form-item>
      <el-form-item label="下单时间" prop="submitTime">
        <el-input v-model="dataForm.submitTime" placeholder="下单时间"></el-input>
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
        orderSn: "",
        orderSnSubmit: "",
        uid: "",
        orderStatus: "",
        expressnum: "",
        consignee: "",
        address: "",
        mobile: "",
        amount: "",
        submitTime: ""
      },
      dataRule: {
        orderSn: [
          {
            required: true,
            message: "订单号，小程序中显示用不能为空",
            trigger: "blur"
          }
        ],
        orderSnSubmit: [
          {
            required: true,
            message: "订单号，微信支付时提交用，可变不能为空",
            trigger: "blur"
          }
        ],
        uid: [{ required: true, message: "用户id不能为空", trigger: "blur" }],
        orderStatus: [
          {
            required: true,
            message: "订单状态 待付款0 已完成1 待发货2 待收货3 已取消4不能为空",
            trigger: "blur"
          }
        ],
        expressnum: [
          { required: true, message: "物流单号不能为空", trigger: "blur" }
        ],
        consignee: [
          { required: true, message: "收货人不能为空", trigger: "blur" }
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        mobile: [{ required: true, message: "手机不能为空", trigger: "blur" }],
        amount: [
          { required: true, message: "订单总价不能为空", trigger: "blur" }
        ],
        submitTime: [
          { required: true, message: "下单时间不能为空", trigger: "blur" }
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
            url: this.$http.adornUrl(`/admin/order/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.orderSn = data.order.orderSn;
              this.dataForm.orderSnSubmit = data.order.orderSnSubmit;
              this.dataForm.uid = data.order.uid;
              this.dataForm.orderStatus = data.order.orderStatus;
              this.dataForm.expressnum = data.order.expressnum;
              this.dataForm.consignee = data.order.consignee;
              this.dataForm.address = data.order.address;
              this.dataForm.mobile = data.order.mobile;
              this.dataForm.amount = data.order.amount;
              this.dataForm.submitTime = data.order.submitTime;
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
              `/app/order/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              orderSn: this.dataForm.orderSn,
              orderSnSubmit: this.dataForm.orderSnSubmit,
              uid: this.dataForm.uid,
              orderStatus: this.dataForm.orderStatus,
              expressnum: this.dataForm.expressnum,
              consignee: this.dataForm.consignee,
              address: this.dataForm.address,
              mobile: this.dataForm.mobile,
              amount: this.dataForm.amount,
              submitTime: this.dataForm.submitTime
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
