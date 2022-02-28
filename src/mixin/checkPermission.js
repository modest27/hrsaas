import store from '@/store'

export default {
  methods: {
    checkPermission(key) {
      // 去用户信息里面去找有没有等于key，有的话说明有权限点击按钮，如果没找到，就没有权限，就不展示按钮
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
