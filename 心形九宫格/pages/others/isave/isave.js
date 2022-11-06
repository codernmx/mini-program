var t = getApp();

Page({
    data: {
        defaultHeight: 800,
        mixImage: "",
        imageWidth: 2584,
        xp: 0
    },
    onLoad: function(a) {
        wx.showLoading({
            title: "拼图中,请稍后。"
        }), this.setData({
            xp: 0
        });
        var e = t.globalData.gImages, n = wx.createCanvasContext("shareCanvas");
        this.handleOneImage(n, e, 0);
    },
    handleOneImage: function(t, a, e) {
        var n = this, s = a[e];
        return new Promise(function(i, o) {
            null == s ? t.draw(!1, function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: n.data.xp,
                    height: n.data.defaultHeight,
                    destWidth: n.data.xp,
                    destHeight: n.data.defaultHeight,
                    canvasId: "shareCanvas",
                    success: function(t) {
                        var a = t.tempFilePath;
                        n.setData({
                            mixImage: a,
                            imageWidth: n.data.xp
                        }), wx.hideLoading();
                    }
                });
            }) : n.drawOneImage(t, s, n.data.xp).then(function(s) {
                "success" == s && n.handleOneImage(t, a, e + 1);
            });
        });
    },
    drawOneImage: function(t, a, e) {
        var n = this;
        return new Promise(function(s, i) {
            wx.getImageInfo({
                src: a,
                success: function(i) {
                    var o = i.width, c = i.height, u = o * n.data.defaultHeight / c;
                    t.drawImage(a, e, 0, u, n.data.defaultHeight), t.stroke(), n.setData({
                        xp: n.data.xp + u
                    }), s("success");
                }
            });
        });
    },
    previewImage: function(t) {
        var a = t.currentTarget.dataset.url, e = [ a ];
        wx.previewImage({
            current: a,
            urls: e
        });
    },
    saveImage: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                t.setData({
                    disabled: !0
                }), a.authSetting["scope.writePhotosAlbum"] ? t.startSaveImage() : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        t.startSaveImage();
                    },
                    fail: function() {
                        wx.showModal({
                            title: "警告",
                            content: "你拒绝了授权,将无法正常保存图片,点击确定重新获取授权。",
                            success: function(t) {
                                t.confirm && wx.openSetting({
                                    success: function(t) {
                                        console.log("授权成功");
                                    }
                                });
                            }
                        }), t.setData({
                            disabled: !1
                        });
                    }
                });
            }
        });
    },
    startSaveImage: function() {
        var t = this;
        wx.saveImageToPhotosAlbum({
            filePath: t.data.mixImage,
            success: function(a) {
                wx.showToast({
                    title: "保存成功",
                    icon: "success",
                    duration: 1e3
                }), t.setData({
                    disabled: !1
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});