var e = require("../../../@babel/runtime/helpers/defineProperty"), t = require("../../../@babel/runtime/helpers/slicedToArray"), a = require("../common/component"), n = require("../common/utils"), u = require("../picker/shared"), r = new Date().getFullYear();

function i(e, t, a) {
    return Math.min(Math.max(e, t), a);
}

function o(e) {
    return "00".concat(e).slice(-2);
}

function m(e) {
    if (e) {
        for (;isNaN(parseInt(e, 10)); ) e = e.slice(1);
        return parseInt(e, 10);
    }
}

function c(e, t) {
    return 32 - new Date(e, t - 1, 32).getDate();
}

var s = function(e, t) {
    return t;
};

(0, a.VantComponent)({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: Object.assign({}, u.pickerProps, {
        formatter: {
            type: Function,
            value: s
        },
        value: null,
        type: {
            type: String,
            value: "datetime"
        },
        showToolbar: {
            type: Boolean,
            value: !0
        },
        minDate: {
            type: Number,
            value: new Date(r - 10, 0, 1).getTime()
        },
        maxDate: {
            type: Number,
            value: new Date(r + 10, 11, 31).getTime()
        },
        minHour: {
            type: Number,
            value: 0
        },
        maxHour: {
            type: Number,
            value: 23
        },
        minMinute: {
            type: Number,
            value: 0
        },
        maxMinute: {
            type: Number,
            value: 59
        }
    }),
    data: {
        innerValue: Date.now(),
        columns: []
    },
    watch: {
        value: "updateValue",
        type: "updateValue",
        minDate: "updateValue",
        maxDate: "updateValue",
        minHour: "updateValue",
        maxHour: "updateValue",
        minMinute: "updateValue",
        maxMinute: "updateValue"
    },
    methods: {
        updateValue: function() {
            var e = this, t = this.data, a = this.correctValue(this.data.value);
            a === t.innerValue ? this.updateColumns() : this.updateColumnValue(a).then(function() {
                e.$emit("input", a);
            });
        },
        getPicker: function() {
            if (null == this.picker) {
                this.picker = this.selectComponent(".van-datetime-picker");
                var e = this.picker, t = e.setColumnValues;
                e.setColumnValues = function() {
                    for (var a = arguments.length, n = new Array(a), u = 0; u < a; u++) n[u] = arguments[u];
                    return t.apply(e, [].concat(n, [ !1 ]));
                };
            }
            return this.picker;
        },
        updateColumns: function() {
            var e = this.data.formatter, t = void 0 === e ? s : e, a = this.getRanges().map(function(e) {
                var a = e.type, n = e.range;
                return {
                    values: function(e, t) {
                        for (var a = -1, n = Array(e < 0 ? 0 : e); ++a < e; ) n[a] = t(a);
                        return n;
                    }(n[1] - n[0] + 1, function(e) {
                        var u = n[0] + e;
                        return u = "year" === a ? "".concat(u) : o(u), t(a, u);
                    })
                };
            });
            return this.set({
                columns: a
            });
        },
        getRanges: function() {
            var e = this.data;
            if ("time" === e.type) return [ {
                type: "hour",
                range: [ e.minHour, e.maxHour ]
            }, {
                type: "minute",
                range: [ e.minMinute, e.maxMinute ]
            } ];
            var t = this.getBoundary("max", e.innerValue), a = t.maxYear, n = t.maxDate, u = t.maxMonth, r = t.maxHour, i = t.maxMinute, o = this.getBoundary("min", e.innerValue), m = o.minYear, c = o.minDate, s = [ {
                type: "year",
                range: [ m, a ]
            }, {
                type: "month",
                range: [ o.minMonth, u ]
            }, {
                type: "day",
                range: [ c, n ]
            }, {
                type: "hour",
                range: [ o.minHour, r ]
            }, {
                type: "minute",
                range: [ o.minMinute, i ]
            } ];
            return "date" === e.type && s.splice(3, 2), "year-month" === e.type && s.splice(2, 3), 
            s;
        },
        correctValue: function(e) {
            var a, u = this.data, r = "time" !== u.type;
            if (r && (a = e, !(0, n.isDef)(a) || isNaN(new Date(a).getTime()))) e = u.minDate; else if (!r && !e) {
                var m = u.minHour;
                e = "".concat(o(m), ":00");
            }
            if (!r) {
                var c = e.split(":"), s = t(c, 2), l = s[0], p = s[1];
                return l = o(i(l, u.minHour, u.maxHour)), p = o(i(p, u.minMinute, u.maxMinute)), 
                "".concat(l, ":").concat(p);
            }
            return e = Math.max(e, u.minDate), e = Math.min(e, u.maxDate);
        },
        getBoundary: function(t, a) {
            var n, u = new Date(a), r = new Date(this.data["".concat(t, "Date")]), i = r.getFullYear(), o = 1, m = 1, s = 0, l = 0;
            return "max" === t && (o = 12, m = c(u.getFullYear(), u.getMonth() + 1), s = 23, 
            l = 59), u.getFullYear() === i && (o = r.getMonth() + 1, u.getMonth() + 1 === o && (m = r.getDate(), 
            u.getDate() === m && (s = r.getHours(), u.getHours() === s && (l = r.getMinutes())))), 
            e(n = {}, "".concat(t, "Year"), i), e(n, "".concat(t, "Month"), o), e(n, "".concat(t, "Date"), m), 
            e(n, "".concat(t, "Hour"), s), e(n, "".concat(t, "Minute"), l), n;
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.innerValue);
        },
        onChange: function() {
            var e, t = this, a = this.data, n = this.getPicker();
            if ("time" === a.type) {
                var u = n.getIndexes();
                e = "".concat(u[0] + a.minHour, ":").concat(u[1] + a.minMinute);
            } else {
                var r = n.getValues(), i = m(r[0]), o = m(r[1]), s = c(i, o), l = m(r[2]);
                "year-month" === a.type && (l = 1), l = l > s ? s : l;
                var p = 0, h = 0;
                "datetime" === a.type && (p = m(r[3]), h = m(r[4])), e = new Date(i, o - 1, l, p, h);
            }
            e = this.correctValue(e), this.updateColumnValue(e).then(function() {
                t.$emit("input", e), t.$emit("change", n);
            });
        },
        updateColumnValue: function(e) {
            var t = this, a = [], n = this.data, u = n.type, r = n.formatter, i = void 0 === r ? s : r, m = this.getPicker();
            if ("time" === u) {
                var c = e.split(":");
                a = [ i("hour", c[0]), i("minute", c[1]) ];
            } else {
                var l = new Date(e);
                a = [ i("year", "".concat(l.getFullYear())), i("month", o(l.getMonth() + 1)) ], 
                "date" === u && a.push(i("day", o(l.getDate()))), "datetime" === u && a.push(i("day", o(l.getDate())), i("hour", o(l.getHours())), i("minute", o(l.getMinutes())));
            }
            return this.set({
                innerValue: e
            }).then(function() {
                return t.updateColumns();
            }).then(function() {
                return m.setValues(a);
            });
        }
    },
    created: function() {
        var e = this, t = this.correctValue(this.data.value);
        this.updateColumnValue(t).then(function() {
            e.$emit("input", t);
        });
    }
});