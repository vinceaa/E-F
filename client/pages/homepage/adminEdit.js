// pages/homepage/adminEdit.js

const app = getApp()

const {
    domain
} = require('../../config')

const log = console.log.bind()


Page({


    data: {
        chooseImageCover: 'chooseImageCover',
        share_id: '',
        user_id: '',
        token: '',
        share: '',
        title: '',
        text: '',
        domain,
        pic_list: [],
        domain,

    },

    onLoad: function (options) {
        const that = this
        const shareId = options.shareId
        that.setData({
            share_id: shareId,
            user_id: app.globalData.userId,
            token: app.globalData.token,
        })

        log('edit data:', this.data)
        this.get_detail()
        
    },

 

    onTextInput: function (e) {
        var that = this
        that.setData({
            text: e.detail.value
        })
    },

    onTitleInput: function (e) {
        var that = this
        that.setData({
            title: e.detail.value
        })
    },

    get_detail() {
        const that = this
        const shareId = this.data.share_id
        const data = {
            share_id: shareId,
        }
        log('data!', data)
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
                    reply_num: data.reply_num,
                    thumb_num: data.thumb_num,
                    author_id: data.share.user_id,
                    title: data.share.share_title,
                    text: data.share.share_content,
                })
            },
            fail: function (res) {
                // log('请求经验详情页失败, 这是给出的响应:', res)
            },
            complete: function (res) { },
        })
    },


    submit: function () {
        this.update_topic()
    },


    update_topic() {
        const that = this

        // 提交数据给后台
        const userId = this.data.user_id

        const data = {
            userId: userId,
            title: this.data.title,
            content: this.data.text,
            token: this.data.token,
            share_id: this.data.share_id,


        }

        log('post 的数据:', data)

        wx.request({
            url: `${domain}/share/update`,   //新增话题接口
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('update 话题请求成功, 这是给出的响应:', res.data)
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
                wx.navigateBack({})
            },
            fail: function (res) {
                log('update 请求失败, 这是给出的响应:', res.data)
            },
            complete: function (res) { },
        })
    },



    get_pic_link(filename) {
        return `<image src= 'http://127.0.0.1/phptest/wxci/assets/uploads/${filename}'></image>`
    },

    update_share(pic) {
        const that = this

        // 提交数据给后台
        const userId = this.data.user_id
        const data = {
            userId: userId,
            share_type: 'a',
            token: this.data.token,
            cover: pic,
            share_id: this.data.share_id
        }

        log('post 的数据:', data)

        wx.request({
            url: `${domain}/share/update_cover`,   //新增话题接口
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('新增封面请求成功, 这是给出的响应:', res.data)
                that.setData({
                    share_id: res.data,
                    chooseImageCover: '',
                })
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
                // that.update_score('publish')
            },
            fail: function (res) {
                log('新增封面请求失败, 这是给出的响应:', res.data)
            },
            complete: function (res) { },
        })
    },

    do_upload(tempFilePaths, status = 0) {
        const that = this
        wx.uploadFile({
            url: `${domain}/upload/do_upload`, //仅为示例，非真实的接口地址
            filePath: tempFilePaths,
            name: 'file',
            formData: {
                'user': 'test'
            },
            success: function (res) {
                var data = res.data
                log('上传图片成功, 这是给出的响应', res.data)
                const pic_link = that.get_pic_link(data)
                const pic = `${domain}/assets/uploads/${data}`
                that.data.pic_list.push(pic)


                if (status == 1) {
                    log('上传的是封面')
                    that.update_share(pic)
                    that.setData({
                        pic_list: that.data.pic_list
                    })
                } else {
                    log('that.data.text:', that.data.text)
                    that.setData({
                        text: that.data.text += pic_link,
                        pic_list: that.data.pic_list
                    })
                    log('that.data.text 后:', that.data.text)
                }


            }
        })
    },



    chooseImage() {

        log('上传图片按钮被点击')
        const that = this
        wx.chooseImage({
            count: 8,
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                log('tempFilePaths:', tempFilePaths)
                for (let e of tempFilePaths) {
                    that.do_upload(e)
                }
                wx.showToast({
                    title: '请勿删除链接',
                    icon: 'success',
                    duration: 2000
                })
            }

        })
    },

    chooseImageCover() {
        log('上传图片按钮被点击')
        const that = this
        wx.chooseImage({
            count: 1,
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                log('tempFilePaths:', tempFilePaths)
                for (let e of tempFilePaths) {
                    that.do_upload(e, 1)
                }
                wx.showToast({
                    title: '上传封面成功！',
                    icon: 'success',
                    duration: 2000
                })
            }

        })
    },

    previewMethod(e) {
        const that = this
        const src = e.currentTarget.dataset.src
        log('src:', src)
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: that.data.pic_list // 需要预览的图片http链接列表
        })
    },

    delete_content(index) {
        const pic = this.data.pic_list[index].split('/').slice(-1)[0]
        const delete_str = `<image src= 'http://127.0.0.1/phptest/wxci/assets/uploads/${pic}'></image>`
        this.data.text = this.data.text.replace(delete_str, '')
        this.setData({
            text: this.data.text,
        })
    },

    deleteMethod(e) {
        log('删除按钮被点击:', e.currentTarget.dataset.index)
        const index = e.currentTarget.dataset.index
        this.delete_content(index)
        this.data.pic_list.splice(index, 1)
        this.setData({
            pic_list: this.data.pic_list,
        })
    }

})