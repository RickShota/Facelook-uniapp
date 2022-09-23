<template>
	<view class="p-2">
		<template v-if="list.length>0">
			<!-- 聊天列表 -->
			<block v-for="(item,index) in list" :key='index'>
				<msg-item :item="item" :index="index"></msg-item>
			</block>
		</template>
		<template v-else>
			<!-- 无内容组件 -->
			<empty-page text1='没有会话' text2='快去和Facelook用户互发消息吧'></empty-page>
		</template>
		<!-- 弹出层第三方组件 -->
		<uni-popup ref="popup" type="top">
			<view class="bg-white flex justify-center align-center font-md border-bottom py-2 " hover-class="bg-light"
				@click="popupEvent('readAll')">
				<text class="iconfont icon-xuanze1 mr-2"></text>一键已读
			</view>
			<view class="bg-white flex justify-center align-center font-md border-bottom py-2" hover-class="bg-light"
				@click="popupEvent('empty')">
				<text class="iconfont icon-shanchu mr-2"></text>清空列表
			</view>
		</uni-popup>
	</view>
</template>

<script>
	// 假数据
	const demo = [{
			avatar: "/static/default/defUser.png",
			username: "马化腾",
			update_time: 1661152170,
			data: "快点回来吃饭",
			noread: 1
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
	]
	import msgItem from '@/components/common/msg-item.vue'
	export default {
		components: {
			msgItem,
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			// this.list = demo
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		// 导航按钮
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0: // 联系人
					uni.navigateTo({
						url: '../friends-list/friends-list',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					break;
				case 1: // 清理缓存
					this.$refs.popup.open() // 弹出层
					break;
			}
		},
		methods: {
			// 刷新方法
			refresh() {
				setTimeout(() => {
					this.list = demo
					// 停止下拉刷新
					uni.stopPullDownRefresh()
				}, 2000)
			},
			// 弹出层二级菜单点击事件
			popupEvent(e) {
				switch (e) {
					case 'readAll':
						this.readAll()
						break;
					case 'empty':
						this.list = []
						break;
				}
				this.$refs.popup.close() // 关闭二级
			},
			// 一键已读
			readAll(){
				let arr = this.list.map((item,index)=>{
					item.noread = 0
				})
				setTimeout(() => {
					this.list = demo
				}, 2000)
			}
		}
	}
</script>

<style>

</style>
