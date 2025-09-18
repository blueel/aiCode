<template>
	<view class="refund-detail-container">
		<view class="refund-status">
			<text class="status-text">{{getStatusText(refundInfo.status)}}</text>
			<text class="status-desc">{{getStatusDesc(refundInfo.status)}}</text>
		</view>
		
		<view class="refund-info">
			<view class="info-section">
				<view class="section-title">退款信息</view>
				<view class="info-item">
					<text class="label">退款编号：</text>
					<text class="value">{{refundInfo.refundNo}}</text>
				</view>
				<view class="info-item">
					<text class="label">订单编号：</text>
					<text class="value">{{refundInfo.orderNo}}</text>
				</view>
				<view class="info-item">
					<text class="label">申请时间：</text>
					<text class="value">{{refundInfo.createTime}}</text>
				</view>
				<view class="info-item">
					<text class="label">退款原因：</text>
					<text class="value">{{refundInfo.reason}}</text>
				</view>
				<view class="info-item">
					<text class="label">退款说明：</text>
					<text class="value">{{refundInfo.description}}</text>
				</view>
				<view class="info-item">
					<text class="label">退款金额：</text>
					<text class="value price">¥{{refundInfo.amount}}</text>
				</view>
			</view>
			
			<view class="info-section">
				<view class="section-title">商品信息</view>
				<view class="goods-list">
					<view class="goods-item" v-for="(item, index) in refundInfo.goodsList" :key="index">
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
			
			<view class="info-section" v-if="refundInfo.status === 'rejected'">
				<view class="section-title">拒绝信息</view>
				<view class="info-item">
					<text class="label">拒绝原因：</text>
					<text class="value">{{refundInfo.rejectReason}}</text>
				</view>
				<view class="info-item">
					<text class="label">拒绝时间：</text>
					<text class="value">{{refundInfo.rejectTime}}</text>
				</view>
			</view>
			
			<view class="info-section" v-if="refundInfo.status === 'completed'">
				<view class="section-title">退款信息</view>
				<view class="info-item">
					<text class="label">退款时间：</text>
					<text class="value">{{refundInfo.refundTime}}</text>
				</view>
				<view class="info-item">
					<text class="label">退款方式：</text>
					<text class="value">{{getRefundTypeText(refundInfo.refundType)}}</text>
				</view>
				<view class="info-item">
					<text class="label">交易单号：</text>
					<text class="value">{{refundInfo.transactionId}}</text>
				</view>
			</view>
		</view>
		
		<view class="refund-actions" v-if="refundInfo.status === 'pending'">
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
			refundInfo: {
				id: 1,
				refundNo: 'R202403010001',
				orderNo: '202403010001',
				status: 'pending',
				createTime: '2024-03-01 10:00:00',
				reason: '商品质量问题',
				description: '商品存在质量问题，需要退款',
				amount: 199.99,
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
				],
				rejectReason: '',
				rejectTime: '',
				refundTime: '',
				refundType: '',
				transactionId: ''
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			// TODO: 根据退款ID获取退款详情
			console.log('退款ID:', options.id)
		}
	},
	methods: {
		getStatusText(status) {
			const statusMap = {
				pending: '待处理',
				completed: '已完成',
				rejected: '已拒绝'
			}
			return statusMap[status] || status
		},
		getStatusDesc(status) {
			const descMap = {
				pending: '等待商家处理',
				completed: '退款已完成',
				rejected: '退款申请被拒绝'
			}
			return descMap[status] || ''
		},
		getRefundTypeText(type) {
			const typeMap = {
				wxpay: '微信支付',
				alipay: '支付宝',
				balance: '余额支付'
			}
			return typeMap[type] || type
		},
		getActions() {
			return [
				{ type: 'default', text: '拒绝退款' },
				{ type: 'primary', text: '同意退款' }
			]
		},
		handleAction(type) {
			if (type === 'primary') {
				this.handleApprove()
			} else {
				this.handleReject()
			}
		},
		handleApprove() {
			uni.showModal({
				title: '提示',
				content: '确定要同意退款吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用同意退款接口
						console.log('同意退款')
					}
				}
			})
		},
		handleReject() {
			uni.showModal({
				title: '提示',
				content: '确定要拒绝退款吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用拒绝退款接口
						console.log('拒绝退款')
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.refund-detail-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	
	.refund-status {
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
	
	.refund-info {
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
	
	.refund-actions {
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