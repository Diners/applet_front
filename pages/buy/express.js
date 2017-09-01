// pages/buy/express.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
   num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that=this;
   var express_num = options.express_num;
   that.setData({
     express_num: express_num 
   })
   that.getExpressInfo(express_num);
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
   getExpressInfo:function(express_num){
     var that = this;
     wx.request({
       url: 'https://xiaochengxu.jia1n1.com/Home/Express/ShowExpress',
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       method: "POST",
       data: { express_num:express_num},
       success: function (res) {
        console.log(res.data);
        that.setData({
          express:res.data.express
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