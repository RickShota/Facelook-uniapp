<template>
	<view>
		<!-- 聊天列表 -->
		<scroll-view scroll-y="true" class="talk-page"
			:scroll-into-view="scrollInto" scroll-with-animation>
			<block v-for="(item,index) in list" :key="index">
				<view :id="'chat'+index" style="padding-bottom: 20rpx;">
					<!-- 聊天气泡 -->
					<chat-item 
						:pretime="index > 0 ? list[index - 1].create_time : 0" 
						:item="item" :index="index">
					</chat-item>
				</view>
			</block> 
		</scroll-view>

		<!-- 底部输入栏 -->
		<view class="bottomBar">
			<view>
				<uni-icons type="camera-filled" size="30"></uni-icons>
			</view>
			<view>
				<input @confirm="submit" class="chat-input" type="text" auto-blur v-model="content" placeholder="Aa">
			</view>
			<view @click="submit">
				<uni-icons type="paperplane-filled" size="30"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import chatItem from '@/components/common/chat-item.vue';
	export default {
		components: {
			chatItem
		},
		data() {
			return {
				scrollInto: '',
				content: '', // 输入内容
				list: [{
						user_id: 2,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '你好啊!',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 1,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '你好',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 1,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '有什么事吗',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 1,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '嗯？？？',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 2,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '是这样的，最近在投资一个项目，手头有点缺票子，想跟兄弟借一点',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 1,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '你想借多少',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 1,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '我最近手头也不宽裕啊',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 2,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '20万吧，最迟6个月后就还你',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 2,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '连本带利',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 2,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '哥，还在吗',
						type: 'text',
						create_time: 1624590987
					},
					{
						user_id: 2,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '兄弟在吗兄弟？要不先借10万吧',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 2,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '求求你了',
						type: 'text',
						create_time: 1624590418
					},
					{
						user_id: 1,
						avatar: '/static/default/defUser.png',
						username: '昵称',
						data: '不好意思，我不认识你',
						type: 'text',
						create_time: 1624590418
					}
				]
			};
		},
		props:['username'],
		onReady() {
			// 滚到底部
			this.pageToBottom()
		},
		onLoad(e) {
			// 拿到数据调用方法修改导航栏标题
			if(e.username){
				this.__init(e.username)
			}
		},
		methods: {
			// 滚动到底部
			pageToBottom() {
				let lastIndex = this.list.length - 1;
				if (lastIndex < 0) return;
				this.scrollInto = 'chat' + lastIndex;
			},
			// 修改标题
			__init(data){
				uni.setNavigationBarTitle({
					title:data
				})
			},
			// 发送
			submit() {
				let obj = {
					user_id: 1,
					avatar: '/static/default/defUser.png',
					username: '昵称',
					type: 'text',
					data: this.content,
					create_time: new Date().getTime()
				};
				if (this.content === '') {
					return uni.showToast({
						title: '信息不能为空',
						icon: 'none'
					});
				}
				this.list.push(obj);
				// 清空输入框
				this.content = '';
				// 滚动到底部
				this.$nextTick(()=>{
					this.pageToBottom()
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.talk-page {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 100rpx;
	}

	.bottomBar {
		height: 100rpx;
		width: 100%;
		border-top: 1rpx solid #e8e8e8;
		background-color: #f0f2f5;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		bottom: 0;

		view {

			&:nth-child(1) {
				margin: 20rpx;
			}

			&:nth-child(2) {
				flex: 1;

				.chat-input {
					height: 70rpx;
					font-size: 36rpx;
					padding: 0 30rpx;
					border-radius: 35rpx;
					background-color: #fff;
				}
			}


			&:nth-child(3) {
				margin: 20rpx;
			}
		}
	}
</style>
