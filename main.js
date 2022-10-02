import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

// 注册全局组件
import divider from './components/common/divider'
import emptyPage from './components/common/empty-page'
Vue.component('myHr',divider)
Vue.component('emptyPage',emptyPage)
// 注册自定义工具类
import $Utils from './utils/my-update.js'
Vue.prototype.$Utils = $Utils

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif