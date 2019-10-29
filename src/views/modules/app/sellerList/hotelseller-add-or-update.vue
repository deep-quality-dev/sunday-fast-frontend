<template>
  <el-dialog
    width="90%"
    :title="!dataForm.id ? '新增' : '修改'"
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="名字" prop="name">
            <el-input v-model="dataForm.name" placeholder="名字"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="星级" prop="star">
            <el-input v-model="dataForm.star" placeholder="星级"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="地址" prop="address">
            <el-input v-model="dataForm.address" placeholder="地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人" prop="linkName">
            <el-input v-model="dataForm.linkName" placeholder="联系人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="linkTel">
            <el-input v-model="dataForm.linkTel" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="酒店电话" prop="tel">
            <el-input v-model="dataForm.tel" placeholder="酒店电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="开业时间" prop="openTime">
        <el-date-picker
          style="width:100%"
          v-model="dataForm.openTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <el-upload
          :file-list="getImgs(dataForm.img)"
          list-type="picture-card"
          :action="uploadAction"
          :on-success="handleImageSuccess"
          :on-remove="handleImageRemove"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item label="退订规则" prop="rule">
        <el-input v-model="dataForm.rule" placeholder="退订规则"></el-input>
      </el-form-item>
      <el-form-item label="经纬度" prop="coordinates">
        <el-input v-model="dataForm.coordinates" placeholder="经纬度"></el-input>
      </el-form-item>-->
      <!-- <el-form-item label="温馨提示" prop="prompt">
        <el-input v-model="dataForm.prompt" placeholder="温馨提示"></el-input>
      </el-form-item>-->
      <el-form-item label="酒店设施">
        <el-checkbox v-model="dataForm.wake" :label="1" name="type">叫醒</el-checkbox>
        <el-checkbox v-model="dataForm.wifi" :label="1">WI-FI</el-checkbox>
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
      <!-- <el-form-item label="平台优惠券使用" prop="isUse">
      <el-input v-model="dataForm.isUse" placeholder="平台优惠券使用"></el-input>
      </el-form-item>-->
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
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike", "link", "image", "align"],
            ["blockquote", "code-block"]
          ]
        }
      },
      uploadAction: "",
      dialogVisible: false,
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
        reserveRemind: "",
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
  methods: {
    getImgs(img) {
      return (img || '').split(',').filter(url => !!url).map(url => ({
        name: url,
        url
      }));
    },
    init(id) {
      this.uploadAction = this.$http.adornUrl(
        `/sys/oss/upload?token=${this.$cookie.get("token")}`
      );
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$refs["dataForm"] && this.$refs["dataForm"].resetFields();
      if (this.dataForm.id) {
        this.$http({
          url: this.$http.adornUrl(
            `/hotel/hotelseller/info/${this.dataForm.id}`
          ),
          method: "get",
          params: this.$http.adornParams()
        }).then(({ data }) => {
          if (data && data.code === 0) {
            const hotelSeller = data.hotelSeller || {};
            this.dataForm = {
              ...hotelSeller,
              wake: hotelSeller.wake === 1,
              wifi: hotelSeller.wifi === 1,
              park: hotelSeller.park === 1,
              breakfast: hotelSeller.breakfast === 1,
              unionpay: hotelSeller.unionpay === 1,
              gym: hotelSeller.gym === 1,
              boardroom: hotelSeller.boardroom === 1,
              water: hotelSeller.water === 1,
              yeOpen: hotelSeller.yeOpen === 1,
              wxOpen: hotelSeller.wxOpen === 1,
              ddOpen: hotelSeller.ddOpen === 1
            };
          }
        });
      }
    },
    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
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
              ...this.dataForm,
              id: this.dataForm.id || undefined,
              wake: this.dataForm.wake ? "1" : "0",
              wifi: this.dataForm.wifi ? "1" : "0",
              park: this.dataForm.park ? "1" : "0",
              breakfast: this.dataForm.breakfast ? "1" : "0",
              unionpay: this.dataForm.unionpay ? "1" : "0",
              gym: this.dataForm.gym ? "1" : "0",
              boardroom: this.dataForm.boardroom ? "1" : "0",
              water: this.dataForm.water ? "1" : "0",
              yeOpen: this.dataForm.yeOpen ? "1" : "0",
              wxOpen: this.dataForm.wxOpen ? "1" : "0",
              ddOpen: this.dataForm.ddOpen ? "1" : "0",
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
      this.dataForm.ewmLogo = res.url;
    },

    handleImageSuccess(res, file, fileList) {
      const list = fileList.map(item => item.url || item.response.url);
      this.dataForm.img = list.join(",");
    },
    handleImageRemove(file, fileList) {
      this.handleImageSuccess({}, file, fileList);
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
