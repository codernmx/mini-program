function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = getApp(),
    a = wx.getSystemInfoSync().windowWidth,
    n = a / 750 * 680;

Page({
    data: {
        userInfo: {},
        hasUserInfo: !1,
        selectIndex: 0,
        currentNavId: null,
        currentOption: null,
        optionList: [{}, {}, {}, {}, {}, {}],
        optionList_bak: [{
            bindTap: "onTagOptionTap",
            border: 10
        }, {
            bindTap: "onTagOptionTap",
            border: 0
        }, {
            bindTap: "onTagOptionTap",
            border: 2
        }, {
            bindTap: "onTagOptionTap",
            border: 6
        }, {
            bindTap: "onTagOptionTap",
            border: 15
        }, {
            bindTap: "onTagOptionTap",
            border: 20
        }],
        plusImage: "https://bt.nmxgzs.cn/upload/2022-06-30/AEKim4.png",
        selectImgIndex: -1,
        selectIconPic: null,
        canvasWidth: n,
        sudokuLineWidth: 10,
        images: [{
            def: !0
        }, {
            def: !0
        }, {
            def: !0
        }, {
            def: !0
        }, {
            def: !0
        }, {
            def: !0
        }, {
            def: !0
        }, {
            def: !0
        }, {
            def: !0
        }],
        x: 0,
        y: 0,
        hidden: !0,
        currentImg: "",
        currentIndex: -1,
        pointsArr: [],
        touch: !0,
        point2offsetX: 0,
        point2offsetY: 0,
        currentDef: !1
    },
    onLoad: function (t) {
        this.setData({
            currentNavId: t.navId,
            optionList: this.data.optionList_bak
        })
        //  this.getTagOptions(t.navId);
    },
    onShow: function (e) {
        var a = this.data.selectImgIndex,
            n = this.data.selectIconPic;
        if (a > -1 && n) {
            var i, o = "images[" + a + "].src",
                s = "images[" + a + "].def",
                c = "images[" + a + "].width",
                r = "images[" + a + "].height";
            this.setData((t(i = {}, o, this.data.selectIconPic), t(i, s, !1), t(i, c, null),
                t(i, r, null), i)), this.setData({
                selectImgIndex: -1,
                selectIconPic: null
            });
        }
    },
    resetLineWidth: function () {
        this.data.sudokuLineWidth;
    },
    getTagOptions: function (t) {
        var a = this;
        e.request({
            url: "/nav2.json",
            data: {
                navId: t
            },
            timeout: 3e3,
            success: function (t) {
                t.data && t.data.data && (t.data.data.length > 0 && t.data.data[0], a.setData({
                    optionList: t.data.data
                }), wx.setStorage({
                    key: "pintu_option_list",
                    data: t.data.data
                }));
            },
            fail: function (t) {
                wx.getStorage({
                    key: "pintu_option_list",
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
    onOneKeyUploadTap: function () {
        var t = this,
            a = e.globalData.isImageCheck ? ["compressed"] : ["original", "compressed"];
        wx.chooseImage({
            count: 9,
            sizeType: a,
            sourceType: ["album"],
            success: function (e) {
                var a = e.tempFilePaths;
                if (a && a.length > 0) {
                    var n = [];
                    if (a.forEach(function (t) {
                            n.push({
                                src: t,
                                def: !1
                            });
                        }), n.length < 9)
                        for (var i = 9 - n.length, o = 0; o < i; o++) n.push({
                            def: !0
                        });
                    t.setData({
                        images: n
                    }), t.initImageSize(n);
                }
            }
        });
    },
    initImageSize: function (e) {
        var a = this;
        ! function n(i) {
            if (!(i >= 9)) {
                var o = e[i];
                if (o) {
                    var s = i + 1;
                    o.def ? n(s) : wx.getImageInfo({
                        src: o.src,
                        success: function (e) {
                            var o;
                            a.setData((t(o = {}, "images[" + i + "].width", e.width), t(o, "images[" + i + "].height", e.height),
                                o)), n(s);
                        }
                    });
                }
            }
        }(0);
    },
    getCropperImage: function () {
        this.saveImage2Album(null);
    },
    saveImage2Album: function (t) {
        var i = this;
        wx.showLoading({
            title: "正在保存"
        });
        var o = wx.createCanvasContext("imageCanvas");
        o.setFillStyle("#ffffff"), o.fillRect(0, 0, n, n);
        for (var s = this.data.images, c = this.data.sudokuLineWidth * (a / 750), r = (n - 2 * c) / 3, d = [{
                x: 0,
                y: 0
            }, {
                x: r + c,
                y: 0
            }, {
                x: 2 * (r + c),
                y: 0
            }, {
                x: 0,
                y: r + c
            }, {
                x: r + c,
                y: r + c
            }, {
                x: 2 * (r + c),
                y: r + c
            }, {
                x: 0,
                y: 2 * (r + c)
            }, {
                x: r + c,
                y: 2 * (r + c)
            }, {
                x: 2 * (r + c),
                y: 2 * (r + c)
            }], u = 0; u < s.length; u++) {
            var g = s[u];
            if (!g.def) {
                var h = g.width,
                    p = g.height;
                if (h && p && h != p) {
                    var f = 0,
                        l = 0,
                        m = h;
                    h > p ? (f = (h - p) / 2, l = 0, m = p) : (f = 0, l = (p - h) / 2, m = h), o.drawImage(g.src, f, l, m, m, d[u].x, d[u].y, r, r);
                } else o.drawImage(g.src, d[u].x, d[u].y, r, r);
            }
        }
        o.draw(!1, function (a) {
            wx.canvasToTempFilePath({
                canvasId: "imageCanvas",
                x: 0,
                y: 0,
                width: n,
                height: n,
                fileType: "jpg",
                success: function (a) {
                    getApp().util.checkFile(a.tempFilePath).then(checkRes => {
                        if (checkRes) {
                            var n = a.tempFilePath,
                                o = e.globalData.isImageCheck;
                            null != t && "undefined" != t || !o ? wx.getSetting({
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
                                    wx.saveImageToPhotosAlbum({
                                        filePath: n,
                                        success: function () {
                                            wx.hideLoading(), wx.navigateTo({
                                                url: "/pages/others/tips/tips",
                                                fail: function (t) {
                                                    wx.showModal({
                                                        title: "保存成功",
                                                        content: "图片已保存到系统相册"
                                                    });
                                                }
                                            });
                                        },
                                        fail: function () {
                                            wx.hideLoading();
                                        }
                                    });
                                }
                            }) : e.imgSecurityCheck(n, i.saveImage2Album);
                        } else {
                            getApp().util.toast('上传内容存在违规,禁止保存,请更换图片后重试~')
                        }
                    }).catch(err => {
                        getApp().util.toast(err)
                    })
                },
                fail: function () {
                    wx.hideLoading();
                }
            });
        });
    },
    onTagOptionTap: function (t) {
        var e = this,
            a = t.currentTarget.id,
            n = e.data.optionList[a];
        n = n || e.data.optionList[0], e.setData({
            selectIndex: parseInt(a),
            sudokuLineWidth: n.border
        });
        // wx.vibrateShort() 震动
    },
    onPlusTap: function (t) {
        var e = this,
            a = t.currentTarget.id;
        if (e.setData({
                selectImgIndex: parseInt(a)
            }), !e.data.images[a] || e.data.images[a].def) wx.showActionSheet({
            itemList: ["相册中选取", "用手机拍照", "聊天中选取"],
            success: function (t) {
                0 == t.tapIndex ? wx.chooseImage({
                    count: 1,
                    sizeType: ["original", "compressed"],
                    sourceType: ["album"],
                    success: function (t) {
                        var e = t.tempFilePaths[0],
                            a = encodeURIComponent(e);

                        getApp().util.checkFile(t.tempFilePaths[0]).then(checkRes => {
                            if (checkRes) {
                                wx.navigateTo({
                                    url: "/pages/others/icon/icon?pic=" + a
                                });
                            } else {
                                getApp().util.toast('上传内容存在违规，请更换图片后重试~')
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
                        var e = t.tempFilePaths[0],
                            a = encodeURIComponent(e);
                        wx.navigateTo({
                            url: "/pages/others/icon/icon?pic=" + a
                        });
                    }
                }) : wx.chooseMessageFile({
                    count: 1,
                    type: "image",
                    success: function (t) {
                        var e = t.tempFiles[0],
                            a = encodeURIComponent(e.path);
                        wx.navigateTo({
                            url: "/pages/others/icon/icon?pic=" + a
                        });
                    }
                });
            }
        });
        else {
            var n = e.data.images[a].src,
                i = encodeURIComponent(n);
            wx.navigateTo({
                url: "/pages/others/icon/icon?pic=" + i
            });
        }
    },
    onSwitchChange: function (t) {
        var e = {
            color: "rgba(255, 255, 255, 1)",
            mask: "rgba(255, 255, 255, 1)",
            lineWidth: 0,
            circle: t.detail.value
        };
        this.setData({
            "cropperOpt.boundStyle": e
        }), this.cropper.updateBoundStyle(e);
    },
    onLongPress: function (t) {
        var e = t.currentTarget.offsetLeft,
            a = t.currentTarget.offsetTop,
            n = t.changedTouches[0].pageX,
            i = t.changedTouches[0].pageY;
        this._handleComputedPoints(), this.setData({
            currentImg: t.currentTarget.dataset.url,
            currentDef: t.currentTarget.dataset.def,
            currentIndex: t.currentTarget.dataset.index,
            hidden: !1,
            touch: !0,
            x: e,
            y: a,
            point2offsetX: n - e,
            point2offsetY: i - a
        })
        // , wx.vibrateShort();
    },
    _handleComputedPoints: function (t) {
        var e = this;
        wx.createSelectorQuery().selectAll(".item").fields({
            dataset: !0,
            rect: !0
        }, function (t) {
            e.setData({
                pointsArr: t
            });
        }).exec();
    },
    handleTouchMove: function (t) {
        this.data.x, this.data.y;
        var e = t.touches[0].pageX,
            a = t.touches[0].pageY,
            n = this;
        n.setData({
            x: e - n.data.point2offsetX,
            y: a - n.data.point2offsetY
        });
    },
    handleTouchEnd: function (t) {
        this.data.touch ? this.swapPosition(t) : this.setData({
            currentIndex: -1
        });
    },
    swapPosition: function (t) {
        for (var e = t.changedTouches[0].pageX, a = t.changedTouches[0].pageY, n = this.data.pointsArr, i = this.data.images, o = 0; o < n.length; o++) {
            var s = n[o];
            if (e > s.left && e < s.right && a > s.top && a < s.bottom) {
                var c = s.dataset.index,
                    r = this.data.currentIndex,
                    d = i[r];
                i[r] = i[c], i[c] = d;
            }
        }
        this.setData({
            images: i,
            hidden: !0,
            touch: !1,
            currentImg: "",
            currentIndex: -1
        })
        // , wx.vibrateShort();
    }
});