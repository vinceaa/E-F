
// pages/wxml/index.js

const app = getApp()

const {
    domain
} = require('../../config')

const log = console.log.bind()


Page({
    data: {
        ifHidden: true,
        shares: '',
        token: '',
        imgUrls: [],
        userId: '',
        domain: domain,
        ifLoading: false,


    },


    onLoad: function (options) {
        setTimeout(() => {
            this.setData({
                userId: app.globalData.userId,
                token: app.globalData.token,
            })
            log('我的 id 是:', app.globalData.userId)
            // if (this.data.userId == 6) {
            const admin_list = ['6', '7', '8', '9']
            if (admin_list.includes(this.data.userId)) {
                this.setData({
                    ifHidden: false,
                })
            }
            log('this.data', this.data)

        }, 2000)
    },

    get_slide() {
        const that = this
        const data = {
            slide_type: 'h'
        }
        wx.request({
            url: `${domain}/share/get_slide_home`, // 请求 experience 接口
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('请求所有 轮播 成功, 这是给出的响应:', res.data.length)
                const pics = res.data.home_pic
                if (res.data.length == 0) {
                    var pic_lis = []
                    log('为0', pic_lis)
                } else {
                    var pic_list = pics.split('+++').slice(0, -1)
                    log('不为0', pic_lis)
                    that.setData({
                        imgUrls: pic_list,
                    })
                }
                log('pic_list', pic_list)



            },
            fail: function (res) {
                log('请求所有 experience 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    onShow() {
        this.get_share()
        this.get_slide()
    },

    get_share() {
        const that = this
        const data = {
            share_type: 'a',
        }
        wx.request({
            url: `${domain}/share/all`, // 请求 experience 接口
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                // log('请求所有 experience 成功, 这是给出的响应:', res.data)
                const data = res.data
                that.setData({
                    shares: data,
                    ifLoading: true,
                })
            },
            fail: function (res) {
                log('请求所有 experience 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    goPubish() {
        log('被点击, 进入推荐页面:', this.data)
        wx.navigateTo({
            url: 'adminPublish',
        })
    },

    goEdit(share_id) {
        wx.navigateTo({
            url: `adminEdit?shareId=${share_id}`,
        })
    },


    goDelete(share_id) {
        const that = this

        const userId = this.data.userId

        const data = {
            userId: userId,
            token: this.data.token,
            share_id: share_id,
        }


        wx.request({
            url: `${domain}/share/delete`,   //新增话题接口
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('delete 话题请求成功, 这是给出的响应:', res.data)
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                })
                that.get_share()

            },
            fail: function (res) {
                log('delete 请求失败, 这是给出的响应:', res.data)
            },
            complete: function (res) { },
        })
    },

    editMethod(e) {
        const share_id = e.currentTarget.dataset.id
        this.goEdit(share_id)
        log('编辑按钮被点击', share_id)
    },

    deleteMethod(e) {
        const share_id = e.currentTarget.dataset.id
        this.goDelete(share_id)
        log('删除按钮被点击', share_id)
    },

})