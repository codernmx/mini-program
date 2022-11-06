var t = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), a = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), i = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), n = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), e = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), o = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), r = "", s = "", d = "", u = "", m = "", l = "", c = !0, p = getApp(), g = (getApp().globalData.host_url, 
function(t) {
    return "/images/dice/touzi" + t + "-" + Math.floor(8 * Math.random() + 1) + ".png";
}), h = null;

Page({
    data: {
        isIpx: getApp().globalData.isIpx,
        img1: g(1),
        img2: g(2),
        img3: g(3),
        img4: g(4),
        img5: g(5),
        img6: "",
        diceNum: 5,
        addDiceOpacity: 1,
        minDiceOpacity: 1,
        adtag: 1
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        h && h.show().catch(function(t) {
            console.error(t);
        }), this.animation1 = t, this.animation2 = a, this.animation3 = i, this.animation4 = n, 
        this.animation5 = e, this.animation6 = o, this.setData({
            animation1: t.export(),
            animation2: a.export(),
            animation3: i.export(),
            animation4: n.export(),
            animation5: e.export(),
            animation6: o.export()
        });
    },
    rotateAni: function() {
        for (var t = 1; t <= this.data.diceNum; t++) 1 == t ? (this.animation1.translate3d(60, -125, 0).rotate(-360).step({
            duration: 200
        }).translate3d(60, 0, 0).rotate(-360).step({
            duration: 100
        }).translate3d(-80, 0, 0).rotate(-720).step({
            duration: 100
        }).translate3d(-50, -50, 0).rotate(-360).step({
            duration: 50
        }).translate3d(70, -30, 0).rotate(360).step({
            duration: 300
        }).translate3d(0, 0, 0).rotate(-0).step({
            duration: 400
        }), this.setData({
            animation1: this.animation1.export()
        })) : 2 == t ? (this.animation2.translate3d(30, -155, 0).rotate(-360).step({
            duration: 200
        }).translate3d(30, 0, 0).rotate(-360).step({
            duration: 100
        }).translate3d(-30, -70, 0).rotate(-1080).step({
            duration: 100
        }).translate3d(-100, -30, 0).rotate(-1440).step({
            duration: 100
        }).translate3d(-110, -10, 0).rotate(-720).step({
            duration: 100
        }).translate3d(0, 0, 0).rotate(-360).step({
            duration: 800
        }), this.setData({
            animation2: this.animation2.export()
        })) : 3 == t ? (this.animation3.translate3d(110, -175, 0).rotate(-360).step({
            duration: 200
        }).translate3d(110, 0, 0).rotate(-360).step({
            duration: 100
        }).translate3d(10, -20, 0).rotate(-720).step({
            duration: 100
        }).translate3d(-30, 0, 0).rotate(-1440).step({
            duration: 100
        }).translate3d(50, -40, 0).rotate(-1080).step({
            duration: 100
        }).translate3d(110, 0, 0).rotate(360).step({
            duration: 200
        }).translate3d(0, 0, 0).rotate(0).step({
            duration: 1e3
        }), this.setData({
            animation3: this.animation3.export()
        })) : 4 == t ? (this.animation4.translate3d(80, -175, 0).rotate(-360).step({
            duration: 200
        }).translate3d(80, -30, 0).rotate(-360).step({
            duration: 100
        }).translate3d(10, -60, 0).rotate(-1080).step({
            duration: 100
        }).translate3d(-45, 0, 0).rotate(-1440).step({
            duration: 100
        }).translate3d(-25, -20, 0).rotate(-720).step({
            duration: 100
        }).translate3d(50, 0, 0).rotate(720).step({
            duration: 200
        }).translate3d(0, 0, 0).rotate(360).step({
            duration: 400
        }), this.setData({
            animation4: this.animation4.export()
        })) : 5 == t ? (this.animation5.translate3d(20, -175, 0).rotate(-360).step({
            duration: 200
        }).translate3d(20, -40, 0).rotate(-360).step({
            duration: 100
        }).translate3d(-105, 0, 0).rotate(-720).step({
            duration: 100
        }).translate3d(0, 0, 0).rotate(360).step({
            duration: 800
        }), this.setData({
            animation5: this.animation5.export()
        })) : 6 == t && (this.animation6.translate3d(20, -175, 0).rotate(-360).step({
            duration: 200
        }).translate3d(20, -40, 0).rotate(-360).step({
            duration: 100
        }).translate3d(-105, 0, 0).rotate(-720).step({
            duration: 100
        }).translate3d(0, 0, 0).rotate(360).step({
            duration: 800
        }), this.setData({
            animation6: this.animation6.export()
        }));
    },
    next: function() {
        if (c) {
            c = !1, this.setData({
                adtag: c
            });
            var t = this, a = this.data.diceNum;
            for (t.rotateAni(), i = 1; i <= a; i++) t.getImg(i);
            for (var i = this.data.diceNum + 1; i <= this.data.diceNum; i++) t.getImg(i);
            if (t.setData({
                img1: r,
                img2: s,
                img3: d,
                img4: u,
                img5: m,
                img6: l
            }), a < 6) switch (a) {
              case 5:
                t.setData({
                    img6: null
                });
                break;

              case 4:
                t.setData({
                    img5: null,
                    img6: null
                });
                break;

              case 3:
                t.setData({
                    img4: null,
                    img5: null,
                    img6: null
                });
                break;

              case 2:
                t.setData({
                    img3: null,
                    img4: null,
                    img5: null,
                    img6: null
                });
                break;

              case 1:
                t.setData({
                    img2: null,
                    img3: null,
                    img4: null,
                    img5: null,
                    img6: null
                });
            }
            p.playMusic("yao"), setTimeout(function() {
                c = !0, t.setData({
                    adtag: c
                });
            }, 1500);
        }
    },
    getImg: function(t) {
        var a = parseInt(6 * Math.random()) + 1;
        1 == t && (r = g(a)), 2 == t && (s = g(a)), 3 == t && (d = g(a)), 4 == t && (u = g(a)), 
        5 == t && (m = g(a)), 6 == t && (l = g(a));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return getApp().shareApp("bobing");
    },
    addDice: function() {
        var t = this.data.diceNum + 1;
        t > 6 || (6 == t ? this.setData({
            diceNum: t,
            addDiceOpacity: .5,
            minDiceOpacity: 1
        }) : this.setData({
            diceNum: t,
            addDiceOpacity: 1,
            minDiceOpacity: 1
        }), this.changeAddDiceNum());
    },
    reduceDice: function() {
        var t = this.data.diceNum - 1;
        t < 1 || (1 == t ? this.setData({
            diceNum: t,
            minDiceOpacity: .5,
            addDiceOpacity: 1
        }) : this.setData({
            diceNum: t,
            minDiceOpacity: 1,
            addDiceOpacity: 1
        }), this.changeDiceNum());
    },
    changeAddDiceNum: function() {
        var t = this;
        switch (t.data.diceNum) {
          case 6:
            t.setData({
                animation6: o.export(),
                img6: g(6)
            });
            break;

          case 5:
            t.setData({
                animation5: e.export(),
                img5: g(5)
            });
            break;

          case 4:
            t.setData({
                animation4: n.export(),
                img4: g(4)
            });
            break;

          case 3:
            t.setData({
                animation3: i.export(),
                img3: g(3)
            });
            break;

          case 2:
            t.setData({
                animation2: a.export(),
                img2: g(2)
            });
        }
    },
    changeDiceNum: function() {
        var t = this, a = t.data.diceNum;
        if (a < 6) switch (a) {
          case 5:
            t.setData({
                img6: null
            });
            break;

          case 4:
            t.setData({
                img5: null,
                img6: null
            });
            break;

          case 3:
            t.setData({
                img4: null,
                img5: null,
                img6: null
            });
            break;

          case 2:
            t.setData({
                img3: null,
                img4: null,
                img5: null,
                img6: null
            });
            break;

          case 1:
            t.setData({
                img2: null,
                img3: null,
                img4: null,
                img5: null,
                img6: null
            });
        }
    },
    onExit: function() {
        wx.navigateBack();
    },
    preChaping: function() {
        var t = getApp().inGetAdvtype().kv;
        wx.createInterstitialAd && null != t && t.chaping.length && ((h = wx.createInterstitialAd({
            adUnitId: t.chaping
        })).onLoad(function() {}), h.onError(function(t) {}), h.onClose(function() {}));
    }
});