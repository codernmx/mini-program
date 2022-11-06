(0, require("../common/component").VantComponent)({
    props: {
        info: null,
        icon: String,
        dot: Boolean,
        name: {
            type: [ String, Number ]
        }
    },
    relation: {
        name: "tabbar",
        type: "ancestor"
    },
    data: {
        active: !1
    },
    methods: {
        onClick: function() {
            this.parent && this.parent.onChange(this), this.$emit("click");
        },
        updateFromParent: function() {
            var t = this.parent;
            if (t) {
                var e = t.children.indexOf(this), i = t.data, o = this.data, n = (o.name || e) === i.active, a = {};
                return n !== o.active && (a.active = n), i.activeColor !== o.activeColor && (a.activeColor = i.activeColor), 
                i.inactiveColor !== o.inactiveColor && (a.inactiveColor = i.inactiveColor), Object.keys(a).length > 0 ? this.set(a) : Promise.resolve();
            }
        }
    }
});