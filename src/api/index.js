// 这个文件用来封装接口,发送请求
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 使用拦截器,作用将所有的请求拦截下来,执行自己的逻辑,当前的需求是给所有的请求添加请求头
axios.interceptors.request.use(function (config) {
  // config表示请求对象,这个请求对象必须return回去
  console.log(config)
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 封装登录函数
// export const login = (obj) => axios.post('login', obj)
// export const login = function (obj) {
//   return axios.post('login', obj)
// }
// 箭头函数只有一个参数省略括号,如果函数执行只有return的一句话,那return也可以省略掉
export const login = obj => axios.post('login', obj)

// 用户数据列表获取
export const getUserList = obj => axios.get('users', { params: obj })
