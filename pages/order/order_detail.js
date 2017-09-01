// pages/order/order_detail.js
Page({
  data: {
    state:0,
    value: 0,
    isRemind:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  setTime:function(){
    var that = this;
    if (that.data.value == 1) {
      setTimeout((function () {
        console.log(157658);
        that.setData({ isRemind: 1 });
      }).bind(that), 1000);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //加入
  follow: function () {
    this.setData({
      followed: !this.data.followed,
      value: !this.data.value,
      isRemind: !this.data.isRemind
    });
    this.setTime();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setTimeout((function () {
      this.setData({ isRemind: 1 });
    }).bind(this), 3000);
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