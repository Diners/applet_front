// pages/setting/ercode.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPreview:1,
    src:"",
    ishides: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.shouquan();
    that.imgInfo();
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  // previewImage: function () {
  //   var that = this;
  //   that.setData({
  //     isPreview: 0
  //   })
  // },
  // close:function(){
  //   var that = this;
  //   that.setData({
  //     isPreview: 1
  //   })
  // },
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
    return {
      title: '制造你的专属杂志',
      path: "/pages/setting/ercode",
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    }
  },
  // 点击二维码图片
  previewImage:function(){
 wx.previewImage({
   urls: ["http://qr.topscan.com/api.php?&w=800&text=http://www.jia1n1.com/index.php/index/index?sign={$new_fenxiang}"],
 })
  },
  // 授权相册
  shouquan:function(){
    wx.getSetting({
      success:function(res){
        console.log(res);
      if (res.authSetting['scope.writePhotosAlbum'])
        {}else{
        wx.openSetting({
          success: (res) => {
            console.log(2);
          }
        })
        }
      }
    })
  },
  // 长按保存图片
  longtaps:function(){
    var that=this;
    wx.showActionSheet({
      itemList:['保存图片'],
      success:function(res){
        if(res.tapIndex==0){
          wx.saveImageToPhotosAlbum({
            filePath: that.data.src,
            success:function(res){
              that.setData({
                Tips: "保存成功",
                ishides: !that.data.ishides
              })
              that.finde();
            },
            fail:function(res){
              console.log(res);
            }
          })
        }
      }
    })
  },
  // 获取图片信息
  imgInfo:function(){
    var that=this;
    wx.getImageInfo({
      src: 'http://qr.topscan.com/api.php?&w=800&text=http://www.jia1n1.com/index.php/index/index?sign={$new_fenxiang}',
      success: function (res) {
        that.setData({
          src:res.path
        })
      }
    })
  },
  finde: function () {
    var that = this;
    var t = 0;
    var time = setInterval(function () {
      t++;
      if (t >= 2) {
        clearInterval(time);
        that.setData({
          ishides: !that.data.ishides
        })
      }
    }, 1000)
  },
})