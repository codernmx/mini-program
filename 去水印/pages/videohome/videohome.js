require("../../utils/spark-md5.js");

Page({
    data: {},
    onLoad: function(e) {},
    deWaterTap: function(e) {
        wx.navigateTo({
            url: "../../pages/index/index"
        });
    },
    videoEditTap: function(e) {
        wx.chooseVideo({
            sourceType: [ "album" ],
            compressed: !1,
            success: function(e) {
                wx.openVideoEditor({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        console.log(e.tempFilePath), wx.showModal({
                            content: "已保存，请在相册中查看",
                            confirmText: "知道了",
                            showCancel: !1
                        });
                    }
                });
            }
        });
    },
    compressTap: function(e) {
        wx.chooseVideo({
            sourceType: [ "album" ],
            compressed: !1,
            success: function(e) {
                wx.navigateTo({
                    url: "../../pages/compress/compress?videoPath=" + e.tempFilePath
                });
            }
        });
    },
    md5Tap: function(e) {
        wx.navigateTo({
            url: "../../pages/updatemd5/updatemd5"
        });
    },
    markTap: function(e) {
        wx.navigateToMiniProgram({
            appId: "wx285a242d191f9226"
        });
    },

    onShareAppMessage: function() {
        return {
            title: "这里可以免费短视频去水印保存",
            path: "pages/videohome/videohome"
        };
    },
    onShareTimeline: function() {
        return {
            title: "这里可以免费短视频去水印保存"
        };
    }
});