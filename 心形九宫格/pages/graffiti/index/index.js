Page({
        data: {
                navList_bak: [{
                        name: "画画",
                        openType: "navigate",
                        remark: "一个干净的画板，快来创作吧",
                        target: "self",
                        url: "/pages/graffiti/painting/painting?pageType=whiteBoard",
                        icon: "https://bt.nmxgzs.cn/upload/2022-06-30/IPfN0q.png"
                }, {
                        name: "涂鸦照片",
                        openType: "navigate",
                        remark: "选择照片涂鸦",
                        target: "self",
                        url: "/pages/graffiti/photo/photo",
                        icon: "https://bt.nmxgzs.cn/upload/2022-06-30/1NPD4g.png"
                }, {
                        name: "像素涂鸦",
                        openType: "navigate",
                        remark: "像素画爱好者的福音",
                        target: "self",
                        url: "/pages/graffiti/pixel/pixel",
                        icon: "https://bt.nmxgzs.cn/upload/2022-06-30/5ISLVr.png"
                }, {
                        name: "荧光涂鸦",
                        openType: "navigate",
                        remark: "更亮的涂鸦效果",
                        target: "self",
                        url: "/pages/graffiti/painting/painting?pageType=highlighter",
                        icon: "https://bt.nmxgzs.cn/upload/2022-06-30/qcXpbY.png"
                }],

        },
        onLoad: function (options) {

        },
        onShareAppMessage: function () {

        }
})