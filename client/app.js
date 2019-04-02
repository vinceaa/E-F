//app.js

const Towxml = require('/towxml/main');


const log = console.log.bind()
const {
    domain
} = require('./config')


App({
    globalData: {
        userInfo: '',
        userId: '',
        token: '',
        ifAvatar: false,
    },

    towxml: new Towxml(),

    getText: (url, callback) => {
        wx.request({
            url: url,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (typeof callback === 'function') {
                    callback(res);
                };
            }
        });
    },


    update_score(score_type) {
        const that = this
        const data = {
            userId: this.globalData.userId,
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

    get_userId(data) {
        const that = this
        // 获取 userId
        wx.request({
            url: `${domain}/user/login`,
            data: data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                const data = res.data
                log('res.data:', res.data)
                log('url:', `${domain}/user/login`)
                that.globalData.userId = data.userId
                that.globalData.token = data.token
                log('获得 id 和 token:', that.globalData.userId, that.globalData.token)
                that.get_userInfo()
                that.update_score('login')
            },
            fail: function (res) {
                log('发送 code 失败，这是给出的响应:', res)
            },
            complete: function (res) { },

        })
    },

    get_userInfo() {
        // 获取用户信息
        // log('正在获取用户信息')
        const that = this
        wx.getUserInfo({
            success: res => {
                // 可以将 res 发送给后台解码出 unionId
                that.globalData.userInfo = res.userInfo
                // console.log('用户信息:??', res.userInfo)

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                }
            },

            fail: res => {
                console.log('获取用户信息失败', res)
            }
        })

    },



    login(if_reset) {
        const that = this

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                const data = {
                    code: res.code,
                    if_reset,
                }
                that.get_userId(data)

            },
  
        })
    },

    check_session() {
        const that = this
        wx.checkSession({
            success: function () {
                //session_key 未过期，并且在本生命周期一直有效
                log('session 未过期')
                that.login(0)


            },
            fail: function () {
                // session_key 已经失效，需要重新执行登录流程
                log('session 已经失效')
                that.login(1)


            }
        })
    },

    onLaunch: function () {
        this.check_session()
    },

})