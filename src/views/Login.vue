<template>
  <div class="login">
    <!-- 在element官网找到form组件 -->
    <!-- model属性用于保存表单中的数据,用于提交 -->
    <el-form :model="loginForm" class="container">
      <el-form-item>
        <div class="avatar">
          <img src="../assets/avatar.jpg" alt="">
        </div>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.username"  prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.password"  prefix-icon="myicon myicon-key"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        // 定义form表单需要的数据
        username: '',
        password: ''
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
