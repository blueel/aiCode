<template>
	<view class="member-container">
		<view class="search-box">
			<input type="text" v-model="searchKey" placeholder="搜索会员" @confirm="handleSearch" />
			<button class="add-btn" @tap="handleAdd">添加会员</button>
		</view>
		
		<view class="filter-box">
			<picker mode="selector" :range="levelOptions" @change="handleLevelChange">
				<view class="filter-item">
					<text>会员等级</text>
					<text class="value">{{levelOptions[levelIndex]}}</text>
				</view>
			</picker>
			<picker mode="date" @change="handleDateChange">
				<view class="filter-item">
					<text>注册时间</text>
					<text class="value">{{dateValue || '请选择'}}</text>
				</view>
			</picker>
		</view>
		
		<view class="member-list">
			<view class="member-item" v-for="(item, index) in memberList" :key="index" @tap="handleDetail(item)">
				<image :src="item.avatar" mode="aspectFill" class="member-avatar"></image>
				<view class="member-info">
					<view class="member-name">{{item.name}}</view>
					<view class="member-level">等级: {{item.level}}</view>
					<view class="member-phone">电话: {{item.phone}}</view>
				</view>
				<view class="member-actions">
					<button class="edit-btn" @tap.stop="handleEdit(item)">编辑</button>
					<button class="delete-btn" @tap.stop="handleDelete(item)">删除</button>
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
			levelIndex: 0,
			levelOptions: ['全部', '普通会员', '白银会员', '黄金会员', '钻石会员'],
			dateValue: '',
			memberList: [
				{
					id: 1,
					name: '张三',
					level: '普通会员',
					phone: '13800138000',
					avatar: '/static/images/avatar1.jpg'
				},
				{
					id: 2,
					name: '李四',
					level: '黄金会员',
					phone: '13800138001',
					avatar: '/static/images/avatar2.jpg'
				}
			]
		}
	},
	methods: {
		handleSearch() {
			// TODO: 实现搜索功能
			console.log('搜索关键词:', this.searchKey)
		},
		handleLevelChange(e) {
			this.levelIndex = e.detail.value
			// TODO: 根据等级筛选
		},
		handleDateChange(e) {
			this.dateValue = e.detail.value
			// TODO: 根据日期筛选
		},
		handleAdd() {
			uni.navigateTo({
				url: '/pages/member/edit'
			})
		},
		handleDetail(item) {
			uni.navigateTo({
				url: `/pages/member/detail?id=${item.id}`
			})
		},
		handleEdit(item) {
			uni.navigateTo({
				url: `/pages/member/edit?id=${item.id}`
			})
		},
		handleDelete(item) {
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
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.member-container {
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
	
	.filter-box {
		display: flex;
		margin-bottom: 20rpx;
		
		.filter-item {
			flex: 1;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			background-color: #fff;
			border-radius: 8rpx;
			margin-right: 20rpx;
			
			&:last-child {
				margin-right: 0;
			}
			
			.value {
				color: #666;
				margin-left: 10rpx;
			}
		}
	}
	
	.member-list {
		.member-item {
			display: flex;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			
			.member-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			
			.member-info {
				flex: 1;
				
				.member-name {
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				
				.member-level {
					color: #409eff;
					font-size: 24rpx;
					margin-bottom: 10rpx;
				}
				
				.member-phone {
					color: #909399;
					font-size: 24rpx;
				}
			}
			
			.member-actions {
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