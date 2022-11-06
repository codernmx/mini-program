var t = require("../common/component"), n = function() {
    return new Promise(function(t) {
        return setTimeout(t, 20);
    });
};

(0, t.VantComponent)({
    classes: [ "title-class", "content-class" ],
    relation: {
        name: "collapse",
        type: "ancestor",
        linked: function(t) {
            this.parent = t;
        }
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        isLink: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        contentHeight: 0,
        expanded: !1,
        transition: !1
    },
    mounted: function() {
        var t = this;
        this.updateExpanded().then(n).then(function() {
            var n = {
                transition: !0
            };
            t.data.expanded && (n.contentHeight = "auto"), t.set(n);
        });
    },
    methods: {
        updateExpanded: function() {
            if (!this.parent) return Promise.resolve();
            var t = this.parent.data, n = t.value, e = t.accordion, i = this.parent.children, a = void 0 === i ? [] : i, o = this.data.name, s = a.indexOf(this), r = null == o ? s : o, c = e ? n === r : (n || []).some(function(t) {
                return t === r;
            }), d = [];
            return c !== this.data.expanded && d.push(this.updateStyle(c)), d.push(this.set({
                index: s,
                expanded: c
            })), Promise.all(d);
        },
        updateStyle: function(t) {
            var e = this;
            return this.getRect(".van-collapse-item__content").then(function(t) {
                return t.height;
            }).then(function(i) {
                return t ? e.set({
                    contentHeight: i ? "".concat(i, "px") : "auto"
                }) : e.set({
                    contentHeight: "".concat(i, "px")
                }).then(n).then(function() {
                    return e.set({
                        contentHeight: 0
                    });
                });
            });
        },
        onClick: function() {
            if (!this.data.disabled) {
                var t = this.data, n = t.name, e = t.expanded, i = this.parent.children.indexOf(this), a = null == n ? i : n;
                this.parent.switch(a, !e);
            }
        },
        onTransitionEnd: function() {
            this.data.expanded && this.set({
                contentHeight: "auto"
            });
        }
    }
});