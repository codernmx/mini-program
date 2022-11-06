function e(e, a) {
    e.$emit("input", a), e.$emit("change", a);
}

(0, require("../common/component").VantComponent)({
    field: !0,
    relation: {
        name: "checkbox-group",
        type: "ancestor",
        linked: function(e) {
            this.parent = e;
        },
        unlinked: function() {
            this.parent = null;
        }
    },
    classes: [ "icon-class", "label-class" ],
    props: {
        value: Boolean,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: "round"
        }
    },
    methods: {
        emitChange: function(a) {
            this.parent ? this.setParentValue(this.parent, a) : e(this, a);
        },
        toggle: function() {
            var e = this.data, a = e.disabled, n = e.value;
            a || this.emitChange(!n);
        },
        onClickLabel: function() {
            var e = this.data, a = e.labelDisabled, n = e.disabled, t = e.value;
            n || a || this.emitChange(!t);
        },
        setParentValue: function(a, n) {
            var t = a.data.value.slice(), i = this.data.name, l = a.data.max;
            if (n) {
                if (l && t.length >= l) return;
                -1 === t.indexOf(i) && (t.push(i), e(a, t));
            } else {
                var o = t.indexOf(i);
                -1 !== o && (t.splice(o, 1), e(a, t));
            }
        }
    }
});