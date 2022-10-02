<template>
	<view class="flex flex-column align-center justify-center pt-5">
		<image src="/static/default/nothing.png" style="width: 200rpx;height: 200rpx;" class="mt-5"></image>
		<text class="font-md mb-2" style="color: #818181;font-weight: bold;">{{text1}}</text>
		<text class="font text-light-muted">{{text2}}</text>
	</view>
</template>

<script>
	export default{
		name:'emptyPage',
		props:{
			text1:String,
			text2:String,
		}
	}
</script>

<style>
</style>