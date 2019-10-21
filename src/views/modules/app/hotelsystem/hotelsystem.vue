<template>
  <div>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="120px"
      style="overflow-y: scroll;"
    >
      <el-form-item label="网站名称" prop="linkName">
        <el-input v-model="dataForm.linkName" placeholder="网站名称"></el-input>
      </el-form-item>
      <el-form-item label="网站logo" prop="linkLogo">
        <!-- <el-input v-model="dataForm.linkLogo" placeholder="网站logo"></el-input> -->
        <el-upload
          :class="{disabled:fileList.length>0}"
          :action="uploadAction"
          list-type="picture-card"
          :auto-upload="true"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="公司名字" prop="companyName">
        <el-input v-model="dataForm.companyName" placeholder="网站logo"></el-input>
      </el-form-item>
      <el-form-item label="公司电话" prop="companyPhone">
        <el-input v-model="dataForm.companyPhone" placeholder="网站logo"></el-input>
      </el-form-item>
      <el-form-item label="公司邮箱" prop="companyEmail">
        <el-input v-model="dataForm.companyEmail" placeholder="网站logo"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        <el-input v-model="dataForm.companyAddress" placeholder="网站logo"></el-input>
      </el-form-item>
      <el-form-item label="营业执照" prop="businessLicense">
        <!-- <el-input v-model="dataForm.businessLicense" placeholder="网站logo"></el-input> -->
        <el-upload
          :class="{disabled:businessLicenseList.length>0}"
          :action="uploadAction"
          list-type="picture-card"
          :auto-upload="true"
          :on-remove="businessLicenseHandleRemove"
          :on-success="businessLicenseHandleAvatarSuccess"
          :before-upload="businessLicenseBeforeAvatarUpload"
          :file-list="businessLicenseList"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="经营许可证" prop="licence">
        <!-- <el-input v-model="dataForm.licence" placeholder="网站logo"></el-input> -->
        <el-upload
          :class="{disabled:licenceList.length>0}"
          :action="uploadAction"
          list-type="picture-card"
          :auto-upload="true"
          :on-remove="licenceHandleRemove"
          :on-success="licenceHandleAvatarSuccess"
          :before-upload="licenceBeforeAvatarUpload"
          :file-list="licenceList"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="平台介绍" prop="platformInfo">
        <quill-editor
          style="height:200px"
          class="editor"
          v-model="dataForm.platformInfo"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editorOption: {},
      fileList: [],
      businessLicenseList: [],
      licenceList: [],
      imageUrl: "",
      visible: false,
      uploadAction: "",
      dataForm: {
        id: 0,
        appid: "",
        appsecret: "",
        mchid: "",
        wxkey: "",
        uniacid: "",
        jfRule: "",
        bqName: "",
        linkName: "",
        linkLogo: "",
        support: "",
        bqLogo: "",
        color: "",
        tzAppid: "",
        tzName: "",
        ptName: "",
        tel: "",
        totalNum: "",
        appkey: "",
        tplId: "",
        sellerId: "",
        apiclientCert: "",
        apiclientKey: "",
        companyName: "",
        companyPhone: "",
        companyEmail: "",
        companyAddress: "",
        businessLicense: "",
        licence: "",
        platformInfo: "",
        zdMoney: "",
        txSxf: "",
        rcTk: "",
        tid1: "",
        txNotice: "",
        type: "",
        txMode: "",
        isSjrz: "",
        clientIp: "",
        rzNotice: "",
        hyRule: "",
        bjLogo: "",
        mapKey: "",
        isDxyz: "",
        plScore: "",
        xfScore: "",
        hyImg: "",
        rzTid: "",
        openMember: "",
        jjrzTid: "",
        isSfz: "",
        tplId2: "",
        isOrder: "",
        tid3: "",
        tid4: ""
      },
      dataRule: {
        appid: [{ required: true, message: "appid不能为空", trigger: "blur" }],
        appsecret: [
          { required: true, message: "appsecret不能为空", trigger: "blur" }
        ],
        mchid: [{ required: true, message: "商户号不能为空", trigger: "blur" }],
        wxkey: [
          { required: true, message: "商户秘钥不能为空", trigger: "blur" }
        ],
        uniacid: [{ required: true, message: "不能为空", trigger: "blur" }],
        jfRule: [
          { required: true, message: "积分规则不能为空", trigger: "blur" }
        ],
        bqName: [
          { required: true, message: "版权名称不能为空", trigger: "blur" }
        ],
        linkName: [
          { required: true, message: "网站名称不能为空", trigger: "blur" }
        ],
        linkLogo: [
          { required: true, message: "网站logo不能为空", trigger: "blur" }
        ],
        support: [
          { required: true, message: "技术支持不能为空", trigger: "blur" }
        ],
        bqLogo: [{ required: true, message: "不能为空", trigger: "blur" }],
        color: [{ required: true, message: "不能为空", trigger: "blur" }],
        tzAppid: [{ required: true, message: "不能为空", trigger: "blur" }],
        tzName: [{ required: true, message: "不能为空", trigger: "blur" }],
        ptName: [
          { required: true, message: "平台名称不能为空", trigger: "blur" }
        ],
        tel: [{ required: true, message: "平台电话不能为空", trigger: "blur" }],
        totalNum: [
          { required: true, message: "访问量不能为空", trigger: "blur" }
        ],
        appkey: [
          { required: true, message: "短信appkey不能为空", trigger: "blur" }
        ],
        tplId: [
          { required: true, message: "短信模板id不能为空", trigger: "blur" }
        ],
        sellerId: [
          { required: true, message: "默认门店ID不能为空", trigger: "blur" }
        ],
        apiclientCert: [
          { required: true, message: "证书不能为空", trigger: "blur" }
        ],
        apiclientKey: [
          { required: true, message: "证书不能为空", trigger: "blur" }
        ],
        zdMoney: [
          { required: true, message: "最低提现金额不能为空", trigger: "blur" }
        ],
        txSxf: [
          { required: true, message: "提现手续费不能为空", trigger: "blur" }
        ],
        rcTk: [
          { required: true, message: "认筹条款不能为空", trigger: "blur" }
        ],
        tid1: [
          {
            required: true,
            message: "报名成功通知模板id不能为空",
            trigger: "blur"
          }
        ],
        txNotice: [
          { required: true, message: "提现须知不能为空", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "风格设置,1单店,2多店不能为空",
            trigger: "blur"
          }
        ],
        txMode: [
          {
            required: true,
            message: "1手动打款,2自动打款不能为空",
            trigger: "blur"
          }
        ],
        isSjrz: [
          {
            required: true,
            message: "商家入住1开通,2不开通不能为空",
            trigger: "blur"
          }
        ],
        clientIp: [
          { required: true, message: "IP地址不能为空", trigger: "blur" }
        ],
        rzNotice: [
          { required: true, message: "认证须知不能为空", trigger: "blur" }
        ],
        hyRule: [
          { required: true, message: "会员规则不能为空", trigger: "blur" }
        ],
        bjLogo: [
          { required: true, message: "首页背景logo不能为空", trigger: "blur" }
        ],
        mapKey: [
          { required: true, message: "地图key不能为空", trigger: "blur" }
        ],
        isDxyz: [
          {
            required: true,
            message: "短信验证1开启,2关闭不能为空",
            trigger: "blur"
          }
        ],
        plScore: [
          { required: true, message: "评论积分不能为空", trigger: "blur" }
        ],
        xfScore: [
          { required: true, message: "消费积分不能为空", trigger: "blur" }
        ],
        hyImg: [{ required: true, message: "不能为空", trigger: "blur" }],
        rzTid: [{ required: true, message: "不能为空", trigger: "blur" }],
        openMember: [{ required: true, message: "不能为空", trigger: "blur" }],
        jjrzTid: [{ required: true, message: "不能为空", trigger: "blur" }],
        isSfz: [{ required: true, message: "不能为空", trigger: "blur" }],
        tplId2: [{ required: true, message: "不能为空", trigger: "blur" }],
        isOrder: [{ required: true, message: "不能为空", trigger: "blur" }],
        tid3: [{ required: true, message: "不能为空", trigger: "blur" }],
        tid4: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.uploadAction = this.$http.adornUrl(
      `/sys/oss/upload?token=${this.$cookie.get("token")}`
    );
    this.init();
  },
  methods: {
    init() {
      this.dataForm.id = 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.$http({
          url: this.$http.adornUrl(`/hotel/hotelsystem/info`),
          method: "get",
          params: this.$http.adornParams()
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm.appid = data.hotelSystem.appid;
            this.dataForm.appsecret = data.hotelSystem.appsecret;
            this.dataForm.mchid = data.hotelSystem.mchid;
            this.dataForm.wxkey = data.hotelSystem.wxkey;
            this.dataForm.uniacid = data.hotelSystem.uniacid;
            this.dataForm.jfRule = data.hotelSystem.jfRule;
            this.dataForm.bqName = data.hotelSystem.bqName;
            this.dataForm.linkName = data.hotelSystem.linkName;
            this.dataForm.linkLogo = data.hotelSystem.linkLogo;
            this.dataForm.support = data.hotelSystem.support;
            this.dataForm.bqLogo = data.hotelSystem.bqLogo;
            this.dataForm.color = data.hotelSystem.color;
            this.dataForm.tzAppid = data.hotelSystem.tzAppid;
            this.dataForm.tzName = data.hotelSystem.tzName;
            this.dataForm.ptName = data.hotelSystem.ptName;
            this.dataForm.tel = data.hotelSystem.tel;
            this.dataForm.totalNum = data.hotelSystem.totalNum;
            this.dataForm.appkey = data.hotelSystem.appkey;
            this.dataForm.tplId = data.hotelSystem.tplId;
            this.dataForm.sellerId = data.hotelSystem.sellerId;
            this.dataForm.apiclientCert = data.hotelSystem.apiclientCert;
            this.dataForm.apiclientKey = data.hotelSystem.apiclientKey;
            this.dataForm.zdMoney = data.hotelSystem.zdMoney;
            this.dataForm.txSxf = data.hotelSystem.txSxf;
            this.dataForm.rcTk = data.hotelSystem.rcTk;
            this.dataForm.tid1 = data.hotelSystem.tid1;
            this.dataForm.txNotice = data.hotelSystem.txNotice;
            this.dataForm.type = data.hotelSystem.type;
            this.dataForm.txMode = data.hotelSystem.txMode;
            this.dataForm.isSjrz = data.hotelSystem.isSjrz;
            this.dataForm.clientIp = data.hotelSystem.clientIp;
            this.dataForm.rzNotice = data.hotelSystem.rzNotice;
            this.dataForm.hyRule = data.hotelSystem.hyRule;
            this.dataForm.bjLogo = data.hotelSystem.bjLogo;
            this.dataForm.mapKey = data.hotelSystem.mapKey;
            this.dataForm.isDxyz = data.hotelSystem.isDxyz;
            this.dataForm.plScore = data.hotelSystem.plScore;
            this.dataForm.xfScore = data.hotelSystem.xfScore;
            this.dataForm.hyImg = data.hotelSystem.hyImg;
            this.dataForm.rzTid = data.hotelSystem.rzTid;
            this.dataForm.openMember = data.hotelSystem.openMember;
            this.dataForm.jjrzTid = data.hotelSystem.jjrzTid;
            this.dataForm.isSfz = data.hotelSystem.isSfz;
            this.dataForm.tplId2 = data.hotelSystem.tplId2;
            this.dataForm.isOrder = data.hotelSystem.isOrder;
            this.dataForm.tid3 = data.hotelSystem.tid3;
            this.dataForm.tid4 = data.hotelSystem.tid4;
            this.dataForm.companyName = data.hotelSystem.companyName;
            this.dataForm.companyPhone = data.hotelSystem.companyPhone;
            this.dataForm.companyEmail = data.hotelSystem.companyEmail;
            this.dataForm.companyAddress = data.hotelSystem.companyAddress;
            this.dataForm.businessLicense = data.hotelSystem.businessLicense;
            this.dataForm.licence = data.hotelSystem.licence;
            this.dataForm.platformInfo = data.hotelSystem.platformInfo;
            if (data.hotelSystem.linkLogo) {
              this.fileList.push({
                name: data.hotelSystem.linkLogo,
                url: data.hotelSystem.linkLogo
              });
            }
            if (data.hotelSystem.businessLicense) {
              this.businessLicenseList.push({
                name: data.hotelSystem.businessLicense,
                url: data.hotelSystem.businessLicense
              });
            }
            if (data.hotelSystem.licence) {
              this.licenceList.push({
                name: data.hotelSystem.licence,
                url: data.hotelSystem.licence
              });
            }
            console.log(this.fileList);
          }
        });
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/hotel/hotelsystem/save`),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              appid: this.dataForm.appid,
              appsecret: this.dataForm.appsecret,
              mchid: this.dataForm.mchid,
              wxkey: this.dataForm.wxkey,
              uniacid: this.dataForm.uniacid,
              jfRule: this.dataForm.jfRule,
              bqName: this.dataForm.bqName,
              linkName: this.dataForm.linkName,
              linkLogo: this.fileList.length > 0 ? this.fileList[0].url : "",
              support: this.dataForm.support,
              bqLogo: this.dataForm.bqLogo,
              color: this.dataForm.color,
              tzAppid: this.dataForm.tzAppid,
              tzName: this.dataForm.tzName,
              ptName: this.dataForm.ptName,
              tel: this.dataForm.tel,
              totalNum: this.dataForm.totalNum,
              appkey: this.dataForm.appkey,
              tplId: this.dataForm.tplId,
              sellerId: this.dataForm.sellerId,
              apiclientCert: this.dataForm.apiclientCert,
              apiclientKey: this.dataForm.apiclientKey,
              zdMoney: this.dataForm.zdMoney,
              txSxf: this.dataForm.txSxf,
              rcTk: this.dataForm.rcTk,
              tid1: this.dataForm.tid1,
              txNotice: this.dataForm.txNotice,
              type: this.dataForm.type,
              txMode: this.dataForm.txMode,
              isSjrz: this.dataForm.isSjrz,
              clientIp: this.dataForm.clientIp,
              rzNotice: this.dataForm.rzNotice,
              hyRule: this.dataForm.hyRule,
              bjLogo: this.dataForm.bjLogo,
              mapKey: this.dataForm.mapKey,
              isDxyz: this.dataForm.isDxyz,
              plScore: this.dataForm.plScore,
              xfScore: this.dataForm.xfScore,
              hyImg: this.dataForm.hyImg,
              rzTid: this.dataForm.rzTid,
              openMember: this.dataForm.openMember,
              jjrzTid: this.dataForm.jjrzTid,
              isSfz: this.dataForm.isSfz,
              tplId2: this.dataForm.tplId2,
              isOrder: this.dataForm.isOrder,
              tid3: this.dataForm.tid3,
              tid4: this.dataForm.tid4,
              companyName: this.dataForm.companyName,
              companyPhone: this.dataForm.companyPhone,
              companyEmail: this.dataForm.companyEmail,
              companyAddress: this.dataForm.companyAddress,
              businessLicense:
                this.businessLicenseList.length > 0
                  ? this.businessLicenseList[0].url
                  : "",
              licence:
                this.licenceList.length > 0 ? this.licenceList[0].url : "",
              platformInfo: this.dataForm.platformInfo
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
    handleAvatarSuccess(res, file) {
      const { url } = res;
      this.fileList.push({
        name: url,
        url: url
      });
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
    },
    handleRemove(file, fileList) {
      const { response } = file;
      this.dataForm.linkLogo = undefined;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //
    businessLicenseHandleAvatarSuccess(res, file) {
      const { url } = res;
      this.businessLicenseList.push({
        name: url,
        url: url
      });
      console.log(url);
    },
    businessLicenseBeforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    businessLicenseHandleRemove(file, fileList) {
      const { response } = file;
      this.dataForm.businessLicense = undefined;
      this.businessLicenseList = [];
    },
    businessLicenseHandlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //
    licenceHandleAvatarSuccess(res, file) {
      const { url } = res;
      this.licenceList.push({
        name: url,
        url: url
      });
      console.log(url);
    },
    licenceBeforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    licenceHandleRemove(file, fileList) {
      const { response } = file;
      this.dataForm.licence = undefined;
      this.licenceList = [];
    },
    licenceHandlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    isEmpty(obj) {
      if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
      } else {
        return false;
      }
    },
    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.disabled .el-upload--picture-card {
  display: none;
}
</style>
