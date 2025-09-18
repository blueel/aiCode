<template>
	<view class="sales-container">
		<view class="search-box">
			<input type="text" v-model="searchKey" placeholder="搜索订单号/会员" @confirm="handleSearch" />
			<button class="filter-btn" @tap="showFilter">筛选</button>
		</view>
		
		<view class="status-tabs">
			<view 
				class="tab-item" 
				:class="{ active: currentStatus === item.value }" 
				v-for="(item, index) in statusOptions" 
				:key="index"
				@tap="handleStatusChange(item.value)"
			>
				{{item.label}}
			</view>
		</view>
		
		<view class="sales-list">
			<view class="sales-item" v-for="(item, index) in salesList" :key="index">
				<view class="sales-header">
					<text class="order-no">订单号：{{item.orderNo}}</text>
					<text class="order-status" :class="item.status">{{getStatusText(item.status)}}</text>
				</view>
				
				<view class="sales-content">
					<view class="goods-list">
						<view class="goods-item" v-for="(goods, goodsIndex) in item.goodsList" :key="goodsIndex">
							<image :src="goods.image" mode="aspectFill" class="goods-image"></image>
							<view class="goods-info">
								<view class="goods-name">{{goods.name}}</view>
								<view class="goods-price">¥{{goods.price}}</view>
								<view class="goods-count">x{{goods.count}}</view>
							</view>
						</view>
					</view>
					
					<view class="order-info">
						<view class="info-item">
							<text class="label">会员：</text>
							<text class="value">{{item.memberName}}</text>
						</view>
						<view class="info-item">
							<text class="label">下单时间：</text>
							<text class="value">{{item.createTime}}</text>
						</view>
						<view class="info-item">
							<text class="label">订单金额：</text>
							<text class="value price">¥{{item.totalAmount}}</text>
						</view>
					</view>
				</view>
				
				<view class="sales-footer">
					<button class="action-btn" @tap.stop="handleAction(item)">{{getActionText(item.status)}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchKey: '',
			currentStatus: 'all',
			statusOptions: [
				{ label: '全部', value: 'all' },
				{ label: '待付款', value: 'unpaid' },
				{ label: '待发货', value: 'unshipped' },
				{ label: '待收货', value: 'shipped' },
				{ label: '已完成', value: 'completed' },
				{ label: '已取消', value: 'cancelled' }
			],
			salesList: [
				{
					id: 1,
					orderNo: '202403010001',
					status: 'unpaid',
					memberName: '张三',
					createTime: '2024-03-01 10:00:00',
					totalAmount: 199.99,
					goodsList: [
						{
							name: '示例商品1',
							price: 99.99,
							count: 1,
							image: '/static/images/goods1.jpg'
						},
						{
							name: '示例商品2',
							price: 100.00,
							count: 1,
							image: '/static/images/goods2.jpg'
						}
					]
				}
			]
		}
	},
	methods: {
		handleSearch() {
			// TODO: 实现搜索功能
			console.log('搜索关键词:', this.searchKey)
		},
		showFilter() {
			// TODO: 显示筛选弹窗
			uni.showToast({
				title: '筛选功能开发中',
				icon: 'none'
			})
		},
		handleStatusChange(status) {
			this.currentStatus = status
			// TODO: 根据状态筛选订单
		},
		getStatusText(status) {
			const statusMap = {
				unpaid: '待付款',
				unshipped: '待发货',
				shipped: '待收货',
				completed: '已完成',
				cancelled: '已取消'
			}
			return statusMap[status] || status
		},
		getActionText(status) {
			const actionMap = {
				unpaid: '确认付款',
				unshipped: '确认发货',
				shipped: '确认收货',
				completed: '查看详情',
				cancelled: '查看详情'
			}
			return actionMap[status] || '查看详情'
		},
		handleAction(item) {
			switch(item.status) {
				case 'unpaid':
					// TODO: 确认付款
					uni.showModal({
						title: '提示',
						content: '确定要确认付款吗？',
						success: (res) => {
							if (res.confirm) {
								uni.showToast({
									title: '付款成功',
									icon: 'success'
								})
							}
						}
					})
					break
				case 'unshipped':
					// TODO: 确认发货
					uni.showModal({
						title: '提示',
						content: '确定要确认发货吗？',
						success: (res) => {
							if (res.confirm) {
								uni.showToast({
									title: '发货成功',
									icon: 'success'
								})
							}
						}
					})
					break
				case 'shipped':
					// TODO: 确认收货
					uni.showModal({
						title: '提示',
						content: '确定要确认收货吗？',
						success: (res) => {
							if (res.confirm) {
								uni.showToast({
									title: '收货成功',
									icon: 'success'
								})
							}
						}
					})
					break
				default:
					this.handleView(item)
			}
		},
		handleView(item) {
			uni.navigateTo({
				url: `/pages/order/sales-detail?id=${item.id}`
			})
		}
	}
}
</script>

<style lang="scss">
.sales-container {
	padding: 20rpx;
	
	.search-box {
		display: flex;
		margin-bottom: 20rpx;
		
		input {
			flex: 1;
			height: 70rpx;
			padding: 0 20rpx;
			border: 1px solid #ddd;
			border-radius: 8rpx;
			margin-right: 20rpx;
		}
		
		.filter-btn {
			width: 120rpx;
			height: 70rpx;
			line-height: 70rpx;
			background-color: #fff;
			color: #333;
			font-size: 28rpx;
			border-radius: 8rpx;
		}
	}
	
	.status-tabs {
		display: flex;
		background-color: #fff;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
		overflow-x: auto;
		
		.tab-item {
			flex-shrink: 0;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
			color: #666;
			position: relative;
			
			&.active {
				color: #3cc51f;
				
				&::after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 40rpx;
					height: 4rpx;
					background-color: #3cc51f;
					border-radius: 2rpx;
				}
			}
		}
	}
	
	.sales-list {
		.sales-item {
			background-color: #fff;
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			
			.sales-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				border-bottom: 1px solid #f5f5f5;
				
				.order-no {
					font-size: 28rpx;
					color: #333;
				}
				
				.order-status {
					font-size: 24rpx;
					
					&.unpaid {
						color: #f56c6c;
					}
					
					&.unshipped {
						color: #e6a23c;
					}
					
					&.shipped {
						color: #409eff;
					}
					
					&.completed {
						color: #67c23a;
					}
					
					&.cancelled {
						color: #909399;
					}
				}
			}
			
			.sales-content {
				padding: 20rpx;
				
				.goods-list {
					margin-bottom: 20rpx;
					
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
							
							.goods-price {
								color: #f56c6c;
								font-size: 28rpx;
								margin-bottom: 10rpx;
							}
							
							.goods-count {
								color: #909399;
								font-size: 24rpx;
							}
						}
					}
				}
				
				.order-info {
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
				}
			}
			
			.sales-footer {
				padding: 20rpx;
				border-top: 1px solid #f5f5f5;
				text-align: right;
				
				.action-btn {
					display: inline-block;
					height: 60rpx;
					line-height: 60rpx;
					padding: 0 30rpx;
					background-color: #3cc51f;
					color: #fff;
					font-size: 24rpx;
					border-radius: 30rpx;
				}
			}
		}
	}
}
</style> 