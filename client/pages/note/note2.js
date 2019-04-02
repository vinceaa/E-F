// pages/note/note2.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nodeId: '',
        content: '这出该条草稿的详情内容',
        text: '',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this
        // this.$router.query.nodeId
        console.log(options.nodeID)
        that.setData({
            nodeId: options.nodeID
        })


        // GET 请求 draft detail, 拿到当前 draft 下的草稿内容
        wx.request({
            url: `node/detail?nodeId=${that.data.nodeId}`, // node 详情页接口
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                console.log('请求草稿详情成功, 这是给出的响应:', res.data)
                const obj = JSON.parse(res.data)
                that.setData({
                    content: obj.content
                })
                
            },
            fail: function(res) {
                console.log('请求草稿详情失败, 这是给出的响应:', res)
            },
            complete: function(res) {},
        })
    },

    inputMethod() {
        this.setData({
            text: e.detail.value,
        })
    },

    show: function () {
        const that = this
        wx.showModal({
            title: '提示',
            content: '确认保存',
            success: function (res) {
                if (res.confirm) {
                    // 保存比较 post
                    const userId = 1
                    const data = {
                        userId: userId,
                        text: that.data.text,
                    }
                    console.log('保存被点击， 这是给后台发送的数据', data)
                    wx.request({
                        url: 'draft/save',
                        data: data,
                        header: {},
                        method: 'POST',
                        dataType: 'json',
                        responseType: 'text',
                        success: function (res) {
                            console.log('保存草稿成功， 这是给出的响应', res)
                        },
                        fail: function (res) {
                            console.log('保存草稿失败， 这是给出的响应', res)
                        },
                        complete: function (res) { },
                    })


                    wx.showToast({
                        title: '成功',

                    })
                    setTimeout(() => {
                        wx.navigateBack({
                            delta: 2
                        });
                    }, 1000);

                }
            }
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})