<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
          <el-menu
          default-active="2"
          router
          :collapse='iscollapse'
          class="el-menu-admin"
          background-color="#f9f9f9"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- index会作为路由的path进行跳转,因为已经开启router路由模式 -->
            <el-menu-item index="/users">
              <i class="el-icon-tickets"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <!-- index会作为路由的path进行跳转,因为已经开启router路由模式 -->
            <el-menu-item index="/rights">
              <i class="el-icon-tickets"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="toggle-btn" @click='toggle'>
            <i class='myicon myicon-menu'></i>
          </div>
          <div class="system-title">
            电商后台管理系统
          </div>
          <div>
            <span class="welcome">您好,{{username}}</span>
            <el-button type="warning" round @click='logout'>退出</el-button>
          </div>
        </el-header>
        <el-main>
          <transition
            enter-active-class='animated fadeIn'
            leave-active-class='animated fadeOut'
            mode='out-in'
          >
            <!-- 用于匹配子路由的组件 -->
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { getUserList } from '@/api'
export default {
  created () {
    this.username = localStorage.getItem('username')
  },
  data () {
    return {
      iscollapse: false,
      username: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 切换导航菜单展开和折叠
    toggle () {
      this.iscollapse = !this.iscollapse
    },
    logout () {
      // 清除token,跳转到登录页
      localStorage.clear()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #F9F9F9;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #409EFF;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome, {
    color: white;
  }
}
</style>
