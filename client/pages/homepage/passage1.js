// pages/homepage/passage1.js


const log = console.log.bind()

const {
    domain
} = require('../../config')

const app = getApp()




Page({

    data: {
        passage_list: '',
        //  correct
        passage_id: 1,
        article: {},
        timer: undefined,
        share: '',
        ifLoading: false,


    },

    onLoad: function (options) {
        const that = this
        console.log('传过来的 passageId', options.passageId)
        that.setData({
            passage_id: options.passageId,
        })
    },

    onShow() {
        this.get_markdown()
        this.get_detail()
    },


    get_markdown() {

        const _ts = this

        const shareId = this.data.passage_id
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


    get_detail() {
        const that = this
        const shareId = this.data.passage_id
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
                log('请求经验详情页成功, 这是给出的响应:', res.data)
                // experience, comments
                const data = res.data
                that.setData({
                    share: data.share,
                })
            },
            fail: function (res) {
                // log('请求经验详情页失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },
   
})