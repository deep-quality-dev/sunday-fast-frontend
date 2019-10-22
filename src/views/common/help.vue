<template>
    <div class="about-page">
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
    </div>
</template>
<script>
import { treeDataTranslate } from "@/utils";
export default {
  data() {
    return {
      activeId: "",
      subActiveId: "",
      menus: [],
      contents: []
    };
  },
  created() {
    this.getDataList();
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
    }
  }
};
</script>
<style lang="scss" scoped>
.sec-help {
  .titles {
    overflow: hidden;
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