(0, require("../common/component").VantComponent)({
    field: !0,
    classes: [ "input-class", "plus-class", "minus-class" ],
    props: {
        value: null,
        integer: Boolean,
        disabled: Boolean,
        inputWidth: String,
        asyncChange: Boolean,
        disableInput: Boolean,
        min: {
            type: null,
            value: 1
        },
        max: {
            type: null,
            value: Number.MAX_SAFE_INTEGER
        },
        step: {
            type: null,
            value: 1
        },
        showPlus: {
            type: Boolean,
            value: !0
        },
        showMinus: {
            type: Boolean,
            value: !0
        },
        disablePlus: Boolean,
        disableMinus: Boolean
    },
    computed: {
        minusDisabled: function() {
            return this.data.disabled || this.data.disableMinus || this.data.value <= this.data.min;
        },
        plusDisabled: function() {
            return this.data.disabled || this.data.disablePlus || this.data.value >= this.data.max;
        }
    },
    watch: {
        value: function(t) {
            if ("" !== t) {
                var a = this.range(t);
                "number" == typeof a && +this.data.value !== a && this.set({
                    value: a
                });
            }
        },
        max: "check",
        min: "check"
    },
    data: {
        focus: !1
    },
    created: function() {
        this.set({
            value: this.range(this.data.value)
        });
    },
    methods: {
        check: function() {
            var t = this.range(this.data.value);
            "number" == typeof t && +this.data.value !== t && this.set({
                value: t
            });
        },
        onFocus: function(t) {
            this.$emit("focus", t.detail);
        },
        onBlur: function(t) {
            var a = this.range(this.data.value);
            this.triggerInput(a), this.$emit("blur", t.detail);
        },
        range: function(t) {
            return t = String(t).replace(/[^0-9.-]/g, ""), Math.max(Math.min(this.data.max, t), this.data.min);
        },
        onInput: function(t) {
            var a = (t.detail || {}).value, e = void 0 === a ? "" : a;
            this.triggerInput(e);
        },
        onChange: function(t) {
            if (this.data["".concat(t, "Disabled")]) this.$emit("overlimit", t); else {
                var a = "minus" === t ? -this.data.step : +this.data.step, e = Math.round(100 * (+this.data.value + a)) / 100;
                this.triggerInput(this.range(e)), this.$emit(t);
            }
        },
        onMinus: function() {
            this.onChange("minus");
        },
        onPlus: function() {
            this.onChange("plus");
        },
        triggerInput: function(t) {
            this.set({
                value: this.data.asyncChange ? this.data.value : t
            }), this.$emit("change", t);
        }
    }
});