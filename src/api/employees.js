import request from '@/utils/request.js'

// 获取员工列表简单接口
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
