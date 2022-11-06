import util from './utils/util';
App({
    onLaunch() {
        //更新检测
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                if (res.hasUpdate) { //有新版本
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            showCancel: false,
                            confirmText: '好的，我知道了',
                            content: '新版本已经上线啦~',
                            success: function (res) {
                                console.log('success====', res)
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function () {
                        wx.showModal({ // 新的版本下载失败 给提示
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                        })
                    })
                }
            })
        }
    },
    globalData: {
        userInfo: null
    },
    util
})