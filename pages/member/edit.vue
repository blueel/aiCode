<template>
	<view class="edit-container">
		<view class="form">
			<view class="form-item">
				<text class="label">会员头像</text>
				<view class="upload-box" @tap="chooseImage">
					<image v-if="formData.avatar" :src="formData.avatar" mode="aspectFill" class="preview-image"></image>
					<view v-else class="upload-placeholder">
						<text class="iconfont icon-camera"></text>
						<text>点击上传头像</text>
					</view>
				</view>
			</view>
			
			<view class="form-item">
				<text class="label">会员姓名</text>
				<input type="text" v-model="formData.name" placeholder="请输入会员姓名" />
			</view>
			
			<view class="form-item">
				<text class="label">手机号码</text>
				<input type="number" v-model="formData.phone" placeholder="请输入手机号码" />
			</view>
			
			<view class="form-item">
				<text class="label">会员等级</text>
				<picker mode="selector" :range="levelOptions" @change="handleLevelChange">
					<view class="picker-value">
						<text>{{formData.level || '请选择会员等级'}}</text>
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</picker>
			</view>
			
			<view class="form-item">
				<text class="label">注册时间</text>
				<picker mode="date" @change="handleDateChange">
					<view class="picker-value">
						<text>{{formData.registerTime || '请选择注册时间'}}</text>
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</picker>
			</view>
			
			<view class="form-item">
				<text class="label">备注信息</text>
				<textarea v-model="formData.remark" placeholder="请输入备注信息" />
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
			levelOptions: ['普通会员', '白银会员', '黄金会员', '钻石会员'],
			formData: {
				avatar: '',
				name: '',
				phone: '',
				level: '',
				registerTime: '',
				remark: ''
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			// TODO: 根据ID获取会员详情
			this.getMemberDetail(options.id)
		}
	},
	methods: {
		getMemberDetail(id) {
			// TODO: 调用获取会员详情接口
			uni.showLoading({
				title: '加载中...'
			})
			setTimeout(() => {
				uni.hideLoading()
				// 模拟数据
				this.formData = {
					avatar: '/static/images/avatar1.jpg',
					name: '张三',
					phone: '13800138000',
					level: '普通会员',
					registerTime: '2024-01-01',
					remark: '这是一个示例会员'
				}
			}, 1000)
		},
		chooseImage() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.formData.avatar = res.tempFilePaths[0]
				}
			})
		},
		handleLevelChange(e) {
			this.formData.level = this.levelOptions[e.detail.value]
		},
		handleDateChange(e) {
			this.formData.registerTime = e.detail.value
		},
		handleSave() {
			if (!this.formData.name) {
				uni.showToast({
					title: '请输入会员姓名',
					icon: 'none'
				})
				return
			}
			if (!this.formData.phone) {
				uni.showToast({
					title: '请输入手机号码',
					icon: 'none'
				})
				return
			}
			if (!this.formData.level) {
				uni.showToast({
					title: '请选择会员等级',
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
			
			.picker-value {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;
				padding: 0 20rpx;
				border: 1px solid #ddd;
				border-radius: 8rpx;
				font-size: 28rpx;
				
				.iconfont {
					color: #999;
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