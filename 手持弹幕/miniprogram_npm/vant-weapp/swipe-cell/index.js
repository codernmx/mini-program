var t = require("../common/component"), i = require("../mixins/touch");

(0, t.VantComponent)({
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            value: 0
        },
        rightWidth: {
            type: Number,
            value: 0
        },
        asyncClose: Boolean
    },
    mixins: [ i.touch ],
    data: {
        catchMove: !1
    },
    created: function() {
        this.offset = 0;
    },
    methods: {
        open: function(t) {
            var i = this.data, s = i.leftWidth, e = i.rightWidth, n = "left" === t ? s : -e;
            this.swipeMove(n);
        },
        close: function() {
            this.swipeMove(0);
        },
        swipeMove: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            this.offset = t;
            var i = "translate3d(".concat(t, "px, 0, 0)"), s = this.draging ? "none" : ".6s cubic-bezier(0.18, 0.89, 0.32, 1)";
            this.set({
                wrapperStyle: "\n        -webkit-transform: ".concat(i, ";\n        -webkit-transition: ").concat(s, ";\n        transform: ").concat(i, ";\n        transition: ").concat(s, ";\n      ")
            });
        },
        swipeLeaveTransition: function() {
            var t = this.data, i = t.leftWidth, s = t.rightWidth, e = this.offset;
            s > 0 && -e > .3 * s ? this.open("right") : i > 0 && e > .3 * i ? this.open("left") : this.swipeMove(0), 
            this.set({
                catchMove: !1
            });
        },
        startDrag: function(t) {
            this.data.disabled || (this.draging = !0, this.startOffset = this.offset, this.firstDirection = "", 
            this.touchStart(t));
        },
        noop: function() {},
        onDrag: function(t) {
            if (!this.data.disabled && (this.touchMove(t), this.firstDirection || (this.firstDirection = this.direction, 
            this.set({
                catchMove: "horizontal" === this.firstDirection
            })), "vertical" !== this.firstDirection)) {
                var i = this.data, s = i.leftWidth, e = i.rightWidth, n = this.startOffset + this.deltaX;
                e > 0 && -n > e || s > 0 && n > s || this.swipeMove(n);
            }
        },
        endDrag: function() {
            this.data.disabled || (this.draging = !1, this.swipeLeaveTransition());
        },
        onClick: function(t) {
            var i = t.currentTarget.dataset.key, s = void 0 === i ? "outside" : i;
            this.$emit("click", s), this.offset && (this.data.asyncClose ? this.$emit("close", {
                position: s,
                instance: this
            }) : this.swipeMove(0));
        }
    }
});