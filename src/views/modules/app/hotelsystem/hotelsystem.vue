<template>
  <div>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="网站名称" prop="linkName">
        <el-input v-model="dataForm.linkName" placeholder="网站名称"></el-input>
      </el-form-item>
      <el-form-item label="网站logo" prop="linkLogo">
        <el-input v-model="dataForm.linkLogo" placeholder="网站logo"></el-input>
      </el-form-item>
      <el-form-item label="" prop="bqLogo">
        <el-input v-model="dataForm.bqLogo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="color">
        <el-input v-model="dataForm.color" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="tzAppid">
        <el-input v-model="dataForm.tzAppid" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="tzName">
        <el-input v-model="dataForm.tzName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="平台名称" prop="ptName">
        <el-input v-model="dataForm.ptName" placeholder="平台名称"></el-input>
      </el-form-item>
      <el-form-item label="平台电话" prop="tel">
        <el-input v-model="dataForm.tel" placeholder="平台电话"></el-input>
      </el-form-item>
      <el-form-item label="评论积分" prop="plScore">
        <el-input v-model="dataForm.plScore" placeholder="评论积分"></el-input>
      </el-form-item>
      <el-form-item label="消费积分" prop="xfScore">
        <el-input v-model="dataForm.xfScore" placeholder="消费积分"></el-input>
      </el-form-item>
      <el-form-item label="" prop="hyImg">
        <el-input v-model="dataForm.hyImg" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="rzTid">
        <el-input v-model="dataForm.rzTid" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="openMember">
        <el-input v-model="dataForm.openMember" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="jjrzTid">
        <el-input v-model="dataForm.jjrzTid" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="isSfz">
        <el-input v-model="dataForm.isSfz" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="tplId2">
        <el-input v-model="dataForm.tplId2" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="isOrder">
        <el-input v-model="dataForm.isOrder" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="tid3">
        <el-input v-model="dataForm.tid3" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="tid4">
        <el-input v-model="dataForm.tid4" placeholder=""></el-input>
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
      visible: false,
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
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelsystem/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.appid = data.hotelsystem.appid;
              this.dataForm.appsecret = data.hotelsystem.appsecret;
              this.dataForm.mchid = data.hotelsystem.mchid;
              this.dataForm.wxkey = data.hotelsystem.wxkey;
              this.dataForm.uniacid = data.hotelsystem.uniacid;
              this.dataForm.jfRule = data.hotelsystem.jfRule;
              this.dataForm.bqName = data.hotelsystem.bqName;
              this.dataForm.linkName = data.hotelsystem.linkName;
              this.dataForm.linkLogo = data.hotelsystem.linkLogo;
              this.dataForm.support = data.hotelsystem.support;
              this.dataForm.bqLogo = data.hotelsystem.bqLogo;
              this.dataForm.color = data.hotelsystem.color;
              this.dataForm.tzAppid = data.hotelsystem.tzAppid;
              this.dataForm.tzName = data.hotelsystem.tzName;
              this.dataForm.ptName = data.hotelsystem.ptName;
              this.dataForm.tel = data.hotelsystem.tel;
              this.dataForm.totalNum = data.hotelsystem.totalNum;
              this.dataForm.appkey = data.hotelsystem.appkey;
              this.dataForm.tplId = data.hotelsystem.tplId;
              this.dataForm.sellerId = data.hotelsystem.sellerId;
              this.dataForm.apiclientCert = data.hotelsystem.apiclientCert;
              this.dataForm.apiclientKey = data.hotelsystem.apiclientKey;
              this.dataForm.zdMoney = data.hotelsystem.zdMoney;
              this.dataForm.txSxf = data.hotelsystem.txSxf;
              this.dataForm.rcTk = data.hotelsystem.rcTk;
              this.dataForm.tid1 = data.hotelsystem.tid1;
              this.dataForm.txNotice = data.hotelsystem.txNotice;
              this.dataForm.type = data.hotelsystem.type;
              this.dataForm.txMode = data.hotelsystem.txMode;
              this.dataForm.isSjrz = data.hotelsystem.isSjrz;
              this.dataForm.clientIp = data.hotelsystem.clientIp;
              this.dataForm.rzNotice = data.hotelsystem.rzNotice;
              this.dataForm.hyRule = data.hotelsystem.hyRule;
              this.dataForm.bjLogo = data.hotelsystem.bjLogo;
              this.dataForm.mapKey = data.hotelsystem.mapKey;
              this.dataForm.isDxyz = data.hotelsystem.isDxyz;
              this.dataForm.plScore = data.hotelsystem.plScore;
              this.dataForm.xfScore = data.hotelsystem.xfScore;
              this.dataForm.hyImg = data.hotelsystem.hyImg;
              this.dataForm.rzTid = data.hotelsystem.rzTid;
              this.dataForm.openMember = data.hotelsystem.openMember;
              this.dataForm.jjrzTid = data.hotelsystem.jjrzTid;
              this.dataForm.isSfz = data.hotelsystem.isSfz;
              this.dataForm.tplId2 = data.hotelsystem.tplId2;
              this.dataForm.isOrder = data.hotelsystem.isOrder;
              this.dataForm.tid3 = data.hotelsystem.tid3;
              this.dataForm.tid4 = data.hotelsystem.tid4;
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
              `/hotel/hotelsystem/${!this.dataForm.id ? "save" : "update"}`
            ),
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
              linkLogo: this.dataForm.linkLogo,
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
              tid4: this.dataForm.tid4
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
