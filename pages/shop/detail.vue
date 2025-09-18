<template>
	<view class="detail-container">
		<view class="shop-header">
			<image :src="shopInfo.logo" mode="aspectFill" class="shop-logo"></image>
			<view class="shop-info">
				<view class="shop-name">{{shopInfo.name}}</view>
				<view class="shop-status" :class="shopInfo.status">{{getStatusText(shopInfo.status)}}</view>
			</view>
		</view>
		
		<view class="info-box">
			<view class="info-item">
				<text class="label">店铺地址</text>
				<text class="value">{{shopInfo.address}}</text>
			</view>
			<view class="info-item">
				<text class="label">联系电话</text>
				<text class="value">{{shopInfo.phone}}</text>
			</view>
			<view class="info-item">
				<text class="label">营业时间</text>
				<text class="value">{{shopInfo.businessHours}}</text>
			</view>
			<view class="info-item">
				<text class="label">创建时间</text>
				<text class="value">{{shopInfo.createTime}}</text>
			</view>
		</view>
		
		<view class="data-box">
			<view class="data-item">
				<text class="num">{{shopInfo.goodsCount}}</text>
				<text class="label">商品数量</text>
			</view>
			<view class="data-item">
				<text class="num">{{shopInfo.orderCount}}</text>
				<text class="label">订单数量</text>
			</view>
			<view class="data-item">
				<text class="num">¥{{shopInfo.totalAmount}}</text>
				<text class="label">总销售额</text>
			</view>
		</view>
		
		<view class="desc-box">
			<view class="title">店铺简介</view>
			<view class="content">{{shopInfo.description}}</view>
		</view>
		
		<view class="action-buttons">
			<button class="action-btn" @tap="handleEdit">编辑</button>
			<button class="action-btn" @tap="handleDelete">删除</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			shopInfo: {
				id: 1,
				name: '示例店铺',
				logo: '/static/images/shop1.jpg',
				status: 'normal',
				address: '广东省深圳市南山区科技园',
				phone: '0755-88888888',
				businessHours: '09:00-22:00',
				createTime: '2024-03-01 10:00:00',
				goodsCount: 100,
				orderCount: 50,
				totalAmount: 99999.99,
				description: '这是一家示例店铺，主要经营各类商品。'
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			this.getShopDetail(options.id)
		}
	},
	methods: {
		getShopDetail(id) {
			// TODO: 调用获取店铺详情接口
			uni.showLoading({
				title: '加载中...'
			})
			setTimeout(() => {
				uni.hideLoading()
				// 模拟数据
			}, 1000)
		},
		getStatusText(status) {
			const statusMap = {
				normal: '营业中',
				closed: '已关闭',
				maintenance: '维护中'
			}
			return statusMap[status] || status
		},
		handleEdit() {
			uni.navigateTo({
				url: `/pages/shop/edit?id=${this.shopInfo.id}`
			})
		},
		handleDelete() {
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
							setTimeout(() => {
								uni.navigateBack()
							}, 1500)
						}, 1000)
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.detail-container {
	padding: 20rpx;
	padding-bottom: 120rpx;
	
	.shop-header {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 30rpx;
		display: flex;
		margin-bottom: 20rpx;
		
		.shop-logo {
			width: 160rpx;
			height: 160rpx;
			border-radius: 8rpx;
			margin-right: 30rpx;
		}
		
		.shop-info {
			flex: 1;
			
			.shop-name {
				font-size: 36rpx;
				color: #333;
				font-weight: bold;
				margin-bottom: 20rpx;
			}
			
			.shop-status {
				font-size: 28rpx;
				
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
	
	.info-box {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.info-item {
			display: flex;
			margin-bottom: 20rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.label {
				width: 160rpx;
				color: #666;
				font-size: 28rpx;
			}
			
			.value {
				flex: 1;
				color: #333;
				font-size: 28rpx;
			}
		}
	}
	
	.data-box {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-around;
		
		.data-item {
			text-align: center;
			
			.num {
				display: block;
				font-size: 36rpx;
				color: #333;
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			
			.label {
				font-size: 24rpx;
				color: #666;
			}
		}
	}
	
	.desc-box {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 30rpx;
		
		.title {
			font-size: 32rpx;
			color: #333;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		
		.content {
			font-size: 28rpx;
			color: #666;
			line-height: 1.6;
		}
	}
	
	.action-buttons {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx;
		background-color: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		display: flex;
		justify-content: space-between;
		
		.action-btn {
			width: 48%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			
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
</style> 