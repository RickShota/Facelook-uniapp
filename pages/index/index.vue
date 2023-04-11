<template>
	<!-- 首页 -->
	<view class="content">
		<!-- 微信自定义导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar statusBar fixed="true">
			<template v-slot:left>
				<view class="logo-text">facelook</view>
			</template>
			<template v-slot:right>
				<view class="iconfont icon-huati search-btn" @click="gotoTopic"></view>
			</template>
		</uni-nav-bar>
		<!-- #endif -->
		<scroll-view scroll-y @scrolltolower="loadmore()" :style="'height:' + scrollH + 'px;'">
			<template v-if="newsList.length>0">
				<!-- 分享新鲜事 -->
				<view class="shareNews" @click="shareNews">
					<view style="display: flex;align-items: center;">
						<!-- 头像 -->
						<image class="rounded-circle mr-2"
							:src="loginStatus?'/static/default/userImg.jpg':'/static/default/defUser.png'">
							<!-- 昵称 -->
							<view>
								<text class="font" v-if="loginStatus">发个贴吧</text>
								<text class="font" v-else>点击登录，体验更多功能</text>
							</view>
							<view class="iconfont icon-dongtai icon"></view>
					</view>
				</view>
				<!-- 文章列表 -->
				<view v-for="(item,index) in newsList" :key="index">
					<!-- 分割线全局组件 -->
					<my-hr></my-hr>
					<!-- 文章item公共组件 -->
					<news-item :item="item" :index="index" @doSupport="doSupport" @follow="onfollow"></news-item>
				</view>
				<!-- 上拉加载公共组件 -->
				<load-more :text="loadMore"></load-more>
			</template>
			<template v-else>
				<!-- 无内容组件 -->
				<empty-page text1='无内容' text2='出错了,请重试 >_<'></empty-page>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	// #endif
	const fakeData = [{
			username: "Rick Henry",
			userpic: "/static/default/defUser.png",
			newstime: "2022-05-24 上午 11:31",
			isFollow: false,
			title: "测试数据，这是一个标题",
			titlepic: "/static/demo/banner1.jpg",
			content: "",
			support: {
				type: "support",
				support_count: 123,
				unsupport_count: 0,
			},
			comment_count: 4,
			share_num: 2,
		},
		{
			username: "昵称2",
			userpic: "/static/default/defUser.png",
			newstime: "2020-05-24 上午 11:31",
			isFollow: true,
			title: "测试数据，这是一个标题2",
			titlepic: "",
			support: {
				type: "unsupport",
				support_count: 0,
				unsupport_count: 5,
			},
			comment_count: 4,
			share_num: 0,
		},
		{
			username: "昵称3",
			userpic: "/static/default/defUser.png",
			newstime: "2020-05-24 上午 11:31",
			isFollow: false,
			title: "测试数据，这是一个标题3",
			titlepic: "/static/demo/demo2.jpg",
			support: {
				type: "",
				support_count: 1,
				unsupport_count: 5,
			},
			comment_count: 0,
			share_num: 4,
		},
		{
			username: "昵称4",
			userpic: "/static/default/defUser.png",
			newstime: "2020-05-24 上午 11:31",
			isFollow: false,
			title: "这是一个标题4",
			titlepic: "/static/demo/banner2.jpg",
			support: {
				type: "",
				support_count: 0,
				unsupport_count: 0,
			},
			comment_count: 0,
			share_num: 4,
		},
	];
	import newsItem from '@/components/common/news-item.vue';
	import loadMore from '@/components/common/load-more.vue';
	import {mapState} from 'vuex';
	export default {
		components: {
			newsItem,
			loadMore,
			// #ifdef MP-WEIXIN
			uniNavBar
			// #endif
		},
		data() {
			return {
				tabIndex: 1, // 顶部默认分类
				scrollInto: "", // 顶部导航
				scrollH: 600, // 默认滚动容器高度
				loadMore: '上拉加载更多',
				// 模仿数据
				newsList: [],
			}
		},
		// 同步登录状态
		computed:{
			...mapState(['loginStatus'])
		},
		// 监听导航栏搜索按钮
		onNavigationBarButtonTap(e) {
			// 搜索按钮
			uni.navigateTo({
					url: '../search/search', 
					animationType: 'fade-in',
					success: res => {},
					fail: () => {},
					complete: () => {}
			});
		},
		onLoad() {
			// 获取屏幕信息
			uni.getSystemInfo({
					success: res => {
						// 计算滚动容器高度 = 可用高度
						// #ifndef MP-WEIXIN
						this.scrollH = res.windowHeight
						// #endif
						// #ifdef MP-WEIXIN
						this.scrollH = res.windowHeight - 44 - res.statusBarHeight // 自定义导航栏 - 手机状态栏
						// #endif
					}
				})
			// 获取数据
			this.getData()
			// 获取登录状态
			this.$store.dispatch('initUser')
		},
		methods: {
			// 登录
			gotoLogin() {
				uni.navigateTo({
					url: '../login/login',
					animationType: 'slide-in-bottom',
				})
			},
			// 发动态
			shareNews() {
				// 权限验证
				this.checkAuth(() => {
					uni.navigateTo({
						url: '../add-input/add-input',
						animationType: 'slide-in-bottom',
					})
				})
			},
			// 获取文章数据
			getData() {
				this.newsList = fakeData;
				// TODO:
			},
			// 关注
			onfollow(e) {
				this.newsList[e].isFollow = !this.newsList[e].isFollow;
			},
			// 顶踩
			doSupport(e) {
				let item = this.newsList[e.index];
				if (item.support.support_count >= 0 && item.support.unsupport_count >= 0) {
					// 判断原有的操作，避免重复操作
					switch (item.support.type) {
						case '': // 无顶踩
							item.support.type = e.type;
							item.support[e.type + "_count"]++;
							break;
						case 'support': // 已顶
							if (e.type === 'unsupport') { //点踩
								item.support.type = 'unsupport';
								item.support.support_count--;
								item.support.unsupport_count++;
							} else { // 再顶
								item.support.type = '';
								item.support.support_count--;
							}
							break;
						case 'unsupport': // 已踩
							if (e.type === 'support') { // 点顶
								item.support.type = 'support';
								item.support.support_count++;
								item.support.unsupport_count--;
							} else { // 再踩un
								item.support.type = '';
								item.support.unsupport_count--;
							}
							break;
					}
				}
			},
			// 加载更多
			loadmore() {
				// 节流操作
				if (this.loadMore !== '上拉加载更多') return;
				// 修改当前列表加载状态
				this.loadMore = "加载中...";
				setTimeout(() => {
					// 加载数据(模拟复制2份)
					this.newsList = [...this.newsList, ...this.newsList];
					// 恢复加载状态
					this.loadMore = "上拉加载更多";
				}, 2000);
			}
		},
	};
</script>

<style scoped lang="less">
	.logo-text {
		color: #1b74e3;
		font-size: 50rpx;
		font-weight: bold;
	}

	.search-btn {
		margin-right: 150rpx;
		font-size: 50rpx;
	}

	.shareNews {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		padding: 20rpx;

		image {
			width: 75rpx;
			height: 75rpx;
		}

		text {
			line-height: 0.5;
		}

		.icon {
			font-size: 40rpx;
			font-weight: bold;
			position: absolute;
			right: 40rpx;
		}
	}
</style>
