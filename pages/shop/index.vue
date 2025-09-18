<template>
	<view class="shop-container">
		<view class="search-box">
			<input type="text" v-model="searchKey" placeholder="搜索店铺名称/地址" @confirm="handleSearch" />
			<button class="filter-btn" @tap="showFilter">筛选</button>
		</view>
		
		<view class="shop-list">
			<view class="shop-item" v-for="(item, index) in shopList" :key="index" @tap="handleDetail(item)">
				<view class="shop-header">
					<image :src="item.logo" mode="aspectFill" class="shop-logo"></image>
					<view class="shop-info">
						<view class="shop-name">{{item.name}}</view>
						<view class="shop-status" :class="item.status">{{getStatusText(item.status)}}</view>
					</view>
				</view>
				
				<view class="shop-content">
					<view class="info-item">
						<text class="label">地址：</text>
						<text class="value">{{item.address}}</text>
					</view>
					<view class="info-item">
						<text class="label">电话：</text>
						<text class="value">{{item.phone}}</text>
					</view>
					<view class="info-item">
						<text class="label">营业时间：</text>
						<text class="value">{{item.businessHours}}</text>
					</view>
					<view class="info-item">
						<text class="label">商品数量：</text>
						<text class="value">{{item.goodsCount}}件</text>
					</view>
					<view class="info-item">
						<text class="label">订单数量：</text>
						<text class="value">{{item.orderCount}}单</text>
					</view>
				</view>
				
				<view class="shop-footer">
					<button class="action-btn" @tap.stop="handleEdit(item)">编辑</button>
					<button class="action-btn" @tap.stop="handleDelete(item)">删除</button>
				</view>
			</view>
		</view>
		
		<view class="add-btn" @tap="handleAdd">
			<text class="iconfont icon-add"></text>
			<text>添加店铺</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchKey: '',
			shopList: [
				{
					id: 1,
					name: '示例店铺1',
					logo: '/static/images/shop1.jpg',
					status: 'normal',
					address: '广东省深圳市南山区科技园',
					phone: '0755-88888888',
					businessHours: '09:00-22:00',
					goodsCount: 100,
					orderCount: 50
				},
				{
					id: 2,
					name: '示例店铺2',
					logo: '/static/images/shop2.jpg',
					status: 'closed',
					address: '广东省深圳市福田区华强北',
					phone: '0755-99999999',
					businessHours: '10:00-21:00',
					goodsCount: 80,
					orderCount: 30
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
		getStatusText(status) {
			const statusMap = {
				normal: '营业中',
				closed: '已关闭',
				maintenance: '维护中'
			}
			return statusMap[status] || status
		},
		handleDetail(item) {
			uni.navigateTo({
				url: `/pages/shop/detail?id=${item.id}`
			})
		},
		handleEdit(item) {
			uni.navigateTo({
				url: `/pages/shop/edit?id=${item.id}`
			})
		},
		handleDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该店铺吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用删除接口
						uni.showLoading({
							title: '删除中...'
						})
						setTimeout(() => {
							uni.hideLoading()
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							})
						}, 1000)
					}
				}
			})
		},
		handleAdd() {
			uni.navigateTo({
				url: '/pages/shop/edit'
			})
		}
	}
}
</script>

<style lang="scss">
.shop-container {
	padding: 20rpx;
	padding-bottom: 120rpx;
	
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
	
	.shop-list {
		.shop-item {
			background-color: #fff;
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			
			.shop-header {
				display: flex;
				padding: 20rpx;
				border-bottom: 1px solid #f5f5f5;
				
				.shop-logo {
					width: 100rpx;
					height: 100rpx;
					border-radius: 8rpx;
					margin-right: 20rpx;
				}
				
				.shop-info {
					flex: 1;
					
					.shop-name {
						font-size: 32rpx;
						color: #333;
						margin-bottom: 10rpx;
					}
					
					.shop-status {
						font-size: 24rpx;
						
						&.normal {
							color: #67c23a;
						}
						
						&.closed {
							color: #f56c6c;
						}
						
						&.maintenance {
							color: #e6a23c;
						}
					}
				}
			}
			
			.shop-content {
				padding: 20rpx;
				
				.info-item {
					display: flex;
					margin-bottom: 10rpx;
					font-size: 28rpx;
					
					&:last-child {
						margin-bottom: 0;
					}
					
					.label {
						color: #666;
						width: 160rpx;
					}
					
					.value {
						color: #333;
						flex: 1;
					}
				}
			}
			
			.shop-footer {
				padding: 20rpx;
				border-top: 1px solid #f5f5f5;
				display: flex;
				justify-content: flex-end;
				
				.action-btn {
					height: 60rpx;
					line-height: 60rpx;
					padding: 0 30rpx;
					font-size: 24rpx;
					border-radius: 30rpx;
					margin-left: 20rpx;
					
					&:first-child {
						background-color: #3cc51f;
						color: #fff;
					}
					
					&:last-child {
						background-color: #f56c6c;
						color: #fff;
					}
				}
			}
		}
	}
	
	.add-btn {
		position: fixed;
		left: 50%;
		bottom: 40rpx;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #3cc51f;
		color: #fff;
		font-size: 32rpx;
		border-radius: 40rpx;
		text-align: center;
		
		.iconfont {
			margin-right: 10rpx;
		}
	}
}
</style> 