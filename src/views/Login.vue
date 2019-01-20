<template>
  <div class="login">
    <!-- 在element官网找到form组件 -->
    <!-- model属性用于保存表单中的数据,用于提交 -->
    <!-- rules属性用于设置静态页面的校验规则 -->
    <!-- 给el-form定义ref属性,主要是用来校验的 -->
    <el-form :model="loginForm" :rules="loginRules" class="container" ref='loginRef'>
      <el-form-item>
        <div class="avatar">
          <img src="../assets/avatar.jpg" alt="">
        </div>
      </el-form-item>
      <!-- el-form-item上添加需要校验的prop属性,它的值必须和定义的字段名一致 -->
      <el-form-item prop='username'>
        <!-- 查看input组件如何添加图标,prefix-icon属性添加前缀 -->
        <el-input v-model="loginForm.username"  prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input v-model="loginForm.password"  prefix-icon="myicon myicon-key" type='password' @keyup.enter.native='handleLogin'></el-input>
      </el-form-item>
      <el-form-item>
        <!-- button点击事件 -->
        <el-button type="primary" class="login-btn" @click='handleLogin'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from '@/api/index.js'
export default {
  data () {
    return {
      loginForm: {
        // 定义form表单需要的数据
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      // 调用接口之前,先要通过js校验,js校验直接通过ref获取到dom,然后调用validate方法,该方法是封装好的直接调用,它里面有一个带参数的回调,参数是布尔值,为true表示校验通过,为false表示校验失败
      this.$refs.loginRef.validate(isOk => {
        if (isOk) {
          // 如果校验通过就发送请求
          login({ username: this.loginForm.username, password: this.loginForm.password })
            .then(res => {
              if (res.data.meta.status === 200) {
                // 将登录成功后的token保存到localStorage
                localStorage.setItem('token', res.data.data.token)
                // 将登录成功的用户名保存到本地
                localStorage.setItem('username', res.data.data.username)
                // 登录成功跳转到首页
                console.log(res)
                this.$router.push({ name: 'home' })
              } else {
                // 弹出错误提示信息,res.data.meta.msg
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          alert('2')
        }
      })
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
