<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '评论回复'"
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
      <el-form-item label="分数" prop="score">
        <el-input :disabled="true" v-model="dataForm.score" placeholder="分数"></el-input>
      </el-form-item>
      <el-form-item label="评价内容" prop="content">
        <el-input type="textarea" :disabled="true" v-model="dataForm.content" placeholder="评价内容"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <div>
          <img style="width: 100px;" :src="dataForm.img" alt="">
        </div>
      </el-form-item>
      <el-form-item label="商家回复" prop="reply">
        <el-input type="textarea" v-model="dataForm.reply" placeholder="商家回复"></el-input>
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
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      visible: false,
      dataForm: {
        id: 0,
        sellerId: "",
        score: "",
        content: "",
        img: "",
        time: "",
        userId: "",
        reply: "",
        status: "",
        replyTime: "",
        type: "",
        orderId: "",
        goodsId: ""
      },
      dataRule: {
        sellerId: [
          { required: true, message: "商家ID不能为空", trigger: "blur" }
        ],
        score: [{ required: true, message: "分数不能为空", trigger: "blur" }],
        content: [
          { required: true, message: "评价内容不能为空", trigger: "blur" }
        ],
        img: [{ required: true, message: "图片不能为空", trigger: "blur" }],
        time: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        reply: [
          { required: true, message: "商家回复不能为空", trigger: "blur" }
        ],
        status: [
          {
            required: true,
            message: "评价状态1，未回复，2已回复不能为空",
            trigger: "blur"
          }
        ],
        replyTime: [
          { required: true, message: "回复时间不能为空", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "类型 1-酒店，2-商品不能为空",
            trigger: "blur"
          }
        ],
        orderId: [
          { required: true, message: "订单ID不能为空", trigger: "blur" }
        ],
        goodsId: [
          { required: true, message: "商品ID不能为空", trigger: "blur" }
        ]
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
              `/hotel/hotelassess/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.sellerId = data.hotelAssess.sellerId;
              this.dataForm.score = data.hotelAssess.score;
              this.dataForm.content = data.hotelAssess.content;
              this.dataForm.img = data.hotelAssess.img;
              this.dataForm.time = data.hotelAssess.time;
              this.dataForm.userId = data.hotelAssess.userId;
              this.dataForm.reply = data.hotelAssess.reply;
              this.dataForm.status = data.hotelAssess.status;
              this.dataForm.replyTime = data.hotelAssess.replyTime;
              this.dataForm.type = data.hotelAssess.type;
              this.dataForm.orderId = data.hotelAssess.orderId;
              this.dataForm.goodsId = data.hotelAssess.goodsId;
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
              `/hotel/hotelassess/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              sellerId: this.dataForm.sellerId,
              score: this.dataForm.score,
              content: this.dataForm.content,
              img: this.dataForm.img,
              time: this.dataForm.time,
              userId: this.dataForm.userId,
              reply: this.dataForm.reply,
              status: this.dataForm.status,
              replyTime: this.dataForm.replyTime,
              type: this.dataForm.type,
              orderId: this.dataForm.orderId,
              goodsId: this.dataForm.goodsId
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
