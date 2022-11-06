var e = "https://zt.yinlao.cn", n = require("./auth"), t = {
    comments: [ "fNlp81kLJvCKLNBdendgPG7Pe1lCJFKmIMHt2r76YZ0", "zYvY02QIIrAD1snUHBHZzKdlWzN54lRX05KYvSSTvUk" ],
    subscribe: [ "5UTa3Mi43Tht3xGX2PzIyurKKGbFSREdsWrb3jwU-GY" ]
}, o = {
    getHost: function() {
        return e;
    },
    template: function() {
        return t;
    },
    request: function(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GET", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
            token: !0
        };
        return new Promise(function(u, i) {
            if (n = e + n, s.token) {
                var c = o.token();
                c ? n = n.indexOf("?") > 0 ? n + "&access_token=" + c : n + "?access_token=" + c : console.warn("[提示]", "部分数据需要授权，检测出当前访问用户未授权登录小程序");
            }
            console.log(n), console.log(r), wx.request({
                url: n,
                data: r,
                method: t,
                success: function(e) {
                    console.log(e), 200 == e.statusCode ? u(e.data) : "rest_post_invalid_page_number" === e.data.code ? wx.showToast({
                        title: "没有更多内容",
                        mask: !1,
                        duration: 1e3
                    }) : (wx.showToast({
                        title: "请求数据出错",
                        icon: "loading",
                        duration: 1500
                    }), i(e.data));
                },
                fail: function(e) {
                    console.log(e), i(e);
                }
            });
        });
    },
    get: function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
            token: !1
        };
        return o.request(e, "GET", n, t);
    },
    post: function(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
            token: !0
        };
        return o.request(e, "POST", n, t);
    },
    getUser: function() {
        return !!n.check() && n.user();
    },
    login: function() {
        return new Promise(function(e, t) {
            n.check() ? e(n.user()) : n.login().then(function(n) {
                o.post("/wp-json/mp/v1/user/openid", n, {
                    token: !1
                }).then(function(n) {
                    o.storageUser(n), e(n);
                }, function(e) {
                    t(e);
                });
            }).catch(function(e) {
                t(e);
            });
        });
    },
    logout: function() {
        n.logout() ? (getApp().globalData.user = "", wx.reLaunch({
            url: "/pages/index/index"
        })) : wx.showToast({
            title: "注销失败!",
            icon: "loading",
            duration: 1e3
        });
    },
    getUserInfo: function() {
        return new Promise(function(e, t) {
            n.getUserInfo().then(function(n) {
                o.post("/wp-json/mp/v1/user/login", n, {
                    token: !1
                }).then(function(n) {
                    o.storageUser(n), console.log(n), e(n.user);
                }, function(e) {
                    t(e);
                });
            }).catch(function(e) {
                t(e);
            });
        });
    },
    token: function() {
        var e = n.token(), t = Date.now();
        return !!(e && t < wx.getStorageSync("expired_in")) && e;
    },
    storageUser: function(e) {
        getApp().globalData.user = e.user, wx.setStorageSync("user", e.user), wx.setStorageSync("openid", e.openid), 
        e.access_token && (wx.setStorageSync("token", e.access_token), wx.setStorageSync("expired_in", Date.now() + 1e5 * parseInt(e.expired_in, 10) - 6e4));
    },
    guard: function(e) {
        var n = this;
        return function() {
            var t = arguments;
            return o.getUser() ? e.apply(n, arguments) : o.getUserInfo().then(function(o) {
                return console.log("登录成功", o), e.apply(n, t);
            }, function(e) {
                return console.log("登录失败", e), e;
            });
        };
    }
};

module.exports = o;