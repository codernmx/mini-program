let videoAd = null
import Toast from '../../vant-weapp/toast/toast';
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isSignIn: false, //是否签到
		active: 0, //步骤条激活
		steps: [{
				text: '1天',
				inactiveIcon: 'circle'
				// desc: '描述信息',
			},
			{
				text: '2天',
				inactiveIcon: 'circle'
				// desc: '描述信息',
			},
			{
				text: '3天',
				inactiveIcon: 'circle'
				// desc: '描述信息',
			},
			{
				text: '4天',
				inactiveIcon: 'circle'
				// desc: '描述信息',
			},
			{
				text: '5天',
				inactiveIcon: 'circle'
				// desc: '描述信息',
			},
			{
				text: '6天',
				// desc: '描述信息',
				inactiveIcon: 'circle'
			},
			{
				text: '7天',
				inactiveIcon: 'circle'
				// desc: '描述信息',
			},
		],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.initSign() //初始化签到
		this.initAd() //初始化广告

	},
	//点击提示信息
	signSuccess() {
		app.util.toast('明天再来哦，小哥哥~~')
	},
	checkIsSignIn(v) {
		if (v.length > 0) {
			const LAST_TIME = new Date(v[0].LAST_TIME.replace(/-/g, '/')).getDate()
			const TODAY = new Date().getDate() //服务器的时间不是中国标准时间   需要加 8h进行比较 
			// const TODAY = new Date(new Date().setHours(new Date().getHours() + 8)).getDate() //服务器的时间不是中国标准时间   需要加 8h进行比较 
			console.log(LAST_TIME, '----------', TODAY, '日期比较')
			if (LAST_TIME == TODAY) {
				console.log('-1 ==')
				this.setData({
					isSignIn: true
				})
			}
		} else {
			this.setData({
				isSignIn: false
			})
		}
	},
	//创建签到数据/查询签到次数
	initSign() {
		app.api.request('/api/get/sign/total', {
			userId: app.globalData.user
		}).then(res => {
			console.log(res)
			this.checkIsSignIn(res)
			//这里为新创建一个数据
			if (res.length == 0) {
				let Arr = []
				for (let i = 0; i < 7; i++) {
					Arr.push({
						text: `${i}天`,
						inactiveIcon: 'circle'
						// desc: '描述信息',
					})
				}
				this.setData({
					steps: Arr,
					active: -1
				})
			} else if (res[0] && res[0].CONS_TOTAL < 7) {
				let Arr = []
				for (let i = 1; i < 7; i++) {
					Arr.push({
						text: `${i}天`,
						inactiveIcon: 'circle'
						// desc: '描述信息',
					})
				}
				this.setData({
					steps: Arr,
					active: res[0].CONS_TOTAL - 1
				})
			} else {
				let Arr = []
				for (let i = res[0].CONS_TOTAL - 3; i < res[0].CONS_TOTAL + 4; i++) {
					Arr.push({
						text: `${i}天`,
						inactiveIcon: 'circle'
						// desc: '描述信息',
					})
				}
				this.setData({
					steps: Arr,
					active: 3
				})

			}
		})
	},
	//初始化广告
	initAd() {
		let _this = this
		//广告
		if (wx.createRewardedVideoAd) {
			// 加载激励视频广告
			videoAd = wx.createRewardedVideoAd({
				adUnitId: 'adunit-9a02eceebb427568'
			})
			videoAd.onLoad(() => {
				console.log('onLoad event emit')
			})
			//捕捉错误
			videoAd.onError(err => {
				console.log(err)
				// 进行适当的提示
			})
			// 监听关闭
			videoAd.onClose((status) => {
				console.log(status)
				if (status && status.isEnded || status === undefined) {
					//播放成功可以拍照调用接口
					// _this.chooseImg()
				} else {
					// 播放中途退出，进行提示
					Toast('看完视频才可以领取哦~~')
				}
			})
		}
	},
	// 签到
	submit() {
		// Toast('开发中 ~~')
		app.api.request('/api/sign/in', {
			userId: app.globalData.user
		}).then(res => {
			console.log(res)
			this.checkIsSignIn(res)
			if (res[0].CONS_TOTAL < 7) {
				let Arr = []
				for (let i = 1; i < 7; i++) {
					Arr.push({
						text: `${i}天`,
						inactiveIcon: 'circle'
						// desc: '描述信息',
					})
				}
				this.setData({
					steps: Arr,
					active: res[0].CONS_TOTAL - 1
				})
			} else {
				let Arr = []
				for (let i = res[0].CONS_TOTAL - 3; i < res[0].CONS_TOTAL + 4; i++) {
					Arr.push({
						text: `${i}天`,
						inactiveIcon: 'circle'
						// desc: '描述信息',
					})
				}
				this.setData({
					steps: Arr,
					active: 3
				})

			}
		})
	},
	//打开广告//按钮触发加载广告
	openAdVideo() {
		console.log('打开激励视频');
		if (videoAd) {
			videoAd.show()
				.catch(() => {
					videoAd.load()
						.then(() => videoAd.show())
						.catch(err => {
							console.log(err)
							console.log('激励视频 广告显示失败')
						})
				})
		}
		// this.chooseImg()

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})