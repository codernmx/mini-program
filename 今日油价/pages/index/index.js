import config from '../../config/config.js';
import QQMapWX from '../../assets/libs/qqmap-wx-jssdk'
// 引入SDK核心类// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: config.txKey
})
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        showArea: '重庆',
        oilInfo: {},
        areaList: [
            '山东',
            '西藏',
            '上海',
            '福建',
            '吉林',
            '山西',
            '甘肃',
            '宁夏',
            '四川',
            '河北',
            '河南',
            '浙江',
            '广西',
            '重庆',
            '湖北',
            '湖南',
            '海南',
            '江西',
            '云南',
            '黑龙江',
            '内蒙古',
            '辽宁',
            '广东',
            '青海',
            '天津',
            '贵州',
            '陕西',
            '新疆',
            '江苏',
            '北京',
            '安徽',

        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        qqmapsdk.reverseGeocoder({
            location: '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
            success: (res) => { //成功后的回调
                console.log(res)
                if (res.status === 0) {
                    this.setData({
                        showArea: res.result.ad_info.city.slice(0, 2)
                    })
                    this.getList(res.result.ad_info.city.slice(0, 2))
                } else {
                    getApp().util.toast('获取当前地址错误，请自行选择~~')
                    this.getList(this.data.showArea)
                }
            },
        })

    },
    getList(val) {
        wx.request({
            url: 'https://ali-todayoil.showapi.com/todayoil?prov=' + val,
            header: config.request.header,
            success: (res) => {
                console.log(res)
                if (res.statusCode == 200) {
                    wx.showToast({
                        title: '当前数据:' + val + '地区',
                        icon: 'none'
                    })
                    console.log(res.data.showapi_res_body.list[0])
                    this.setData({
                        oilInfo: res.data.showapi_res_body.list[0],
                        show: false,
                        showArea: val
                    })
                } else {
                    getApp().util.toast('请联系管理人员及时充值API次数~~')
                }
            }
        })
    },
    /* 选择器确认 */
    submit(val) {
        this.getList(val.detail.value)
        wx.showTabBar({
            animation: true,
        })
    },
    onClose() {
        wx.showTabBar({
            animation: true,
        })
        this.setData({
            show: false
        });
    },
    open() {
        wx.hideTabBar()
        this.setData({
            show: true
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})