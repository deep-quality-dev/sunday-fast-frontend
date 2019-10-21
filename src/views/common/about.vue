<template>
    <div class="about-page">
        <top-header>
            <div slot="nav-left">
                <img src="../../assets/img/logo.png" alt="千兰" />
            </div>
            <div slot="nav-right">
                <ul class="nav">
                    <li index="1" @click="handleToPage('about')">联系我们</li>
                    <li index="3" @click="handleToPage('help')">帮助文档</li>
                </ul>
            </div>
        </top-header>
        <section class="main-container">
            <div class="main-content">
                <section class="contact-box">
                    <div class="tit">
                        <span>联系我们</span>
                    </div>
                    <div class="address">
                        <p class="pre">地址：湖南省长沙岳麓区麓谷大道627号新长海中心B3栋9A楼</p>
                        <p class="pre">客服热线：400-805-1300</p>
                        <p class="pre">传真：0731-82787948</p>
                        <p class="pre">QQ群咨询：284664459</p>
                        <p class="pre">邮箱：jc@85160.com</p>
                    </div>
                </section>
                <section class="feadback-box">
                    <div class="tit">
                        <span>留言板</span>
                    </div>
                    <div class="feadback-box__input">
                        <el-form
                            ref="form"
                            :label-position="labelPosition"
                            :model="form"
                            label-width="50px"
                        >
                            <el-form-item label="姓名">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input v-model="form.mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="留言">
                                <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 5, maxRows: 15}"
                                    v-model="form.desc"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleSubmit">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </section>
            </div>
            <el-amap v-show="loaded" class="map" :plugin="plugin" :center="center" :zoom="16"></el-amap>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            loaded: false,
            form: {
                name: "",
                mobile: "",
                desc: ""
            },
            labelPosition: "left",

            center: [114.05558, 22.539679],

            plugin: [
                {
                    pName: "Geolocation",
                    events: {
                        init(o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    self.lng = result.position.lng;
                                    self.lat = result.position.lat;
                                    self.center = [self.lng, self.lat];
                                    setTimeout(() => {
                                        self.loaded = true;
                                    }, 800)
                                    self.$nextTick();
                                }
                            });
                        }
                    }
                }
            ]
        };
    },
    methods: {
        handleSubmit() {},
        handleToPage(name) {
            this.$router.push({ name });
        }
    }
};
</script>

<style lang="scss" scoped>
.main-container {
    width: 100%;
    position: relative;
    min-height: calc(100vh - 60px);

    .map {
        height: calc(100vh - 60px);
    }

    .main-content {
        width: 480px;
        height: 100%;
        position: absolute;
        overflow-y: auto;
        right: 100px;
        padding: 20px 40px;
        z-index: 1000;
        background-color: #fff;
    }
    .contact-box {
        .tit {
            color: #999999;
            font-size: 18px;
            width: 150px;
            padding-bottom: 20px;
            border-bottom: 1px solid #999999;
        }
        .address {
            .pre {
                font-size: 14px;
                color: #999999;
                line-height: 1.2;
            }
        }
    }
    .feadback-box {
        margin-top: 70px;
        .tit {
            color: #999999;
            font-size: 18px;
            width: 150px;
            padding-bottom: 20px;
            border-bottom: 1px solid #999999;
        }
        .feadback-box__input {
            margin-top: 30px;
        }
    }
}
</style>