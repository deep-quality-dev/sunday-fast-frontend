<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="等级类型" prop="levelId">
      <el-input v-model="dataForm.levelId" placeholder="等级类型"></el-input>
    </el-form-item>
    <el-form-item label="会员ID" prop="memberId">
      <el-input v-model="dataForm.memberId" placeholder="会员ID"></el-input>
    </el-form-item>
    <el-form-item label="证件类型" prop="certificate">
      <el-input v-model="dataForm.certificate" placeholder="证件类型"></el-input>
    </el-form-item>
    <el-form-item label="证件号" prop="certificateNo">
      <el-input v-model="dataForm.certificateNo" placeholder="证件号"></el-input>
    </el-form-item>
    <el-form-item label="名字" prop="name">
      <el-input v-model="dataForm.name" placeholder="名字"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="手机"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-input v-model="dataForm.gender" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="卡号" prop="cardNo">
      <el-input v-model="dataForm.cardNo" placeholder="卡号"></el-input>
    </el-form-item>
    <el-form-item label="联系地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="联系地址"></el-input>
    </el-form-item>
    <el-form-item label="创建者" prop="creator">
      <el-input v-model="dataForm.creator" placeholder="创建者"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createDate">
      <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" prop="updateDate">
      <el-input v-model="dataForm.updateDate" placeholder="修改时间"></el-input>
    </el-form-item>
    <el-form-item label="商家ID" prop="sellerId">
      <el-input v-model="dataForm.sellerId" placeholder="商家ID"></el-input>
    </el-form-item>
    <el-form-item label="状态，1为有效" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态，1为有效"></el-input>
    </el-form-item>
    <el-form-item label="推荐员工" prop="salesman">
      <el-input v-model="dataForm.salesman" placeholder="推荐员工"></el-input>
    </el-form-item>
    <el-form-item label="积分" prop="score">
      <el-input v-model="dataForm.score" placeholder="积分"></el-input>
    </el-form-item>
    <el-form-item label="余额" prop="balance">
      <el-input v-model="dataForm.balance" placeholder="余额"></el-input>
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
          levelId: '',
          memberId: '',
          certificate: '',
          certificateNo: '',
          name: '',
          mobile: '',
          gender: '',
          cardNo: '',
          address: '',
          creator: '',
          createDate: '',
          updateDate: '',
          sellerId: '',
          status: '',
          salesman: '',
          score: '',
          balance: ''
        },
        dataRule: {
          levelId: [
            { required: true, message: '等级类型不能为空', trigger: 'blur' }
          ],
          memberId: [
            { required: true, message: '会员ID不能为空', trigger: 'blur' }
          ],
          certificate: [
            { required: true, message: '证件类型不能为空', trigger: 'blur' }
          ],
          certificateNo: [
            { required: true, message: '证件号不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '名字不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机不能为空', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          cardNo: [
            { required: true, message: '卡号不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '联系地址不能为空', trigger: 'blur' }
          ],
          creator: [
            { required: true, message: '创建者不能为空', trigger: 'blur' }
          ],
          createDate: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateDate: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' }
          ],
          sellerId: [
            { required: true, message: '商家ID不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态，1为有效不能为空', trigger: 'blur' }
          ],
          salesman: [
            { required: true, message: '推荐员工不能为空', trigger: 'blur' }
          ],
          score: [
            { required: true, message: '积分不能为空', trigger: 'blur' }
          ],
          balance: [
            { required: true, message: '余额不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/hotel/hotelmemberleveldetail/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.levelId = data.hotelmemberleveldetail.levelId
                this.dataForm.memberId = data.hotelmemberleveldetail.memberId
                this.dataForm.certificate = data.hotelmemberleveldetail.certificate
                this.dataForm.certificateNo = data.hotelmemberleveldetail.certificateNo
                this.dataForm.name = data.hotelmemberleveldetail.name
                this.dataForm.mobile = data.hotelmemberleveldetail.mobile
                this.dataForm.gender = data.hotelmemberleveldetail.gender
                this.dataForm.cardNo = data.hotelmemberleveldetail.cardNo
                this.dataForm.address = data.hotelmemberleveldetail.address
                this.dataForm.creator = data.hotelmemberleveldetail.creator
                this.dataForm.createDate = data.hotelmemberleveldetail.createDate
                this.dataForm.updateDate = data.hotelmemberleveldetail.updateDate
                this.dataForm.sellerId = data.hotelmemberleveldetail.sellerId
                this.dataForm.status = data.hotelmemberleveldetail.status
                this.dataForm.salesman = data.hotelmemberleveldetail.salesman
                this.dataForm.score = data.hotelmemberleveldetail.score
                this.dataForm.balance = data.hotelmemberleveldetail.balance
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
              url: this.$http.adornUrl(`/hotel/hotelmemberleveldetail/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'levelId': this.dataForm.levelId,
                'memberId': this.dataForm.memberId,
                'certificate': this.dataForm.certificate,
                'certificateNo': this.dataForm.certificateNo,
                'name': this.dataForm.name,
                'mobile': this.dataForm.mobile,
                'gender': this.dataForm.gender,
                'cardNo': this.dataForm.cardNo,
                'address': this.dataForm.address,
                'creator': this.dataForm.creator,
                'createDate': this.dataForm.createDate,
                'updateDate': this.dataForm.updateDate,
                'sellerId': this.dataForm.sellerId,
                'status': this.dataForm.status,
                'salesman': this.dataForm.salesman,
                'score': this.dataForm.score,
                'balance': this.dataForm.balance
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
