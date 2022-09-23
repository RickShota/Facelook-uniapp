<template>
	<view class="px-2">
		<!-- 搜索历史 -->
		<template  v-if="searchRes.length===0">
			<view class="py-2 font-md">搜索历史</view>
			<!-- 搜索历史标签 -->
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-1 text-color" hover-class="bg-light"
					v-for="(item,index) in historyList" :key="index"
					@click="searchEvent(item)">
					{{item}}
				</view>
			</view>
		</template>
		<template v-else>
			<!-- 搜索结果展示 -->
				<block v-for="(item,index) in searchRes" :key="index">
					<news-item
						:item="item" 
						:index="index">
					</news-item>
				</block>
		</template>
	</view>
</template>

<script>
	const demo = [{
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
	import newsItem from '@/components/common/news-item.vue'
	export default {
		components: {
			newsItem
		},
		data() {
			return {
				// 伪造数据
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
				searchRes: [],
				text:''
			}
		},
		// 搜索框文本变化生命周期
		onNavigationBarSearchInputChanged(e) {
			this.text = e.text
			// 如果搜索框被清空,则同步清空searchRes
			if(this.text===''){
				this.searchRes=[]
			}
		},
		// 点击搜索按钮生命周期
		onNavigationBarSearchInputConfirmed(e) {
			this.searchEvent(this.text)
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent(this.text)
			}
		},
		methods: {
			// 搜索回调函数
			searchEvent(text) {
				console.log(text);
				// 收起键盘
				uni.hideKeyboard()
				// 放入历史记录
				if(!this.historyList.includes(text)){
					this.historyList.unshift(text)
				}
				// 开启loading加载
				uni.showLoading({
					title:'加载中...',
					mask:false
				})
				// 请求数据
				setTimeout(() => {
					// 关闭loading加载
					uni.hideLoading()
					this.searchRes = demo
				}, 1500)
			},
		}
	}
</script>

<style>
	.text-color {
		color: #3f3f3f;
	}
</style>
