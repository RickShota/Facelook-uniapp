<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检测更新
			this.$Utils.update()
			// 网络监听
			uni.getNetworkType({
				success: function(res) {
					console.log("获取网络类型:", res.networkType);
					if(res.networkType==='none'){
						uni.showToast({
							title:'无法访问互联网，请先连接网络'
						})
					}
				}
			});
			uni.onNetworkStatusChange(function(res) {
				console.log("监听网络状态变化:");
				if(res.networkType==='none'){
					uni.showToast({
						title:'无法访问互联网，请先连接网络'
					})
				}
			});
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
