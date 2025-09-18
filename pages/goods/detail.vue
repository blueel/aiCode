<template>
	<view class="goods-detail-container">
		<view class="goods-info">
			<view class="goods-image">
				<image :src="goodsInfo.image" mode="aspectFill"></image>
			</view>
			<view class="goods-content">
				<view class="goods-name">{{goodsInfo.name}}</view>
				<view class="goods-price">¥{{goodsInfo.price}}</view>
				<view class="goods-spec">{{goodsInfo.spec}}</view>
			</view>
		</view>
		
		<view class="goods-desc">
			<view class="section-title">商品描述</view>
			<view class="desc-content">{{goodsInfo.description}}</view>
		</view>
		
		<view class="goods-actions">
			<button class="action-btn" @tap="handleEdit">编辑商品</button>
			<button class="action-btn delete" @tap="handleDelete">删除商品</button>
		</view>
	</view>
</template>

<script>
import { getGoodsDetail, deleteGoods } from '@/api/goods'

export default {
	data() {
		return {
			goodsId: '',
			goodsInfo: {
				id: 1,
				name: '示例商品',
				price: 99.99,
				spec: '规格：默认',
				description: '这是一个示例商品描述',
				image: '/static/images/goods1.jpg'
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			this.goodsId = options.id
			this.getDetail()
		}
	},
	methods: {
		getDetail() {
			getGoodsDetail(this.goodsId).then(res => {
				this.goodsInfo = res.data
			})
		},
		handleEdit() {
			uni.navigateTo({
				url: `/pages/goods/edit?id=${this.goodsId}`
			})
		},
		handleDelete() {
			uni.showModal({
				title: '提示',
				content: '确定要删除该商品吗？',
				success: (res) => {
					if (res.confirm) {
						deleteGoods(this.goodsId).then(() => {
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 2000,
								success: () => {
									setTimeout(() => {
										uni.navigateBack()
									}, 2000)
								}
							})
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.goods-detail-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 120rpx;
	
	.goods-info {
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		
		.goods-image {
			width: 100%;
			height: 400rpx;
			margin-bottom: 20rpx;
			
			image {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
		}
		
		.goods-content {
			.goods-name {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			.goods-price {
				font-size: 36rpx;
				color: #f56c6c;
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			
			.goods-spec {
				font-size: 28rpx;
				color: #666;
			}
		}
	}
	
	.goods-desc {
		background-color: #fff;
		padding: 20rpx;
		
		.section-title {
			font-size: 28rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #f5f5f5;
		}
		
		.desc-content {
			font-size: 28rpx;
			color: #666;
			line-height: 1.6;
		}
	}
	
	.goods-actions {
		padding: 30rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		
		.action-btn {
			width: 45%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			border-radius: 40rpx;
			background-color: #3cc51f;
			color: #fff;
			
			&.delete {
				background-color: #f56c6c;
			}
		}
	}
}
</style> 