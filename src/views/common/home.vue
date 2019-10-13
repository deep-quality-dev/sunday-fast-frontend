<template>
    <section v-if="userId && userId !== 1">
        <div class="mod-home dash-board" v-loading="dataListLoading"  element-loading-text="拼命加载中">
            <el-row>
                <div class="header header-ab">
                    <span class="tit">数据概况信息</span>
                </div>
                <el-col :span="6" class="md">
                    <div class="grid-content">
                        <el-row>
                            <el-col :span="12">
                                <div class="img-item">
                                    <img src="../../assets/img/xinxi1.png" alt="">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div>
                                    <span>{{data.todayOrderNum}}</span>
                                    <span>今日订单总数</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="6" class="md">
                    <div class="grid-content">
                        <el-row>
                            <el-col :span="12">
                                <div class="img-item">
                                    <img src="../../assets/img/xinxi2.png" alt="">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div>
                                    <span>{{data.todayMarketingAmount}}</span>
                                    <span>今日销售额</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="6" class="md">
                    <div class="grid-content">
                        <el-row>
                            <el-col :span="12">
                                <div class="img-item">
                                    <img src="../../assets/img/xinxi3.png" alt="">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div>
                                    <span>{{data.yesterdayMarketingAmount}}</span>
                                    <span>昨日销售额</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="6" class="md">
                    <div class="grid-content">
                        <el-row>
                            <el-col :span="12">
                                <div class="img-item">
                                    <img src="../../assets/img/xinxi4.png" alt="">
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div>
                                    <span>{{data.weekMarketingAmount}}</span>
                                    <span>近7天销售额</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" :gutter="20" justify="space-between">
                <el-col class="flex-item-r flex-item-r-2">
                    <div class="header header-bd">
                        <div>
                            <img class="avatar" src="../../assets/img/ygrz.png">
                            订单信息
                        </div>
                        <div>(单位：人)</div>
                    </div>
                    <div class="grid-content">
                        <el-row>
                            <el-col :span="6">
                                <div class="box-2">
                                    <span>{{data.statisticsOrder.checkInNum}}</span>
                                    <span>已入住</span>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box-2">
                                    <span>{{data.statisticsOrder.completeNum}}</span>
                                    <span>已完成</span>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box-2">
                                    <span>{{data.statisticsOrder.cancelNum}}</span>
                                    <span>已取消</span>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box-2">
                                    <span>{{data.statisticsOrder.refundNum}}</span>
                                    <span>已退款</span>
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
                                    <span>房间</span>
                                    <div class="holder-bd"></div>
                                    <span class="flex-span">
                                        <div>房间总数: {{data.roomTotal}}</div>
                                        <div>今日入住: {{data.checkInNum}}</div>
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
    </section>
    <section v-else>
        <dash-board></dash-board>
    </section>
</template>
<script>
import echarts from "echarts";
import DashBoard from "./dashboard";
export default {
  data() {
    return {
      data: {
        statisticsOrder: {
          cancelNum: 0,
          checkInNum:0,
          completeNum:0,
          refundNum:0,
          total:0
        },
        checkInNum: 0,
        roomTotal: 0,
        todayMarketingAmount: 0,
        todayOrderNum: 0,
        weekMarketingAmount: 0,
        yesterdayMarketingAmount: 0
      },
       dataListLoading: false
    };
  },
  components: {
    DashBoard
  },
  computed: {
    userId: {
      get() {
        return this.$store.state.user.id;
      },
      set(val) {
        this.$store.commit("user/updateId", val);
      }
    },
    userName: {
      get() {
        return this.$store.state.user.name;
      },
      set(val) {
        this.$store.commit("user/updateName", val);
      }
    }
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/hotel/statistics/seller"),
        method: "get"
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
.mod-home {
  .md {
    .grid-content {
      color: #fff;
      padding: 40px 0;
      border-radius: 5px;
      .img-item {
        text-align: center;
        img {
          width: 71px;
          height: 74px;
        }
      }
    }
    background: #fff;

    &:nth-child(2) {
      .grid-content {
        color: #fff;
        background-color: #32cc7f;
      }
    }
    &:nth-child(3) {
      .grid-content {
        color: #fff;
        background-color: #f17c67;
      }
    }
    &:nth-child(4) {
      .grid-content {
        color: #fff;
        background-color: #99cc33;
      }
    }
    &:nth-child(5) {
      .grid-content {
        color: #fff;
        background-color: #6c6fbf;
      }
    }
  }
}
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
    padding: 25px 10px;
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

