<template>
	<view class="user">
		<template v-if="!isLog">
			<view>
				<empty-page text1="尚未登录，请登录"></empty-page>
				<button class="mt-3" @click="gotoLogin">立即前往登录</button>
			</view>
		</template>
		<template v-else>
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
				<view class="edit-info iconfont icon-dongtai" hover-class="edit" @click="editUserInfo">
					<text class="ml-1">编辑资料</text>
				</view>
			</view>
			<view style="width: 100%;height: 1px;background-color: #dedede;"></view>
			<!-- 个人情况 -->
			<view class="flex align-center px-3 py-2">
				<view v-for="(item,index) in myData" :key="index"
					class="flex-1 flex flex-column align-center justify-center">
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
			<!-- 近期动态 -->
			<view>
				<view class="tap-title">🌟 近期动态</view>
				<view v-for="(item,index) in myList" :key="index">
					<!-- 文章item公共组件 -->
					<news-item :item="item" :index="index"></news-item>
					<!-- 分割线全局组件 -->
					<my-hr></my-hr>
				</view>
				<!-- 上拉加载公共组件 -->
				<load-more :text="loadMore"></load-more>
			</view>
		</template>
	</view>
</template>

<script>
	import newsItem from '@/components/common/news-item.vue';
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {
			newsItem,
			loadMore
		},
		data() {
			return {
				isLog: false,
				userName: 'Rick Henry',
				loadMore: '上拉加载更多',
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
				myData: [{
						name: "帖子",
						num: 9
					},
					{
						name: "动态",
						num: 9
					},
					{
						name: "评论",
						num: 1
					},
					{
						name: "粉丝",
						num: 0
					},
				],
				myList: [{
					username: "Rick Henry",
					userpic: "/static/default/userImg.jpg",
					newstime: "2022-05-24 上午 11:31",
					isFollow: false,
					title: "马上就要到圣诞节了，提前祝大家圣诞快乐！",
					titlepic: "/static/demo/banner1.jpg",
					content: "",
					support: {
						type: "support",
						support_count: 123,
						unsupport_count: 0,
					},
					comment_count: 0,
					share_num: 2,
				}, ]
			}
		},
		onShow() {
			// 检查token,确定登录状态
			try {
				const value = uni.getStorageSync('token');
				if (value==='ok') {
					console.log(value);
					this.isLog = true
				} 
			} catch (e) {
				console.log(e.message);
			}
		},
		onNavigationBarButtonTap(){
			this.editUserInfo()
		},
		methods: {
			// 发布动态
			sendNew() {
				uni.navigateTo({
					url: '../add-input/add-input',
					animationType: 'slide-in-bottom',
				});
			},
			// 编辑资料
			editUserInfo(){
				uni.navigateTo({
					url: '../user-userInfo/user-userInfo',
					animationType: 'slide-in-bottom',
				});
			},
			// 登录
			gotoLogin(){
				uni.navigateTo({
					url: '../login/login',
					animationType: 'slide-in-bottom',
				})
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
