<template>
	<view class="sales-detail-container">
		<view class="order-status">
			<text class="status-text">{{getStatusText(orderInfo.status)}}</text>
			<text class="status-desc">{{getStatusDesc(orderInfo.status)}}</text>
		</view>
		
		<view class="order-info">
			<view class="info-section">
				<view class="section-title">收货信息</view>
				<view class="info-item">
					<text class="label">收货人：</text>
					<text class="value">{{orderInfo.receiverName}}</text>
				</view>
				<view class="info-item">
					<text class="label">联系电话：</text>
					<text class="value">{{orderInfo.receiverPhone}}</text>
				</view>
				<view class="info-item">
					<text class="label">收货地址：</text>
					<text class="value">{{orderInfo.receiverAddress}}</text>
				</view>
			</view>
			
			<view class="info-section">
				<view class="section-title">商品信息</view>
				<view class="goods-list">
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
			</view>
			
			<view class="info-section">
				<view class="section-title">订单信息</view>
				<view class="info-item">
					<text class="label">订单编号：</text>
					<text class="value">{{orderInfo.orderNo}}</text>
				</view>
				<view class="info-item">
					<text class="label">下单时间：</text>
					<text class="value">{{orderInfo.createTime}}</text>
				</view>
				<view class="info-item">
					<text class="label">支付方式：</text>
					<text class="value">{{getPayTypeText(orderInfo.payType)}}</text>
				</view>
				<view class="info-item">
					<text class="label">支付时间：</text>
					<text class="value">{{orderInfo.payTime}}</text>
				</view>
				<view class="info-item">
					<text class="label">发货时间：</text>
					<text class="value">{{orderInfo.deliveryTime}}</text>
				</view>
				<view class="info-item">
					<text class="label">完成时间：</text>
					<text class="value">{{orderInfo.completeTime}}</text>
				</view>
			</view>
			
			<view class="info-section">
				<view class="section-title">金额信息</view>
				<view class="info-item">
					<text class="label">商品总额：</text>
					<text class="value">¥{{orderInfo.goodsAmount}}</text>
				</view>
				<view class="info-item">
					<text class="label">运费：</text>
					<text class="value">¥{{orderInfo.freightAmount}}</text>
				</view>
				<view class="info-item">
					<text class="label">优惠金额：</text>
					<text class="value">-¥{{orderInfo.discountAmount}}</text>
				</view>
				<view class="info-item">
					<text class="label">实付金额：</text>
					<text class="value price">¥{{orderInfo.payAmount}}</text>
				</view>
			</view>
		</view>
		
		<view class="order-actions" v-if="orderInfo.status !== 'completed' && orderInfo.status !== 'cancelled'">
			<button 
				class="action-btn" 
				:class="{'primary': action.type === 'primary'}"
				v-for="(action, index) in getActions()" 
				:key="index"
				@tap="handleAction(action.type)"
			>
				{{action.text}}
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderInfo: {
				id: 1,
				orderNo: '202403010001',
				status: 'unpaid',
				receiverName: '张三',
				receiverPhone: '13800138000',
				receiverAddress: '广东省深圳市南山区科技园',
				createTime: '2024-03-01 10:00:00',
				payType: 'wxpay',
				payTime: '',
				deliveryTime: '',
				completeTime: '',
				goodsAmount: 199.99,
				freightAmount: 10.00,
				discountAmount: 0.00,
				payAmount: 209.99,
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
			// TODO: 根据订单ID获取订单详情
			console.log('订单ID:', options.id)
		}
	},
	methods: {
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
				unpaid: '等待买家支付',
				unshipped: '等待卖家发货',
				shipped: '商品已发出',
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
		getActions() {
			const actions = []
			switch (this.orderInfo.status) {
				case 'unpaid':
					actions.push(
						{ type: 'primary', text: '确认支付' },
						{ type: 'default', text: '取消订单' }
					)
					break
				case 'unshipped':
					actions.push(
						{ type: 'primary', text: '确认发货' }
					)
					break
				case 'shipped':
					actions.push(
						{ type: 'primary', text: '确认收货' }
					)
					break
			}
			return actions
		},
		handleAction(type) {
			switch (type) {
				case 'primary':
					if (this.orderInfo.status === 'unpaid') {
						this.handlePay()
					} else if (this.orderInfo.status === 'unshipped') {
						this.handleShip()
					} else if (this.orderInfo.status === 'shipped') {
						this.handleReceive()
					}
					break
				case 'default':
					if (this.orderInfo.status === 'unpaid') {
						this.handleCancel()
					}
					break
			}
		},
		handlePay() {
			uni.showModal({
				title: '提示',
				content: '确定要确认支付吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用确认支付接口
						console.log('确认支付')
					}
				}
			})
		},
		handleShip() {
			uni.showModal({
				title: '提示',
				content: '确定要确认发货吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用确认发货接口
						console.log('确认发货')
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
						// TODO: 调用确认收货接口
						console.log('确认收货')
					}
				}
			})
		},
		handleCancel() {
			uni.showModal({
				title: '提示',
				content: '确定要取消订单吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用取消订单接口
						console.log('取消订单')
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.sales-detail-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	
	.order-status {
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
	
	.order-info {
		padding: 20rpx;
		
		.info-section {
			background-color: #fff;
			border-radius: 8rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.section-title {
				font-size: 28rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 1px solid #f5f5f5;
			}
			
			.info-item {
				display: flex;
				margin-bottom: 10rpx;
				font-size: 24rpx;
				
				&:last-child {
					margin-bottom: 0;
				}
				
				.label {
					color: #666;
					width: 140rpx;
				}
				
				.value {
					color: #333;
					flex: 1;
					
					&.price {
						color: #f56c6c;
						font-weight: bold;
					}
				}
			}
			
			.goods-list {
				.goods-item {
					display: flex;
					margin-bottom: 20rpx;
					
					&:last-child {
						margin-bottom: 0;
					}
					
					.goods-image {
						width: 120rpx;
						height: 120rpx;
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
		}
	}
	
	.order-actions {
		padding: 30rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: flex-end;
		
		.action-btn {
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 40rpx;
			margin-left: 20rpx;
			font-size: 28rpx;
			border-radius: 40rpx;
			background-color: #f5f5f5;
			color: #666;
			
			&.primary {
				background-color: #3cc51f;
				color: #fff;
			}
		}
	}
}
</style> 