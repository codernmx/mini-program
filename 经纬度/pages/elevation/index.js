const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addresInfo: {}
    },
    onLoad(options) {
        wx.getLocation({
            type: "gcj02",
            altitude: true,
            success: (res) => {
                console.log(res)
                this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    addresInfo: res
                })
            },
            fail: (err) => {
                app.util.toast('稍后在试，勿重复点击~')
            }
        })
    },
    goHome() {
        let mpCtx = wx.createMapContext('map')
        mpCtx.moveToLocation()
    },
    onShareAppMessage() {
		return {
			title: `我的海拔高度${this.data.addresInfo.altitude.toFixed(2)}米，我们比一比，看谁海拔高`,
			path: `/pages/elevation/index`,
		};
	},
})