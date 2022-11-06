var t = require("../../../@babel/runtime/helpers/slicedToArray"), e = require("../common/component"), i = require("../mixins/touch"), a = require("../common/utils");

(0, e.VantComponent)({
    mixins: [ i.touch ],
    classes: [ "nav-class", "tab-class", "tab-active-class", "line-class" ],
    relation: {
        name: "tab",
        type: "descendant",
        linked: function(t) {
            this.child.push(t), this.updateTabs(this.data.tabs.concat(t.data));
        },
        unlinked: function(t) {
            var e = this.child.indexOf(t), i = this.data.tabs;
            i.splice(e, 1), this.child.splice(e, 1), this.updateTabs(i);
        }
    },
    props: {
        color: String,
        sticky: Boolean,
        animated: Boolean,
        swipeable: Boolean,
        lineWidth: {
            type: Number,
            value: -1
        },
        lineHeight: {
            type: Number,
            value: -1
        },
        active: {
            type: Number,
            value: 0
        },
        type: {
            type: String,
            value: "line"
        },
        border: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        scrollable: !1,
        trackStyle: "",
        wrapStyle: "",
        position: ""
    },
    watch: {
        swipeThreshold: function() {
            this.set({
                scrollable: this.child.length > this.data.swipeThreshold
            });
        },
        color: "setLine",
        lineWidth: "setLine",
        lineHeight: "setLine",
        active: "setActiveTab",
        animated: "setTrack",
        offsetTop: "setWrapStyle"
    },
    beforeCreate: function() {
        this.child = [];
    },
    mounted: function() {
        var t = this;
        this.setLine(!0), this.setTrack(), this.scrollIntoView(), this.getRect(".van-tabs__wrap").then(function(e) {
            t.navHeight = e.height, t.observerContentScroll();
        });
    },
    destroyed: function() {
        this.createIntersectionObserver().disconnect();
    },
    methods: {
        updateTabs: function(t) {
            t = t || this.data.tabs, this.set({
                tabs: t,
                scrollable: t.length > this.data.swipeThreshold
            }), this.setActiveTab();
        },
        trigger: function(t, e) {
            this.$emit(t, {
                index: e,
                title: this.data.tabs[e].title
            });
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.tabs[e].disabled ? this.trigger("disabled", e) : (this.trigger("click", e), 
            this.setActive(e));
        },
        setActive: function(t) {
            t !== this.data.active && (this.trigger("change", t), this.set({
                active: t
            }), this.setActiveTab());
        },
        setLine: function(t) {
            var e = this;
            if ("line" === this.data.type) {
                var i = this.data, a = i.color, n = i.active, s = i.duration, o = i.lineWidth, c = i.lineHeight;
                this.getRect(".van-tab", !0).then(function(i) {
                    var r = i[n], h = -1 !== o ? o : r.width / 2, l = -1 !== c ? "height: ".concat(c, "px;") : "", d = i.slice(0, n).reduce(function(t, e) {
                        return t + e.width;
                    }, 0);
                    d += (r.width - h) / 2;
                    var u = t ? "" : "transition-duration: ".concat(s, "s; -webkit-transition-duration: ").concat(s, "s;");
                    e.set({
                        lineStyle: "\n            ".concat(l, "\n            width: ").concat(h, "px;\n            background-color: ").concat(a, ";\n            -webkit-transform: translateX(").concat(d, "px);\n            transform: translateX(").concat(d, "px);\n            ").concat(u, "\n          ")
                    });
                });
            }
        },
        setTrack: function() {
            var t = this, e = this.data, i = e.animated, a = e.active, n = e.duration;
            if (!i) return "";
            this.getRect(".van-tabs__content").then(function(e) {
                var s = e.width;
                t.set({
                    trackStyle: "\n            width: ".concat(s * t.child.length, "px;\n            left: ").concat(-1 * a * s, "px;\n            transition: left ").concat(n, "s;\n            display: -webkit-box;\n            display: flex;\n          ")
                });
                var o = {
                    width: s,
                    animated: i
                };
                t.child.forEach(function(t) {
                    t.set(o);
                });
            });
        },
        setActiveTab: function() {
            var t = this;
            this.child.forEach(function(e, i) {
                var a = {
                    active: i === t.data.active
                };
                a.active && (a.inited = !0), a.active !== e.data.active && e.set(a);
            }), (0, a.nextTick)(function() {
                t.setLine(), t.setTrack(), t.scrollIntoView();
            });
        },
        scrollIntoView: function() {
            var e = this, i = this.data, a = i.active;
            i.scrollable && Promise.all([ this.getRect(".van-tab", !0), this.getRect(".van-tabs__nav") ]).then(function(i) {
                var n = t(i, 2), s = n[0], o = n[1], c = s[a], r = s.slice(0, a).reduce(function(t, e) {
                    return t + e.width;
                }, 0);
                e.set({
                    scrollLeft: r - (o.width - c.width) / 2
                });
            });
        },
        onTouchStart: function(t) {
            this.data.swipeable && this.touchStart(t);
        },
        onTouchMove: function(t) {
            this.data.swipeable && this.touchMove(t);
        },
        onTouchEnd: function() {
            if (this.data.swipeable) {
                var t = this.data, e = t.active, i = t.tabs, a = this.direction, n = this.deltaX, s = this.offsetX;
                "horizontal" === a && s >= 50 && (n > 0 && 0 !== e ? this.setActive(e - 1) : n < 0 && e !== i.length - 1 && this.setActive(e + 1));
            }
        },
        setWrapStyle: function() {
            var t, e = this.data, i = e.offsetTop;
            switch (e.position) {
              case "top":
                t = "\n            top: ".concat(i, "px;\n            position: fixed;\n          ");
                break;

              case "bottom":
                t = "\n            top: auto;\n            bottom: 0;\n          ";
                break;

              default:
                t = "";
            }
            t !== this.data.wrapStyle && this.set({
                wrapStyle: t
            });
        },
        observerContentScroll: function() {
            var t = this;
            if (this.data.sticky) {
                var e = this.data.offsetTop, i = wx.getSystemInfoSync().windowHeight;
                this.createIntersectionObserver().disconnect(), this.createIntersectionObserver().relativeToViewport({
                    top: -(this.navHeight + e)
                }).observe(".van-tabs", function(i) {
                    var a = i.boundingClientRect.top;
                    if (!(a > e)) {
                        var n = i.intersectionRatio > 0 ? "top" : "bottom";
                        t.$emit("scroll", {
                            scrollTop: a + e,
                            isFixed: "top" === n
                        }), t.setPosition(n);
                    }
                }), this.createIntersectionObserver().relativeToViewport({
                    bottom: -(i - 1 - e)
                }).observe(".van-tabs", function(i) {
                    var a = i.boundingClientRect, n = a.top;
                    if (!(a.bottom < t.navHeight)) {
                        var s = i.intersectionRatio > 0 ? "top" : "";
                        t.$emit("scroll", {
                            scrollTop: n + e,
                            isFixed: "top" === s
                        }), t.setPosition(s);
                    }
                });
            }
        },
        setPosition: function(t) {
            var e = this;
            t !== this.data.position && this.set({
                position: t
            }).then(function() {
                e.setWrapStyle();
            });
        }
    }
});