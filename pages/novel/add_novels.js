// pages/novel/add_novels.js
var myFlag=0;
Page({
  data: {
    imgSelected: "",
    descriptionImage: "",
    isChoose:0,
    unselected: "添加图片内容",
    magazine_id:""
  },

  onLoad: function (options) {
    var that = this;
    var num = options.num;
    var magazine_id = options.magazine_id;
    var page = options.page;
    that.setData({
      num: num,
       magazine_id: magazine_id,
    })
    if(page){
      that.setData({
        page: page
      })
    }
    var userInfo = wx.getStorageSync("userInfo");
    var user_id = userInfo.user_id;
    that.initPage(magazine_id, user_id, page, num);
  },
  getTitle: function (e) {
    //inputContent[e.currentTarget.id] = e.detail.value
    var that = this;
    that.setData({
      note: e.detail.value
    })
   
  },
  getDescription: function (e) {
    var that = this;
   // inputContent[e.currentTarget.id] = e.detail.value
    that.setData({
      desc: e.detail.value
    })
  },
  chooseImg: function () {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,赋值给已经在data中定义好的变量
        that.setData({
          imgSelected: res.tempFilePaths[0],
          isChoose: 1,
        })
      }
    })
  },
  getDescriptionImage: function () {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,赋值给已经在data中定义好的变量
        that.setData({
          descriptionImage: res.tempFilePaths[0],
          unselected:"上传成功"
        })
      }
    })
  },
  formSubmit:function(e){
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    var user_id = userInfo.user_id;
    if (myFlag == 0) {
      var url = 'https://www.boerr.cn/Home/Magazine/AddMagazine';
    } else if (myFlag == 1) {
      var url = 'https://www.boerr.cn/Home/Magazine/EditMagazinetuwen';
    }
    wx.request({
      url: url,
      data: {
        desc:e.detail.value.desc,
        title:e.detail.value.title,
        user_id: user_id,
        magazine_id: that.data.magazine_id,
        mokuai: that.data.num,
        page: that.data.page,
      },
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data) {
          var cover = that.data.imgSelected;
          var image = that.data.descriptionImage;
          wx.uploadFile({
            url: 'https://www.boerr.cn/Home//Upload/UploadMagazineCover',
            filePath: cover,
            name: 'images',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            formData: { magazine_id: res.data },
            success: function (res) { 
              console.log(res.data); 
              }
          });
          wx.uploadFile({
            url: 'https://www.boerr.cn/Home/Upload/UploadMagazineImage',
            filePath: image,
            name: 'images',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            formData: { magazine_id: res.data },
            success: function (res) { console.log(res.data); }
          })
          wx.redirectTo({
            url: '../novel/novel?page=' + that.data.page + '&magazine_id=' + that.data.magazine_id + "&forInit=1"
          })
        } else {
          console.log('没有获取到杂志id，判断失败');
        }

      }
    })
  },
  initPage: function (magazine_id, user_id, page, num) {
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail2',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { page: that.data.page, user_id: user_id, magazine_id: that.data.magazine_id, mokuai: num },
      success: function (res) {
       if(res.data){
         myFlag = 1;
       }        
        that.setData({
          image: res.data.image,
          imgSelected:res.data.cover,
          title: res.data.title,
          note: res.data.description,
          unselected:"上传成功",
          isChoose:1
        })
      }
    });
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