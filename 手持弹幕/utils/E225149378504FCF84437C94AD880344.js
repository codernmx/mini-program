var e = require("83BAAC2678504FCFE5DCC42189860344.js");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = e(require("0266658678504FCF64000D8115360344.js")), a = e(require("7EE9B41678504FCF188FDC11CE460344.js")), i = require("2E3B3D2778504FCF485D552066D70344.js"), o = e(require("48EE498778504FCF2E8821802D980344.js")), d = require("0D8C9B2678504FCF6BEAF32193780344.js"), s = function() {
    function e(a, o) {
        var d = a.freePlayTimes, s = a.storageName, r = a.adUnitId;
        if ((0, t.default)(this, e), this.gameTimes = 0, this.freePlayTimes = d, this.storageName = s, 
        this.adUnitId = r, !o) throw (0, i.$toast)("pageCtx不能为空, 请检查！"), new Error("pageCtx不能为空");
        this.adModal = o.selectComponent("#adModal");
    }
    return (0, a.default)(e, [ {
        key: "judgeVideoAd",
        value: function() {
            return !(this.freePlayTimes >= 99 || getApp().globalData.noAd || (this.gameTimes = Number((0, 
            d.$getStorageSync)(this.storageName)) || 0, this.gameTimes !== this.freePlayTimes || (this.reportEvent("video_ad_show"), 
            this.showVideoAdModal(), 0)));
        }
    }, {
        key: "showVideoAdModal",
        value: function() {
            var e = this;
            this.adModal && this.adModal.showModal().then(function(t) {
                "video" === t ? (e.reportEvent("video_ad_play"), e.playVideoAd()) : "paySuccess" === t ? e.judgeVideoAd() : "think" === t ? (e.reportEvent("video_ad_reject"), 
                (0, i.$navigateBack)()) : (0, i.$navigateBack)();
            });
        }
    }, {
        key: "recordPlayTimes",
        value: function() {
            this.gameTimes > this.freePlayTimes || getApp().globalData.noAd || (0, d.$setStorageSync)(this.storageName, ++this.gameTimes, (0, 
            i.$todayRemainingMS)());
        }
    }, {
        key: "playVideoAd",
        value: function() {
            var e = this, t = new o.default({
                adUnitId: this.adUnitId
            });
            t.showVideoAd(), t.onCloseVideo().then(function() {
                e.reportEvent("video_ad_success"), (0, i.$toast)("解锁成功"), e.recordPlayTimes(), e.adModal && e.adModal.hideModal();
            }).catch(function() {
                e.reportEvent("video_ad_suspend"), (0, i.$toast)("观看完整视频才可解锁哦！"), e.adModal && e.adModal.hideModal(), 
                e.judgeVideoAd();
            }), t.onErrorVideo(this.recordPlayTimes.bind(this));
        }
    }, {
        key: "reportEvent",
        value: function(e) {
            wx.reportAnalytics(e, {
                page_name: this.storageName
            });
        }
    } ]), e;
}();

exports.default = s;