<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="liquidationId">
      <el-input v-model="dataForm.liquidationId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="订单名称" prop="orderName">
      <el-input v-model="dataForm.orderName" placeholder="订单名称"></el-input>
    </el-form-item>
    <el-form-item label="佣金" prop="commission">
      <el-input v-model="dataForm.commission" placeholder="佣金"></el-input>
    </el-form-item>
    <el-form-item label="结算金额" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="结算金额"></el-input>
    </el-form-item>
    <el-form-item label="订单金额" prop="orderAmount">
      <el-input v-model="dataForm.orderAmount" placeholder="订单金额"></el-input>
    </el-form-item>
    <el-form-item label="是否会员" prop="vipFlag">
      <el-input v-model="dataForm.vipFlag" placeholder="是否会员"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="费率" prop="rate">
      <el-input v-model="dataForm.rate" placeholder="费率"></el-input>
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
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          liquidationId: '',
          orderId: '',
          orderName: '',
          commission: '',
          amount: '',
          orderAmount: '',
          vipFlag: '',
          createTime: '',
          rate: ''
        },
        dataRule: {
          liquidationId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          orderId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          orderName: [
            { required: true, message: '订单名称不能为空', trigger: 'blur' }
          ],
          commission: [
            { required: true, message: '佣金不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '结算金额不能为空', trigger: 'blur' }
          ],
          orderAmount: [
            { required: true, message: '订单金额不能为空', trigger: 'blur' }
          ],
          vipFlag: [
            { required: true, message: '是否会员不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          rate: [
            { required: true, message: '费率不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/hotel/hotelliquidationrecord/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.liquidationId = data.hotelliquidationrecord.liquidationId
                this.dataForm.orderId = data.hotelliquidationrecord.orderId
                this.dataForm.orderName = data.hotelliquidationrecord.orderName
                this.dataForm.commission = data.hotelliquidationrecord.commission
                this.dataForm.amount = data.hotelliquidationrecord.amount
                this.dataForm.orderAmount = data.hotelliquidationrecord.orderAmount
                this.dataForm.vipFlag = data.hotelliquidationrecord.vipFlag
                this.dataForm.createTime = data.hotelliquidationrecord.createTime
                this.dataForm.rate = data.hotelliquidationrecord.rate
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/hotel/hotelliquidationrecord/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'liquidationId': this.dataForm.liquidationId,
                'orderId': this.dataForm.orderId,
                'orderName': this.dataForm.orderName,
                'commission': this.dataForm.commission,
                'amount': this.dataForm.amount,
                'orderAmount': this.dataForm.orderAmount,
                'vipFlag': this.dataForm.vipFlag,
                'createTime': this.dataForm.createTime,
                'rate': this.dataForm.rate
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
