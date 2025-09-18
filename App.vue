<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="content">
			<view class="main">
				<view class="logo">
					<image src="/static/images/logo.png" mode="aspectFit"></image>
				</view>
				<view class="title">商城管理系统</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		background-color: #f5f5f5;
		font-size: 28rpx;
		color: #333;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}

	.logo {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 40rpx;
	}

	.logo image {
		width: 100%;
		height: 100%;
	}

	.title {
		font-size: 36rpx;
		color: #333;
		font-weight: bold;
	}
</style>
