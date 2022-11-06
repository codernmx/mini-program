var n, t = [ "#ffdd00", "#ff6c00", "#ff0c00", "#fffc00", "#00ff12", "#00f6ff", "#0000ff", "#ff00e4", "#ff0048" ], a = 0, e = null;

Page({
    data: {
        bg: "#FFDD00",
        tshd: !1,
        fhhd: !0,
        display: "none",
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 1e4,
        duration: 800,
        circular: !1,
        indexzuo: [],
        indexyou: []
    },
    onLoad: function(e) {
        var o = this;
        setTimeout(function() {
            o.setData({
                tshd: !0
            });
        }, 3e3), n = setInterval(function() {
            8 == a ? a = 0 : a += 1, o.setData({
                bg: t[a]
            });
        }, 50);
    },
    indexright: function(n) {
        var t = n.currentTarget.dataset;
        console.log(t), console.log(t.you.title), wx.navigateToMiniProgram({
            appId: t.you.uid,
            path: t.you.dizhi,
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(n) {}
        });
    },
    fanhui: function() {
        wx.navigateBack({});
    },
    tingzhi: function() {
        var e = this;
        1 == e.data.fhhd ? (clearInterval(n), e.setData({
            tshd: !0,
            fhhd: !1,
            display: "flex"
        })) : 0 == e.data.fhhd && (e.setData({
            fhhd: !0,
            display: "none"
        }), n = setInterval(function() {
            8 == a ? a = 0 : a += 1, e.setData({
                bg: t[a]
            });
        }, 50));
    },
    onReady: function() {},
    onShow: function() {
        e && e.show().catch(function(n) {
            console.error(n);
        });
    },
    onHide: function() {},
    onUnload: function() {
        clearInterval(n);
    },
    onShareAppMessage: function() {
        return {
            title: "弹幕闪屏",
            success: function(n) {},
            fail: function(n) {}
        };
    },
    RandomNum: function(n, t) {
        var a = t - n, e = Math.random();
        return n + Math.round(e * a);
    },
    preChaping: function() {
        var n = getApp().inGetAdvtype();
        wx.createInterstitialAd && null != n && n.kv.chaping.length && ((e = wx.createInterstitialAd({
            adUnitId: n.kv.chaping
        })).onLoad(function() {}), e.onError(function(n) {}), e.onClose(function() {}));
    }
});