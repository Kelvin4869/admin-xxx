import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      // 当访问/ 让路由重定向到 欢迎页面
      redirect: { name: 'welcome' },
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "welcome" */ './views/Welcome.vue')
        },
        {
          path: '/users',
          name: 'users',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "users" */ './views/Users.vue')
        }
      ]
    }
  ]
})
