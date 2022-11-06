import QQMapWX from '../../assets/libs/qqmap-wx-jssdk'
import config from '../../config/config';

Page({
	data: {
		keyword: '加油站',
		latitude: null,
		longitude: null,
		markList: [], //点的列表
		navConfig: {
			"1": '附近加油站',
			"2": '附近厕所',
			"3": '附近停车场',
			"5": '附近景点',
			"6": '附近超市',
			"7": '附近公交站',
			"8": '附近医院',
			"9": '附近电影院',
		},
		keywordConfig: {
			"1": '加油站',
			"2": '厕所',
			"3": '停车场',
			"5": '景点',
			"6": '超市',
			"7": '公交站',
			"8": '医院',
			"9": '电影院',
		}
	},
	// 生命周期函数--监听页面加载
	onLoad: function (options) {
		const _this = this
		const flag = 1
		this.setData({
			keyword: this.data.keywordConfig[flag]
		})
		wx.setNavigationBarTitle({
			title: this.data.navConfig[flag]
		})
		wx.getLocation({
			type: 'wgs84',
			isHighAccuracy: true,
			success(res) {
				_this.setData({
					latitude: res.latitude,
					longitude: res.longitude
				})
				_this.getLocationInfo()
			}
		})
	},
	getLocationInfo() {
		// 引入SDK核心类// 实例化API核心类
		var qqmapsdk = new QQMapWX({
			key: config.txKey // 必填
		})
		var _this = this;
		// 调用接口
		const center = `${this.data.latitude},${this.data.longitude}`
		qqmapsdk.search({
			keyword: this.data.keyword, //搜索关键词
			location: center, //中心点
			page_size: 20, //一页数据
			success: function (res) { //搜索成功后的回调
				//存储获取到的点
				_this.setData({
					markList: res.data
				})
				var mks = []
				for (var i = 0; i < res.data.length; i++) {
					mks.push({ // 获取返回结果，放到mks数组中
						title: res.data[i].title,
						id: res.data[i].id,
						latitude: res.data[i].location.lat,
						longitude: res.data[i].location.lng,
						iconPath: "../../assets/imgs/swiper/marker.png", //图标路径
						width: 30,
						height: 30
					})
				}
				_this.setData({ //将搜索结果显示在地图中
					markers: mks
				})
			},
			fail: function (res) {
				console.log(res);
			},
			complete: function (res) {
				console.log(res);
			}
		});
	},
	//打开地图app
	openMapApp: function (event) {
		const info = event.currentTarget.dataset.item
		wx.openLocation({
			latitude: info.location.lat,
			longitude: info.location.lng,
			name: info.title,
			scale: 18
		})
	},
})