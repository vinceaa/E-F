const log = console.log.bind()
var {
    domain
} = require('../../config.js');

const app = getApp()

Page({


    data: {
        shares: '',
        imgUrls: [
            // 'http://p1.so.qhimgs1.com/bdr/_240_/t014cf805190e996fb1.jpg',
            // 'http://p2.so.qhimgs1.com/bdr/_240_/t01e3b9706991fa98b2.jpg',
            // 'http://pic1.win4000.com/wallpaper/7/5989166ce7872.jpg',
            // 'http://p1.so.qhimgs1.com/bdr/_240_/t010fe407a5d9ca906d.jpg'
        ],
        domain,
        ifLoading: false,


    },

    onLoad: function (options) {
    },


    onShow() {
        this.get_share()
        this.get_slide()
    },

    get_slide() {
        const that = this
        const data = {
            slide_type: 'c'
        }
        wx.request({
            url: `${domain}/share/get_slide_comu`, // 请求 experience 接口
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

    get_share() {
        const that = this
        const data = {
            share_type: 's',
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



    goShare() {
        wx.navigateTo({
            url: 'share/share',
        })
    },

    goTopic() {
        wx.navigateTo({
            url: 'topic/topic',
        })
    },



    onShareAppMessage: function () {

    },
    getDetail: function (e) {
        var share_id = e.currentTarget.dataset.id;
        console.log('拿到的 expirence id:', share_id)
        var that = this;
        wx.navigateTo({
            url: `sharedetail/sharedetail?shareId=${share_id}`,
        })
    }
})

