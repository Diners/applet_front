// pages/commity/post.js
Page({
  data: {
    char: [],
  },
  onLoad: function (options) {
    var that = this;
    var commityId = options.commityId;
    that.setData({
      commityId: commityId
    })

    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo);
    if (userInfo && userInfo != "undefined") {
      that.setData({
        user_id: userInfo.user_id
      })
    }
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  
  },
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  getValue:function(e){
   var that=this;
   that.setData({
     note:e.detail.value
   })
  },
  uploadFile:function(){
    var that=this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 6,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,赋值给已经在data中定义好的变量
        that.setData({
          char: res.tempFilePaths
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  chooseAgain:function(){
    var that = this;
    var char=that.data.char;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 6-char.length,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,赋值给已经在data中定义好的变量
        var newarr = res.tempFilePaths;
        for(var i=0;i<newarr.length;i++){
          char.push(newarr[i]);
        }
        that.setData({
          char: char
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  //提交form
  submit: function () {
    var that = this; 
    wx.request({
      url: 'https://www.boerr.cn/Home/Community/AddArticle',
      data: { article_desc: that.data.note, community_id: that.data.commityId,user_id:that.data.user_id},
      method:"post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.article_id) {
          for (var i = 0; i < that.data.char.length; i++) {
            wx.uploadFile({
              url: 'https://www.boerr.cn/Home/Upload/UploadCommunityImages',
              filePath: that.data.char[i],
              name: 'images',
              header: {
                "content-type": "multipart/form-data"
              },
              formData: { article_id :res.data.article_id },
              success: function (res) {
                console.log(res);
              }
            })
          }
        } else {
          console.log('没有获取到文章id，判断失败');
        }
         wx.navigateTo({
           url: '../commity/detail?commityId=' + that.data.commityId
         })
      }
    })
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
