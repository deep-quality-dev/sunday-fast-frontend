<template>
    <div>
        <img :src="imgSrc" :style="{width: styleObject.width, height: styleObject.height}" @click="handleViewImage" />
        <!-- 过渡动画 -->
        <div v-if="show">
            <transition name="fade">
                <div class="img-view">
                    <div class="img-layer" @click.self="handleHideImage"></div>
                    <div class="img-box" :style="{width: zoomWidth}">
                        <img :src="imgSrc" />
                        <span class="close" @click="handleHideImage">x</span>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        useView: {
            type: Boolean,
            default: true
        },
        imgSrc: {
            type: String,
            default: ''
        },
        styleObject: {
            type: Object,
            default: function() {
                return {
                    width: '30px',
                    height: '30px'
                }
            }
        }
    },
    data() {
        return {
            show: false,
            zoomWidth: 300
        };
    },
    methods: {
        handleViewImage(event) {
            if (!this.useView) return;
            const img = event.target;
            // 创建一个新的图片标签(image)来加载写有样式的img标签(img)，用这个新的图片标签来加载写有样式的img标签
            // 同时新的标签不插入dom中，以此方法即可获得想去得到写有样式的img的原始尺寸而不是取得style中的尺寸
            const image = new Image();
            image.src = img.src;
            const self = this;
            image.onload = function () {
                self.zoomWidth = image.width > 700 ? '600px': image.width + "px" ; // 使用原图大小
            }
            self.show = true;
        },
        handleHideImage() {
            this.show = false
        }
    }
};
</script>
<style lang="less" scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s linear;
    transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
    transform: translate3D(100%, 0, 0);
}

/* handleViewImage */

.img-view {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
}

/*遮罩层样式*/
.img-view .img-layer {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.img-view .img-box {
    position: absolute;
    z-index: 100;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // padding: 5px;
    // background-color: #FFFFFF;
    border-radius: 5px;
}

/*不限制图片大小，实现居中*/
.img-view .img-box img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    border: 2px solid #FFFFFF;
    border-radius: 10px;
}
.close {
    border-radius: 50%;
    display: block;
    width: 24px;
    height: 24px;
    color: #FFFFFF;
    font-size: 24px;
    background: transparent;
    cursor: pointer;
    position: absolute;
    z-index: 101;
    top: 102%;
    left: 50%;
    transform: translateX(-50%)
}
</style>