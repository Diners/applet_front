// pages/novel/novel.js
var app=getApp();
var view1, view2, view3;
Page({
  data: {
    open: false,
    open1: true,
    hide:true,
    opacity: 0,
    isDeloy:0,
    num:0,
    page:1,
    isDel: true,
    isEdit:1,
    mobanList:[],
    ishides:true,
    imgList: [
      "../../images/quit.png"
    ],
    Issave:true,
    Issave1:false,
    shoucang:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var userInfo = wx.getStorageSync("userInfo");
    var users=userInfo.user_id;
    var user_id = userInfo.user_id;
    var page = parseInt(options.page);
    var modelType = options.modelType;
    var magazine_id = options.magazine_id;
    var isFinish = options.isFinish;
    var forInit = options.forInit;
    var loginId = options.user_id;
    if (loginId&&user_id != loginId){
      that.loding(user_id);
      that.setData({
        Issave:false,
        Issave1:true

      })
    }else{
      user_id = users;
      that.loding(user_id);
      that.setData({
        Issave: false,
        Issave1: true
      })
    }
    that.setData({
      magazine_id: magazine_id,
      isFinish: isFinish,
    })
    if (isFinish && isFinish == 1) {
      that.setData({
        isEdit: 0,
      })
    }
    if(page){
      that.setData({
        page:page
      })
    }
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    that.setData({
      modelType: modelType,
      magazine_id: magazine_id,
      user_id: user_id
    })
    if (forInit && forInit == 1) {
      that.initPage(magazine_id, user_id, that.data.page);
    }
    that.initPage(magazine_id,user_id,that.data.page);
  },
  //去编辑页面
  toAddNovel:function(e){
    var that = this;
    var num = e.currentTarget.dataset.idx;
    if (that.data.isEdit != 0){
      wx.redirectTo({
        url: '../novel/add_novels?num=' + num + "&magazine_id=" + that.data.magazine_id + '&page=' + that.data.page
      })
     } else {
       console.log(11);
      // if (view1 == num || view2 == num || view3 ==num){
      //   wx.navigateTo({
      //     url: '../novel/novel_detial?num=' + num + "&magazine_id=" + that.data.magazine_id + '&page=' + that.data.page

      //   })
      //  }   
      }    
  },
  //显示二维码
  toErcode:function(){
    wx.navigateTo({
      url: '../setting/ercode'
    })
  },
  //去下一页
  toNext:function(){
    var that = this;
    // that.top(that.data.magazine_id, that.data.user_id, that.data.page);  
    that.top();
  },
  //上一页
  toPrev:function(){
    var that = this;
    if (that.data.page==1){
      wx.redirectTo({
        url: '../usercenter/index'
      })
    }else{
      that.reInit(that.data.magazine_id, that.data.user_id, that.data.page);
    }
   
  },
  //新增页
  AddNext:function(){
    var that=this;   
    that.setData({
      page: parseInt(that.data.page)+1
    }) 
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/AddPageMagazine',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { page: that.data.page, user_id: that.data.user_id, magazine_id: that.data.magazine_id },
      success: function (res) {
        wx.redirectTo({
          url: '../novel/addModel?page=' + that.data.page + "&magazine_id=" + that.data.magazine_id
        })
      }
    });
    
  },
  //重新编辑
  rewrite:function(){
    var that = this;
    that.setData({
      isEdit: 1,
      isDeloy:0
    })
  },
  //删除此页
  delThis:function(){
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
  //保存修改之后
  saveModel:function(){
    var that = this;
    that.setData({
      isEdit:0,
    })
  },
  //点击确定删除此页
  sureDel: function () {
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/DeleteMagazine',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { page: that.data.page, user_id: that.data.user_id, magazine_id: that.data.magazine_id },
      success: function (result) {
        that.setData({
          Tips: "删除成功",
          ishides: !that.data.ishides
        })
        that.finde();
        if (parseInt(that.data.page) > 2) {
          wx.redirectTo({
            url: '../novel/novel?user_id=' + that.data.user_id + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" + parseInt(that.data.page) - 1 + "modelType=1",
          })
        } else {
          wx.redirectTo({
            url: '../usercenter/index',
          })
        }
        that.closeDel();
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 100,
      success: function (res) {}
    });
  },
  Side_bar: function () {
    this.setData({
      left:0,
      hide:!this.data.hide
    })
  },
  click_top:function(){
    this.setData({
      left: this.data.windowWidth1,
      hide: !this.data.hide
    })
  },
  openActions:function(){
    if (this.data.isDeloy==1){
      this.animation.rotate(0).step();  
    }else{
      this.animation.rotate(90).step();
    }
    this.setData({
      isDeloy: !this.data.isDeloy,
      animation: this.animation.export(),
    })
  },
  initPage: function (magazine_id,user_id,page){
   var that=this;
   wx.request({
     url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail1',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {page:that.data.page, user_id: user_id,magazine_id:magazine_id},
      success: function (res) {
         var model = res.data.mokuailist;
         var model1 = model[0];
         var model2 = model[1];
         var model3 = model[2];             
         if (model1) {view1 = 1;} 
         if (model2) {view2 = 2;} 
         if (model3) {view3 = 3;}
         that.setData({
           mobanList: res.data,
           page:that.data.page,
           model1: model1,
           model2: model2,
           model3: model3,
         })
      }
    });
  },
  reInit: function (magazine_id, user_id, page){
    var that=this;
    var page = parseInt(that.data.page) - 1;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail1',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { page: page, user_id: user_id, magazine_id: magazine_id },
      success: function (res) {
        if(res.data.code==0){
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
          })
        }else{
          if (res.data.moban == 1) {
            var model = res.data.mokuailist;
            var model1 = model[0];
            var model2 = model[1];
            var model3 = model[2];
            if (model1) { view1 = 1;}
            if (model2) { view2 = 2;}
            if (model3) { view3 = 3;}
            that.setData({
              mobanList: res.data,
              page: that.data.page,
              model1: model1,
              model2: model2,
              model3: model3,
            })
          }
          if (res.data.moban == 1) {
            if (parseInt(that.data.page) == 1) {
              wx.redirectTo({
                url: '../usercenter/index',
              })
            }else{
              wx.redirectTo({
                url: '../novel/novel?user_id=' + user_id + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" + parseInt(parseInt(that.data.page) - parseInt(1)) + "modelType=1",
              })
            }

          }else{
            if (parseInt(that.data.page) == 1) {
              wx.redirectTo({
                url: '../usercenter/index',
              })
            } else {
              wx.redirectTo({
                url: '../novel/novel?user_id=' + user_id + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" + parseInt(parseInt(that.data.page) - parseInt(1)) + "modelType=2",
              })
            }

          }
        }
        
      }
    })
  },
  top: function (){
    var that = this;
    var page = parseInt(that.data.page) + 1;
   
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail1',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",

      data: {page:page ,user_id: user_id, magazine_id: magazine_id },
      success:function(res){
        var pages=that.data.page;
        if(res.data.code==0){
          that.setData({
            Tips:res.data.message,
            ishides: !that.data.ishides
          })
          that.finde();
        }else{
          if (res.data.moban == 1) {           
            wx.redirectTo({
              url: '../novel/novel?user_id=' + that.data.user_id + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" + parseInt(parseInt(pages) + parseInt(1)) + "modelType=1",
            })
          } else {
            wx.redirectTo({
              url: '../novel/goodsModel?user_id=' + that.data.user_id  + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" + parseInt(parseInt(pages) + parseInt(1)),
            })
          }
        }       
      }
    })
  },
  tips: function () {
    wx.showModal({
      title: '',
      content: '敬请期待',
      showCancel: false
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        if(res.system=='iphone'){
          that.setData({
          left:res.windowWidth,
          windowWidth1: res.windowWidth,
          height:res.windowHeight-110
        })
        }else{
          that.setData({
          left:res.windowWidth,
          windowWidth1: res.windowWidth,
          height:res.windowHeight-20
        })
        }
      },
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
    var that=this;
    return {
      title: '与我有关的，都在杂志里。',
      path: '/pages/novel/novel?user_id=' +that.data.user_id + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" + that.data.page + "modelType=1",
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  // 渲染页面
  loding:function(user_id){
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail',
      method: "POST",
      data: { user_id: user_id },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var yuesa = res.data.time.split("/");
        that.setData({
          user_diy: res.data.user_diy,
          userName: res.data.user_name,
          header_Img: res.data.user_head,
          shoucang: res.data.shoucang,
        })
        if (res.data.shoucang1 == 0) {
          that.setData({
            imgList: "../../images/quit.png",
          })
        } else {
          that.setData({
            imgList: "../../images/love.png",
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})