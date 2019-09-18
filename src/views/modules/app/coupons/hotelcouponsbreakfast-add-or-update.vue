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
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="优惠券名称"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
         <el-date-picker v-model="dataForm.startTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
         <el-date-picker v-model="dataForm.endTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠条件" prop="conditions">
        <el-input v-model="dataForm.conditions" placeholder="优惠条件"></el-input>
      </el-form-item>
      <el-form-item label="发布数量" prop="number">
        <el-input v-model="dataForm.number" placeholder="发布数量"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="cost">
        <el-input v-model="dataForm.cost" placeholder="金额"></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="introduce">
        <el-input v-model="dataForm.introduce" placeholder="说明"></el-input>
      </el-form-item>
      <el-form-item label="领取数量" prop="lqNum">
        <el-input v-model="dataForm.lqNum" placeholder="领取数量"></el-input>
      </el-form-item>
      <el-form-item label="每人可领取张数" prop="klqzs">
        <el-input v-model="dataForm.klqzs" placeholder="每人可领取张数"></el-input>
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
        startTime: "",
        endTime: "",
        conditions: "",
        number: "",
        cost: "",
        type: "",
        introduce: "",
        lqNum: "",
        klqzs: ""
      },
      dataRule: {
        name: [
          { required: true, message: "优惠券名称不能为空", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        number: [
          { required: true, message: "发布数量不能为空", trigger: "blur" }
        ],
        cost: [{ required: true, message: "金额不能为空", trigger: "blur" }],

        introduce: [
          { required: true, message: "说明不能为空", trigger: "blur" }
        ],
        lqNum: [
          { required: true, message: "领取数量不能为空", trigger: "blur" }
        ],
        klqzs: [
          { required: true, message: "每人可领取张数不能为空", trigger: "blur" }
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
              `/hotel/hotelcouponsbreakfast/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.hotelCouponsBreakfast.name;
              this.dataForm.startTime = data.hotelCouponsBreakfast.startTime;
              this.dataForm.endTime = data.hotelCouponsBreakfast.endTime;
              this.dataForm.conditions = data.hotelCouponsBreakfast.conditions;
              this.dataForm.number = data.hotelCouponsBreakfast.number;
              this.dataForm.cost = data.hotelCouponsBreakfast.cost;
              this.dataForm.type = data.hotelCouponsBreakfast.type;
              this.dataForm.introduce = data.hotelCouponsBreakfast.introduce;
              this.dataForm.lqNum = data.hotelCouponsBreakfast.lqNum;
              this.dataForm.klqzs = data.hotelCouponsBreakfast.klqzs;
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
              `/hotel/hotelcouponsbreakfast/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              startTime: this.dataForm.startTime,
              endTime: this.dataForm.endTime,
              conditions: this.dataForm.conditions,
              number: this.dataForm.number,
              cost: this.dataForm.cost,
              type: this.dataForm.type,
              introduce: this.dataForm.introduce,
              lqNum: this.dataForm.lqNum,
              klqzs: this.dataForm.klqzs
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
