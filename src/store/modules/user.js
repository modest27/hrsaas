import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() // 设置token共享状态,初始化vuex时就去缓存中读取
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
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
    // 现在有用户token
    // actions 修改state 必须通过mutations
    context.commit('setToken', result)
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
