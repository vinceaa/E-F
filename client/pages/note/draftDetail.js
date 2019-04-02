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
        noteId: '',
    },

    // GET 请求所有的 draft

    onLoad: function (options) {
        this.setData({
            token: app.globalData.token,
            userId: app.globalData.userId,
            noteId: options.note_id,
        })
    },

    onShow() {
        this.get_note()
    },

    get_note() {
        const that = this
        const data = {
            note_type: 'N',
            userId: this.data.userId,
            token: this.data.token,
            noteId: this.data.noteId,
        }

        wx.request({
            url: `${domain}/note/detail`,
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

    goDetail(e) {
        const note_id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `draftDetail?note_id=${note_id}`,
        })
    },

    // 删除笔记
    deleteNote(e) {
        const that = this
        const user_id = 1
        const note_id = e.currentTarget.dataset.id
        console.log('拿到的 draftId', note_id)
        const data = {
            note_type: 'N',
            userId: this.data.userId,
            token: this.data.token,
            note_id: note_id,
        }
        wx.request({
            url: `${domain}/note/update`,
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




})