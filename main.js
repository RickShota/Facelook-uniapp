import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

// 注册全局组件
import divider from './components/common/divider'
import emptyPage from './components/common/empty-page'
Vue.component('myHr', divider)
Vue.component('emptyPage', emptyPage)

// 注册自定义工具类
import $Utils from './utils/my-utils.js'
import $C from './common/config.js';
Vue.prototype.$Utils = $Utils
Vue.prototype.$C = $C

// 注册请求库
import $Http from './utils/request.js';
Vue.prototype.$Http = $Http

// 注册Vuex
import store from './store/index.js';
Vue.prototype.$store = store

// 权限验证操作
Vue.prototype.checkAuth = (callback) => {
	if (!store.state.loginStatus) {
		uni.showToast({
			icon: 'none',
			title: '请先登录!',
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	callback()
}
// 权限验证跳转
// Vue.prototype.navigateTo = (options) => {
// 	if (store.state.loginStatus) {
// 		// 获取用户数据
// 		store.dispatch('initUser')
// 		console.log("loginStatus是true");
// 	} else {
// 		uni.showToast({
// 			icon: 'none',
// 			title: '请先登录!',
// 		});
// 		return uni.navigateTo({
// 			url: '/pages/login/login'
// 		});
// 	}
// 	uni.navigateTo(options);
// }

App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
