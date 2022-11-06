Page({

    /**
     * 页面的初始数据
     */
    data: {
        src: '', //照片
        screenWidth: '',
        screenHeight: '',
        angle: 45, //水印角度
        interval: 30, //间隔
        value: '我是可修改的水印', //水印内容
        drawSrc: '', //最终图片
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.getSystemInfo({ //获取屏幕宽度
            success: (res) => {
                console.log(res, '屏幕')
                this.setData({
                    screenWidth: res.screenWidth,
                    screenHeight: res.screenHeight,
                })
            }
        })
    },
    /* 保存 */
    save() {
        if (this.data.drawSrc) {
            wx.saveImageToPhotosAlbum({
                filePath: this.data.drawSrc,
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
            getApp().util.toast('请先选择图片~~')
        }
    },
    /* 选择图片 */
    chooseImg() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            success: (res) => {
                console.log(res)
                getApp().util.checkFile(res.tempFiles[0].tempFilePath).then(checkRes => {
                    if (checkRes) {
                        this.setData({
                            src: res.tempFiles[0].tempFilePath
                        })
                        this.initCanvas()
                    } else {
                        getApp().util.toast('上传内容违规，请重试~')
                    }
                }).catch(err => {
                    getApp().util.toast(err)
                })
            }
        })
    },
    //初始化画布
    // 	sx = canvas.width /2 - imageWidth / 2;
    // sy = canvas.height / 2 - imageHeight / 2;
    initCanvas() {
        const _this = this
        wx.getImageInfo({ //获取照片宽高
            src: _this.data.src,
            success: (ress) => {
                let ctx = wx.createCanvasContext('firstCanvas')
                console.log(ress.height)
                //将图片src放到cancas内，宽高为图片大小
                console.log(300 / ress.width, ress.width / 300, '88')
                const scaleWidth = _this.data.screenWidth / ress.width
                _this.setData({
                    canvasWeight: _this.data.screenWidth,
                    canvasHeight: ress.height * scaleWidth
                })
                ctx.drawImage(_this.data.src, 0, 0, ress.width, ress.height, 0, 0, _this.data.screenWidth, ress.height * scaleWidth) //五百和界面相机高度一致
                /* 循环画出水印 */
                ctx.fillStyle = "white"
                ctx.setFontSize(14) //注意：设置文字大小必须放在填充文字之前，否则不生效
                ctx.setFillStyle('white')
                for (let i = 0; i < 60; i++) {
                    for (let j = 0; j < 60; j++) {
                        ctx.rotate((-_this.data.angle * Math.PI) / 180)
                        ctx.fillText(_this.data.value, -500 + i * (_this.data.value.length * 20), _this.data.interval * j)
                        ctx.rotate((_this.data.angle * Math.PI) / 180)
                    }
                }
                ctx.draw(false, function () {
                    wx.canvasToTempFilePath({
                        canvasId: 'firstCanvas',
                        fileType: 'jpg',
                        quality: 1,
                        success: (res1) => {
                            console.log(res1)
                            _this.setData({
                                drawSrc: res1.tempFilePath
                            })
                        },
                        fail: (e) => {
                            console.log(e)
                        }
                    })
                })
            }
        })
    },
    /* 水印内容 */
    changeValue(e) {
        console.log(e)
        this.setData({
            value: e.detail
        })
    },

    onChange(event) {
        this.setData({
            angle: event.detail
        })
        if (this.data.src) {
            this.initCanvas()
        } else {
            getApp().util.toast('请先选择图片~~')
        }
    },
    onChangeInter(event) {
        this.setData({
            interval: event.detail
        })
        if (this.data.src) {
            this.initCanvas()
        } else {
            getApp().util.toast('请先选择图片~~')
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})