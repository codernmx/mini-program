module.exports = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
        var o = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, t) : {};
        o.get || o.set ? Object.defineProperty(r, t, o) : r[t] = e[t];
    }
    return r.default = e, r;
};