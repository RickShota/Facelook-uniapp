<template>
	<view>
		<!-- 自定义导航栏组件 -->
		<uni-nav-bar statusBar @clickLeft="goback" backgroundColor="#f0f2f5" left-icon="closeempty"
			fixed="true" title="创建帖子">
		</uni-nav-bar>
		<!-- #ifdef MP-WEIXIN -->
		<view style="padding: 40rpx;">
			<empty-page text1="出错啦" text2="该模块由于涉及个人主体小程序未开放类目，其用户输入功能已剔除，无法正常展示，App-Plus和H5端正常展示"></empty-page>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view style="padding: 20rpx;">
			<!-- 用户信息 -->
			<view class="userInfo">
				<view style="display: flex;align-items: center;">
					<!-- 头像 -->
					<image class="rounded-circle mr-2" src="/static/default/userImg.jpg" />
					<!-- 昵称 -->
					<view>
						<view class="name">Rick Henry</view>
						<text class="font-small text-light-muted">#所有人</text>
					</view>
					<!-- 发布按钮 -->
					<view class="send-btn" @click="send">发布</view>
				</view>
			</view>
			<!-- 输入框 -->
			<textarea class="editBox" placeholder="分享一下你的新鲜事吧" v-model="text"></textarea>
			<!-- 第三方插件：图片选择器 -->
			<uni-file-picker v-show="imageList.length>0" ref="choosePic" v-model="imageList" fileMediatype="image"
				mode="grid" @select="select" @progress="progress" @success="success" @fail="fail" />
		</view>
		<!-- #endif -->
		<!-- 底部操作条 -->
		<view class="bottomBar">
			<view class="iconfont icon-tuwenxiangqing" @click="checkImg"></view>
			<view class="iconfont icon-biaoqian"></view>
			<view class="iconfont icon-xiaolian1"></view>
			<view class="iconfont icon-dingwei1" @click="checkLocation"></view>
			<view class="iconfont icon-jianpan" @click="checkKeyboard"></view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uniFilePicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				text: '',
				imageList: [], // 图片缓存地址
			}
		},
		// 页面启动时钩子函数
		onLaunch() {

		},
		// 页面加载时钩子函数
		onLoad() {
			// 还原草稿
			uni.getStorage({
				key: 'add-input',
				success: (res) => {
					if (res.data) { // 如果有值
						let result = JSON.parse(res.data)
						this.text = result.content
						this.imageList = result.imageList
					}
				}
			})
		},
		methods: {
			// #ifdef APP || H5
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},
			// 上传成功
			success(e) {
				console.log('上传成功')
			},
			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			// 返回按钮
			goback() {
				// 保存草稿功能
				// #ifdef APP || APP-PLUS
				if (this.text !== '' || this.imageList.length > 0) {
					uni.showModal({
						content: '是否保存为草稿？',
						showCancel: true,
						cancelText: '不保存',
						confirmText: '保存',
						success: (res) => {
							if (res.confirm) {
								this.saveStore() // 存
							} else {
								// 返回上页
								uni.navigateBack({
									animationType: 'slide-out-bottom' // 返回动画：从底部滑出
								})
								// 清楚缓存
								uni.removeStorage({
									key: "add-input"
								})
							}
						}
					})
				} else {
					uni.navigateBack({
						animationType: 'slide-out-bottom'
					})
				}
				// #endif
				// #ifdef MP-WEIXIN || H5
				// 返回上页
				uni.navigateBack({
					data:1,
					animationType: 'slide-out-bottom' // 返回动画：从底部滑出
				})
				// #endif
			},
			// 发送按钮
			send() {
				console.log("发送内容：", this.text, this.imageList);
			},
			// 保存草稿
			saveStore() {
				let obj = {
					content: this.text,
					imageList: this.imageList
				}
				uni.setStorage({
					key: 'add-input',
					data: JSON.stringify(obj)
				})
			},
			checkImg() {
				// 调用uni-file-picker组件内部的选图片方法
				this.$refs.choosePic.choose();
			},
			checkLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				})
			},
			// #endif
			checkKeyboard() {
				uni.hideKeyboard()
			}
		}
	}
</script>

<style lang="less" scoped>
	.editBox {
		width: 100%;
		margin-top: 20rpx;
	}

	.userInfo {
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
		.send-btn{
			background-color: #1676f1;
			color: #fff;
			font-size: 30rpx;
			padding: 10rpx 20rpx;
			border-radius: 10rpx;
			position: fixed;
			right: 30rpx;
		}
	}

	.bottomBar {
		height: 100rpx;
		width: 100%;
		box-shadow: 2px 2px 5px 3px #c5c5c5;
		border-radius: 30rpx 30rpx 0 0;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		bottom: 0;

		view {
			flex: 1;
			text-align: center;
			font-size: 55rpx;

			&:nth-child(1) {
				color: #55aa00;
			}

			&:nth-child(2) {
				color: #0051ff;
			}

			&:nth-child(3) {
				color: #ffc800;
			}

			&:nth-child(4) {
				color: #e60000;
			}

			&:nth-child(5) {
				color: #585858;
			}
		}
	}
</style>
