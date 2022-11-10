// const md5 = require('md5')
const app = getApp()
import config from 'config';
let videoAd = null
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		transResultInfo: '',
		cnValue: '',
		wordList: [], //翻译之后的数据
		spinShow: false,
		to_lang_text: "英文",
		to_lang: "en",
		columns: config.columns,
		show: false,
	},
	pickerChange(e) {
		this.setData({
			to_lang: e.detail.value.value,
			to_lang_text: e.detail.value.text
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
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
				if (status && status.isEnded || status === undefined) {
					//播放成功可以拍照调用接口
					_this.chooseImg()
				} else {
					// 播放中途退出，进行提示
					app.util.toast('看完视频才可以使用拍照识别哦~~')
				}
			})
		}
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
	chooseImg() { //选择文件
		let _this = this
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				console.log(res)
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths
				_this.setData({
					spinShow: true
				})
				wx.uploadFile({
					url: 'https://flask.nmxgzs.cn/api/fanyi/baidu/translate/img',
					filePath: tempFilePaths[0],
					name: 'file',
					formData: {
						'from_lang': 'auto',
						'to_lang': _this.data.to_lang
					},
					success(res) {
						_this.setData({
							spinShow: false
						})
						//do something
						let parData = JSON.parse(res.data)
						console.log(parData,'fan')
						if(parData.data.data){
							const {
								content,
								sumDst
							} = parData.data.data
							_this.setData({
								wordList: content,
								transResultInfo: sumDst
							})
						}else{
							app.util.toast(parData.data.error_msg)
						}
					},
					fail(err) {
						console.log(err)
						_this.setData({
							spinShow: false
						})
					}
				})
			}
		})
	},
	//复制英文框
	copyEnglish() {
		let _this = this
		wx.setClipboardData({
			data: _this.data.transResultInfo,
			success(res) {
				console.log(res)
			},
			fail(err) {
				console.log(err)
			}
		})
	},
	copyText() {
		let _this = this
		// console.log(_this.data.wordList)
		let str = ''
		_this.data.wordList.forEach(item => {
			str = str + item.src
		});
		console.log(str, 'str')
		wx.setClipboardData({
			data: str,
			success(res) {
				console.log(res) // data
				// wx.getClipboardData({
				// 	success(res) {
				// 		console.log(res.data) // data
				// 	}
				// })
			},
			fail(err) {
				console.log(err)
			}
		})
	},
	cnOnChange(e) {
		this.setData({
			cnValue: e.detail
		})
	},
	changeShow() {
		this.setData({
			show: true
		})
	},
	onClose() {
		this.setData({
			show: false
		});
	},
	translate() {
		let _this = this
		if (this.data.cnValue) {
			app.api.request('/api/fanyi/baidu/translate/word', {
				query: this.data.cnValue,
				from_lang: 'auto',
				to_lang: _this.data.to_lang,
			}).then(res => {
				console.log(res)
				if (res.data.trans_result && res.data.trans_result.length > 0) {
					_this.setData({
						transResultInfo: res.data.trans_result[0].dst,
						wordList: []
					})
				} else {
					app.util.toast(res.data.error_msg)
				}
			})
		} else {
			// Toast('请输入需要翻译的语句！')
			app.util.toast('请输入需要翻译的语句！')
		}
	},
})