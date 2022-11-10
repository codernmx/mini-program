const config = {
	request: {
		host: 'https://ali-weather.showapi.com',
		header: {
			'Authorization': 'APPCODE ' + '你自己的key'
			//示例： 'Authorization': 'APPCODE ' + '76447eef09864d72a68231ae56561cb'
		},
		// 上边header是天气接口配置key
		// 地址 https://market.aliyun.com/products/57096001/cmapi010812.html?spm=5176.2020520132.101.7.12fa72187U1HTP#sku=yuncode481200005
		// 拿到阿里控制台的appcode
		// 登录部分需要些许修改 可不用云开
	},
	txKey: '改为你自己的key', //腾讯地图key（小程序）
	// 示例: 'FIQBZ-MDF6X-42543-TXX55-UEGI2-XXXXX', //腾讯地图key（小程序）
	referer: ''
}
export default config;