const app = getApp()
let drawQrcode = require("../../utils/weapp-qrcode.js")
Page({
        data: {
                //根据这个内容生成二维码的！！！
                text: "Maisy",
                qrcodeImg: '', //二维码图片
        },
        onLoad() {
                this.ewmChange()
        },

        ewmChange() {
                const _this = this
                wx.showLoading({
                        title: '生成中',
                        mask: true
                })
                let size = {}
                size.w = wx.getSystemInfoSync().windowWidth / 750 * 600
                size.h = size.w
                drawQrcode({
                        width: size.w,
                        height: size.h,
                        canvasId: 'myQrcode',
                        text: _this.data.text,
                        /* 自定义logo */
                        // image: {
                        //         imageResource: '../../assets/imgs/tabbar/cxzs_a.png',
                        //         dx: 150-30,
                        //         dy: 150-30,
                        //         dWidth: 60,
                        //         dHeight: 60
                        // },
                        callback: res => {
                                console.log(res, 'callback')
                                setTimeout(() => {
                                        wx.canvasToTempFilePath({
                                                canvasId: 'myQrcode',
                                                x: 0,
                                                y: 0,
                                                width: 300,
                                                height: 300,
                                                success: (e) => {
                                                        _this.setData({
                                                                qrcodeImg: e.tempFilePath
                                                        });
                                                }
                                        })
                                }, 0);
                        }
                        // v1.0.0+版本支持在二维码上绘制图片
                })
                /* 展示生成效果 */
                setTimeout(() => {
                        wx.hideLoading()
                }, 1000);


        },
        /* 输入文字 */
        ewmText(e) {
                this.setData({
                        text: e.detail.value
                })
        },
        /* 生成二维码 */
        searchFn() {
                this.ewmChange()
        },
        previewImg() {
                wx.previewImage({
                        urls: [this.data.qrcodeImg],
                })
        },
        /* 保存 */
        save() {
                if (this.data.qrcodeImg) {
                        wx.saveImageToPhotosAlbum({
                                filePath: this.data.qrcodeImg,
                                success(res) {
                                        console.log(res)
                                        wx.showToast({
                                                title: '保存成功',
                                                icon: 'success',
                                                duration: 2000
                                        })
                                },
                                fail: err => {
                                        console.log(err)
                                        wx.showModal({
                                                title: '保存失败',
                                                content: '需要您授权保存相册',
                                                showCancel: false,
                                                success() {
                                                        wx.openSetting({
                                                                success(settingdata) {
                                                                        if (settingdata.authSetting['scope.writePhotosAlbum']) { //是否授权保存到相册
                                                                                wx.showModal({
                                                                                        title: '提示',
                                                                                        content: '获取权限成功,再次保存图片即可成功',
                                                                                        showCancel: false,
                                                                                })
                                                                        } else {
                                                                                wx.showModal({
                                                                                        title: '提示',
                                                                                        content: '获取权限失败，无法保存到相册',
                                                                                        showCancel: false,
                                                                                })
                                                                        }

                                                                },
                                                                complete(complet) {
                                                                        console.log("complet", complet)
                                                                }
                                                        })
                                                }
                                        })
                                }
                        })
                } else {
                        getApp().util.toast('请先生成二维码~~')
                }
        }

})