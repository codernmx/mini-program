var e = require("../common/component"), t = require("../common/color"), i = require("../mixins/safe-area");

(0, e.VantComponent)({
    mixins: [ (0, i.safeArea)() ],
    props: {
        text: String,
        color: {
            type: String,
            value: "#fff"
        },
        backgroundColor: {
            type: String,
            value: t.RED
        },
        duration: {
            type: Number,
            value: 3e3
        },
        zIndex: {
            type: Number,
            value: 110
        }
    },
    methods: {
        show: function() {
            var e = this, t = this.data.duration;
            clearTimeout(this.timer), this.set({
                show: !0
            }), t > 0 && t !== 1 / 0 && (this.timer = setTimeout(function() {
                e.hide();
            }, t));
        },
        hide: function() {
            clearTimeout(this.timer), this.set({
                show: !1
            });
        }
    }
});