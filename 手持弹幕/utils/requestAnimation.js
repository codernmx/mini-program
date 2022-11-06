module.exports = {
    requestAnimationFrame: function(e, t) {
        var t;
        void 0 === t && (t = 0);
        var n = new Date().getTime(), i = Math.max(0, 16.7 - (n - t));
        return t = n + i, setTimeout(function() {
            e(n + i, t);
        }, i);
    },
    cancelAnimationFrame: function(e) {
        clearTimeout(e);
    }
};