var e = require("83BAAC2678504FCFE5DCC42189860344.js");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var i = e(require("0266658678504FCF64000D8115360344.js")), o = e(require("7EE9B41678504FCF188FDC11CE460344.js")), d = require("F6703A8178504FCF901652862FE70344.js"), r = require("2E3B3D2778504FCF485D552066D70344.js"), t = function() {
    function e(o) {
        (0, i.default)(this, e), wx.createRewardedVideoAd && (this.videoAd = wx.createRewardedVideoAd({
            adUnitId: o.adUnitId
        }));
    }
    return (0, o.default)(e, [ {
        key: "showVideoAd",
        value: function() {
            var e = this;
            this.videoAd && ((0, r.$showLoading)({
                title: "视频加载中"
            }), this.videoAd.load().then(function() {
                (0, r.$hideLoading)(), e.videoAd.show();
            }).catch(function(e) {
                return (0, d.$error)(e.errMsg);
            }));
        }
    }, {
        key: "onCloseVideo",
        value: function() {
            var e = this;
            return new Promise(function(i, o) {
                e.videoAd ? e.videoAd.onClose(function(e) {
                    e.isEnded ? i() : o();
                }) : o();
            });
        }
    }, {
        key: "onErrorVideo",
        value: function(e) {
            this.videoAd && this.videoAd.onError(function() {
                "function" == typeof e && e();
            });
        }
    } ]), e;
}();

exports.default = t;