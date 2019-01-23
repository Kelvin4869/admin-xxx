<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
          <el-menu
          default-active="2"
          router
          unique-opened
          :collapse='iscollapse'
          class="el-menu-admin"
          background-color="#f9f9f9"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu :index="menu.path" v-for='menu in menuList' :key='menu.id'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{menu.authName}}</span>
            </template>
            <!-- index会作为路由的path进行跳转,因为已经开启router路由模式 -->
            <el-menu-item :index="submenu.path" v-for='submenu in menu.children' :key='submenu.id'>
              <i class="el-icon-tickets"></i>
              <span>{{submenu.authName}}</span>
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
import { getMenus } from '@/api'
export default {
  created () {
    this.username = localStorage.getItem('username')
    this.initMenus()
  },
  data () {
    return {
      iscollapse: false,
      username: '',
      menuList: [] // 保存菜单数据
    }
  },
  methods: {
    initMenus () {
      getMenus()
        .then(res => {
          console.log(res)
          this.menuList = res.data.data
        })
    },
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
