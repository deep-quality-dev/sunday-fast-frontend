<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form :model="dataForm" ref="dataForm" label-width="auto">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名字" prop="name">
              <el-input :readonly="true" v-model="dataForm.name" placeholder="名字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="星级" prop="star">
              <el-input :readonly="true" v-model="dataForm.star" placeholder="星级"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input :readonly="true" v-model="dataForm.address" placeholder="地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="linkName">
              <el-input :readonly="true" v-model="dataForm.linkName" placeholder="联系人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="linkTel">
              <el-input :readonly="true" v-model="dataForm.linkTel" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="酒店电话" prop="tel">
              <el-input :readonly="true" v-model="dataForm.tel" placeholder="酒店电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请时间" prop="sqTime">
              <el-input :readonly="true" v-model="dataForm.sqTime" placeholder="申请时间"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>
        <el-form-item label="身份证照" prop="sfzImg1">
          <img
            :src="dataForm.sfzImg1"
            style="width: 150px;height: 150px;"
            alt=""
            @click="index = 0;showImage = dataForm.sfzImg1"
          >
          <img
            v-if="dataForm.sfzImg2"
            :src="dataForm.sfzImg2"
            style="width: 150px;height: 150px;"
            alt=""
            @click="index = 0;showImage = dataForm.sfzImg2"
          >
        </el-form-item>
        <el-form-item label="营业执照" prop="yyImg">
          <img
            v-for="item in dataForm.yyImg.split(',')"
            :src="item"
            style="width: 150px;height: 150px;"
            alt=""
            @click="index = 0;showImage = item"
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
      <el-button @click="auditRefuseHanler(dataForm.id)" type="primary">通过</el-button>
      <el-button @click="auditPassHandler(dataForm.id)" type="danger">拒绝</el-button>
    </span>
    </el-dialog>

    <gallery
      :images="[showImage]"
      :index="index"
      @close="index = null"
    />
  </div>
</template>

<script>
import VueGallery from 'vue-gallery';

export default {
  components: {
    'gallery': VueGallery
  },
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        userId: "",
        owner: "",
        name: "",
        star: "",
        address: "",
        linkName: "",
        linkTel: "",
        tel: "",
        handle: "",
        openTime: "",
        wake: "",
        wifi: "",
        park: "",
        breakfast: "",
        unionpay: "",
        gym: "",
        boardroom: "",
        water: "",
        policy: "",
        introduction: "",
        img: "",
        rule: "",
        prompt: "",
        bqLogo: "",
        support: "",
        ewmLogo: "",
        time: "",
        coordinates: "",
        scort: "",
        sfzImg1: "",
        sfzImg2: "",
        yyImg: "",
        other: "",
        zdMoney: "",
        state: "",
        sqTime: "",
        isUse: "",
        llNum: "",
        bdId: "",
        yeOpen: "",
        wxOpen: "",
        ddOpen: ""
      },
      dataRule: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        owner: [
          {
            required: true,
            message: "1后台添加,2入住不能为空",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "名字不能为空", trigger: "blur" }],
        star: [{ required: true, message: "星级不能为空", trigger: "blur" }],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        linkName: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        linkTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" }
        ],
        tel: [{ required: true, message: "酒店电话不能为空", trigger: "blur" }],
        handle: [
          { required: true, message: "办理时间不能为空", trigger: "blur" }
        ],
        openTime: [
          { required: true, message: "开业时间不能为空", trigger: "blur" }
        ],
        wake: [{ required: true, message: "唤醒不能为空", trigger: "blur" }],
        wifi: [{ required: true, message: "Wi-Fi不能为空", trigger: "blur" }],
        park: [{ required: true, message: "停车场不能为空", trigger: "blur" }],
        breakfast: [
          { required: true, message: "早餐不能为空", trigger: "blur" }
        ],
        unionpay: [
          { required: true, message: "银联支付不能为空", trigger: "blur" }
        ],
        gym: [{ required: true, message: "健身房不能为空", trigger: "blur" }],
        boardroom: [
          { required: true, message: "会议室不能为空", trigger: "blur" }
        ],
        water: [{ required: true, message: "不能为空", trigger: "blur" }],
        policy: [
          { required: true, message: "酒店政策不能为空", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "酒店介绍不能为空", trigger: "blur" }
        ],
        img: [{ required: true, message: "图片不能为空", trigger: "blur" }],
        rule: [
          { required: true, message: "退订规则不能为空", trigger: "blur" }
        ],
        prompt: [
          { required: true, message: "温馨提示不能为空", trigger: "blur" }
        ],
        bqLogo: [{ required: true, message: "不能为空", trigger: "blur" }],
        support: [{ required: true, message: "不能为空", trigger: "blur" }],
        ewmLogo: [
          { required: true, message: "酒店logo不能为空", trigger: "blur" }
        ],
        time: [{ required: true, message: "时间不能为空", trigger: "blur" }],
        coordinates: [
          { required: true, message: "经纬度不能为空", trigger: "blur" }
        ],
        scort: [{ required: true, message: "排序不能为空", trigger: "blur" }],
        sfzImg1: [
          { required: true, message: "身份证正面照不能为空", trigger: "blur" }
        ],
        sfzImg2: [
          { required: true, message: "身份证反面照不能为空", trigger: "blur" }
        ],
        yyImg: [
          { required: true, message: "营业执照不能为空", trigger: "blur" }
        ],
        other: [
          { required: true, message: "补充说明不能为空", trigger: "blur" }
        ],
        zdMoney: [
          { required: true, message: "房间最低价格不能为空", trigger: "blur" }
        ],
        state: [
          {
            required: true,
            message: "1待审核,2通过，3拒绝不能为空",
            trigger: "blur"
          }
        ],
        sqTime: [
          { required: true, message: "申请时间不能为空", trigger: "blur" }
        ],
        isUse: [
          { required: true, message: "平台优惠券使用不能为空", trigger: "blur" }
        ],
        llNum: [{ required: true, message: "不能为空", trigger: "blur" }],
        bdId: [
          { required: true, message: "绑定提现人不能为空", trigger: "blur" }
        ],
        yeOpen: [
          { required: true, message: "余额支付不能为空", trigger: "blur" }
        ],
        wxOpen: [
          { required: true, message: "微信支付不能为空", trigger: "blur" }
        ],
        ddOpen: [
          { required: true, message: "到店支付不能为空", trigger: "blur" }
        ]
      },
      showImage: '',
      index: null
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
            url: this.$http.adornUrl(
              `/hotel/hotelseller/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.userId = data.hotelSeller.userId;
              this.dataForm.owner = data.hotelSeller.owner;
              this.dataForm.name = data.hotelSeller.name;
              this.dataForm.star = data.hotelSeller.star;
              this.dataForm.address = data.hotelSeller.address;
              this.dataForm.linkName = data.hotelSeller.linkName;
              this.dataForm.linkTel = data.hotelSeller.linkTel;
              this.dataForm.tel = data.hotelSeller.tel;
              this.dataForm.handle = data.hotelSeller.handle;
              this.dataForm.openTime = data.hotelSeller.openTime;
              this.dataForm.wake = data.hotelSeller.wake;
              this.dataForm.wifi = data.hotelSeller.wifi;
              this.dataForm.park = data.hotelSeller.park;
              this.dataForm.breakfast = data.hotelSeller.breakfast;
              this.dataForm.unionpay = data.hotelSeller.unionpay;
              this.dataForm.gym = data.hotelSeller.gym;
              this.dataForm.boardroom = data.hotelSeller.boardroom;
              this.dataForm.water = data.hotelSeller.water;
              this.dataForm.policy = data.hotelSeller.policy;
              this.dataForm.introduction = data.hotelSeller.introduction;
              this.dataForm.img = data.hotelSeller.img;
              this.dataForm.rule = data.hotelSeller.rule;
              this.dataForm.prompt = data.hotelSeller.prompt;
              this.dataForm.bqLogo = data.hotelSeller.bqLogo;
              this.dataForm.support = data.hotelSeller.support;
              this.dataForm.ewmLogo = data.hotelSeller.ewmLogo;
              this.dataForm.time = data.hotelSeller.time;
              this.dataForm.coordinates = data.hotelSeller.coordinates;
              this.dataForm.scort = data.hotelSeller.scort;
              this.dataForm.sfzImg1 = data.hotelSeller.sfzImg1;
              this.dataForm.sfzImg2 = data.hotelSeller.sfzImg2;
              this.dataForm.yyImg = data.hotelSeller.yyImg;
              this.dataForm.other = data.hotelSeller.other;
              this.dataForm.zdMoney = data.hotelSeller.zdMoney;
              this.dataForm.state = data.hotelSeller.state;
              this.dataForm.sqTime = data.hotelSeller.sqTime;
              this.dataForm.isUse = data.hotelSeller.isUse;
              this.dataForm.llNum = data.hotelSeller.llNum;
              this.dataForm.bdId = data.hotelSeller.bdId;
              this.dataForm.yeOpen = data.hotelSeller.yeOpen;
              this.dataForm.wxOpen = data.hotelSeller.wxOpen;
              this.dataForm.ddOpen = data.hotelSeller.ddOpen;
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
              `/hotel/hotelseller/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              userId: this.dataForm.userId,
              owner: this.dataForm.owner,
              name: this.dataForm.name,
              star: this.dataForm.star,
              address: this.dataForm.address,
              linkName: this.dataForm.linkName,
              linkTel: this.dataForm.linkTel,
              tel: this.dataForm.tel,
              handle: this.dataForm.handle,
              openTime: this.dataForm.openTime,
              wake: this.dataForm.wake,
              wifi: this.dataForm.wifi,
              park: this.dataForm.park,
              breakfast: this.dataForm.breakfast,
              unionpay: this.dataForm.unionpay,
              gym: this.dataForm.gym,
              boardroom: this.dataForm.boardroom,
              water: this.dataForm.water,
              policy: this.dataForm.policy,
              introduction: this.dataForm.introduction,
              img: this.dataForm.img,
              rule: this.dataForm.rule,
              prompt: this.dataForm.prompt,
              bqLogo: this.dataForm.bqLogo,
              support: this.dataForm.support,
              ewmLogo: this.dataForm.ewmLogo,
              time: this.dataForm.time,
              coordinates: this.dataForm.coordinates,
              scort: this.dataForm.scort,
              sfzImg1: this.dataForm.sfzImg1,
              sfzImg2: this.dataForm.sfzImg2,
              yyImg: this.dataForm.yyImg,
              other: this.dataForm.other,
              zdMoney: this.dataForm.zdMoney,
              state: this.dataForm.state,
              sqTime: this.dataForm.sqTime,
              isUse: this.dataForm.isUse,
              llNum: this.dataForm.llNum,
              bdId: this.dataForm.bdId,
              yeOpen: this.dataForm.yeOpen,
              wxOpen: this.dataForm.wxOpen,
              ddOpen: this.dataForm.ddOpen
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
    },
    //审核通过
    auditPassHandler(id) {
      this.$confirm("确认操作？")
        .then(_ => {
          this.$http({
            url: this.$http.adornUrl(`/hotel/hotelseller/auditPass/${id}`),
            method: "POST"
          }).then(({ data }) => {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.visible = false;
                this.$emit("refreshDataList");
              }
            });
          });
        })
        .catch(_ => {});
    },
    //拒绝审核
    auditRefuseHanler(id) {
      this.$confirm("确认操作？")
        .then(_ => {
          this.$http({
            url: this.$http.adornUrl(`/hotel/hotelseller/auditRefuse/${id}`),
            method: "POST"
          }).then(({ data }) => {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.visible = false;
                this.$emit("refreshDataList");
              }
            });
          });
        })
        .catch(_ => {});
    }
  }
};
</script>
