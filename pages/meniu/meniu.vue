<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar statusBar fixed="true" backgroundColor="#f0f2f5">
			<template v-slot:left>
				<view class="logo-text">菜单</view>
			</template>
			<template v-slot:right>
				<view></view>
			</template>
		</uni-nav-bar>
		<!-- #endif -->
		
		<view class="menuPage">
			<!-- 个人信息 -->
			<view class="flex align-center" @click="gotoMy()">
				<image v-if="isLog" :src="userImg" class="rounded-circle mr-2" style="height: 70rpx;width: 70rpx;">
				</image>
				<image v-else src="/static/default/defUser.png" class="rounded-circle mr-2"
					style="height: 70rpx;width: 70rpx;"></image>
				<view class="flex flex-column flex-1">
					<view class="flex align-center justify-between">
						<!-- 昵称 -->
						<text v-if="isLog" class="font">Rick Henry</text>
						<text v-else class="font">点击登录</text>
					</view>
					<view class="flex align-center justify-between">
						<text v-show="isLog" class="text-secondary text-ellipsis"
							style="width: 500rpx;font-size: 25rpx;">查看你的个人主页</text>
					</view>
				</view>
			</view>

			<!-- 分割线 -->
			<view style="width: 100%;height: 1px;background-color: #dedede; margin: 20rpx 0;"></view>
			<!-- 功能按钮 -->
			<text style="font-size: 26rpx;margin-left: 5rpx;">所有快速访问项目</text>
			<view class="btns">
				<view hover-class="hoverbtn" @click="gotoNews" class="menu-btn">️️
					<text style="margin-left: 10rpx;">🌟</text><br>
					<text>动态</text>
				</view>
				<view hover-class="hoverbtn" @click="gotoFreinds" class="menu-btn">
					<text style="margin-left: 10rpx;">👥</text><br>
					<text>好友</text>
				</view>
				<view hover-class="hoverbtn" @click="gotoTopic" class="menu-btn">
					<text style="margin-left: 10rpx;">#️⃣</text><br>
					<text>话题</text>
				</view>
				<view hover-class="hoverbtn" @click="gotoSession" class="menu-btn">
					<text style="margin-left: 10rpx;">💬</text><br>
					<text>聊天</text>
				</view>
				<view hover-class="hoverbtn" @click="gotoClear" class="menu-btn">
					<text style="margin-left: 10rpx;">🗑️</text><br>
					<text>清除缓存</text>
				</view>
				<view hover-class="hoverbtn" @click="gotoEmpty" class="menu-btn">
					<text style="margin-left: 10rpx;">🔖</text><br>
					<text>收藏夹</text>
				</view>
				<view hover-class="hoverbtn" @click="gotoEmpty" class="menu-btn">
					<text style="margin-left: 10rpx;">🚩</text><br>
					<text>公共主页</text>
				</view>
				<view hover-class="hoverbtn" @click="gotoEmpty" class="menu-btn">
					<text style="margin-left: 10rpx;">🕹</text><br>
					<text>活动</text>
				</view>
			</view>
			<!-- 分割线 -->
			<view style="width: 100%;height: 1px;background-color: #cbced3; margin: 20rpx 0 0 0;"></view>
			<!-- 帮助与支持 -->
			<uni-collapse>
				<uni-collapse-item title="帮助与支持" thumb="/static/default/help.png" show-animation>
					<view class="btns">
						<view hover-class="hoverbtn" @click="gotoEmpty" class="menu-btn">️️
							<text style="margin-left: 10rpx;">🛟</text><br>
							<text>帮助中心</text>
						</view>
						<view hover-class="hoverbtn" @click="gotoEmpty" class="menu-btn">
							<text style="margin-left: 10rpx;">⚠️️</text><br>
							<text>报告问题</text>
						</view>
						<view hover-class="hoverbtn" @click="gotoEmpty" class="menu-btn">️️
							<text style="margin-left: 10rpx;">🛡</text><br>
							<text>账户安全</text>
						</view>
						<view hover-class="hoverbtn" @click="gotoEmpty" class="menu-btn">
							<text style="margin-left: 10rpx;">📜</text><br>
							<text>条款政策</text>
						</view>
					</view>
				</uni-collapse-item>
				<!-- 设置与隐私 -->
				<uni-collapse-item title="设置与隐私" thumb="/static/default/setting.png" show-animation>
					<view class="btns-last">
						<view hover-class="hoverbtn" @click="gotoEmpty">️️
							<text style="margin: 0 10rpx;">⚙️</text>
							<text>通用设置</text>
						</view>
						<view hover-class="hoverbtn" @click="gotoEmpty">
							<text style="margin: 0 10rpx;">📲</text>
							<text>设备登录请求</text>
						</view>
						<view hover-class="hoverbtn" @click="gotoEmpty">️️
							<text style="margin: 0 10rpx;">🎯</text>
							<text>个性化广告</text>
						</view>
						<view hover-class="hoverbtn" @click="gotoEmpty">
							<text style="margin: 0 10rpx;">🗃️</text>
							<text>个人信息收集</text>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
			<!-- 退出登录 -->
			<view v-show="isLog" class="logout-btn" hover-class="logout-btn-ed" @click="logout">
				退&nbsp;出
			</view>
			<!-- 版权信息 -->
			<view class="copyright">
				<text class="a">copyright@2022&nbsp;|&nbsp;made&nbsp;by&nbsp;黄瑞瑞</text><br>
				<text class="b">该软件为模仿Facebook的练手项目，非商业用途</text><br>
				<text class="b">作者保留所有权</text>
			</view>
		</view>
	</view>

</template>

<script>
	// #ifdef MP-WEIXIN
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	// #endif
	export default {
		components: {
			// #ifdef MP-WEIXIN
			uniNavBar
			// #endif
		},
		data() {
			return {
				isLog: false,
				userImg: '/static/default/userImg.jpg'
			}
		},
		onShow() {
			// 检查token,确定登录状态
			try {
				const value = uni.getStorageSync('token');
				if (value === 'ok') {
					console.log(value);
					this.isLog = true
				}
			} catch (e) {
				console.log(e.message);
			}
		},
		// 监听导航栏按钮
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0: // 搜索
					uni.navigateTo({
						url: '../search/search?type=facelook',
						animationType: 'fade-in'
					});
					break;
				case 1: // 设置
					uni.showToast({
						title: '该功能正在开发',
						duration: 2000,
						icon: 'error'
					});
					break;
			}
		},
		methods: {
			gotoNews() {
				// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
				uni.switchTab({
					url: '../news/news',
				});
			},
			gotoMy() {
				// 如果登录了，跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
				if (this.isLog) {
					uni.switchTab({
						url: '../user/user',
					});
				} else {
					uni.navigateTo({
						url: '../login/login',
						animationType: 'slide-in-bottom'
					});
				}
			},
			gotoFreinds() {
				// 保留当前页面，跳转到应用内的某个页面
				uni.navigateTo({
					url: '../friends-list/friends-list',
				});
			},
			gotoSession() {
				uni.navigateTo({
					url: '../session-list/session-list',
				});
			},
			gotoTopic() {
				uni.navigateTo({
					url: '../topic/topic',
				});
			},
			// 清除缓存
			gotoClear() {
				let res = uni.getStorageInfoSync().currentSize
				let rabish = res < 1024 ? res + 'kb' : (res / 1024).toFixed(2) + 'Mb'
				uni.showToast({
					icon: 'success',
					title: `已清除${rabish}缓存`
				})
				uni.clearStorageSync()
			},
			gotoEmpty() {
				uni.showToast({
					title: '该功能正在开发',
					duration: 2000,
					icon: 'error'
				});
			},
			// 退出登录
			logout() {
				uni.showActionSheet({
					title: "确定退出？",
					itemList: ['退出'],
					itemColor: '#c80104',
					success: (res)=> {
						try {
							// 清除本地token
							uni.removeStorageSync('token');
							// 清除登录标识符
							this.isLog = false
							// 刷新页面
							// #ifndef MP-WEIXIN
							location.reload()
							// #endif
							// #ifdef MP-WEIXIN
							this.onShow()
							// #endif
						} catch (e) {
							console.log(e.message);
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f0f2f5;

		.logo-text {
			font-size: 50rpx;
			font-weight: 500;
			color: #000;
		}

		.menuPage {
			padding: 20rpx;



			.btns {
				margin: 20rpx 0;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.hoverbtn {
					background-color: #c8c8c8;
				}

				.menu-btn {
					background-color: #fff;
					width: 47%;
					height: 120rpx;
					border-radius: 15rpx;
					border: 1rpx solid #e8e8e8;
					box-shadow: 2px 3px 20px 1px #dcdcdc;
					margin: 0 15rpx 15rpx 0;
					padding: 20rpx;
					box-sizing: border-box;
					font-size: 30rpx;
				}
			}

			.btns-last {
				margin: 20rpx 0;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.hoverbtn {
					background-color: #c8c8c8;
				}

				view {
					background-color: #fff;
					width: 95%;
					height: 90rpx;
					border-radius: 15rpx;
					border: 1rpx solid #e8e8e8;
					box-shadow: 2px 3px 20px 1px #dcdcdc;
					margin: 0 15rpx 15rpx 0;
					padding: 20rpx;
					box-sizing: border-box;
					font-size: 30rpx;
				}
			}

			.logout-btn {
				background-color: #dee0e2;
				height: 70rpx;
				margin: 40rpx 20rpx;
				text-align: center;
				line-height: 70rpx;
				border-radius: 5px;
				font-weight: 600;
			}

			.logout-btn-ed {
				background-color: #b7b9ba;
			}

			.copyright {
				text-align: center;

				.a {
					font-size: 25rpx;
					color: #9f9f9f;
				}

				.b {
					font-size: 20rpx;
					color: #bdbdbd;
				}
			}
		}
	}
</style>
