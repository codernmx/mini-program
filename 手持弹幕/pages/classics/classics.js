function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

require("../../utils/mta_analysis.js");

var e, a, o = getApp(),
    i = 400,
    s = !1,
    l = wx.getSystemInfoSync(),
    n = 1210 / 750 * l.windowWidth,
    r = void 0,
    d = void 0,
    c = [],
    h = ["加个微信吧!", "我喜欢你!", "单身可撩!", "需要让座请叫我"],
    u = -1,
    x = "",
    m = !1,
    f = "",
    v = null;

Page({
    data: {
        token: "",
        placeholderColor: !0,
        adOff: !0,
        adTextStyleOff: !0,
        videoSrc: "",
        animationInput: "",
        animationStyle: "",
        scorllDuration: 5e3,
        animation: {},
        currentSpeed: 0,
        zero: !1,
        speedStyle: [{
            name: "0",
            value: 2e3,
            active: !1
        }, {
            name: "0.5x",
            value: 5e3,
            active: !1
        }, {
            name: "1x",
            value: 4e3,
            active: !0
        }, {
            name: "1.5x",
            value: 3e3,
            active: !1
        }, {
            name: "2x",
            value: 2e3,
            active: !1
        }, {
            name: "2.5x",
            value: 1e3,
            active: !1
        }],
        sizeStyle: [{
            name: "24",
            value: 24,
            active: !0
        }, {
            name: "36",
            value: 36,
            active: !1
        }, {
            name: "48",
            value: 48,
            active: !1
        }, {
            name: "64",
            value: 64,
            active: !1
        }, {
            name: "72",
            value: 72,
            active: !1
        }, {
            name: "auto",
            value: 72,
            active: !1
        }],
        textStyle: [{
            name: "shadow",
            lock: !0,
            num: -1,
            active: !1
        }, {
            name: "flicker",
            lock: !0,
            num: -1,
            active: !1
        }, {
            name: "border",
            lock: !0,
            num: -1,
            active: !1
        }, {
            name: "textShadow",
            lock: !0,
            num: -1,
            active: !1
        }, {
            name: "light",
            lock: !0,
            num: -1,
            active: !1
        }, {
            name: "loop",
            lock: !0,
            num: -1,
            active: !1
        }, {
            name: "3D",
            lock: !1,
            num: 6,
            active: !1
        }, {
            name: "douyin",
            lock: !1,
            num: 6,
            active: !1
        }],
        textBlackShadow: "",
        text3D: "",
        border: "",
        douyin: "",
        fontStyle: [{
            name: "PingFang SC",
            value: "../../images/font0.png",
            active: !0
        }, {
            name: "Epson",
            value: "../../images/font1.png",
            active: !1
        }, {
            name: "DFPShaoNvW5-GB",
            value: "../../images/font2.png",
            active: !1
        }, {
            name: "HappyZcool-2016",
            value: "../../images/font3.png",
            active: !1
        }, {
            name: "PangMenZhengDao",
            value: "../../images/font4.png",
            active: !1
        }],
        fontStyleValue: "PingFang SC",
        buttonFontFamilyNum: 0,
        colorStyle: [{
            name: "white",
            value: "#fff",
            active: !0
        }, {
            name: "black",
            value: "black",
            active: !1
        }, {
            name: "#ff0071",
            value: "#ff0071",
            active: !1
        }, {
            name: "#ff000c",
            value: "#ff000c",
            active: !1
        }, {
            name: "#ff5300",
            value: "#ff5300",
            active: !1
        }, {
            name: "#ffe200",
            value: "#ffe200",
            active: !1
        }, {
            name: "#00ff27",
            value: "#00ff27",
            active: !1
        }, {
            name: "#009fff",
            value: "#009fff",
            active: !1
        }, {
            name: "#00ffc8",
            value: "#00ffc8",
            active: !1
        }, {
            name: "#8500ff",
            value: "#8500ff",
            active: !1
        }],
        backgroundStyle: [{
            name: "black",
            value: "black",
            active: !0
        }, {
            name: "white",
            value: "white",
            active: !0
        }, {
            name: "#ff0071",
            value: "#ff0071",
            active: !1
        }, {
            name: "#ff000c",
            value: "#ff000c",
            active: !1
        }, {
            name: "#ff5300",
            value: "#ff5300",
            active: !1
        }, {
            name: "#ffe200",
            value: "#ffe200",
            active: !1
        }, {
            name: "#00ff27",
            value: "#00ff27",
            active: !1
        }, {
            name: "#009fff",
            value: "#009fff",
            active: !1
        }, {
            name: "#00ffc8",
            value: "#00ffc8",
            active: !1
        }, {
            name: "#8500ff",
            value: "#8500ff",
            active: !1
        }],
        buttonBgNum: 0,
        bgColor: "black",
        textShadow: "inherit",
        textColor: "#fff",
        buttonSpeedNum: 2,
        buttonFontNum: 4,
        speedIndex: 2,
        condition: !0,
        buttonFontAuto: 5,
        temporaryText: "",
        selectIndex: [{
            sureid: !1
        }, {
            sureid: !1
        }, {
            sureid: !1
        }, {
            sureid: !1
        }, {
            sureid: !1
        }, {
            sureid: !1
        }, {
            sureid: !1
        }, {
            sureid: !1
        }],
        effectIndex: "",
        clearTextOff: !0,
        clearTextShow: !1,
        lockOff: !1,
        hideLock: !0,
        staticFontSize: "144",
        hideFontSizeIndex: "",
        accomplish: !1,
        textArr: "",
        loopText: [],
        text: ["输入的文字弹幕会在这里滚动出现"],
        usefulOff: !0,
        usefulText: [],
        modalInputVal: "",
        hiddenmodalput: !0,
        scorllTextStyle: "",
        ScreenBrightness: "",
        modalClear: !1,
        videoArr: [{
            name: "flash_screen",
            lock: !0,
            num: -1,
            active: !1
        }, {
            name: "love",
            lock: !0,
            num: -1,
            active: !1
        }, {
            name: "music",
            lock: !0,
            num: -1,
            active: !1
        }, {
            name: "kaleidoscope",
            lock: !1,
            num: 6,
            active: !1
        }, {
            name: "secondary",
            lock: !1,
            num: 6,
            active: !1
        }, {
            name: "fluorescent",
            lock: !1,
            num: 6,
            active: !1
        }, {
            name: "sexangle",
            lock: !1,
            num: 6,
            active: !1
        }, {
            name: "kaleidoscope2",
            lock: !1,
            num: 6,
            active: !1
        }, {
            name: "star",
            lock: !1,
            num: 6,
            active: !1
        }, {
            name: "man",
            lock: !1,
            num: 6,
            active: !1
        }],
        videoShow: !1,
        buttonVideoBgNum: -1,
        nicktemplate: 0,
        muted: !1,
        modalInput: 0
    },
    onLoad: function (t) {
        wx.createInterstitialAd && ((v = wx.createInterstitialAd({
                adUnitId: "adunit-0d0e5f440534bf71"
            })).onLoad(function () {
                console.log("插屏广告加载成功");
            }), v.onError(function (t) {
                console.log("插屏广告加载失败", t);
            }), v.onClose(function (t) {
                console.log("插屏广告关闭", t);
            })), console.log("query:", t), this.styleRepeat(20, this.data.text.toString()),
            this.setData({
                windowHeight: wx.getSystemInfoSync().windowHeight,
                textArr: [this.data.text],
                clearTextOff: !1
            }), wx.showShareMenu({
                withShareTicket: !0
            }), this.setData({
                nicktemplate: t.template
            }), f = t;
    },
    onShow: function () {
        clearInterval(e);
        var t = this;
        this.setData({
            usefulText: h
        }), 0 != this.data.nicktemplate || x ? 1 == this.data.nicktemplate ? this.douyinModel() : 6 == this.data.nicktemplate ? this.pixelModel() : 2 == this.data.nicktemplate ? x || this.loveModel() : 3 == this.data.nicktemplate ? x || this.musicModel() : 4 == this.data.nicktemplate ? this.airportpickupModel() : 5 == this.data.nicktemplate && this.seatModel() : this.classicsFunc();
        var a = wx.createAnimation({
            timingFunction: "linear"
        });
        this.setData({
            animation: a,
            currentSpeed: this.data.windowHeight / this.data.speedStyle[this.data.speedIndex].value,
            hideLock: !1
        }), this.shareFunc(f), wx.getStorage({
            key: "videoArr",
            success: function (e) {
                if (e.data) {
                    for (var a = e.data, o = 0; o < a.videoArr.length; o++) a.videoArr[o] <= 5 && (t.data.videoArr[o + 3].num = a.videoArr[o],
                        t.data.videoArr[o + 3].lock = !0);
                    t.setData({
                        videoArr: t.data.videoArr
                    });
                }
            }
        }), wx.getStorage({
            key: "text",
            success: function (e) {
                if (e.data) {
                    for (var a = e.data, o = 0; o < a.textStyle.length; o++) a.textStyle[o] <= 5 && (t.data.textStyle[o + 6].num = a.textStyle[o],
                        t.data.textStyle[o + 6].lock = !0);
                    t.setData({
                        textStyle: t.data.textStyle
                    });
                }
            }
        }), wx.getStorage({
            key: "historyUseful",
            success: function (e) {
                t.setData({
                    usefulText: e.data
                }), h = e.data, 0 == e.data.length ? t.setData({
                    usefulOff: !1
                }) : t.setData({
                    usefulOff: !0
                });
            }
        }), this.data.zero || this.scorllText();
    },
    onShareAppMessage: function (t) {
        var e = {
            loopText: this.data.loopText,
            text: this.data.text,
            scorllTextStyle: this.data.scorllTextStyle,
            textShadow: this.data.textShadow,
            buttonFontNum: this.data.buttonFontNum,
            speedIndex: this.data.speedIndex,
            buttonColorNum: this.data.buttonColorNum,
            bgColor: this.data.bgColor,
            textColor: this.data.textColor,
            loop: this.data.textStyle[5].active,
            buttonFontFamilyNum: this.data.buttonFontFamilyNum,
            text3D: this.data.text3D,
            border: this.data.border,
            textBlackShadow: this.data.textBlackShadow,
            douyin: this.data.douyin,
            light: this.data.textStyle[4].active,
            videoShow: this.data.videoShow,
            buttonVideoBgNum: this.data.buttonVideoBgNum,
            videoSrc: this.data.videoSrc
        };
        return {
            title: "快点开看我说了啥",
            path: "/pages/classics/classics?loopText=" + e.loopText + "&text=" + e.text + "&scorllTextStyle=" + e.scorllTextStyle + "&textShadow=" + e.textShadow + "&buttonFontNum=" + e.buttonFontNum + "&bgColor=" + e.bgColor + "&speedIndex=" + e.speedIndex + "&buttonColorNum=" + e.buttonColorNum + "&textColor=" + e.textColor + "&loop=" + e.loop + "&buttonFontFamilyNum=" + e.buttonFontFamilyNum + "&text3D=" + e.text3D + "&border=" + e.border + "&textBlackShadow=" + e.textBlackShadow + "&douyin=" + e.douyin + "&light=" + e.light + "&videoShow=" + e.videoShow + "&buttonVideoBgNum=" + e.buttonVideoBgNum + "&videoSrc=" + e.videoSrc,
            imageUrl: "/images/share.jpg",
            success: function (t) {
                this.setData({
                    clearTextOff: !0
                });
            }
        };
    },
    goHome: function () {
        if (x = !1, 0 == this.data.nicktemplate) {
            var t = {
                hide: !1,
                loopText: this.data.loopText,
                text: this.data.text,
                scorllTextStyle: this.data.scorllTextStyle,
                textShadow: this.data.textShadow,
                buttonFontNum: this.data.buttonFontNum,
                speedIndex: this.data.speedIndex,
                buttonColorNum: this.data.buttonColorNum,
                buttonBgNum: this.data.buttonBgNum,
                bgColor: this.data.bgColor,
                textColor: this.data.textColor,
                loop: this.data.textStyle[5].active,
                buttonFontFamilyNum: this.data.buttonFontFamilyNum,
                text3D: this.data.text3D,
                border: this.data.border,
                textBlackShadow: this.data.textBlackShadow,
                douyin: this.data.douyin,
                light: this.data.textStyle[4].active,
                videoShow: this.data.videoShow,
                buttonVideoBgNum: this.data.buttonVideoBgNum,
                videoSrc: this.data.videoSrc,
                videoArr: this.data.videoArr,
                textStyle: this.data.textStyle,
                zero: this.data.zero
            };
            wx.setStorage({
                key: "historyStyle",
                data: t
            });
        }
        var e = {
                videoArr: [this.data.videoArr[3].num, this.data.videoArr[4].num, this.data.videoArr[5].num, this.data.videoArr[6].num, this.data.videoArr[7].num, this.data.videoArr[8].num, this.data.videoArr[9].num]
            },
            a = {
                textStyle: [this.data.textStyle[6].num, this.data.textStyle[7].num]
            };
        wx.setStorage({
            key: "videoArr",
            data: e
        }), wx.setStorage({
            key: "text",
            data: a
        }), u = -1, wx.navigateBack({
            fail: function () {
                wx.reLaunch({
                    url: "/pages/index/index",
                    success: function (t) {},
                    fail: function () {},
                    complete: function () {}
                });
            }
        });
    },
    onHide: function () {
        x = !0;
    },
    shareFunc: function (t) {
        var e = t;
        console.log("shareArg", e), e.loopText && (this.data.selectIndex[5].sureid = e.loop,
            this.data.textStyle[5].active = e.loop, this.setData({
                loopText: e.loopText.split(","),
                text: e.text,
                scorllTextStyle: e.scorllTextStyle,
                textColor: e.textColor,
                bgColor: e.bgColor,
                selectIndex: this.data.selectIndex,
                textStyle: this.data.textStyle,
                buttonFontFamilyNum: e.buttonFontFamilyNum,
                fontStyleValue: this.data.fontStyle[e.buttonFontFamilyNum].name,
                text3D: e.text3D,
                border: e.border,
                textBlackShadow: e.textBlackShadow,
                douyin: e.douyin
            }), "" != e.border && this.selectContorl(2), "" != e.textBlackShadow && this.selectContorl(3),
            Boolean(e.light) || (this.selectContorl(4), wx.setScreenBrightness({
                value: 1
            })), "" != e.text3D && this.selectContorl(6), "" != e.douyin && this.selectContorl(7),
            e.videoShow && this.setData({
                videoShow: !0,
                buttonVideoBgNum: e.buttonVideoBgNum,
                videoSrc: e.videoSrc
            }), "inherit" != e.textShadow && (this.selectContorl(0), this.setData({
                textShadow: e.textColor
            })), "flicker" == e.scorllTextStyle && this.selectContorl(1), void 0 != e.buttonFontNum && this.fontControl(e.buttonFontNum),
            void 0 != e.speedIndex && this.speedFuc(e.speedIndex), "false" == e.loop ? (this.setData({
                textArr: [this.data.text]
            }), this.selectContorl(5)) : this.setData({
                textArr: this.data.loopText
            }));
    },
    classicsFunc: function () {
        var e = this;
        wx.getStorage({
            key: "historyStyle",
            success: function (a) {
                if (a.data) {
                    var o, i = a.data;
                    i.loop ? e.setData({
                            loopText: i.loopText
                        }) : e.setData({
                            loopText: [i.text]
                        }), e.data.selectIndex[5].sureid = i.loop, e.data.textStyle[5].active = i.loop,
                        wx.getStorage({
                            key: "textArg",
                            success: function (t) {
                                if (t.data) {
                                    var a = t.data;
                                    e.styleRepeat(20, a.text), e.setData({
                                        textArr: e.data.loopText,
                                        text: a.text,
                                        userInput: a.text
                                    }), console.log(a.text);
                                }
                            }
                        }), e.setData((o = {
                                scorllTextStyle: i.scorllTextStyle,
                                textColor: i.textColor,
                                buttonBgNum: i.buttonBgNum,
                                speedIndex: i.speedIndex,
                                loopText: i.loopText,
                                bgColor: i.bgColor,
                                selectIndex: e.data.selectIndex,
                                textStyle: e.data.textStyle,
                                buttonFontFamilyNum: i.buttonFontFamilyNum,
                                fontStyleValue: e.data.fontStyle[i.buttonFontFamilyNum].name,
                                text3D: i.text3D,
                                loop: i.textStyle[5].active,
                                border: i.border,
                                textBlackShadow: i.textBlackShadow,
                                douyin: i.douyin,
                                videoArr: i.videoArr
                            }, t(o, "textStyle", i.textStyle), t(o, "clearTextOff", !0), t(o, "zero", i.zero),
                            t(o, "videoShow", !1), o)), "" != i.border && e.selectContorl(2), "" != i.textBlackShadow && e.selectContorl(3),
                        i.light && e.selectContorl(4), "" != i.text3D && e.selectContorl(6), "" != i.douyin && e.selectContorl(7),
                        "inherit" != i.textShadow && (e.selectContorl(0), e.setData({
                            textShadow: i.textColor
                        })), "flicker" == i.scorllTextStyle && e.selectContorl(1), i.videoShow && e.setData({
                            videoShow: !0,
                            buttonVideoBgNum: i.buttonVideoBgNum,
                            videoSrc: i.videoSrc
                        }), void 0 != i.buttonFontNum && e.fontControl(i.buttonFontNum), "false" == i.loop ? e.setData({
                            textArr: [e.data.text]
                        }) : e.setData({
                            textArr: e.data.loopText
                        }), i.zero ? e.speedFuc(0) : e.speedFuc(i.speedIndex);
                }
            }
        });
    },
    douyinModel: function () {
        var t = this;
        this.setData({
            textArr: this.data.loopText,
            text: "FIGHT",
            scorllTextStyle: this.data.scorllTextStyle,
            textColor: this.data.textColor,
            bgColor: this.data.bgColor,
            selectIndex: this.data.selectIndex,
            textStyle: this.data.textStyle,
            douyin: "doudong",
            videoShow: !1
        }), wx.getStorage({
            key: "textArg",
            success: function (e) {
                if (e.data) {
                    var a = e.data;
                    t.styleRepeat(20, a.text), t.setData({
                        textArr: t.data.loopText,
                        text: a.text,
                        userInput: a.text
                    }), console.log(a.text);
                }
            }
        }), this.data.textStyle[6].active = !1, this.setData({
            textStyle: this.data.textStyle
        }), this.selectContorl(7), "false" != this.data.textStyle[5].active ? this.setData({
            textArr: [this.data.text]
        }) : this.setData({
            textArr: this.data.loopText
        });
    },
    loveModel: function () {
        var e, a = this;
        this.styleRepeat(20, "我喜欢你"), this.setData((e = {
                textArr: this.data.loopText,
                text: "我喜欢你",
                textColor: this.data.textColor,
                bgColor: "black",
                selectIndex: this.data.selectIndex,
                textStyle: this.data.textStyle,
                buttonFontFamilyNum: 2,
                fontStyleValue: this.data.fontStyle[2].name,
                buttonColorNum: 2
            }, t(e, "textColor", this.data.colorStyle[2].name), t(e, "buttonBgNum", -1), t(e, "buttonVideoBgNum", 1),
            e)), u = 1, wx.getStorage({
            key: "textArg",
            success: function (t) {
                if (t.data) {
                    var e = t.data;
                    a.styleRepeat(20, e.text), a.setData({
                        textArr: a.data.loopText,
                        text: e.text,
                        userInput: e.text
                    }), console.log(e.text);
                }
            }
        }), this.selectContorl(5), this.data.textStyle[5].active ? this.setData({
            textArr: this.data.loopText
        }) : this.setData({
            textArr: [this.data.text]
        }), this.speedFuc(2);
    },
    pixelModel: function () {
        var e, a = this;
        this.styleRepeat(20, "欢迎光临"), this.setData((e = {
                textArr: this.data.loopText,
                text: "欢迎光临",
                textColor: this.data.textColor,
                bgColor: "black",
                selectIndex: this.data.selectIndex,
                textStyle: this.data.textStyle,
                buttonFontFamilyNum: 2,
                fontStyleValue: this.data.fontStyle[1].name,
                buttonColorNum: 2
            }, t(e, "textColor", this.data.colorStyle[0].name), t(e, "buttonBgNum", -1), t(e, "buttonVideoBgNum", 1),
            e)), u = 1, wx.getStorage({
            key: "textArg",
            success: function (t) {
                if (t.data) {
                    var e = t.data;
                    a.styleRepeat(20, e.text), a.setData({
                        textArr: a.data.loopText,
                        text: e.text,
                        userInput: e.text
                    }), console.log(e.text);
                }
            }
        }), this.selectContorl(5), this.data.textStyle[5].active ? this.setData({
            textArr: this.data.loopText
        }) : this.setData({
            textArr: [this.data.text]
        }), this.speedFuc(2);
    },
    airportpickupModel: function () {
        var e, a = this;
        this.styleRepeat(20, "王俊凯"), this.setData((e = {
                textArr: this.data.loopText,
                text: "王俊凯",
                textColor: this.data.textColor,
                bgColor: "white",
                buttonBgNum: 1,
                selectIndex: this.data.selectIndex,
                textStyle: this.data.textStyle,
                buttonFontFamilyNum: 2,
                fontStyleValue: this.data.fontStyle[2].name,
                buttonColorNum: 1
            }, t(e, "textColor", this.data.colorStyle[1].name), t(e, "videoShow", !1), e)),
            wx.getStorage({
                key: "textArg",
                success: function (t) {
                    if (t.data) {
                        var e = t.data;
                        a.styleRepeat(20, e.text), a.setData({
                            textArr: a.data.loopText,
                            text: e.text,
                            userInput: e.text
                        }), console.log(e.text);
                    }
                }
            }), this.data.textStyle[6].active = !1, this.setData({
                textStyle: this.data.textStyle
            }), this.selectContorl(5), this.data.textStyle[5].active ? this.setData({
                textArr: this.data.loopText
            }) : this.setData({
                textArr: [this.data.text]
            }), this.speedFuc(2);
    },
    musicModel: function () {
        var e, a = this;
        this.styleRepeat(20, "嗨起来!"), this.setData((e = {
                textArr: this.data.loopText,
                text: "嗨起来!",
                textColor: this.data.textColor,
                bgColor: "black",
                selectIndex: this.data.selectIndex,
                textStyle: this.data.textStyle,
                buttonFontFamilyNum: 1,
                fontStyleValue: this.data.fontStyle[0].name,
                buttonColorNum: 7
            }, t(e, "textColor", this.data.colorStyle[7].name), t(e, "buttonBgNum", -1), e)),
            wx.getStorage({
                key: "textArg",
                success: function (t) {
                    if (t.data) {
                        var e = t.data;
                        a.styleRepeat(20, e.text), a.setData({
                            textArr: a.data.loopText,
                            text: e.text,
                            userInput: e.text
                        }), console.log(e.text);
                    }
                }
            }), this.selectContorl(5), this.data.textStyle[5].active ? this.setData({
                textArr: this.data.loopText
            }) : this.setData({
                textArr: [this.data.text]
            }), this.selectContorl(0), this.selectContorl(1), this.setData({
                textShadow: this.data.textColor,
                scorllTextStyle: "flicker"
            }), this.speedFuc(2);
    },
    seatModel: function () {
        var e, a = this;
        this.styleRepeat(20, "需要让座请叫我"), this.setData((e = {
                textArr: this.data.loopText,
                text: "需要让座请叫我",
                textColor: this.data.textColor,
                bgColor: "black",
                selectIndex: this.data.selectIndex,
                textStyle: this.data.textStyle,
                buttonFontFamilyNum: 4,
                fontStyleValue: this.data.fontStyle[4].name,
                buttonColorNum: 0
            }, t(e, "textColor", this.data.colorStyle[0].name), t(e, "videoShow", !1), e)),
            wx.getStorage({
                key: "textArg",
                success: function (t) {
                    if (t.data) {
                        var e = t.data;
                        a.styleRepeat(20, e.text), a.setData({
                            textArr: a.data.loopText,
                            text: e.text,
                            userInput: e.text
                        }), console.log(e.text);
                    }
                }
            }), this.selectContorl(5), this.data.textStyle[5].active ? this.setData({
                textArr: this.data.loopText
            }) : this.setData({
                textArr: [this.data.text]
            }), this.selectContorl(6), this.setData({
                text3D: "text3D"
            }), this.speedFuc(2);
    },
    documentClick: function () {
        var t = this;
        clearTimeout(a);
        var e = this.data.hideLock,
            o = this.data.lockOff;
        if (s = !e, o && (s = !0), this.data.clearTextShow && "" != this.data.temporaryText) {
            this.inputTextDocument();
            var i = {
                loopText: this.data.loopText,
                text: this.data.text
            };
            wx.setStorage({
                key: "textArg",
                data: i
            });
        } else {
            if (this.setData({
                    hideLock: !e,
                    clearTextShow: !1
                }), a = setTimeout(function () {
                    s = !0, t.setData({
                        hideLock: !0,
                        clearTextOff: !0
                    }), t.onDrawer();
                }, 4e3), o) return;
            this.onDrawer();
        }
        this.data.accomplish && (this.onAccomplish(), this.setData({
            accomplish: !this.data.accomplish,
            hideLock: !1
        }));
    },
    lockClick: function () {
        var t = this;
        clearTimeout(a);
        var e = this.data.lockOff;
        s = !s, e || (a = setTimeout(function () {
            t.setData({
                hideLock: !0
            });
        }, 4e3)), this.setData({
            lockOff: !e,
            hideLock: !1
        }), m && (this.onAccomplish(), s = !0), this.onDrawer();
    },
    onDrawer: function () {
        return d = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease",
            delay: 0
        }), s ? (l.windowWidth >= 768 && (i = 660), d.translateY(i).step(), this.setData({
            animationInput: d,
            animationText: d.export()
        })) : (d.translateY(0).step(), this.setData({
            animationInput: d,
            animationText: d.export()
        })), d;
    },
    onTextStyleDrawer: function () {
        v && v.show().catch(function (t) {
            console.log("插屏广告展示失败：", t);
        }), clearTimeout(a), m = !0;
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease",
            delay: 0
        });
        t.translateY(-n).step(), this.setData({
            animationStyle: t,
            animationTextStyle: t.export(),
            accomplish: !0,
            hideLock: !1
        }), s = !0, this.onDrawer();
    },
    onAccomplish: function () {
        var t = this;
        clearTimeout(a), m = !1;
        var e = this.onDrawer();
        e.translateY(i).step();
        var o = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease",
            delay: 0
        });
        return o.translateY(n).step(), this.setData({
            animationInput: e,
            drawer: e.export(),
            animationStyle: o,
            animationTextStyle: o.export()
        }), s = !1, this.onDrawer(), a = setTimeout(function () {
            s = !0, t.setData({
                hideLock: !0
            }), t.onDrawer();
        }, 4e3), o;
    },
    scorllText: function () {
        this.clearText();
        var t = "",
            a = this,
            o = wx.createSelectorQuery();
        o.select("#animationText").boundingClientRect(), o.exec(function (o) {
            t = o[0].height;
            var i = a.data.windowHeight + t;
            a.setData({
                currentSpeed: a.data.windowHeight / a.data.speedStyle[a.data.speedIndex].value
            }), a.data.scorllDuration = parseInt(i / a.data.currentSpeed);
            var s = function () {
                a.data.animation.translate3d(-i, 0, 0).step({
                    duration: a.data.scorllDuration
                }), a.data.animation.translate3d(0, 0, 0).step({
                    duration: 0
                }), a.setData({
                    scorll: a.data.animation.export()
                });
            };
            s(), e = setInterval(function () {
                s();
            }, a.data.scorllDuration + 500);
        });
    },
    check: function (t, e) {
        var a = this;
        "" != t ? wx.cloud.callFunction({
            name: "msgCheck",
            data: {
                content: t
            }
        }).then(function (t) {
            console.log(t.result)
            if (t.result.errCode !=0) {
                wx.showToast({
                    title: "内容不合法",
                    image: "../../images/cross.png",
                    duration: 2e3,
                    mask: !1
                })
                a.setData({
                    userInput: "",
                    clearTextShow: !1,
                    clearTextOff: !0
                })
            } else {
                a.setData({
                    userInput: "",
                    clearTextShow: !1,
                    clearTextOff: !0
                })
                e ? a.sendText(e) : a.sendTextDocument();
            }

        }) : wx.showToast({
            title: "内容不能为空",
            image: "../../images/cross.png",
            duration: 2e3,
            mask: !1
        });
    },
    sendText: function (t) {
        clearTimeout(a), this.clearText(), this.styleRepeat(20, t.detail.value), this.setData({
            text: [t.detail.value]
        });
        var e = {
            loopText: this.data.loopText,
            text: this.data.text
        };
        if (wx.setStorage({
                key: "textArg",
                data: e
            }), !this.data.condition) {
            var o = t.detail.value.length;
            this.textLen(o), this.setData({
                buttonFontNum: 5
            });
        }
        this.loopState(), (s = !1) || (s = !0, this.setData({
            hideLock: !0
        }), this.onDrawer()), this.setData({
            clearTextOff: !0,
            clearTextShow: !1
        }), this.scorllText();
    },
    sendTextDocument: function () {
        clearTimeout(a), this.clearText(), this.styleRepeat(20, this.data.temporaryText),
            this.setData({
                text: [this.data.temporaryText],
                clearTextShow: !1,
                clearTextOff: !0
            }), this.loopState(), this.scorllText();
    },
    inputTextDocument: function () {
        this.check(this.data.temporaryText);
    },
    loopState: function () {
        0 != this.data.textStyle[5].active && "0" != this.data.speedIndex ? (this.setData({
            textArr: this.data.loopText
        }), this.scorllText()) : this.setData({
            textArr: [this.data.text]
        });
    },
    inputTextConfirm: function (t) {
        v && v.show().catch(function (t) {
            console.log("插屏广告展示失败：", t);
        }), this.check(t.detail.value, t);
    },
    clearInputText: function () {
        this.setData({
            userInput: "",
            temporaryText: "",
            clearTextShow: !1
        });
    },
    cursorInput: function (t) {
        s = !1, clearTimeout(a), this.setData({
            clearTextOff: !0,
            placeholderColor: !1
        }), this.data.temporaryText && this.setData({
            clearTextShow: !0
        }), d && this.setData({
            animationInput: d.export()
        });
    },
    clearBtn: function (t) {
        s = !1, clearTimeout(a), t.detail.value.length > 0 ? this.setData({
            clearTextOff: !0,
            clearTextShow: !0,
            temporaryText: t.detail.value
        }) : this.setData({
            clearTextOff: !0,
            clearTextShow: !1
        }), d && this.setData({
            animationInput: d.export()
        });
    },
    clearText: function () {
        clearInterval(e), this.data.animation.translate3d(0, 0, 0).step({
            duration: 0
        }), this.setData({
            scorll: this.data.animation.export()
        });
    },
    styleRepeat: function (t, e) {
        for (var a = [], o = 0; o < t; o++) a.push(e);
        this.setData({
            loopText: a
        });
    },
    effectControl: function (t) {
        this.clearText();
        var e = t.currentTarget.dataset.variable,
            a = t.currentTarget.dataset.index,
            o = this.data.textStyle[a];
        "loop" == e && (o.active ? this.setData({
            textArr: [this.data.text]
        }) : (this.styleRepeat(20, this.data.text.toString()), this.setData({
            textArr: this.data.loopText
        })), this.selectContorl(a)), "flicker" == e && (o.active ? this.setData({
            scorllTextStyle: ""
        }) : this.setData({
            scorllTextStyle: "flicker"
        }), this.selectContorl(a)), "shadow" == e && (o.active ? this.setData({
            textShadow: "inherit"
        }) : this.shadowControl(), this.selectContorl(a)), "border" == e && (o.active ? this.setData({
            border: ""
        }) : this.setData({
            border: "text-border"
        }), this.selectContorl(a)), "textShadow" == e && (o.active ? this.setData({
            textBlackShadow: ""
        }) : this.setData({
            textBlackShadow: "black-shadow"
        }), this.selectContorl(a)), "3D" == e && (o.active ? this.setData({
            text3D: ""
        }) : this.setData({
            text3D: "text3D"
        }), this.selectContorl(a), this.setData({
            textStyle: this.data.textStyle
        })), "light" == e && (o.active ? wx.setScreenBrightness({
            value: .5
        }) : wx.setScreenBrightness({
            value: 1
        }), this.selectContorl(a)), "douyin" == e && (o.active ? this.setData({
            douyin: ""
        }) : this.setData({
            douyin: "doudong"
        }), this.selectContorl(a), this.setData({
            textStyle: this.data.textStyle
        })), "0" != this.data.speedIndex && this.scorllText();
    },
    selectContorl: function (t) {
        var e = this.data.selectIndex;
        this.data.textStyle[t].active = !this.data.textStyle[t].active, e[t].sureid = !e[t].sureid,
            this.setData({
                selectIndex: e
            });
    },
    shadowControl: function () {
        this.setData({
            textShadow: this.data.textColor
        });
    },
    colorControl: function (t) {
        this.clearText();
        var e = t.currentTarget.dataset.index;
        this.setData({
            buttonColorNum: e,
            textColor: t.currentTarget.dataset.color
        }), "inherit" != this.data.textShadow && this.shadowControl(), this.scorllText();
    },
    backgroundControl: function (t) {
        this.clearText();
        var e = t.currentTarget.dataset.index;
        this.setData({
            buttonBgNum: e,
            bgColor: t.currentTarget.dataset.color,
            videoShow: !1,
            buttonVideoBgNum: -1
        }), u = -1, this.scorllText();
    },
    effctVideo: function (t, e) {
        this.data.textStyle[e].lock = !0, this.data.textStyle[e].num--, "3D" == t ? this.setData({
            text3D: "text3D"
        }) : this.setData({
            douyin: "doudong"
        }), this.selectContorl(e), this.setData({
            textStyle: this.data.textStyle,
            muted: !1
        });
    },
    rewardedVideo: function (t) {
        this.data.videoArr[t].lock = !0, this.data.videoArr[t].num--, u = t, this.setData({
            videoShow: !0,
            buttonVideoBgNum: u,
            videoSrc: c[u].tempFileURL,
            videoArr: this.data.videoArr,
            muted: !1
        });
    },
    videoControl: function (t) {
        this.clearText();
        var e = t.currentTarget.dataset.index;
        u = e, console.log("videoList[idx].tempFileURL", c[e].tempFileURL), this.setData({
            buttonBgNum: -1,
            videoShow: !0,
            buttonVideoBgNum: e,
            videoSrc: c[e].tempFileURL,
            videoArr: this.data.videoArr
        }), this.scorllText();
    },
    fontControl: function (t) {
        this.setData({
            buttonFontNum: t,
            fontSize: 3 * this.data.sizeStyle[t].value,
            staticFontSize: 4 * this.data.sizeStyle[t].value
        }), this.data.sizeStyle[5].value = this.data.staticFontSize / 4, t == this.data.buttonFontAuto && this.data.fontSize != 3 * this.data.sizeStyle[4].value && this.setData({
            fontSize: 3 * this.data.sizeStyle[4].value
        }), 0 == this.data.buttonSpeedNum && t == this.data.buttonFontAuto && this.setData({
            staticFontSize: 4 * this.data.sizeStyle[this.data.hideFontSizeIndex - 1].value
        });
    },
    onClickFont: function (t) {
        this.clearText();
        var e = t.currentTarget.dataset.index;
        this.fontControl(e), "0" != this.data.speedIndex && this.scorllText();
    },
    fontFamilyControl: function (t) {
        this.clearText();
        var e = t.currentTarget.dataset.index;
        this.setData({
            buttonFontFamilyNum: e,
            fontStyleValue: this.data.fontStyle[e].name
        }), this.scorllText();
    },
    onClickSpeed: function (t) {
        this.clearText();
        var e = t.currentTarget.dataset.index;
        this.speedFuc(e), 0 != e && this.scorllText();
    },
    textLen: function (t) {
        var e = void 0;
        t <= 3 ? (r = 72, e = 4) : t > 3 && t < 6 ? (r = 64, e = 3) : t >= 6 && t <= 11 ? (r = 48,
            e = 2) : t > 11 && t <= 19 ? (r = 32, e = 1) : t > 20 && t <= 30 ? (r = 24, e = 0) : (r = 12,
            e = -1), this.setData({
            fontSize: 2 * r,
            staticFontSize: 3 * r,
            hideFontSizeIndex: e
        });
    },
    speedFuc: function (t) {
        var e = "";
        0 == t ? (e = void 0 != o.globalData.arg.text ? this.data.text.length : this.data.text[0].length,
            this.textLen(e), this.setData({
                condition: !1,
                buttonFontNum: this.data.buttonFontAuto,
                buttonSpeedNum: t,
                speedIndex: t,
                zero: !0
            })) : (this.data.textStyle[5].active ? this.setData({
            textArr: this.data.loopText
        }) : this.setData({
            textArr: [this.data.text]
        }), this.setData({
            condition: !0,
            buttonSpeedNum: t,
            speedIndex: t,
            currentSpeed: this.data.windowHeight / this.data.speedStyle[this.data.speedIndex].value,
            zero: !1
        }));
    },
    modalinput: function () {
        s = !1, clearTimeout(a), d && this.setData({
            animationInput: d.export()
        }), this.setData({
            hiddenmodalput: !this.data.hiddenmodalput,
            modalInput: !0
        });
    },
    getConfirmText: function (t) {
        t.detail.value.length <= 0 ? this.setData({
            modelClear: !1
        }) : this.setData({
            modalInputVal: t.detail.value,
            modelClear: !0
        });
    },
    clearModelText: function () {
        this.setData({
            modalInputVal: "",
            modelClear: !1
        });
    },
    cancel: function () {
        this.setData({
            hiddenmodalput: !0
        });
    },
    confirm: function () {
        v && v.show().catch(function (t) {
            console.log("插屏广告展示失败：", t);
        });
        var t = this;
        "" == t.data.modalInputVal ? wx.showToast({
            title: "内容不能为空",
            image: "../../images/cross.png",
            duration: 2e3,
            mask: !1
        }) : wx.cloud.callFunction({
            name: "msgCheck",
            data: {
                content: t.data.modalInputVal
            }
        }).then(function (e) {
            console.log(e.result), 300 == e.result.code ? (wx.showToast({
                title: "内容不合法",
                image: "../../images/cross.png",
                duration: 2e3,
                mask: !1
            }), t.setData({
                modalInputVal: "",
                modelClear: !1
            })) : (h.unshift(t.data.modalInputVal), t.setData({
                hiddenmodalput: !0,
                usefulText: h,
                usefulOff: !0,
                modalInputVal: "",
                modelClear: !1
            }), wx.setStorage({
                key: "historyUseful",
                data: h
            }));
        });
    },
    sendTextFunc: function (t) {
        var e = t.currentTarget.dataset.index;
        clearTimeout(a), this.clearText(), this.setData({
                temporaryText: this.data.usefulText[e]
            }), 0 == this.data.buttonSpeedNum && (this.fontControl(5), this.textLen(this.data.temporaryText.length)),
            this.styleRepeat(20, this.data.temporaryText), this.setData({
                text: [this.data.temporaryText],
                clearTextShow: !1,
                clearTextOff: !0,
                userInput: this.data.temporaryText
            });
        var o = {
            loopText: this.data.loopText,
            text: this.data.text
        };
        wx.setStorage({
            key: "textArg",
            data: o
        }), this.loopState(), 0 != this.data.buttonSpeedNum && this.scorllText(), wx.setStorage({
            key: "scrollText",
            data: this.data.temporaryText
        }), this.data.usefulText[e];
    },
    clearTextFunc: function (t) {
        var e = t.currentTarget.dataset.index;
        h.splice(e, 1), this.setData({
            usefulText: h
        }), 0 == h ? this.setData({
            usefulOff: !1
        }) : this.setData({
            usefulOff: !0
        }), wx.setStorage({
            key: "historyUseful",
            data: h
        });
    },
    adLoad: function () {
        console.log("Banner 广告加载成功");
    },
    adClose: function () {
        this.setData({
            adOff: !1
        });
    },
    adTextStyleClose: function () {
        this.setData({
            adTextStyleOff: !1
        });
    },
    adHide: function (t) {
        1005 == t.detail.errCode || 1002 == t.detail.errCode || 1006 == t.detail.errCode || 1007 == t.detail.errCode ? this.setData({
            adTextStyleOff: !1
        }) : this.setData({
            adTextStyleOff: !0
        });
    }
});