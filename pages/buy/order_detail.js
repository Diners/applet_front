// pages/order/order_detail.js
Page({
  data: {
    publish: 0,
    accpect:0,
    isRemind:1,
    isAccpect:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var type=options.type;
    var order_id=options.order_id;
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      var user_id = userInfo.user_id;
      that.setData({
        user_id: user_id
      })
    }
    that.setData({ 
      type: type,
      order_id: order_id
    });
    that.initPage(user_id, order_id);
  },
  setTime:function(){
    var that = this;
    if (that.data.value == 1) {
      setTimeout((function () {
        that.setData({isRemind: 1 });
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
      publish: !this.data.publish,
      isRemind: !this.data.isRemind
    });
    this.setTime();
  },
  accpect:function(){
    this.setData({
      toAccpect: !this.data.toAccpect,
      accpect: !this.data.accpect,
      isAccpect: !this.data.isAccpect
    });
  },
  closeDel: function () {
    var that = this;
    that.setData({
      toAccpect: !this.data.toAccpect,
      accpect: !this.data.accpect,
      isAccpect: !this.data.isAccpect
    })
  },
  sureAccept: function () {
    var that = this;
    var order_id = that.data.order_id;
    console.log(order_id);
    wx.request({
      url: 'https://www.boerr.cn/Home/General/GeneralSure',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {order_id:order_id},
      success: function (res) {
        that.setData({
          isAccpect: !that.data.isAccpect,
          type:res.data.order_type
        })
      }
    });
  },
  initPage:function(user_id,order_id){
    var that=this;
    wx.request({
      url: 'https://www.boerr.cn/Home/General/GeneralDetail',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { user_id: user_id,order_id:order_id},
      success: function (res) {
         that.setData({
           order: res.data.goods_message.order,
           goods: res.data.goods_message.goods
         })
      }
    });
  },
  checkExpress:function(e){
   var express_num=e.currentTarget.dataset.id;
   wx.navigateTo({
     url: '../buy/express?express_num='+express_num,
   })
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