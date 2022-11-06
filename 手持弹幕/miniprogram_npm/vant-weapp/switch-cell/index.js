(0, require("../common/component").VantComponent)({
    field: !0,
    props: {
        value: null,
        icon: String,
        title: String,
        label: String,
        border: Boolean,
        checked: Boolean,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        useLabelSlot: Boolean,
        size: {
            type: String,
            value: "24px"
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
        onChange: function(e) {
            this.$emit("change", e.detail);
        }
    }
});