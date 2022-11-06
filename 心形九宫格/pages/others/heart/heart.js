require("../@babel/runtime/helpers/Objectentries");
var t = require("../../../utils/runtime/interopRequireDefault")(require("../../../utils/runtime/slicedToArray"));

require("../../../utils/runtime/Objectentries");

var i = wx.getSystemInfoSync(), e = require("../../../utils/runtime/313.js"), a = require("../../../utils/runtime/E6B.js"), n = getApp();

Page({
    data: {
        left: 0,
        top: 0,
        parts: [],
        pddingTop: 25,
        bgColor: "#ffffff",
        showSaveTips: !1
    },
    bolTransparent: !1,
    needTips: !0,
    bolOneTouch: !1,
    bolTwoTouch: !1,
    rate: 2,
    rateGrid: 3,
    onLoad: function(t) {
        this._initParts("heart"), this._initGridParts();
    },
    clearAll(){
        let temp = this.data.parts
        temp.forEach(item => {
            item.url = ''
        });
        this.setData({parts:temp})
    },
    onReady: function() {
        var t = this;
        t.clearAll()
        this.ctx = wx.createCanvasContext("mainCanvas"), this.ctxGrid = wx.createCanvasContext("gridCanvas"), 
        wx.getStorage({
            key: "needTips",
            success: function(i) {
                t.needTips = i.data;
            }
        }), wx.showModal({
            title: "提示",
            content: "选择1-9张图片！最多添加45张图片",
            cancelText: "知道了",
            confirmText: "选择图片",
            success: function(i) {
                i.confirm ? t._chooseImages() : i.cancel && '';
            }
        });
    },
    _initParts: function(t) {
        var e = a.getModel(t), r = e.width, s = e.height, h = e.width * this.rate, o = e.height * this.rate, g = e.width * this.rateGrid, d = e.height * this.rateGrid, u = e.paths;
        this.marginLeft = (i.screenWidth - r) / 2;
        var c = n.globalData.showSaveTips;
        this.setData({
            showSaveTips: c,
            modalKey: t,
            modalActived: !0,
            canvasWidth: h,
            canvasHeight: o,
            panelWidth: r,
            panelHeight: s,
            parts: u,
            gridCanvasWidth: g,
            gridCanvasHeight: d
        });
    },
    _initGridParts: function() {
        this.data.parts;
        var t = [];
        t.push([ -1, -1, -1, -1, -1, 0, -1, 4, 5 ]), t.push([ -1, -1, -1, 1, -1, 2, 6, 7, 8 ]), 
        t.push([ -1, -1, -1, 3, -1, -1, 9, 10, -1 ]), t.push([ 11, 12, 13, 20, 21, 22, -1, 29, 30 ]), 
        t.push([ 14, 15, 16, 23, 24, 25, 31, 32, 33 ]), t.push([ 17, 18, 19, 26, 27, 28, 34, 35, -1 ]), 
        t.push([ -1, -1, 0, -1, -1, -1, -1, -1, -1 ]), t.push([ 37, 38, 39, 41, 42, 43, -1, 44, -1 ]), 
        t.push([ 40, -1, -1, -1, -1, -1, -1, -1, -1 ]), t.reverse(), this.gridParts = t;
    },
    touchstart: function(t) {
        this.index = t.currentTarget.dataset.index, 1 == t.touches.length ? (this.bolOneTouch = !0, 
        this.bolTwoTouch = !1, this._oneTouchstart(t)) : 2 == t.touches.length && (this.bolOneTouch = !1, 
        this.bolTwoTouch = !0);
    },
    _oneTouchstart: function(t) {
        var i = t.touches[0], e = t.currentTarget.dataset.index;
        this.sx = i.pageX - this.data.parts[e].imgLeft, this.sy = i.pageY - this.data.parts[e].imgTop;
    },
    touchmove: function(t) {
        1 == t.touches.length ? this._oneTouchmove(t) : t.touches.length;
    },
    _oneTouchmove: function(i) {
        if (!this.bolTwoTouch) {
            var a = i.touches[0], n = i.currentTarget.dataset.index;
            if (this.data.parts[n]) {
                for (var r = a.pageX - this.sx, s = a.pageY - this.sy, h = Math.round(10 * r) / 10, o = Math.round(10 * s) / 10, g = this.data.parts, d = g[this.index], u = (d.width, 
                d.height, d.imgWidth, d.imgHeight, {
                    x: a.pageX - this.marginLeft,
                    y: a.pageY - this.data.pddingTop
                }), c = 0; c < g.length; c++) {
                    var f = e.pointInPoly(u, g[c].path);
                    g[c].collide = !(c === n || !f);
                }
                g[this.index].imgLeft = h, g[this.index].imgTop = o;
                for (var l = {}, p = 0, m = Object.entries(g[n]); p < m.length; p++) {
                    var v = (0, t.default)(m[p], 2), T = v[0], w = v[1];
                    l[T] = w;
                }
                l.parts = g, this.setData(l);
            }
        }
    },
    touchend: function(t) {
        if (this.bolOneTouch) {
            for (var i = t.currentTarget.dataset.index, a = t.changedTouches[0], n = {
                x: a.pageX - this.marginLeft,
                y: a.pageY - this.data.pddingTop
            }, r = !1, s = this.data.parts, h = 0; h < s.length; h++) {
                s[h].collide = !1;
                var o = e.pointInPoly(n, s[h].path);
                if (h !== i && o) {
                    r = !0;
                    var g = s[h].url, d = s[h].originWidth, u = s[h].originHeight;
                    s[h].url = s[i].url, s[i].url = g, s[h].originWidth = s[i].originWidth, s[i].originWidth = d, 
                    s[h].originHeight = s[i].originHeight, s[i].originHeight = u, this._resetImage(s[i], i), 
                    this._resetImage(s[h], h);
                }
            }
            if (0 == r) {
                var c = s[i], f = c.width, l = c.height, p = c.imgLeft, m = c.imgTop, v = c.imgWidth, T = c.imgHeight, w = this._outsideBound(f, l, p, m, v, T);
                s[i].imgLeft = w.imgLeft, s[i].imgTop = w.imgTop;
            }
            this.setData({
                parts: s
            });
        }
    },
    _resetImage: function(t, i) {
        var e, a, n, r, s = t.width, h = t.height, o = t.originWidth / t.originHeight;
        o < s / h ? (e = 0, n = s, r = s / o, a = 0 - Math.abs((h - r) / 2)) : (a = 0, n = h * o, 
        r = h, e = 0 - Math.abs((s - n) / 2)), e = Math.round(e), a = Math.round(a), n = Math.round(n), 
        r = Math.round(r), t.imgLeft = e, t.imgTop = a, t.imgWidth = n, t.imgHeight = r;
    },
    _outsideBound: function(t, i, e, a, n, r) {
        var s = e >= 0 ? 0 : n + e - 0 <= t ? 0 + t - n : e, h = a >= 0 ? 0 : r + a - 0 <= i ? 0 + i - r : a;
        return {
            imgLeft: Math.round(s),
            imgTop: Math.round(h)
        };
    },
    _chooseImages: function() {
        var t = this;
        this.data.parts.find(function(t) {
            return !t.url;
        }) ? wx.chooseImage({
            count: 9,
            success: function(i) {
                for (var e = [], a = i.tempFilePaths, n = 0; n < a.length; n++) wx.getImageInfo({
                    src: a[n],
                    success: function(i) {
                        e.push({
                            imgUrl: i.path,
                            width: i.width,
                            height: i.height
                        }), a.length == e.length && t._initImages(e);
                    }
                });
            }
        }) : wx.showToast({
            icon: "none",
            title: "数量已到上限！"
        });
    },
    _initImages: function(t) {
        for (var i = this.data.parts, e = 0; e < t.length; e++) {
            var a = t[e], n = i.find(function(t) {
                return !t.url;
            });
            if (!n) break;
            n.url = a.imgUrl;
            var r = a.width / a.height, s = n.width, h = n.height, o = void 0, g = void 0, d = void 0, u = void 0;
            r < s / h ? (o = 0, d = s, u = s / r, g = 0 - Math.abs((h - u) / 2)) : (g = 0, d = h * r, 
            u = h, o = 0 - Math.abs((s - d) / 2)), o = Math.round(o), g = Math.round(g), d = Math.round(d), 
            u = Math.round(u), n.imgLeft = o, n.imgTop = g, n.imgWidth = d, n.imgHeight = u, 
            n.baseWidth = d, n.baseHeight = u, n.originWidth = a.width, n.originHeight = a.height;
        }
        this.setData({
            parts: i
        });
    },
    _getPoint: function(t) {
        return {
            x: Math.round(t.x * this.rate),
            y: Math.round(t.y * this.rate)
        };
    },
    _clipImages: function() {
        var t = this;
        0 == this.bolTransparent && (this.ctx.fillStyle = "#ffffff", this.ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight));
        for (var i = 0; i < this.data.parts.length; i++) {
            var e = this.data.parts[i];
            if (e.url) {
                var a = void 0, n = void 0;
                e.originWidth > e.originHeight ? n = a = e.originHeight : a = n = e.originWidth;
                var r = -e.imgLeft * (e.originWidth / e.imgWidth), s = -e.imgTop * (e.originWidth / e.imgWidth), h = e.left, o = e.top, g = e.width, d = e.height, u = this.rate;
                this.ctx.drawImage(e.url, r, s, n, a, h * u, o * u, g * u, d * u);
            }
        }
        return new Promise(function(i, e) {
            t.ctx.draw(!1, function() {
                i(1);
            });
        });
    },
    _canvasToImage: function() {
        return new Promise(function(t, i) {
            wx.canvasToTempFilePath({
                canvasId: "mainCanvas",
                success: function(i) {
                    t(i.tempFilePath);
                },
                fail: function(t) {
                    i(t);
                }
            });
        });
    },
    tapExport: function(t) {
        this.data.parts.filter(function(t) {
            return !t.url;
        }).length > 0 ? wx.showModal({
            title: "提示",
            content: "还有空位置，你可以继续添加图片，或自动填满！",
            showCancel: !1,
            confirmText: "知道了"
        }) : this._tapExport();
    },
    /* 先生成一个图 在检测 */
    beforeExportNine(){
        let t = this;
        const _this =this
        this._clipImages().then(function(i) {
            t._canvasToImage().then(function(t) {
                var i = t;
                getApp().util.checkFile(i).then(checkRes => {
                    if (checkRes) {
                        _this.saveGrid()
                    } else {
                        getApp().util.toast('内容违规，请更换图片后保存~')
                    }
                }).catch(err => {
                    getApp().util.toast(err)
                })
            });
        })
    },
    _tapExport: function() {
        var t = this;
        wx.showLoading({
            title: "请稍候"
        }), this._clipImages().then(function(i) {
            t._canvasToImage().then(function(t) {
                var i = t;
                e.saveToLocal(i);
            });
        });
    },
    tapCreate: function(t) {
        this._chooseImages();
    },
    tapAddPics: function(t) {
        this._chooseImages();
    },
    changeModal: function(t) {
        var i = t.currentTarget.dataset.id;
        i != this.data.modalKey && this._initParts(i);
    },
    _getScale: function(t, i) {
        return e.getDistance(i[0], i[1]) / e.getDistance(t[0], t[1]);
    },
    fillParts: function(t) {
        var i = this.data.parts, e = i.filter(function(t) {
            return !t.url;
        });
        if (0 != e.length) {
            var a = i.filter(function(t) {
                return !!t.url;
            }), n = a.length;
            if (n <= 0) wx.showToast({
                icon: "none",
                title: "请先加图！"
            }); else {
                for (var r = 0; r < e.length; r++) {
                    var s = r % n;
                    e[r].url = a[s].url, e[r].imgLeft = a[s].imgLeft, e[r].imgTop = a[s].imgTop, e[r].imgWidth = a[s].imgWidth, 
                    e[r].imgHeight = a[s].imgHeight, e[r].baseWidth = a[s].baseWidth, e[r].baseHeight = a[s].baseHeight, 
                    e[r].originWidth = a[s].originWidth, e[r].originHeight = a[s].originHeight;
                }
                this.setData({
                    parts: i
                });
            }
        } else wx.showToast({
            icon: "none",
            title: "已填满"
        });
    },
    saveGrid: function(t) {
        var i = this;
        this.data.parts.filter(function(t) {
            return !t.url;
        }).length > 0 ? wx.showModal({
            title: "提示",
            content: "还有空位置，你可以继续添加图片，或自动填满！",
            showCancel: !1,
            confirmText: "知道了"
        }) : this.needTips ? wx.showModal({
            title: "提示",
            content: "九宫格拼图，需要保存9张图片，请耐心等待。整个过程不消耗上网流量，放心使用！",
            showCancel: !1,
            confirmText: "我知道了",
            success: function(t) {
                wx.setStorage({
                    key: "needTips",
                    data: !1
                }), i._saveGrid();
            }
        }) : this._saveGrid();
    },
    _saveGrid: function() {
        this._doSaveGrid();
    },
    _doSaveGrid: function() {
        wx.showLoading({
            title: "正在保存图片"
        }), this._saveGridImages(0);
    },
    _saveGridImages: function(t) {
        var i = this;
        this._exportGridImg(t).then(function(e) {
            i._gridCanvasToImage().then(function(e) {
                var a = e;
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: function(e) {
                        t++, wx.showToast({
                            title: "完成第" + t + "图片"
                        }), t < i.gridParts.length ? i._saveGridImages(t) : (wx.hideLoading(), wx.showModal({
                            title: "提示",
                            content: "全部图片都保存到相册了。",
                            showCancel: !1,
                            confirmText: "知道了"
                        }), wx.navigateTo({
                            url: "/pages/others/tips/tips"
                        }));
                    }
                });
            });
        });
    },
    _exportGridImg: function(t) {
        var i = this;
        0 == this.bolTransparent && (this.ctxGrid.fillStyle = "#ffffff", this.ctxGrid.fillRect(0, 0, this.data.gridCanvasWidth, this.data.gridCanvasHeight));
        for (var e = this.gridParts[t], a = 0; a < e.length; a++) {
            var n = e[a];
            if (!(n < 0)) {
                var r = this.data.parts[n];
                if (r.url) {
                    var s = void 0, h = void 0;
                    r.originWidth > r.originHeight ? h = s = r.originHeight : s = h = r.originWidth;
                    var o = -r.imgLeft * (r.originWidth / r.imgWidth), g = -r.imgTop * (r.originWidth / r.imgWidth), d = a % 3 * 300, u = 300 * parseInt(a / 3);
                    this.ctxGrid.drawImage(r.url, o, g, h, s, d, u, 300, 300);
                }
            }
        }
        return new Promise(function(t, e) {
            i.ctxGrid.draw(!1, function() {
                t(1);
            });
        });
    },
    _gridCanvasToImage: function() {
        return new Promise(function(t, i) {
            wx.canvasToTempFilePath({
                canvasId: "gridCanvas",
                success: function(i) {
                    t(i.tempFilePath);
                },
                fail: function(t) {
                    i(t);
                }
            });
        });
    },
    radioChange: function(t) {
        "white" == t.detail.value ? (this.bolTransparent = !1, this.setData({
            bgColor: "#ffffff"
        })) : (this.bolTransparent = !0, this.setData({
            bgColor: "transparent"
        }));
    }
});