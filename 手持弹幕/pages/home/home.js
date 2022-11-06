getApp();

var n = null;

Page({
    data: {
        swipers: [ {
            url: "/static/images/home/banner1.png"
        }, {
            url: "/static/images/home/banner2.png"
        } ]
    },
    onLoad: function(e) {
        wx.createInterstitialAd && ((n = wx.createInterstitialAd({
            adUnitId: "adunit-b832783b9ad3d6f9"
        })).onLoad(function() {}), n.onError(function(n) {}), n.onClose(function() {})), 
        n && n.show().catch(function(n) {
            console.error(n);
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareTimeline: function() {
        return {
            title: "给你分享一个超好玩的免费LED弹幕工具！",
            query: {},
            imageUrl: ""
        };
    },
    onShareAppMessage: function() {
        wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
    }
});