<template>
	<view class="mx-2">
		<!-- tabBar -->
		<view class=" flex align-center " style="height: 100rpx;">
			<view class="flex-1 flex align-center justify-center " v-for="(item, index) in tabBars" :key="index"
				:class="index === tabIndex ? 'font-md text-main font-weight-bold ' : 'font'"
				@click="changeTab(index)">
				{{ item.name }}
				<text class="ml-2 font" v-if="item.mun > 0">{{ item.mun }}</text>
			</view>
		</view>
		<!-- 列表 -->
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px;'">
			<swiper-item v-for="(item, index) in newList" :key="index">
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmore(index)">
					<!-- 好友列表 -->
					<template v-if="item.list.length > 0">
						<block v-for="(item2, index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<friends-item :item="item2" :index="index"></friends-item>
						</block>
						<!-- 上拉加载 -->
						<load-more v-if="item.list.length>10" :loadmore="item.loadMore"></load-more>
					</template>
					<template v-else>
						<empty-page text1='空空如也' text2='快去结交一些朋友吧'></empty-page>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const demo = [{
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
		},{
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
		},{
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
	import loadMore from '@/components/common/load-more.vue'
	import friendsItem from '@/components/common/friends-item.vue';
	export default {
		data() {
			return {
				scrollH: 600,
				tabIndex: 0,
				newList: [],
				tabBars: [{
						name: '互关',
						mun: 2
					},
					{
						name: '关注',
						mun: 2
					},
					{
						name: '粉丝',
						mun: 0
					}
				]
			}
		},
		components: {
			loadMore,
			friendsItem
		},
		// 点击输入框事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?type=user',
				animationType:'fade-in'
			});
		},
		// 点击取消
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			});
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(100);
				}
			});
			this.getDate();
		},
		methods: {
			getDate() {
				var arr = [];
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						list: [],
						loadMore: '上拉加载更多...'
					};
					if (i < 2) {
						obj = {
							list: demo,
							loadMore: '上拉加载更多...'
						};
					}
					arr.push(obj);
				}

				this.newList = arr;
			},
			changeTab(index) {
				this.tabIndex = index;
			},
			// 监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},
			loadmore(index) {
				//数据验证
				if (this.newList[index].loadMore !== '上拉加载更多...') {
					return;
				}
				this.newList[index].loadMore = '加载中...';
				setTimeout(() => {
					this.newList[index].list = [...this.newList[index].list, ...this.newList[index].list];
					this.newList[index].loadMore = '上拉加载更多...';
				}, 2000);
			}
		}
	}
</script>

<style>

</style>
