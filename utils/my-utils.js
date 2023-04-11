export default {
	// 热更新
	update() {
		// #ifdef MP-WEIXIN
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate);
		});
		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});
		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
		});
		// #endif
		// #ifdef APP-PLUS  
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			uni.request({
				url: 'https://ceshi.dishait.cn/api/v1/update',
				data: {
		 		version: widgetInfo.version,
					name: widgetInfo.name
				},
				success: (result) => {
					var data = result.data;
					if (data.update && data.wgtUrl) {
						uni.downloadFile({
							url: data.wgtUrl,
		 				success: (downloadResult) => {
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(downloadResult.tempFilePath, {
										force: false
									}, function() {
										console.log('install success...');
										plus.runtime.restart();
									}, function(e) {
										console.error('install fail...');
									});
								}
							}
						});
					}
				}
			});
		});
		// #endif
	},

	// 网络监听
	netWork(){
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
	}

}
