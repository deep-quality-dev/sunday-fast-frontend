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
                                            <i class="el-icon-time"></i>
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
                            <div class="main-content" v-show="subActiveId === item.id" v-for="item in contents" :key="item.id" v-html="item.content"></div>
                        <!-- </div> -->
                    </div>
                </el-col>
            </el-row>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeId: "1",
            subActiveId: '1-1',
            menus: [
                {
                    name: "菜单1",
                    id: "1",
                    children: [
                        {
                            name: "菜单11",
                            id: "1-1"
                        },
                        {
                            name: "菜单12",
                            id: "1-2"
                        }
                    ]
                },
                {
                    name: "菜单2",
                    id: "2",
                    children: [
                        {
                            name: "菜单21",
                            id: "2-1"
                        }
                    ]
                },
                {
                    name: "菜单3",
                    id: "3",
                    children: [
                        {
                            name: "菜单31",
                            id: "3-1"
                        },
                        {
                            name: "菜单32",
                            id: "3-2"
                        },
                        {
                            name: "菜单35",
                            id: "3-3"
                        },
                        {
                            name: "菜单35",
                            id: "3-4"
                        },
                        {
                            name: "菜单35",
                            id: "3-5"
                        }
                    ]
                },
                {
                    name: "菜单4",
                    id: "4",
                    children: []
                }
            ],
            contents: [{
                id: '1-1',
                content: `<div>1-1的内容</div>`
            }, {
                id: '1-2',
                content: `<div>1-2的内容</div>`
            }, {
                id: '2-1',
                content: `<div>2-1的内容</div>`
            }, {
                id: '2-2',
                content: `<div>2-2的内容</div>`
            }, {
                id: '3-1',
                content: `<div>3-1的内容</div>`
            }, {
                id: '3-2',
                content: `<div>4-1的内容</div>`
            }, {
                id: '3-3',
                content: `<div>4-2的内容</div>`
            }, {
                id: '3-4',
                content: `<div>4-4的内容</div>`
            }, {
                id: '4-4',
                content: `<div>4-4的内容</div>`
            }]
        };
    },
    methods: {
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
            const { id } = item;
            if (this.subActiveId === id) {
                return;
            }
            // 在这里做切换显示隐藏或者发起网络请求获取对应接口数据
            this.handleShowCOntent(id)
        },

        handleShowCOntent(id) {
            this.subActiveId = id
            // or request 
        }
        
    }
};
</script>
<style lang="scss" scoped>
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