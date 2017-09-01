// pages/usercenter/caijian.js
var arr;
var arr1;
var NewpageX,NewpageY,NewpageX1,NewpageY1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    model:"widthFix",
    img:"",
    lefts:0,
    newLeft:0,
    newTops:0,
    scale:1,
    old_distance:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var magazine_id = options.magazine_id;
    var userInfo = wx.getStorageSync("userInfo");
    that.setData({
      openid:userInfo.openid,
      magazine_id: magazine_id
    })
    wx.getStorage({
      key: 'img_url',
      success: function (res) {
        that.setData({
          img: res.data
        })
        wx.getImageInfo({
          src: that.data.img,
          success: function (res) {
            that.setData({
              widthImg:res.width,
              path: res.path
            })
          }
        })
      }
    });
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
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          width:res.windowWidth,
          height:res.screenHeight,
          lefts: parseInt(res.screenWidth)/10
        })
      },
    });
    that.setData({
      top: (that.data.height - that.data.width)/2
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
  
  },
  // 双指缩放事件点击开始
  start:function(e){
    if(e.touches.length<=1){
      this.setData({
        NewpageX1: e.touches[0].pageX,
        NewpageY1: e.touches[0].pageY
      })
    }else{
      console.log(1);
    }
  },
  // 双指缩放事件点击开始移动
  move:function(e){
    var scalecha;
    if(e.touches.length<=1){
      this.setData({
        NewpageX: e.touches[0].pageX,
        NewpageY: e.touches[0].pageY,
      })
      this.setData({
        tops: parseInt(this.data.NewpageY) - parseInt(this.data.NewpageY1) + parseInt(this.data.newTops),
        lefts: parseInt(this.data.NewpageX) - parseInt(this.data.NewpageX1) + parseInt(this.data.newLeft)
      })
      console.log(this.data.lefts);
    }else{
      this.setData({
        NewpageX: e.touches[0].pageX,
        NewpageY: e.touches[0].pageY,
      })
      NewpageX1 = e.touches[1].pageX - e.touches[0].pageX,
        NewpageY1 = e.touches[1].pageY - e.touches[0].pageY;
      this.setData({
        tops: parseInt(this.data.NewpageY) - parseInt(this.data.NewpageY1) + parseInt(this.data.newTops),
        lefts: parseInt(this.data.NewpageX) - parseInt(this.data.NewpageX1) + parseInt(this.data.newLeft)
      })
      var Newdistance = Math.sqrt(NewpageX1 * NewpageX1 + NewpageY1 * NewpageY1);
      if(Newdistance<=0){
        Newdistance=50;
      }
      var Newscale = parseInt(Newdistance) * 0.005;
       if(Newscale<0.9){
         Newscale=0.9;
       }
      if(Newscale>parseInt(this.data.scale1)){
         scalecha =Newscale;
         if (this.data.old_distance==null){
           this.setData({
             distance: Newdistance,
             scale: scalecha
           })
         }else{
           this.setData({
             distance: Newdistance - this.data.old_distance,
             scale: scalecha
           })
         }
      }else{
        if(this.data.scale1==null){
          scalecha = Newscale;
        }else{
          scalecha = parseInt(this.data.scale1) - parseInt(parseInt(this.data.scale1) - parseInt(Newscale));
          if (scalecha <= 0.1) {
            scalecha = 0.9
          }else{
            scalecha=0.9
          }
        }
        if (this.data.old_distance == null) {
          this.setData({
            distance: Newdistance,
            scale: scalecha
          })
        } else {
          this.setData({
            distance: Newdistance - this.data.old_distance,
            scale: scalecha
          })
        }
      }  
    }
  },
  // 双指缩放事件点击事件结束
  end:function(e){
    this.setData({
      newLeft:this.data.lefts,
      newTops:this.data.tops,
      scale1: this.data.scale,
      old_distance: Math.sqrt(NewpageX1 * NewpageX1 + NewpageY1 * NewpageY1)
    })
  },
  char:function(e){
    console.log(e.target.id);
  },
  create:function(){
    var query = wx.createSelectorQuery()
    query.select('.box_son').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      console.log(res);
    })
  },
  upload:function(e){
    var that=this;
    wx.uploadFile({
      url: 'https://www.boerr.cn/Home/Upload/UploadMagazineIndexCover',
      filePath: that.data.img,
      name: 'images',
      header: {
        "content-type": "multipart/form-data"
      },
      formData: { magazine_id: that.data.magazine_id },
      success: function (res) {
       if(res.data==1){
         wx.redirectTo({
           url: 'index',
         })
        //  wx.showModal({
        //    title: '提示',
        //    content: '上传成功',
        //    showCancel: false,
        //  })
       }
      }
    })
    // wx.request({
    //   url: 'https://www.boerr.cn/Home/Upload/UploadMagazineIndexCover',
    //   data: { magazine_id: that.data.magazine_id,images:that.data.img },
    //   method: "POST",
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     console.log(res);
    //   }
    // }) 
  }
})