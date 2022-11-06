Page({
    data: {
        adVideoOff: 1,
        headHeight: 0,
        menus: [ {
            name: "经典弹幕",
            class: "all",
            page: "/pages/classics/classics?template=0"
        }, {
            name: "像素体",
            class: "l",
            page: "/pages/classics/classics?template=6"
        }, {
            name: "抖音体",
            class: "r",
            page: "/pages/classics/classics?template=1"
        }, {
            name: "表白屏",
            class: "l",
            page: "/pages/classics/classics?template=2"
        }, {
            name: "接机牌",
            class: "r",
            page: "/pages/classics/classics?template=4"
        }, {
            name: "闪烁跳动",
            class: "l",
            page: "/pages/classics/classics?template=3"
        }, {
            name: "让座提醒",
            class: "r",
            page: "/pages/classics/classics?template=5"
        } ],
        more: [ {
            name: "炫酷闪屏",
            class: "l",
            page: "/pages/play/twinkle/index"
        }, {
            name: "喝酒神器",
            class: "r",
            page: "/pages/play/drink/index"
        }, {
            name: "掷骰子",
            class: "l",
            page: "/pages/play/dice/index"
        }, {
            name: "比大小",
            class: "r",
            page: "/pages/play/size/index"
        } ]
    },
    onLoad: function(a) {},
    menuTap: function(a) {
        wx.navigateTo({
            url: a.currentTarget.dataset.page
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(s) {
                var e = wx.getMenuButtonBoundingClientRect();
                a.setData({
                    headHeight: e.bottom + e.top - s.statusBarHeight
                });
            }
        });
    },
    adVideoLoad: function() {
        console.log("小程序视频广告加载成功");
    },
    adVideoClose: function() {
        this.setData({
            adVideoOff: !1
        });
    },
    adError: function() {
        this.setData({
            adVideoOff: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});