<template>
  <div class="main-box">
    <!-- 左边 侧边导航 -->
    <AsideMenu :isCollapse="isCollapse" />
    <!-- 右侧 主要内容 -->
    <!-- <MainContent /> -->
    <div class="main-content">
      <div class="top-header">
        <div class="left">
          <i
            class="iconfont"
            :class="{
              'icon-right-indent': !isCollapse,
              'icon-left-indent': isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
        </div>
        <div class="lang-box">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ $t("home.lang") }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="userinfo" v-if="user">
          <span>hello {{ user }}</span>
          <i class="iconfont icon-tuichu" @click="loginOut"></i>
        </div>
        <div v-else>
          <router-link to="/login">
            <el-button size="medium">登录/注册</el-button>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AsideMenu from "./AsideMenu.vue";
// import MainContent from "./MainContent.vue"; //不拆了
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapState("LoginModule", ["user"]),
  },
  components: {
    AsideMenu,
    // MainContent,
  },
  methods: {
    ...mapMutations("LoginModule", ["clearUser"]),
    loginOut() {
      // 退出登录
      this.clearUser();
      localStorage.removeItem("userinfo");
      // 回登录页
      this.$router.push("/login");
    },
    // 切换语言
    handleCommand(command) {
      console.log(command);
      // i18n放全局了，在this里可以访问
      console.log(this);
      this.$i18n.locale = command;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-box {
  display: flex;
  height: 100%;
  .main-content {
    flex: 1;
    .top-header {
      background: #1e78bf;
      height: 50px;
      line-height: 50px;
      color: #fff;
      display: flex;
      .left {
        flex: 1;
      }
      .iconfont {
        font-size: 24px;
        color: #fff;
        padding-left: 10px;
      }
      .userinfo {
        color: #fff;
        vertical-align: middle;
        padding-right: 20px;
      }
      .lang-box {
        .el-dropdown {
          color: #fff;
          margin-right: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>