<template>
	<view class="comment-item animated fast fadeIn ">
		<!-- 头像|昵称|点赞 -->
		<view class="h">
			<image src="/static/default/defUser.png" mode="" class="rounded-circle mr-2"></image>
			<view class="user-name">name</view>
			<view class="binf" hover-class="text-main">
				<text class="iconfont icon-dianzan"></text>
				<text style="margin-left: 20rpx;">赞</text>
			</view>
		</view>
		<!-- 内容 -->
		<view class="b">哈哈，这是一条评论，这是一条评论</view>
		<!-- 回复|时间 -->
		<view class="t">
			<view class="cb">回复&nbsp;></view>
			<view class="time">1小时前</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		name:'commentItem',
		data() {
			return {
				
			}
		},
	}
</script>

<style lang="less" scoped>
	.comment-item{
		padding: 20rpx;
		.h{
			display: flex;
			align-items: center;
			image{
				width: 60rpx;
				height: 60rpx;
			}
			.user-name{
				flex: 1;
				font-size: 30rpx;
			}
		}
		.b{
			padding: 0 40rpx 20rpx 80rpx;
		}
		.t{
			display: flex;
			align-items: center;
			padding: 0 40rpx 0 80rpx;
			.cb{
				background-color: #f0f0f0;
				border-radius: 10px;
				padding: 5rpx 20rpx;
				font-size: 20rpx;
			}
			.time{
				margin-left: 20rpx;
				font-size: 20rpx;
				color: #b0b0b0;
			}
		}
	}
</style>