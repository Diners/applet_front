// pages/novel/goodsModel.js
Page({
  data: {
    open: false,
    open1: true,
    hide:true,
    opacity: 0,
    isHide:1,
    currentTab:1,
    isEdit:1,
    isDeloy:0,
    isDel:1,
    magazine_id:'',
    imgList: [
      "../../images/quit.png"
    ],
    shoucang: 0,
    Issave: true,
    Issave1: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var userInfo = wx.getStorageSync("userInfo");
    var users = userInfo.user_id;   
    var user_id = options.user_id;
    var page = options.page;
    var modelType = options.modelType;
    var magazine_id = options.magazine_id;
    var isFinish = options.isFinish;
    
    if (isFinish && isFinish==1){
      that.setData({
        isEdit: 0,
        magazine_id : options.magazine_id
      })
    }
    if (user_id = users) {
      that.loading(user_id);
      that.setData({
        Issave: true,
        Issave1: false
      })
    } else {
      user_id = users;
      that.loading(user_id);
      that.setData({
        Issave: false,
        Issave1: true
      })
    }
    that.fecthModelData(user_id);
     that.setData({
       user_id: user_id,
       page: page
    })
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    var that=this;
    that.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 100,
      success: function (res) {
        console.log(res)
      }
    });
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          left: res.windowWidth
        })
      },
    })
  },
  //保存修改之后
  saveModel: function () {
    var that = this;
    that.setData({
      isEdit: 0,
    })
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/AddPageMagazine1',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { page:1, user_id: that.data.user_id, magazine_id: that.data.magazine_id },
      success: function (res) {
       console.log(res.data);
      }
    });
  },
  openActions: function () {
    if (this.data.isDeloy == 1) {
      this.animation.rotate(0).step();
    } else {
      this.animation.rotate(90).step();
    }
    this.setData({
      isDeloy: !this.data.isDeloy,
      animation: this.animation.export(),
    })
  },
  //显示二维码
  toErcode: function () {
    wx.redirectTo({
      url: '../setting/ercode'
    })
  },
  addNext:function(){
    wx.redirectTo({
       url: '../novel/addModel'
     })
  },
  //去下一页
   toNext: function () {
     var that=this;
     
     that.reInit();
 },
//去上一页
   toPrev: function () {
     var that = this;
     that.top();
   },
  //删除此页
  delThis: function () {
    var that = this;
    that.setData({
      isDel: false
    })
  },
  //关闭删除
  closeDel: function () {
    var that = this;
    that.setData({
      isDel: true
    })
  },
  //确定删除
  sureDel:function(){
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/DeleteMagazine',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {page:that.data.page,user_id: that.data.user_id,magazine_id: that.data.magazine_id},
      success: function (result) {
        that.closeDel();
      }
    });
  },
  navbarTap: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.idx,
      category_id: e.currentTarget.dataset.id
    })
    that.fetchData(that.data.brand_id,that.data.category_id)
  },
  silde: function () {
    this.setData({
      left:0,
      open: !this.data.open,
      open1: !this.data.open1,
      hide: !this.data.hide
    })
    console.log(this.data.left+" "+this.data.open+" "+this.data.open1);
  },
  hideSearch: function () {
    var that = this;
    that.setData({
      left: 0,
      open: !that.data.open,
      open1: !that.data.open1,
      hide: !that.data.hide
    })
    console.log(that.data.left + " " + that.data.open + " " + that.data.open1);
  },
  showSearch:function(){
    var that = this;
    that.setData({
      isHide: 0,
    })
  },
  fetchTypeInfo:function(e){
    var val=e.detail.value;
  },
  fecthModelData: function (user_id) {
    var that=this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/Checkagent',
      method: "POST",
      data: {user_id:user_id},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          goodsList: res.data.goods_list,
          tags:res.data.fenlei,
          brand_id: res.data.brand_id
        })
      }
    })
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
        console.log(res.data);
        that.setData({
          goodsList: res.data.goods_list,
          tags: res.data.fenlei,
        })
      }
    })
  },
  tips:function(){
    wx.showModal({
      title: '',
      content: '敬请期待',
      showCancel:false
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
    var that=this;
    return {
      title:"这里只卖好东西",
      path: '/pages/novel/goodsModel?user_id=' +that.data.user_id + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" +that.data.pag,
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      }
    }
  },
  // 页面加载用户信息
  loading: function (user_id) {
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail',
      method: "POST",
      data: { user_id: user_id },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var yuesa = res.data.time.split("/");
        that.setData({
          user_diy: res.data.user_diy,
          userName: res.data.user_name,
          header_Img: res.data.user_head
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  reInit:function(){
    var that=this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail1',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { page: that.data.page, user_id: that.data.user_id, magazine_id: that.data.magazine_id },
      success: function (res) {
        console.log(res);
        if(res.data.code==0){
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }else{
          if (res.data.moban == 1) {
            wx.redirectTo({
              url: '../novel/novel?modelType=1&magazine_id=' + that.data.magazine_id + "&page=" + parseInt(parseInt(that.data.page)+1),
            })
          } else {
            wx.redirectTo({
              url: '../novel/goodsModel?user_id=' + that.data.user_id + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" + that.data.page,
            })
          }
        }
          
      }
    });
  },
  top:function(){
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail1',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { page: that.data.page, user_id: that.data.user_id, magazine_id: that.data.magazine_id },
      success: function (res) {
        console.log(res);
        console.log(that.data.magazine_id);
       if(res.data.code==0){
         if(res.data.moban==2){
           wx.redirectTo({
             url: '../novel/goodsModel?magazine_id=' + that.data.magazine_id + '&page=' + parseInt(parseInt(that.data.page) - 1) + '&isFinish=1&user_id=' + that.data.user_id,
           })
         }else{
           if(that.data.page==1){
             wx.redirectTo({
               url: '../usercenter/index'
             })
           }else{
             wx.redirectTo({
               url: '../novel/novel?modelType=1&magazine_id=' + that.data.magazine_id + '&page=' + parseInt(parseInt(that.data.page) - 1) + '&isFinish=1&user_id=' + that.data.user_id,
             })
           }
          
         }
        
       }
      }
    })
  }
})