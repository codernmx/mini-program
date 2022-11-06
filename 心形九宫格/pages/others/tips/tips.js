getApp();

var t = wx.getSystemInfoSync(),
    e = (t.windowWidth, t.windowHeight),
    a = 750 / t.windowWidth,
    i = t.statusBarHeight * a,
    n = 44 * a,
    g = e * a,
    o = t.screenHeight * a - i - n - g;

Page({
    data: {
        winHeight: g,
        tabBarHeight: o,
        showImage: "https://bt.nmxgzs.cn/upload/2022-06-30/4iTsBU.jpg"
    },
    onLoad: function (t) {},
    navigateBack: function () {
        wx.navigateBack();
    },
    onShareAppMessage: function (t) {
        return t.from, {
            title: "我发现一个好玩的爱心拼图助手",
            path: "/pages/home/home"
        };
    }
});