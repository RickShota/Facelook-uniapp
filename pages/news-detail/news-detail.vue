<template>
	<view>
		<!-- 内容区 -->
		<view class="item">
			<!-- 头像|昵称|关注 -->
			<view class="userImg">
				<view style="display: flex;align-items: center;">
					<!-- 头像 -->
					<image class="rounded-circle mr-2" @click.stop="openSpace" :src="data.userpic" lazy-load>
						<!-- 昵称 -->
						<view>
							<view class="name">{{data.username}}</view>
							<text class="font-small text-light-muted">{{data.newstime}}</text>
						</view>
				</view>
				<!-- 关注/已关注按钮 -->
				<view @click.stop="follow" v-if="!data.isFollow" class="unfollow-btn">关注
				</view>
				<view @click.stop="follow" v-else class="follow-btn">已关注
				</view>
			</view>
			<!-- 标题 -->
			<view class="font my-1">
				{{data.title}}
			</view>
			<!-- 正文 -->
			<view></view>
			<!-- 图片 -->
			<image v-if="data.titlepic" class="item-pic" mode="aspectFill" :src="data.titlepic">
			</image>
			<!-- 按钮组 -->
			<view class="item-btns mt-2">
				<view class="binf" hover-class="text-main"
					:class="data.support.type === 'support' ? 'support-active' : ''" @click="doSupport('support')">
					<text class="iconfont icon-dianzan"></text>
					<text style="margin-left: 20rpx;" v-if="data.support.support_count==0">赞</text>
					<text style="margin-left: 20rpx;" v-else>{{data.support.support_count}}</text>
				</view>
				<view class="binf" hover-class="text-main"
					:class="data.support.type === 'unsupport' ? 'support-active' : ''" @click="doSupport('unsupport')">
					<text class="iconfont icon-cai"></text>
					<text style="margin-left: 20rpx;" v-if="data.support.unsupport_count==0">踩</text>
					<text style="margin-left: 20rpx;" v-else>{{data.support.unsupport_count}}</text>
				</view>
				<view class="binf" hover-class="text-main" @click="share">
					<uni-icons type="redo" size="25"></uni-icons>
					<text style="margin-left: 20rpx;">分享</text>
				</view>
			</view>
		</view>
		<my-hr></my-hr>
		<!-- 评论列表 -->
		<view class="font-md p-2 font-weight-bold mb-2">评论&nbsp;{{data.comment_count}}</view>
		<block>
			<comment-item></comment-item>
			<comment-item></comment-item>
			<comment-item></comment-item>
			<comment-item></comment-item>
		</block>
		<!-- 留白 -->
		<view style="width: 100%;height: 100rpx;"></view>
		<!-- 底部输入栏 -->
		<view class="bottomBar">
			<view>
				<uni-icons type="camera-filled" size="30"></uni-icons>
			</view>
			<view>
				<input class="chat-input" type="text" auto-blur placeholder="写评论...">
			</view>
		</view>
		<!-- 弹出层第三方组件 -->
		<uni-popup ref="popup" type="bottom">
			<view class="text-center py-2 font-md border-bottom" style="background-color: white;">分享到</view>
			<view class="flex align-center" style="background-color: white;">
				<view class="flex-1 flex flex-column align-center justify-center py-2">
					<view class="iconfont icon-xinlang" style="font-size: 80rpx;color: #e89213;"></view>
					<text class="font-sm mt-1 text-muted">新浪微博</text>
				</view>
				<view class="flex-1 flex flex-column align-center justify-center py-2">
					<view class="iconfont icon-QQ" style="font-size: 80rpx;color: #1d8ac9;"></view>
					<text class="font-sm mt-1 text-muted">QQ好友</text>
				</view>
				<view class="flex-1 flex flex-column align-center justify-center py-2">
					<view class="iconfont icon-weichat" style="font-size: 80rpx;color: #2d9a4f;"></view>
					<text class="font-sm mt-1 text-muted">微信好友</text>
				</view>
				<view class="flex-1 flex flex-column align-center justify-center py-2">
					<view class="iconfont icon-zhifubao" style="font-size: 80rpx;color: #259dd7;"></view>
					<text class="font-sm mt-1 text-muted">支付宝好友</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import commentItem from '@/components/common/comment-item.vue';
	export default {
		components:{commentItem},
		data() {
			return {
				data: {}
			}
		},
		onLoad(params) {
			// 拿到数据并初始化
			if (params.detail) {
				this.__init(JSON.parse(params.detail))
			}
		},
		onNavigationBarButtonTap() {
			// 分享弹出层
			this.$refs.popup.open()
		},
		onBackPress() {
			this.$refs.popup.close()
		},
		methods: {
			__init(data) {
				// 存入数据
				this.data = data
			},
			// 关注
			follow() {
				this.data.isFollow = !this.data.isFollow;
			},
			// 顶踩
			doSupport(type) {
				let item = this.data;
				if (item.support.support_count >= 0 && item.support.unsupport_count >= 0) {
					// 判断原有的操作，避免重复操作
					switch (item.support.type) {
						case '': // 无顶踩
							item.support.type = type;
							item.support[type + "_count"]++;
							break;
						case 'support': // 已顶
							if (type === 'unsupport') { //点踩
								item.support.type = 'unsupport';
								item.support.support_count--;
								item.support.unsupport_count++;
							} else { // 再顶
								item.support.type = '';
								item.support.support_count--;
							}
							break;
						case 'unsupport': // 已踩
							if (type === 'support') { // 点顶
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
			
			// 分享
			share() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="less" scoped>
	.item {
		padding: 20rpx;
		margin-bottom: 100rpx;

		.userImg {
			display: flex;
			align-items: center;
			justify-content: space-between;

			image {
				width: 75rpx;
				height: 75rpx;
			}

			.name {
				font-size: 25rpx;
				line-height: 0.5;
			}

			text {
				color: #9d9589;
				line-height: 0.5;
			}

			.unfollow-btn {
				width: 90rpx;
				height: 50rpx;
				display: flex;
				font-size: 27rpx;
				align-items: center;
				justify-content: center;
				border-radius: 8rpx;
				background-color: #1676f1;
				color: #fff;
			}

			.follow-btn {
				width: 90rpx;
				height: 50rpx;
				display: flex;
				font-size: 27rpx;
				align-items: center;
				justify-content: center;
				border-radius: 8rpx;
				border: 1rpx solid #1676f1;
				color: #1676f1;
			}
		}

		.item-pic {
			width: 100%;
			min-height: 100rpx;
			border-radius: 10rpx;
			margin-top: 6rpx;
		}

		.item-btns {
			display: flex;
			justify-content: space-around;
			align-items: center;

			.binf {
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 1;
			}

			.support-active {
				color: #1676f1;
			}
		}
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
					margin-right: 40rpx;
					border-radius: 35rpx;
					background-color: #fff;
				}
			}

		}
	}
</style>
