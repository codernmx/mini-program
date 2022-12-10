var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
    key: '你自己的腾讯地图key'
});
let totalTime = null
Page({
    data: {
        countDownNum: 5,
        showDown: false,
        timer: '', //定时器
        second: 0,
        distance: 0,
        calories: 0,
        kmH: 0,
        status: '',
        point: []
    },
    onLoad(options) {},
    getDistance({
        latitude,
        longitude
    }) {
        let _this = this
        let point = this.data.point
        point.push({
            latitude,
            longitude
        })
        if (point.length > 0) {
            qqmapsdk.calculateDistance({
                //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
                from: `${point[0].latitude},${point[0].longitude}`,
                to: `${latitude},${longitude}`, //终点坐标
                success: function (res) { //成功后的回调
                    console.log(res, '距离');
                    const {
                        distance
                    } = res.result.elements[0]
                    let second = _this.data.second === 0 ? 1 : _this.data.second
                    _this.setData({
                        distance: distance / 1000,
                        calories: (distance * 0.7).toFixed(2),
                        kmH: (distance / (1000 * (second / 3600))).toFixed(2)
                    })
                },
                fail: function (error) {
                    console.error(error);
                },
                complete: function (res) {
                    console.log(res);
                }
            });
        }
    },
    location() {
        const _this = this
        let _locationChangeFn = function (res) {
            const {
                latitude,
                longitude
            } = res
            console.log(res, '位置变化');
            //计算距离的方法调用建议写这
            _this.getDistance({
                latitude,
                longitude
            })
        }
        wx.startLocationUpdate({
            success: (res) => {
                wx.onLocationChange(_locationChangeFn)
            },
            fail: (err) => {
                // 重新获取位置权限
                wx.openSetting({
                    success(res) {
                        res.authSetting = {
                            "scope.userLocation": true
                        }
                    }
                })
                console.log(err)
            }
        })
    },
    start() {
        let second = this.data.second
        this.setData({
            status: '执行中'
        })

        this.location()
        totalTime = setInterval(() => {
            second++
            this.setData({
                second
            })
        }, 1000)
    },
    pause() {
        this.setData({
            status: '暂停'
        })
        clearInterval(totalTime);
        wx.onLocationChange()
    },
    stop() {
        this.setData({
            status: '',
            second: 0,
            point: [],
            distance: 0,
            calories: 0,
            kmH: 0
        })
        wx.onLocationChange()
    },
    countDown: function () { //定时器
        let _this = this;
        let countDownNum = 5; //获取倒计时初始值 
        _this.setData({
            countDownNum,
            showDown: true
        })
        _this.setData({
            timer: setInterval(function () {
                countDownNum--;
                _this.setData({
                    countDownNum
                })
                if (countDownNum == 0) {
                    clearInterval(_this.data.timer);
                    //关闭定时器之后，可作其他处理     
                    _this.setData({
                        countDownNum: 'GO'
                    })
                    setTimeout(() => {
                        _this.setData({
                            showDown: false,
                        })
                        //开始
                        _this.start()
                    }, 1000)
                }
            }, 1000)

        })
    },
    onShareAppMessage() {
        const path = `/pages/run/index`
        return {
            title: '试试？',
            path,
        };
    },
    onShareTimeline() {
        const path = `/pages/run/index`
        return {
            title: '试试？',
            path,
        };
    }
})