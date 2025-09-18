<template>
	<view class="edit-container">
		<view class="form-box">
			<view class="form-item">
				<text class="label">店铺名称</text>
				<input type="text" v-model="formData.name" placeholder="请输入店铺名称" />
			</view>
			
			<view class="form-item">
				<text class="label">店铺Logo</text>
				<view class="upload-box" @tap="chooseImage">
					<image v-if="formData.logo" :src="formData.logo" mode="aspectFill" class="preview-image"></image>
					<view v-else class="upload-placeholder">
						<text class="iconfont icon-camera"></text>
						<text>点击上传</text>
					</view>
				</view>
			</view>
			
			<view class="form-item">
				<text class="label">店铺状态</text>
				<picker :range="statusOptions" :value="statusIndex" @change="handleStatusChange">
					<view class="picker-value">{{statusOptions[statusIndex]}}</view>
				</picker>
			</view>
			
			<view class="form-item">
				<text class="label">店铺地址</text>
				<input type="text" v-model="formData.address" placeholder="请输入店铺地址" />
			</view>
			
			<view class="form-item">
				<text class="label">联系电话</text>
				<input type="number" v-model="formData.phone" placeholder="请输入联系电话" />
			</view>
			
			<view class="form-item">
				<text class="label">营业时间</text>
				<input type="text" v-model="formData.businessHours" placeholder="请输入营业时间，如：09:00-22:00" />
			</view>
			
			<view class="form-item">
				<text class="label">店铺简介</text>
				<textarea v-model="formData.description" placeholder="请输入店铺简介" />
			</view>
		</view>
		
		<view class="action-buttons">
			<button class="action-btn" @tap="handleSave">保存</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				name: '',
				logo: '',
				status: 'normal',
				address: '',
				phone: '',
				businessHours: '',
				description: ''
			},
			statusOptions: ['营业中', '已关闭', '维护中'],
			statusIndex: 0
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
				this.formData = {
					name: '示例店铺',
					logo: '/static/images/shop1.jpg',
					status: 'normal',
					address: '广东省深圳市南山区科技园',
					phone: '0755-88888888',
					businessHours: '09:00-22:00',
					description: '这是一家示例店铺'
				}
				this.statusIndex = this.statusOptions.indexOf(this.getStatusText(this.formData.status))
			}, 1000)
		},
		chooseImage() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.formData.logo = res.tempFilePaths[0]
				}
			})
		},
		handleStatusChange(e) {
			this.statusIndex = e.detail.value
			const statusMap = {
				0: 'normal',
				1: 'closed',
				2: 'maintenance'
			}
			this.formData.status = statusMap[e.detail.value]
		},
		getStatusText(status) {
			const statusMap = {
				normal: '营业中',
				closed: '已关闭',
				maintenance: '维护中'
			}
			return statusMap[status] || status
		},
		handleSave() {
			if (!this.formData.name) {
				uni.showToast({
					title: '请输入店铺名称',
					icon: 'none'
				})
				return
			}
			
			if (!this.formData.logo) {
				uni.showToast({
					title: '请上传店铺Logo',
					icon: 'none'
				})
				return
			}
			
			if (!this.formData.address) {
				uni.showToast({
					title: '请输入店铺地址',
					icon: 'none'
				})
				return
			}
			
			if (!this.formData.phone) {
				uni.showToast({
					title: '请输入联系电话',
					icon: 'none'
				})
				return
			}
			
			if (!this.formData.businessHours) {
				uni.showToast({
					title: '请输入营业时间',
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
			}, 1000)
		}
	}
}
</script>

<style lang="scss">
.edit-container {
	padding: 20rpx;
	padding-bottom: 120rpx;
	
	.form-box {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 20rpx;
		
		.form-item {
			margin-bottom: 30rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.label {
				display: block;
				font-size: 28rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			input, textarea {
				width: 100%;
				height: 80rpx;
				padding: 0 20rpx;
				border: 1px solid #ddd;
				border-radius: 8rpx;
				font-size: 28rpx;
			}
			
			textarea {
				height: 200rpx;
				padding: 20rpx;
			}
			
			.upload-box {
				width: 200rpx;
				height: 200rpx;
				border: 1px dashed #ddd;
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
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
			
			.picker-value {
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 20rpx;
				border: 1px solid #ddd;
				border-radius: 8rpx;
				font-size: 28rpx;
			}
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
		
		.action-btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #3cc51f;
			color: #fff;
			font-size: 32rpx;
			border-radius: 8rpx;
		}
	}
}
</style> 