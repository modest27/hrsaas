import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'

import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router/index.js'
const state = {
  token: getToken(), // 设置token共享状态,初始化vuex时就去缓存中读取
  userInfo: {} // 因为我们会在 getters 中引用userinfo的变量，如果设置为null，则会引起异常和报错
}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    setToken(token) // vuex和 缓存数据的同步
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken() // vuex和 缓存数据的同步
  },
  setUserInfo(state, result) {
    state.userInfo = result
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
    // 现在有用户token
    // actions 修改state 必须通过mutations
    context.commit('setToken', result)
    // 设置时间戳
    setTimeStamp()
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseResult = await getUserDetailById(result.userId) // 为了获取头像
    context.commit('setUserInfo', { ...result, ...baseResult })
    return result // 这里为什么要返回 为后面埋下伏笔
  },
  logout(context) {
    // 删除用户token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
    // 重置路由
    resetRouter()
    // 还有一步  vuex中的数据是不是还在
    // 要清空permission模块下的state数据
    // vuex中 user子模块  permission子模块
    // 子模块调用子模块的action  默认情况下 子模块的context是子模块的
    // 父模块 调用 子模块的action
    context.commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
