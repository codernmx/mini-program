import * as echarts from '../../components/ec-canvas/echarts';

function setOption(chart, option) {
    chart.setOption(option);
    wx.hideLoading()
    return chart;
}
Page({
    data: {
        ec: {
            lazyLoad: true
        },
        max: '', //
        total: '',
        stepInfoList: [],
        options: {
            series: [{
                type: 'gauge',
                min: 0,
                max: 10000,
                axisLine: {
                    lineStyle: {
                        width: 30,
                        color: [
                            [0.3, '#67e0e3'],
                            [0.7, '#37a2da'],
                            [1, '#fd666d']
                        ]
                    }
                },
                pointer: {
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    distance: -30,
                    length: 8,
                    lineStyle: {
                        color: '#fff',
                        width: 2
                    }
                },
                splitLine: {
                    distance: -30,
                    length: 30,
                    lineStyle: {
                        color: '#fff',
                        width: 4
                    }
                },
                axisLabel: {
                    color: 'auto',
                    distance: 40,
                    fontSize: 8
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}步',
                    color: 'auto'
                },
                data: [{
                    value: 7000
                }]
            }]
        }
    },

    onLoad: function (options) {
        this.init()
    },
    initChart(dom, options) {
        this.selectComponent(dom).init((canvas, width, height, dpr) => {
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr //解决小程序视图模糊的问题，必写
            });
            setOption(chart, options);
            return chart;
        });
    },
    // 初始化
    init() {
        wx.getSetting({
            success: res => {
                if (!res.authSetting['scope.werun']) {
                    // 授权
                    wx.authorize({
                        scope: 'scope.werun',
                        success: () => {
                            this.getWeRunData()
                        },
                        fail: () => {
                            wx.showModal({
                                title: '获取微信运动数据失败',
                                content: '请在小程序右上角【设置】中开启授权'
                            })
                        }
                    })
                } else {
                    this.getWeRunData()
                }
            }
        })
    },
    getWeRunData() {
        wx.showLoading({
            title: '加载中',
        })
        let _this = this
        wx.getWeRunData({
            success(res) {
                //由于数据是进行加密的所以我们通过条用云函数的方式进行解密
                wx.cloud.callFunction({
                    name: 'getWeRunData',
                    data: {
                        weRunData: wx.cloud.CloudID(res.cloudID) // 这个 CloudID 值到云函数端会被替换
                    }
                }).then(res => {
                    const {
                        stepInfoList
                    } = res.result.data
                    const yesterday = stepInfoList[stepInfoList.length - 1].step
                    console.log(stepInfoList, '运动数据~', yesterday)

                    let temp = []
                    let x = [],
                        y = []
                    stepInfoList.forEach(item => {
                        temp.push(item.step)
                        x.push(new Date(item.timestamp*1000).toLocaleDateString().replace(/\//g,'-'))
                        y.push(item.step)
                    })
                    const max = Math.max(...temp)
                    const total = stepInfoList.reduce(function (prev, cur, index, arr) {
                        return prev + cur.step;
                    }, 0);





                    let options = _this.data.options
                    options.series[0].data[0].value = yesterday

                    _this.setData({
                        options,
                        stepInfoList,
                        max,
                        total
                    })
                    _this.initChart('#mychart-dom-bar', _this.data.options)
                    _this.initChart('#mychart-dom-line', {
                        xAxis: {
                            type: 'category',
                            data: x,
                        },

                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                inside: true, // 刻度标签是否朝内，默认朝外
                                margin: -30, // 刻度标签与轴线之间的距离
                            },
                        },
                        tooltip:{
                            show:true
                        },
                        series: [{
                            data: y,
                            type: 'line',
                            smooth: true,
                            
                        }]
                    })
                })
            }
        })
    },
})