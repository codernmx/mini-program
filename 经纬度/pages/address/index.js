import QQMapWX from '../../assets/libs/qqmap-wx-jssdk'
import config from '../../config/index';
var qqmapsdk = new QQMapWX({
    key: config.mapKey // 必填 // 必填
});
Page({

    data: {
        value: ''
    },


    onLoad(options) {
        this.getAddress('a')
    },
    toIndex(e) {
        const item = e.target.dataset.item
        getApp().globalData.addressInfo = item
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    search(e) {
        console.log(e.detail)
        const keyword = e.detail
        this.getAddress(keyword)
    },
    getAddress(val) {
        qqmapsdk.getSuggestion({
            keyword: val, //用户输入的关键词，可设置固定值,如keyword:'KFC'
            success: (res) => { //搜索成功后的回调
                console.log(res);
                var sug = [];
                for (var i = 0; i < res.data.length; i++) {
                    sug.push({ // 获取返回结果，放到sug数组中
                        title: res.data[i].title,
                        id: res.data[i].id,
                        addr: res.data[i].address,
                        city: res.data[i].city,
                        district: res.data[i].district,
                        latitude: res.data[i].location.lat,
                        longitude: res.data[i].location.lng
                    });
                }
                this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
                    suggestion: sug
                });
            },
            fail: function (error) {
                console.error(error);
            },
            complete: function (res) {
                console.log(res);
            }
        });
    }
})