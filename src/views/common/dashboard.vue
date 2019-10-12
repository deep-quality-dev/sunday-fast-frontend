<template>
    <div class="dash-board" v-loading="dataListLoading">
        <!-- 第一行 start -->
        <el-row class="f-row">
            <div class="header header-ab">
                <span class="tit">今日收益</span>
                <el-form :inline="true" :model="dataForm" @keyup.enter.native="getData()">
                    <el-form-item>
                        <el-date-picker
                            v-model="dataForm.dates"
                            type="daterange"
                            align="right"
                            value-format="yyyy-MM-dd"
                            unlink-panels
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getData()">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-col :span="8" class="md md-1">
                <div class="grid-content">
                    <el-row>
                        <el-col :span="12">
                            <div class="img-item-box">
                                <img src="../../assets/img/xinxi2.png" alt="">
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div>
                                <span>酒店入驻</span>
                                <span>{{data.statisticsApply.total}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="holder"></div>
                    <el-row>
                        <el-col :span="8">
                            <div class="box-1 box-1-l">
                                <span>待审核数</span>
                                <span>{{data.statisticsApply.applyNum}}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="box-1 box-1-l">
                                <span>已通过数</span>
                                <span>{{data.statisticsApply.passNum}}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="box-1">
                                <span>已拒绝数</span>
                                <span>{{data.statisticsApply.refuseNum}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8" class="md">
                <div class="grid-content">
                    <el-row>
                        <el-col :span="12">
                            <div class="img-item-box">
                                <img src="../../assets/img/xinxi1.png" alt="">
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div>
                                <span>订单总数</span>
                                <span>{{data.statisticsOrder.total}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="holder"></div>
                    <el-row>
                        <el-col :span="6">
                            <div class="box-1 box-1-l">
                                <span>已取消数</span>
                                <span>{{data.statisticsOrder.cancelNum}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="box-1 box-1-l">
                                <span>已入住数</span>
                                <span>{{data.statisticsOrder.checkInNum}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="box-1">
                                <span>已完成数</span>
                                <span>{{data.statisticsOrder.completeNum}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="box-1">
                                <span>已退款数</span>
                                <span>{{data.statisticsOrder.refundNum}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8" class="md">
                <div class="grid-content">
                    <el-row>
                        <el-col :span="12">
                            <div class="img-item-box">
                                <img src="../../assets/img/cz.png" alt="">
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div>
                                <span>{{data.marketingAmount}}</span>
                                <span>销售额</span>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="holder holder-bt"></div>
                    <el-row>
                        <el-col :span="12">
                            <div class="box-1 img-item-box">
                                <img src="../../assets/img/tk.png" alt="">
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="box-1">
                                <span>{{data.refundAmount}}</span>
                                <span>新增退款</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <!-- 第二行 start -->
        <el-row type="flex" :gutter="20" justify="space-between">
            <el-col class="flex-item-r flex-item-r-2">
                <div class="header header-bd">
                    <div>
                        <img class="avatar" src="../../assets/img/ygrz.png">
                        会员信息
                    </div>
                    <div>(单位：人)</div>
                </div>
                <div class="grid-content">
                    <el-row>
                        <el-col :span="6">
                            <div class="box-2">
                                <span>{{data.statisticsMember.todayNum}}</span>
                                <span>今日新增</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="box-2">
                                <span>{{data.statisticsMember.yesterdayNum}}</span>
                                <span>昨日新增</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="box-2">
                                <span>{{data.statisticsMember.monthNum}}</span>
                                <span>本月新增</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="box-2">
                                <span>{{data.statisticsMember.total}}</span>
                                <span>会员总数</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col class="flex-item-r flex-item-r-2">
                <div class="header header-bd">
                    <div>
                        <img class="avatar" src="../../assets/img/6.png">
                        入住申请
                    </div>
                    <div>(单位：间)</div>
                </div>
                <div class="grid-content grid-content-pd">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="box-2 box-2-g">
                                <span>酒店</span>
                                <div class="holder-bd"></div>
                                <span class="flex-span">
                                    <div>新增: {{data.hotelCreateNum}}</div>
                                    <div>总数: {{data.hotelTotal}}</div>
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="box-2 box-2-g">
                                <span>订单</span>
                                <div class="holder-bd"></div>
                                <span class="flex-span">
                                    <div>有效订单: {{data.validOrderNum}}</div>
                                    <div>无效订单: {{data.invalidOrderNum}}</div>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <!-- 第三行 start -->
        <el-row type="flex" :gutter="10" justify="space-between">
            <el-col class="flex-item-r">
                <div class="grid-content grid-content-lg">
                    <el-row>
                        <el-col>
                            <div class="img-item-box">
                                <img src="../../assets/img/gkdata2.png" alt="">
                            </div>
                            <div>
                                <span>昨日销售额</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col class="flex-item-r">
                <div class="grid-content grid-content-lg">
                    <el-row>
                        <el-col>
                            <div class="img-item-box">
                                <img src="../../assets/img/gkdata1.png" alt="">
                            </div>
                            <div>
                                <span>昨日销售额</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col class="flex-item-r">
                <div class="grid-content grid-content-lg">
                    <el-row>
                        <el-col>
                            <div class="img-item-box">
                                <img src="../../assets/img/gkdata3.png" alt="">
                            </div>
                            <div>
                                <span>昨日销售额</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col class="flex-item-r">
                <div class="grid-content grid-content-lg">
                    <el-row>
                        <el-col>
                            <div class="img-item-box">
                                <img src="../../assets/img/gkdata4.png" alt="">
                            </div>
                            <div>
                                <span>昨日销售额</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col class="flex-item-r">
                <div class="grid-content grid-content-lg">
                    <el-row>
                        <el-col>
                            <div class="img-item-box">
                                <img src="../../assets/img/gkdata5.png" alt="">
                            </div>
                            <div>
                                <span>昨日销售额</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col class="flex-item-r">
                <div class="grid-content grid-content-lg">
                    <el-row>
                        <el-col>
                            <div class="img-item-box">
                                <img src="../../assets/img/gkdata6.png" alt="">
                            </div>
                            <div>
                                <span>昨日销售额</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col class="flex-item-r">
                <div class="grid-content grid-content-lg">
                    <el-row>
                        <el-col>
                            <div class="img-item-box">
                                <img src="../../assets/img/gkdata7.png" alt="">
                            </div>
                            <div>
                                <span>昨日销售额</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      dataForm: {
          dates:[moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")]
      },
      data: {
        hotelCreateNum: 0,
        hotelTotal: 0,
        invalidOrderNum: 0,
        marketingAmount: 0,
        refundAmount: 0,
        validOrderNum: 0,
        statisticsApply: {
          applyNum: 0,
          passNum: 0,
          refuseNum: 0,
          total: 0
        },
        statisticsMember: {
          monthNum: 0,
          todayNum: 0,
          total: 0,
          yesterdayNum: 0
        },
        statisticsOrder: {
          cancelNum: 0,
          checkInNum: 0,
          completeNum: 0,
          refundNum: 0,
          total: 0
        }
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dataListLoading: false
    };
  },
  name: "dash-board",
  props: {},
  computed: {},
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/statistics/platfrom"),
        method: "post",
        data: this.$http.adornData({
          dates:this.dataForm.dates,
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.data = data.data;
          console.log(this.data);
        } else {
        }
        this.dataListLoading = false;
      });
    }
  }
};
</script>
<style lang="scss">
.site-content {
  > .el-card {
    background: transparent;
    > .el-card__body {
      padding: 0;
    }
  }
}
.dash-board {
  .chart-box {
    min-height: 200px;
  }
  .quick-menu {
    margin-top: 30px;
    .grid-content {
      padding: 50px 0px;
      border: 1px solid #eee;
      text-align: center;
      img {
        margin-bottom: 10px;
      }
    }
  }
  .box-card {
    margin-top: 20px;
    padding: 10px;
    .order-card {
      min-height: 200px;
      padding: 80px 0 30px 0;
      span {
        display: block;
        text-align: center;
        padding: 10px 0;
      }
    }
  }
  .header {
    color: #999999;
    padding: 16px 20px;
    background-color: #fff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-ab {
      &::before {
        content: "";
        position: absolute;
        width: 3px;
        height: 1.2em;
        top: 50%;
        transform: translateY(-50%);
        background: lightskyblue;
      }
    }
    .tit {
      padding-left: 10px;
    }
    &-bd {
      padding: 16px 10px;
      &::after {
        content: "";
        position: absolute;
        width: 96%;
        height: 1px;
        left: 50%;
        top: 100%;
        transform: translateX(-50%);
        background: #eeeeee;
      }
    }
  }
  .md {
    .grid-content {
      color: #999999;
      padding: 20px 0;
      border-radius: 5px;
      background-color: #fff;
    }
    padding: 10px;
    box-sizing: border-box;
    span {
      display: block;
      padding: 5px 0;
      text-align: center;
    }
    .holder {
      height: 10px;
      margin-top: 10px;
      border-bottom: 1px solid #eeeeee;
      box-sizing: border-box;
      &-bt {
        border-top: 1px solid #eeeeee;
      }
    }
    .box-1 {
      margin-top: 20px;
      box-sizing: border-box;
      &-l {
        border-right: 1px solid #eeeeee;
      }
    }
  }
  .holder-bd {
    width: 50%;
    margin: 0 auto;
    box-sizing: border-box;
    border-bottom: 1px solid #d9d9d9;
  }
  .img-item-box {
    text-align: center;
    img {
      width: 41px;
      height: 44px;
    }
  }
  .flex-item-r {
    .grid-content {
      color: #999999;
      padding: 20px 0;
      border-radius: 5px;
      background-color: #fff;
      &-pd {
        padding: 20px;
      }
      &-lg {
        padding: 40px;
        .img-item-box {
          text-align: center;
          img {
            width: 31px;
            height: 34px;
          }
        }
      }
    }
    padding: 10px 0;
    span {
      display: block;
      padding: 5px 0;
      text-align: center;
    }
    &-2 {
      padding-top: 20px;
      span {
        display: block;
        padding: 10px 0;
        text-align: center;
      }
    }
  }
  .f-row {
    .md {
      .grid-content {
        color: #999999;
        padding: 20px 0;
        border-radius: 5px;
        border: 1px solid #eeeeee;
        background-color: #fff;
      }
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;
      span {
        display: block;
        padding: 5px 0;
        text-align: center;
      }
      &-1 {
        padding-left: 20px;
      }
      &:last-child {
        padding-right: 20px;
      }
    }
  }
  .box-2 {
    padding: 30px 0;
    box-sizing: border-box;

    &-g {
      background-color: #f2f2f2;
    }
  }
  span.flex-span {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .avatar {
    display: inline-block;
    width: 24px;
    height: 24px;
  }
}
</style>