<template>
  <div class="mod-demo-ueditor" v-loading="dataListLoading" element-loading-text="拼命加载中">
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
          <el-option label="一星及以下/经济" value="1"></el-option>
          <el-option label="二星/实惠" value="2"></el-option>
          <el-option label="三星/舒适" value="3"></el-option>
          <el-option label="四星/高档" value="4"></el-option>
          <el-option label="五星/豪华" value="5"></el-option>
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
        <el-upload
          :file-list="getImgs(dataForm.img)"
          list-type="picture-card"
          :action="uploadAction"
          :on-success="handleImageSuccess"
          :on-remove="handleImageRemove"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-plus"></i>
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
      <el-form-item label="酒店标签" prop="discounts">
        <el-tag
          :key="tag"
          v-for="tag in dataForm.tagList"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
        >
          <el-button slot="append" icon="el-icon-plus" @click="handleInputConfirm()"></el-button>
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
      </el-form-item>
      <el-form-item label="酒店设施">
        <el-checkbox v-model="dataForm.wake" :label="1">叫醒</el-checkbox>
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </div>
</template>

<script>
import ueditor from "ueditor";
import _ from "lodash";
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      dataListLoading: false,
      content: "111",
      editorOption: {},
      uploadAction: "",
      dialogVisible: false,
      visible: false,
      fileList: [],
      dataForm: {
        id: 0,
        owner: "",
        tagList: [],
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
        metro: "",
        repast: "",
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
        reserveRemind: ""
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
    getImgs(img) {
      return (img || "")
        .split(",")
        .filter(url => !!url)
        .map(url => ({
          name: url,
          url
        }));
    },
    init(id) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelseller/store`),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          const hotelSeller = data.hotelSeller || {};
          this.dataForm = {
            ...hotelSeller,
            tagList: hotelSeller.tagList || [],
            metro: hotelSeller.metro === 1,
            repast: hotelSeller.repast === 1,
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
              ...this.dataForm,
              id: this.dataForm.id || undefined,
              wake: this.dataForm.wake ? "1" : "0",
              wifi: this.dataForm.wifi ? "1" : "0",

              metro: this.dataForm.metro ? "1" : "0",
              repast: this.dataForm.repast ? "1" : "0",
              tagList: this.dataForm.tagList,
              park: this.dataForm.park ? "1" : "0",
              breakfast: this.dataForm.breakfast ? "1" : "0",
              unionpay: this.dataForm.unionpay ? "1" : "0",
              gym: this.dataForm.gym ? "1" : "0",
              boardroom: this.dataForm.boardroom ? "1" : "0",
              water: this.dataForm.water ? "1" : "0",
              yeOpen: this.dataForm.yeOpen ? "1" : "0",
              wxOpen: this.dataForm.wxOpen ? "1" : "0",
              ddOpen: this.dataForm.ddOpen ? "1" : "0"
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
    handleClose(tag) {
      this.dataForm.tagList.splice(this.dataForm.tagList.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dataForm.tagList.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 190px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
