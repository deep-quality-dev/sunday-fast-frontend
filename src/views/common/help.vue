<template>
  <div class="about-page">
    <top-header>
      <div slot="nav-left">
        <img style="height: 44px;" src="../../assets/img/header_logo.jpg" alt="千兰">
      </div>
      <div slot="nav-right">
        <ul class="nav">
          <li index="0" @click="handleToPage('login')">首页</li>
          <li index="1" @click="handleToPage('about')">联系我们</li>
          <li index="3" @click="handleToPage('help')">帮助文档</li>
        </ul>
      </div>
    </top-header>
    <div class="container">
      <section class="sec-help">
        <div class="titles">
          <h1>
            帮助中心
            <em></em>
          </h1>
          <h2>
            <font>Help</font>center
          </h2>
        </div>
      </section>
      <section class="main-container">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <aside class="aside-box">
                <div class="menu-item__box" v-for="item in menus" :key="item.id">
                  <div class="menu-item__title" @click="handleToggelMenu(item.id)">
                    <i class="el-icon-arrow-right"></i>
                    <span class="menu-txt">{{item.name}}</span>
                  </div>
                  <div
                    class="menu-item__dropdown"
                    v-if="item.children"
                    v-show="item.id === activeId"
                  >
                    <ul class="nav-box">
                      <li
                        class="nav-box__item"
                        v-for="child in item.children"
                        :key="child.id"
                        @click="handleContent(child)"
                      >
                        <span class="menu-txt">{{child.name}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <!-- <div class="main-content"> -->
              <div
                class="main-content"
                v-show="subActiveId === item.id"
                v-for="item in contents"
                :key="item.id"
                v-html="item.content"
              ></div>
              <!-- </div> -->
            </div>
          </el-col>
        </el-row>
      </section>
      <div class="bottom-session__body">
        <div class="flex-box__item">
          <div class="hd">微信小程序</div>
          <div class="bd">
            <img style="height: 144px;" src="../../assets/img/mapp.jpg">
          </div>
          <div class="ft">
            <p>搜索“千兰会小程序”或</p>
            <p>扫描的二维码</p>
          </div>
          <!-- <div class="ft">
                                    <div class="ft-flex__box">
                                        <el-button type="primary">安卓下载</el-button>
                                        <el-button type="info">ios下载</el-button>
                                    </div>
          </div>-->
        </div>
        <div class="flex-box__item">
          <div class="hd">微信公众平台</div>
          <div class="bd">
            <img style="height: 144px;" src="../../assets/img/wx-mp.jpg">
          </div>
          <div class="ft">
            <p>搜索“千兰会公众号”或</p>
            <p>扫描的二维码</p>
          </div>
        </div>
        <div class="flex-box__item">
          <div class="hd color-bg__blue">服务热线：{{sysData.companyPhone}}</div>
          <div class="flex-box__server">
            <div class="item">
              <p>商家名称</p>
              <a type="primary">{{sysData.companyName}}</a>
            </div>
            <div class="item">
              <p>联系地址</p>
              <a type="primary">{{sysData.companyAddress}}</a>
            </div>
            <div class="item">
              <p>传真</p>
              <a type="primary">{{sysData.companyPhone}}</a>
            </div>
            <div class="item">
              <p>商服邮箱</p>
              <a type="primary">{{sysData.companyEmail}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { treeDataTranslate } from "@/utils";
import Footer from "./footer";
export default {
  data() {
    return {
      activeId: "",
      subActiveId: "",
      menus: [],
      contents: [],
      sysData: {}
    };
  },
  components: {
    Footer
  },
  created() {
    this.getDataList();
    this.getSysData();
  },
  methods: {
    getDataList() {
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelhelepmenu/helpMenus"),
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          let menu = treeDataTranslate(data.data, "id", "pid");
          menu.map(item => {
            this.menus.push({
              name: item.name,
              id: item.id,
              children: item.children.map(child => {
                return {
                  name: child.name,
                  id: item.id + "-" + child.id
                };
              })
            });
          });
          menu.map(item => {
            item.children.map(child => {
              this.contents.push({
                id: item.id + "-" + child.id,
                content: child.content
              });
            });
          });
          this.activeId = menu[0].id;
          this.subActiveId = this.contents[0].id;
          console.log(this.contents);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    handleToPage(name) {
      this.$router.push({ name });
    },
    handleToggelMenu(id) {
      if (this.activeId === id) {
        this.activeId = "";
        return;
      }
      this.activeId = id;
    },
    handleContent(item) {
      console.log(item);
      const { id } = item;
      if (this.subActiveId === id) {
        return;
      }
      // 在这里做切换显示隐藏或者发起网络请求获取对应接口数据
      this.handleShowCOntent(id);
    },

    handleShowCOntent(id) {
      this.subActiveId = id;
      // or request
    },
    getSysData() {
      this.$http({
        url: this.$http.adornUrl("/hotel/hotelsystem/info"),
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.sysData = data.hotelSystem;
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.sec-help {
  overflow: hidden;
  .titles {
    width: 100%;
    float: left;
    text-align: center;
    margin: 40px 0px 20px 0px;
    h1 {
      font-size: 26px;
      color: #777;
      border-bottom: #ddd solid 2px;
      width: 400px;
      margin: 0 auto;
      padding-bottom: 10px;
      font-weight: lighter;
      position: relative;
      em {
        display: block;
        width: 120px;
        height: 4px;
        position: absolute;
        left: 140px;
        bottom: -3px;
        background: #00b0ed;
      }
    }
    h2 {
      font-size: 20px;
      width: 400px;
      margin: 0 auto;
      color: #999;
      font-weight: lighter;
      padding-top: 5px;
      font {
        color: #00b0ed;
      }
    }
  }
}
.bottom-session__body {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 20px 0;
  .flex-box__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;

    .bd {
      margin: 15px 0;
      border: 1px solid #eeeeee;
      padding: 8px;
    }

    &:not(:first-child) {
      border-left: 1px solid #eeeeee;
    }

    .ft {
      text-align: center;
    }

    .color-bg__blue {
      width: 85%;
      margin: 0 auto;
      margin-bottom: 15px;
      height: 40px;
      border-left: 1px solid #ddd;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
      text-align: center;
      background-color: #288fe7;
    }

    .flex-box__server {
      width: 85%;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 50%;
      }
    }
  }
}
.main-container {
  width: 1200px;
  margin: 60px auto;

  .main-content {
    color: #ffffff;
    margin-left: 30px;
    min-height: 300px;
    border-radius: 20px;
    padding: 40px 20px;
    background-color: #03afeb;
  }

  .aside-box {
    background-color: #03afeb;
    .menu-item__box {
      .menu-item__title {
        cursor: pointer;
        padding: 0 20px;
        color: #ffffff;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #ffffff;
      }
      .menu-txt {
        margin-left: 8px;
      }

      .nav-box {
        list-style: none;
        padding: 0;
        margin: 0;
        &__item {
          cursor: pointer;
          list-style: none;
          height: 40px;
          display: flex;
          align-items: center;
          padding: 0 25px;
          color: #ffffff;
          background-color: rgba(163, 163, 163, 1);
          transition: background-color ease-in 0.1s;

          &:not(:last-of-type) {
            border-bottom: 1px solid #ffffff;
          }
          &.active {
            background-color: rgba(188, 188, 188, 1);
          }
          &:hover {
            background-color: rgba(188, 188, 188, 1);
          }
        }
      }
    }
  }
}
</style>