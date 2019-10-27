<template>
  <el-dialog
    :title="'办卡'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="auto"
    >
      <el-form-item label="搜索会员" prop="memberId">
        <el-select
          style="width:100%;"
          v-model="dataForm.memberId"
          filterable
          remote
          reserve-keyword
          placeholder="请输入姓名/电话"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in platfromMembers"
            :key="item.id"
            :label="item.name+'—'+item.tel"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级类型" prop="levelId">
        <el-select style="width:100%;" v-model="dataForm.levelId" placeholder="请选择等级">
          <el-option v-for="item in levelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="certificateNo">
        <el-input v-model="dataForm.certificateNo" placeholder="证件号"></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="dataForm.name" placeholder="名字"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机"></el-input>
      </el-form-item>
      <el-form-item label="推荐员工" prop="salesman">
        <el-input v-model="dataForm.salesman" placeholder="推荐员工"></el-input>
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
      platformMember: {},
      visible: false,
      levelList: [],
      //
      platfromMembers: [],
      value9: "",
      list: [],
      loading: false,
      states: [],
      //
      dataForm: {
        id: 0,
        levelId: "",
        memberId: "",
        certificate: "",
        certificateNo: "",
        name: "",
        mobile: "",
        gender: "",
        cardNo: "",
        address: "",
        creator: "",
        createDate: "",
        updateDate: "",
        sellerId: "",
        status: "",
        salesman: "",
        score: "",
        balance: ""
      },
      dataRule: {
        levelId: [
          { required: true, message: "等级类型不能为空", trigger: "blur" }
        ],
        memberId: [
          { required: true, message: "会员ID不能为空", trigger: "blur" }
        ],
        certificate: [
          { required: true, message: "证件类型不能为空", trigger: "blur" }
        ],
        certificateNo: [
          { required: true, message: "证件号不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "名字不能为空", trigger: "blur" }],
        mobile: [{ required: true, message: "手机不能为空", trigger: "blur" }],
        gender: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        cardNo: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        address: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建者不能为空", trigger: "blur" }
        ],
        createDate: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateDate: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        sellerId: [
          { required: true, message: "商家ID不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态，1为有效不能为空", trigger: "blur" }
        ],
        salesman: [
          { required: true, message: "推荐员工不能为空", trigger: "blur" }
        ],
        score: [{ required: true, message: "积分不能为空", trigger: "blur" }],
        balance: [{ required: true, message: "余额不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    loadSellerLevel() {
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelmemberlevel/sellerLevleList"),
        method: "GET"
      }).then(({ data }) => {
        this.levelList = data.data;
      });
    },
    init(platformMember) {
      this.loadSellerLevel();
      this.dataForm.id = 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelmemberleveldetail/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.levelId = data.hotelmemberleveldetail.levelId;
              this.dataForm.memberId = data.hotelmemberleveldetail.memberId;
              this.dataForm.certificate =
                data.hotelmemberleveldetail.certificate;
              this.dataForm.certificateNo =
                data.hotelmemberleveldetail.certificateNo;
              this.dataForm.name = data.hotelmemberleveldetail.name;
              this.dataForm.mobile = data.hotelmemberleveldetail.mobile;
              this.dataForm.gender = data.hotelmemberleveldetail.gender;
              this.dataForm.cardNo = data.hotelmemberleveldetail.cardNo;
              this.dataForm.address = data.hotelmemberleveldetail.address;
              this.dataForm.creator = data.hotelmemberleveldetail.creator;
              this.dataForm.createDate = data.hotelmemberleveldetail.createDate;
              this.dataForm.updateDate = data.hotelmemberleveldetail.updateDate;
              this.dataForm.sellerId = data.hotelmemberleveldetail.sellerId;
              this.dataForm.status = data.hotelmemberleveldetail.status;
              this.dataForm.salesman = data.hotelmemberleveldetail.salesman;
              this.dataForm.score = data.hotelmemberleveldetail.score;
              this.dataForm.balance = data.hotelmemberleveldetail.balance;
            }
          });
        }
      });
    },
    //加载平台会员数据
    remoteMethod(query) {
      this.loading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelmember/platformMember"),
        method: "get",
        method: "get",
        params: this.$http.adornParams({
          kw: query
        })
      }).then(({ data }) => {
        this.loading = false;
        if (data && data.code === 0) {
          this.platfromMembers = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelmemberleveldetail/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              levelId: this.dataForm.levelId,
              memberId: this.dataForm.memberId,
              certificate: this.dataForm.certificate,
              certificateNo: this.dataForm.certificateNo,
              name: this.dataForm.name,
              mobile: this.dataForm.mobile,
              gender: this.dataForm.gender,
              cardNo: this.dataForm.cardNo,
              address: this.dataForm.address,
              creator: this.dataForm.creator,
              createDate: this.dataForm.createDate,
              updateDate: this.dataForm.updateDate,
              sellerId: this.dataForm.sellerId,
              status: this.dataForm.status,
              salesman: this.dataForm.salesman,
              score: this.dataForm.score,
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
