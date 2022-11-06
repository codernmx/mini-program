/*友情技术指导
  微信:19923756596
*/
App({
    onLaunch: function() {
        wx.cloud.init({
            env: 'cloud1-6g5r1b2z227ba3e1', //填上你的云开发环境id
            traceUser: true,
        })
    },
    globalData: {
        userInfo: null
    }
});