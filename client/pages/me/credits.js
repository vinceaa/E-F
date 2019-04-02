// pages/me/credits.js
const log = console.log.bind()
const app = getApp()


const {
    domain
} = require('../../config')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        credits: {

        },
        width: '',
        duanwei: '',
        avatar: '',
        score: '',
        username: '',


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
                if (data.avatar == null) {
                    log('还没有授权，因为没有头像', data)
                    this.setData({
                        avatar: '/pages/index/user-unlogin.png',
                    })
                } else {
                    log('已经授权了')
                    that.setData({
                        avatar: data.avatar,
                        username: data.username,
                    })

                }

            },
            fail: function (res) {
                log('get avatar 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    set_avatar() {
        if (app.globalData.userInfo == '') {
            this.setData({
                avatar: '/pages/index/user-unlogin.png',
            })
        }
        this.setData({
            token: app.globalData.token,
            userId: app.globalData.userId,
            avatar: app.globalData.userInfo.avatarUrl,
            username: app.globalData.userInfo.nickName

        })
    },

    get_score() {
        const that = this
        const data = {
            userId: this.data.userId
        }

        wx.request({
            url: `${domain}/user/get_num_info`,
            data,
            header: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                const data = res.data
                that.setData({
                    score: data.score_num,
                    width: data.score_num * 100 / 8000
                    
                })

                const s = data.score_num
                if (s >= 0 && s <= 100) {
                    that.setData({
                        duanwei: '顽强青铜'
                    })
                }
                if (s >= 101 && s <= 300) {
                    that.setData({
                        duanwei: '巧思白银'
                    })
                }
                if (s >= 301 && s <= 600) {
                    that.setData({
                        duanwei: '聪慧黄金'
                    })
                }
                if (s >= 601 && s <= 1200) {
                    that.setData({
                        duanwei: '无限钻石'
                    })
                }
                if (s >= 1201 && s <= 2000) {
                    that.setData({
                        duanwei: '智者大师'
                    })
                }
                if (s >= 2001 && s <= 3000) {
                    that.setData({
                        duanwei: '万卷宗师'
                    })
                }
                if (s >= 3001 && s <= 5000) {
                    that.setData({
                        duanwei: '博学史诗'
                    })
                }
                if (s >= 5001 && s <= 8000) {
                    that.setData({
                        duanwei: '智慧传说'
                    })
                }
                if (s > 8000) {
                    that.setData({
                        duanwei: '超神王者'
                    })
                }
     
            },
            fail: function (res) {
                log('GET 请求 credit 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },


    // GET 请求 credit 
    onLoad: function (options) {
        const that = this
        // this.set_avatar()
        // console.log(options)
        const userId = app.globalData.userId
        this.setData({
            userId,
        })

    },

    onShow() {
        this.check_user()
        this.get_score()
        
    }


})