import QQMapWX from '../../assets/libs/qqmap-wx-jssdk'
import config from '../../config/index';
var qqmapsdk = new QQMapWX({
    key: config.mapKey // 必填 // 必填
});
const app = getApp()
Page({
    data: {
        longitude: '',
        latitude: '',
        mylat: '',
        mylon: '',
        address: '', //当前位置
    },
    copyAddress() {
        const data = this.data.address
        wx.setClipboardData({
            data,
            success: (res) => {
                app.util.toast(data)
            }
        })
    },
    copyJwd() {
        const data = `${this.data.longitude},${this.data.latitude}`
        wx.setClipboardData({
            data,
            success: function (res) {
                app.util.toast(data)
            }
        })
    },
    search(e) {
        const keyword = e.detail
        let newArr = null
        if (keyword.includes(',')) {
            newArr = keyword.split(',')
        }
        if (keyword.includes('，')) {
            newArr = keyword.split('，')
        }
        if (newArr[0] && newArr[1]) {
            this.setData({
                latitude: newArr[1],
                longitude: newArr[0],
            })
            this.getAddress(newArr[1], newArr[0]) //解析地址
        } else {
            app.util.toast('请使用逗号分割')
        }
    },
    onShow() {
        const addressInfo = app.globalData.addressInfo
        if (addressInfo.latitude) { //避免数据为空
            this.setData({
                latitude: addressInfo.latitude,
                longitude: addressInfo.longitude,
                address: addressInfo.title,
            })
        }
    },
    onLoad() {
        wx.getLocation({
            type: "gcj02",
            success: (res) => {
                this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,

                    mylat: res.latitude, //记录当前位置
                    mylon: res.longitude
                })
                this.getAddress(res.latitude, res.longitude) //解析地址
            },
            fail: (err) => {
                console.log(err)
                app.util.toast('稍后在试，勿重复点击~')
            }
        })

        wx.getSystemInfo({ //获取屏幕宽度
            success: (res) => {
                this.setData({
                    screenHeight: res.screenHeight,
                })
            }
        })

    },
    regionchange(e) {
        // 地图发生变化的时候，获取中间点，也就是用户选择的位置toFixed
        if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
            this.mapCtx = wx.createMapContext("map4select");
            this.mapCtx.getCenterLocation({
                type: 'gcj02',
                success: (res) => {
                    this.setData({
                        latitude: res.latitude,
                        longitude: res.longitude
                    })

                    this.getAddress(res.latitude, res.longitude)
                },
            })
        }
    },
    getAddress(latitude, longitude) {
        qqmapsdk.reverseGeocoder({
            location: {
                latitude,
                longitude
            },
            success: res => {
                this.setData({
                    address: res.result.address
                })
            },
            fail: err => {
                console.log(err, '错误')
                app.util.toast(err.message)
            }
        })
    },
    //定位到自己的位置事件
    Location() {
        this.setData({
            latitude: this.data.mylat,
            longitude: this.data.mylon,
        })
        this.getAddress(this.data.mylat, this.data.mylon) //解析地址
    },
    onShareAppMessage() {
		return {
			title: `我在经度${this.data.longitude.toFixed(2)},纬度${this.data.latitude.toFixed(2)}，${this.data.address}。`,
			path: `/pages/index/index`,
		};
	},
})