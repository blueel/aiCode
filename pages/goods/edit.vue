<template>
	<view class="edit-container">
		<view class="form">
			<view class="form-item">
				<text class="label">商品名称</text>
				<input type="text" v-model="formData.name" placeholder="请输入商品名称" />
			</view>
			
			<view class="form-item">
				<text class="label">商品价格</text>
				<input type="number" v-model="formData.price" placeholder="请输入商品价格" />
			</view>
			
			<view class="form-item">
				<text class="label">商品库存</text>
				<input type="number" v-model="formData.stock" placeholder="请输入商品库存" />
			</view>
			
			<view class="form-item">
				<text class="label">商品图片</text>
				<view class="upload-box" @tap="chooseImage">
					<image v-if="formData.image" :src="formData.image" mode="aspectFill" class="preview-image"></image>
					<view v-else class="upload-placeholder">
						<text class="iconfont icon-camera"></text>
						<text>点击上传图片</text>
					</view>
				</view>
			</view>
			
			<view class="form-item">
				<text class="label">商品描述</text>
				<textarea v-model="formData.description" placeholder="请输入商品描述" />
			</view>
		</view>
		
		<view class="action-buttons">
			<button class="save-btn" @tap="handleSave">保存</button>
			<button class="cancel-btn" @tap="handleCancel">取消</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				name: '',
				price: '',
				stock: '',
				image: '',
				description: ''
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			// TODO: 根据ID获取商品详情
			this.getGoodsDetail(options.id)
		}
	},
	methods: {
		getGoodsDetail(id) {
			// TODO: 调用获取商品详情接口
			uni.showLoading({
				title: '加载中...'
			})
			setTimeout(() => {
				uni.hideLoading()
				// 模拟数据
				this.formData = {
					name: '示例商品',
					price: '99.99',
					stock: '100',
					image: '/static/images/goods1.jpg',
					description: '这是一个示例商品描述'
				}
			}, 1000)
		},
		chooseImage() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.formData.image = res.tempFilePaths[0]
				}
			})
		},
		handleSave() {
			if (!this.formData.name) {
				uni.showToast({
					title: '请输入商品名称',
					icon: 'none'
				})
				return
			}
			if (!this.formData.price) {
				uni.showToast({
					title: '请输入商品价格',
					icon: 'none'
				})
				return
			}
			if (!this.formData.stock) {
				uni.showToast({
					title: '请输入商品库存',
					icon: 'none'
				})
				return
			}
			
			// TODO: 调用保存接口
			uni.showLoading({
				title: '保存中...'
			})
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '保存成功',
					icon: 'success'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}, 1500)
		},
		handleCancel() {
			uni.navigateBack()
		}
	}
}
</script>

<style lang="scss">
.edit-container {
	padding: 20rpx;
	
	.form {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 20rpx;
		
		.form-item {
			margin-bottom: 30rpx;
			
			.label {
				display: block;
				font-size: 28rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			input, textarea {
				width: 100%;
				padding: 20rpx;
				border: 1px solid #ddd;
				border-radius: 8rpx;
				font-size: 28rpx;
			}
			
			textarea {
				height: 200rpx;
			}
			
			.upload-box {
				width: 200rpx;
				height: 200rpx;
				border: 1px dashed #ddd;
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				
				.preview-image {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}
				
				.upload-placeholder {
					text-align: center;
					
					.iconfont {
						font-size: 48rpx;
						color: #999;
						margin-bottom: 10rpx;
					}
					
					text {
						display: block;
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}
	}
	
	.action-buttons {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		
		button {
			width: 45%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			
			&.save-btn {
				background-color: #3cc51f;
				color: #fff;
			}
			
			&.cancel-btn {
				background-color: #f5f5f5;
				color: #333;
			}
		}
	}
}
</style> 