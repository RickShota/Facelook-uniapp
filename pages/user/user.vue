<template>
	<view class="user">
		<view class="bg">
			<!-- 背景图 -->
			<image src="../../static/default/defBgi.jpg" mode="aspectFill" class="bgImg"></image>
			<!-- 用户头像 -->
			<image src="../../static/default/userImg.jpg" mode="aspectFill" class="userImg"></image>
		</view>
		<view class="userName">
			<!-- 用户名 -->
			<text>{{userName}}</text>
		</view>
		<view class="btns">
			<view class="send-new iconfont icon-tianjia" hover-class="send" @click="sendNew">
				<text class="ml-1">发布动态</text>
			</view>
			<view class="edit-info iconfont icon-dongtai" hover-class="edit">
				<text class="ml-1">编辑资料</text>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: #dedede;"></view>
		<!-- 个人情况 -->
		<view class="flex align-center px-3 py-2">
			<view v-for="(item,index) in myData" :key="index" class="flex-1 flex flex-column align-center justify-center">
				<text class="font-lg font-weight-bold">{{item.num}}</text>
				<text class="font text-muted">{{item.name}}</text>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: #dedede;margin: 10rpx 0;"></view>
		<!-- 个人标签 -->
		<view class="tap-title">📌 个人标签</view>
		<view class="taps">
			<view class="tap-item" v-for="(item,i) in tapList" :key="i">{{item}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: #dedede;margin: 10rpx 0;"></view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: 'Rick Henry',
				tapList: [
					'📚 学习',
					'🍕️️ 吃货',
					'🍨 美食',
					'🎬 电影',
					'🎠 骑马',
					'👟 跑步',
					'🎳 保龄球',
					'⛳ 高尔夫',
					'🕹 游戏',
				],
				myData: [
					{name:"帖子",num:9},
					{name:"动态",num:9},
					{name:"评论",num:1},
					{name:"粉丝",num:0},
				]
			}
		},
		methods: {
			sendNew(){
				uni.navigateTo({
					url: '../search/search',
					animationType: 'fade-in',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.user {
		padding: 20rpx 30rpx;
		position: relative;

		.bg {
			height: 450rpx;

			.bgImg {
				width: 100%;
				height: 350rpx;
				border-radius: 20rpx 20rpx 0 0;
			}

			.userImg {
				width: 260rpx;
				height: 260rpx;
				border-radius: 50%;
				border: 10rpx solid #fff;
				position: absolute;
				top: 175rpx;
				left: 50%;
				transform: translate(-50%, 0);
			}
		}

		.userName {
			height: 70rpx;
			font-size: 40rpx;
			font-weight: bold;
			text-align: center;
		}

		.btns {
			display: flex;
			justify-content: space-around;
			margin-bottom: 20rpx;

			view {
				width: 47%;
				height: 65rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 65rpx;
				font-size: 30rpx;
				font-weight: 700;
			}

			.send-new {
				background-color: #1b74e4;
				color: #fff;
			}

			.send {
				background-color: #155db4;
				color: #e2e2e2;
			}

			.edit-info {
				background-color: #e4e6eb;
			}

			.edit {
				background-color: #c6c7cb;
			}
		}
		
		.tap-title {
			color: #707070;
			font-size: 30rpx;
			margin: 20rpx;
		}

		.taps {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.tap-item {
				padding: 10rpx 20rpx;
				margin: 10rpx;
				border-radius: 30rpx;
				background-color: #e4e6eb;
			}
		}

	}
</style>
