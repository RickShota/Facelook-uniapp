<template>
		<view class="item">
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
				<view @click.stop="follow"
					v-if="!item.isFollow"
					class="unfollow-btn">关注
				</view>
				<view @click.stop="follow"
					v-else
					class="follow-btn">已关注
				</view>
			</view>
			<!-- 标题 -->
			<view class="font my-1" @click="openDetail">
				{{item.title}}
			</view>
			<!-- 图片 -->
			<image
				@click="openDetail"
				v-if="item.titlepic"
				class="item-pic" 
				mode="aspectFill" 
				:src="item.titlepic">
			</image>
			<!-- 按钮组 -->
			<view class="item-btns mt-2">
				<view class="binf" 
					hover-class="text-main"
					:class="item.support.type === 'support' ? 'support-active' : ''"
					@click="doSupport('support')">
					<text class="iconfont icon-dianzan"></text>
					<text style="margin-left: 20rpx;" v-if="item.support.support_count==0">赞</text>
					<text style="margin-left: 20rpx;" v-else>{{item.support.support_count}}</text>
				</view>
				<view class="binf" 
					hover-class="text-main" 
					:class="item.support.type === 'unsupport' ? 'support-active' : ''"
					@click="doSupport('unsupport')">
					<text class="iconfont icon-cai"></text>
					<text style="margin-left: 20rpx;" v-if="item.support.unsupport_count==0">踩</text>
					<text style="margin-left: 20rpx;" v-else>{{item.support.unsupport_count}}</text>
				</view>
				<view class="binf" hover-class="text-main" @click="doSupport('comment')">
					<text class="iconfont icon-pinglun"></text>
					<text style="margin-left: 20rpx;" v-if="item.comment_count==0">评论</text>
					<text style="margin-left: 20rpx;" v-else>{{item.comment_count}}</text>
				</view>
				<view class="binf" hover-class="text-main" @click="doSupport('share')">
					<text class="iconfont icon-fenxiang"></text>
					<text style="margin-left: 20rpx;">分享</text>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name:'newsItem',
		// 自定义属性
		props:{
			item:Object,
			index:Number,
		},
		methods: {
			openSpace() {
				console.log("个人空间");
			},
			follow(isFollow){
				this.$emit('follow',this.index);
			},
			openDetail(){
				console.log("详情");
			},
			doSupport(type){
				this.$emit('doSupport',{
					type:type,
					index:this.index
				})
			}
		},
	}
</script>

<style lang="less" scoped>
.item{
		padding: 20rpx;
		.userImg{
			display: flex;
			align-items: center;
			justify-content: space-between;
			image{
				width: 75rpx;
				height: 75rpx;
			}
			.name{
				font-size: 25rpx;
				line-height: 0.5;
			}
			text{
				color: #9d9589;
				line-height: 0.5;
			}
			.unfollow-btn{
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
			.follow-btn{
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
		.item-pic{
			height: 350rpx;
			width: 100%;
			border-radius: 10rpx;
			margin-top: 6rpx;
		}
		.item-btns{
			display: flex;
			justify-content: space-around;
			align-items: center;
			.binf{
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
