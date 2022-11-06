//index.js
//获取应用实例
const app = getApp()
Page({
  takePhoto() {
    wx.navigateTo({
      url: '/pages/index/index', //跳转到自定义的一个拍照页面
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return{
      title:'哇！这【超级水印相机】拍的好专业！大家都用这个拍照吧！',
      path:'',
      imageUrl:'',
   
    } 
   },
   onShareTimeline() {
    return {
      title: '墙裂推荐：这款最近超火的【超级水印相机】，拍照自动加时间、地点、经纬度，工作生活打卡必备',
      query: ''
    }
  },


  goToPage2: function () {
    wx.navigateTo({
      url: '/pages/jiaocheng/jiaocheng',
    })
  }
})