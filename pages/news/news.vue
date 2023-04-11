<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar statusBar fixed="true">
			<template v-slot:left>
				<view class="logo-text">话题</view>
			</template>
			<template v-slot:right>
				<view class="iconfont icon-sousuo search-btn" @click="gotoSearch"></view>
			</template>
		</uni-nav-bar>
		<!-- #endif -->
		<!-- 首页 -->
		<view class="content">
			<!-- 热门分类 -->
			<hot-cate :hotCate="hotCate"></hot-cate>
			<!-- 轮播图 -->
			<swiper class="px-2 pb-2" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<image src="@/static/demo/banner2.jpg" style="height: 300rpx; " class="w-100 rounded"></image>
				</swiper-item>
			</swiper>
			<my-hr></my-hr>
			<!-- 最近更新 -->
			<view class="p-2 font-md">最近更新</view>
			<!-- 话题列表组件 -->
			<block v-for="(item,index) in topicList" :key="index">
				<topic-item :item="item" :index="index"></topic-item>
			</block>
		</view>
	</view>

</template>

<script>
	// #ifdef MP-WEIXIN
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	// #endif
	import newsItem from '@/components/common/news-item.vue'
	import loadMore from '@/components/common/load-more.vue'
	import hotCate from '../../components/common/hot-cate.vue'
	import topicItem from '../../components/common/topic-item.vue'
	import {mapState} from 'vuex';
	export default {
		components: {
			hotCate,
			topicItem,
			newsItem,
			loadMore,
			// #ifdef MP-WEIXIN
			uniNavBar
			// #endif
		},
		data() {
			return {
				tabIndex: 0, // 顶部默认分类
				scrollInto: "", // 顶部导航
				scrollH: 560, // 默认滚动容器高度
				// 模仿数据
				newsList: [],
				loadMore: "上拉加载更多...",
				hotCate: [{
						name: "关注",
					},
					{
						name: "推荐",
					},
					{
						name: "国际",
					},
				],
				topicList: [{
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10,
					},
				
					{
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10,
					},
					{
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10,
					},
					{
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10,
					},
				],
			}
		},
		// 监听导航栏搜索按钮
		onNavigationBarButtonTap(e) {
			// 跳转搜索
			this.gotoSearch()
		},
		onLoad() {
			// 获取窗口信息
			uni.getSystemInfo({
				success: res => {
					// #ifndef MP-WEIXIN
					// 计算滚动容器高度 = 可使用窗口宽度 - 分类导航栏
					this.scrollH = res.windowHeight - 30
					// #endif
					// #ifdef MP-WEIXIN
					// 计算滚动容器高度 = 可使用窗口宽度 - 分类导航栏 - 自定义导航栏高度 - 通知栏
					this.scrollH = res.windowHeight - 30 - 44 - res.statusBarHeight
					// #endif
				}
			});
			// 获取登录状态
			this.$store.dispatch('initUser')
		},
		
		computed: {
			...mapState({
				tabBars: state => state.article.articleClass,
				List: state => state.article.articleList,
				loginStatus: state => state.loginStatus,
			})
		},
		methods: {
			// 登录
			gotoLogin() {
				uni.navigateTo({
					url: '../login/login',
					animationType: 'slide-in-bottom',
				})
			},
			// 监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			// 改变头部分类导航
			changeTab(index) {
				if (index === this.tabIndex) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = "tab" + index;
			},
			// 监听上拉加载
			loadmore(index) {
				let item = this.newsList[index]
				// 节流操作
				if (item.loadMore !== '上拉加载更多') return;
				// 修改当前列表加载状态
				item.loadMore = "加载中...";
				setTimeout(() => {
					// 加载数据(模拟复制2份)
					item.list = [...item.list, ...item.list];
					// 恢复加载状态
					item.loadMore = "上拉加载更多";
				}, 2000);
			},
			// 搜索
			gotoSearch() {
				if (this.isLog === true) {
					uni.navigateTo({
						url: '../search/search',
						animationType: 'fade-in',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showToast({
						icon: 'error',
						title: '请登录后操作'
					})
				}
			}
		},
	};
</script>

<style scoped lang="less">
	.search-btn {
		font-size: 45rpx;
		font-weight: bold;
		margin-right: 150rpx;
	}

	.logo-text {
		font-size: 50rpx;
		font-weight: 500;
		color: #000;
	}
</style>
