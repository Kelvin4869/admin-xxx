// 这个文件用来封装接口,发送请求
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 使用拦截器,作用将所有的请求拦截下来,执行自己的逻辑,当前的需求是给所有的请求添加请求头
axios.interceptors.request.use(function (config) {
  // config表示请求对象,这个请求对象必须return回去
  // console.log(config)
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

// 添加用户
export const addUser = obj => axios.post('users', obj)

// 删除用户
export const delUser = id => axios.delete(`users/${id}`)

// 编辑用户
export const editUser = obj => axios.put(`users/${obj.id}`, obj)

// 修改用户状态
export const changeUserState = (uid, type) => axios.put(`users/${uid}/state/${type}`)

// 获取角色列表
export const getRoleList = () => axios.get('roles')

// 给用户分配角色
export const grantUserRole = (id, rid) => axios.put(`users/${id}/role`, { rid: rid })

// 获取权限列表数据
export const getRights = type => axios.get(`rights/${type}`)

// 删除角色指定权限
export const delUserRight = (roleId, rightId) => axios.delete(`roles/${roleId}/rights/${rightId}`)

// 角色授权
export const grantRoleRight = (roleId, rids) => axios.post(`roles/${roleId}/rights`, { rids: rids })

// 左侧菜单权限获取
export const getMenus = () => axios.get('menus')

// 获取商品分类数据
export const getCates = (type, pagenum, pagesize) => axios.get('categories', { params: { type, pagenum, pagesize } })

// 添加分类
export const addCate = obj => axios.post('categories', obj)
