const log = console.log.bind()
const app = getApp()


const {
    domain
} = require('../../config')


Page({


    data: {
        userInfo: '',
        me_lista: {
            username: '游客',
            // userinfo: '绽放在冬天的玫瑰',
            avatar: '/pages/index/user-unlogin.png',
        },
        readnum: '',
        thubnum: '',
        score: '',
        userId: '',
        ifHidden: '',
        domain,
        avatar: '/pages/index/user-unlogin.png',
        username: '游客',
        
    
    },


    onLoad() {
        this.setData({
            userId: app.globalData.userId
        })
    },

    onShow() {
        this.check_user()
        this.get_num_info()
    },



    check_user() {
        const that = this
        const data = {
            userId: this.data.userId
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
                if (data.avatar == null || data.avatar == `/pages/index/user-unlogin.png`) {
                    log('还没有授权，因为没有头像', data)
                } else {
                    log('已经授权了')
                    that.setData({
                        avatar: data.avatar,
                        username: data.username,
                        ifHidden: true,
                    })

                }

            },
            fail: function (res) {
                log('get avatar 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo
        })
        const data = {
            userInfo: e.detail.userInfo,
            userId: app.globalData.userId
        }
        this.update_user(data)
    },


    update_user(data) {
        const that = this
        wx.request({
            url: `${domain}/user/save_avatar`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                const data = res.data
                // log('get avatar 成功， 这是给出的响应:', data)
                // log('data.avatar', data.avatar == null)
                if (data.avatar == null) {
                    log('保存头像不成功')
                } else {
                    log('保存头像成功')
                    that.setData({
                        avatar: data.avatar,
                        username: data.username,
                        ifHidden: true,
                    })

                }

            },
            fail: function (res) {
                log('get avatar 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },


    get_num_info() {
        const that = this
        const data = {
            userId: this.data.userId
        }
        log('get_num_info userId:', this.data.userId)
        
        wx.request({
            url: `${domain}/user/get_num_info`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log(' get_num_info 成功， 这是给出的响应:', res.data)
                const data = res.data
                that.setData({
                    score: data.score_num,
                    thubnum: data.thumb_num,
                    readnum: data.views_num,
                })
            },
            fail: function (res) {
                log('get_num_infoavatar 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

})