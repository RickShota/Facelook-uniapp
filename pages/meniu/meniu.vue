<template>
	<view class="menuPage">
		<!-- 个人信息 -->
		<view class="flex align-center">
			<image src="/static/demo/demo6.jpg" class="rounded-circle mr-2" style="height: 70rpx;width: 70rpx;"></image>
			<view class="flex flex-column flex-1">
				<view class="flex align-center justify-between">
					<!-- 昵称 -->
					<text class="font">Rick Henry</text>
				</view>
				<view class="flex align-center justify-between">
					<text class="text-secondary text-ellipsis" style="width: 500rpx;font-size: 25rpx;">查看你的个人主页</text>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view style="width: 100%;height: 1px;background-color: #dedede; margin: 20rpx 0;"></view>
		<text style="font-size: 26rpx;margin-left: 5rpx;">所有快速访问项目</text>
		<!-- 功能按钮 -->
		<view class="btns">
			<view hover-class="hoverbtn" @click="gotoNews">️️
				<text style="margin-left: 10rpx;">🌟</text><br>
				<text>动态</text>
			</view>
			<view hover-class="hoverbtn" @click="gotoFreinds">
				<text style="margin-left: 10rpx;">👥</text><br>
				<text>好友</text>
			</view>
			<view hover-class="hoverbtn">
				<text style="margin-left: 10rpx;">🙏</text><br>
				<text>小组</text>
			</view>
			<view hover-class="hoverbtn">
				<text style="margin-left: 10rpx;">📺</text><br>
				<text>视频</text>
			</view>
			<view hover-class="hoverbtn">
				<text style="margin-left: 10rpx;">⏳</text><br>
				<text>那年今天</text>
			</view>
			<view hover-class="hoverbtn">
				<text style="margin-left: 10rpx;">🔖</text><br>
				<text>收藏夹</text>
			</view>
			<view hover-class="hoverbtn">
				<text style="margin-left: 10rpx;">🚩</text><br>
				<text>公共主页</text>
			</view>
			<view hover-class="hoverbtn">
				<text style="margin-left: 10rpx;">🕹</text><br>
				<text>活动</text>
			</view>
		</view>
		<!-- 分割线 -->
		<view style="width: 100%;height: 1px;background-color: #dedede; margin: 20rpx 0;"></view>
		<uni-collapse>
			<uni-collapse-item title="帮助与支持"
				thumb="/static/default/help.png"
				show-animation>
				<view class="btns">
					<view hover-class="hoverbtn">️️
						<text style="margin-left: 10rpx;">🛟</text><br>
						<text>帮助中心</text>
					</view>
					<view hover-class="hoverbtn">
						<text style="margin-left: 10rpx;">⚠️️</text><br>
						<text>报告问题</text>
					</view>
					<view hover-class="hoverbtn">️️
						<text style="margin-left: 10rpx;">🛡</text><br>
						<text>账户安全</text>
					</view>
					<view hover-class="hoverbtn">
						<text style="margin-left: 10rpx;">📜</text><br>
						<text>条款政策</text>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="设置与隐私"
				thumb="/static/default/setting.png"
				show-animation>
				<view class="btns-last">
					<view hover-class="hoverbtn">️️
						<text style="margin: 0 10rpx;">⚙️</text>
						<text>通用设置</text>
					</view>
					<view hover-class="hoverbtn">
						<text style="margin: 0 10rpx;">📲</text>
						<text>设备登录请求</text>
					</view>
					<view hover-class="hoverbtn">️️
						<text style="margin: 0 10rpx;">🎯</text>
						<text>个性化广告</text>
					</view>
					<view hover-class="hoverbtn">
						<text style="margin: 0 10rpx;">🗃️</text>
						<text>个人信息收集</text>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			gotoNews(){
				
			},
			gotoFreinds(){
				uni.navigateTo({
					url: '../friends-list/friends-list',
					animationType: '',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f0f2f5;

		.menuPage {
			padding: 20rpx;

			.btns {
				margin: 20rpx 0;
				display: flex;
				justify-content: last baseline;
				flex-wrap: wrap;

				.hoverbtn {
					background-color: #c8c8c8;
				}

				view {
					background-color: #fff;
					width: 47%;
					height: 120rpx;
					border-radius: 15rpx;
					border: 1rpx solid #e8e8e8;
					box-shadow: 2px 3px 20px 1px #dcdcdc;
					margin: 0 15rpx 15rpx 0;
					padding: 20rpx;
					box-sizing: border-box;
					font-size: 30rpx;
				}
			}
			
			.btns-last{
				margin: 20rpx 0;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				.hoverbtn {
					background-color: #c8c8c8;
				}
				view {
					background-color: #fff;
					width: 95%;
					height: 90rpx;
					border-radius: 15rpx;
					border: 1rpx solid #e8e8e8;
					box-shadow: 2px 3px 20px 1px #dcdcdc;
					margin: 0 15rpx 15rpx 0;
					padding: 20rpx;
					box-sizing: border-box;
					font-size: 30rpx;
				}
			}
		
		}
	}
</style>
