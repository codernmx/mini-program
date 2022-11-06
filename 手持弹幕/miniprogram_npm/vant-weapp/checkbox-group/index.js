(0, require("../common/component").VantComponent)({
    field: !0,
    relation: {
        name: "checkbox",
        type: "descendant",
        linked: function(e) {
            this.children = this.children || [], this.children.push(e), this.updateChild(e);
        },
        unlinked: function(e) {
            this.children = this.children.filter(function(i) {
                return i !== e;
            });
        }
    },
    props: {
        max: Number,
        value: {
            type: Array,
            observer: "updateChildren"
        },
        disabled: {
            type: Boolean,
            observer: "updateChildren"
        }
    },
    methods: {
        updateChildren: function() {
            var e = this;
            (this.children || []).forEach(function(i) {
                return e.updateChild(i);
            });
        },
        updateChild: function(e) {
            var i = this.data, n = i.value, t = i.disabled;
            e.set({
                value: -1 !== n.indexOf(e.data.name),
                disabled: t || e.data.disabled
            });
        }
    }
});