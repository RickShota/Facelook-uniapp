<template>
	<view>
		<uni-list>
			<uni-list-item link @click="changeImg">
				<template v-slot:body>
					<text class="slot-box slot-text">头像</text>
				</template>
				<template v-slot:footer>
					<image class="userImage" :src="userpic"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="用户名" link>
				<template v-slot:footer>
					<input type="text" :placeholder="username" class="text-right" v-model="username" />
				</template>
			</uni-list-item>
			<uni-list-item title="性别" :rightText="sexText" link @click="changeSex"></uni-list-item>
			<!-- 日期选择器 -->
			<uni-datetime-picker type="date" :clear-icon="false" v-model="birthday" @change="maskClick">
				<uni-list-item title="生日" :rightText="birthday" link></uni-list-item>
			</uni-datetime-picker>
			<uni-list-item title="情感" :rightText="emoText" link @click="changeEmo"></uni-list-item>
			<uni-list-item title="职业" :rightText="job" link @click="changeJob"></uni-list-item>
			<!-- 多级选择器 -->
			<uni-list-item title="家乡" rightText="安徽" link>
				<template v-slot:footer>
					<pickers @address="address" :defaultAddress="hometown">
						<text style="color: #a3a3a3;">{{`${hometown[0]}-${hometown[1]}-${hometown[2]}`}}</text>
					</pickers>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="submit" hover-class="submited">
			确认修改
		</view>
	</view>
</template>

<script>
	const sexAry = ['保密', '男', '女'];
	const emotionAry = ['保密', '单身', '已婚'];
	import pickers from "@/components/ming-picker/ming-picker.vue"
	export default {
		components: {pickers},
		data() {
			return {
				userpic: "/static/default/defUser.png",
				username: "Rick Henry",
				sex: 0,
				emotion: 0,
				job: "未设置",
				birthday: '2020-02-26',
				hometown: ["安徽省", "合肥市", "瑶海区"],
				
			}
		},
		computed: {
			sexText() {
				return sexAry[this.sex]
			},
			emoText() {
				return emotionAry[this.emotion]
			}
		},
		methods: {
			// 修改头像
			changeImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						console.log(res);
					}
				})
			},
			// 修改性别
			changeSex() {
				uni.showActionSheet({
					itemList: sexAry,
					success: (res) => {
						this.sex = res.tapIndex
					}
				})
			},
			// 修改情感状态
			changeEmo() {
				uni.showActionSheet({
					itemList: emotionAry,
					success: (res) => {
						this.emotion = res.tapIndex
					}
				})
			},
			// 修改职业
			changeJob() {
				let jobAry = ['IT', '教师', '医生', '学生']
				uni.showActionSheet({
					itemList: jobAry,
					success: (res) => {
						this.job = jobAry[res.tapIndex]
					}
				})
			},
			// 修改生日
			maskClick(e) {
				this.birthday = e
			},
			// 修改地址
			address(e){
				this.hometown = e.value
			}
		}
	}
</script>

<style lang="less" scoped>
	.userImage {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 50px;
		height: 50px;
	}

	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-text {
		flex: 1;
		font-size: 30rpx;
		margin-right: 10px;
	}

	.submit {
		margin: 50rpx;
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		font-size: 35rpx;
		background-color: #1676f1;
	}

	.submited {
		color: #dfdfdf;
		background-color: #1264c8;
	}
</style>
