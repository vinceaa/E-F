
var app = getApp();

const {
    domain
} = require('../../config')

const log = console.log.bind()


Page({

    data: {
        historys: '',
        userId: '',
        token: '',
    },

    // 请求所有的 history


    onLoad: function (options) {
        this.setData({
            userId: app.globalData.userId,
            token: app.globalData.token,
        })
    },

    onShow() {
        this.get_history()
    },


    parse_word(lista) {
        const that = this
        const new_lista = []
        lista.forEach((e) => {
            const dicta = {}
            dicta.word_id = e.word_id
            dicta.user_id = e.user_id
            dicta.word = e.word
            dicta.word_date = e.word_date
            if (e.word_string == e.word) {
                dicta.word_string = e.word_string
            } else {
                dicta.word_string = JSON.parse(e.word_string)
            }
            new_lista.push(dicta)
        })
        return new_lista
    },

    goDetail(e) {
        const word_id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `../history/detail?word_id=${word_id}`,
        })
    },


    get_history() {
        const that = this
        const data = {
            userId: this.data.userId,
            token: this.data.token,
        }
        wx.request({
            url: `${domain}/word/all`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('GET 请求 history 成功, 这是给出的响应:', res.data)
                const data = res.data
                const word_string = data[0].word_string
                // log('word_string:', JSON.parse(word_string))
                const parse_result = that.parse_word(res.data)
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