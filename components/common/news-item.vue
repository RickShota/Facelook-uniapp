<template>
	<view class="item animated fast fadeIn">
		<!-- 头像|昵称|关注 -->
		<view class="userImg">
			<view style="display: flex;align-items: center;">
				<!-- 头像 -->
				<image class="rounded-circle mr-2" @click.stop="openSpace" :src="item.userpic" lazy-load>
					<!-- 昵称 -->
					<view>
						<view class="name">{{item.username}}</view>
						<text class="font-small text-light-muted">{{item.newstime}}</text>
					</view>
			</view>
			<!-- 关注/已关注按钮 -->
			<view @click.stop="follow" v-if="!item.isFollow" class="unfollow-btn">关注
			</view>
			<view @click.stop="follow" v-else class="follow-btn">已关注
			</view>
		</view>
		<!-- 标题 -->
		<view class="font my-1" @click="openDetail">
			{{item.title}}
		</view>
		<!-- 图片 -->
		<image @click="openDetail" v-if="item.titlepic" class="item-pic" mode="aspectFill" :src="item.titlepic">
		</image>
		<!-- 按钮组 -->
		<view class="item-btns mt-2">
			<view class="binf" hover-class="text-main" :class="item.support.type === 'support' ? 'support-active' : ''"
				@click="doSupport('support')">
				<text class="iconfont icon-dianzan"></text>
				<text style="margin-left: 20rpx;" v-if="item.support.support_count==0">赞</text>
				<text style="margin-left: 20rpx;" v-else>{{item.support.support_count}}</text>
			</view>
			<view class="binf" hover-class="text-main"
				:class="item.support.type === 'unsupport' ? 'support-active' : ''" @click="doSupport('unsupport')">
				<text class="iconfont icon-cai"></text>
				<text style="margin-left: 20rpx;" v-if="item.support.unsupport_count==0">踩</text>
				<text style="margin-left: 20rpx;" v-else>{{item.support.unsupport_count}}</text>
			</view>
			<view class="binf" hover-class="text-main" @click="comment">
				<uni-icons type="chat" size="24"></uni-icons>
				<text style="margin-left: 20rpx;" v-if="item.comment_count==0">评论</text>
				<text style="margin-left: 20rpx;" v-else>{{item.comment_count}}</text>
			</view>
			<view class="binf" hover-class="text-main" @click="share">
				<uni-icons type="redo" size="24"></uni-icons>
				<text style="margin-left: 20rpx;">分享</text>
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
	export default {
		name: 'newsItem',
		// 自定义属性
		props: {
			item: Object,
			index: Number,
		},

		methods: {
			openSpace() {
				console.log("个人空间");
			},
			follow(isFollow) {
				// 权限验证
				this.checkAuth(()=>{
					// 通知父组件
					this.$emit('follow', this.index);
				})
			},
			openDetail() {
				uni.navigateTo({
					url: '../../pages/news-detail/news-detail?detail=' + JSON.stringify(this.item)
				});
			},
			// 顶踩
			doSupport(type) {
				this.checkAuth(()=>{
					this.$emit('doSupport', { // 自定义事件子传父
						type: type,
						index: this.index
					})
				})
			},
			// 评论
			comment() {
				// 权限验证
				this.checkAuth(() => {
					this.openDetail()
				})
			},
			// 分享
			share() {
				// 权限验证
				this.checkAuth(() => {
					this.$refs.popup.open()
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.item {
		padding: 20rpx;

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
			height: 350rpx;
			width: 100%;
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
</style>
