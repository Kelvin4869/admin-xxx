import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
router.beforeEach((to, from, next) => {
  // 如果用户登录,可任意访问,需要调用next()
  // 如果用户没有登录,如果是login,直接访问next(),如果不是login,拦住,访问login,调用next()
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    if (to.name !== 'login') {
      next('/login')
    } else {
      next()
    }
  }
})
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
