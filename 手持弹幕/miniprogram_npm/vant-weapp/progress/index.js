var o = require("../common/component"), e = require("../common/color");

(0, o.VantComponent)({
    props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        pivotColor: String,
        showPivot: {
            type: Boolean,
            value: !0
        },
        color: {
            type: String,
            value: e.BLUE
        },
        textColor: {
            type: String,
            value: "#fff"
        }
    }
});