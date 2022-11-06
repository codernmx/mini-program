var o = require("../../../@babel/runtime/helpers/defineProperty"), r = require("../common/component"), t = require("../common/color"), e = {
    danger: t.RED,
    primary: t.BLUE,
    success: t.GREEN,
    warning: t.ORANGE
};

(0, r.VantComponent)({
    props: {
        size: String,
        type: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String
    },
    computed: {
        style: function() {
            var r = this.data.color || e[this.data.type] || "#999", t = this.data.plain ? "color" : "background-color", n = o({}, t, r);
            return this.data.textColor && (n.color = this.data.textColor), Object.keys(n).map(function(o) {
                return "".concat(o, ": ").concat(n[o]);
            }).join(";");
        }
    }
});