<template>
	<view class="abnormal-handle-container">
		<view class="handle-form">
			<view class="form-section">
				<view class="section-title">处理结果</view>
				<radio-group class="radio-group" @change="handleResultChange">
					<label class="radio-item" v-for="(item, index) in resultOptions" :key="index">
						<radio :value="item.value" :checked="result === item.value" />
						<text class="radio-text">{{item.label}}</text>
					</label>
				</radio-group>
			</view>
			
			<view class="form-section">
				<view class="section-title">处理备注</view>
				<textarea 
					class="remark-input" 
					v-model="remark" 
					placeholder="请输入处理备注（选填）" 
					maxlength="200"
					@input="handleRemarkInput"
				></textarea>
				<view class="word-count">{{remark.length}}/200</view>
			</view>
		</view>
		
		<view class="handle-actions">
			<button 
				class="action-btn primary" 
				:disabled="!result"
				@tap="handleSubmit"
			>
				提交处理
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			abnormalId: '',
			result: '',
			remark: '',
			resultOptions: [
				{ value: 'fixed', label: '已修复' },
				{ value: 'refunded', label: '已退款' },
				{ value: 'resend', label: '已重新发货' },
				{ value: 'other', label: '其他处理' }
			]
		}
	},
	onLoad(options) {
		if (options.id) {
			this.abnormalId = options.id
			// TODO: 根据异常ID获取异常信息
			console.log('异常ID:', options.id)
		}
	},
	methods: {
		handleResultChange(e) {
			this.result = e.detail.value
		},
		handleRemarkInput(e) {
			this.remark = e.detail.value
		},
		handleSubmit() {
			if (!this.result) {
				uni.showToast({
					title: '请选择处理结果',
					icon: 'none'
				})
				return
			}
			
			uni.showModal({
				title: '提示',
				content: '确定要提交处理结果吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用处理异常接口
						console.log('处理结果:', this.result)
						console.log('处理备注:', this.remark)
						
						uni.showToast({
							title: '处理成功',
							icon: 'success',
							duration: 2000,
							success: () => {
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							}
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.abnormal-handle-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 120rpx;
	
	.handle-form {
		padding: 20rpx;
		
		.form-section {
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
			}
			
			.radio-group {
				.radio-item {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					
					&:last-child {
						margin-bottom: 0;
					}
					
					radio {
						transform: scale(0.8);
					}
					
					.radio-text {
						font-size: 28rpx;
						color: #333;
						margin-left: 10rpx;
					}
				}
			}
			
			.remark-input {
				width: 100%;
				height: 200rpx;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				padding: 20rpx;
				font-size: 28rpx;
				color: #333;
				box-sizing: border-box;
			}
			
			.word-count {
				text-align: right;
				font-size: 24rpx;
				color: #999;
				margin-top: 10rpx;
			}
		}
	}
	
	.handle-actions {
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
			
			&[disabled] {
				background-color: #c8c9cc;
				color: #fff;
			}
		}
	}
}
</style> 