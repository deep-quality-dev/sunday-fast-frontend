<template>
  <div>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="酒店logo" prop="ewmLogo">
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="dataForm.ewmLogo" :src="dataForm.ewmLogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="酒店名字" prop="name">
        <el-input v-model="dataForm.name" placeholder="酒店名字"></el-input>
      </el-form-item>
      <el-form-item label="星级" prop="star">
        <el-select v-model="dataForm.star" placeholder="活动区域">
      <el-option label="五星级" value="shanghai"></el-option>
      <el-option label="4星级" value="beijing"></el-option>
    </el-select>
      </el-form-item>
      <el-form-item label="酒店地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="酒店地址"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="linkName">
        <el-input v-model="dataForm.linkName" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="linkTel">
        <el-input v-model="dataForm.linkTel" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item label="酒店电话" prop="tel">
        <el-input v-model="dataForm.tel" placeholder="酒店电话"></el-input>
      </el-form-item>
      <el-form-item label="开业时间" prop="openTime">
        <el-date-picker
        v-model="dataForm.openTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <el-input v-model="dataForm.img" placeholder="图片"></el-input>
      </el-form-item>
      <el-form-item label="退订规则" prop="rule">
        <el-input v-model="dataForm.rule" placeholder="退订规则"></el-input>
      </el-form-item>
      <el-form-item label="经纬度" prop="coordinates">
        <el-input v-model="dataForm.coordinates" placeholder="经纬度"></el-input>
      </el-form-item>
      <el-form-item label="温馨提示" prop="prompt">
        <el-input v-model="dataForm.prompt" placeholder="温馨提示"></el-input>
      </el-form-item>
      <el-form-item label="酒店设施">
        <el-checkbox label="叫醒" name="type"></el-checkbox>
        <el-checkbox v-model="dataForm.wifi" label="Wi-Fi" name="type"></el-checkbox>
        <el-checkbox v-model="dataForm.park" label="停车场" name="type"></el-checkbox>
        <el-checkbox v-model="dataForm.breakfast" label="早餐" name="type"></el-checkbox>
        <el-checkbox v-model="dataForm.gym" label="健身房" name="type"></el-checkbox>
        <el-checkbox v-model="dataForm.water" label="热水" name="type"></el-checkbox>
        <el-checkbox v-model="dataForm.boardroom" label="会议室" name="type"></el-checkbox>
      </el-form-item>
      <el-form-item label="酒店支持">
        <el-checkbox v-model="dataForm.unionpay" label="银联支付" name="type"></el-checkbox>
        <el-checkbox v-model="dataForm.wxOpen" label="微信支付" name="type"></el-checkbox>
        <el-checkbox v-model="dataForm.ddOpen" label="到店支付" name="type"></el-checkbox>
        <el-checkbox v-model="dataForm.yeOpen" label="余额支付" name="type"></el-checkbox>
      </el-form-item>
      <el-form-item label="酒店政策" prop="policy">
        <!-- <el-input v-model="dataForm.policy" placeholder="酒店政策"></el-input> -->
         <script :id="ueId" class="ueditor-box" type="text/plain" style="width: 80%; height: 260px;">hello world!</script>
      </el-form-item>
      <el-form-item label="酒店介绍" prop="introduction">
        <!-- <el-input v-model="dataForm.introduction" placeholder="酒店介绍"></el-input> -->
          <script :id="introduction" class="ueditor-box" type="text/plain" style="width: 80%; height: 260px;">hello world!</script>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </div>
</template>
  
<script>
import ueditor from "ueditor";
export default {
  data() {
    return {
      uploadAction: "",
      ue: null,
      ueId: `J_ueditorBox_${new Date().getTime()}`,
      introductionUe:null,
      introduction:`J_ueditorBox_introduction${new Date().getTime()}`,
      ueContent: "",
      dialogVisible: false,
      visible: false,
      dataForm: {
        id: 0,
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
      }
    };
  },
  mounted() {
    this.uploadAction = this.$http.adornUrl(
        `/sys/oss/upload?token=${this.$cookie.get("token")}`
      );
    this.ue = ueditor.getEditor(this.ueId, {
      // serverUrl: '', // 服务器统一请求接口路径
      zIndex: 3000
    });
    this.introductionUe = ueditor.getEditor(this.introduction, {
      // serverUrl: '', // 服务器统一请求接口路径
      zIndex: 3000
    });
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
              this.dataForm.userId = data.hotelseller.userId;
              this.dataForm.owner = data.hotelseller.owner;
              this.dataForm.name = data.hotelseller.name;
              this.dataForm.star = data.hotelseller.star;
              this.dataForm.address = data.hotelseller.address;
              this.dataForm.linkName = data.hotelseller.linkName;
              this.dataForm.linkTel = data.hotelseller.linkTel;
              this.dataForm.tel = data.hotelseller.tel;
              this.dataForm.handle = data.hotelseller.handle;
              this.dataForm.openTime = data.hotelseller.openTime;
              this.dataForm.wake = data.hotelseller.wake;
              this.dataForm.wifi = data.hotelseller.wifi;
              this.dataForm.park = data.hotelseller.park;
              this.dataForm.breakfast = data.hotelseller.breakfast;
              this.dataForm.unionpay = data.hotelseller.unionpay;
              this.dataForm.gym = data.hotelseller.gym;
              this.dataForm.boardroom = data.hotelseller.boardroom;
              this.dataForm.water = data.hotelseller.water;
              this.dataForm.policy = data.hotelseller.policy;
              this.dataForm.introduction = data.hotelseller.introduction;
              this.dataForm.img = data.hotelseller.img;
              this.dataForm.rule = data.hotelseller.rule;
              this.dataForm.prompt = data.hotelseller.prompt;
              this.dataForm.bqLogo = data.hotelseller.bqLogo;
              this.dataForm.support = data.hotelseller.support;
              this.dataForm.ewmLogo = data.hotelseller.ewmLogo;
              this.dataForm.time = data.hotelseller.time;
              this.dataForm.coordinates = data.hotelseller.coordinates;
              this.dataForm.scort = data.hotelseller.scort;
              this.dataForm.sfzImg1 = data.hotelseller.sfzImg1;
              this.dataForm.sfzImg2 = data.hotelseller.sfzImg2;
              this.dataForm.yyImg = data.hotelseller.yyImg;
              this.dataForm.other = data.hotelseller.other;
              this.dataForm.zdMoney = data.hotelseller.zdMoney;
              this.dataForm.state = data.hotelseller.state;
              this.dataForm.sqTime = data.hotelseller.sqTime;
              this.dataForm.isUse = data.hotelseller.isUse;
              this.dataForm.llNum = data.hotelseller.llNum;
              this.dataForm.bdId = data.hotelseller.bdId;
              this.dataForm.yeOpen = data.hotelseller.yeOpen;
              this.dataForm.wxOpen = data.hotelseller.wxOpen;
              this.dataForm.ddOpen = data.hotelseller.ddOpen;
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
    getContent() {
      this.dialogVisible = true;
      this.ue.ready(() => {
        this.ueContent = this.ue.getContent();
      });
    },
     handleAvatarSuccess(res, file) {
      this.dataForm.img = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
