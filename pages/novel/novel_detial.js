// pages/novel/novel_detial.js
Page({
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var num = options.num;
    var magazine_id = options.magazine_id;
    var page = options.page;
    that.setData({
      num: num,
      magazine_id: magazine_id,
      page: page
    })
    var userInfo = wx.getStorageSync("userInfo");
    var user_id = userInfo.user_id;
    that.initPage(magazine_id, user_id,page,num);
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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  initPage: function (magazine_id, user_id,page,num) {
    var that = this;
    console.log(that);
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail2',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { page: page,user_id: user_id, magazine_id: that.data.magazine_id,mokuai:num },
      success: function (res) {
        that.setData({
         image:res.data.image
        })
      }
    });
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