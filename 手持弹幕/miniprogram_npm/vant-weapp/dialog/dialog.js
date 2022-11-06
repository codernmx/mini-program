Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = [];

var t = function t(n) {
    return n = Object.assign({}, t.currentOptions, n), new Promise(function(t, o) {
        var s, c = (n.context || (s = getCurrentPages())[s.length - 1]).selectComponent(n.selector);
        delete n.context, delete n.selector, c ? (c.set(Object.assign({
            onCancel: o,
            onConfirm: t
        }, n)), e.push(c)) : console.warn("未找到 van-dialog 节点，请确认 selector 及 context 是否正确");
    });
};

t.defaultOptions = {
    show: !0,
    title: "",
    message: "",
    zIndex: 100,
    overlay: !0,
    className: "",
    customStyle: "",
    asyncClose: !1,
    messageAlign: "",
    transition: "scale",
    selector: "#van-dialog",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnClickOverlay: !1,
    confirmButtonOpenType: ""
}, t.alert = t, t.confirm = function(e) {
    return t(Object.assign({
        showCancelButton: !0
    }, e));
}, t.close = function() {
    e.forEach(function(e) {
        e.close();
    }), e = [];
}, t.stopLoading = function() {
    e.forEach(function(e) {
        e.stopLoading();
    });
}, t.setDefaultOptions = function(e) {
    Object.assign(t.currentOptions, e);
}, t.resetDefaultOptions = function() {
    t.currentOptions = Object.assign({}, t.defaultOptions);
}, t.resetDefaultOptions();

var n = t;

exports.default = n;