// pages/community/topic/publish/publish.js

const {
    log,
} = require('../../utils/util')

var {
    domain
} = require('../../config.js');

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ifCover: false,
        chooseImageCover: 'chooseImageCover',
        share_id: '',
        images: [],
        title: '',
        text: '',
        userId: '',
        token: '',
        filename: '',
        home_slide_str: '',
        comu_slide_str: '',
        domain,
        pic_list: [
            // `${domain}/assets/uploads/1bf3782078361e36980a4202d2a54728.jpg`,
            // `${domain}/assets/uploads/1cf9604b22c26f77b024f3f2f9808840.jpg`,
            // `${domain}/assets/uploads/2b488f0c8327ebc9f2f6584b9ca0ab1a.jpg`,
            // `${domain}/assets/uploads/3fe31a8f4b589e82609ba11da7e37e24.jpg`,
            // `${domain}/assets/uploads/1bf3782078361e36980a4202d2a54728.jpg`,
            // `${domain}/assets/uploads/1bf3782078361e36980a4202d2a54728.jpg`,
            // `${domain}/assets/uploads/1bf3782078361e36980a4202d2a54728.jpg`,
            // `${domain}/assets/uploads/1bf3782078361e36980a4202d2a54728.jpg`,
        ],
    },

    onLoad: function (options) {
        this.setData({
            userId: app.globalData.userId,
            token: app.globalData.token
        })
    },

    update_score(score_type) {
        const that = this
        const data = {
            userId: this.data.userId,
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

    add_topic() {
        const that = this

        // 提交数据给后台
        const userId = this.data.userId

        const data = {
            userId: userId,
            title: this.data.title,
            content: this.data.text,
            share_type: 'a',
            token: this.data.token,
            share_id: this.data.share_id,


        }

        log('post 的数据:', data)

        wx.request({
            url: `${domain}/share/update_cover_table`,   //新增话题接口
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('新增话题请求成功, 这是给出的响应:', res.data)
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
                that.update_score('publish')
            },
            fail: function (res) {
                log('新增话题请求失败, 这是给出的响应:', res.data)
            },
            complete: function (res) { },
        })
    },


    submit: function () {
        if (this.data.text.length > 0 && this.data.title.length > 0 && this.data.ifCover == true) {
            this.add_topic()
            wx.navigateBack({})
        } else if (this.data.ifCover == false) {
            wx.showToast({
                title: '必须上传封面！',
                icon: 'none',
                duration: 2000
            })

        } else {
            wx.showToast({
                title: '内容和标题长度必须大于 0 哦！',
                icon: 'none',
                duration: 2000
            })
        }
    },

    onTitleInput: function (e) {
        var that = this
        that.setData({
            title: e.detail.value
        })
    },
    onTextInput: function (e) {
        var that = this
        that.setData({
            text: e.detail.value
        })
    },


    // image



    get_pic_link(filename) {
        return `<image src= '${domain}/assets/uploads/${filename}'></image>`
    },

    update_share(pic) {
        const that = this

        // 提交数据给后台
        const userId = this.data.userId
        const data = {
            userId: userId,
            share_type: 'a',
            token: this.data.token,
            cover: pic,
        }

        log('post 的数据:', data)

        wx.request({
            url: `${domain}/share/add_cover`,   //新增话题接口
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
                    ifCover: true,
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
                } else if (status == 2) {
                    log('上传的是首页轮播')
                    that.setData({
                        home_slide_str: that.data.home_slide_str + `${pic}+++`
                    })
                    that.setData({
                        pic_list: that.data.pic_list
                    })

                } else if (status == 3) {
                    log('上传的是社区轮播')

                    that.setData({
                        comu_slide_str: that.data.comu_slide_str + `${pic}+++`
                    })
                    that.setData({

                        pic_list: that.data.pic_list
                    })

                } else {
                    that.setData({
                        text: that.data.text += pic_link,
                        pic_list: that.data.pic_list
                    })
                }




            }
        })
    },

    new_home_slide() {
        const that = this

        const data = {
            home_pic: this.data.home_slide_str,
            slide_type: 'h'
        }

        log('post 的数据:', data)

        wx.request({
            url: `${domain}/share/save_slide_home`,   //新增话题接口
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('上传 home 轮播 成功, 这是给出的响应:', res.data)
                wx.showToast({
                    title: 'home 轮播 OK',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail: function (res) {
                log('上传 home 轮播 失败, 这是给出的响应:', res.data)
            },
        })
    },

    new_comu_slide() {
        const that = this

        const data = {
            comu_pic: this.data.comu_slide_str,
            slide_type: 'c'
            
        }

        log('post 的数据:', data)

        wx.request({
            url: `${domain}/share/save_slide_comu`,   //新增话题接口
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('上传 home 轮播 成功, 这是给出的响应:', res.data)
                wx.showToast({
                    title: 'comu 轮播 OK',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail: function (res) {
                log('上传 home 轮播 失败, 这是给出的响应:', res.data)
            },
        })
    },

    okHome() {
        log('拿到最终图片串:', this.data.home_slide_str)
        this.new_home_slide()
    },

    okComu() {
        log('拿到最终图片串:', this.data.comu_slide_str)
        this.new_comu_slide()   
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
        const delete_str = `<image src= '${domain}/assets/uploads/${pic}'></image>`
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
    },

    chooseSlideHome() {
        const that = this
        wx.chooseImage({
            count: 4,
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                log('tempFilePaths:', tempFilePaths)
                for (let e of tempFilePaths) {
                    that.do_upload(e, 2)
                }
 
            }

        })
    },

    chooseSlideComu() {
        const that = this
        wx.chooseImage({
            count: 4,
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                log('tempFilePaths:', tempFilePaths)
                for (let e of tempFilePaths) {
                    that.do_upload(e, 3)
                }

            }

        })
    },





})