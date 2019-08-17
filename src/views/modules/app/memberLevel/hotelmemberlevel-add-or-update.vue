<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商家ID" prop="sellerId">
      <el-input v-model="dataForm.sellerId" placeholder="商家ID"></el-input>
    </el-form-item>
    <el-form-item label="会员名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="会员名称"></el-input>
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-input v-model="dataForm.icon" placeholder="图标"></el-input>
    </el-form-item>
    <el-form-item label="折扣" prop="discount">
      <el-input v-model="dataForm.discount" placeholder="折扣"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="orderby">
      <el-input v-model="dataForm.orderby" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="content">
      <el-input v-model="dataForm.content" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="是否需要支付" prop="payFlag">
      <el-input v-model="dataForm.payFlag" placeholder="是否需要支付"></el-input>
    </el-form-item>
    <el-form-item label="费用" prop="payAmount">
      <el-input v-model="dataForm.payAmount" placeholder="费用"></el-input>
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
          sellerId: '',
          name: '',
          icon: '',
          discount: '',
          orderby: '',
          content: '',
          payFlag: '',
          payAmount: ''
        },
        dataRule: {
          sellerId: [
            { required: true, message: '商家ID不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '会员名称不能为空', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '图标不能为空', trigger: 'blur' }
          ],
          discount: [
            { required: true, message: '折扣不能为空', trigger: 'blur' }
          ],
          orderby: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          payFlag: [
            { required: true, message: '是否需要支付不能为空', trigger: 'blur' }
          ],
          payAmount: [
            { required: true, message: '费用不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/hotel/hotelmemberlevel/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sellerId = data.hotelmemberlevel.sellerId
                this.dataForm.name = data.hotelmemberlevel.name
                this.dataForm.icon = data.hotelmemberlevel.icon
                this.dataForm.discount = data.hotelmemberlevel.discount
                this.dataForm.orderby = data.hotelmemberlevel.orderby
                this.dataForm.content = data.hotelmemberlevel.content
                this.dataForm.payFlag = data.hotelmemberlevel.payFlag
                this.dataForm.payAmount = data.hotelmemberlevel.payAmount
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
              url: this.$http.adornUrl(`/hotel/hotelmemberlevel/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'sellerId': this.dataForm.sellerId,
                'name': this.dataForm.name,
                'icon': this.dataForm.icon,
                'discount': this.dataForm.discount,
                'orderby': this.dataForm.orderby,
                'content': this.dataForm.content,
                'payFlag': this.dataForm.payFlag,
                'payAmount': this.dataForm.payAmount
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
