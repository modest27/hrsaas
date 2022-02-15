import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404']
// 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) {
  // 有token，判断是否去登陆页
    if (to.path === '/login') {
      next('/')
    } else {
    // 不管怎么样，直接放行
      next()
    }
  } else {
  // 没有token，判断是否去的是白名单
    if (whiteList.indexOf(to.path) > -1) {
    // 在白名单，放行
      next()
    } else {
    // 不在白名单，强制跳转到登录页
      next('/login')
    }
  }
  NProgress.done() // 解决手动路由跳转进度条不关闭问题，需要手动关闭进度条
})

// 全局后置守卫
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
