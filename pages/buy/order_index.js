// pages/order/detail.js
Page({
  data: {
    currentTab:2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this;
     var userInfo=wx.getStorageSync("userInfo");
     if(userInfo){
       var user_id=userInfo.user_id;
       that.setData({
         user_id: user_id
       })
     }
     var order_type=that.data.currentTab;
     that.getMyOrderList(user_id, order_type);
  },
  navbarTap: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.idx
    })
    var order_type = that.data.currentTab;
    that.getMyOrderList(that.data.user_id, order_type);
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
  getMyOrderList: function (user_id,order_type){
    var that=this;
    wx.request({
      url:"https://www.boerr.cn/Home/General/GeneralLst",
      data: { 
        user_id: user_id,
        order_type: order_type
      },
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data.code);
        if(res.data.code==1){
          that.setData({
            sendList: res.data.goods_message
          })
        }else{
          that.setData({
            sendList: []
          })
        }
        
      }
    })
  },
  //查看详情
  checkListDetail:function(e){
   var type = e.currentTarget.dataset.type;
   var order_id = e.currentTarget.dataset.id;
   wx.navigateTo({
     url: '../buy/order_detail?order_id='+order_id+"&type="+type,
   })
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