var e = require("../common/component"), t = require("../mixins/safe-area");

(0, e.VantComponent)({
    mixins: [ (0, t.safeArea)() ],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        onSelect: function(e) {
            var t = e.currentTarget.dataset.index, n = this.data.actions[t];
            !n || n.disabled || n.loading || this.$emit("select", n);
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onClose: function() {
            this.$emit("close");
        }
    }
});