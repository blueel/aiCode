import request from '@/utils/request'

// 获取订单列表
export function getOrderList(params) {
	return request({
		url: '/order/list',
		method: 'get',
		params
	})
}

// 获取订单详情
export function getOrderDetail(id) {
	return request({
		url: `/order/detail/${id}`,
		method: 'get'
	})
}

// 支付订单
export function payOrder(id) {
	return request({
		url: `/order/pay/${id}`,
		method: 'post'
	})
}

// 发货订单
export function shipOrder(id) {
	return request({
		url: `/order/ship/${id}`,
		method: 'post'
	})
}

// 确认收货
export function receiveOrder(id) {
	return request({
		url: `/order/receive/${id}`,
		method: 'post'
	})
}

// 删除订单
export function deleteOrder(id) {
	return request({
		url: `/order/delete/${id}`,
		method: 'post'
	})
}

// 获取订单报表
export function getOrderReport(params) {
	return request({
		url: '/order/report',
		method: 'get',
		params
	})
}

// 获取退款订单列表
export function getRefundList(params) {
	return request({
		url: '/order/refund/list',
		method: 'get',
		params
	})
}

// 获取退款订单详情
export function getRefundDetail(id) {
	return request({
		url: `/order/refund/detail/${id}`,
		method: 'get'
	})
}

// 审核退款订单
export function reviewRefund(data) {
	return request({
		url: '/order/refund/review',
		method: 'post',
		data
	})
}

// 获取异常订单列表
export function getAbnormalList(params) {
	return request({
		url: '/order/abnormal/list',
		method: 'get',
		params
	})
}

// 获取异常订单详情
export function getAbnormalDetail(id) {
	return request({
		url: `/order/abnormal/detail/${id}`,
		method: 'get'
	})
}

// 处理异常订单
export function handleAbnormal(data) {
	return request({
		url: '/order/abnormal/handle',
		method: 'post',
		data
	})
}

// 获取微信支付订单列表
export function getWxpayList(params) {
	return request({
		url: '/order/wxpay/list',
		method: 'get',
		params
	})
}

// 获取微信支付订单详情
export function getWxpayDetail(id) {
	return request({
		url: `/order/wxpay/detail/${id}`,
		method: 'get'
	})
}

// 申请微信支付退款
export function applyWxpayRefund(data) {
	return request({
		url: '/order/wxpay/refund',
		method: 'post',
		data
	})
}

// 获取订单统计
export function getOrderStatistics() {
	return request({
		url: '/order/statistics',
		method: 'get'
	})
}

// 获取订单趋势
export function getOrderTrend(params) {
	return request({
		url: '/order/trend',
		method: 'get',
		params
	})
}

// 获取订单地区分布
export function getOrderRegion() {
	return request({
		url: '/order/region',
		method: 'get'
	})
}

// 获取订单商品排行
export function getOrderGoodsRank(params) {
	return request({
		url: '/order/goods/rank',
		method: 'get',
		params
	})
}

// 获取订单会员排行
export function getOrderMemberRank(params) {
	return request({
		url: '/order/member/rank',
		method: 'get',
		params
	})
}

// 导出订单
export function exportOrder(params) {
	return request({
		url: '/order/export',
		method: 'get',
		params,
		responseType: 'blob'
	})
}

// 批量发货
export function batchShip(data) {
	return request({
		url: '/order/batch/ship',
		method: 'post',
		data
	})
}

// 批量删除
export function batchDelete(data) {
	return request({
		url: '/order/batch/delete',
		method: 'post',
		data
	})
}

// 获取订单备注
export function getOrderRemark(id) {
	return request({
		url: `/order/remark/${id}`,
		method: 'get'
	})
}

// 添加订单备注
export function addOrderRemark(data) {
	return request({
		url: '/order/remark/add',
		method: 'post',
		data
	})
}

// 修改订单备注
export function updateOrderRemark(data) {
	return request({
		url: '/order/remark/update',
		method: 'post',
		data
	})
}

// 删除订单备注
export function deleteOrderRemark(id) {
	return request({
		url: `/order/remark/delete/${id}`,
		method: 'post'
	})
} 