<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item label="充值金额" prop="czMoney">
      <el-input v-model="dataForm.czMoney" placeholder="充值金额"></el-input>
    </el-form-item>
    <el-form-item label="赠送金额" prop="zsMoney">
      <el-input v-model="dataForm.zsMoney" placeholder="赠送金额"></el-input>
    </el-form-item>
    <el-form-item label="备注信息" prop="note">
      <el-input v-model="dataForm.note" placeholder="备注信息"></el-input>
    </el-form-item>
    <el-form-item label="商户号" prop="outTradeNo">
      <el-input v-model="dataForm.outTradeNo" placeholder="商户号"></el-input>
    </el-form-item>
    <el-form-item label="1未付款,2已付款" prop="state">
      <el-input v-model="dataForm.state" placeholder="1未付款,2已付款"></el-input>
    </el-form-item>
    <el-form-item label="" prop="time">
      <el-input v-model="dataForm.time" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="cardId">
      <el-input v-model="dataForm.cardId" placeholder=""></el-input>
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
          userId: '',
          czMoney: '',
          zsMoney: '',
          note: '',
          outTradeNo: '',
          state: '',
          time: '',
          cardId: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          czMoney: [
            { required: true, message: '充值金额不能为空', trigger: 'blur' }
          ],
          zsMoney: [
            { required: true, message: '赠送金额不能为空', trigger: 'blur' }
          ],
          note: [
            { required: true, message: '备注信息不能为空', trigger: 'blur' }
          ],
          outTradeNo: [
            { required: true, message: '商户号不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '1未付款,2已付款不能为空', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          cardId: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/hotel/hotelrecharge/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.hotelrecharge.userId
                this.dataForm.czMoney = data.hotelrecharge.czMoney
                this.dataForm.zsMoney = data.hotelrecharge.zsMoney
                this.dataForm.note = data.hotelrecharge.note
                this.dataForm.outTradeNo = data.hotelrecharge.outTradeNo
                this.dataForm.state = data.hotelrecharge.state
                this.dataForm.time = data.hotelrecharge.time
                this.dataForm.cardId = data.hotelrecharge.cardId
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
              url: this.$http.adornUrl(`/hotel/hotelrecharge/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'czMoney': this.dataForm.czMoney,
                'zsMoney': this.dataForm.zsMoney,
                'note': this.dataForm.note,
                'outTradeNo': this.dataForm.outTradeNo,
                'state': this.dataForm.state,
                'time': this.dataForm.time,
                'cardId': this.dataForm.cardId
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
