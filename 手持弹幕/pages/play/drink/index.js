var t = require("../../../utils/83BAAC2678504FCFE5DCC42189860344.js"), e = require("../../../utils/FC96ED8778504FCF9AF0858045960344.js")(require("../../../utils/B9F4DB0778504FCFDF92B30008580344.js")), i = require("../../../utils/2E3B3D2778504FCF485D552066D70344.js"), s = t(require("../../../utils/AC149C9778504FCFCA72F490D8870344.js")), n = (t(require("../../../utils/E225149378504FCF84437C94AD880344.js")), 
0), $ = 0, a = [ "#00EE00", "#00E5EE", "#EE7942", "#EE00EE", "#EEEE00" ], c = .1 * Math.PI, o = 15 / 360 * 2 * Math.PI, r = 360 / 28 / 360 * 2 * Math.PI, h = getApp();

Page({
    $$context: null,
    $$users: [],
    $$radius: {},
    $$timer: null,
    $$startSelect: !1,
    $$targetIdx: -1,
    $$selectTimer: null,
    $$selectInterval: null,
    $$selectTimes: -1,
    $$selectBgElastic: 0,
    $$winBgElastic: 0,
    $$winBgDir: 1,
    $$winInfo: null,
    $$random: 0,
    $$countdownSec: 3,
    $$countdownTxt: "",
    $$countdownTimer: null,
    $$selectBtnRect: null,
    $$selectImageName: "btn",
    data: {
        isIpx: h.globalData.isIpx,
        windowWidth: 0,
        windowHeight: 0,
        entering: !1
    },
    onLoad: function(t) {
        if (wx && wx.createCanvasContext) {
            var e = (0, i.$getSysInfo)();
            n = e.windowWidth, $ = e.windowHeight, this.setData({
                windowWidth: n,
                windowHeight: $
            });
        } else h.versionLow();
    },
    onShow: function() {
        var t = this;
        wx && wx.createCanvasContext ? (this.$$context = wx.createCanvasContext("fingerCanvas"), 
        h.globalData.settings.autoStart ? (this.drawText("请放置手指"), this.$$context.draw()) : this.drawSelectBtn(), 
        this.setData({
            entering: !0
        }), setTimeout(function() {
            t.setData({
                entering: !1
            });
        }, 1e3)) : h().versionLow();
    },
    startAnimation: function() {
        this.$$timer || (this.drawUsers(), this.$$timer = setInterval(this.drawUsers.bind(this), 50));
    },
    onHide: function() {
        this.$$timer && (clearInterval(this.$$timer), this.$$timer = null), this.clearCountDown(), 
        this.$$users.length = 0, this.$$context && (this.$$context.clearRect(0, 0, n, $), 
        this.$$context.draw(), this.$$context = null), s.default.clearContext();
    },
    isTouchSelect: function(t) {
        var e = t.x, i = t.y;
        if (!h.globalData.settings.autoStart && this.$$selectBtnRect) {
            var s = this.$$selectBtnRect, n = s.xStart, $ = s.xEnd, a = s.yStart, c = s.yEnd;
            if (e >= n && e <= $ && i >= a && i <= c) return !0;
        }
        return !1;
    },
    onTouchStart: function(t) {
        var e = this, s = t.touches;
        if (this.isTouchSelect(s[s.length - 1])) return this.onStartSelect(), this.$$selectImageName = "btn_press", 
        this.drawSelectBtn(), void setTimeout(function() {
            e.$$selectImageName = "btn", e.drawSelectBtn();
        }, 300);
        console.log("onTouchStart");
        var n = [].concat(s.filter(function(t) {
            return !e.isTouchSelect(t);
        }));
        this.$$users.length !== n.length && (this.$$targetIdx = -1), this.$$users = n, this.startAnimation(), 
        (0, i.$vibrate)(), getApp().playMusic("press"), h.globalData.settings.autoStart ? (this.clearCountDown(), 
        (0, i.$isIOS)() && this.$$users.length >= 5 ? (this.$$countdownTxt = "", this.$$countdownSec = 3, 
        this.onStartSelect()) : this.$$users.length > 1 && (this.$$countdownSec = 3, this.startCountDown(0))) : (0, 
        i.$isIOS)() && this.$$users.length >= 5 && this.onStartSelect();
    },
    startCountDown: function(t) {
        var e = this;
        this.$$countdownTimer = setTimeout(function() {
            e.$$countdownTxt = "".concat(e.$$countdownSec--, "秒后开始"), e.$$countdownSec < 0 ? (e.$$countdownTxt = "", 
            e.$$countdownSec = 3, e.clearCountDown(), e.onStartSelect()) : e.startCountDown(1e3);
        }, t);
    },
    clearCountDown: function() {
        this.$$countdownTimer && (clearTimeout(this.$$countdownTimer), this.$$countdownTimer = null);
    },
    onTouchEnd: function(t) {
        var e = t.changedTouches[0], i = !1;
        if (e) {
            if (this.isTouchSelect(e)) return;
            var s = this.$$users.findIndex(function(t) {
                return t.identifier === e.identifier;
            });
            -1 !== s && (delete this.$$radius[this.$$users[s].identifier], this.$$users.splice(s, 1), 
            getApp().playMusic("exit"), i = !0);
        }
        if (i) {
            var n = h.globalData.settings, $ = (n.autoPunishmentChecked, n.autoStart);
            this.clearSelect(), $ && (this.$$users.length ? (this.clearCountDown(), this.$$countdownSec = 3, 
            this.$$countdownTxt = "", this.startCountDown(0)) : (this.clearCountDown(), this.$$countdownTxt = "请放置手指"));
        }
    },
    onTouchMove: function(t) {
        var e = this, i = t.touches;
        this.$$users = [].concat(i.filter(function(t) {
            return !e.isTouchSelect(t);
        }));
    },
    drawUsers: function() {
        this.$$context && (this.$$context.clearRect(0, 0, n, $), this.$$users.forEach(this.drawUser.bind(this)), 
        this.drawWinInfo(), h.globalData.settings.autoStart ? this.$$countdownTxt && this.drawText(this.$$countdownTxt) : this.drawSelectBtn(!1), 
        this.$$context.draw());
    },
    drawWinInfo: function() {
        this.$$winInfo && (this.$$winBgDir > 0 ? (this.$$winBgElastic += 8, this.$$winBgElastic + 200 >= 270 && (this.$$winBgDir = -1)) : (this.$$winBgElastic -= 8, 
        this.$$winBgElastic <= 0 && (this.$$winBgDir = 1)), this.drawSelectImg(this.$$winInfo, 200, this.$$winBgElastic, "win"));
    },
    drawText: function(t) {
        if (this.$$context) {
            this.$$context.beginPath();
            var e = n / 2, i = $ / 2;
            this.$$context.fillStyle = "white", this.$$context.font = "28px Arial";
            var s = this.$$context.measureText(t);
            this.$$context.translate(e - 12, i - s.width / 2), this.$$context.rotate(90 * Math.PI / 180), 
            this.$$context.fillText(t, 0, 0), this.$$context.closePath();
        }
    },
    drawSelectBtn: function() {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        if (this.$$context) {
            this.$$context.beginPath();
            var e = (n - 63.6) / 2, i = ($ - 200.4) / 2;
            this.$$selectBtnRect = {
                xStart: e,
                xEnd: e + 63.6,
                yStart: i,
                yEnd: i + 200.4
            }, this.$$context.drawImage("/images/drink/".concat(this.$$selectImageName, ".png"), e, i, 63.6, 200.4), 
            this.$$context.closePath(), t && this.$$context.draw();
        }
    },
    drawUser: function(t, e) {
        var i = t.x, s = t.y, n = t.identifier, $ = this.$$radius[n];
        $ ? ($.dir > 0 ? ($.firstElastic += .08, $.secondElastic += .08, $.thirdElastic += .08, 
        this.$$selectBgElastic += 1, $.radius += 1) : $.dir < 0 && ($.firstElastic -= .08, 
        $.secondElastic -= .08, $.thirdElastic -= .08, this.$$selectBgElastic -= 1, $.radius -= 1), 
        $.firstRotate += .05, $.secondRotate -= .05, $.thirdRotate += .05, $.radius > 60 ? ($.dir = -1, 
        $.radius = 60) : $.radius < 50 && ($.dir = 1, $.radius = 50)) : this.$$radius[n] = $ = {
            radius: 50,
            dir: 1,
            firstElastic: 0,
            secondElastic: 0,
            thirdElastic: 0,
            firstRotate: 0,
            secondRotate: 0,
            thirdRotate: 0
        };
        var h = a[e % a.length], l = !this.$$startSelect && -1 !== this.$$targetIdx;
        l && this.$$targetIdx !== e && (h = "gray"), this.$$context.beginPath(), this.$$context.arc(i, s, $.radius, 0, 2 * Math.PI), 
        this.$$context.fillStyle = h, this.$$context.fill(), this.$$context.closePath();
        for (var u = 0; u < 20; u++) {
            var d = i + Math.cos(c * u + $.firstRotate) * ($.radius + 10 * (1 + $.firstElastic)), w = s + Math.sin(c * u + $.firstRotate) * ($.radius + 10 * (1 + $.firstElastic));
            this.$$context.moveTo(d, w), this.$$context.beginPath(), this.$$context.arc(d, w, 6, 0, 2 * Math.PI), 
            this.$$context.fillStyle = h, this.$$context.fill(), this.$$context.closePath();
        }
        for (var x = 0; x < 24; x++) {
            var g = i + Math.cos(o * x + $.secondRotate) * ($.radius + 20 * (1 + $.secondElastic)), f = s + Math.sin(o * x + $.secondRotate) * ($.radius + 20 * (1 + $.secondElastic));
            this.$$context.moveTo(g, f), this.$$context.beginPath(), this.$$context.arc(g, f, 4, 0, 2 * Math.PI), 
            this.$$context.fillStyle = h, this.$$context.fill(), this.$$context.closePath();
        }
        for (var S = 0; S < 28; S++) {
            var m = i + Math.cos(r * S + $.thirdRotate) * ($.radius + 30 * (1 + $.thirdElastic)), E = s + Math.sin(r * S + $.thirdRotate) * ($.radius + 30 * (1 + $.thirdElastic));
            this.$$context.moveTo(m, E), this.$$context.beginPath(), this.$$context.arc(m, E, 3, 0, 2 * Math.PI), 
            this.$$context.fillStyle = h, this.$$context.fill(), this.$$context.closePath();
        }
        this.$$startSelect && this.$$targetIdx === e ? this.drawSelectImg({
            x: i,
            y: s,
            radius: $.radius
        }, 110, this.$$selectBgElastic, "select") : l && this.$$targetIdx === e && !this.$$winInfo && (this.$$winInfo = {
            x: i,
            y: s,
            radius: 50
        });
    },
    drawSelectImg: function(t, e, i, s) {
        var n = t.radius, $ = t.x, a = t.y;
        this.$$context.beginPath();
        var c = n + e + i;
        this.$$context.drawImage("/images/drink/".concat(s, ".png"), $ - c, a - c, 2 * c, 2 * c), 
        this.$$context.closePath();
    },
    onStartSelect: function() {
        var t = this.$$users.length;
        0 === t ? wx.showToast({
            title: "请先把手指放置到屏幕上",
            icon: "none"
        }) : t > 1 && (this.$$startSelect = !0, this.$$random = (0, e.$generateRandom)(t), 
        this.clearSelect(), this.onSelect());
    },
    clearSelect: function() {
        this.$$selectTimer && (clearTimeout(this.$$selectTimer), this.$$selectTimer = null), 
        this.$$selectInterval = 0, this.$$selectTimes = -1, this.$$targetIdx = -1, this.$$winBgElastic = 0, 
        this.$$selectBgElastic = 0, this.$$winInfo = null;
    },
    onSelect: function() {
        var t = this;
        this.$$selectTimer = setTimeout(function() {
            t.$$selectTimes++, t.$$targetIdx++, t.$$targetIdx >= t.$$users.length && (t.$$targetIdx = 0), 
            t.$$selectTimes <= 16 + t.$$random ? (getApp().playMusic("select"), t.$$selectTimes > 10 + t.$$random ? t.$$selectInterval = 100 + 40 * (6 - (16 - t.$$selectTimes)) : t.$$selectInterval = 100, 
            t.onSelect()) : (getApp().playMusic("win"), (0, i.$vibrate)(), t.$$startSelect = !1, 
            t.$$selectTimes = -1);
        }, this.$$selectInterval);
    },
    onShareAppMessage: function() {},
    onBack: function() {
        wx.navigateBack();
    }
});