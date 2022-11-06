const config = {
	request: {
		host: 'https://ali-weather.showapi.com',
		header: {
			'Authorization': 'APPCODE ' + 'key'
		},
		// header: { 'Authorization': 'APPCODE ' + 'xxx' },//例子
	},
	txKey: '自己的key展示地图', //腾讯地图key（小程序）
	referer: '今日油价小程序-（开发）'

	// 使用的接口地址（金价/油价查询）
	// https://www.kaifain.com/s/6d23ad5f823e
	// https://www.kaifain.com/s/6d23ad5f8240
}
export default config;