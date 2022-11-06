Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(o) {
    var n = ((o = Object.assign({}, t, (s = o, (0, e.isObj)(s) ? s : {
        text: s
    }))).context || (r = getCurrentPages(), r[r.length - 1])).selectComponent(o.selector);
    var r;
    var s;
    delete o.context, delete o.selector, n ? (n.set(o), n.show()) : console.warn("未找到 van-notify 节点，请确认 selector 及 context 是否正确");
};

var e = require("../common/utils"), t = {
    selector: "#van-notify",
    duration: 3e3
};