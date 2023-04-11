<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检测更新
			this.$Utils.update()
			// 网络监听
			this.$Utils.netWork()
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
	/* Animate动画库 */
	@import './common/animate.min.css';
	/* 隐藏滚动条 */
	::-webkit-scrollbar{
		display: none;
	}
</style>
