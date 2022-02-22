import request from '@/utils/request.js'

// 获取角色信息的接口
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 获取公司信息的接口
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

// 删除角色的接口
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

// 修改角色的接口
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

// 获取角色详情的接口
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 新增角色的接口
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}