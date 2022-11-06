(0, require("../common/component").VantComponent)({
    relation: {
        name: "collapse-item",
        type: "descendant",
        linked: function(e) {
            this.children.push(e);
        },
        unlinked: function(e) {
            this.children = this.children.filter(function(n) {
                return n !== e;
            });
        }
    },
    props: {
        value: {
            type: null,
            observer: "updateExpanded"
        },
        accordion: {
            type: Boolean,
            observer: "updateExpanded"
        },
        border: {
            type: Boolean,
            value: !0
        }
    },
    beforeCreate: function() {
        this.children = [];
    },
    methods: {
        updateExpanded: function() {
            this.children.forEach(function(e) {
                e.updateExpanded();
            });
        },
        switch: function(e, n) {
            var t = this.data, i = t.accordion, o = t.value;
            e = i ? n ? e : "" : n ? (o || []).concat(e) : (o || []).filter(function(n) {
                return n !== e;
            }), this.$emit("change", e), this.$emit("input", e);
        }
    }
});