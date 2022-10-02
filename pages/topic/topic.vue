<template>
	<view>
		<!-- 热门分类 -->
		<hot-cate :hotCate="hotCate"></hot-cate>
		<!-- 搜索框 -->
		<view class="p-2">
			<view class="bg-light rounded flex align-center justify-center py-2 text-secondary" 
				@click="gotoSearch"
				style="border-radius: 30rpx;">
				<text class="iconfont icon-sousuo mr-2"></text>
				搜索话题
			</view>
		</view>
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
</template>

<script>
	import hotCate from '../../components/common/hot-cate.vue'
	import topicItem from '../../components/common/topic-item.vue'
	export default {
		components:{
			hotCate,topicItem
		},
		data() {
			return {
				scrollH: 500,
				tabIndex: 0,
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
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 44;
				},
			});
		},
		methods: {
			// 打开分布页
			openAddInput() {
				uni.navigateTo({
					uni: "../add-input/add-input",
				});
			},// 前往搜索页
			gotoSearch(){
				uni.navigateTo({
					url: '../search/search?type=topic',
				});
			},
			// 上拉加载更多
			loadMoreEvent() {
				//数据验证
				if (this.loadMore !== "上拉加载更多...") return;
				this.loadMore = "加载中...";

				setTimeout(() => {
					this.list = [...this.list, ...this.list];
					this.loadMore = "上拉加载更多...";
				}, 2000);
			},
		},
	}
</script>

<style>

</style>
