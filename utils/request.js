import { getToken } from './auth'

const BASE_URL = 'http://localhost:3000/api'

const request = (options) => {
	return new Promise((resolve, reject) => {
		const token = getToken()
		
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.method === 'GET' ? options.params : options.data,
			header: {
				'Content-Type': 'application/json',
				'Authorization': token ? `Bearer ${token}` : ''
			},
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else if (res.statusCode === 401) {
					// token过期或无效，跳转到登录页
					uni.removeStorageSync('token')
					uni.navigateTo({
						url: '/pages/login/index'
					})
					reject(new Error('登录已过期，请重新登录'))
				} else {
					reject(new Error(res.data.message || '请求失败'))
				}
			},
			fail: (err) => {
				reject(new Error('网络错误，请稍后重试'))
			}
		})
	})
}

export default request 