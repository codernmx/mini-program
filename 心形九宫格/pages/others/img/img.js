var a = getApp();

Page({
    data: {
        images: []
    },
    onLoad: function (a) {
        wx.setNavigationBarTitle({
            title: "横向拼图小程序"
        });
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {
        return {
            title: "简洁横向拼图小程序。",
            imageUrl: "/image/img-share.png"
        };
    },
    addImage: function () {
        var a = this;
        wx.chooseImage({
            count: 9,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function (e) {
                var t = e.tempFilePaths;
                let temp = []
                for (let i = 0; i < t.length; i++) {
                    getApp().util.checkFile(t[i]).then(checkRes => {
                        if (checkRes) {
                            temp.push(t[i])
                            a.setData({
                                images: temp
                            });
                        } else {
                            getApp().util.toast('上传内容违规，请更换图片~')
                        }
                    }).catch(err => {
                        getApp().util.toast(err)
                    })
                }
                
            }
        });
    },
    clearImages: function () {
        this.setData({
            images: []
        });
    },
    deleteOneImage: function (a) {
        var e = this.data.images,
            t = a.currentTarget.dataset.idx;
        e.splice(t, 1), this.setData({
            images: e
        });
    },
    previewImage: function (a) {
        var e = a.currentTarget.dataset.idx,
            t = this.data.images;
        wx.previewImage({
            current: t[e],
            urls: t
        });
    },
    finish: function () {
        this.data.images.length <= 1 ? wx.showToast({
            title: "需要2张或者及以上图片！",
            icon: "none",
            // image: "https://bt.nmxgzs.cn/upload/2022-06-30/P6w95w.png",
            duration: 1e3,
            success: function () {}
        }) : (a.globalData.gImages = this.data.images, wx.navigateTo({
            url: "../isave/isave"
        }));
    }
});