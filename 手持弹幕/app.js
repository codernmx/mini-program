require("utils/mta_analysis.js");

App({
    onLaunch: function() {
        wx.cloud ? wx.cloud.init({
            env: "codernmx-5gyxmux49f98c8b2",
            traceUser: !0
        }) : console.error("请使用 2.2.3 或以上的基础库以使用云能力");
        var o = this, n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n), wx.login({
            success: function(o) {}
        }), wx.getSetting({
            success: function(n) {
                console.log("aaa", n), n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(n) {
                        o.globalData.userInfo = n.userInfo, o.userInfoReadyCallback && o.userInfoReadyCallback(n);
                    }
                });
            }
        });
    },
    globalData: {
        arg: {},
        backHome: !1,
        settings: []
    },
    onShow: function(o) {
        this.globalData.arg = o.query, console.log("res", o.query), console.log("globalData", this.globalData.arg);
    },
    siteInfo: require("/utils/9B5BE36378504FCFFD3D8B64AC670344.js"),
    playMusic: function(o) {
        void 0 == this.innerAudioContext && (this.innerAudioContext = wx.createInnerAudioContext(), 
        this.innerAudioContext.onEnded(function(o) {}), this.innerAudioContext.onError(function(o) {
            console.log("播放音频失败" + o);
        }), this.innerAudioContext.onStop(function(o) {
            console.log("停止播放!");
        }));
        var n = this.siteInfo.siteroot.split("/"), t = n[0] + "//" + n[2];
        "http" != o.substr(0, 4) ? this.innerAudioContext.src = t + "/addons/aaa_danmu/resource/danmu/" + o + ".mp3" : this.innerAudioContext.src = o, 
        console.log(this.innerAudioContext.src), this.innerAudioContext.play();
    }
});