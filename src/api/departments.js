import request from '@/utils/request.js'

// 获取业务部门接口
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除部门接口
export function delDepartments(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}

// 新增部门接口
export function addDepartments(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

// 获取部门信息的接口
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 保存编辑部门信息的接口
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
