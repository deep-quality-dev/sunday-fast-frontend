<template>
  <div class="mod-home">
    <el-row>
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
                <span>0</span>
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
                <span>0</span>
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
                <span>0</span>
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
                <span>0</span>
                <span>近7天销售额</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单信息</span>
            <span style="float: right; padding: 3px 0">(单位：个)</span>
          </div>
          <el-row class="order-card">
            <el-col :span="6">
              <div class="grid-content">
                <span>0</span>
                <span>已入住</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>0</span>
                <span>已完成</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>0</span>
                <span>已取消</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>0</span>
                <span>已经退款</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>近一周数据总览</span>
          </div>
          <div id="J_chartLineBox" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="quick-menu">
      <el-col :span="3">
        <div class="grid-content">
          <img src="../../assets/img/gkdata1.png" alt="">
          <div>门店信息</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <img src="../../assets/img/gkdata2.png" alt="">
          <div>房型管理</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <img src="../../assets/img/gkdata3.png" alt="">
          <div>订单管理</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <img src="../../assets/img/gkdata4.png" alt="">
          <div>酒店维护</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <img src="../../assets/img/gkdata5.png" alt="">
          <div>优惠券管理</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <img src="../../assets/img/gkdata6.png" alt="">
          <div>评论管理</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <img src="../../assets/img/gkdata7.png" alt="">
          <div>打印设置</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content">
          <img src="../../assets/img/gkdata7.png" alt="">
          <div>门店信息</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chartLine: null
    };
  },
  mounted() {
    this.initChartLine();
  },
  activated() {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartLine) {
      this.chartLine.resize();
    }
  },
  methods: {
    // 折线图
    initChartLine() {
      var option = {
        title: {
          // text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单", "营业额", "新增会员"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "营业额",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "新增会员",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      };
      this.chartLine = echarts.init(document.getElementById("J_chartLineBox"));
      this.chartLine.setOption(option);
      window.addEventListener("resize", () => {
        this.chartLine.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.mod-home {
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
    padding: 10px;
    &:nth-child(1) {
      .grid-content {
        background-color: #32cc7f;
      }
    }
    &:nth-child(2) {
      .grid-content {
        background-color: #f17c67;
      }
    }
    &:nth-child(3) {
      .grid-content {
        background-color: #99cc33;
      }
    }
    &:nth-child(4) {
      .grid-content {
        background-color: #6c6fbf;
      }
    }
    span {
      display: block;
      padding: 5px 0;
      text-align: center;
    }
  }
}
</style>

