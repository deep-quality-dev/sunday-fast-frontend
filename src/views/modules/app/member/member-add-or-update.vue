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
      label-width="80px"
    >
      <el-form-item label="昵称" prop="name">
        <el-input v-model="dataForm.name" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="joinTime">
        <el-input v-model="dataForm.joinTime" placeholder="注册时间"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="img">
        <el-input v-model="dataForm.img" placeholder="头像"></el-input>
      </el-form-item>
      <el-form-item label="openID" prop="openid">
        <el-input v-model="dataForm.openid" placeholder="openID"></el-input>
      </el-form-item>
      <el-form-item label="商家" prop="sellerId">
        <el-input v-model="dataForm.sellerId" placeholder="商家"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="dataForm.tel" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="1不是会员,2是会员" prop="type">
        <el-input v-model="dataForm.type" placeholder="1不是会员,2是会员"></el-input>
      </el-form-item>
      <el-form-item label="会员等级id" prop="levelId">
        <el-input v-model="dataForm.levelId" placeholder="会员等级id"></el-input>
      </el-form-item>
      <el-form-item label="积分" prop="score">
        <el-input v-model="dataForm.score" placeholder="积分"></el-input>
      </el-form-item>
      <el-form-item label="真是姓名" prop="zsName">
        <el-input v-model="dataForm.zsName" placeholder="真是姓名"></el-input>
      </el-form-item>
      <el-form-item label="会员卡号" prop="number">
        <el-input v-model="dataForm.number" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item label="佣金" prop="commission">
        <el-input v-model="dataForm.commission" placeholder="佣金"></el-input>
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
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        joinTime: "",
        img: "",
        openid: "",
        sellerId: "",
        tel: "",
        type: "",
        levelId: "",
        score: "",
        zsName: "",
        number: "",
        commission: "",
        balance: ""
      },
      dataRule: {
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        joinTime: [
          { required: true, message: "注册时间不能为空", trigger: "blur" }
        ],
        img: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        openid: [
          { required: true, message: "openID不能为空", trigger: "blur" }
        ],
        sellerId: [
          { required: true, message: "商家不能为空", trigger: "blur" }
        ],
        tel: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        type: [
          {
            required: true,
            message: "1不是会员,2是会员不能为空",
            trigger: "blur"
          }
        ],
        levelId: [
          { required: true, message: "会员等级id不能为空", trigger: "blur" }
        ],
        score: [{ required: true, message: "积分不能为空", trigger: "blur" }],
        zsName: [
          { required: true, message: "真是姓名不能为空", trigger: "blur" }
        ],
        number: [
          { required: true, message: "会员卡号不能为空", trigger: "blur" }
        ],
        commission: [
          { required: true, message: "佣金不能为空", trigger: "blur" }
        ],
        balance: [{ required: true, message: "余额不能为空", trigger: "blur" }]
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
            url: this.$http.adornUrl(`/hotel/hotelmember/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.hotelMember.name;
              this.dataForm.joinTime = data.hotelMember.joinTime;
              this.dataForm.img = data.hotelMember.img;
              this.dataForm.openid = data.hotelMember.openid;
              this.dataForm.sellerId = data.hotelMember.sellerId;
              this.dataForm.tel = data.hotelMember.tel;
              this.dataForm.type = data.hotelMember.type;
              this.dataForm.levelId = data.hotelMember.levelId;
              this.dataForm.score = data.hotelMember.score;
              this.dataForm.zsName = data.hotelMember.zsName;
              this.dataForm.number = data.hotelMember.number;
              this.dataForm.commission = data.hotelMember.commission;
              this.dataForm.balance = data.hotelMember.balance;
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
              `/hotel/hotelmember/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              joinTime: this.dataForm.joinTime,
              img: this.dataForm.img,
              openid: this.dataForm.openid,
              sellerId: this.dataForm.sellerId,
              tel: this.dataForm.tel,
              type: this.dataForm.type,
              levelId: this.dataForm.levelId,
              score: this.dataForm.score,
              zsName: this.dataForm.zsName,
              number: this.dataForm.number,
              commission: this.dataForm.commission,
              balance: this.dataForm.balance
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
