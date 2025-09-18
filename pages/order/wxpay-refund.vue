<template>
	<view class="wxpay-refund-container">
		<view class="refund-form">
			<view class="form-item">
				<view class="form-label">退款金额</view>
				<view class="form-content">
					<view class="amount-input">
						<text class="prefix">¥</text>
						<input 
							type="digit" 
							v-model="refundAmount" 
							placeholder="请输入退款金额" 
							class="input"
							:maxlength="10"
						/>
					</view>
					<view class="amount-tip">
						<text>可退金额：</text>
						<text class="price">¥{{paymentInfo.amount}}</text>
					</view>
				</view>
			</view>
			
			<view class="form-item">
				<view class="form-label">退款原因</view>
				<view class="form-content">
					<view class="reason-list">
						<view 
							class="reason-item" 
							v-for="(item, index) in reasonOptions" 
							:key="index"
							:class="{active: refundReason === item.value}"
							@tap="handleReasonSelect(item.value)"
						>
							{{item.label}}
						</view>
					</view>
					<textarea 
						v-model="refundRemark" 
						placeholder="请输入退款说明（选填）" 
						:maxlength="200"
						class="remark-textarea"
					/>
					<view class="word-count">{{refundRemark.length}}/200</view>
				</view>
			</view>
			
			<view class="form-item">
				<view class="form-label">退款凭证</view>
				<view class="form-content">
					<view class="upload-list">
						<view class="upload-item" v-for="(item, index) in imageList" :key="index">
							<image :src="item" mode="aspectFill" class="preview-image"></image>
							<view class="delete-btn" @tap="handleDeleteImage(index)">×</view>
						</view>
						<view class="upload-btn" @tap="handleUploadImage" v-if="imageList.length < 3">
							<text class="iconfont icon-camera"></text>
							<text class="upload-text">上传图片</text>
						</view>
					</view>
					<view class="upload-tip">最多上传3张图片，支持jpg、png格式</view>
				</view>
			</view>
		</view>
		
		<view class="refund-actions">
			<button class="action-btn" @tap="handleSubmit">提交退款申请</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			paymentId: null,
			paymentInfo: {
				amount: 199.99
			},
			refundAmount: '',
			refundReason: '',
			refundRemark: '',
			imageList: [],
			reasonOptions: [
				{
					label: '商品质量问题',
					value: 'quality'
				},
				{
					label: '商品与描述不符',
					value: 'description'
				},
				{
					label: '商品缺货',
					value: 'out_of_stock'
				},
				{
					label: '商品损坏',
					value: 'damaged'
				},
				{
					label: '其他原因',
					value: 'other'
				}
			]
		}
	},
	onLoad(options) {
		if (options.id) {
			this.paymentId = options.id
			// TODO: 根据支付单ID获取支付信息
			console.log('支付单ID:', options.id)
		}
	},
	methods: {
		handleReasonSelect(value) {
			this.refundReason = value
		},
		handleUploadImage() {
			uni.chooseImage({
				count: 3 - this.imageList.length,
				success: (res) => {
					this.imageList = [...this.imageList, ...res.tempFilePaths]
				}
			})
		},
		handleDeleteImage(index) {
			this.imageList.splice(index, 1)
		},
		handleSubmit() {
			if (!this.refundAmount) {
				uni.showToast({
					title: '请输入退款金额',
					icon: 'none'
				})
				return
			}
			
			if (Number(this.refundAmount) > this.paymentInfo.amount) {
				uni.showToast({
					title: '退款金额不能大于支付金额',
					icon: 'none'
				})
				return
			}
			
			if (!this.refundReason) {
				uni.showToast({
					title: '请选择退款原因',
					icon: 'none'
				})
				return
			}
			
			uni.showModal({
				title: '提示',
				content: '确定要提交退款申请吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用退款申请接口
						const params = {
							paymentId: this.paymentId,
							refundAmount: this.refundAmount,
							refundReason: this.refundReason,
							refundRemark: this.refundRemark,
							images: this.imageList
						}
						console.log('退款参数:', params)
						
						uni.showToast({
							title: '申请成功',
							icon: 'success',
							success: () => {
								setTimeout(() => {
									uni.navigateBack()
								}, 1500)
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
.wxpay-refund-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding: 20rpx;
	
	.refund-form {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 20rpx;
		
		.form-item {
			margin-bottom: 30rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.form-label {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 20rpx;
				font-weight: bold;
			}
			
			.form-content {
				.amount-input {
					display: flex;
					align-items: center;
					margin-bottom: 10rpx;
					
					.prefix {
						font-size: 36rpx;
						color: #333;
						margin-right: 10rpx;
					}
					
					.input {
						flex: 1;
						height: 80rpx;
						font-size: 36rpx;
						color: #333;
					}
				}
				
				.amount-tip {
					font-size: 24rpx;
					color: #999;
					
					.price {
						color: #f56c6c;
						font-weight: bold;
					}
				}
				
				.reason-list {
					display: flex;
					flex-wrap: wrap;
					margin-bottom: 20rpx;
					
					.reason-item {
						width: calc(50% - 10rpx);
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						background-color: #f5f5f5;
						border-radius: 8rpx;
						margin-bottom: 20rpx;
						font-size: 28rpx;
						color: #333;
						
						&:nth-child(odd) {
							margin-right: 20rpx;
						}
						
						&.active {
							background-color: #e8f5e9;
							color: #3cc51f;
						}
					}
				}
				
				.remark-textarea {
					width: 100%;
					height: 200rpx;
					background-color: #f5f5f5;
					border-radius: 8rpx;
					padding: 20rpx;
					font-size: 28rpx;
					box-sizing: border-box;
					margin-bottom: 10rpx;
				}
				
				.word-count {
					text-align: right;
					font-size: 24rpx;
					color: #999;
				}
				
				.upload-list {
					display: flex;
					flex-wrap: wrap;
					margin-bottom: 10rpx;
					
					.upload-item {
						width: 160rpx;
						height: 160rpx;
						margin-right: 20rpx;
						margin-bottom: 20rpx;
						position: relative;
						
						.preview-image {
							width: 100%;
							height: 100%;
							border-radius: 8rpx;
						}
						
						.delete-btn {
							position: absolute;
							top: -20rpx;
							right: -20rpx;
							width: 40rpx;
							height: 40rpx;
							line-height: 40rpx;
							text-align: center;
							background-color: rgba(0, 0, 0, 0.5);
							color: #fff;
							border-radius: 50%;
							font-size: 32rpx;
						}
					}
					
					.upload-btn {
						width: 160rpx;
						height: 160rpx;
						background-color: #f5f5f5;
						border-radius: 8rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						
						.iconfont {
							font-size: 48rpx;
							color: #999;
							margin-bottom: 10rpx;
						}
						
						.upload-text {
							font-size: 24rpx;
							color: #999;
						}
					}
				}
				
				.upload-tip {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
	
	.refund-actions {
		padding: 30rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		
		.action-btn {
			height: 80rpx;
			line-height: 80rpx;
			background-color: #3cc51f;
			color: #fff;
			font-size: 28rpx;
			border-radius: 40rpx;
		}
	}
}
</style> 