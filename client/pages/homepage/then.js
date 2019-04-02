var app = getApp();

const {
    domain
} = require('../../config')

const log = console.log.bind()

Page({

    data: {
        word: '',
        content: '',
        token: '',
        userId: '',
        term_list: '',
        info: '',
    },

    onLoad: function (options) {
        log('拿到单词:', options.word)
        this.setData({
            word: options.word,
            info: options.info,
            token: app.globalData.token,
            userId: app.globalData.userId,
        })
    },

    onShow() {
        this.get_terms()
    },

    get_terms() {


        const data = {
            userId: this.data.userId,
            token: this.data.token,
            word: this.data.word,
        }

        const that = this
        wx.request({
            url: `${domain}/terms/all`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                log('get terms 成功, 这是给出的响应:', res.data)
                that.setData({
                    term_list: res.data,
                })
            },
            fail: function(res) {
                log('get terms 成功, 这是给出的响应:')
            },
            complete: function(res) {},
        })
    },





})