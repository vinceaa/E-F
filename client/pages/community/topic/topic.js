// pages/community/topic/topic.js

const app = getApp()
const log = console.log.bind()

var {
    domain
} = require('../../../config.js');

Page({



    data: {
        shares: '',
        search_text: '',
        domain,
        ifLoading: false,


    },

    // 请求所有的 topic
    onLoad: function (options) {
        console.log('app global data:', app.globalData.userId)
    },

    onShow() {
        this.get_share()
    },

    get_share() {
        const that = this
        const data = {
            share_type: 't',
        }
        wx.request({
            url: `${domain}/share/all`, // 请求 experience 接口
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('请求所有 experience 成功, 这是给出的响应:', res.data)
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

    get_search() {
        const that = this

        const data = {
            content: this.data.search_text,
            share_type: 't',
        }

        log('搜索的标题:', data)

        wx.request({
            url: `${domain}/share/search`,
            data: data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('GET 请求 search topic 成功, 这是给出的响应:', res)
                const data = res.data
                that.setData({
                    shares: data,
                })
            },
            fail: function (res) {
                console.log('GET 请求 search topic 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    inputMethod(e) {
        const that = this
        that.setData({
            search_text: e.detail.value,
        })

        this.get_search()

    },

    goDetail(e) {
        const shareId = e.currentTarget.dataset.id
        console.log('拿到的 topic id 即将跳转:', shareId)
        wx.navigateTo({
            url: `topicdetail/topicdetail?shareId=${shareId}`,
        })
    },


    addMethod() {
        console.log('添加话题按钮被点击')
        wx.navigateTo({
            url: './publish/publish',
        })
    }


})