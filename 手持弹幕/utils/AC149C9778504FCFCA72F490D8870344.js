var a = require("83BAAC2678504FCFE5DCC42189860344.js");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

for (var e = require("9B5BE36378504FCFFD3D8B64AC670344.js").siteroot.split("/"), o = e[0] + "//" + e[2], i = (a(require("E3FDE61678504FCF859B8E11E5B70344.js")), 
require("2E3B3D2778504FCF485D552066D70344.js")), s = {
    press: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/press.mp3",
    exit: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/exit.mp3",
    select: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/select.mp3",
    win: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/win.mp3",
    roulette: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/roulette.mp3",
    shake: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/shake.mp3",
    uncle_start: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/uncle_start.mp3",
    barrage: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/barrage.mp3",
    guess_error: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/guess_error.mp3",
    guess_right: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/guess_right.mp3",
    uncle_click: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/uncle_click.mp3",
    uncle_selected_1: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/uncle_selected_1.mp3",
    uncle_selected_2: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/uncle_selected_2.mp3",
    uncle_selected_3: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/uncle_selected_3.mp3",
    uncle_selected_4: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/uncle_selected_4.mp3",
    uncle_selected_5: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/uncle_selected_5.mp3",
    uncle_selected_6: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/uncle_selected_6.mp3",
    dog_click: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/dog_click.mp3",
    pig_click: o + "/addons/aaa_yaoshaizi/resource/yaoshaizi/pig_click.mp3"
}, t = 0; t < 13; t++) s["light/".concat(t + 1)] = "";

var c = {
    audioContext: null,
    addSkinAudio: function() {
        (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(a) {
            var e = a.resource, o = e.click_audio, i = e.select_audio;
            void 0 === s[o] && (s[o] = ""), void 0 === s[i] && (s[i] = "");
        });
    },
    checkAudioStorage: function() {
        (0, i.$isDevTools)() || setTimeout(function() {
            Promise.all(Object.keys(s).map(function(a) {})).then(function(a) {
                Object.keys(s).forEach(function(e, o) {
                    s[e] = a[o];
                });
            });
        }, 1e3);
    },
    clearContext: function() {
        this.audioContext && (this.audioContext.destroy(), this.audioContext = null);
    },
    stopMusic: function() {
        this.audioContext && this.audioContext.stop();
    },
    playMusic: function(a) {
        var e = s[a];
        !e && console.log(a), e && getApp().globalData.settings.voiceChecked && this && this.createAudio(e);
    },
    playLightMusic: function(a) {
        var e = o + "/addons/aaa_danmu/resource/" + a + ".mp3";
        console.log("playLightMusic", e), e && this && this.canIUseAudio() && (this.audioContext || (this.audioContext = wx.createInnerAudioContext(), 
        this.audioContext && (this.audioContext.autoplay = !0, this.audioContext.loop = !0)), 
        this.audioContext && (this.audioContext.src = e));
    },
    createAudio: function(a) {
        if (this.canIUseAudio()) {
            var e = wx.createInnerAudioContext();
            e && (e.src = a, e.play());
        }
    },
    canIUseAudio: function() {
        return wx.canIUse("createInnerAudioContext");
    }
};

exports.default = c;