<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar statusBar fixed="true">
			<template v-slot:left>
				<view class="back-btn iconfont icon-back" @click="back"></view>
			</template>
			<template>
				<input type="text" 
					:placeholder="pageTitle" 
					v-model="text" 
					class="the-ipt" 
					confirm-type="搜索"
					@confirm="searchEvent()"/>
			</template>
		</uni-nav-bar>
		<!-- #endif -->
		
		<view class="px-2">
			<!-- 搜索历史 -->
			<template v-if="searchRes.length===0">
				<view class="py-2 font-md">搜索历史</view>
				<!-- 搜索历史标签 -->
				<view class="flex flex-wrap">
					<view class="border rounded font mx-2 my-1 px-1 text-color" hover-class="bg-light"
						v-for="(item,index) in historyList" :key="index" @click="searchEvent(item)">
						{{item}}
					</view>
				</view>
			</template>
			<template v-else>
				<!-- 搜索结果展示 -->
				<block v-for="(item,index) in searchRes" :key="index">
					<template v-if="searchType==='user'">
						<friends-item :item="item" :index="index"></friends-item>
					</template>
					<template v-else-if="searchType==='topic'">
						<topic-item :item="item" :index="index"></topic-item>
					</template>
					<template v-else-if="searchType==='facelook'">
						<view style="height: 50rpx;width: 100%;text-align: center;line-height: 50rpx;">无搜索结果</view>
					</template>
					<template v-else>
						<news-item :item="item" :index="index"></news-item>
					</template>
				</block>
			</template>
		</view>
	</view>
	
</template>

<script>
	const newsData = [{
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
	
	const userData = [{
			avatar: "/static/default/defUser.png",
			username: "赵丽颖",
			sex: 1,
			age: 26,
			isFollow: true
		},
		{
			avatar: "/static/default/defUser.png",
			username: "男爵",
			sex: 2,
			age: 14,
			isFollow: false
		}, {
			avatar: "/static/default/defUser.png",
			username: "赵丽颖",
			sex: 1,
			age: 26,
			isFollow: true
		},
		{
			avatar: "/static/default/defUser.png",
			username: "男爵",
			sex: 2,
			age: 14,
			isFollow: false
		}, {
			avatar: "/static/default/defUser.png",
			username: "赵丽颖",
			sex: 1,
			age: 26,
			isFollow: true
		},
		{
			avatar: "/static/default/defUser.png",
			username: "男爵",
			sex: 2,
			age: 14,
			isFollow: false
		}
	];
	
	const AllData = []
	const topicData = [{
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
	];

	import newsItem from '@/components/common/news-item.vue';
	import topicItem from '@/components/common/topic-item.vue';
	import friendsItem from '@/components/common/friends-item.vue';
	// #ifdef MP-WEIXIN
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	// #endif
	export default {
		components: {
			newsItem,
			topicItem,
			friendsItem,
			// #ifdef MP-WEIXIN
			uniNavBar
			// #endif
		},
		data() {
			return {
				// 伪造历史记录数据
				historyList: [
					'羊了个羊',
					'iPhone 14灵动岛',
					'俄乌冲突',
					'微软Win11 22H2',
					'卢克文工作室',
					'司马南',
					'U型锁',
					'杭电'
				],
				searchRes: [], // 搜索结果
				text: '', // 搜索内容
				searchType: '', // 搜索类型
				pageTitle:'在Facelook中搜索'
			}
		},
		// 窗口加载钩子函数
		onLoad(e) {
			if (e.type) this.searchType = e.type
			let pageTitle = ''
			switch (this.searchType) {
				case 'user':
					pageTitle = '搜索用户'
					break;
				case 'topic':
					pageTitle = '搜索话题'
					break;
				case 'facelook':
					pageTitle = '在Facelook中搜索'
					break;
				default:
					pageTitle = '搜索帖子'
			}
			this.pageTitle = pageTitle
			// 动态修改导航栏搜索框占位符
			// #ifdef APP-PLUS
			let currentWebview = this.$mp.page.$getAppWebview()
			let tn = currentWebview.getStyle().titleNView
			tn.searchInput.placeholder = pageTitle
			currentWebview.setStyle({
				titleNView: tn
			})
			// #endif

		},
		// 监听搜索框文本变化
		onNavigationBarSearchInputChanged(e) {
			this.text = e.text
			// 如果搜索框被清空,则同步清空searchRes
			if (this.text === '') {
				this.searchRes = []
			}
		},
		// 用户点击软键盘上的“搜索”按钮时触发
		onNavigationBarSearchInputConfirmed(e) {
			this.searchEvent(this.text)
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent(this.text)
			}
		},
		methods: {
			// 搜索事件
			searchEvent(data) {
				let text = this.text?this.text:data
				console.log(text);
				// 收起键盘
				uni.hideKeyboard()
				// 放入历史记录
				if (!this.historyList.includes(text)) {
					this.historyList.unshift(text)
				}
				// 开启loading加载
				uni.showLoading({
					title: '加载中...',
					mask: false
				})
				// 请求数据
				setTimeout(() => {
					// 关闭loading加载
					uni.hideLoading()
					switch (this.searchType) {
						case 'user':
							this.searchRes = userData
							break;
						case 'topic':
							this.searchRes = topicData
							break;
						case 'facelook':
							this.searchRes = [1]
							break;
						default:
							this.searchRes = newsData
					}
				}, 1500)
			},
			back(){
				uni.navigateBack({
					data: 1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.text-color {
		color: #3f3f3f;
	}
	.the-ipt{
		width: 100%;
		height: 35px;
		margin-top: 3px;
		text-align: center;
		flex: 2;
	}
</style>
