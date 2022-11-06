var a = wx.getSystemInfoSync(), t = getApp();

Page({
    data: {
        cropperHeight: a.windowHeight,
        imageWidth: a.windowWidth,
        imageHeight: a.windowWidth,
        src: "",
        canvasWidth: a.windowWidth - 40,
        canvasHeight: 4 * (a.windowWidth - 40) / 3
    },
    onLoad: function(a) {
        this.setData({
            src: a.src
        });
    },
    onReady: function() {
        this.ctx = wx.createCanvasContext("mainCanvas");
        var a = getCurrentPages();
        a[a.length - 2];
    },
    _drawAvatarToCanvas: function() {
        var a = this.data.src, t = this.data.canvasWidth - 100, i = t;
        this.ctx.fillStyle = "#ff7373", this.ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight), 
        this.ctx.drawImage("/image/bg.png", 0, 0, this.data.canvasWidth, this.data.canvasHeight), 
        this.ctx.drawImage(a, 50, 70, t, i), this.ctx.draw();
    },
    _drawPuzzleToCanvas: function() {
        var a = this.data.src, t = this.data.canvasWidth, i = this.data.canvasHeight;
        this.ctx.drawImage(a, 0, 0, t, i), this.ctx.drawImage("/image/bg.png", 0, 0, t, i), 
        this.ctx.draw();
    },
    previewImage: function(a) {
        var t = a.currentTarget.dataset.src;
        wx.previewImage({
            urls: [ t ]
        });
    },
    savePicture: function() {
        var a = this.data.src;
        wx.saveImageToPhotosAlbum({
            filePath: a,
            success: function(a) {}
        });
    },
    tapShareMoments: function() {
        wx.canvasToTempFilePath({
            canvasId: "mainCanvas",
            success: function(a) {
                var t = a.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: t,
                    success: function(a) {
                        wx.showModal({
                            title: "提示",
                            content: "图片已保存到你的手机相册了！",
                            showCancel: !1,
                            confirmText: "知道了"
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: t.globalData.shareTitle,
            path: "/pages/index/index",
            success: function(a) {},
            fail: function(a) {}
        };
    }
});