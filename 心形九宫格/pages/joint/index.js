Page({
    data: {
        tempFiles: [], //原始图片集合
        totalHeight: 0, //总高度
        totalWeight: 0, //总宽度
        screenWidth: '',
        screenHeight: '',
        type: 0, //合并方式  1垂直  2横向
        canvasHeight: 0, //画布高度
        canvasWidth: 0, //画布宽度
    },
    onLoad: function (options) {
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
    /* 横向合并 */
    cross() {
        const {
            tempFiles,
            totalWeight
        } = this.data
        this.setData({
            canvasWidth: totalWeight,
            canvasHeight: 200,
            type: 2
        })
        this.initCanvas(tempFiles)
    },
    /* 垂直合并 */
    ver() {
        const {
            screenWidth,
            totalHeight,
            tempFiles
        } = this.data
        this.setData({
            canvasWidth: screenWidth,
            canvasHeight: totalHeight,
            type: 1,
        })
        this.initCanvas(tempFiles)
    },
    /* 选择图片 */
    chooseImg() {
        const _this = this
        wx.chooseMedia({
            count: 9,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            success: (res) => {
                console.log(res)
                getApp().util.checkFile(res.tempFiles[0].tempFilePath).then(checkRes => {
                    if (checkRes) {
                        // 处理之后包含宽高
                        Promise.all(res.tempFiles.map(function (elem) {
                            return new Promise(function (resolve, reject) {
                                wx.getImageInfo({
                                    src: elem.tempFilePath,
                                    success: (info => {
                                        let item = {
                                            ...elem,
                                            width: info.width,
                                            height: info.height
                                        }
                                        resolve(item);
                                    })
                                })

                            })
                        })).then(function (data) {
                            console.log(data)
                            let totalHeight = 0
                            let totalWeight = 0

                            data.forEach(v => {
                                /* 调整比例 */
                                const scaleWidth = _this.data.screenWidth / v.width
                                /* 调整比例 */
                                const scaleHeight = 200 / v.height
                                totalHeight += v.height * scaleWidth
                                totalWeight += v.width * scaleHeight
                                // totalHeight += v.height
                            });
                            _this.setData({
                                tempFiles: data,
                                totalHeight,
                                totalWeight
                            })

                        })
                    } else {
                        getApp().util.toast('上传内容违规，请重试~')
                    }
                }).catch(err => {
                    getApp().util.toast(err)
                })
            }
        })
    },
    /* 处理水印 */
    initCanvas(file) {
        if (file.length < 1) {
            getApp().util.toast('宝~，请先上传图片哦~~')
            return
        }
        console.log(file)
        const _this = this
        const {
            screenWidth,
            type
        } = this.data
        let totalHeight = 0 //总高
        let totalWeight = 0 //总宽
        let ctx = wx.createCanvasContext('firstCanvas')

        for (let i = 0; i < file.length; i++) {
            if (type === 1) {
                const scaleWidth = screenWidth / file[i].width
                ctx.drawImage(file[i].tempFilePath, 0, 0, file[i].width, file[i].height, 0, totalHeight, screenWidth, file[i].height * scaleWidth) //五百和界面相机高度一致
                totalHeight += file[i].height * scaleWidth
            } else {
                const scaleHeight = 200 / file[i].height
                ctx.drawImage(file[i].tempFilePath, 0, 0, file[i].width, file[i].height, totalWeight, 0, file[i].width * scaleHeight, 200) //五百和界面相机高度一致
                totalWeight += file[i].width * scaleHeight
            }
        }
        ctx.draw(false, function () {
            wx.canvasToTempFilePath({
                canvasId: 'firstCanvas',
                fileType: 'jpg',
                quality: 1,
                success: (res) => {
                    _this.setData({
                        drawSrc: res.tempFilePath
                    })
                    // getApp.util.toast('操作完成~~')
                    getApp().util.toast('操作完成~~')
                },
                fail: (e) => {
                    console.log(e)
                }
            })
        })
    }
})