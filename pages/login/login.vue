<template>
	<view>
		<view>
			<view class="my-logo">facelook</view>
			<view class="text-center font-lg log-text" v-if="!isCode">账号密码登录</view>
			<view class="text-center font-lg log-text" v-else>验证码登录</view>
		</view>
		<!-- 账号密码登录 -->
		<template v-if="!isCode">
			<view class="ipts-btn">
				<view class="up-ipt">
					<input v-model="username" type="text" placeholder="用户名/邮箱/手机号(任意字符)" />
				</view>
				<view class="up-ipt">
					<input v-model="password" type="password" placeholder="请输入密码(任意字符)">
				</view>
				<view class="forget">
					<text @click="loginWay" style="color: #1b74e4;">验证码登录</text>
					<text class="ml-1">|&nbsp;登录遇到问题</text>
				</view>
				<view class="login-btn" hover-class="login-btn-ed" :class="disabled? '':'unlogin-btn'" @click="submit">
					登&nbsp;&nbsp;&nbsp;录
				</view>
			</view>
		</template>
		<!-- 验证码登录 -->
		<template v-else>
			<view class="ipts-btn">
				<view class="up-ipt2">
					<view class="mr-2">+86</view>
					<input v-model="phone" type="text" placeholder="请输入手机号">
				</view>
				<view class="up-ipt2">
					<input v-model="code" type="text" placeholder="请输入6位验证码">
					<view class="getCode-btn" hover-class="getCode-btn-ed" @click="getCode">{{codetime>0?codetime+'s':'获取验证码'}}</view>

				</view>
				<view class="forget">
					<text @click="loginWay" style="color: #1b74e4;">账号密码登录</text>
					<text class="ml-1">|&nbsp;登录遇到问题</text>
				</view>
				<view class="login-btn" hover-class="login-btn-ed" :class="disabled? '':'unlogin-btn'" @click="submit">
					登&nbsp;&nbsp;&nbsp;录
				</view>
			</view>
		</template>
		<view class="mt-5">
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
				isCode: false, // 是否验证码登录
				username: '',
				password: '',
				phone: '',
				code: '',
				codetime: 0
			}
		},
		computed: {
			// 判断内容为空登录按钮不可用
			disabled() {
				if ((this.username === '' || this.password === '')&&(this.phone === '' || this.code === '')) {
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
				this.phone = '';
				this.code = '';
			},
			// 获取验证码
			getCode(){
				// 节流
				if (this.codetime > 0) return;
				// 验证手机号
				if (!this.validate(this.phone,'phone')) {
					uni.showToast({
						title:'手机号格式不正确',
						icon:'none'
					});
					return false;
				}
				this.codetime = 60;
				let timer = setInterval(()=>{
					if(this.codetime>=1){
						this.codetime--
					}else{
						this.codetime = 0
						clearInterval(timer)
					}
				},1000);
			},
			// 表单验证
			validate(data,type){
				var regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				if (type === 'phone'){
					return regPhone.test(data);
				}
				// 更多验证
				return true
			},
			// 登录
			submit(){
				// 表单验证
				if (this.isCode){
					if (!this.validate(this.phone,'phone')) {
						uni.showToast({
							title:'手机号格式不正确',
							icon:'none'
						});
						return false;
					}
				}
				
				// 提交后端
				// 登录成功处理
				uni.setStorage({
					key: 'token',
					data: 'ok',
					success: ()=>{
						// 关闭当前页面
						uni.navigateBack({
							delta: 1,
						});
					}
				});

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
