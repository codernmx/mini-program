(0, require("../common/component").VantComponent)({
    field: !0,
    classes: [ "node-class" ],
    props: {
        checked: null,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            value: "30px"
        },
        activeValue: {
            type: null,
            value: !0
        },
        inactiveValue: {
            type: null,
            value: !1
        }
    },
    watch: {
        checked: function(e) {
            this.set({
                value: e
            });
        }
    },
    created: function() {
        this.set({
            value: this.data.checked
        });
    },
    methods: {
        onClick: function() {
            var e = this.data, t = e.activeValue, a = e.inactiveValue;
            if (!this.data.disabled && !this.data.loading) {
                var i = this.data.checked === t ? a : t;
                this.$emit("input", i), this.$emit("change", i);
            }
        }
    }
});