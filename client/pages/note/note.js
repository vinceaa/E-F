const app = getApp()

const log = console.log.bind()

const {
    domain
} = require('../../config')


Page({


    data: {
        avatar: '/pages/index/user-unlogin.png',
        num_list: '',
        domain,
        userId: '',
    },

    onLoad: function (options) {
        this.setData({
            userId: app.globalData.userId,
            token: app.globalData.token,
        })
    },

    onShow() {
        this.check_user()
        this.get_nums()
    },

    check_user() {
        const that = this
        const data = {
            userId: this.data.userId,
        }
        wx.request({
            url: `${domain}/user/get_avatar`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                const data = res.data
                if (data.avatar == null) {
                    log('还没有授权，因为没有头像', data)
                } else {
                    log('已经授权了')
                    that.setData({
                        avatar: data.avatar,
                    })

                }

            },
            fail: function (res) {
                log('get avatar 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    get_nums() {
        const that = this
        const data = {
            userId: this.data.userId,
            token: this.data.token,
        }

        wx.request({
            url: `${domain}/note/num`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('请求 note 页数目成功，这是给出的响应:', res.data)
                that.setData({
                    num_list: res.data
                })
            },
            fail: function (res) {
                console.log('请求 note 页数目失败，这是给出的响应:', res)

            },
            complete: function (res) { },
        })
    },

    goHistory() {
        //   console.log('历史记录被点击')
        wx.navigateTo({
            url: 'more',
        })
    },

    goRecycle() {
        wx.navigateTo({
            url: 'recycle',
        })
    },

    goDraft() {
        wx.navigateTo({
            url: 'drafts',
        })
    },

    goNote() {
        wx.navigateTo({
            url: 'note1',
        })
    },
})