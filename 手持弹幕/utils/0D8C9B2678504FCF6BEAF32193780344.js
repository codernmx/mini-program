function e(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    try {
        return wx.getStorageSync(e) || r;
    } catch (e) {
        return r;
    }
}

function r(e, r) {
    try {
        return wx.setStorageSync(e, r);
    } catch (e) {
        (0, o.$error)(e);
    }
}

function t(e) {
    try {
        return wx.removeStorageSync(e);
    } catch (e) {
        (0, o.$error)(e);
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.$setStorageSync = function(e, n, o) {
    r(e, n), o > 0 ? r(e + c, "".concat(Date.now() + o)) : t(e + c);
}, exports.$getStorageSync = function(r) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, o = (0, 
    n.$parseInt)(e(r + c));
    return o && o < Date.now() ? t : e(r) || t;
}, exports.$removeStorageSync = function(e) {
    t(e), t(e + c);
};

var n = require("2E3B3D2778504FCF485D552066D70344.js"), o = require("F6703A8178504FCF901652862FE70344.js"), c = "_expired_time";