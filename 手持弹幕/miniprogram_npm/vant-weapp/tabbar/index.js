var e = require("../common/component"), r = require("../mixins/safe-area");

(0, e.VantComponent)({
    mixins: [ (0, r.safeArea)() ],
    relation: {
        name: "tabbar-item",
        type: "descendant",
        linked: function(e) {
            this.children.push(e), e.parent = this, e.updateFromParent();
        },
        unlinked: function(e) {
            this.children = this.children.filter(function(r) {
                return r !== e;
            }), this.updateChildren();
        }
    },
    props: {
        active: {
            type: [ Number, String ],
            observer: "updateChildren"
        },
        activeColor: {
            type: String,
            observer: "updateChildren"
        },
        inactiveColor: {
            type: String,
            observer: "updateChildren"
        },
        fixed: {
            type: Boolean,
            value: !0
        },
        border: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    beforeCreate: function() {
        this.children = [];
    },
    methods: {
        updateChildren: function() {
            var e = this.children;
            return Array.isArray(e) && e.length ? Promise.all(e.map(function(e) {
                return e.updateFromParent();
            })) : Promise.resolve();
        },
        onChange: function(e) {
            var r = this.children.indexOf(e), t = e.data.name || r;
            t !== this.data.active && this.$emit("change", t);
        }
    }
});