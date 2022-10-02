<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x="true" :scroll-into-view="scrollInto" scroll-with-animation class="scroll-row">
			<view class="scroll-row-item px-3 py-1 font-md" v-for="(item, index) in tablist" :key="index"
				:id="'tab' + index" :class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
				@click="changeTab(index)" style="height: 60rpx">{{ item.name }}</view>
		</scroll-view>
		<my-hr></my-hr>
		<!-- 滑块 -->
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px;'">
			<swiper-item v-for="(item, index) in newList" :key="index">
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmore(index)">
					<!-- 文章列表 -->
					<template v-if="item.list.length > 0">
						<block v-for="(item2, index2) in item.list" :key="index2">

							<topic-item :item="item2" :index="index2"></topic-item>

						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadMore"></load-more>
					</template>
					<template v-else>
						<empty-page text1='空空如也'></empty-page>

					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const demo = [{
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
	import loadMore from '../../components/common/load-more.vue'
	import topicItem from '../../components/common/topic-item.vue'
	export default {
		name:"topicList",
		components: {
			topicItem,
			loadMore,
		},
		data() {
			return {
				newList: [],
				tabIndex: 0,
				scrollH: 800,
				scrollInto: "",
				tablist: [{
						name: "关注",
					},
					{
						name: "推荐",
					},
					{
						name: "体育",
					},
					{
						name: "热点",
					},
					{
						name: "财经",
					},
					{
						name: "娱乐",
					},
					{
						name: "军事",
					},
					{
						name: "历史",
					},
					{
						name: "本地",
					},
				],
			}
		},
		onLoad() {
				uni.getSystemInfo({
					success: (res) => {
						this.scrollH = res.windowHeight - res.statusBarHeight - uni.upx2px(100);
						// console.log(this.scrollH)
					},
				}),
					this.getDate();
			},
			methods: {
				loadmore(index) {
					//数据验证
					if (this.newList[index].loadMore !== "上拉加载更多...") {
						return;
					}
					this.newList[index].loadMore = "加载中...";
					setTimeout(() => {
						this.newList[index].list = [
							...this.newList[index].list,
							...this.newList[index].list,
						];
						this.newList[index].loadMore = "上拉加载更多...";
					}, 2000);
				},
				getDate() {
					var arr = [];
					for (let i = 0; i < this.tablist.length; i++) {
						let obj = {
							list: [],
							loadMore: "上拉加载更多...",
						};
						if (i < 2) {
							obj = {
								list: demo,
								loadMore: "上拉加载更多...",
							};
						}
						arr.push(obj);
					}
		
					this.newList = arr;
				},
				follow(e) {
					this.newList[0].list[e].isFollow = !this.newList[0].list[e].isFollow;
					if (!this.newList[0].list[e].isFollow) {
						uni.showToast({
							title: "已取消关注",
						});
					} else {
						uni.showToast({
							title: "关注成功",
						});
					}
				},
				doSupport(e) {
					let item = this.newList[0].list[e.index];
					console.log();
					let msg = e.type === "support" ? "点赞" : "反对";
					if (item.support.type === "") {
						item.support.type = e.type;
						item.support[e.type + "_count"]++;
					}
					if (item.support.type === "support" && e.type === "unsupport") {
						item.support.support_count++;
						item.support.unsupport_count--;
					} else if (item.support.type === "unsupport" && e.type === "support") {
						item.support.support_count--;
						item.support.unsupport_count++;
					}
					item.support.type = e.type;
					uni.showToast({
						title: msg + "成功",
					});
				},
				changeTab(index) {
					if (index === this.tabIndex) {
						return;
					}
					this.tabIndex = index;
					this.scrollInto = "tab" + index;
				},
		
				// 监听滑动
				onChangeTab(e) {
					this.changeTab(e.detail.current);
				},
		
				onNavigationBarButtonTap() {
					uni.navigateTo({
						url: "../add-input/add-input",
					});
				},
			},
	}
</script>

<style>

</style>
