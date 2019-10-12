<template>
  <div class="mod-demo-ueditor" v-loading="dataListLoading"  element-loading-text="拼命加载中">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="auto"
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
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <img
          v-for="item in fileList"
          :key="item.url"
          :src="item.url"
          class="avatar"
          :style="{float:'left', marginRight:'5px'}"
        />
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        <el-checkbox v-model="dataForm.wifi" :label="1">Wi-Fi</el-checkbox>
        <el-checkbox v-model="dataForm.park" :label="1">停车场</el-checkbox>
        <el-checkbox v-model="dataForm.breakfast" :label="1">早餐</el-checkbox>
        <el-checkbox v-model="dataForm.gym" :label="1">健身房</el-checkbox>
        <el-checkbox v-model="dataForm.water" :label="1">热水</el-checkbox>
        <el-checkbox v-model="dataForm.boardroom" :label="1">会议室</el-checkbox>
      </el-form-item>
      <el-form-item label="酒店支持">
        <el-checkbox v-model="dataForm.unionpay" :label="1">银联支付</el-checkbox>
        <el-checkbox v-model="dataForm.wxOpen" :label="1">微信支付</el-checkbox>
        <el-checkbox v-model="dataForm.ddOpen" :label="1">到店支付</el-checkbox>
        <el-checkbox v-model="dataForm.yeOpen" :label="1">余额支付</el-checkbox>
      </el-form-item>
      <el-form-item style="height:300px" label="酒店政策" prop="policy">
        <!-- <el-input v-model="dataForm.policy" placeholder="酒店政策"></el-input> -->
        <quill-editor
          style="height:200px"
          class="editor"
          v-model="dataForm.policy"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-form-item>
      <el-form-item label="酒店介绍" style="height:300px" prop="introduction">
        <!-- <el-input v-model="dataForm.introduction" placeholder="酒店介绍"></el-input> -->
        <quill-editor
          style="height:200px"
          class="editor"
          v-model="dataForm.introduction"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-form-item>
      <el-form-item label="预定提醒" style="height:300px" prop="reserveRemind">
        <!-- <el-input v-model="dataForm.introduction" placeholder="酒店介绍"></el-input> -->
        <quill-editor
          style="height:200px"
          class="editor"
          v-model="dataForm.reserveRemind"
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
import ueditor from "ueditor";
export default {
  data() {
    return {
      dataListLoading:false,
      content: "111",
      editorOption: {},
      uploadAction: "",
      dialogVisible: false,
      visible: false,
      fileList: [],
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
        ddOpen: "",
        reserveRemind:""
      },
      dataRule: {
        name: [{ required: true, message: "名字不能为空", trigger: "blur" }],
        star: [{ required: true, message: "星级不能为空", trigger: "blur" }],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        // linkName: [
        //   { required: true, message: "联系人不能为空", trigger: "blur" }
        // ],
        // linkTel: [
        //   { required: true, message: "联系电话不能为空", trigger: "blur" }
        // ],
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
        time: [{ required: true, message: "时间不能为空", trigger: "blur" }],
        coordinates: [
          { required: true, message: "经纬度不能为空", trigger: "blur" }
        ],
        scort: [{ required: true, message: "排序不能为空", trigger: "blur" }]
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
    init(id) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelseller/store`),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataForm.id = data.hotelSeller.id;
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
          this.dataForm.reserveRemind = data.hotelSeller.reserveRemind;
          data.hotelSeller.img.split(",").forEach(element => {
            this.fileList.push({ url: element });
          });
        }
        this.dataListLoading = false;
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
              ddOpen: this.dataForm.ddOpen,
              reserveRemind:this.dataForm.reserveRemind,
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

    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },

    handleAvatarSuccess(res, file) {
      this.dataForm.ewmLogo = res.url;
    },

    handleImageSuccess(res, file) {
      this.fileList.push({ url: res.url });
      let url = [];
      this.fileList.forEach(item => {
        url.push(item.url);
      });
      console.log(url);
      this.dataForm.img = url.join(",");
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>
<style lang="scss">
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
.mod-demo-ueditor {
  position: relative;
  z-index: 510;
  > .el-alert {
    margin-bottom: 10px;
  }
}
</style>
