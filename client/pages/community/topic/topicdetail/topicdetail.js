// pages/community/sharedetail/sharedetail.js
const log = console.log.bind()

const {
    domain
} = require('../../../../config')

const app = getApp()


Page({

    data: {
        share_id: '',
        share: '',
        author: '',
        token: '',
        replys: '',
        reply_content: '',
        reply_num: '',
        thumb_num: '',
        author_id: '',
        article: {},
        timer: undefined,
        domain,
        ifLoading: false,


    },


    onLoad: function (options) {
        const that = this
        const shareId = options.shareId
        that.setData({
            share_id: shareId,
            user_id: app.globalData.userId,
            token: app.globalData.token,
        })
    },

    onShow() {
        this.get_detail()
        this.get_reply()
        this.get_markdown()
    },


    get_markdown() {

        const _ts = this

        const shareId = this.data.share_id
        const get_link = `${domain}/mark/detail?share_id=${shareId}`


        app.getText(get_link, (res) => {
            if (res.data) {

                //将markdown内容转换为towxml数据
                let articleData = app.towxml.toJson(res.data, 'markdown', _ts);
                log('得到的 markdown 信息:', articleData)
                //自定义事件，格式为`event_`+`绑定类型`+`_`+`事件类型`
                //例如`bind:touchstart`则为：
                this['event_bind_touchstart'] = (event) => {
                    console.log(event.target.dataset._el);     // 打印出元素信息
                };

                // 给todoList添加监听事件
                this['eventRun_todo_checkboxChange'] = (event) => {
                    console.log(event.detail);                // todoList checkbox发生change事件
                };

                //设置文章数据，并清除页面loading
                _ts.setData({
                    article: articleData,
                    ifLoading: true
                });
            };
        });
    },


    replyMethod() {
        this.go_reply()
    },

    thumbMethod() {
        this.go_thumb()
    },

    update_score(score_type) {
        const that = this
        const data = {
            userId: this.data.user_id,
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

    add_views() {
        const that = this
        const data = {
            userId: this.data.author_id
        }
        wx.request({
            url: `${domain}/score/views`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('请求经验详情页成功, 这是给出的响应:', res.data)
                // experience, comments
            },
            fail: function (res) {
                // log('请求经验详情页失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },


    get_detail() {
        const that = this
        const shareId = this.data.share_id
        const data = {
            share_id: shareId,
        }
        wx.request({
            url: `${domain}/share/detail`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('请求经验详情页成功, 这是给出的响应:', res)
                // experience, comments
                const data = res.data
                that.setData({
                    share: data.share,
                    reply_num: data.reply_num,
                    thumb_num: data.thumb_num,
                    author_id: data.share.user_id
                })
                that.add_views()
            },
            fail: function (res) {
                // log('请求经验详情页失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },





    inputMethod(e) {
        this.setData({
            reply_content: e.detail.value
        })
    },

    get_reply() {
        const that = this
        const data = {
            share_id: this.data.share_id,
            reply_type: 't'
        }
        wx.request({
            url: `${domain}/reply/all`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                // log('请求经验详情页成功, 这是给出的响应:', res)
                const data = res.data
                that.setData({
                    replys: data.replys
                })

            },
            fail: function (res) {
                // log('请求经验详情页失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    go_reply() {
        const that = this
        const data = {
            userId: this.data.user_id,
            shareId: this.data.share_id,
            content: this.data.reply_content,
            reply_type: 't',
            token: this.data.token,

        }
        wx.request({
            url: `${domain}/reply/add`,
            data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                // console.log('回复经验详情成功，这是给出的响应:', res.data)
                log('正在回复: author_id:', that.data.author_id)
                // log('正在回复: 目前的回复数量:', that.data.replys.length % 10 == 9)
                that.get_reply()
                that.get_detail()
                that.update_score('reply')

                if (that.data.replys.length % 10 == 9) {
                    // 给作者增加积分
                    that.update_score('author')
                }

                that.setData({
                    reply_content: ''
                })
            },
            fail: function (res) {
                console.log('回复经验详情失败，这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    go_thumb() {
        const that = this
        console.log('点赞按钮被点击')
        const data = {
            userId: this.data.user_id,
            shareId: this.data.share_id,
            thumb_type: 't',
            token: this.data.token,
        }
        wx.request({
            url: `${domain}/thumb/add`,
            data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                // console.log('点赞经验详情成功，这是给出的响应:', res.data)
                that.get_detail()
                that.update_score('thumb')
            },
            fail: function (res) {
                console.log('点赞经验详情失败，这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },




    changeicon: function (e) {
        var that = this;
        var num = that.data.num
        if (that.data.thumb)
            that.setData({
                thumb: false,
                num: num - 1
            })
        else
            that.setData({
                thumb: true,
                num: num + 1
            })
    }
})