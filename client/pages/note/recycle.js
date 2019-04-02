// pages/note/drafts.js
const app = getApp()

const log = console.log.bind()

const {
    domain
} = require('../../config')


Page({

    data: {
        drafts: '',
        userId: '',
        token: '',
    },

    // GET 请求所有的 draft

    onLoad: function (options) {
        this.setData({
            token: app.globalData.token,
            userId: app.globalData.userId,
        })
    },

    onShow() {
        this.get_note()
    },

    get_note() {
        const that = this
        const data = {
            note_type: 'D',
            userId: this.data.userId,
            token: this.data.token,
        }

        log('data', data)
        wx.request({
            url: `${domain}/note/all`,
            data: data,
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('请求所有的 draft 成功, 这是给出的响应:', res.data)
                that.setData({
                    drafts: res.data
                })

            },
            fail: function (res) {
                console.log('请求所有的 draft 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    // 删除笔记
    deleteNote(e) {
        const that = this
        const user_id = 1
        const note_id = e.currentTarget.dataset.id
        console.log('拿到的 draftId', note_id)
        const data = {
            note_type: 'D',
            userId: this.data.userId,
            token: this.data.token,
            note_id: note_id,
        }
        wx.request({
            url: `${domain}/note/delete`,
            data,
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('请求所有的 draft 成功, 这是给出的响应:', res.data)
                const datas = res.data
                that.setData({
                    drafts: res.data
                })
            },
            fail: function (res) {
                console.log('请求所有的 draft 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },


    show: function (e) {
        const that = this
        wx.showModal({
            title: '提示',
            content: '确认删除',
            success: function (res) {
                if (res.confirm) {
                    that.deleteNote(e)
                    wx.showToast({
                        title: '成功',

                    })
                }
            }
        })
    },



})