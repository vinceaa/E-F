// pages/note/note1.js

const app = getApp()

const log = console.log.bind()

const {
    domain
} = require('../../config')

Page({


    data: {
        title: '',
        text: '',
        token: '',
        userId: '',
    },

    onLoad: function (options) {
        this.setData({
            token: app.globalData.token,
            userId: app.globalData.userId,
        })

    },

    save_note() {

        // 保存比较 post
        const data = {
            userId: this.data.userId,
            note_type: 'N',
            title: this.data.title,
            content: this.data.text,
            token: this.data.token,

        }
        console.log('保存被点击， 这是给后台发送的数据', data)
        wx.request({
            url: `${domain}/note/save`,
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('保存笔记成功， 这是给出的响应', res)
            },
            fail: function (res) {
                console.log('保存笔记失败， 这是给出的响应', res)
            },
            complete: function (res) { },
        })
    },


    inputMethod(e) {
        // console.log('正在输入', e.detail.value)
        this.setData({
            text: e.detail.value,
        })
    },

    inputTitle(e) {
        this.setData({
            title: e.detail.value,
        })
    },





    show: function () {
        const that = this
        wx.showModal({
            title: '提示',
            content: '确认保存',
            success: function (res) {
                if (res.confirm) {
                    that.save_note()

                    wx.showToast({
                        title: '成功',

                    })
                    setTimeout(() => {
                        wx.navigateBack({
                            delta: 2
                        });
                    }, 1000);

                }
            }
        })
    },

})