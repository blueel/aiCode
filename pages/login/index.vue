<template>
	<view class="login-container">
		<view class="logo">
			<image src="/static/images/logo.png" mode="aspectFit"></image>
		</view>
		<view class="title">商城管理系统</view>
		
		<view class="form-box">
			<view class="input-group">
				<text class="label">账号</text>
				<input type="text" v-model="username" placeholder="请输入账号" />
			</view>
			
			<view class="input-group">
				<text class="label">密码</text>
				<input type="password" v-model="password" placeholder="请输入密码" />
			</view>
			
			<view class="remember-box">
				<checkbox-group @change="handleRememberChange">
					<checkbox :checked="remember" color="#3cc51f" />
					<text>记住密码</text>
				</checkbox-group>
			</view>
			
			<button class="login-btn" @tap="handleLogin">登录</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: 'admin',
			password: '123456',
			remember: false
		}
	},
	methods: {
		handleRememberChange(e) {
			this.remember = e.detail.value.length > 0
		},
		handleLogin() {
			if (!this.username || !this.password) {
				uni.showToast({
					title: '请输入账号和密码',
					icon: 'none'
				})
				return
			}
			
			// 模拟登录请求
			uni.showLoading({
				title: '登录中...'
			})
			
			setTimeout(() => {
				uni.hideLoading()
				
				// 验证账号密码
				if (this.username === 'admin' && this.password === '123456') {
					// 保存登录状态
					uni.setStorageSync('token', 'admin_token')
					uni.setStorageSync('userInfo', {
						username: this.username,
						nickname: '管理员'
					})
					
					// 如果选择了记住密码
					if (this.remember) {
						uni.setStorageSync('remember', true)
						uni.setStorageSync('loginInfo', {
							username: this.username,
							password: this.password
						})
					} else {
						uni.removeStorageSync('remember')
						uni.removeStorageSync('loginInfo')
					}
					
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					})
					
					// 跳转到首页
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/goods/index'
						})
					}, 1500)
				} else {
					uni.showToast({
						title: '账号或密码错误',
						icon: 'none'
					})
				}
			}, 1000)
		}
	},
	onLoad() {
		// 检查是否记住密码
		const remember = uni.getStorageSync('remember')
		if (remember) {
			const loginInfo = uni.getStorageSync('loginInfo')
			if (loginInfo) {
				this.username = loginInfo.username
				this.password = loginInfo.password
				this.remember = true
			}
		}
	}
}
</script>

<style lang="scss">
.login-container {
	padding: 40rpx;
	
	.logo {
		width: 200rpx;
		height: 200rpx;
		margin: 0 auto 40rpx;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.title {
		font-size: 36rpx;
		color: #333;
		text-align: center;
		margin-bottom: 60rpx;
		font-weight: bold;
	}
	
	.form-box {
		.input-group {
			margin-bottom: 30rpx;
			
			.label {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 10rpx;
				display: block;
			}
			
			input {
				width: 100%;
				height: 80rpx;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				padding: 0 20rpx;
				font-size: 28rpx;
			}
		}
		
		.remember-box {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			
			checkbox-group {
				display: flex;
				align-items: center;
				
				text {
					font-size: 24rpx;
					color: #666;
					margin-left: 10rpx;
				}
			}
		}
		
		.login-btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background-color: #3cc51f;
			color: #fff;
			font-size: 32rpx;
			border-radius: 8rpx;
		}
	}
}
</style> 