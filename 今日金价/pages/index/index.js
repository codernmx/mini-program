const app = getApp()
import config from '../../config/index';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        time: '',
        show: false,
        showType: '上海黄金交易所',
        typeList: [
            '上海黄金交易所',
            '上海期货交易所',
            '香港黄金',
            '银行账户黄金',
            '伦敦金、银',
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList('shgold')
    },
    open() {
        this.setData({
            show: !this.data.show
        })
    },
    openDetail(e) {
        const item = e.currentTarget.dataset.item
        console.log(item)
        wx.navigateTo({
            url: '/pages/detail/index?item=' + JSON.stringify(item),
        })
    },
    submit(val) {
        const param = {
            '上海黄金交易所': 'shgold',
            '上海期货交易所': 'shfutures',
            '香港黄金': 'hkgold',
            '银行账户黄金': 'bank',
            '伦敦金、银': 'london',
        }
        this.setData({
            showType: val.detail.value
        })
        this.getList(param[val.detail.value])
        this.open()
    },

    getList(val) {
        //发起网络请求
        app.api.request(`/gold/${val}?key=${config.key}`).then(res => {
            console.log(res)
            if (res) {
                this.setData({
                    list: val == 'shfutures' ? res.result['黄金'] : res.result,
                    time: app.util.formatTime(new Date())
                })
            }
        })
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