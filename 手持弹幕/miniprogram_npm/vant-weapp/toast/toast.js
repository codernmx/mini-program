Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../common/utils"), t = {
    type: "text",
    mask: !1,
    message: "",
    show: !0,
    zIndex: 1e3,
    duration: 3e3,
    position: "middle",
    forbidClick: !1,
    loadingType: "circular",
    selector: "#van-toast"
}, n = [], o = Object.assign({}, t);

function s(t) {
    return (0, e.isObj)(t) ? t : {
        message: t
    };
}

function r(e) {
    var t, r = Object.assign({}, o, s(e)), i = (r.context || (t = getCurrentPages())[t.length - 1]).selectComponent(r.selector);
    if (i) return delete r.context, delete r.selector, i.clear = function() {
        i.set({
            show: !1
        }), r.onClose && r.onClose();
    }, n.push(i), i.set(r), clearTimeout(i.timer), r.duration > 0 && (i.timer = setTimeout(function() {
        i.clear(), n = n.filter(function(e) {
            return e !== i;
        });
    }, r.duration)), i;
    console.warn("未找到 van-toast 节点，请确认 selector 及 context 是否正确");
}

var i = function(e) {
    return function(t) {
        return r(Object.assign({
            type: e
        }, s(t)));
    };
};

r.loading = i("loading"), r.success = i("success"), r.fail = i("fail"), r.clear = function() {
    n.forEach(function(e) {
        e.clear();
    }), n = [];
}, r.setDefaultOptions = function(e) {
    Object.assign(o, e);
}, r.resetDefaultOptions = function() {
    o = Object.assign({}, t);
};

var c = r;

exports.default = c;