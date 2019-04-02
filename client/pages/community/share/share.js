const app = getApp()


const {
    domain
} = require('../../../config')

const {
    log,
} = require('../../../utils/util')
Page({
    data: {
        images: [],
        imageWidth: 200,
        title: '',
        text: '',
        userId: '',
        token: '',
        filename: '',
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
    onLoad: function () {
        log('domain:', domain)
        log('experience user id:', app.globalData.userId)
        this.setData({
            userId: app.globalData.userId,
            token: app.globalData.token,
        })
    },
    onTitleInput: function (e) {
        var that = this
        // console.log('正在输入标题')

        that.setData({
            title: e.detail.value
        })
    },
    onTextInput: function (e) {
        var that = this
        // console.log('正在输入内容')
        that.setData({
            text: e.detail.value
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

    sumbitMethod() {
        var that = this;
        // 提交数据给后台
        const data = {
            userId: this.data.userId,
            title: this.data.title,
            content: this.data.text,
            token: this.data.token,
            share_type: 's',

        }

        log('应该提交给后台的数据:', data)
        wx.request({
            url: `${domain}/share/add`, //新增一条经验分享
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                log('新增经验请求成功, 这是给出的响应:', res.data)
                that.update_score('publish')
            },
            fail: function (res) {
                log('新增经验请求失败, 这是给出的响应:', res.data)
            },
            complete: function (res) { },
        })

    },

    submit: function () {
        if (this.data.text.length > 0 && this.data.title.length > 0) {
            this.sumbitMethod()
            wx.navigateBack({

            })
        } else {
            wx.showToast({
                title: '内容和标题长度必须大于 0 哦！',
                icon: 'none',
                duration: 2000
            })
        }

    },

    get_pic_link(filename) {
        return `<image src= '${domain}/assets/uploads/${filename}'></image>`
    },

    do_upload(tempFilePaths) {
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
                that.setData({
                    filename: data,
                    text: that.data.text += pic_link,
                    pic_list: that.data.pic_list
                })


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
        const delete_str = `<image src= '${domain}/wxci/assets/uploads/${pic}'></image>`
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