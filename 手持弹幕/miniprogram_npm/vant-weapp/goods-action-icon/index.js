var i = require("../common/component"), n = require("../mixins/link"), e = require("../mixins/button"), t = require("../mixins/open-type");

(0, i.VantComponent)({
    classes: [ "icon-class", "text-class" ],
    mixins: [ n.link, e.button, t.openType ],
    props: {
        text: String,
        info: String,
        icon: String,
        disabled: Boolean,
        loading: Boolean
    },
    methods: {
        onClick: function(i) {
            this.$emit("click", i.detail), this.jumpLink();
        }
    }
});