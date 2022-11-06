Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isDef = function(e) {
    return null != e;
}, exports.isObj = function(t) {
    var n = e(t);
    return null !== t && ("object" === n || "function" === n);
}, exports.isNumber = function(e) {
    return /^\d+$/.test(e);
}, exports.range = function(e, t, n) {
    return Math.min(Math.max(e, t), n);
}, exports.nextTick = function(e) {
    setTimeout(function() {
        e();
    }, 1e3 / 30);
}, exports.getSystemInfoSync = function() {
    null == t && (t = wx.getSystemInfoSync());
    return t;
};

var e = require("../../../@babel/runtime/helpers/typeof");

var t = null;