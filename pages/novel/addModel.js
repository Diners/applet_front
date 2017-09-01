// pages/novel/addModel.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    tishi:"",
    IShide:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Ifdali();
    var magazine_id = options.magazine_id;
    var page=options.page;
    if(page==undefined){
    }else{
      this.setData({
        page: page
      })
    }
    this.setData({
      magazine_id: magazine_id
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
  
  },
  // 点击商品模板
  clickShopping:function(){
    var that=this;
    var user_ids = wx.getStorageSync("userInfo").user_id;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/Checkagent',
      method:"POST",
      data: { user_id:user_ids },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if(res.data.code==0){
          that.setData({
            tishi:"只有认证用户才能使用此模板",
            IShide: !that.data.IShide
          })
          that.finde();
        }else{
          wx.redirectTo({
            url: '../novel/goodsModel?user_id=' + user_ids + "magazine_id=" + that.data.magazine_id,
         })
        }
      }
    })
  },
  // 点击关闭按钮
  clickClose:function(){
    wx.redirectTo({
      url: '../usercenter/index',
    })
  },
  // 点击图文按钮
  clickPhoto:function(){
    if(this.data.page==undefined){
      wx.redirectTo({
        url: '../novel/novel?modelType=1&magazine_id=' + this.data.magazine_id,
      })
    }else{
      wx.redirectTo({
        url: '../novel/novel?modelType=1&magazine_id=' + this.data.magazine_id + '&page=' + this.data.page,
      })
    }
  },
  finde: function () {
    var that = this;
    var t = 0;
    var time = setInterval(function () {
      t++;
      if (t >= 2) {
        clearInterval(time);
        that.setData({
          IShide: !that.data.IShide
        })
      }
    }, 1000)
  },
  Ifdali: function () {
    var that = this;
    var userInfos = wx.getStorageSync("userInfo");
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/Checkagent',
      method: "POST",
      data: { user_id: userInfos.user_id },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          num: res.data.code,
          tishi: res.data.message
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})