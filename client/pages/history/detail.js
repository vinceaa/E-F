
var app = getApp();

const {
    domain
} = require('../../config')

const log = console.log.bind()


Page({

   
    data: {
        wordId: '',
        userId: '',
        content: '',
        token: '',
    },



    onLoad: function (options) {
        const that = this
        that.setData({
            wordId: options.word_id,
            userId: app.globalData.userId,
            token: app.globalData.token,
        })


    },

    onShow() {
        this.get_detail()
    },


    parse_word(d) {
        const e = d
        const that = this
        const dicta = {}
        dicta.word_id = e.word_id
        dicta.user_id = e.user_id
        dicta.word = e.word
        dicta.word_date = e.word_date
        dicta.word_string = JSON.parse(e.word_string)
        return dicta
    },



    get_detail() {
        const that = this
        const data = {
            userId: this.data.userId,
            token: this.data.token,
            wordId: this.data.wordId,
        }

        log('准备发送的数据:', data)
        wx.request({
            url: `${domain}/word/detail`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('GET 请求 history 成功, 这是给出的响应:', res.data)
                const data = res.data
                if (data.word_string != data.word) {
                    var parse_result = that.parse_word(res.data)
                } else {
                    var parse_result = res.data
                    
                }
                log('parse:', parse_result)
                that.setData({
                    historys: parse_result
                })


            },
            fail: function (res) {
                console.log('GET 请求 history 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    }

})