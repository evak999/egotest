<template>
  <div class="side-box">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgb(48, 65, 86)"
      text-color="#fff"
      active-text-color="rgb(64, 158, 255)"
      router
      :collapse="isCollapse"
    >
      <el-menu-item index="/">
        <span slot="title">后台易购管理系统</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">商品管理</span> -->
        <span slot="title">{{ $t("home.product") }}</span>
      </el-menu-item>
      <el-menu-item index="/rules">
        <i class="el-icon-s-tools"></i>
        <!-- <span slot="title">规则参数</span> -->
        <span slot="title">{{ $t("home.rule") }}</span>
      </el-menu-item>
      <el-menu-item index="/ad">
        <i class="el-icon-document"></i>
        <!-- <span slot="title">广告分类</span> -->
        <span slot="title">{{ $t("home.advert") }}</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <!-- <span slot="title">个人中心</span> -->
        <span slot="title">{{ $t("home.user") }}</span>
      </el-menu-item>
      <!-- 带下拉的 -->
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="/order/list">订单列表</el-menu-item>
        <el-menu-item index="/order/returnGoods">退货管理</el-menu-item>
        <el-submenu index="/order/product">
          <template slot="title">生产管理</template>
          <el-menu-item index="/order/product/list">生产列表</el-menu-item>
          <el-menu-item index="/order/product/review">审核管理</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.side-box {
  height: 100%;
  background-color: rgb(48, 65, 86);
  .el-menu-vertical-demo {
    border-right: 0;
    .is-active {
      background: #1f2d3d !important;
    }
    li:hover {
      background-color: #1f2d3d !important;
      color: rgb(64, 158, 255);
    }
    .el-submenu__title:hover {
      background-color: #1f2d3d !important;
      color: rgb(64, 158, 255);
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>