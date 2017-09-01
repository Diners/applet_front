// pages/account/takecash.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sucess:1,
    cash_num:'',
    text:"提现成功"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
  initPgae: function (user_id) {
    var that = this;
    wx.request({
      url: "https://www.boerr.cn/Home/Bank/BankShow",
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
          total_money: res.data.total_money,
        })
      }
    })
  },
  //提现全部
  getAll:function(){
    var that=this;
    that.setData({
      cash_num: that.data.total_money,
    })
  },
  //开始提现
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var mypay =parseInt(e.detail.value.money);
    if (mypay > that.data.total_money){
      that.setData({
        text: '提现金额不能超过余额',
        sucess: 0
      })
      return false;
     }
    wx.request({
      url: 'https://www.boerr.cn/Home/Bank/Bankcash',
      data: formData,
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          text:'提现成功',
          sucess: 0
        })      
      }
    });
  }, 
  //确定提现成功
  makesure:function(){
   var that=this;
   that.setData({
     sucess:1
   })
   wx.navigateTo({
     url: '../account/index',
   })
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