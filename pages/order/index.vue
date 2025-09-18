<template>
	<view class="order-container">
		<view class="search-box">
			<input type="text" v-model="searchKey" placeholder="搜索订单号/会员名称" @confirm="handleSearch" />
			<button class="filter-btn" @tap="showFilter">筛选</button>
		</view>
		
		<view class="status-tabs">
			<view 
				class="tab-item" 
				v-for="(item, index) in statusOptions" 
				:key="index"
				:class="{ active: currentStatus === item.value }"
				@tap="handleStatusChange(item.value)"
			>
				{{item.label}}
			</view>
		</view>
		
		<view class="order-list">
			<view class="order-item" v-for="(item, index) in orderList" :key="index">
				<view class="order-header">
					<text class="order-no">订单号：{{item.orderNo}}</text>
					<text class="order-status" :class="item.status">{{getStatusText(item.status)}}</text>
				</view>
				
				<view class="order-content">
					<view class="goods-list">
						<view class="goods-item" v-for="(goods, goodsIndex) in item.goodsList" :key="goodsIndex">
							<image :src="goods.image" mode="aspectFill" class="goods-image"></image>
							<view class="goods-info">
								<view class="goods-name">{{goods.name}}</view>
								<view class="goods-spec">{{goods.spec}}</view>
								<view class="goods-price-count">
									<text class="price">¥{{goods.price}}</text>
									<text class="count">x{{goods.count}}</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="order-info">
						<view class="info-item">
							<text class="label">会员名称：</text>
							<text class="value">{{item.memberName}}</text>
						</view>
						<view class="info-item">
							<text class="label">订单金额：</text>
							<text class="value price">¥{{item.payAmount}}</text>
						</view>
						<view class="info-item">
							<text class="label">下单时间：</text>
							<text class="value">{{item.createTime}}</text>
						</view>
					</view>
				</view>
				
				<view class="order-footer">
					<button class="action-btn" @tap="handleDetail(item)">查看详情</button>
					<button class="action-btn" v-if="item.status === 'unpaid'" @tap="handlePay(item)">确认支付</button>
					<button class="action-btn" v-if="item.status === 'unshipped'" @tap="handleShip(item)">确认发货</button>
					<button class="action-btn" v-if="item.status === 'shipped'" @tap="handleReceive(item)">确认收货</button>
					<button class="action-btn" v-if="item.status === 'completed'" @tap="handleDelete(item)">删除订单</button>
					<button class="action-btn" v-if="item.status === 'cancelled'" @tap="handleDelete(item)">删除订单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getOrderList, payOrder, shipOrder, receiveOrder, deleteOrder } from '@/api/order'
import OrderNav from '@/components/business/order-nav.vue'

export default {
	data() {
		return {
			searchKey: '',
			currentStatus: 'all',
			statusOptions: [
				{ label: '全部', value: 'all' },
				{ label: '待支付', value: 'unpaid' },
				{ label: '待发货', value: 'unshipped' },
				{ label: '已发货', value: 'shipped' },
				{ label: '已完成', value: 'completed' },
				{ label: '已取消', value: 'cancelled' }
			],
			orderList: [
				{
					id: 1,
					orderNo: '202403010001',
					status: 'unpaid',
					memberName: '张三',
					createTime: '2024-03-01 10:00:00',
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
			]
		}
	},
	onLoad() {
		this.getOrderList()
	},
	methods: {
		getOrderList() {
			const params = {
				keyword: this.searchKey,
				status: this.currentStatus === 'all' ? '' : this.currentStatus
			}
			getOrderList(params).then(res => {
				this.orderList = res.data
			})
		},
		handleSearch() {
			this.getOrderList()
		},
		showFilter() {
			uni.showToast({
				title: '筛选功能开发中',
				icon: 'none'
			})
		},
		handleStatusChange(status) {
			this.currentStatus = status
			this.getOrderList()
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
		handleDetail(item) {
			uni.navigateTo({
				url: `/pages/order/detail?id=${item.id}`
			})
		},
		handlePay(item) {
			uni.showModal({
				title: '提示',
				content: '确定要支付该订单吗？',
				success: (res) => {
					if (res.confirm) {
						payOrder(item.id).then(() => {
							uni.showToast({
								title: '支付成功',
								icon: 'success'
							})
							this.getOrderList()
						})
					}
				}
			})
		},
		handleShip(item) {
			uni.showModal({
				title: '提示',
				content: '确定要发货吗？',
				success: (res) => {
					if (res.confirm) {
						shipOrder(item.id).then(() => {
							uni.showToast({
								title: '发货成功',
								icon: 'success'
							})
							this.getOrderList()
						})
					}
				}
			})
		},
		handleReceive(item) {
			uni.showModal({
				title: '提示',
				content: '确定要确认收货吗？',
				success: (res) => {
					if (res.confirm) {
						receiveOrder(item.id).then(() => {
							uni.showToast({
								title: '收货成功',
								icon: 'success'
							})
							this.getOrderList()
						})
					}
				}
			})
		},
		handleDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该订单吗？',
				success: (res) => {
					if (res.confirm) {
						deleteOrder(item.id).then(() => {
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							})
							this.getOrderList()
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.order-container {
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
			color: #666;
			font-size: 28rpx;
			border: 1px solid #ddd;
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
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 28rpx;
			color: #666;
			position: relative;
			
			&.active {
				color: #3cc51f;
				font-weight: bold;
				
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 40rpx;
					height: 4rpx;
					background-color: #3cc51f;
					border-radius: 2rpx;
				}
			}
		}
	}
	
	.order-list {
		.order-item {
			background: #fff;
			border-radius: 16rpx;
			box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.06);
			margin-bottom: 24rpx;
			padding: 32rpx;
			
			.order-header {
				margin-bottom: 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.order-status {
					font-size: 28rpx;
					padding: 8rpx 16rpx;
					border-radius: 8rpx;
					
					&--pending {
						background: #fff3e0;
						color: #ffa726;
					}
					&--shipped {
						background: #e3f2fd;
						color: #42a5f5;
					}
					&--completed {
						background: #e8f5e9;
						color: #66bb6a;
					}
				}
			}
			
			.order-nav {
				.nav-item {
					transition: all 0.3s ease;
					
					&:hover {
						background: #f8f9fa;
						transform: translateX(8rpx);
					}
					
					&.active {
						background: #e8f5e9;
						border-left: 8rpx solid #3cc51f;
					}
				}
			}
			margin-bottom: 20rpx;
			overflow: hidden;
			
			.order-header {
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
			
			.order-content {
				padding: 20rpx;
				
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
				
				.order-info {
					margin-top: 20rpx;
					padding-top: 20rpx;
					border-top: 1px solid #f5f5f5;
					
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
			
			.order-footer {
				display: flex;
				justify-content: flex-end;
				padding: 20rpx;
				border-top: 1px solid #f5f5f5;
				
				.action-btn {
					height: 60rpx;
					line-height: 60rpx;
					padding: 0 30rpx;
					font-size: 24rpx;
					margin-left: 20rpx;
					border-radius: 30rpx;
					
					&:first-child {
						background-color: #fff;
						color: #666;
						border: 1px solid #ddd;
					}
					
					&:last-child {
						background-color: #3cc51f;
						color: #fff;
					}
				}
			}
		}
	}
}
</style> 

<style lang="scss" scoped>
.order-container {
  display: flex;
  height: 100vh;

  .nav-sidebar {
    flex-shrink: 0;
  }

  .content-main {
    flex: 1;
    padding: 20rpx;
    overflow: auto;
  }
}
</style>