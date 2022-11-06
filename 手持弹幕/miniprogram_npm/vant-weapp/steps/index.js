var o = require("../common/component"), r = require("../common/color");

(0, o.VantComponent)({
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            value: "horizontal"
        },
        activeColor: {
            type: String,
            value: r.GREEN
        }
    }
});