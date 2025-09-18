<template>
	<view class="wxpay-detail-container">
		<view class="payment-status">
			<text class="status-text">{{getStatusText(paymentInfo.status)}}</text>
			<text class="status-desc">{{getStatusDesc(paymentInfo.status)}}</text>
		</view>
		
		<view class="payment-info">
			<view class="info-section">
				<view class="section-title">订单信息</view>
				<view class="info-item">
					<text class="label">订单编号：</text>
					<text class="value">{{paymentInfo.orderNo}}</text>
				</view>
				<view class="info-item">
					<text class="label">支付金额：</text>
					<text class="value price">¥{{paymentInfo.amount}}</text>
				</view>
				<view class="info-item">
					<text class="label">支付时间：</text>
					<text class="value">{{paymentInfo.payTime}}</text>
				</view>
				<view class="info-item">
					<text class="label">交易单号：</text>
					<text class="value">{{paymentInfo.transactionId}}</text>
				</view>
				<view class="info-item">
					<text class="label">支付方式：</text>
					<text class="value">{{getPayTypeText(paymentInfo.payType)}}</text>
				</view>
			</view>
			
			<view class="info-section">
				<view class="section-title">商品信息</view>
				<view class="goods-list">
					<view class="goods-item" v-for="(item, index) in paymentInfo.goodsList" :key="index">
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
			
			<view class="info-section" v-if="paymentInfo.status === 'refunded'">
				<view class="section-title">退款信息</view>
				<view class="info-item">
					<text class="label">退款金额：</text>
					<text class="value price">¥{{paymentInfo.refundAmount}}</text>
				</view>
				<view class="info-item">
					<text class="label">退款时间：</text>
					<text class="value">{{paymentInfo.refundTime}}</text>
				</view>
				<view class="info-item">
					<text class="label">退款单号：</text>
					<text class="value">{{paymentInfo.refundNo}}</text>
				</view>
				<view class="info-item">
					<text class="label">退款原因：</text>
					<text class="value">{{paymentInfo.refundReason}}</text>
				</view>
			</view>
		</view>
		
		<view class="payment-actions" v-if="paymentInfo.status === 'paid'">
			<button class="action-btn" @tap="handleRefund">申请退款</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			paymentInfo: {
				id: 1,
				orderNo: '202403010001',
				status: 'paid',
				amount: 199.99,
				payTime: '2024-03-01 10:00:00',
				transactionId: '4200001234202403010123456789',
				payType: 'wxpay',
				refundAmount: 0,
				refundTime: '',
				refundNo: '',
				refundReason: '',
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
			// TODO: 根据支付单ID获取支付详情
			console.log('支付单ID:', options.id)
		}
	},
	methods: {
		getStatusText(status) {
			const statusMap = {
				unpaid: '待支付',
				paid: '已支付',
				refunded: '已退款',
				failed: '支付失败'
			}
			return statusMap[status] || status
		},
		getStatusDesc(status) {
			const descMap = {
				unpaid: '等待买家支付',
				paid: '买家已成功支付',
				refunded: '订单已退款',
				failed: '支付失败，请重新支付'
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
		handleRefund() {
			uni.navigateTo({
				url: `/pages/order/wxpay-refund?id=${this.paymentInfo.id}`
			})
		}
	}
}
</script>

<style lang="scss">
.wxpay-detail-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	
	.payment-status {
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
	
	.payment-info {
		padding: 20rpx;
		
		.info-section {
			background-color: #fff;
			border-radius: 8rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			
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
	
	.payment-actions {
		padding: 30rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		
		.action-btn {
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