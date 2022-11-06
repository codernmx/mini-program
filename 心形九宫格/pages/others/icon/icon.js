getApp();

var e = require("../cropper/we-cropper.js"), o = wx.getSystemInfoSync(), t = o.windowWidth, c = t / 750 * 600, i = c, r = t / 750 * 500;

Page({
    data: {
        cropperOpt: {
            id: "cropper",
            targetId: "targetCropper",
            pixelRatio: o.pixelRatio,
            width: c,
            height: i,
            scale: 2.5,
            zoom: 5,
            opacity: 0,
            circle: !0,
            cut: {
                x: (c - r) / 2,
                y: (i - r) / 2,
                width: r,
                height: r
            },
            boundStyle: {
                color: "rgba(255, 255, 255, .9)",
                mask: "rgba(255, 255, 255, .9)",
                circle: !1
            }
        }
    },
    onLoad: function(o) {
        var t = decodeURIComponent(o.pic), c = this.data.cropperOpt;
        this.iconCropper = new e(c).on("ready", function(e) {
            console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function(e) {
            wx.showToast({
                title: "上传中",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function(e) {
            wx.hideToast();
        }).on("beforeDraw", function(e) {
            console.log(e);
        }), this.iconCropper.pushOrign(t);
    },
    touchStart: function(e) {
        this.wecropper.touchStart(e);
    },
    touchMove: function(e) {
        this.wecropper.touchMove(e);
    },
    touchEnd: function(e) {
        this.wecropper.touchEnd(e);
    },
    uploadOptionTap: function() {
        var e = this;
        wx.showActionSheet({
            itemList: [ "相册中选取", "用手机拍照", "聊天中选取" ],
            success: function(o) {
                0 == o.tapIndex ? wx.chooseImage({
                    count: 1,
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album" ],
                    success: function(o) {
                        var t = o.tempFilePaths[0];
                        e.iconCropper.pushOrign(t);
                    }
                }) : 1 == o.tapIndex ? wx.chooseImage({
                    count: 1,
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "camera" ],
                    success: function(o) {
                        var t = o.tempFilePaths[0];
                        e.iconCropper.pushOrign(t);
                    }
                }) : wx.chooseMessageFile({
                    count: 1,
                    type: "image",
                    success: function(o) {
                        var t = o.tempFiles[0];
                        e.iconCropper.pushOrign(t.path);
                    }
                });
            }
        });
    },
    getCropperImage: function() {
        this.iconCropper.getCropperIconImage(function(e, o) {
            if (o) wx.showModal({
                title: "温馨提示",
                content: o.message
            }); else {
                var t = getCurrentPages();
                t[t.length - 2].setData({
                    selectIconPic: e
                }), wx.navigateBack();
            }
        });
    }
});