const log = console.log.bind()
const app = getApp()


const {
    domain
} = require('../../config')



// pages/me/user.js
Page({

    data: {
        listarr: {
            'name': 'Alain',
            'sex': '男',
            'birthday': '2018-8-28',
            'publish_num': 13,
            'score': 100,
            'fans_num': 55,
            'school': '东北农业大学',
            'career': '设计师',
            'place': '黑龙江省哈尔滨市',
            'info': '绽放在冬天里的一朵玫瑰',
        },
        domain,

    },

    onLoad: function (options) {
        const that = this
        // 请求 user 的 JSON
        const user_id = 1
        wx.request({
            url: `user/get?userId=${user_id}`,
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('GET me 详情数据成功，这是给出的响应:', res.data)
                that.setData({
                    listarr: JSON.parse(res.data)
                })
            },
            fail: function (res) { 
                console.log('GET me 详情数据失败:', res)
            },
            complete: function (res) { },
        })
    },


    showme: function () {
        // wx.request({
        //   url: 'user/me',
        //   data: '',
        //   header: {},
        //   method: 'GET',
        //   dataType: 'json',
        //   responseType: 'text',
        //   success: function(res) {
        //     this.setData({
        //       array:JSON.parse(res.data),
        //     })
        //   },
        //   fail: function(res) {},
        //   complete: function(res) {},
        // })
    }

})
