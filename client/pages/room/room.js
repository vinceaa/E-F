const app = getApp()

const log = console.log.bind()

const {
    domain
} = require('../../config')



// pages/room/room.js
Page({

    data: {
        domain
    },


    onLoad: function (options) {

    },
    godetail() {
        wx.navigateTo({
            url: 'roomdetail/roomdetail',
        })
    },
    goNow() {
        console.log('进入正在直播')
        wx.navigateTo({
            url: 'roomnow',
        })
    },
    goAdd() {
        console.log('进入发起直播')
        wx.navigateTo({
            url: 'roomdetail/roomdetail',
        })
    }


})