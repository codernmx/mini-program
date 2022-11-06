var e = {
    user: function() {
        return wx.getStorageSync("user");
    },
    token: function() {
        return wx.getStorageSync("token");
    },
    check: function() {
        var n = e.user(), o = e.token();
        return !!(n && Date.now() < wx.getStorageSync("expired_in") && o) && (console.log("access_token过期时间：", (wx.getStorageSync("expired_in") - Date.now()) / 1e3, "秒"), 
        !0);
    },
    login: function() {
        return new Promise(function(e, n) {
            wx.login({
                success: function(n) {
                    e(n);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    },
    logout: function() {
        return wx.removeStorageSync("user"), wx.removeStorageSync("token"), wx.removeStorageSync("expired_in"), 
        !0;
    },
    getUserInfo: function() {
        return new Promise(function(n, o) {
            e.login().then(function(e) {
                var t = {};
                t.code = e.code, wx.getUserInfo({
                    success: function(e) {
                        t.iv = encodeURIComponent(e.iv), t.encryptedData = encodeURIComponent(e.encryptedData), 
                        n(t);
                    },
                    fail: function(e) {
                        o(e);
                    }
                });
            });
        });
    }
};

module.exports = e;