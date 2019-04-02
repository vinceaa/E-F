// pages/community/involve/involve.js
var {
    domain
} = require('../../../config.js');


Page({

    data: {
        domain,
    },

    

    join() {
        wx.navigateTo({
            url: '/pages/community/involve/involvetopic/involvetopic',
        })
    },

    share() {
        wx.navigateTo({
            url: '/pages/community/involve/involveshare/involveshare',
        })
    },


})