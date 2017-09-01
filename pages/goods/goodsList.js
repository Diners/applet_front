// pages/goods/goodsList.js
var page=1;
var app = getApp();
Page({
  data: {
    goodslist: [],
    sumPage: "",
    category_list:[],
    current:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var brand_id = options.brand_id;
    var category_id = options.category_id;
    if (!category_id){
      category_id=1;
    }
    that.fetchData(brand_id,category_id);
    that.setData({
      brand_id: brand_id,
     category_id: category_id
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
  //到商品详情
  forGoodsDetail:function(e){
    var goods_id=e.currentTarget.dataset.id;
   wx.redirectTo({
     url: 'goodsDetail?goods_id='+ goods_id,
   })
  },
  changeTag:function(e){
    var that = this;
    that.setData({
      current: e.currentTarget.dataset.id,
      category_id:e.currentTarget.dataset.id
    }) 
    that.fetchData(that.data.brand_id, that.data.category_id);
  },
  pullDownRefresh: function () { //下拉刷新
    var that = this;
    page = 1;
    that.setData({
      goodslist: [],
    });
    that.fetchData(that.data.brand_id, that.data.category_id);
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000);
  },
  reachBottom: function () { // 上拉加载更多
    var that = this;
    var num = that.data.sumPage / 4;
    if (that.data.sumPage && page < num){
      page++;
      that.fetchData(that.data.brand_id, that.data.category_id);
    }
  },
  fetchData: function (brand_id, category_id) {
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Goods/BrandGoodsList',
      data: {
        page_size: 6,
        page: page,
        brand_id: brand_id,
        category_id: category_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          sumPage: res.data.count,
          goodslist:res.data.goods_list,
          category_list: res.data.category_list
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