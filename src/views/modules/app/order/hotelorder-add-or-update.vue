<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="dataForm.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="商家名字" prop="sellerName">
        <el-input v-model="dataForm.sellerName" placeholder="商家名字"></el-input>
      </el-form-item>
      <el-form-item label="商家地址" prop="sellerAddress">
        <el-input v-model="dataForm.sellerAddress" placeholder="商家地址"></el-input>
      </el-form-item>
      <el-form-item label="经纬度" prop="coordinates">
        <el-input v-model="dataForm.coordinates" placeholder="经纬度"></el-input>
      </el-form-item>
      <el-form-item label="入住时间" prop="arrivalTime">
        <el-input v-model="dataForm.arrivalTime" placeholder="入住时间"></el-input>
      </el-form-item>
      <el-form-item label="离店时间" prop="departureTime">
        <el-input v-model="dataForm.departureTime" placeholder="离店时间"></el-input>
      </el-form-item>
      <el-form-item label="到店时间" prop="ddTime">
        <el-input v-model="dataForm.ddTime" placeholder="到店时间"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="dataForm.price" placeholder="价格"></el-input>
      </el-form-item>
      <el-form-item label="房间数量" prop="num">
        <el-input v-model="dataForm.num" placeholder="房间数量"></el-input>
      </el-form-item>
      <el-form-item label="入住天数" prop="days">
        <el-input v-model="dataForm.days" placeholder="入住天数"></el-input>
      </el-form-item>
      <el-form-item label="房型" prop="roomType">
        <el-input v-model="dataForm.roomType" placeholder="房型"></el-input>
      </el-form-item>
      <el-form-item label="房间主图" prop="roomLogo">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="床型" prop="bedType">
        <el-input v-model="dataForm.bedType" placeholder="床型"></el-input>
      </el-form-item>
      <el-form-item label="预定人" prop="name">
        <el-input v-model="dataForm.name" placeholder="预定人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="dataForm.tel" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-input v-model="dataForm.status" placeholder="订单状态"></el-input>
      </el-form-item>
      <el-form-item label="商户订单号" prop="outTradeNo">
        <el-input v-model="dataForm.outTradeNo" placeholder="商户订单号"></el-input>
      </el-form-item>
      <el-form-item label="折后价格" prop="disCost">
        <el-input v-model="dataForm.disCost" placeholder="折后价格"></el-input>
      </el-form-item>
      <el-form-item label="押金金额" prop="yjCost">
        <el-input v-model="dataForm.yjCost" placeholder="押金金额"></el-input>
      </el-form-item>
      <el-form-item label="优惠券价格" prop="yhqCost">
        <el-input v-model="dataForm.yhqCost" placeholder="优惠券价格"></el-input>
      </el-form-item>
      <el-form-item label="会员折扣金额" prop="yyzkCost">
        <el-input v-model="dataForm.yyzkCost" placeholder="会员折扣金额"></el-input>
      </el-form-item>
      <el-form-item label="总价格" prop="totalCost">
        <el-input v-model="dataForm.totalCost" placeholder="总价格"></el-input>
      </el-form-item>
      <el-form-item label="是否删除" prop="enabled">
        <el-input v-model="dataForm.enabled" placeholder="是否删除"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="已退押金" prop="retreatCost">
        <el-input v-model="dataForm.retreatCost" placeholder="已退押金"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
        <el-input v-model="dataForm.classify" placeholder="分类"></el-input>
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
      dataForm: {
        id: 0,
        sellerId: "",
        roomId: "",
        userId: "",
        couponsId: "",
        orderNo: "",
        sellerName: "",
        sellerAddress: "",
        coordinates: "",
        arrivalTime: "",
        departureTime: "",
        ddTime: "",
        price: "",
        num: "",
        days: "",
        roomType: "",
        roomLogo: "",
        bedType: "",
        name: "",
        tel: "",
        status: "",
        outTradeNo: "",
        disCost: "",
        yjCost: "",
        yhqCost: "",
        yyzkCost: "",
        totalCost: "",
        enabled: "",
        createTime: "",
        retreatCost: "",
        hbCost: "",
        hbId: "",
        fromId: "",
        classify: "",
        code: "",
        jjTime: "",
        voice: "",
        qrFromid: "",
        orderInfo: ""
      },
      dataRule: {
        sellerId: [
          { required: true, message: "商家ID不能为空", trigger: "blur" }
        ],
        roomId: [{ required: true, message: "房ID不能为空", trigger: "blur" }],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        couponsId: [
          { required: true, message: "优惠券ID不能为空", trigger: "blur" }
        ],
        orderNo: [
          { required: true, message: "订单号不能为空", trigger: "blur" }
        ],
        sellerName: [
          { required: true, message: "商家名字不能为空", trigger: "blur" }
        ],
        sellerAddress: [
          { required: true, message: "商家地址不能为空", trigger: "blur" }
        ],
        coordinates: [
          { required: true, message: "经纬度不能为空", trigger: "blur" }
        ],
        arrivalTime: [
          { required: true, message: "入住时间不能为空", trigger: "blur" }
        ],
        departureTime: [
          { required: true, message: "离店时间不能为空", trigger: "blur" }
        ],
        ddTime: [
          { required: true, message: "到店时间不能为空", trigger: "blur" }
        ],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
        num: [{ required: true, message: "房间数量不能为空", trigger: "blur" }],
        days: [
          { required: true, message: "入住天数不能为空", trigger: "blur" }
        ],
        roomType: [
          { required: true, message: "房型不能为空", trigger: "blur" }
        ],
        roomLogo: [
          { required: true, message: "房间主图不能为空", trigger: "blur" }
        ],
        bedType: [{ required: true, message: "床型不能为空", trigger: "blur" }],
        name: [{ required: true, message: "预定人不能为空", trigger: "blur" }],
        tel: [{ required: true, message: "联系电话不能为空", trigger: "blur" }],
        status: [
          {
            required: true,
            message:
              "1未付款,2已付款，3取消,4完成,5已入住,6申请退款,7退款,8拒绝退款不能为空",
            trigger: "blur"
          }
        ],
        outTradeNo: [
          { required: true, message: "商户订单号不能为空", trigger: "blur" }
        ],
        disCost: [
          { required: true, message: "折扣后的价格不能为空", trigger: "blur" }
        ],
        yjCost: [
          { required: true, message: "押金金额不能为空", trigger: "blur" }
        ],
        yhqCost: [
          { required: true, message: "优惠券价格不能为空", trigger: "blur" }
        ],
        yyzkCost: [
          { required: true, message: "会员折扣金额不能为空", trigger: "blur" }
        ],
        totalCost: [
          { required: true, message: "总价格不能为空", trigger: "blur" }
        ],
        enabled: [
          { required: true, message: "是否删除,1删除不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        retreatCost: [
          { required: true, message: "已退押金不能为空", trigger: "blur" }
        ],
        hbCost: [{ required: true, message: "不能为空", trigger: "blur" }],
        hbId: [{ required: true, message: "不能为空", trigger: "blur" }],
        fromId: [{ required: true, message: "不能为空", trigger: "blur" }],
        classify: [
          { required: true, message: "分类不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "不能为空", trigger: "blur" }],
        jjTime: [{ required: true, message: "不能为空", trigger: "blur" }],
        voice: [{ required: true, message: "不能为空", trigger: "blur" }],
        qrFromid: [{ required: true, message: "不能为空", trigger: "blur" }],
        orderInfo: [
          { required: true, message: "订单快照不能为空", trigger: "blur" }
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
              `/hotel/hotelorder/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.sellerId = data.hotelorder.sellerId;
              this.dataForm.roomId = data.hotelorder.roomId;
              this.dataForm.userId = data.hotelorder.userId;
              this.dataForm.couponsId = data.hotelorder.couponsId;
              this.dataForm.orderNo = data.hotelorder.orderNo;
              this.dataForm.sellerName = data.hotelorder.sellerName;
              this.dataForm.sellerAddress = data.hotelorder.sellerAddress;
              this.dataForm.coordinates = data.hotelorder.coordinates;
              this.dataForm.arrivalTime = data.hotelorder.arrivalTime;
              this.dataForm.departureTime = data.hotelorder.departureTime;
              this.dataForm.ddTime = data.hotelorder.ddTime;
              this.dataForm.price = data.hotelorder.price;
              this.dataForm.num = data.hotelorder.num;
              this.dataForm.days = data.hotelorder.days;
              this.dataForm.roomType = data.hotelorder.roomType;
              this.dataForm.roomLogo = data.hotelorder.roomLogo;
              this.dataForm.bedType = data.hotelorder.bedType;
              this.dataForm.name = data.hotelorder.name;
              this.dataForm.tel = data.hotelorder.tel;
              this.dataForm.status = data.hotelorder.status;
              this.dataForm.outTradeNo = data.hotelorder.outTradeNo;
              this.dataForm.disCost = data.hotelorder.disCost;
              this.dataForm.yjCost = data.hotelorder.yjCost;
              this.dataForm.yhqCost = data.hotelorder.yhqCost;
              this.dataForm.yyzkCost = data.hotelorder.yyzkCost;
              this.dataForm.totalCost = data.hotelorder.totalCost;
              this.dataForm.enabled = data.hotelorder.enabled;
              this.dataForm.createTime = data.hotelorder.createTime;
              this.dataForm.retreatCost = data.hotelorder.retreatCost;
              this.dataForm.hbCost = data.hotelorder.hbCost;
              this.dataForm.hbId = data.hotelorder.hbId;
              this.dataForm.fromId = data.hotelorder.fromId;
              this.dataForm.classify = data.hotelorder.classify;
              this.dataForm.code = data.hotelorder.code;
              this.dataForm.jjTime = data.hotelorder.jjTime;
              this.dataForm.voice = data.hotelorder.voice;
              this.dataForm.qrFromid = data.hotelorder.qrFromid;
              this.dataForm.orderInfo = data.hotelorder.orderInfo;
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
              `/hotel/hotelorder/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              sellerId: this.dataForm.sellerId,
              roomId: this.dataForm.roomId,
              userId: this.dataForm.userId,
              couponsId: this.dataForm.couponsId,
              orderNo: this.dataForm.orderNo,
              sellerName: this.dataForm.sellerName,
              sellerAddress: this.dataForm.sellerAddress,
              coordinates: this.dataForm.coordinates,
              arrivalTime: this.dataForm.arrivalTime,
              departureTime: this.dataForm.departureTime,
              ddTime: this.dataForm.ddTime,
              price: this.dataForm.price,
              num: this.dataForm.num,
              days: this.dataForm.days,
              roomType: this.dataForm.roomType,
              roomLogo: this.dataForm.roomLogo,
              bedType: this.dataForm.bedType,
              name: this.dataForm.name,
              tel: this.dataForm.tel,
              status: this.dataForm.status,
              outTradeNo: this.dataForm.outTradeNo,
              disCost: this.dataForm.disCost,
              yjCost: this.dataForm.yjCost,
              yhqCost: this.dataForm.yhqCost,
              yyzkCost: this.dataForm.yyzkCost,
              totalCost: this.dataForm.totalCost,
              enabled: this.dataForm.enabled,
              createTime: this.dataForm.createTime,
              retreatCost: this.dataForm.retreatCost,
              hbCost: this.dataForm.hbCost,
              hbId: this.dataForm.hbId,
              fromId: this.dataForm.fromId,
              classify: this.dataForm.classify,
              code: this.dataForm.code,
              jjTime: this.dataForm.jjTime,
              voice: this.dataForm.voice,
              qrFromid: this.dataForm.qrFromid,
              orderInfo: this.dataForm.orderInfo
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
