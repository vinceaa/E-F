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
    },

    onLoad: function (options) {
        log('拿到单词:', options.word)
        this.setData({
            word: options.word,
            token: app.globalData.token,
            userId: app.globalData.userId,
        })
    },

    go_creat() {
        const data = {
            userId: this.data.userId,
            token: this.data.token,
            word: this.data.word,
            content: this.data.content,
        }
        log('data:', data)
        wx.request({
            url: `${domain}/terms/add`,
            data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                log('terms add 成功, 这是给出的响应:', res.data)
            },
            fail: function(res) {
                log('terms add 失败, 这是给出的响应:', res)
            },
            complete: function(res) {},
        })
    },

    update_score(score_type) {
        const that = this
        const data = {
            userId: this.data.userId,
            score_type,
        }
        wx.request({
            url: `${domain}/score/update`,
            data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('更新积分成功，这是给出的响应:', res.data)
            },
            fail: function (res) {
                console.log('更新积分失败，这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    creatMethod() {
        log('创建按钮被点击')
        this.go_creat()
        this.update_score('terms')
        wx.showToast({
            title: '成功',
        })
        setTimeout(() => {
            wx.navigateBack({
                delta: 1
            });
        }, 1000);
    },

    infoInput(e) {
        this.setData({
            content: e.detail.value
        })
    }


})