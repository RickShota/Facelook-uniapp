import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Article from './module/article.js';
import config from '../common/config.js';

export default new Vuex.Store({
	// 总仓库
	state: {
		loginStatus: false, // 登录状态
		token: '',
		userInfo: {}, // 用户信息
	},
	getters: {},
	// 同步修改
	mutations: {
		// 登录
		login(state, tokenStr) {
			// 标记登录状态
			state.loginStatus = true
			state.token = tokenStr
			// 储存 token
			uni.setStorageSync('token', tokenStr)
		},
		// 退出登录
		logout(state) {
			state.loginStatus = false
			state.token = ''
			state.userInfo = {}
			uni.removeStorageSync('token')
		},
		// 更新用户信息
		UPDATE_USERINFO(state, data) {
			state.userInfo = data
		}
	},
	// 异步修改
	actions: {
		// 初始化登录状态
		initUser(store) {
			let token = uni.getStorageSync('token')
			if(token) {
				store.state.loginStatus = true
				store.state.token = token
				// 获取用户信息
				uni.request({
					url: config.baseUrl + '/my/userinfo',
					method: 'GET',
					header: {
						Authorization: token
					},
					success: (res) => {
						if (res.data.status === 0) {
							let userData = res.data.data
							// 提交用户信息
							store.commit('UPDATE_USERINFO', userData)
						}
					}
				})
			}
		},
	},
	// 模块化
	modules: {
		article: Article,
	}
})
