import request from '@/utils/request'

// 获取商品列表
export function getGoodsList(params) {
  return request({
    url: '/goods/list',
    method: 'get',
    params
  })
}

// 获取商品详情
export function getGoodsDetail(id) {
  return request({
    url: `/goods/detail/${id}`,
    method: 'get'
  })
}

// 添加商品
export function addGoods(data) {
  return request({
    url: '/goods/add',
    method: 'post',
    data
  })
}

// 编辑商品
export function editGoods(data) {
  return request({
    url: '/goods/edit',
    method: 'post',
    data
  })
}

// 删除商品
export function deleteGoods(id) {
  return request({
    url: `/goods/delete/${id}`,
    method: 'post'
  })
}

// 搜索商品
export function searchGoods(keyword) {
  return request({
    url: '/goods/search',
    method: 'get',
    params: { keyword }
  })
} 