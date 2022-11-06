var t = getApp(),
    o = (require("../cropper/we-cropper.js"), wx.getSystemInfoSync()),
    a = o.windowWidth,
    i = o.windowHeight,
    n = a / 750 * 10,
    e = 750 / o.windowWidth,
    s = o.statusBarHeight * e,
    r = 44 * e,
    c = i * e,
    d = o.screenHeight * e - s - r - c,
    l = "https://bt.nmxgzs.cn/upload/2022-06-30/DrXoGA.png";
var time = null
Page({
    data: {
        userInfo: {},
        hasUserInfo: !1,
        selectIndex: 0,
        currentNavId: null,
        currentOption: null,
        optionList: [],
        optionList_bak: [{
            color: "#ffffff",
            icon: "https://bt.nmxgzs.cn/upload/2022-06-30/fqHCG2.png"
        }, {
            color: "#dddddd",
            icon: l
        }, {
            color: "#1296db",
            icon: l
        }, {
            color: "#fc543c",
            icon: l
        }, {
            color: "#73aa0f",
            icon: l
        }, {
            color: "#d3217b",
            icon: l
        }, {
            color: "#555555",
            icon: l
        }],
        plusImage: "https://bt.nmxgzs.cn/upload/2022-06-30/AEKim4.png",
        selectImgIndex: -1,
        selectIconPic: null,
        canvasWidth: 220,
        sudokuLineWidth: n,
        wordColor: "#1296db",
        wordBackground: "#ffffff",
        wordText: "九宫格还是这个好用",
        words: ["九", "宫", "格", "还", "是", "这", "个", "好", "用"],
        windowHeight: c,
        tabBarHeight: d
    },
    onLoad: function (t) {
        this.setData({
            currentNavId: t.navId,
            optionList: this.data.optionList_bak
        })
        // this.getTagOptions(t.navId);
    },
    onShow: function (t) {},
    getTagOptions: function (o) {
        var a = this;
        t.request({
            url: "/nav4.json",
            data: {
                navId: o
            },
            timeout: 3e3,
            success: function (t) {
                t.data && t.data.data && (a.setData({
                    optionList: t.data.data
                }), wx.setStorage({
                    key: "wenzi_option_list",
                    data: t.data.data
                }));
            },
            fail: function (t) {
                wx.getStorage({
                    key: "wenzi_option_list",
                    success: function (t) {
                        a.setData({
                            optionList: t.data
                        });
                    },
                    fail: function (t) {
                        a.setData({
                            optionList: a.data.optionList_bak
                        });
                    }
                });
            }
        });
    },
    onWordInput: function (t) {
        var o = t.detail.value || "";
        if (time) {
            clearTimeout(time)
        }
        time = setTimeout(() => {
            if (o) {
                getApp().util.checkMsg(o).then(checkRes => {
                    if (checkRes) {
                        o && o.length > 9 && (o = o.substring(0, 9));
                        var a = o.split(""),
                            i = a.length;
                        if (i < 9)
                            for (var n = 0; n < 9 - i; n++) a.push("");
                        return this.setData({
                            words: a
                        }), o;
                    } else {
                        getApp().util.toast('输入内容违规，请重试~')
                        this.setData({
                            wordText: ''
                        })
                    }
                }).catch(err => {
                    getApp().util.toast(err)
                })
            }
        }, 2000)
    },
    onClearTap: function (t) {
        this.setData({
            wordText: "",
            words: ["", "", "", "", "", "", "", "", ""]
        });
    },
    wordColorTap: function (t) {
        var o = t.target.dataset.id,
            a = this.data.optionList[o];
        this.setData({
            wordColor: a.color
        })
    },
    bgColorTap: function (t) {
        var o = t.target.dataset.id,
            a = this.data.optionList[o];
        this.setData({
            wordBackground: a.color
        }), wx.vibrateShort();
    },
    getCropperImage: function () {
        for (var t = this, o = t.data.words, a = !0, i = 0; i < o.length; i++) "" != o[i] && (a = !1);
        if (a) wx.showModal({
            title: "温馨提示",
            content: "请输入要生成的文字"
        });
        else {
            wx.showLoading({
                title: "正在保存"
            });
            var n = wx.createCanvasContext("imageCanvas");
            for (n.setFillStyle(t.data.wordBackground), n.fillRect(0, 0, 220, 1980), n.setFillStyle(t.data.wordColor),
                n.font = "bold 120px arial", n.setTextBaseline("middle"), n.setTextAlign("center"),
                i = 0; i < o.length; i++) {
                var e = o[i];
                n.fillText(e, 110, 110 + 220 * i);
            }
            n.draw(!1, function (t) {
                var a = [];
                ! function t(i) {
                    var n = i + 1;
                    i >= o.length || wx.canvasToTempFilePath({
                        canvasId: "imageCanvas",
                        x: 0,
                        y: 220 * i,
                        width: 220,
                        height: 220,
                        success: function (o) {
                            a.push(o.tempFilePath), t(n);
                        },
                        fail: function () {
                            t(n);
                        }
                    });
                }(0), wx.getSetting({
                    success: function (t) {
                        if (!1 === t.authSetting["scope.writePhotosAlbum"]) return wx.hideLoading(), void wx.showModal({
                            title: "授权提醒",
                            content: "您需要授权保存图片到相册才能保存",
                            confirmText: "去授权",
                            confirmColor: "#f3513c",
                            success: function (t) {
                                t.confirm && wx.openSetting({});
                            }
                        });
                        ! function t(o) {
                            if (o >= a.length) return wx.hideToast(), wx.hideLoading(), void wx.navigateTo({
                                url: "/pages/others/tips/tips",
                                fail: function (t) {
                                    wx.showModal({
                                        title: "保存成功",
                                        content: "图片已保存到系统相册"
                                    });
                                }
                            });
                            0 != o && wx.showToast({
                                title: "正在保存第" + (o + 1) + "张图片",
                                icon: "none"
                            });
                            var i = o + 1;
                            wx.saveImageToPhotosAlbum({
                                filePath: a[o],
                                success: function () {
                                    t(i);
                                },
                                fail: function () {
                                    t(i), wx.hideLoading();
                                }
                            });
                        }(0);
                    }
                });
            });
        }
    }
});