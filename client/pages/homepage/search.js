var md5 = require('../../utils/md5');
var config = require('../../config.js');
const rm = wx.getRecorderManager();
const iac = wx.createInnerAudioContext();

var app = getApp();

const {
    domain
} = require('../../config')

const log = console.log.bind()

Page({

    /**
     * 页面的初始数据
     */
    //md5('39ba9dc60b3dec2c' + '你好' + (new Date).getTime() + 'PpMrV7Sq6WUR6R6EIRztdSwvfxyGy76O')
    data: {
        appKey: '39ba9dc60b3dec2c',
        key: 'PpMrV7Sq6WUR6R6EIRztdSwvfxyGy76O',
        salt: (new Date).getTime(),
        query: '',
        from: '',
        to: '',
        showmore: false,//用户分享
        showmy: false,//我的分享
        myrecord: false,//我的发音
        onrecord: false,//正在录音
        showrecord: false,//用户发音
        path: '',
        records: [],
        userId: '',
        token: '',
        info: '',
        ifHidden: true,
    },
    infoInput: function (e) {
        this.data.query = e.detail.value//设置翻译内容
    },

    onLoad() {
        this.setData({
            userId: app.globalData.userId,
            token: app.globalData.token,
        })
    },

    save_word(word_string) {
        const data = {
            userId: this.data.userId,
            token: this.data.token,
            word_string: word_string,
            word: this.data.query,
        }
        wx.request({
            url: `${domain}/word/save`,
            data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                log('save word 成功, 这是给出的响应:', res.data)
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },

    creatTerms() {
        log('创建词条按钮被点击:', this.data.query)
        if (this.data.query.length > 0) {
            wx.navigateTo({
                url: `terms?word=${this.data.query}`,
            })
        }
    },

    lookTerms() {
        log('查看词条按钮点击')
        wx.navigateTo({
            url: `then?word=${this.data.query}&info=${this.data.info}`,
        })
    },

    fy() {
        var that = this
        if (this.data.query != null && this.data.query != '') {
            let sign = md5(this.data.appKey + this.data.query + this.data.salt + this.data.key);
            wx.request({
                url: 'http://openapi.youdao.com/api', //仅为示例，并非真实的接口地址
                method: 'POST',
                data: {
                    q: that.data.query,
                    appKey: that.data.appKey,
                    salt: that.data.salt,
                    from: that.data.from,
                    to: that.data.to,
                    sign: sign,
                    usertran: [],
                    mytran: []
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
                },
                success: (res) => {
                    console.log('有道返回的结果:', res.data)

                    const word_string = JSON.stringify(res.data)

                    console.log(res.data.translation[0])
                    // this.setData({ query: res.data.translation[0]})
                    if (res.data.hasOwnProperty('basic')) {
                        that.save_word(word_string)
                        log('需要名词:', res.data.basic.explains[0])
                        that.setData({
                            info: res.data.basic.explains[0],
                        })
                        that.setData({ result: res.data.basic })
                        that.setData({ explain: res.data.basic.explains })
                    }
                    else {
                        that.save_word(this.data.query)
                        that.setData({ ifHidden: false })
                        that.setData({ explain: null })
                        that.setData({ result: { phonetic: null } })
                    }
                    that.setData({ trans: res.data.translation })
                    if (app.globalData.session) {
                        wx.request({
                            url: config.service.host + '/Share/getmyrecord',
                            data: {
                                userId: app.globalData.userId,
                                word: that.data.query
                            },
                            method: 'GET',
                            success: function (rec) {
                                if (rec.data.length != 0) {
                                    that.setData({
                                        myrecord: true,
                                        path: rec.data[0].record_src
                                    })
                                } else {
                                    that.setData({
                                        myrecord: false,
                                        path: ''
                                    })
                                }
                                console.log(rec.data)
                                console.log(that.data.path)
                            }
                        })
                    }
                }
            })
        }
    },

    translate: function () {
        const that = this
        wx.navigateTo({
            url: 'translate?word=' + that.data.query,
        })
    },

    onFoldShow: function () {
        var that = this
        that.setData({
            showmore: false
        })
    },

    onShowMy: function () {
        var that = this
        if (app.globalData.session) {
            wx.request({
                url: config.service.host + '/Share/getmytranslation',
                data: {
                    word: that.data.query,
                    userId: app.globalData.userId
                },
                method: 'GET',
                success: function (res) {
                    that.setData({
                        showmy: true,
                        mytran: res.data
                    })
                    console.log(res.data)
                },
                fail: function () {

                }
            })
        } else {
            wx.showModal({
                title: '登录提示',
                content: '您当前未登录，请登录后查看',
                confirmText: '前往登录',
                cancelText: '暂不登录',
                success: function (res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '../me/me',
                            complete: function () {
                                console.log("跳转登录")
                            }
                        })
                    }
                }
            })
        }
    },

    onFoldMy: function () {
        var that = this
        that.setData({
            showmy: false
        })
    },

    onShowMore: function () {
        var that = this
        if (app.globalData.session) {
            wx.request({
                url: config.service.host + '/Share/gettranslation',
                data: {
                    word: that.data.query,
                    userId: app.globalData.userId
                },
                method: 'GET',
                success: function (res) {
                    that.setData({
                        showmore: true,
                        usertran: res.data
                    })
                    console.log(res.data)
                },
                fail: function () {

                }
            })
        } else {
            wx.showModal({
                title: '登录提示',
                content: '您当前未登录，请登录后查看',
                confirmText: '前往登录',
                cancelText: '暂不登录',
                success: function (res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '../me/me',
                            complete: function () {
                                console.log("跳转登录")
                            }
                        })
                    }
                }
            })
        }
    },

    onRecordMy: function () {
        if (app.globalData.session) {
            const options = {
                duration: 10000,//指定录音的时长，单位 ms
                sampleRate: 16000,//采样率
                numberOfChannels: 1,//录音通道数
                encodeBitRate: 96000,//编码码率
                format: 'mp3',//音频格式，有效值 aac/mp3
                frameSize: 50,//指定帧大小，单位 KB
            }
            var that = this
            rm.start(options)
            rm.onStart(() => {
                that.setData({
                    onrecord: true
                })
            })
            rm.onError((res) => {
                console.log(res)
                that.setData({
                    onrecord: false
                })
            })
        } else {
            wx.showModal({
                title: '登录提示',
                content: '您当前未登录，请登录后查看',
                confirmText: '前往登录',
                cancelText: '暂不登录',
                success: function (res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '../me/me',
                            complete: function () {
                                console.log("跳转登录")
                            }
                        })
                    }
                }
            })
        }
    },

    onRecordStop: function () {
        var that = this
        rm.stop()
        rm.onStop((res) => {
            wx.uploadFile({
                url: config.service.host + '/Share/receiverecord',
                filePath: res.tempFilePath,
                name: 'record',
                formData: {
                    word: that.data.query,
                    userId: app.globalData.userId
                },
                success: function (ress) {
                    console.log('upload' + ress.data)
                    wx.request({
                        url: config.service.host + '/Share/storerecord',
                        data: {
                            userId: app.globalData.userId,
                            path: './uploads/' + that.data.query + app.globalData.userId + '.mp3',
                            word: that.data.query
                        },
                        method: 'GET',
                        success: function (result) {
                            console.log(result.data)
                            that.setData({
                                myrecord: true
                            })
                        }
                    })
                },
                fail: function (ress) {
                    console.log('fail')
                    console.log(ress)
                }
            })
            that.setData({
                onrecord: false
            })
        })
    },

    onListenRecord: function () {
        var that = this
        if (that.data.path == "") {
            wx.request({
                url: config.service.host + '/Share/getmyrecord',
                data: {
                    userId: app.globalData.userId,
                    word: that.data.query
                },
                method: 'GET',
                success: function (rec) {
                    if (rec.data.length != 0) {
                        that.setData({
                            path: rec.data[0].record_src
                        })
                    }
                    wx.downloadFile({
                        url: config.service.host + '/Share/downloadrecord?path=' + that.data.path,
                        success: function (res) {
                            iac.src = res.tempFilePath
                            console.log(iac.src)
                            console.log(res.statusCode)
                        },
                        fail: function (r) {
                            console.log(r)
                        }
                    })
                    console.log(that.data.path)
                }
            })
        } else {
            wx.downloadFile({
                url: config.service.host + '/Share/downloadrecord?path=' + that.data.path,
                success: function (res) {
                    iac.src = res.tempFilePath
                    console.log(iac.src)
                    console.log(res.statusCode)
                },
                fail: function (r) {
                    console.log(r)
                }
            })
        }
        //iac.src=that.data.path
        iac.play()
        iac.onPlay(() => {
            console.log('播放发音')
        })
        iac.onError((res) => {
            console.log(res)
            console.log(res.errCode)
        })
    },

    onShowRecord: function () {
        var that = this
        if (app.globalData.session) {
            wx.request({
                url: config.service.host + '/Share/getallrecord',
                data: {
                    word: that.data.query,
                    userId: app.globalData.userId
                },
                success: function (res) {
                    that.setData({
                        showrecord: true,
                        records: res.data
                    })
                    console.log(res.data)
                    console.log(that.data.records)
                }
            })
        } else {
            wx.showModal({
                title: '登录提示',
                content: '您当前未登录，请登录后查看',
                confirmText: '前往登录',
                cancelText: '暂不登录',
                success: function (res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '../me/me',
                            complete: function () {
                                console.log("跳转登录")
                            }
                        })
                    }
                }
            })
        }
    },

    onFoldRecord: function () {
        var that = this
        that.setData({
            showrecord: false
        })
    },

    onListenUserRecord: function (e) {
        var that = this
        wx.downloadFile({
            url: config.service.host + '/Share/downloadrecord?path=' + that.data.records[e.currentTarget.dataset.index].record_src,
            success: function (res) {
                iac.src = res.tempFilePath
                console.log(iac.src)
                console.log(res.statusCode)
            },
            fail: function (r) {
                console.log(r)
            }
        })
        iac.play()
        iac.onPlay(() => {
            console.log('播放发音')
        })
        iac.onError((res) => {
            console.log(res)
            console.log(res.errCode)
        })
    },


})