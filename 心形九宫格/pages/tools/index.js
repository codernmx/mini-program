// pages/tools/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList_bak: [{
            name: "九宫格切图",
            openType: "navigate",
            remark: "把一张图片切成九宫格小图",
            target: "self",
            url: "/pages/others/qietu/qietu",
            icon: "https://bt.nmxgzs.cn/upload/2022-06-30/4t95gC.jpg"
        }, {
            name: "九宫格拼图",
            openType: "navigate",
            remark: "九张图片拼成一张九宫格图",
            target: "self",
            url: "/pages/others/pintu/pintu",
            icon: "https://bt.nmxgzs.cn/upload/2022-06-30/4zNKS2.jpg"
        }, {
            name: "心形九宫格",
            openType: "navigate",
            remark: "将多张图拼接成一张心形图",
            target: "self",
            url: "/pages/others/heart/heart",
            icon: "https://bt.nmxgzs.cn/upload/2022-06-30/4iTsBU.jpg"
        }, {
            name: "文字九宫格",
            openType: "navigate",
            remark: "将文字切成九宫格小图",
            target: "self",
            url: "/pages/others/wenzi/wenzi",
            icon: "https://bt.nmxgzs.cn/upload/2022-06-30/5cg0NB.jpg"
        }, {
            name: "多图横向拼接",
            openType: "navigate",
            remark: "将多张图片横向拼图",
            target: "self",
            url: "/pages/others/img/img",
            icon: "https://bt.nmxgzs.cn/upload/2022-06-30/1lEb2t.jpg"
        }, {
            name: "涂鸦专区",
            openType: "navigate",
            remark: "来这，随便画吧~",
            target: "self",
            url: "/pages/graffiti/index/index",
            icon: "https://bt.nmxgzs.cn/upload/2022-06-30/CZSvGN.png"
        }],
        list: [{
                title: '压缩图片',
                icon: 'like-o',
                url: '/pages/compressImage/index'
            },
            {
                title: '九宫格切割',
                icon: 'like-o',
                url: '/pages/nine/index'
            },
            {
                title: '视频剪辑',
                icon: 'like-o',
                url: '/pages/cut/index'
            }
        ]
    },
    toPage(e) {
        console.log(e)
        const url = e.currentTarget.dataset.url
        console.log(url)
        wx.navigateTo({
            url
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})