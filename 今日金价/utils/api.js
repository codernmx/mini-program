var baseUrl = "binstd.apistd.com";
// var baseUrl = "127.0.0.1:5002";
/**
 * @param {String} url 请求地址
 * @param {Object} data 请求数据
 * @param {String} method 请求方式
 */
const request = (url, data = null, method = 'POST') => {
    // 加载动画
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    const _url = `https://${baseUrl}${url}`;
    const _token = getApp().globalData.token

    // GET请求方式x-www-form-urlencoded, 其他请求方式json
    const _header = {
        'Content-Type': `application/${method === 'GET' ? 'x-www-form-urlencoded' : 'json'}`,
        'Authorization': `Bearer ${_token}`
    };

    return new Promise((resolve, reject) => {
        wx.request({
            url: _url,
            method,
            data,
            header: _header,
            success: res => {
                // 影藏加载动画
                wx.hideLoading()
                if (res.statusCode === 200 && res.data.status === 0) {
                    resolve(res.data);
                } else {
                    getApp().util.toast('接口错误')
                    resolve(null);
                }
            },
            fail: err => {
                wx.hideLoading()
                reject(err);
            },
            complete: res => {
                // 加载完成
            }
        });
    });
};

export default {
    baseUrl,
    request
};