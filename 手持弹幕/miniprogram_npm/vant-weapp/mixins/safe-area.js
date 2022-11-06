Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.safeArea = void 0;

var e = null;

function t() {
    return new Promise(function(t, o) {
        null != e ? t(e) : wx.getSystemInfo({
            success: function(o) {
                var s = o.model, a = o.statusBarHeight, n = s.replace(/\s/g, "-"), r = /iphone-x|iPhone11|iPhone12|iPhone13/i.test(n);
                t(e = {
                    isIPhoneX: r,
                    statusBarHeight: a
                });
            },
            fail: o
        });
    });
}

exports.safeArea = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = e.safeAreaInsetBottom, s = void 0 === o || o, a = e.safeAreaInsetTop, n = void 0 !== a && a;
    return Behavior({
        properties: {
            safeAreaInsetTop: {
                type: Boolean,
                value: n
            },
            safeAreaInsetBottom: {
                type: Boolean,
                value: s
            }
        },
        created: function() {
            var e = this;
            t().then(function(t) {
                var o = t.isIPhoneX, s = t.statusBarHeight;
                e.set({
                    isIPhoneX: o,
                    statusBarHeight: s
                });
            });
        }
    });
};