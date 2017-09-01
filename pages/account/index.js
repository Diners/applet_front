// pages/account/index.js
Page({
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      var user_id = userInfo.user_id;
      that.setData({
        user_id: user_id
      })
    }
    that.initPgae(user_id);
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
  initPgae: function (user_id){
    var that = this;
    wx.request({
      url: "https://www.boerr.cn/Home/Bank/BankLst",
      data: {
        user_id: user_id
      },
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          account: res.data.top,
          list:res.data.botton
        })
      }
    })
  },
  // tocheckDetail:function(e){
  //  console.log(e);
  //  var order_id = e.currentTarget.dataset.id;
  //  wx.navigateTo({
  //    url: '../buy/order_detail?order_id=' + order_id + "&type=" + type,
  //  })
  // },
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