<template>
    <div>
        <top-header>
            <div slot="nav-left">
              <a href="/">
                    <img style="height: 44px;" src="../../assets/img/header_logo.jpg" alt="千兰">
                </a>
            </div>
        </top-header>
        <div class="container">
            <el-steps class="steps" :active="active" finish-status="success">
                <el-step title="酒店信息" />
                <el-step title="证件信息" />
                <el-step title="提交成功" />
            </el-steps>

            <el-form
                v-show="active === 0"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="auto"
                class="form"
            >
                <el-form-item label="酒店名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入完整的酒店名称" />
                </el-form-item>

                <el-form-item label="酒店电话" prop="tel">
                    <el-input v-model="ruleForm.tel" placeholder="输入座机号或者手机号" />
                </el-form-item>

                 <el-form-item label="酒店联系人" prop="linkName">
                    <el-input v-model="ruleForm.linkName" placeholder="输入酒店联系人" />
                </el-form-item>

                 <el-form-item label="酒店联系人电话" prop="linkTel">
                    <el-input v-model="ruleForm.linkTel" placeholder="输入酒店联系人电话" />
                </el-form-item>

                <el-form-item label="酒店地址" prop="address">
                    <span>{{ ruleForm.address }}</span>
                    <el-button @click="showMap = true" type="primary">编辑地址/定位</el-button>
                </el-form-item>

                <el-form-item label="酒店星级" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                         <el-radio label="1" name="type" >一星及以下/经济</el-radio>
                        <el-radio label="2" name="type" >二星/实惠</el-radio>
                        <el-radio label="3" name="type" >三星/舒适</el-radio>
                        <el-radio label="4" name="type" >四星/高档</el-radio>
                        <el-radio label="5" name="type" >五星/豪华</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="客房总数" prop="roomCount">
                    <el-input-number v-model="ruleForm.roomCount" :min="1" />
                </el-form-item>

                <el-form-item label="集团品牌" prop="brand">
                    <!-- <el-select v-model="ruleForm.brand" placeholder="选择品牌">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>-->
                    <el-cascader
                        :options="options"
                        :props="props"
                        v-model="ruleForm.brand"
                    >
                    </el-cascader>
                </el-form-item>

                <el-form-item label="酒店介绍" prop="desc">
                    <el-input
                        type="textarea"
                        v-model="ruleForm.desc"
                        placeholder="填写规则：简介中需包含酒店的地理位置、周边信息，店内设施、客房等信息。确保语句通顺、无错别字、段首无空格、不提及星级、无敏感字眼，字数50以上，400以下"
                    />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="step1Submit">下一步，填写证件类型</el-button>
                </el-form-item>
            </el-form>

            <el-form
                v-show="active === 1"
                :model="ruleForm1"
                :rules="rules1"
                ref="ruleForm1"
                label-width="150px"
                class="form"
            >
                <h2>
                  <span>个人证件</span>
                  <span class="strong">(*必填)</span>
                  <el-tag>需与酒店联系人保持一致</el-tag>
                </h2>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm1.name" placeholder="请输入身份证姓名" />
                </el-form-item>

                <el-form-item label="身份证号" prop="idCard">
                    <el-input v-model="ruleForm1.idCard" placeholder="输入身份证号" />
                </el-form-item>

                <el-form-item label="身份证照(正面)" prop="idCardPicList">
                    <el-upload
                        :action="this.$http.adornUrl('/hotel/common/upload')"
                        list-type="picture-card"
                        :on-remove="onIdCardPicListFileChange.bind(null, 0)"
                        :on-change="onIdCardPicListFileChange.bind(null, 0)"
                        :on-exceed="onExceed"
                        :limit="1"
                    >
                        <i class="el-icon-plus" />
                    </el-upload>
                </el-form-item>

              <el-form-item label="身份证照(反面)" prop="idCardPicList">
                <el-upload
                  :action="this.$http.adornUrl('/hotel/common/upload')"
                  list-type="picture-card"
                  :on-remove="onIdCardPicListFileChange.bind(null, 1)"
                  :on-change="onIdCardPicListFileChange.bind(null, 1)"
                  :on-exceed="onExceed"
                  :limit="1"
                >
                  <i class="el-icon-plus" />
                </el-upload>
              </el-form-item>

              <el-form-item label="身份证照(手持)" prop="idCardPicList">
                <el-upload
                  :action="this.$http.adornUrl('/hotel/common/upload')"
                  list-type="picture-card"
                  :on-remove="onIdCardPicListFileChange.bind(null, 2)"
                  :on-change="onIdCardPicListFileChange.bind(null, 2)"
                  :on-exceed="onExceed"
                  :limit="1"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <a @click="showTips = true">详情要求</a>
              </el-form-item>

                <h2>
                  <span>营业执照</span>
                  <span class="strong">(*必填)</span>
                </h2>
                <!-- <el-form-item label="企业名称" prop="companyName">
                    <el-input v-model="ruleForm1.companyName" placeholder="请输入企业名称" />
                </el-form-item>-->

                <el-form-item label="企业法人" prop="companyPerson">
                    <el-input v-model="ruleForm1.companyPerson" placeholder="请输入企业法人" />
                </el-form-item>

                <el-form-item label="经营场所" prop="companyAddress">
                    <el-input v-model="ruleForm1.companyAddress" placeholder="请输入经营场所" />
                </el-form-item>

                <!-- <el-form-item label="经营范围" prop="companyScope">
                    <el-input v-model="ruleForm1.companyScope" placeholder="请输入经营范围" />
                </el-form-item>-->

                <!-- <el-form-item label="类型" prop="companyType">
                    <el-input v-model="ruleForm1.companyType" placeholder="请输入类型" />
                </el-form-item>-->

                <el-form-item label="注册号" prop="companyNumber">
                    <el-input v-model="ruleForm1.companyNumber" placeholder="请输入注册号" />
                </el-form-item>

                <el-form-item label="有效期" prop="companyTime">
                    <el-radio-group v-model="ruleForm1.companyTime">
                        <el-radio label="长期有效" name="companyTime" />
                        <el-radio label="截至至今" name="companyTime" />
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="营业执照" prop="companyIdCardPic">
                    <el-upload
                        :action="this.$http.adornUrl('/hotel/common/upload')"
                        list-type="picture-card"
                        :on-remove="onCompanyIdCardPicFileChange"
                        :on-change="onCompanyIdCardPicFileChange"
                        :on-exceed="onExceed"
                        :limit="1"
                    >
                        <i class="el-icon-plus" />
                    </el-upload>
                </el-form-item>

                <el-row type="flex">
                    <el-form-item>
                        <el-button @click="active=0">上一步</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="step2Submit">提交</el-button>
                    </el-form-item>
                </el-row>
            </el-form>

            <div style="text-align: center">
                <el-button type="primary" v-show="active === 2">提交成功 等待审核吧</el-button>
            </div>

            <el-dialog :visible.sync="showMap" title="搜索后选择地址">
                <div class="map-wrap">
                    <el-amap-search-box
                        class="map-search"
                        :on-search-result="onSearchResult"
                        :searchOption="{}"
                    />
                    <el-amap class="map" :center="mapCenter" :zoom="16">
                        <el-amap-marker
                            v-for="(marker, index) in markers"
                            :key="index"
                            :position="marker"
                            :events="getMarkerEvents()"
                        />
                    </el-amap>
                </div>
            </el-dialog>


            <el-dialog :visible.sync="showTips" title="手持身份证拍照要求">
              <img src="../../assets/img/idCardSuccess.jpg" />
              <img src="../../assets/img/idCardError.jpg" />
              <ul>
                <li>免冠，建议未化妆，五关可见;</li>
                <li>身份证全部信息清晰无遮挡，否则将无法通过认证;</li>
                <li>完整露出手臂;</li>
                <li>以酒店门头招牌为背景图片;</li>
                <li>请勿进行任何软件处理;</li>
                <li>单张图片不超过5M，尺寸要求500（长）X412（宽）以上，支持jpg、png、gif;</li>
              </ul>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => {
        return {
            active: 1,
            options: [{}],
            props: {
                label: 'name',
                value: "id",
                children: "brands"
            },
            ruleForm: {
                name: "",
                tel: "",
                linkName:"",
                linkTel:"",
                address: "",
                type: "1",
                roomCount: 1,
                brand: "",
                desc: "",
                lat: "",
                lng: ""
            },
            rules: {
                name: [{ required: true, message: "请输入酒店名称" }],
                tel: [{ required: true, message: "请输入酒店电话" }],
                linkName: [{ required: true, message: "请输入酒店联系人" }],
                linkTel: [{ required: true, message: "请输入酒店联系人电话" }],
                address: [{ required: true, message: "请选择酒店地址" }],
                type: [{ required: true, message: "请输入酒店类型" }],
                roomCount: [{ required: true, message: "请输入客房总数" }],
                desc: [
                    { required: true, message: "请输入酒店介绍" },
                    {
                        validator: (rule, value, callback) => {
                            if (value.length < 20 || value.length > 400) {
                                return callback(
                                    new Error("酒店介绍字数必须20以上，400以下")
                                );
                            }
                            return callback();
                        }
                    }
                ]
            },
            ruleForm1: {
                name: "",
                idCard: "",
                idCardPicList: [],
                idCardPic: "",
                companyName: "",
                companyPerson: "",
                companyAddress: "",
                companyScope: "",
                companyType: "",
                companyNumber: "",
                companyTime: "长期有效",
                companyIdCardPic: []
            },
            rules1: {
                name: [{ required: true, message: "请输入姓名" }],
                idCard: [{ required: true, message: "请输入身份证号" }],
                idCardPicList: [
                    { required: true, message: "请上传身份证照片" }
                ],
                // idCardPic: [
                //     { required: true, message: "请上传手持身份证照片" }
                // ],
                // companyName: [{ required: true, message: "请输入企业名称" }],
                companyPerson: [{ required: true, message: "请输入企业法人" }],
                companyAddress: [
                    { required: true, message: "请输入企业经营场所" }
                ],
                // companyScope: [
                //     { required: true, message: "请输入企业经营范围" }
                // ],
                // companyType: [{ required: true, message: "请输入企业类型" }],
                companyNumber: [
                    { required: true, message: "请输入企业注册号" }
                ],
                companyTime: [{ required: true, message: "请选择企业有效期" }],
                companyIdCardPic: [
                    { required: true, message: "请上传企业营业执照" }
                ]
            },
            markers: [],
            mapCenter: [114.05558, 22.539679],
            showMap: false,
            showTips: false
        };
    },
    created() {
        console.log(this.$cookie.get("token"));
    },

    mounted() {
        this.fetchhotelBrands();
    },

    methods: {
        fetchhotelBrands() {
            this.$http({
                url: this.$http.adornUrl("/hotel/seller/hotelBrands"),
                method: "get"
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.options = data.data
                }
                console.log(data);
            });
        },

        step1Submit() {
            this.$refs.ruleForm.validate(valid => {
                if (!valid) {
                    return false;
                }
                this.active = 1;
            });
        },
        step2Submit() {
            this.$refs.ruleForm1.validate(valid => {
                if (!valid) {
                    return false;
                }
                this.active = 2;
                this.$http({
                    url: this.$http.adornUrl("/hotel/seller/sellerApply"),
                    method: "post",
                    data: this.$http.adornData({
                        ...this.ruleForm,
                        ...this.ruleForm1
                    })
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.active = 2;
                    } else {
                        this.active = 2;
                    }
                });
            });
        },
        onSearchResult(pois) {
            let latSum = 0;
            let lngSum = 0;

            pois.forEach(poi => {
                let { lng, lat } = poi;
                lngSum += lng;
                latSum += lat;
                this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
                lng: lngSum / pois.length,
                lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
        },
        getMarkerEvents() {
            return {
                click: ({ lnglat }) => {
                    const host = "https://restapi.amap.com/v3/geocode/regeo";
                    axios
                        .get(
                            `${host}?location=${lnglat.lng},${lnglat.lat}&key=61da46f8202196bd6a794a0fd70d8a9b`
                        )
                        .then(res => {
                            this.$set(
                                this.ruleForm,
                                "address",
                                res.data.regeocode.formatted_address
                            );
                            this.$set(
                                this.ruleForm,
                                "lat",
                                lnglat.lat
                            );
                            this.$set(
                                this.ruleForm,
                                "lng",
                                lnglat.lng
                            );
                            this.showMap = false;
                        });
                }
            };
        },
        onIdCardPicListFileChange(index, file, fileList) {
            const list = fileList
                .filter(item => item.status === "success")
                .map(item => item.response.url);
            const idCardPicList = this.ruleForm1.idCardPicList;
            idCardPicList[index] = list[0];
            this.$set(this.ruleForm1, "idCardPicList", idCardPicList.filter(value => !!value));
        },
        onIdCardPicFileChange(file, fileList) {
            const list = fileList
                .filter(item => item.status === "success")
                .map(item => item.response.url);
            this.$set(this.ruleForm1, "idCardPic", list);
        },
        onCompanyIdCardPicFileChange(file, fileList) {
            const list = fileList
                .filter(item => item.status === "success")
                .map(item => item.response.url);
            this.$set(this.ruleForm1, "companyIdCardPic", list);
        },
        onExceed(file, fileList) {
            this.$message.error(`最多上传${fileList.length}张`);
        }
    }
};
</script>

<style lang="scss">
  .container {
    margin: 0 auto;
    width: 1200px;

    .steps {
        margin: 20px 0;
    }

    .form {
        width: 800px;
    }

    .map-wrap {
        position: relative;

        .map {
            height: 400px;
        }

        .map-search {
            position: absolute;
            left: 20px;
            top: 20px;
        }
    }

    .strong {
      color: red;
    }
  }
</style>
