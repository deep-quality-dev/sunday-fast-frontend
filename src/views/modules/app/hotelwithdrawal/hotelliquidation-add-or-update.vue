<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="周期" prop="period">
      <el-input v-model="dataForm.period" placeholder="周期"></el-input>
    </el-form-item>
    <el-form-item label="商家名称" prop="sellerName">
      <el-input v-model="dataForm.sellerName" placeholder="商家名称"></el-input>
    </el-form-item>
    <el-form-item label="" prop="sellerId">
      <el-input v-model="dataForm.sellerId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="佣金" prop="commission">
      <el-input v-model="dataForm.commission" placeholder="佣金"></el-input>
    </el-form-item>
    <el-form-item label="结算金额" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="结算金额"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
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
          period: '',
          sellerName: '',
          sellerId: '',
          commission: '',
          amount: '',
          createTime: ''
        },
        dataRule: {
          period: [
            { required: true, message: '周期不能为空', trigger: 'blur' }
          ],
          sellerName: [
            { required: true, message: '商家名称不能为空', trigger: 'blur' }
          ],
          sellerId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          commission: [
            { required: true, message: '佣金不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '结算金额不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/hotel/hotelliquidation/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.period = data.hotelliquidation.period
                this.dataForm.sellerName = data.hotelliquidation.sellerName
                this.dataForm.sellerId = data.hotelliquidation.sellerId
                this.dataForm.commission = data.hotelliquidation.commission
                this.dataForm.amount = data.hotelliquidation.amount
                this.dataForm.createTime = data.hotelliquidation.createTime
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
              url: this.$http.adornUrl(`/hotel/hotelliquidation/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'period': this.dataForm.period,
                'sellerName': this.dataForm.sellerName,
                'sellerId': this.dataForm.sellerId,
                'commission': this.dataForm.commission,
                'amount': this.dataForm.amount,
                'createTime': this.dataForm.createTime
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
