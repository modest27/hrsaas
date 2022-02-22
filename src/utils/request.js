// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from './auth'
import { Message } from 'element-ui'

// 超时时间
const TimeOut = 3600
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 设置超时时间
}) // 创建一个axios实例

// 请求拦截器
service.interceptors.request.use(config => {
  // config 请求配置信息
  if (store.getters.token) {
    if (isCheckTimeOut()) {
      // 为true表示token过期，需要清除token，再跳转到登录页
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了，请重新登录！'))
    }
    // 如果有token，就为请求注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须要返回配置信息
}, error => {
  return Promise(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message)) // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
  }
}, error => {
  // 先判断有错误的响应对象
  // 当等于10002的时候 表示 后端告诉我token超时了
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // token超时，就需要删除token退出登录
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})

function isCheckTimeOut() {
  const curTime = Date.now()
  const oldTime = getTimeStamp()
  return (curTime - oldTime) / 1000 > TimeOut
}

export default service
