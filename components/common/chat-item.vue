<template>
	<view class="animated fast fadeIn ">
		<!-- 时间 -->
		<view v-show="shortTime" class="py-2 flex align-center justify-center font-sm text-light-muted">{{shortTime}}
		</view>
		<template v-if="isSelf">
			<view class="my-talk my-1">
				<view class="my-pop">
					<text>{{ item.data }}</text>
				</view>
				<image :src="item.avatar" class="userImg rounded-circle ml-2"></image>
			</view>
		</template>
		<template v-else>
			<view class="your-talk my-1">
				<image :src="item.avatar" class="userImg rounded-circle mr-2"></image>
				<view class="your-pop">
					<text>{{ item.data }}</text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import $T from '@/common/time.js';
	const uid =1;
	export default {
		name: 'chatItem',
		props: {
			item: Object,
			index: Number,
			pretime: [Number, String]
		},
		computed: {
			// 是否是登录用户本人
			isSelf() {
				return uid === this.item.user_id;
			},
			// 转化时间
			shortTime() {
				return $T.getChatTime(this.item.create_time, this.pretime)
			}
		},
	}
</script>

<style scoped lang="less">
	.userImg {
		width: 75rpx;
		height: 75rpx;
	}

	.my-talk {
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;

		.my-pop {
			max-width: 70%;
			min-width: 20rpx;
			background-color: #4989ff;
			padding: 10rpx 20rpx;
			margin-top: 10rpx;
			color: #fff;
			border-radius: 30rpx 5rpx 30rpx 30rpx;
		}
	}

	.your-talk {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;

		.your-pop {
			max-width: 70%;
			min-width: 20rpx;
			background-color: #d6d6d6;
			padding: 10rpx 20rpx;
			margin-top: 10rpx;
			border-radius: 5rpx 30rpx 30rpx 30rpx;
		}
	}
</style>
