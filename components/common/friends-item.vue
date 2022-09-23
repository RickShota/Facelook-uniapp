<template>
	<view class="p-2 flex align-center border-bottom border-light-secondary " hover-class="bg-light">
		<!-- 头像 -->
		<image style="height: 80rpx; width: 80rpx;" class="rounded-circle mr-2" :src="item.avatar" mode=""></image>
		<view class="flex flex-1 theflex">
			<!-- 昵称 -->
			<view style="margin-bottom: 10rpx;">
				<text class="font text-dark">{{item.username}}</text>
				<text v-if="item.sex>0" :class="item.sex===1?'icon-nv woman':'icon-nan man'" class="iconfont ml-1 font-sm" ></text>
			</view>
			<!-- 角标：第三方插件 -->
			<uni-badge :text="item.age" :type="item.sex===1?'error':'primary'" size="normal"></uni-badge>
		</view>
		<view class="uni-icon uni-icon-checkbox-filled " :class="item.isFollow?'text-light-muted':'text-main'"></view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		}
	}
</script>

<style>
	.theflex {
		flex-direction: column;
		align-items: flex-start;
	}

	.man {
		color: #2979ff;
	}

	.woman {
		color: #dd524d;
	}
</style>
