<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检测更新
			// 网络监听
			// 初始化数据
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
	@import './common/uni.css';
	@import './common/common.css';
	@import './common/free.css';
	/* 阿里字体图标库 */
	@import './static/icon/iconfont.css';
	/* @import './common/icon.css'; */
	/* Animate.css动画库 */
	@import './common/animate.min.css';
	
</style>
