// pages/commity/index.js
var page= 1;//当前页
var app=getApp();
Page({
  data: {
  commityList:[],
  sumPage:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.fetchData();
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  pullDownRefresh: function () { //下拉刷新
    var that = this;
    page = 1;
    that.setData({
      commityList: [],
    });
    that.fetchData();
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000);
  },
  reachBottom: function () { // 上拉加载更多
    var that = this;
    var num = that.data.sumPage / 4;
    if (that.data.sumPage && page<num){
      page++;
      that.fetchData();
    }  
  },
  fetchData: function () {
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Community/CommunityIndex', 
      data:{
       page_size:4,
       page:page
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          sumPage: res.data.count,
          commityList: that.data.commityList.concat(res.data.community_list)
        })     
      }
    })
  },
  //显示提示框
  showLoading:function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    });
  },
/**
 * 隐藏消息提示框
 */
 hideLoading:function() {
    wx.hideToast();
  },
  toUser:function(){
    wx.navigateTo({
      url: '../usercenter/index'
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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "今天你bb了吗?",
      path: "/pages/commity/index",
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    }
  }
})
