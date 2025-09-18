<template>
	<view class="goods-container">
		<view class="search-box">
			<input type="text" v-model="searchKey" placeholder="搜索商品" @confirm="handleSearch" />
			<button class="add-btn" @tap="handleAdd">添加商品</button>
		</view>
		
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in goodsList" :key="index">
				<image :src="item.image" mode="aspectFill" class="goods-image"></image>
				<view class="goods-info">
					<view class="goods-name">{{item.name}}</view>
					<view class="goods-price">¥{{item.price}}</view>
					<view class="goods-stock">库存: {{item.stock}}</view>
				</view>
				<view class="goods-actions">
					<button class="edit-btn" @tap="handleEdit(item)">编辑</button>
					<button class="delete-btn" @tap="handleDelete(item)">删除</button>
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
			goodsList: [
				{
					id: 1,
					name: '示例商品1',
					price: 99.99,
					stock: 100,
					image: '/static/images/goods1.jpg'
				},
				{
					id: 2,
					name: '示例商品2',
					price: 199.99,
					stock: 50,
					image: '/static/images/goods2.jpg'
				}
			]
		}
	},
	methods: {
		handleSearch() {
			// TODO: 实现搜索功能
			console.log('搜索关键词:', this.searchKey)
		},
		handleAdd() {
			uni.navigateTo({
				url: '/pages/goods/edit'
			})
		},
		handleEdit(item) {
			uni.navigateTo({
				url: `/pages/goods/edit?id=${item.id}`
			})
		},
		handleDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该商品吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用删除接口
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.goods-container {
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
		
		.add-btn {
			width: 160rpx;
			height: 70rpx;
			line-height: 70rpx;
			background-color: #3cc51f;
			color: #fff;
			font-size: 28rpx;
			border-radius: 8rpx;
		}
	}
	
	.goods-list {
		.goods-item {
			display: flex;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			
			.goods-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 8rpx;
				margin-right: 20rpx;
			}
			
			.goods-info {
				flex: 1;
				
				.goods-name {
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				
				.goods-price {
					color: #f56c6c;
					font-size: 28rpx;
					margin-bottom: 10rpx;
				}
				
				.goods-stock {
					color: #909399;
					font-size: 24rpx;
				}
			}
			
			.goods-actions {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				button {
					width: 120rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 24rpx;
					padding: 0;
					
					&.edit-btn {
						background-color: #409eff;
						color: #fff;
					}
					
					&.delete-btn {
						background-color: #f56c6c;
						color: #fff;
					}
				}
			}
		}
	}
}
</style> 