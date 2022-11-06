var o = getApp(),
    t = require("../cropper/we-cropper.js"),
    i = wx.getSystemInfoSync(),
    n = i.windowWidth,
    e = n,
    a = e,
    c = n / 750 * 680,
    p = n / 750 * 10;

Page({
    data: {
        userInfo: {},
        selectIconPic: null,
        hasUserInfo: !1,
        selectIndex: 0,
        currentNavId: null,
        currentOption: null,
        optionList: [{}, {}, {}, {}, {}, {}],
        optionList_bak: [{
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_fang2.png",
            pict: "",
            width: 680,
            x: 35,
            y: 35
        }, {
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_wuxing.png",
            pict: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/wuxing.png",
            width: 680,
            x: 35,
            y: 35
        }, {
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_yuan2.png",
            pict: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/cricle.png",
            width: 680,
            x: 35,
            y: 35
        }, {
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_qq.png",
            pict: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/qq1.png",
            width: 680,
            x: 35,
            y: 35
        }, {
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_apple.png",
            pict: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/apple.png",
            width: 680,
            x: 35,
            y: 35
        }, {
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_xin3.png",
            pict: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/xin.png",
            width: 680,
            x: 35,
            y: 35
        }, {
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_heitao.png",
            pict: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/heitao4.png",
            width: 680,
            x: 35,
            y: 35
        }, {
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_pig2.png",
            pict: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/pig.png",
            width: 680,
            x: 35,
            y: 35
        }, {
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_pig_2.png",
            pict: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/pig_bak.png",
            width: 680,
            x: 35,
            y: 35
        }, {
            bindTap: "onTagOptionTap",
            border: -1,
            color: "#ffffff",
            height: 680,
            icon: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/i_bagua.png",
            pict: "https://www.mvdm.com/quickapp/xiaochengxujson/imgtool/img/bagua_icon.png",
            width: 680,
            x: 35,
            y: 35
        }],
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        targetImageSrc: null,
        cropperOpt: {
            id: "cropper",
            targetId: "targetCropper",
            pixelRatio: i.pixelRatio,
            width: e,
            height: a,
            scale: 2.5,
            zoom: 5,
            src: "https://bt.nmxgzs.cn/upload/2022-06-01/stA4wP.jpg",
            sudokuLine: !0,
            sudokuLineWidth: p,
            cut: {
                x: (e - c) / 2,
                y: (a - c) / 2,
                width: c,
                height: c
            },
            boundStyle: {
                color: "rgba(255, 255, 255, 1)",
                mask: "rgba(255, 255, 255, 1)",
                lineWidth: 0,
                circle: !1
            }
        }
    },
    onLoad: function (o) {
        this.setData({
            currentNavId: o.navId,
            optionList: this.data.optionList_bak
        })
        var i = this.data.cropperOpt;
        this.cropper = new t(i).on("ready", function (o) {
            console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function (o) {
            wx.showToast({
                title: "上传中",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function (o) {
            wx.hideToast();
        }).on("beforeDraw", function (o) {
            console.log(o);
        });
    },
    onShow: function (o) {},
    getTagOptions: function (t) {
        var i = this;
        o.request({
            url: "/nav1.json",
            data: {
                navId: t
            },
            timeout: 3e3,
            success: function (o) {
                o.data && o.data.data && (o.data.data.length > 0 && o.data.data[0], i.setData({
                    optionList: o.data.data
                }), wx.setStorage({
                    key: "qietu_option_list",
                    data: o.data.data
                }));
            },
            fail: function (o) {
                wx.getStorage({
                    key: "qietu_option_list",
                    success: function (o) {
                        i.setData({
                            optionList: o.data
                        });
                    },
                    fail: function (o) {
                        i.setData({
                            optionList: i.data.optionList_bak
                        });
                    }
                });
            }
        });
    },
    touchStart: function (o) {
        this.wecropper.touchStart(o);
    },
    touchMove: function (o) {
        this.wecropper.touchMove(o);
    },
    touchEnd: function (o) {
        this.wecropper.touchEnd(o);
    },
    uploadOptionTap: function () {
        var o = this;
        wx.showActionSheet({
            itemList: ["相册中选取", "用手机拍照", "聊天中选取"],
            success: function (t) {
                0 == t.tapIndex ? wx.chooseImage({
                    count: 1,
                    sizeType: ["original", "compressed"],
                    sourceType: ["album"],
                    success: function (t) {
                        getApp().util.checkFile(t.tempFilePaths[0]).then(checkRes => {
                            if (checkRes) {
                                var i = t.tempFilePaths[0];
                                o.setData({
                                    targetImageSrc: i
                                }), o.cropper.pushOrign(i);
                            } else {
                                getApp().util.toast('上传内容违规，请重试~')
                            }
                        }).catch(err => {
                            getApp().util.toast(err)
                        })
                    }
                }) : 1 == t.tapIndex ? wx.chooseImage({
                    count: 1,
                    sizeType: ["original", "compressed"],
                    sourceType: ["camera"],
                    success: function (t) {
                        console.log(t, 'tttt')
                        getApp().util.checkFile(t.tempFilePaths[0]).then(checkRes => {
                            if (checkRes) {
                                var i = t.tempFilePaths[0];
                                o.setData({
                                    targetImageSrc: i
                                }), o.cropper.pushOrign(i);
                            } else {
                                getApp().util.toast('上传内容违规，请重试~')
                            }
                        }).catch(err => {
                            getApp().util.toast(err)
                        })
                    }
                }) : wx.chooseMessageFile({
                    count: 1,
                    type: "image",
                    success: function (t) {
                        console.log(t, 'tttt')
                        getApp().util.checkFile(t.tempFiles[0].path).then(checkRes => {
                            if (checkRes) {
                                var i = t.tempFiles[0];
                                o.setData({
                                    targetImageSrc: i.path
                                }), o.cropper.pushOrign(i.path);
                            } else {
                                getApp().util.toast('上传内容违规，请重试~')
                            }
                        }).catch(err => {
                            getApp().util.toast(err)
                        })
                    }
                });
            }
        });
    },
    getCropperImage: function () {
        this.saveImage2Album(null);
    },
    saveImage2Album: function (t) {
        wx.showLoading({
            title: "正在保存"
        });
        var i = this.data.targetImageSrc,
            n = o.globalData.isImageCheck;
        if (null != t && "undefined" != t || !n) {
            var a = (c - 2 * p) / 3,
                s = (e - c) / 2,
                g = [{
                    x: s,
                    y: s
                }, {
                    x: s + a + p,
                    y: s
                }, {
                    x: s + 2 * (a + p),
                    y: s
                }, {
                    x: s,
                    y: s + a + p
                }, {
                    x: s + a + p,
                    y: s + a + p
                }, {
                    x: s + 2 * (a + p),
                    y: s + a + p
                }, {
                    x: s,
                    y: s + 2 * (a + p)
                }, {
                    x: s + a + p,
                    y: s + 2 * (a + p)
                }, {
                    x: s + 2 * (a + p),
                    y: s + 2 * (a + p)
                }],
                r = [];
            ! function o(t) {
                var i = t + 1;
                if (!(t >= g.length)) {
                    var n = g[t];
                    wx.canvasToTempFilePath({
                        canvasId: "cropper",
                        x: n.x + 1,
                        y: n.y + 1,
                        width: a - 2,
                        height: a - 2,
                        success: function (t) {
                            r.push(t.tempFilePath), o(i);
                        },
                        fail: function () {
                            o(i);
                        }
                    });
                }
            }(0), wx.getSetting({
                success: function (o) {
                    if (!1 === o.authSetting["scope.writePhotosAlbum"]) return wx.hideLoading(), void wx.showModal({
                        title: "授权提醒",
                        content: "您需要授权保存图片到相册才能保存",
                        confirmText: "去授权",
                        confirmColor: "#f3513c",
                        success: function (o) {
                            o.confirm && wx.openSetting({});
                        }
                    });
                    ! function o(t) {
                        if (t >= r.length) return wx.hideToast(), wx.hideLoading(), void wx.navigateTo({
                            url: "/pages/others/tips/tips",
                            fail: function (o) {
                                wx.showModal({
                                    title: "保存成功",
                                    content: "图片已保存到系统相册"
                                });
                            }
                        });
                        0 != t && wx.showToast({
                            title: "正在保存第" + (t + 1) + "张图片",
                            icon: "none"
                        });
                        var i = t + 1;
                        wx.saveImageToPhotosAlbum({
                            filePath: r[t],
                            success: function () {
                                o(i);
                            },
                            fail: function () {
                                o(i);
                            }
                        });
                    }(0);
                }
            });
        } else o.imgSecurityCheck(i, this.saveImage2Album);
    },
    onTagOptionTap: function (o) {
        var t = this,
            i = o.currentTarget.id,
            n = t.data.optionList[i];
        n = n || t.data.optionList[0], t.setData({
            selectIndex: parseInt(i),
            "cropperOpt.tagIcon": n
        }), t.cropper.pushIcon(n, function () {
            // wx.vibrateShort();
        });
    },
    onTagPlusTap: function (o) {
        var t = this,
            i = o.currentTarget.id,
            n = t.data.optionList[i];
        n = n || t.data.optionList[0], t.setData({
            selectIndex: parseInt(i),
            "cropperOpt.tagIcon": n
        }), n.localImage && (t.setData({
            selectIndex: parseInt(i),
            "cropperOpt.tagIcon": n,
            currentOption: n
        }), t.cropper.pushIcon(n)), t.setData({
            currentOption: n
        }), wx.showActionSheet({
            itemList: ["相册中选取", "用手机拍照", "聊天中选取"],
            success: function (o) {
                0 == o.tapIndex ? wx.chooseImage({
                    count: 1,
                    sizeType: ["original", "compressed"],
                    sourceType: ["album"],
                    success: function (o) {
                        var t = o.tempFilePaths[0],
                            i = encodeURIComponent(t);
                        wx.navigateTo({
                            url: "/pages/others/icon/icon?pic=" + i
                        });
                    }
                }) : 1 == o.tapIndex ? wx.chooseImage({
                    count: 1,
                    sizeType: ["original", "compressed"],
                    sourceType: ["camera"],
                    success: function (o) {
                        var t = o.tempFilePaths[0],
                            i = encodeURIComponent(t);
                        wx.navigateTo({
                            url: "/pages/others/icon/icon?pic=" + i
                        });
                    }
                }) : wx.chooseMessageFile({
                    count: 1,
                    type: "image",
                    success: function (o) {
                        var t = o.tempFiles[0],
                            i = encodeURIComponent(t.path);
                        wx.navigateTo({
                            url: "/pages/others/icon/icon?pic=" + i
                        });
                    }
                });
            }
        });
    }
});