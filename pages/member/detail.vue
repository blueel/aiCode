<template>
	<view class="detail-container">
		<view class="member-info">
			<image :src="memberInfo.avatar" mode="aspectFill" class="member-avatar"></image>
			<view class="member-basic">
				<view class="member-name">{{memberInfo.name}}</view>
				<view class="member-level">等级: {{memberInfo.level}}</view>
			</view>
		</view>
		
		<view class="info-list">
			<view class="info-item">
				<text class="label">手机号码</text>
				<text class="value">{{memberInfo.phone}}</text>
			</view>
			<view class="info-item">
				<text class="label">注册时间</text>
				<text class="value">{{memberInfo.registerTime}}</text>
			</view>
			<view class="info-item">
				<text class="label">消费总额</text>
				<text class="value">¥{{memberInfo.totalAmount}}</text>
			</view>
			<view class="info-item">
				<text class="label">订单数量</text>
				<text class="value">{{memberInfo.orderCount}}笔</text>
			</view>
		</view>
		
		<view class="remark-box">
			<text class="label">备注信息</text>
			<text class="value">{{memberInfo.remark || '暂无备注'}}</text>
		</view>
		
		<view class="action-buttons">
			<button class="edit-btn" @tap="handleEdit">编辑</button>
			<button class="delete-btn" @tap="handleDelete">删除</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			memberInfo: {
				avatar: '',
				name: '',
				level: '',
				phone: '',
				registerTime: '',
				totalAmount: 0,
				orderCount: 0,
				remark: ''
			}
		}
	},
	onLoad(options) {
		if (options.id) {
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
				this.memberInfo = {
					avatar: '/static/images/avatar1.jpg',
					name: '张三',
					level: '普通会员',
					phone: '13800138000',
					registerTime: '2024-01-01',
					totalAmount: 9999.99,
					orderCount: 10,
					remark: '这是一个示例会员'
				}
			}, 1000)
		},
		handleEdit() {
			uni.navigateTo({
				url: `/pages/member/edit?id=${this.memberInfo.id}`
			})
		},
		handleDelete() {
			uni.showModal({
				title: '提示',
				content: '确定要删除该会员吗？',
				success: (res) => {
					if (res.confirm) {
						// TODO: 调用删除接口
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
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
	
	.member-info {
		display: flex;
		align-items: center;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
		
		.member-avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			margin-right: 30rpx;
		}
		
		.member-basic {
			.member-name {
				font-size: 36rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			
			.member-level {
				color: #409eff;
				font-size: 28rpx;
			}
		}
	}
	
	.info-list {
		background-color: #fff;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
		
		.info-item {
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			border-bottom: 1px solid #f5f5f5;
			
			&:last-child {
				border-bottom: none;
			}
			
			.label {
				color: #666;
				font-size: 28rpx;
			}
			
			.value {
				color: #333;
				font-size: 28rpx;
			}
		}
	}
	
	.remark-box {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.label {
			display: block;
			color: #666;
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}
		
		.value {
			color: #333;
			font-size: 28rpx;
			line-height: 1.6;
		}
	}
	
	.action-buttons {
		display: flex;
		justify-content: space-between;
		
		button {
			width: 45%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			
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
</style> 