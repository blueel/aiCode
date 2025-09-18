<template>
	<view class="detail-container">
		<view class="status-bar">
			<text class="status-text">{{getStatusText(orderInfo.status)}}</text>
			<text class="status-desc">{{getStatusDesc(orderInfo.status)}}</text>
		</view>
		
		<view class="address-box">
			<view class="address-info">
				<text class="name">{{orderInfo.receiverName}}</text>
				<text class="phone">{{orderInfo.receiverPhone}}</text>
			</view>
			<text class="address">{{orderInfo.receiverAddress}}</text>
		</view>
		
		<view class="goods-box">
			<view class="goods-item" v-for="(item, index) in orderInfo.goodsList" :key="index">
				<image :src="item.image" mode="aspectFill" class="goods-image"></image>
				<view class="goods-info">
					<view class="goods-name">{{item.name}}</view>
					<view class="goods-spec">{{item.spec}}</view>
					<view class="goods-price-count">
						<text class="price">¥{{item.price}}</text>
						<text class="count">x{{item.count}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="order-info">
			<view class="info-item">
				<text class="label">订单编号</text>
				<text class="value">{{orderInfo.orderNo}}</text>
			</view>
			<view class="info-item">
				<text class="label">下单时间</text>
				<text class="value">{{orderInfo.createTime}}</text>
			</view>
			<view class="info-item">
				<text class="label">支付方式</text>
				<text class="value">{{getPayTypeText(orderInfo.payType)}}</text>
			</view>
			<view class="info-item">
				<text class="label">支付时间</text>
				<text class="value">{{orderInfo.payTime || '未支付'}}</text>
			</view>
			<view class="info-item">
				<text class="label">发货时间</text>
				<text class="value">{{orderInfo.shipTime || '未发货'}}</text>
			</view>
			<view class="info-item">
				<text class="label">收货时间</text>
				<text class="value">{{orderInfo.receiveTime || '未收货'}}</text>
			</view>
		</view>
		
		<view class="amount-info">
			<view class="amount-item">
				<text class="label">商品总额</text>
				<text class="value">¥{{orderInfo.goodsAmount}}</text>
			</view>
			<view class="amount-item">
				<text class="label">运费</text>
				<text class="value">¥{{orderInfo.freightAmount}}</text>
			</view>
			<view class="amount-item">
				<text class="label">优惠金额</text>
				<text class="value">-¥{{orderInfo.discountAmount}}</text>
			</view>
			<view class="amount-item total">
				<text class="label">实付金额</text>
				<text class="value">¥{{orderInfo.payAmount}}</text>
			</view>
		</view>
		
		<view class="action-buttons">
			<button class="action-btn" v-if="orderInfo.status === 'unpaid'" @tap="handlePay">立即支付</button>
			<button class="action-btn" v-if="orderInfo.status === 'unshipped'" @tap="handleShip">确认发货</button>
			<button class="action-btn" v-if="orderInfo.status === 'shipped'" @tap="handleReceive">确认收货</button>
			<button class="action-btn" v-if="orderInfo.status === 'completed'" @tap="handleDelete">删除订单</button>
			<button class="action-btn" v-if="orderInfo.status === 'cancelled'" @tap="handleDelete">删除订单</button>
		</view>
	</view>
</template>

<script>
import { getOrderDetail, payOrder, shipOrder, receiveOrder, deleteOrder } from '@/api/order'

export default {
	data() {
		return {
			orderInfo: {
				id: 1,
				orderNo: '202403010001',
				status: 'unpaid',
				createTime: '2024-03-01 10:00:00',
				payTime: '',
				shipTime: '',
				receiveTime: '',
				payType: 'wxpay',
				goodsAmount: 199.99,
				freightAmount: 10.00,
				discountAmount: 0.00,
				payAmount: 209.99,
				receiverName: '张三',
				receiverPhone: '13800138000',
				receiverAddress: '广东省深圳市南山区科技园',
				goodsList: [
					{
						name: '示例商品1',
						spec: '规格：默认',
						price: 99.99,
						count: 1,
						image: '/static/images/goods1.jpg'
					},
					{
						name: '示例商品2',
						spec: '规格：默认',
						price: 100.00,
						count: 1,
						image: '/static/images/goods2.jpg'
					}
				]
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			this.getOrderDetail(options.id)
		}
	},
	methods: {
		getOrderDetail(id) {
			getOrderDetail(id).then(res => {
				this.orderInfo = res.data
			})
		},
		getStatusText(status) {
			const statusMap = {
				unpaid: '待支付',
				unshipped: '待发货',
				shipped: '已发货',
				completed: '已完成',
				cancelled: '已取消'
			}
			return statusMap[status] || status
		},
		getStatusDesc(status) {
			const descMap = {
				unpaid: '请尽快完成支付',
				unshipped: '等待商家发货',
				shipped: '商品已发出，请注意查收',
				completed: '交易已完成',
				cancelled: '订单已取消'
			}
			return descMap[status] || ''
		},
		getPayTypeText(type) {
			const typeMap = {
				wxpay: '微信支付',
				alipay: '支付宝',
				balance: '余额支付'
			}
			return typeMap[type] || type
		},
		handlePay() {
			uni.showModal({
				title: '提示',
				content: '确定要支付该订单吗？',
				success: (res) => {
					if (res.confirm) {
						payOrder(this.orderInfo.id).then(() => {
							uni.showToast({
								title: '支付成功',
								icon: 'success'
							})
							this.getOrderDetail(this.orderInfo.id)
						})
					}
				}
			})
		},
		handleShip() {
			uni.showModal({
				title: '提示',
				content: '确定要发货吗？',
				success: (res) => {
					if (res.confirm) {
						shipOrder(this.orderInfo.id).then(() => {
							uni.showToast({
								title: '发货成功',
								icon: 'success'
							})
							this.getOrderDetail(this.orderInfo.id)
						})
					}
				}
			})
		},
		handleReceive() {
			uni.showModal({
				title: '提示',
				content: '确定要确认收货吗？',
				success: (res) => {
					if (res.confirm) {
						receiveOrder(this.orderInfo.id).then(() => {
							uni.showToast({
								title: '收货成功',
								icon: 'success'
							})
							this.getOrderDetail(this.orderInfo.id)
						})
					}
				}
			})
		},
		handleDelete() {
			uni.showModal({
				title: '提示',
				content: '确定要删除该订单吗？',
				success: (res) => {
					if (res.confirm) {
						deleteOrder(this.orderInfo.id).then(() => {
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 1500)
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.detail-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 120rpx;
	
	.status-bar {
		background-color: #3cc51f;
		color: #fff;
		padding: 40rpx 30rpx;
		
		.status-text {
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 10rpx;
			display: block;
		}
		
		.status-desc {
			font-size: 24rpx;
			opacity: 0.8;
		}
	}
	
	.address-box {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.address-info {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			.name {
				font-size: 32rpx;
				font-weight: bold;
			}
			
			.phone {
				font-size: 28rpx;
				color: #666;
			}
		}
		
		.address {
			font-size: 28rpx;
			color: #666;
			line-height: 1.5;
		}
	}
	
	.goods-box {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.goods-item {
			display: flex;
			margin-bottom: 30rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.goods-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 8rpx;
				margin-right: 20rpx;
			}
			
			.goods-info {
				flex: 1;
				
				.goods-name {
					font-size: 28rpx;
					color: #333;
					margin-bottom: 10rpx;
				}
				
				.goods-spec {
					font-size: 24rpx;
					color: #999;
					margin-bottom: 10rpx;
				}
				
				.goods-price-count {
					display: flex;
					justify-content: space-between;
					
					.price {
						color: #f56c6c;
						font-size: 28rpx;
					}
					
					.count {
						color: #999;
						font-size: 24rpx;
					}
				}
			}
		}
	}
	
	.order-info {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.info-item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.label {
				font-size: 28rpx;
				color: #666;
			}
			
			.value {
				font-size: 28rpx;
				color: #333;
			}
		}
	}
	
	.amount-info {
		background-color: #fff;
		padding: 30rpx;
		
		.amount-item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.label {
				font-size: 28rpx;
				color: #666;
			}
			
			.value {
				font-size: 28rpx;
				color: #333;
			}
			
			&.total {
				margin-top: 20rpx;
				padding-top: 20rpx;
				border-top: 1px solid #f5f5f5;
				
				.label {
					font-weight: bold;
				}
				
				.value {
					color: #f56c6c;
					font-weight: bold;
				}
			}
		}
	}
	
	.action-buttons {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 30rpx;
		background-color: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.action-btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #3cc51f;
			color: #fff;
			font-size: 28rpx;
			border-radius: 40rpx;
		}
	}
}
</style> 