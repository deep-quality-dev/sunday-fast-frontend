<template>
  <el-dialog :title="'结算设置'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="120px"
    >
      <el-form-item label="周期类型" prop="type">
        <el-radio v-model="dataForm.type" :label="1">每周（每周一自动结算）</el-radio>
        <el-radio v-model="dataForm.type" :label="2">每月（每月1号自动结算）</el-radio>
      </el-form-item>
      <el-form-item label="会员订单费率" prop="vipRate">
        <el-input-number
          style="width:100%"
          v-model="dataForm.vipRate"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :max="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="普通费率" prop="rate">
        <el-input-number
          style="width:100%"
          v-model="dataForm.rate"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :max="1"
        ></el-input-number>
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
        type: "",
        value: "",
        vipRate: "",
        rate: "",
        createTime: ""
      },
      dataRule: {
        type: [
          { required: true, message: "周期类型不能为空", trigger: "blur" }
        ],
        value: [{ required: true, message: "值不能为空", trigger: "blur" }],
        vipRate: [
          { required: true, message: "会员订单费率不能为空", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "普通费率不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.$http({
          url: this.$http.adornUrl(`/hotel/hotelliquidationsetting/info`),
          method: "get"
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm.id = data.hotelLiquidationSetting.id || 0;
            this.dataForm.type = data.hotelLiquidationSetting.type;
            this.dataForm.value = data.hotelLiquidationSetting.value;
            this.dataForm.vipRate = data.hotelLiquidationSetting.vipRate;
            this.dataForm.rate = data.hotelLiquidationSetting.rate;
            this.dataForm.createTime = data.hotelLiquidationSetting.createTime;
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
              `/hotel/hotelliquidationsetting/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              type: this.dataForm.type,
              value: this.dataForm.value,
              vipRate: this.dataForm.vipRate,
              rate: this.dataForm.rate,
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
