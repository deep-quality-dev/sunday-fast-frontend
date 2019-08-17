<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商家ID" prop="sellerId">
      <el-input v-model="dataForm.sellerId" placeholder="商家ID"></el-input>
    </el-form-item>
    <el-form-item label="房型名字" prop="name">
      <el-input v-model="dataForm.name" placeholder="房型名字"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input v-model="dataForm.price" placeholder="价格"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="img">
      <el-input v-model="dataForm.img" placeholder="图片"></el-input>
    </el-form-item>
    <el-form-item label="楼层" prop="floor">
      <el-input v-model="dataForm.floor" placeholder="楼层"></el-input>
    </el-form-item>
    <el-form-item label="可住人数" prop="people">
      <el-input v-model="dataForm.people" placeholder="可住人数"></el-input>
    </el-form-item>
    <el-form-item label="加床" prop="bed">
      <el-input v-model="dataForm.bed" placeholder="加床"></el-input>
    </el-form-item>
    <el-form-item label="早餐" prop="breakfast">
      <el-input v-model="dataForm.breakfast" placeholder="早餐"></el-input>
    </el-form-item>
    <el-form-item label="房间设施" prop="facilities">
      <el-input v-model="dataForm.facilities" placeholder="房间设施"></el-input>
    </el-form-item>
    <el-form-item label="窗户" prop="windows">
      <el-input v-model="dataForm.windows" placeholder="窗户"></el-input>
    </el-form-item>
    <el-form-item label="房型大图" prop="logo">
      <el-input v-model="dataForm.logo" placeholder="房型大图"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="totalNum">
      <el-input v-model="dataForm.totalNum" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="" prop="uniacid">
      <el-input v-model="dataForm.uniacid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="床型尺寸" prop="size">
      <el-input v-model="dataForm.size" placeholder="床型尺寸"></el-input>
    </el-form-item>
    <el-form-item label="押金是否可退,1否，2是" prop="isRefund">
      <el-input v-model="dataForm.isRefund" placeholder="押金是否可退,1否，2是"></el-input>
    </el-form-item>
    <el-form-item label="1在线,2到店,3入住+到店" prop="yjState">
      <el-input v-model="dataForm.yjState" placeholder="1在线,2到店,3入住+到店"></el-input>
    </el-form-item>
    <el-form-item label="押金金额" prop="yjCost">
      <el-input v-model="dataForm.yjCost" placeholder="押金金额"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="房间状态" prop="state">
      <el-input v-model="dataForm.state" placeholder="房间状态"></el-input>
    </el-form-item>
    <el-form-item label="房间类别" prop="classify">
      <el-input v-model="dataForm.classify" placeholder="房间类别"></el-input>
    </el-form-item>
    <el-form-item label="入住时长" prop="rzTime">
      <el-input v-model="dataForm.rzTime" placeholder="入住时长"></el-input>
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
          price: '',
          img: '',
          floor: '',
          people: '',
          bed: '',
          breakfast: '',
          facilities: '',
          windows: '',
          logo: '',
          totalNum: '',
          uniacid: '',
          size: '',
          isRefund: '',
          yjState: '',
          yjCost: '',
          sort: '',
          state: '',
          classify: '',
          rzTime: ''
        },
        dataRule: {
          sellerId: [
            { required: true, message: '商家ID不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '房型名字不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '价格不能为空', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
          floor: [
            { required: true, message: '楼层不能为空', trigger: 'blur' }
          ],
          people: [
            { required: true, message: '可住人数不能为空', trigger: 'blur' }
          ],
          bed: [
            { required: true, message: '加床不能为空', trigger: 'blur' }
          ],
          breakfast: [
            { required: true, message: '早餐不能为空', trigger: 'blur' }
          ],
          facilities: [
            { required: true, message: '房间设施不能为空', trigger: 'blur' }
          ],
          windows: [
            { required: true, message: '窗户不能为空', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: '房型大图不能为空', trigger: 'blur' }
          ],
          totalNum: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          uniacid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          size: [
            { required: true, message: '床型尺寸不能为空', trigger: 'blur' }
          ],
          isRefund: [
            { required: true, message: '押金是否可退,1否，2是不能为空', trigger: 'blur' }
          ],
          yjState: [
            { required: true, message: '1在线,2到店,3入住+到店不能为空', trigger: 'blur' }
          ],
          yjCost: [
            { required: true, message: '押金金额不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '房间状态不能为空', trigger: 'blur' }
          ],
          classify: [
            { required: true, message: '房间类别不能为空', trigger: 'blur' }
          ],
          rzTime: [
            { required: true, message: '入住时长不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/hotel/hotelroom/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sellerId = data.hotelroom.sellerId
                this.dataForm.name = data.hotelroom.name
                this.dataForm.price = data.hotelroom.price
                this.dataForm.img = data.hotelroom.img
                this.dataForm.floor = data.hotelroom.floor
                this.dataForm.people = data.hotelroom.people
                this.dataForm.bed = data.hotelroom.bed
                this.dataForm.breakfast = data.hotelroom.breakfast
                this.dataForm.facilities = data.hotelroom.facilities
                this.dataForm.windows = data.hotelroom.windows
                this.dataForm.logo = data.hotelroom.logo
                this.dataForm.totalNum = data.hotelroom.totalNum
                this.dataForm.uniacid = data.hotelroom.uniacid
                this.dataForm.size = data.hotelroom.size
                this.dataForm.isRefund = data.hotelroom.isRefund
                this.dataForm.yjState = data.hotelroom.yjState
                this.dataForm.yjCost = data.hotelroom.yjCost
                this.dataForm.sort = data.hotelroom.sort
                this.dataForm.state = data.hotelroom.state
                this.dataForm.classify = data.hotelroom.classify
                this.dataForm.rzTime = data.hotelroom.rzTime
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
              url: this.$http.adornUrl(`/hotel/hotelroom/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'sellerId': this.dataForm.sellerId,
                'name': this.dataForm.name,
                'price': this.dataForm.price,
                'img': this.dataForm.img,
                'floor': this.dataForm.floor,
                'people': this.dataForm.people,
                'bed': this.dataForm.bed,
                'breakfast': this.dataForm.breakfast,
                'facilities': this.dataForm.facilities,
                'windows': this.dataForm.windows,
                'logo': this.dataForm.logo,
                'totalNum': this.dataForm.totalNum,
                'uniacid': this.dataForm.uniacid,
                'size': this.dataForm.size,
                'isRefund': this.dataForm.isRefund,
                'yjState': this.dataForm.yjState,
                'yjCost': this.dataForm.yjCost,
                'sort': this.dataForm.sort,
                'state': this.dataForm.state,
                'classify': this.dataForm.classify,
                'rzTime': this.dataForm.rzTime
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
