<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="auto">
    <el-form-item label="商家ID" prop="sellerId">
      <el-input v-model="dataForm.sellerId" placeholder="商家ID"></el-input>
    </el-form-item>
    <el-form-item label="分数" prop="score">
      <el-input v-model="dataForm.score" placeholder="分数"></el-input>
    </el-form-item>
    <el-form-item label="评价内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="评价内容"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="img">
      <el-input v-model="dataForm.img" placeholder="图片"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="time">
      <el-input v-model="dataForm.time" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="用户ID" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户ID"></el-input>
    </el-form-item>
    <el-form-item label="商家回复" prop="reply">
      <el-input v-model="dataForm.reply" placeholder="商家回复"></el-input>
    </el-form-item>
    <el-form-item label="评价状态1，未回复，2已回复" prop="status">
      <el-input v-model="dataForm.status" placeholder="评价状态1，未回复，2已回复"></el-input>
    </el-form-item>
    <el-form-item label="回复时间" prop="replyTime">
      <el-input v-model="dataForm.replyTime" placeholder="回复时间"></el-input>
    </el-form-item>
    <el-form-item label="类型 1-酒店，2-商品" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型 1-酒店，2-商品"></el-input>
    </el-form-item>
    <el-form-item label="订单ID" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder="订单ID"></el-input>
    </el-form-item>
    <el-form-item label="商品ID" prop="goodsId">
      <el-input v-model="dataForm.goodsId" placeholder="商品ID"></el-input>
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
          score: '',
          content: '',
          img: '',
          time: '',
          userId: '',
          reply: '',
          status: '',
          replyTime: '',
          type: '',
          orderId: '',
          goodsId: ''
        },
        dataRule: {
          sellerId: [
            { required: true, message: '商家ID不能为空', trigger: 'blur' }
          ],
          score: [
            { required: true, message: '分数不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '评价内容不能为空', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '用户ID不能为空', trigger: 'blur' }
          ],
          reply: [
            { required: true, message: '商家回复不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '评价状态1，未回复，2已回复不能为空', trigger: 'blur' }
          ],
          replyTime: [
            { required: true, message: '回复时间不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型 1-酒店，2-商品不能为空', trigger: 'blur' }
          ],
          orderId: [
            { required: true, message: '订单ID不能为空', trigger: 'blur' }
          ],
          goodsId: [
            { required: true, message: '商品ID不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/hotel/hotelassess/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sellerId = data.hotelassess.sellerId
                this.dataForm.score = data.hotelassess.score
                this.dataForm.content = data.hotelassess.content
                this.dataForm.img = data.hotelassess.img
                this.dataForm.time = data.hotelassess.time
                this.dataForm.userId = data.hotelassess.userId
                this.dataForm.reply = data.hotelassess.reply
                this.dataForm.status = data.hotelassess.status
                this.dataForm.replyTime = data.hotelassess.replyTime
                this.dataForm.type = data.hotelassess.type
                this.dataForm.orderId = data.hotelassess.orderId
                this.dataForm.goodsId = data.hotelassess.goodsId
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
              url: this.$http.adornUrl(`/hotel/hotelassess/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'sellerId': this.dataForm.sellerId,
                'score': this.dataForm.score,
                'content': this.dataForm.content,
                'img': this.dataForm.img,
                'time': this.dataForm.time,
                'userId': this.dataForm.userId,
                'reply': this.dataForm.reply,
                'status': this.dataForm.status,
                'replyTime': this.dataForm.replyTime,
                'type': this.dataForm.type,
                'orderId': this.dataForm.orderId,
                'goodsId': this.dataForm.goodsId
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
