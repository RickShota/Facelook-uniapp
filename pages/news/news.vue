<template>
	<!-- 首页 -->
	<view class="content">
		<!-- 顶部选项卡 -->
		<scroll-view :scroll-x="true" class="scroll-row" scroll-with-animation :scroll-into-view="scrollInto">
			<view v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)" :id="'tab'+index"
				:class="tabIndex === index ? 'text-main font-weight-bold font' : ''"
				class="scroll-row-item px-3 py-1 font">{{item.name}}</view>
		</scroll-view>
		<!-- 左右滑块视图容器 -->
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px;'">
			<!-- 滑块item -->
			<swiper-item v-for="(page,index) in newsList" :key="index">
				<!-- 上下滚动容器 -->
				<scroll-view scroll-y @scrolltolower="loadmore(index)" :style="'height:' + scrollH + 'px;'">
					<template v-if="page.list.length>0">
						<!-- 文章列表 -->
						<view v-for="(item,index2) in page.list" :key="index2">
							<!-- 分割线全局组件 -->
							<my-hr></my-hr>
							<!-- 文章item公共组件 -->
							<news-item :item="item" :index="index2" @doSupport="doSupport" @follow="onfollow">
							</news-item>
						</view>
						<!-- 上拉加载公共组件 -->
						<load-more :text="page.loadMore"></load-more>
					</template>
					<template v-else>
						<!-- 无内容组件 -->
						<empty-page text1='无内容' text2='请尝试刷新或者检查网络'></empty-page>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const fakeData = [{
			username: "昵称1",
			userpic: "/static/default/defUser.png",
			newstime: "2020-05-24 上午 11:31",
			isFollow: false,
			title: "这是一个标题",
			titlepic: "/static/demo/banner1.jpg",
			support: {
				type: "support",
				support_count: 123,
				unsupport_count: 0,
			},
			comment_count: 0,
			share_num: 2,
		},
		{
			username: "昵称2",
			userpic: "/static/default/defUser.png",
			newstime: "2020-05-24 上午 11:31",
			isFollow: true,
			title: "这是一个标题2",
			titlepic: "",
			support: {
				type: "unsupport",
				support_count: 0,
				unsupport_count: 5,
			},
			comment_count: 432,
			share_num: 0,
		},
		{
			username: "昵称3",
			userpic: "/static/default/defUser.png",
			newstime: "2020-05-24 上午 11:31",
			isFollow: false,
			title: "这是一个标题2",
			titlepic: "/static/demo/banner3.jpg",
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
	export default {
		components: {
			newsItem,
			loadMore
		},
		data() {
			return {
				tabIndex: 0, // 顶部默认分类
				scrollInto: "", // 顶部导航
				scrollH: 560, // 默认滚动容器高度
				// 模仿数据
				newsList: [],
				tabBars: [{
						name: "全部",
					},
					{
						name: "特别关注",
					},
					{
						name: "好友",
					},
					{
						name: "小组",
					},
					{
						name: "公共主页",
					}
				],
			}
		},
		// 监听导航栏搜索按钮
		onNavigationBarButtonTap(e) {
			// 跳转搜索
			uni.navigateTo({
				url: '../search/search',
				animationType: 'fade-in',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		onLoad() {
			// 获取窗口信息
			uni.getSystemInfo({
				success: res => {
					// 计算滚动容器高度=可使用窗口宽度-上下导航Bar-分类导航
					this.scrollH = res.windowHeight - 30
				}
			}),
			this.getData();
		},
		methods: {
			// 获取分类对应的文章数据
			getData() {
				let arr = [];
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						loadMore: "上拉加载更多",
						list: fakeData,
					};
					if (i > 3) {
						obj = {
							loadMore: "",
							list: [],
						};
					}
					arr.push(obj);
				}
				this.newsList = arr;
			},
			// 关注
			onfollow(e) {
				this.newsList[1].list[e].isFollow = !this.newsList[1].list[e].isFollow;
			},
			// 顶踩
			doSupport(e) {
				let item = this.newsList[1].list[e.index];
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
			// 改变头部分类导航
			changeTab(index) {
				if (index === this.tabIndex) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = "tab" + index;
			},
			// 监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current)
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
			}
		},
	};
</script>

<style scoped lang="less">
	.content {}
</style>
