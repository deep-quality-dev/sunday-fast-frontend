<template>
  <div
    class="site-wrapper"
    :class="{ 'site-sidebar--fold': sidebarFold }"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
  >
    <template v-if="!loading">
      <main-navbar/>
      <main-sidebar/>
      <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
        <main-content/>
      </div>
    </template>
    <audio id="audio" muted src="http://downsc.chinaz.net/Files/DownLoad/sound1/201609/7815.wav"/>
    <AddOrUpdate v-if="addOrUpdateVisible" ref="addOrUpdate"></AddOrUpdate>
  </div>
</template>

<script>
import MainNavbar from "./main-navbar";
import MainSidebar from "./main-sidebar";
import MainContent from "./main-content";
import { Notification } from "element-ui";
import AddOrUpdate from "../views/modules/app/order/hotelorder-add-or-update";
export default {
  data() {
    return {
      loading: true,
      addOrUpdateVisible: false,
      websocket: ""
    };
  },
  components: {
    MainNavbar,
    MainSidebar,
    MainContent,
    AddOrUpdate
  },
  computed: {
    documentClientHeight: {
      get() {
        return this.$store.state.common.documentClientHeight;
      },
      set(val) {
        this.$store.commit("common/updateDocumentClientHeight", val);
      }
    },
    sidebarFold: {
      get() {
        return this.$store.state.common.sidebarFold;
      }
    },
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
  created() {
  },
  mounted() {
    this.resetDocumentClientHeight();
    this.getUserInfo();
  },
  watch: {
    status: function(value) {
      this.getCaptcha();
    }
  },
  methods: {
    init(userId) {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        let domain =
          window.SITE_CONFIG["baseUrl"].indexOf("https") > 0
            ? window.SITE_CONFIG["baseUrl"].replace(/https/g, "wss")
            : window.SITE_CONFIG["baseUrl"].replace(/http/g, "ws");

        // 实例化socket
        this.socket = new WebSocket(`${domain}/websocket/${userId}`);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    //
    aplayAudio() {
      const audio = document.getElementById("audio");
      audio.play();
    },
    // 重置窗口可视高度
    resetDocumentClientHeight() {
      this.documentClientHeight = document.documentElement["clientHeight"];
      window.onresize = () => {
        this.documentClientHeight = document.documentElement["clientHeight"];
      };
    },
    // 获取当前管理员信息
    getUserInfo() {
      this.$http({
        url: this.$http.adornUrl("/sys/user/info"),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.loading = false;
          this.userId = data.user.userId;
          this.userName = data.user.username;
          this.init(data.user.userId);
        }
      });
    },

    open: function() {
      console.log("socket连接成功");
    },
    error: function() {
      console.log("连接错误");
    },
    getMessage: function(msg) {
      this.$notify({
        title: "订单提醒",
        dangerouslyUseHTMLString: true,
        message:
          '<div>您有新的订单，<el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">查看</el-button></div>',
        duration: 0
      });
      this.$nextTick(function() {
        const audio = document.getElementById("audio");
        audio.play();
      });
    },
    send: function() {
      this.socket.send(params);
    },
    close: function() {
      console.log("socket已经关闭");
    }
  }
};
</script>
