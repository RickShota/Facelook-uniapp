<template>
	<view>
		<view>
			<view class="text-center font-lg log-text" v-if="!isCode">登录</view>
			<view class="text-center font-lg log-text" v-else>注册账号</view>
		</view>
		<!-- 登录页面 -->
		<template v-if="!isCode">
			<view class="ipts-btn">
				<view class="up-ipt">
					<input v-model="username" type="text" placeholder="用户名/邮箱/手机号" />
				</view>
				<view class="up-ipt">
					<input v-model="password" type="password" placeholder="请输入密码">
				</view>
				<view class="forget">
					<text @click="loginWay" style="color: #1b74e4;">注册账号</text>
					<text class="ml-1">|&nbsp;登录遇到问题？</text>
				</view>
				<view class="login-btn" hover-class="login-btn-ed" :class="disabled? '':'unlogin-btn'" 
					@click="onLogin">
					登&nbsp;&nbsp;&nbsp;录
				</view>
			</view>
		</template>
		<!-- 注册页面 -->
		<template v-else>
			<view class="ipts-btn">
				<view class="up-ipt2">
					<input v-model="username" type="text" placeholder="请输入用户名">
				</view>
				<view class="up-ipt2">
					<input v-model="password" type="password" placeholder="请输入密码">
				</view>
				<view class="up-ipt2">
					<input v-model="repassword" type="password" placeholder="请确认密码">
				</view>
				<view class="forget">
					<text @click="loginWay" style="color: #1b74e4;"><<返回登录</text>
				</view>
				<view class="login-btn" hover-class="login-btn-ed" :class="disabled? '':'unlogin-btn'"
					@click="onRegister">
					注&nbsp;&nbsp;&nbsp;册
				</view>
			</view>
		</template>

		<view class="mt-5 theWay">
			<view class="text-center py-2" style="color: #b3b3b3;font-size: 30rpx;">———&nbsp;社交账号登录&nbsp;———</view>
			<view class="flex align-center px-5">
				<view class="flex-1 flex flex-column align-center justify-center py-2">
					<view class="iconfont icon-xinlang" style="font-size: 80rpx;color: #e89213;"></view>
					<text class="font-sm mt-1 text-muted">新浪微博</text>
				</view>
				<view class="flex-1 flex flex-column align-center justify-center py-2">
					<view class="iconfont icon-QQ" style="font-size: 80rpx;color: #1d8ac9;"></view>
					<text class="font-sm mt-1 text-muted">QQ登录</text>
				</view>
				<view class="flex-1 flex flex-column align-center justify-center py-2">
					<view class="iconfont icon-weichat" style="font-size: 80rpx;color: #2d9a4f;"></view>
					<text class="font-sm mt-1 text-muted">微信登录</text>
				</view>
				<view class="flex-1 flex flex-column align-center justify-center py-2">
					<view class="iconfont icon-zhifubao" style="font-size: 80rpx;color: #259dd7;"></view>
					<text class="font-sm mt-1 text-muted">支付宝登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCode: false, // 登录还是注册
				username: '',
				password: '',
				repassword: '',
				codetime: 0
			}
		},
		computed: {
			// 判断内容为空登录按钮不可用
			disabled() {
				if ((this.username === '' || this.password === '') && (this.username === '' || this.password === '' || this
						.repassword === '')) {
					return false;
				}
				return true;
			}
		},
		methods: {
			// 改变登录模式
			loginWay() {
				this.isCode = !this.isCode;
				this.initForm();
			},
			// 初始化表单
			initForm() {
				this.username = '';
				this.password = '';
				this.repassword = '';
			},
			// 登录按钮
			onLogin() {
				uni.request({
					url: this.$C.baseUrl+'/api/login',
					method: 'POST',
					header: { // 请求头
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: { // 请求体
						username: this.username,
						password: this.password
					},
					success: (res) => {
						if(res.data.status===0) { // 登录成功
							// 调用vuex的登录处理函数
							this.$store.commit('login',res.data.token)
							// 关闭当前页面
							uni.navigateBack({
								delta: 1,
							});
							uni.showToast({
								icon: 'none',
								title: "登录成功！"
							});
						} else { // 登录失败
							uni.showToast({
								icon: 'none',
								title: res.data.message
							})
						}
					}
				})
			},
			// 注册
			onRegister() {
				// 表单验证
				if (this.password !== this.repassword) {
					uni.showToast({
						icon: 'none',
						title: "两次密码输入不一致"
					})
				} else {
					console.log("what");
					uni.request({
						url: this.$C.baseUrl+'/api/register',
						method: 'POST',
						header: { // 请求头
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: { // 请求体
							username: this.username,
							password: this.password
						},
						success: function(res) {
							if(res.data.status===0) { // 注册成功
								uni.showToast({
									icon: 'none',
									title: "注册成功！"
								})
								this.isCode = false
							} else { // 注册失败
								uni.showToast({
									icon: 'none',
									title: res.data.message
								})
							}
						}
					})
				}
			}

		}
	}
</script>

<style lang="less" scoped>
	.my-logo {
		text-align: center;
		margin: 50rpx 0;
		font-size: 60rpx;
		font-weight: bolder;
		font-family: sans-serif;
		color: #1b74e4;
	}

	.log-text {
		margin-top: 100rpx;
	}

	.ipts-btn {
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.up-ipt {
			height: 70rpx;
			margin: 15rpx 0;
			padding: 10rpx 20rpx;
			width: 90%;
			border: 6rpx solid #d9d9d9;
			border-radius: 35rpx;
			box-sizing: border-box;
		}

		.up-ipt2 {
			height: 70rpx;
			margin: 15rpx 0;
			padding: 10rpx 20rpx;
			display: flex;
			width: 90%;
			border: 6rpx solid #d9d9d9;
			border-radius: 35rpx;
			box-sizing: border-box;
			position: relative;

			.getCode-btn {
				position: absolute;
				right: 20rpx;
				padding-left: 20rpx;
				color: #000;
				border-left: 2px solid #d9d9d9;
			}

			.getCode-btn-ed {
				color: #1b74e4;
			}
		}

		.forget {
			color: #a8a8a8;
		}

		.login-btn {
			margin-top: 100rpx;
			background-color: #1b74e4;
			text-align: center;
			line-height: 70rpx;
			width: 60%;
			height: 70rpx;
			color: #fff;
			border-radius: 5px;
		}

		.login-btn-ed {
			background-color: #1766c7;
			color: #e3e3e3;
		}

		.unlogin-btn {
			background-color: #8cbeff;
			color: #ffffff;
		}
	}
</style>
