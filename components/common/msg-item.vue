<template>
	<view class="flex align-center border-bottom border-light-secondary" hover-class="bg-light"
		style="padding: 10rpx 0 10rpx;height: 100rpx;">
		<!-- 头像 -->
		<image :src="item.avatar" class="rounded-circle mr-2" style="height: 85rpx;width: 85rpx;">
		</image>
		<view class="flex flex-column flex-1">
			<view class="flex align-center justify-between">
				<!-- 昵称 -->
				<text class="font">{{ item.username }}</text>
				<!-- 时间 -->
				<text class="font-sm text-secondary">{{ item.update_time | formatTime }}</text>
			</view>
			<view class="flex align-center justify-between">
				<!-- 消息预览 -->
				<text class="text-secondary text-ellipsis" style="width: 500rpx;font-size: 25rpx;">{{ item.data }}</text>
				<!-- 角标：第三方插件 -->
				<uni-badge :text="item.noread" type="error" size="normal" style="margin-right: 20rpx;"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	// 注册js插件：时间库
	import $T from '@/common/time.js';
	
	export default {
		components: {

		},
		props: {
			item: Object,
			index: Number
		},
		// 过滤器
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			}
		},
		methods: {
			// 打开聊天页
			open() {
				uni.navigateTo({
					// url: '../../pages/user-chat/user-chat',

				});
			}
		}
	}
</script>

<style>
</style>
