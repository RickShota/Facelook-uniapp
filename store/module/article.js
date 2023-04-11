import $Http from '@/utils/request.js';
export default {
	state() {
		return {
			articleList: [],
			articleClass: []
		}
	},
	mutations: {
		SET_ARTICLECLASS(state, data) {
			state.articleClass = data
		},
		SET_ARTICLELIST(state, data) {
			state.articleList = data
		},
	},
	actions: {
		// 获取文章分类
		async getArticleClass(store) {
			let [err, res] = await $Http.get('/postclass')
			if (res.statusCode === 200) {
				console.log('文章分类请求成功', res);
				store.commit('SET_ARTICLECLASS', res.data.data.list)
			}
		},
		// 获取文章列表
		async getArticleList(store, params) {
			let [err, res] = await $Http.get('/postclass/' + params.id + '/post/' + params.page)
			if (res.statusCode === 200) {
				console.log('文章列表请求成功', res);
				store.commit('SET_ARTICLELIST', res.data.data.list.map(v => {
					return {
						id: v.id,
						user_id: v.user_id,
						username: v.user.username,
						userpic: v.user.userpic,
						newstime: v.create_time,
						isFollow: false,
						title: v.title,
						titlepic: v.titlepic,
						support: {
							type: "support",
							support_count: 1,
							unsupport_count: 2,
						},
						comment_count: v.comment_count,
						share_num: v.sharenum,
					}
				}))
			}
		},
	},
	getters: {}
}
