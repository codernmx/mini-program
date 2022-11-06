import utils from "../utils/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 参数作用可以参考photo
    prevPosition: [0, 0],
    btnInfo: [
      {
        type: 'width',
        background: 'url("https://bt.nmxgzs.cn/upload/2022-06-30/upETPc.png"); background-size: 30px 30px;'
      },
      {
        type: 'color',
        background: 'url("https://bt.nmxgzs.cn/upload/2022-06-30/YloCVl.png") white no-repeat; background-size: 24px 24px;background-position: 3px 3px;'
      },
      {
        type: 'clear',
        background: 'url("https://bt.nmxgzs.cn/upload/2022-06-30/5CZwmx.png") white no-repeat; background-size: 20px 20px;background-position: 5px 5px;'
      },
      {
        type: 'save',
        background: 'url("https://bt.nmxgzs.cn/upload/2022-06-30/ONsfbx.png") white no-repeat; background-size: 20px 20px;background-position: 5px 5px;'
      }
    ],
    width: false,
    color: false,
    clear: false,
    r: 33,
    g: 33,
    b: 33,
    w: 10,
    eraser: false,
    canvasHeight: 50, // 其实这个是操作栏的高度，不是canvas的高度。。直接使用100vh，因此不需要读取设备的宽高
    scope: false, // 是否获得权限
    saving: false, // 是否保存中
    pageType: 'whiteBoard',
    bgColor: 'white',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 确定页面类型（普通的白板涂鸦和荧光涂鸦）
    const tempObj = {
      bgColor: options.pageType === 'whiteBoard' ? 'white' : 'black',
      pageType: options.pageType,
    }
    if (options.pageType === 'highlighter') {
      tempObj.r = 255;
      tempObj.g = 255;
      tempObj.b = 255;
    }
    this.setData({
      ...tempObj
    })
    // 建立空白页并检查权限（如果非填充空白会发现保存为透明）
    let ctx = wx.createCanvasContext('myCanvas');
    ctx.rect(0, 0, 10000, 10000);
    ctx.setFillStyle(tempObj.bgColor);
    ctx.fill();
    ctx.draw();
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.setData({
            scope: true,
          })
        }
      }
    })
  },

  touchStart: function (e) {
    this.setData({
      color: false,
      width: false,
      clear: false,
      canvasHeight: 50,
      prevPosition: [e.touches[0].x, e.touches[0].y],
    })
  },

  touchMove: function (e) {
    const { r, g, b } = this.data;
    // 触摸，绘制中。。
    let ctx = wx.createCanvasContext('myCanvas');

    if (!this.data.eraser) {
      ctx.setStrokeStyle(`rgb(${r},${g},${b})`);
      if (this.data.pageType === 'highlighter') {
        ctx.setShadow(0, 0, 30, `rgba(${r},${g},${b},0.6)`);
      }
      ctx.setLineWidth(this.data.w);
    } else {
      ctx.setStrokeStyle(this.data.bgColor);
      ctx.setShadow(0, 0, 0, 'black');
      ctx.setLineWidth(20);
    }
    ctx.setLineCap('round');
    ctx.setLineJoin('round');
    ctx.moveTo(this.data.prevPosition[0], this.data.prevPosition[1]);
    ctx.lineTo(e.touches[0].x, e.touches[0].y);
    ctx.stroke();
    ctx.draw(true);

    this.setData({
      prevPosition: [e.touches[0].x, e.touches[0].y]
    })
  },

  tapBtn: function (e) {
    utils.tapBtn(e, this, 1);
  },
  // 修改画笔颜色
  changeColor: function (e) {
    utils.changeColor(e, this);
  },
  // 修改画笔宽度
  changeWidth: function (e) {
    utils.changeWidth(e, this, 130 + e.detail.value, 1)
  },

  clearCanvas: function () {
    // 重置
    let ctx = wx.createCanvasContext('myCanvas');
    ctx.rect(0, 0, 500, 800);
    ctx.setFillStyle(this.data.bgColor);
    ctx.fill();
    ctx.draw();
    this.setData({
      clear: false,
      canvasHeight: 50
    })
  },

  chooseEraser: function () {
    // 橡皮擦(其实为白色覆盖涂鸦)
    this.setData({
      eraser: !this.data.eraser,
      clear: false,
      canvasHeight: 50
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})