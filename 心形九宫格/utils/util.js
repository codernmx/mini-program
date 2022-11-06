const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const week = ' 星期' + "日一二三四五六".charAt(date.getDay())
    return `${year} ${[month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}${week}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

// 弹出提示框
function toast(data) {
    wx.showToast({
        title: data,
        icon: 'none',
        duration: 1500,
    })
}
/* 检测输入文字是否违规 */
function checkMsg(content) {
    // wx.showLoading({
    //     title: "内容检测中"
    // });
    return new Promise((resolve, reject) => {
        resolve(true)
        // wx.cloud.callFunction({
        //     name: 'msgSecCheck',
        //     data: {
        //         content,
        //     },
        // }).then(res => {
        //     wx.hideLoading();
        //     let result = res.result
        //     console.log(result, '检测结果~~')
        //     if (result.errCode != 0) {
        //         resolve(false)
        //     } else {
        //         resolve(true)
        //     }
        // }).catch(err => {
        //     console.log(err, '检测文字抛出的异常~~')
        //     reject('检测失败，请重试')
        //     wx.hideLoading();
        // })
    })
}
/* 检测文件是否违规 // verison 1.0 */
function checkFile(mediaUrl) {
    // wx.showLoading({
    //     title: "检测中"
    // });
    return new Promise((resolve, reject) => {
        resolve(true) //目前没开云环境 不需要检测
        // wx.cloud.callFunction({ //调用图片检测云函数
        //     name: 'imgSecCheck',
        //     data: {
        //         imgData: wx.cloud.CDN({
        //             type: 'filePath',
        //             filePath: mediaUrl, // img 是你的临时文件的路径 eg: http://tmp/PIyID5dIdjc1024e6ee2d57f86591545056c0a6f4b986f.png
        //         })
        //     }
        // }).then(res => {
        //     wx.hideLoading();
        //     let result = res.result
        //     console.log(result, '检测结果新版本~~', res)
        //     if (result.errCode != 0) {
        //         if (result.errCode == '-604102') {
        //             reject(result.errMsg)
        //         } else {
        //             resolve(false)
        //         }
        //     } else { // 0为检测通过
        //         resolve(true)
        //     }
        // }).catch(err => {
        //     console.log(err, '检测文件抛出的异常~')
        //     reject('当前图片检测失败，请更换图片重试~')
        //     wx.hideLoading();
        // })
    })
}
module.exports = {
    formatTime,
    toast,
    checkFile,
    checkMsg
}