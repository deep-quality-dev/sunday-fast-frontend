<template>
  <div class="login-page">
    <top-header>
      <div slot="nav-left">
        <img style="height: 44px;" src="../../assets/img/header_logo.jpg" alt="千兰">
      </div>
      <div slot="nav-right">
        <ul class="nav">
          <li index="1" @click="handleToPage('about')">联系我们</li>
          <li index="3" @click="handleToPage('help')">帮助文档</li>
        </ul>
      </div>
    </top-header>
    <div class="login-page__container">
      <!-- carousel -->
      <div class="carousel-container">
        <el-carousel height="480px">
          <el-carousel-item v-for="item in banners" :key="item.url">
            <div>
              <img :src="item.url">-
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="container login-container__session">
          <div class="login-container__box">
            <div class="login-main">
              <div class="login-mian__title">
                <div
                  class="item"
                  :class="{'active':loginType === '1'}"
                  @click="handleChangeLoginType('1')"
                >{{ status === 0 ? '管理员登录' : '找回密码' }}</div>
                <!-- <div
                                    class="item"
                                    :class="{'active':loginType === '2'}"
                                    @click="handleChangeLoginType('2')"
                >商户登录</div>-->
              </div>
              <div class="longi-mina__form">
                <template v-if="status === 0">
                  <el-form
                    :model="dataForm"
                    :rules="dataRule"
                    ref="dataForm"
                    @keyup.enter.native="dataFormSubmit()"
                    status-icon
                  >
                    <el-form-item prop="userName">
                      <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        prefix-icon="el-icon-lock"
                        type="password"
                        v-model="dataForm.password"
                        placeholder="密码"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                      <el-row :gutter="20">
                        <el-col :span="14">
                          <el-input v-model="dataForm.captcha" placeholder="验证码"></el-input>
                        </el-col>
                        <el-col :span="10" class="login-captcha">
                          <img :src="captchaPath" @click="getCaptcha()" alt="">
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        class="login-btn-submit"
                        type="primary"
                        @click="dataFormSubmit()"
                      >登录</el-button>
                    </el-form-item>
                  </el-form>
                  <el-row type="flex" justify="space-between">
                    <el-col>
                      <router-link :to="{ path: 'apply' }">商家入驻 ></router-link>
                    </el-col>
                    <el-col class="action">
                      <el-checkbox v-model="memory">
                        <a>记住我</a>
                      </el-checkbox>
                      <a class="find" @click="status = 1">忘记密码</a>
                    </el-col>
                  </el-row>
                </template>
                <template v-if="status === 1">
                  <el-form
                    :model="findForm"
                    :rules="findRule"
                    ref="findForm"
                    @keyup.enter.native="findFormSubmit"
                    status-icon
                  >
                    <el-form-item prop="mobile">
                      <el-input v-model="findForm.mobile" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                      <el-row :gutter="20">
                        <el-col :span="14">
                          <el-input v-model="findForm.captcha" placeholder="验证码"></el-input>
                        </el-col>
                        <el-col :span="10" class="login-captcha">
                          <img :src="captchaPath" @click="getCaptcha()" alt="">
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item prop="code">
                      <el-input v-model="findForm.code" placeholder="请输入验证码">
                        <template slot="append">
                          <el-button
                            :disabled="codeCount > 0 || !findForm.captcha"
                            @click="send"
                          >{{ codeCount !== 0 ? codeCount + '秒' : '发送验证码' }}</el-button>
                        </template>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="newPassword">
                      <el-input
                        prefix-icon="el-icon-lock"
                        type="password"
                        v-model="findForm.newPassword"
                        placeholder="新密码"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        class="login-btn-submit"
                        type="primary"
                        @click="findFormSubmit"
                      >立即找回</el-button>
                    </el-form-item>
                  </el-form>
                  <el-row type="flex" justify="space-between">
                    <el-col>
                      <router-link :to="{ path: 'apply' }">商家入驻 ></router-link>
                    </el-col>
                    <el-col class="action">
                      <a class="find" @click="status = 0">立即登录</a>
                    </el-col>
                  </el-row>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="login-page__content">
        <div class="container content-card__container">
          <div class="bottom-session">
            <div class="bottom-session__header">
              <div>
                <img style="width:100%" src="../../assets/img/log_header_img.jpeg" alt="">
              </div>
            </div>
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
                <div class="hd color-bg__blue">服务热线：021-52298888</div>
                <div class="flex-box__server">
                  <div class="item">
                    <p>商服邮箱</p>
                    <a type="primary" href="mailto:ebooking@ctrip.com">ebooking@ctrip.com</a>
                  </div>
                  <div class="item">
                    <p>商服邮箱</p>
                    <a type="primary" href="mailto:ebooking@ctrip.com">ebooking@ctrip.com</a>
                  </div>
                  <div class="item">
                    <p>商服邮箱</p>
                    <a type="primary" href="mailto:ebooking@ctrip.com">ebooking@ctrip.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container bootom-card__container">
          <div class="item border"></div>
          <div class="item text">我是有底线的</div>
          <div class="item border"></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from "./footer";
import { getUUID } from "@/utils";
import axios from "axios";

export default {
  data() {
    return {
      loginType: "1",
      banners: [],
      dataForm: {
        userName: this.$cookie.get("USER_NAME") || "",
        password: this.$cookie.get("USER_PASSWORD") || "",
        uuid: "",
        captcha: ""
      },
      dataRule: {
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "不能为空", trigger: "blur" }],
        captcha: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ]
      },
      findForm: {
        mobile: "",
        code: "",
        password: ""
      },
      findRule: {
        mobile: [{ required: true, message: "不能为空", trigger: "blur" }],
        code: [{ required: true, message: "不能为空", trigger: "blur" }],
        captcha: [{ required: true, message: "不能为空", trigger: "blur" }],
        newPassword: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      captchaPath: "",
      memory: true,
      status: 0, //0是登录 1是找回
      codeCount: 0 //验证码倒计时
    };
  },
  components: {
    Footer
  },
  watch: {
    status: function(value) {
      this.getCaptcha();
    }
  },
  created() {
    this.getCaptcha();
    this.getBannerData();
  },
  methods: {
    handleToPage(name) {
      this.$router.push({ name });
    },
    getBannerData() {
      this.$http({
        url: this.$http.adornUrl("/hotel/adv/loadByType?type=2"),
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          data.data.map(item => {
            this.banners.push({
              url: item.logo
            });
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 切换登陆方式
    handleChangeLoginType(type) {
      this.loginType = type;
    },
    // 提交表单
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const { userName, password } = this.dataForm;

          this.$http({
            url: this.$http.adornUrl("/sys/login"),
            method: "post",
            data: this.$http.adornData({
              username: userName,
              password,
              uuid: this.dataForm.uuid,
              captcha: this.dataForm.captcha
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              if (this.memory) {
                this.$cookie.set("USER_NAME", userName);
                this.$cookie.set("USER_PASSWORD", password);
              }
              this.$cookie.set("token", data.token);
              this.$router.replace({ name: "home" });
            } else {
              this.getCaptcha();
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    // 获取验证码
    getCaptcha() {
      this.dataForm.uuid = getUUID();
      this.captchaPath = this.$http.adornUrl(
        `/captcha.jpg?uuid=${this.dataForm.uuid}`
      );
    },
    // 找回密码表单
    findFormSubmit() {
      this.getCaptcha();
      this.$refs["findForm"].validate(valid => {
        if (!valid) {
          return;
        }
        const { mobile, code, newPassword } = this.findForm;
        const { uuid, captcha } = this.dataForm;
        console.log(mobile);
        console.log(code);
        console.log(newPassword);
        this.$http({
          url: this.$http.adornUrl("/sys/user/findPwd"),
          method: "post",
          data: this.$http.adornData({
            mobile,
            code,
            newPassword
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "密码设置成功",
              type: "success"
            });
            this.$refs["findForm"].resetFields();
            this.status = 0;
          } else {
            this.getCaptcha();
            this.$message.error(data.msg);
          }
        });
      });
    },
    // 发送验证码
    send() {
      const { mobile, captcha } = this.findForm;
      const { uuid } = this.dataForm;
      if (!mobile) {
        return this.$message({
          type: "error",
          message: "请输入手机号码"
        });
      }
      if (mobile.length !== 11) {
        return this.$message({
          type: "error",
          message: "手机号码输入有误"
        });
      }

      this.$http({
        url: this.$http.adornUrl("/hotel/common/smsCode"),
        method: "get",
        params: this.$http.adornParams({
          mobile: mobile,
          uuid: uuid,
          captchaCode: captcha
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "发送成功",
            type: "success"
          });

          let timer = null;
          this.codeCount = 60;
          this.$nextTick(() => {
            timer = setInterval(() => {
              if (this.codeCount === 0) {
                return clearInterval(timer);
              }
              this.codeCount = this.codeCount - 1;
            }, 1000);
          });
        } else {
          this.$message.error(data.msg);
          this.getCaptcha();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page__container {
  width: 100%;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.carousel-container {
  position: relative;
  .login-container__session {
    position: absolute;
    // width: 1200px;
    z-index: 100;
    height: 100%;
    top: 0;
    left: 60%;
    transform: translateX(-50%);
    background: transparent;
  }
  .login-container__box {
    position: absolute;
    width: 400px;
    //height: 330px;
    z-index: 100;
    top: 75px;
    right: 0;
    padding: 5px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.7);

    .login-main {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      // background-color: #ffffff;

      .login-mian__title {
        width: 80%;
        margin: 0 auto;
        font-size: 18px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        color: rgba(255, 255, 255, 0.6);
        .item {
          padding: 18px 0;
          flex: 1;
          max-width: 50%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          position: relative;

          &.active {
            // color: #288fe7;
            // &::after {
            //   content: "";
            //   position: absolute;
            //   bottom: 0;
            //   left: 0;
            //   width: 100%;
            //   height: 3px;
            //   background-color: #288fe7;
            // }
          }
        }
      }

      .longi-mina__form {
        width: 80%;
        margin: 0 auto;
      }

      .login-captcha {
        img {
          max-width: 100%;
        }
      }

      .login-btn-submit {
        width: 100%;
      }
    }
  }
}
.login-page__content {
  padding: 20px 0;
  box-sizing: border-box;
  width: 100%;
  background-color: #f2f2f2;

  .content-card__container {
    min-height: 300px;
    margin: 0 auto;
    background-color: #ffffff;

    .bottom-session {
      width: 100%;
      .bottom-session__header {
        // height: 55px;
        width: 100%;
        border-bottom: 1px solid #eeeeee;
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
    }
  }

  .bootom-card__container {
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .border {
      height: 1px;
      flex: 1;
      background-color: #dddddd;
    }

    .text {
      margin: 0 30px;
    }
  }
}

.footer-container {
  width: 100%;
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  .popyright {
    color: #999999;
  }
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  font-size: 14px;

  li {
    cursor: pointer;
    min-width: 50px;
    padding: 0 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    &:first-child {
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}

.action {
  text-align: right;

  .find {
    cursor: pointer;
    margin-left: 6px;
  }
}
</style>
