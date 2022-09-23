<template>
	<!-- 首页 -->
	<view class="content">
		<!-- 顶部选项卡 -->
		<scroll-view :scroll-x="true" class="scroll-row top-scroll" scroll-with-animation
			:scroll-into-view="scrollInto">
			<view v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)" :id="'tab'+index"
				:class="tabIndex === index ? 'check' : 'uncheck'" class="scroll-row-item px-3 py-1 font">{{item.name}}
			</view>
		</scroll-view>
		<!-- 左右滑块视图容器 -->
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px;'">
			<!-- 滑块item -->
			<swiper-item v-for="(page,index) in newsList" :key="index">
				<!-- 上下滚动容器 -->
				<scroll-view scroll-y @scrolltolower="loadmore(index)" :style="'height:' + scrollH + 'px;'">
					<template v-if="page.list.length>0">
							<!-- 聊天列表 -->
							<block v-for="(item,index2) in page.list" :key='index2'>
								<msg-item :item="item" :index="index2"></msg-item>
							</block>
					</template>
					<template v-else>
						<!-- 无内容组件 -->
						<empty-page text1='没有通知' text2='你收到的通知会显示在这里'></empty-page>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const fakeData = [{
			avatar: "/static/default/defUser.png",
			username: "马化腾",
			update_time: 1661152170,
			data: "快点回来吃饭",
			noread: 0
		},
		{
			avatar: "/static/default/defUser.png",
			username: "马云",
			update_time: 1663830570,
			data: "知道了",
			noread: 1
		},
		{
			avatar: "/static/default/defUser.png",
			username: "郭富城",
			update_time: 1661152170,
			data: "你在干嘛",
			noread: 99
		},
		{
			avatar: "/static/default/defUser.png",
			username: "Tim Cook",
			update_time: 1663830570,
			data: "Hey my honey,how is it goning The new iPhone is on the way!",
			noread: 2
		},
		{
			avatar: "/static/default/defUser.png",
			username: "小冰",
			update_time: 1624437713,
			data: "需要什么帮助吗主任",
			noread: 4
		}
	];
	import msgItem from '@/components/common/msg-item.vue';
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {
			msgItem,
			loadMore
		},
		data() {
			return {
				tabIndex: 0, // 顶部默认分类
				scrollInto: "", // 顶部导航
				scrollH: 600, // 默认滚动容器高度
				// 模仿数据
				newsList: [],
				tabBars: [{
						name: "全部",
					},
					{
						name: "未读",
					}
				],
			}
		},
		// 监听导航栏搜索按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../friends-list/friends-list',
				animationType: '',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		onLoad() {
			// 获取系统信息
			uni.getSystemInfo({
					success: res => {
						// 计算滚动容器高度=总高度-上下导航Bar-分类导航
						this.scrollH = res.windowHeight - uni.upx2px(110)
					}
				}),
				this.getData()
		},
		methods: {
			// 获取分类对应的文章数据
			getData() {
				let arr = [];
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						list: fakeData,
					}
					if (i > 0) {
						obj = {
							list: [],
						};
					}
					arr.push(obj);
				}
				this.newsList = arr;
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
		},
	};
</script>

<style scoped lang="less">
	.content {
		padding: 0 20rpx;
		.top-scroll {
			margin: 30rpx 20rpx 20rpx;

			.check {
				height: 40rpx;
				line-height: 35rpx;
				background-color: #e7f3fe;
				color: #1b74e4;
				border-radius: 40rpx;
				margin-right: 20rpx;
				font-size: 28rpx;
			}

			.uncheck {
				height: 40rpx;
				line-height: 35rpx;
				background-color: #e4e6eb;
				color: #000;
				border-radius: 40rpx;
				margin-right: 20rpx;
				font-size: 28rpx;
			}
		}
	}
</style>
