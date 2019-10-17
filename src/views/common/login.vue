<template>
    <div class="login-page">
        <top-header>
            <div slot="nav-left">
                <img src="../../assets/img/logo.png" alt="千兰" />
            </div>
            <div slot="nav-right">
                <ul class="nav">
                    <li index="1" @click="handleToPage">联系我们</li>
                    <li index="3" @click="handleToPage">帮助文档</li>
                </ul>
            </div>
        </top-header>
        <div class="login-page__container">
            <!-- carousel -->
            <div class="carousel-container">
                <el-carousel height="480px">
                    <el-carousel-item v-for="item in banners" :key="item.url">
                        <div>
                            <img :src="item.url" />-
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
                                >管理员登录</div>
                                <div
                                    class="item"
                                    :class="{'active':loginType === '2'}"
                                    @click="handleChangeLoginType('2')"
                                >商户登录</div>
                            </div>
                            <div class="longi-mina__form">
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
                                            placeholder="密码"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item prop="captcha">
                                        <el-row :gutter="20">
                                            <el-col :span="14">
                                                <el-input
                                                    v-model="dataForm.captcha"
                                                    placeholder="验证码"
                                                ></el-input>
                                            </el-col>
                                            <el-col :span="10" class="login-captcha">
                                                <img :src="captchaPath" @click="getCaptcha()" alt />
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
                                <router-link :to="{ path: 'apply' }">商家入驻 ></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="login-page__content">
                <div class="container content-card__container">
                    <div class="bottom-session">
                        <div class="bottom-session__header"></div>
                        <div class="bottom-session__body">
                            <div class="flex-box__item">
                                <div class="hd">手机APP下载安装</div>
                                <div class="bd">
                                    <img src="https://pic.c-ctrip.com/ebooking/web/qrcode_wx.png" />
                                </div>
                                <div class="ft">
                                    <div class="ft-flex__box">
                                        <el-button type="primary">安卓下载</el-button>
                                        <el-button type="info">ios下载</el-button>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-box__item">
                                <div class="hd">微信公众平台</div>
                                <div class="bd">
                                    <img src="https://pic.c-ctrip.com/ebooking/web/qrcode_wx.png" />
                                </div>
                                <div class="ft">
                                    <p>搜索“携程酒店管理系统”或</p>
                                    <p>扫描的二维码</p>
                                </div>
                            </div>
                            <div class="flex-box__item">
                                <div class="hd color-bg__blue">服务热线：021-52298888</div>
                                <div class="flex-box__server">
                                    <div class="item">
                                        <p>商服邮箱</p>
                                        <a
                                            type="primary"
                                            href="mailto:ebooking@ctrip.com"
                                        >ebooking@ctrip.com</a>
                                    </div>
                                    <div class="item">
                                        <p>商服邮箱</p>
                                        <a
                                            type="primary"
                                            href="mailto:ebooking@ctrip.com"
                                        >ebooking@ctrip.com</a>
                                    </div>
                                    <div class="item">
                                        <p>商服邮箱</p>
                                        <a
                                            type="primary"
                                            href="mailto:ebooking@ctrip.com"
                                        >ebooking@ctrip.com</a>
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
            <footer class="footer-container">
                <p class="popyright">
                    啦啦啦啦啦 版权所有 2002-2019 保留所有权利
                    <br />Copyright 2002-2019
                    my.com All rights reserved
                </p>
            </footer>
        </div>
    </div>
</template>

<script>
import { getUUID } from "@/utils";
export default {
    data() {
        return {
            loginType: "1",
            banners: [
                {
                    url:
                        "https://Images4.c-ctrip.com/target/270r1800000154d4x9A04.jpg"
                },
                {
                    url:
                        "https://Images4.c-ctrip.com/target/27080y000000mgdpu49A1.jpg"
                },
                {
                    url:
                        "https://Images4.c-ctrip.com/target/270c1900000166ottFE7F.jpg"
                },
                {
                    url:
                        "https://Images4.c-ctrip.com/target/270j16000000ysri7F5A9.png"
                }
            ],
            dataForm: {
                userName: "",
                password: "",
                uuid: "",
                captcha: ""
            },
            dataRule: {
                userName: [
                    { required: true, message: "帐号不能为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ],
                captcha: [
                    {
                        required: true,
                        message: "验证码不能为空",
                        trigger: "blur"
                    }
                ]
            },
            captchaPath: ""
        };
    },
    created() {
        this.getCaptcha();
    },
    methods: {
        handleToPage() {
            console.log("to page");
        },
        // 切换登陆方式
        handleChangeLoginType(type) {
            this.loginType = type;
        },
        // 提交表单
        dataFormSubmit() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.$http({
                        url: this.$http.adornUrl("/sys/login"),
                        method: "post",
                        data: this.$http.adornData({
                            username: this.dataForm.userName,
                            password: this.dataForm.password,
                            uuid: this.dataForm.uuid,
                            captcha: this.dataForm.captcha
                        })
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
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
        left: 50%;
        transform: translateX(-50%);
        background: transparent;
    }
    .login-container__box {
        position: absolute;
        width: 400px;
        height: 330px;
        z-index: 100;
        top: 25px;
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
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;

                    &.active {
                        color: #288fe7;
                        &::after {
                            content: "";
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 3px;
                            background-color: #288fe7;
                        }
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
                height: 55px;
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
    min-height: 120px;
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
</style>