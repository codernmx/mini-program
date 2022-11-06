var e = require("83BAAC2678504FCFE5DCC42189860344.js");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = e(require("70E56E8078504FCF168306875C770344.js")), r = require("0D8C9B2678504FCF6BEAF32193780344.js"), a = require("2E3B3D2778504FCF485D552066D70344.js"), n = new Map(), i = {
    downloadAudio: function(e) {
        var i = this, o = (0, r.$getStorageSync)(e, "");
        if (n.has(e)) return o ? Promise.resolve(o) : n.get(e);
        var u = (0, t.default)("getSavedFileInfo", {
            filePath: o
        }).then(function() {
            return o;
        }).catch(function() {
            return (0, t.default)("downloadFile", {
                url: i.qn(e)
            }).then(function(e) {
                var r = e.tempFilePath;
                return (0, t.default)("saveFile", {
                    tempFilePath: r
                });
            }).then(function(t) {
                var a = t.savedFilePath;
                return (0, r.$setStorageSync)(e, a), a;
            }).catch(function(t) {
                var n = t.errMsg, o = void 0 === n ? "" : n;
                if ((0, a.$inArray)(o, "exceed")) {
                    var u = i.qn(e);
                    return (0, r.$setStorageSync)(e, u), u;
                }
            });
        });
        return n.set(e, u), u;
    },
    qn: function(e) {
        return getApp().globalData.host_url + "/addons/aaa_yaoshaizi/resource/yaoshaizi/".concat(e, ".mp3");
    }
};

exports.default = i;