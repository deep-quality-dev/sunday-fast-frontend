<template>
  <el-dialog
    width="80%"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="hotel-room"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="auto"
    >
      <el-form-item label="房型名字" prop="name">
        <el-input v-model="dataForm.name" placeholder="房型名字"></el-input>
      </el-form-item>
      <el-form-item label="房型大图" prop="logo">
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="dataForm.logo" :src="dataForm.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="房间类别" prop="classify">
        <el-radio-group v-model="dataForm.classify">
          <el-radio :label="1">普通房</el-radio>
          <el-radio :label="0">钟点房</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="房间设施">
        <el-checkbox label="热水" v-model="dataForm.water" name="water"></el-checkbox>
        <el-checkbox label="空调" v-model="dataForm.air" name="air"></el-checkbox>
        <el-checkbox label="电视" v-model="dataForm.tv" name="tv"></el-checkbox>
        <el-checkbox label="WIFI" v-model="dataForm.wifi" name="wifi"></el-checkbox>
        <el-checkbox label="窗户" v-model="dataForm.windows" name="windows"></el-checkbox>
      </el-form-item>
      <el-form-item label="楼层" prop="floor">
        <el-input v-model="dataForm.floor" placeholder="楼层"></el-input>
      </el-form-item>
      <el-form-item label="可住人数" prop="people">
        <el-input v-model="dataForm.people" placeholder="可住人数"></el-input>
      </el-form-item>
      <el-form-item label="床型尺寸" prop="size">
        <el-input v-model="dataForm.size" placeholder="床型尺寸"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="totalNum">
        <el-input v-model="dataForm.totalNum" placeholder="数量"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <img
          v-for="item in fileList"
          :key="item.url"
          :src="item.url"
          class="avatar"
          :style="{float:'left',marginRight:'5px'}"
        >
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
      uploadAction: "",
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      dataForm: {
        id: 0,
        name: "",
        price: "",
        img: "",
        floor: "",
        people: "",
        bed: "",
        breakfast: "",
        facilities: "",
        windows: "",
        logo: "",
        size: "",
        isRefund: "",
        totalNum: "",
        yjState: "",
        yjCost: "",
        sort: "",
        state: "",
        classify: 1
      },
      dataRule: {
        name: [
          { required: true, message: "房型名字不能为空", trigger: "blur" }
        ],
        img: [{ required: true, message: "图片不能为空", trigger: "blur" }],
        size: [
          { required: true, message: "床型尺寸不能为空", trigger: "blur" }
        ],
        sort: [{ required: true, message: "排序不能为空", trigger: "blur" }],
        state: [
          { required: true, message: "房间状态不能为空", trigger: "blur" }
        ],
        classify: [
          { required: true, message: "房间类别不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id) {
      this.fileList = [];
      this.uploadAction = this.$http.adornUrl(
        `/sys/oss/upload?token=${this.$cookie.get("token")}`
      );
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelroom/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.hotelroom.name;
              this.dataForm.price = data.hotelroom.price;
              this.dataForm.img = data.hotelroom.img;
              this.dataForm.floor = data.hotelroom.floor;
              this.dataForm.people = data.hotelroom.people;
              this.dataForm.bed = data.hotelroom.bed;
              this.dataForm.breakfast =
                data.hotelroom.breakfast === 1 ? true : false;
              this.dataForm.facilities = data.hotelroom.facilities;
              this.dataForm.windows =
                data.hotelroom.windows === 1 ? true : false;
              this.dataForm.logo = data.hotelroom.logo;
              this.dataForm.totalNum = data.hotelroom.totalNum;
              this.dataForm.uniacid = data.hotelroom.uniacid;
              this.dataForm.size = data.hotelroom.size;
              this.dataForm.sort = data.hotelroom.sort;
              this.dataForm.state = data.hotelroom.state;
              this.dataForm.classify = data.hotelroom.classify;
              this.dataForm.rzTime = data.hotelroom.rzTime;
              data.hotelroom.img.split(",").forEach(element => {
                this.fileList.push({ url: element });
              });
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
              `/hotel/hotelroom/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              sellerId: this.dataForm.sellerId,
              name: this.dataForm.name,
              price: this.dataForm.price,
              img: this.dataForm.img,
              floor: this.dataForm.floor,
              people: this.dataForm.people,
              bed: this.dataForm.bed,
              breakfast: this.dataForm.breakfast ? 1 : 0,
              facilities: this.dataForm.facilities,
              windows: this.dataForm.windows ? 1 : 0,
              logo: this.dataForm.logo,
              totalNum: this.dataForm.totalNum,
              uniacid: this.dataForm.uniacid,
              size: this.dataForm.size,
              isRefund: this.dataForm.isRefund,
              yjState: this.dataForm.yjState,
              yjCost: this.dataForm.yjCost,
              sort: this.dataForm.sort,
              state: this.dataForm.state,
              classify: this.dataForm.classify,
              rzTime: this.dataForm.rzTime
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
      this.dataForm.logo = res.url;
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
<style lang="less">
.hotel-room {
  .el-dialog__body {
    height: 80vh;
  }
}
</style>
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
