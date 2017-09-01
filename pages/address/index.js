// pages/address/index.js
Page({
  data: {
    isDel: true,
  },
  onLoad: function (options) {

   var that=this;
   var userInfo = wx.getStorageSync("userInfo");
   var user_id = userInfo.user_id;
   that.setData({
     user_id: user_id
   })
   var isSuccess = options.isSuccess;
   if (isSuccess && isSuccess==1){
     that.initPage(user_id);
   }
   that.initPage(user_id);
  },
  chooseAddress: function (e) {
    var address_id = e.currentTarget.dataset.id;
    console.log(address_id)
    wx.redirectTo({
      url: '../buy/index?address_id='+ address_id+"&getAddress=1",
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //去添加页面
  toAdd: function () {
    wx.redirectTo({
      url: '../address/addAddress',
    })
  },
  //去编辑页面
  toEditAdd: function (e) {
    var address_id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../address/editAddress?address_id=' + address_id,
    })
  },
  toDelAdd: function (e) {
    console.log(e);
    var address_id = e.target.dataset.id;
    var that = this;
    that.setData({
      isDel: false,
      address_id: address_id
    })
  },
  closeDel: function () {
    var that = this;
    that.setData({
      isDel: true
    })
  },
  sureDel: function () {
    var that = this;
    console.log(that.data.address_id);
    wx.request({
      url: 'https://www.boerr.cn/Home/Address/DelAddress',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { address_id:that.data.address_id, user_id:that.data.user_id},
      success: function (res) {
        console.log(res.data);
        if(res.data.code==1){
            wx.redirectTo({
                 url: '../address/index'
             })
            that.closeDel();     
        }   
      }
    });
  },
  initPage:function(user_id){
    var that=this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Address/LstAddress',
      data: {user_id:user_id},
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          addressList: res.data.address
        })
      }
    });
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