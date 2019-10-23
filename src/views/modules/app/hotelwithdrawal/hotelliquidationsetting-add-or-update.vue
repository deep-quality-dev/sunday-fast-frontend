<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="周期类型" prop="type">
      <el-input v-model="dataForm.type" placeholder="周期类型"></el-input>
    </el-form-item>
    <el-form-item label="值" prop="value">
      <el-input v-model="dataForm.value" placeholder="值"></el-input>
    </el-form-item>
    <el-form-item label="会员订单费率" prop="vipRate">
      <el-input v-model="dataForm.vipRate" placeholder="会员订单费率"></el-input>
    </el-form-item>
    <el-form-item label="普通费率" prop="rate">
      <el-input v-model="dataForm.rate" placeholder="普通费率"></el-input>
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
          type: '',
          value: '',
          vipRate: '',
          rate: '',
          createTime: ''
        },
        dataRule: {
          type: [
            { required: true, message: '周期类型不能为空', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '值不能为空', trigger: 'blur' }
          ],
          vipRate: [
            { required: true, message: '会员订单费率不能为空', trigger: 'blur' }
          ],
          rate: [
            { required: true, message: '普通费率不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/hotel/hotelliquidationsetting/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.type = data.hotelliquidationsetting.type
                this.dataForm.value = data.hotelliquidationsetting.value
                this.dataForm.vipRate = data.hotelliquidationsetting.vipRate
                this.dataForm.rate = data.hotelliquidationsetting.rate
                this.dataForm.createTime = data.hotelliquidationsetting.createTime
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
              url: this.$http.adornUrl(`/hotel/hotelliquidationsetting/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'value': this.dataForm.value,
                'vipRate': this.dataForm.vipRate,
                'rate': this.dataForm.rate,
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
