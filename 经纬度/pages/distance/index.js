import QQMapWX from '../../assets/libs/qqmap-wx-jssdk'
import config from '../../config/index';
const chooseLocation = requirePlugin('chooseLocation');
var qqmapsdk = new QQMapWX({
    key: config.mapKey // 必填 // 必填
});
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: '',
        endInfo: {},
        startInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        /* 获取当前位置 */
        wx.getLocation({
            type: "gcj02",
            // altitude: true,
            success: (res) => {
                console.log(res)
                this.setData({
                    startInfo: {
                        ...res,
                        name: '当前位置'
                    }
                })
            },
            fail: (err) => {
                app.util.toast('稍后在试，勿重复点击~')
            }
        })

    },
    checkDistance() {
        const startInfo = this.data.startInfo
        const endInfo = this.data.endInfo
        var _this = this;
        if (endInfo.name) {
            //调用距离计算接口
            qqmapsdk.calculateDistance({
                mode: 'straight', //可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
                from: startInfo.name == '当前位置' ? '' : {
                    latitude: startInfo.latitude,
                    longitude: startInfo.longitude
                }, //若起点有数据则采用起点坐标，若为空默认当前地址
                to: [{
                    latitude: endInfo.latitude,
                    longitude: endInfo.longitude
                }], //终点坐标
                success: function (res) { //成功后的回调
                    console.log(res);
                    var result = res.result;
                    _this.setData({ //设置并更新distance数据
                        distance: result.elements[0].distance
                    });
                },
                fail: function (error) {
                    console.error(error);
                },
            });
        } else {
            app.util.toast('请先选择终点')
        }
    },
    onShow() {
        const location = chooseLocation.getLocation();
        const flag = this.data.flag
        if (flag == 1 && location != null) {
            this.setData({
                startInfo: location
            })
        }
        if (flag == 2 && location != null) {
            this.setData({
                endInfo: location
            })
        }
    },
    start() {
        this.openMap(1)
    },
    end() {
        this.openMap(2)
    },
    openMap(flag) {
        this.setData({
            flag
        })
        const referer = '测试'; //调用插件的app的名称
        const category = '生活服务,娱乐休闲';
        wx.navigateTo({
            url: `plugin://chooseLocation/index?key=${config.mapKey}&referer=${referer}&category=${category}`
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})