<template>
	<view class="abnormal-detail-container">
		<view class="abnormal-status">
			<text class="status-text">{{getStatusText(abnormalInfo.status)}}</text>
			<text class="status-desc">{{getStatusDesc(abnormalInfo.status)}}</text>
		</view>
		
		<view class="abnormal-info">
			<view class="info-section">
				<view class="section-title">异常信息</view>
				<view class="info-item">
					<text class="label">异常编号：</text>
					<text class="value">{{abnormalInfo.abnormalNo}}</text>
				</view>
				<view class="info-item">
					<text class="label">订单编号：</text>
					<text class="value">{{abnormalInfo.orderNo}}</text>
				</view>
				<view class="info-item">
					<text class="label">异常类型：</text>
					<text class="value">{{getTypeText(abnormalInfo.type)}}</text>
				</view>
				<view class="info-item">
					<text class="label">异常原因：</text>
					<text class="value">{{abnormalInfo.reason}}</text>
				</view>
				<view class="info-item">
					<text class="label">异常说明：</text>
					<text class="value">{{abnormalInfo.description}}</text>
				</view>
				<view class="info-item">
					<text class="label">创建时间：</text>
					<text class="value">{{abnormalInfo.createTime}}</text>
				</view>
			</view>
			
			<view class="info-section">
				<view class="section-title">商品信息</view>
				<view class="goods-list">
					<view class="goods-item" v-for="(item, index) in abnormalInfo.goodsList" :key="index">
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
			
			<view class="info-section" v-if="abnormalInfo.status === 'handled'">
				<view class="section-title">处理信息</view>
				<view class="info-item">
					<text class="label">处理人：</text>
					<text class="value">{{abnormalInfo.handler}}</text>
				</view>
				<view class="info-item">
					<text class="label">处理时间：</text>
					<text class="value">{{abnormalInfo.handleTime}}</text>
				</view>
				<view class="info-item">
					<text class="label">处理结果：</text>
					<text class="value">{{getResultText(abnormalInfo.result)}}</text>
				</view>
				<view class="info-item">
					<text class="label">处理备注：</text>
					<text class="value">{{abnormalInfo.remark}}</text>
				</view>
			</view>
		</view>
		
		<view class="abnormal-actions" v-if="abnormalInfo.status === 'pending'">
			<button 
				class="action-btn primary" 
				@tap="handleAbnormal"
			>
				处理异常
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			abnormalInfo: {
				id: 1,
				abnormalNo: 'A202403010001',
				orderNo: '202403010001',
				status: 'pending',
				type: 'payment',
				reason: '支付失败',
				description: '支付过程中出现异常，导致支付失败',
				createTime: '2024-03-01 10:00:00',
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
				handler: '',
				handleTime: '',
				result: '',
				remark: ''
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			// TODO: 根据异常ID获取异常详情
			console.log('异常ID:', options.id)
		}
	},
	methods: {
		getStatusText(status) {
			const statusMap = {
				pending: '待处理',
				handled: '已处理'
			}
			return statusMap[status] || status
		},
		getStatusDesc(status) {
			const descMap = {
				pending: '等待处理异常',
				handled: '异常已处理完成'
			}
			return descMap[status] || ''
		},
		getTypeText(type) {
			const typeMap = {
				payment: '支付异常',
				delivery: '发货异常',
				refund: '退款异常',
				other: '其他异常'
			}
			return typeMap[type] || type
		},
		getResultText(result) {
			const resultMap = {
				fixed: '已修复',
				refunded: '已退款',
				resend: '已重新发货',
				other: '其他处理'
			}
			return resultMap[result] || result
		},
		handleAbnormal() {
			uni.navigateTo({
				url: `/pages/order/abnormal-handle?id=${this.abnormalInfo.id}`
			})
		}
	}
}
</script>

<style lang="scss">
.abnormal-detail-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	
	.abnormal-status {
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
	
	.abnormal-info {
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
	
	.abnormal-actions {
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
			font-size: 28rpx;
			border-radius: 40rpx;
			background-color: #3cc51f;
			color: #fff;
		}
	}
}
</style> 