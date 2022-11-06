var e = require("../common/component"), t = require("../common/utils");

(0, e.VantComponent)({
    field: !0,
    classes: [ "input-class", "right-icon-class" ],
    props: {
        size: String,
        icon: String,
        label: String,
        error: Boolean,
        fixed: Boolean,
        focus: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        disabled: Boolean,
        autosize: Boolean,
        readonly: Boolean,
        required: Boolean,
        password: Boolean,
        iconClass: String,
        clearable: Boolean,
        inputAlign: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        errorMessage: String,
        placeholder: String,
        placeholderStyle: String,
        errorMessageAlign: String,
        selectionEnd: {
            type: Number,
            value: -1
        },
        selectionStart: {
            type: Number,
            value: -1
        },
        showConfirmBar: {
            type: Boolean,
            value: !0
        },
        adjustPosition: {
            type: Boolean,
            value: !0
        },
        cursorSpacing: {
            type: Number,
            value: 50
        },
        maxlength: {
            type: Number,
            value: -1
        },
        type: {
            type: String,
            value: "text"
        },
        border: {
            type: Boolean,
            value: !0
        },
        titleWidth: {
            type: String,
            value: "90px"
        }
    },
    data: {
        focused: !1,
        system: (0, t.getSystemInfoSync)().system.split(" ").shift().toLowerCase()
    },
    methods: {
        onInput: function(e) {
            var t = this, n = (e.detail || {}).value, o = void 0 === n ? "" : n;
            this.set({
                value: o
            }, function() {
                t.emitChange(o);
            });
        },
        onFocus: function(e) {
            this.set({
                focused: !0
            }), this.$emit("focus", e.detail);
        },
        onBlur: function(e) {
            this.set({
                focused: !1
            }), this.$emit("blur", e.detail);
        },
        onClickIcon: function() {
            this.$emit("click-icon");
        },
        onClear: function() {
            var e = this;
            this.set({
                value: ""
            }, function() {
                e.emitChange(""), e.$emit("clear", "");
            });
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.value);
        },
        emitChange: function(e) {
            this.$emit("input", e), this.$emit("change", e);
        }
    }
});