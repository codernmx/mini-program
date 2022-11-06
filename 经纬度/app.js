import api from './utils/api';
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
                            content: '是否加载新版本应用',
                            success: function (res) {
                                console.log('success====', res)
                                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
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
        userInfo: null,
        addressInfo:{}
    },
    api, //引入api
    util
})


// "van-action-sheet": "./vant-weapp/action-sheet/index",
// 		"van-area": "./vant-weapp/area/index",
// 		"van-button": "./vant-weapp/button/index",
// 		"van-calendar": "./vant-weapp/calendar/index",
// 		"van-card": "./vant-weapp/card/index",
// 		"van-cell": "./vant-weapp/cell/index",
// 		"van-cell-group": "./vant-weapp/cell-group/index",
// 		"van-checkbox": "./vant-weapp/checkbox/index",
// 		"van-checkbox-group": "./vant-weapp/checkbox-group/index",
// 		"van-col": "./vant-weapp/col/index",
// 		"van-count-down": "./vant-weapp/count-down/index",
// 		"van-dialog": "./vant-weapp/dialog/index",
// 		"van-divider": "./vant-weapp/divider/index",
// 		"van-field": "./vant-weapp/field/index",
// 		"van-goods-action": "./vant-weapp/goods-action/index",
// 		"van-goods-action-icon": "./vant-weapp/goods-action-icon/index",
// 		"van-goods-action-button": "./vant-weapp/goods-action-button/index",
// 		"van-icon": "./vant-weapp/icon/index",
// 		"van-image": "./vant-weapp/image/index",
// 		"van-loading": "./vant-weapp/loading/index",
// 		"van-nav-bar": "./vant-weapp/nav-bar/index",
// 		"van-notice-bar": "./vant-weapp/notice-bar/index",
// 		"van-notify": "./vant-weapp/notify/index",
// 		"van-panel": "./vant-weapp/panel/index",
// 		"van-popup": "./vant-weapp/popup/index",
// 		"van-progress": "./vant-weapp/progress/index",
// 		"van-radio": "./vant-weapp/radio/index",
// 		"van-radio-group": "./vant-weapp/radio-group/index",
// 		"van-row": "./vant-weapp/row/index",
// 		"van-search": "./vant-weapp/search/index",
// 		"van-sidebar": "./vant-weapp/sidebar/index",
// 		"van-sidebar-item": "./vant-weapp/sidebar-item/index",
// 		"van-slider": "./vant-weapp/slider/index",
// 		"van-stepper": "./vant-weapp/stepper/index",
// 		"van-steps": "./vant-weapp/steps/index",
// 		"van-sticky": "./vant-weapp/sticky/index",
// 		"van-submit-bar": "./vant-weapp/submit-bar/index",
// 		"van-swipe-cell": "./vant-weapp/swipe-cell/index",
// 		"van-uploader": "./vant-weapp/uploader/index",
// 		"van-switch": "./vant-weapp/switch/index",
// 		"van-tab": "./vant-weapp/tab/index",
// 		"van-tabs": "./vant-weapp/tabs/index",
// 		"van-tabbar": "./vant-weapp/tabbar/index",
// 		"van-tabbar-item": "./vant-weapp/tabbar-item/index",
// 		"van-tag": "./vant-weapp/tag/index",
// 		"van-toast": "./vant-weapp/toast/index",
// 		"van-transition": "./vant-weapp/transition/index",
// 		"van-tree-select": "./vant-weapp/tree-select/index",
// 		"van-datetime-picker": "./vant-weapp/datetime-picker/index",
// 		"van-rate": "./vant-weapp/rate/index",
// 		"van-collapse": "./vant-weapp/collapse/index",
// 		"van-collapse-item": "./vant-weapp/collapse-item/index",
// 		"van-picker": "./vant-weapp/picker/index",
// 		"van-overlay": "./vant-weapp/overlay/index",
// 		"van-circle": "./vant-weapp/circle/index",
// 		"van-index-bar": "./vant-weapp/index-bar/index",
// 		"van-index-anchor": "./vant-weapp/index-anchor/index",
// 		"van-grid": "./vant-weapp/grid/index",
// 		"van-grid-item": "./vant-weapp/grid-item/index",
// 		"van-dropdown-menu": "./vant-weapp/dropdown-menu/index",
// 		"van-dropdown-item": "./vant-weapp/dropdown-item/index",
// 		"van-skeleton": "./vant-weapp/skeleton/index",
// 		"van-empty": "./vant-weapp/empty/index"