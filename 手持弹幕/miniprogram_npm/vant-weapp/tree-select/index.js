var t = require("../common/component");

(0, t.VantComponent)({
    classes: [ "main-item-class", "content-item-class", "main-active-class", "content-active-class", "main-disabled-class", "content-disabled-class" ],
    props: {
        items: Array,
        mainActiveIndex: {
            type: Number,
            value: 0
        },
        activeId: {
            type: [ Number, String, Array ]
        },
        maxHeight: {
            type: Number,
            value: 300
        }
    },
    data: {
        subItems: [],
        mainHeight: 0,
        itemHeight: 0
    },
    watch: {
        items: function() {
            var t = this;
            this.updateSubItems().then(function() {
                t.updateMainHeight();
            });
        },
        maxHeight: function() {
            this.updateItemHeight(this.data.subItems), this.updateMainHeight();
        },
        mainActiveIndex: "updateSubItems"
    },
    methods: {
        onSelectItem: function(t) {
            var e = t.currentTarget.dataset.item;
            e.disabled || this.$emit("click-item", e);
        },
        onClickNav: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.items[e].disabled || this.$emit("click-nav", {
                index: e
            });
        },
        updateSubItems: function() {
            var t = this.data, e = (t.items[t.mainActiveIndex] || {}).children, i = void 0 === e ? [] : e;
            return this.updateItemHeight(i), this.set({
                subItems: i
            });
        },
        updateMainHeight: function() {
            var t = this.data, e = t.items, i = void 0 === e ? [] : e, a = t.subItems, s = void 0 === a ? [] : a, n = Math.max(44 * i.length, 44 * s.length);
            this.set({
                mainHeight: Math.min(n, this.data.maxHeight)
            });
        },
        updateItemHeight: function(t) {
            var e = Math.min(44 * t.length, this.data.maxHeight);
            return this.set({
                itemHeight: e
            });
        }
    }
});