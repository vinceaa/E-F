const app = getApp()


const {
    domain
} = require('../../../config')

const {
    log,
} = require('../../../utils/util')




Page({


    data: {
        userId: '',
        rank_list: [],
        me: '',
        champion: '',
        second: {
            hot: '2',
            // avatar: '/images/c7.png',
            username: '变身BOY！',
            love_num: 1680,
        },
        third: {
            hot: '3',
            // avatar: '/images/c9.png',
            username: '寂静的天空',
            love_num: 520,
        },
        other: [
            {
                hot: '4',
                // avatar: '/images/zhibo5.png',
                username: '卡卡的日常',
                love_num: 1520,
            },
            {
                hot: '5',
                // avatar: '/images/zhibo6.png',
                username: '萌萌',
                love_num: 1235,
            },
            {
                hot: '6',
                // avatar: '/images/zhibo3.png',
                username: '天真时的童话',
                love_num: 1230,
            },
        ],
        friend_active: 'active-rank',
        all_active: '',
        domain,
        ifLoading: false,

    },

    get_list_friends() {
        console.log('请求好友排行')
        const that = this
        that.setData({
            friend_active: 'active-rank',
            all_active: '',
        })
        wx.request({
            url: `rank/friends`,
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('请求成功好友 rank, 这是给出的响应:', res.data)
                const data = JSON.parse(res.data)
                that.setData({
                    rank_list: data.rank_list,
                    me: data.me,
                    champion: data.rank_list[0],
                    second: data.rank_list[1],
                    third: data.rank_list[2],
                    other: data.rank_list.slice(3)
                })
            },
            fail: function (res) {
                log('请求好友 rank 失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    dataMethod(data, all_rank) {
        const l = all_rank.length
        const default_data = {
            hot: '???',
            avatar: '/pages/index/user-unlogin.png',
            username: '???',
            love_num: '???',
        }

        const me = {
            hot: data.me_rank,
            avatar: data.me.avatar,
            username: data.me.username,
            love_num: data.me.score,
        }

        if (l == 0) {
            this.setData({
                me: default_data,
                champion: default_data,
                second: default_data,
                third: default_data,
                other: []
            })
        } 

        if (l == 1) {
            this.setData({
                me,
                champion: {
                    hot: '1',
                    avatar: all_rank[0].avatar,
                    username: all_rank[0].username,
                    love_num: all_rank[0].score,
                },
                second: default_data,
                third: default_data,
                other: []
            })
        } else if (l == 2) {
            this.setData({
                me,
                champion: {
                    hot: '1',
                    avatar: all_rank[0].avatar,
                    username: all_rank[0].username,
                    love_num: all_rank[0].score,
                },
                second: default_data,
                third: default_data,
                other: []
            })

        } else if (l == 3) {
            this.setData({
                me,
                champion: {
                    hot: '1',
                    avatar: all_rank[0].avatar,
                    username: all_rank[0].username,
                    love_num: all_rank[0].score,
                },
                second: {
                    hot: '2',
                    avatar: all_rank[1].avatar,
                    username: all_rank[1].username,
                    love_num: all_rank[1].score,
                },
                third: {
                    hot: '3',
                    avatar: all_rank[2].avatar,
                    username: all_rank[2].username,
                    love_num: all_rank[2].score,
                },
                other: []
            })

        } else {
            const other = []
            all_rank.slice(3).forEach((e, index) => {
                const dicta = {}
                dicta.hot = index + 4
                dicta.avatar = e.avatar
                dicta.username = e.username
                dicta.love_num = e.score
                other.push(dicta)
            })


            this.setData({
                me,
                champion: {
                    hot: '1',
                    avatar: all_rank[0].avatar,
                    username: all_rank[0].username,
                    love_num: all_rank[0].score,
                },
                second: {
                    hot: '2',
                    avatar: all_rank[1].avatar,
                    username: all_rank[1].username,
                    love_num: all_rank[1].score,
                },
                third: {
                    hot: '3',
                    avatar: all_rank[2].avatar,
                    username: all_rank[2].username,
                    love_num: all_rank[2].score,
                },
                other,
            })
        }

    },


    get_list_all() {
        console.log('请求所有排行')
        const that = this
        that.setData({
            friend_active: '',
            all_active: 'active-rank',
        })

        const data = {
            userId: this.data.userId
        }


        wx.request({
            url: `${domain}/user/get_rank`,
            data,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log('请求成功所有排行成功, 这是给出的响应:', res.data)
                const data = res.data
                const all_rank = data.all_rank
                that.dataMethod(data, all_rank)
                that.setData({
                    ifLoading: true,
                })
                //         {
                //     hot: '55',
                //     avatar: '/images/c5.png',
                //     username: '萌你奶奶个腿',
                //     love_num: 2100,
                // },
            },
            fail: function (res) {
                log('请求所有排行失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },

    onLoad() {
        this.setData({
            userId: app.globalData.userId,
        })
    },


    onShow: function (options) {
        // this.get_list_friends()
        log('userId:', this.data.userId)
        this.get_list_all()
    },


})