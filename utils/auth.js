const TOKEN_KEY = 'token'

// 获取token
export function getToken() {
	return uni.getStorageSync(TOKEN_KEY)
}

// 设置token
export function setToken(token) {
	return uni.setStorageSync(TOKEN_KEY, token)
}

// 移除token
export function removeToken() {
	return uni.removeStorageSync(TOKEN_KEY)
}

// 检查是否已登录
export function isLoggedIn() {
	return !!getToken()
}

// 退出登录
export function logout() {
	removeToken()
	uni.reLaunch({
		url: '/pages/login/index'
	})
} 