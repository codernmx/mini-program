import config from '../../config/config.js';
import Toast from '../../vant-weapp/toast/toast';
const app = getApp()
let rewardedVideoAd = null
Page({
	data: {
		count: 0,
		showGetInfo: false,
	},
	openAd() {
		rewardedVideoAd.show()
			.then(() => console.log('激励视频 广告显示'))
	},
	toOtherPage: function (event) {
		const flag = event.currentTarget.dataset.flag
		if (flag == 1) {
			wx.navigateTo({
				url: '/pages/near/index?flag=1',
			})
		} else if (flag == 2) {
			wx.navigateTo({
				// url: '/pages/wc/index',
				url: '/pages/near/index?flag=2',
			})
		} else if (flag == 3) {
			wx.navigateTo({
				// url: '/pages/park/index',
				url: '/pages/near/index?flag=3',
			})
		} else if (flag == 5) {
			wx.navigateTo({
				url: '/pages/near/index?flag=5',
			})
		} else if (flag == 6) {
			wx.navigateTo({
				url: '/pages/near/index?flag=6',
			})
		} else if (flag == 7) {
			wx.navigateTo({
				url: '/pages/bus/index',
			})
		} else if (flag == 8) {
			wx.navigateTo({
				url: '/pages/near/index?flag=8',
			})
		} else if (flag == 9) {
			wx.navigateTo({
				url: '/pages/near/index?flag=9',
			})
		} else if (flag == 10) {
			wx.navigateToMiniProgram({
				appId: 'wx49a58c5678e41e31',
				path: '',
				envVersion: 'release', // 打开正式版
			}).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		} else if (flag == 11) {
			wx.navigateTo({
				url: '/pages/translate/index',
			})
		} else if (flag == 12) {
			// wx.navigateTo({
			// 	url: '/pages/pdf/index',
			// })
			wx.navigateToMiniProgram({
				appId: 'wxd9839f9c40077615',
				path: '',
				envVersion: 'release', // 打开正式版
			}).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		}
	},
	toSubway() {
		let plugin = requirePlugin("subway");
		let key = config.txKey; //使用在腾讯位置服务申请的key;
		let referer = config.referer; //调用插件的app的名称
		wx.navigateTo({
			url: 'plugin://subway/index?key=' + key + '&referer=' + referer
		});
	},
	openMini(event) {
		// console.log(event.currentTarget.dataset.id)
		// const id = event.currentTarget.dataset.id
		// if (id == 1) { //要跳转的第一个appid
		//   wx.navigateToMiniProgram({
		//     appId: 'wx285a242d191f9226',
		//     path: '',
		//     envVersion: 'release', // 打开正式版
		//   }).then(res => {
		//     console.log(res)
		//   }).catch(err => {
		//     console.log(err)
		//   })
		// } 
	},
	onLoad: function (options) {

		let params = []
		// 扫码进来时的处理
		if (options.scene) {
			console.log(options.scene, 'options.scene')
			params = decodeURIComponent(options.scene).split('&')
			console.log(params, 'params')
			this.uuid = params[0].split('=')[1]
			this.useAuth = params[1].split('=')[1]
		} else {
			this.uuid = options.uuid
			this.useAuth = options.useAuth
		}
		if (+this.useAuth === 0) {
			wx.cloud.callFunction({
				name: 'openid_login',
				data: {
					uuid: this.uuid,
				},
			})
		}
		if (+this.useAuth === 1) {
			this.setData({
				showGetInfo: true
			})
		}


		if (wx.createRewardedVideoAd) {
			rewardedVideoAd = wx.createRewardedVideoAd({
				adUnitId: 'adunit-'
			})
			rewardedVideoAd.onLoad(() => {
				console.log('onLoad event emit')
			})
			rewardedVideoAd.onError((err) => {
				console.log('onError event emit', err)
			})
			rewardedVideoAd.onClose((res) => {
				console.log('onClose event emit', res)
			})
		}
	},
	//授权登录
	login() {
		wx.getUserProfile({
			desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (info) => {
				console.log(info)
				wx.cloud.callFunction({
					name: 'openid_login',
					data: {
						uuid: this.uuid,
						userInfo: info.userInfo
					},
				})
				this.setData({
					showGetInfo: false
				})

			},
			fail: (err) => {
				app.util.toast('小哥哥，拒绝登录不了哦！')
				// this.setData({
				// 	showGetInfo: false
				// })
				
			}
		})
	},
	onClosePopup() {
		this.setData({
			showGetInfo: false
		})
	},
	onReady: function () {},
	onShareAppMessage: function () {
		return {
			title: "出行助手",
			path: `/pages/help/index`
		}
	},
	//朋友圈
	onShareTimeline() {}
})