// pages/usercenter/index.js
var app = getApp();
var isImgEdit=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open:false,
    open1:true,
    Ishide:true,
    Ishide1:true,
    opacity:0,
    header_Img:"",
    userName:"",
    degs:0,
    left:750,
    isa:false,
    pageX1:0,
    NewpageX1:0,
    pageX2: 0,
    NewpageX2: 0,
    windowWidth1:0,
    cont:"",
    cont1:"",
    Vcont:"",
    Vcont1:"",
    user_diy:"",
    Times:"",
    magazine_id:0,
    day:0,
 days:[
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun'
 ],
 yues:[
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
 ],
 Eday:"",
 Eyue:'',
 Enian:0,
 Eda:0,
 Inputs:"",
 opacity:0,
 shoucang:0,
 imgList:[
   "../../images/quit.png"
 ],
 background:"rgba(0,0,0,0)",
 hide:true,
 none:"none",
 none1:"block",
 char:false,
 char1:true,
 page:0,
 ishides:true,
 scale:0,
 leftY:38,
 leftY1:38,
 leftY2:38,
 Img:"../../images/meinv.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var ids = options.user_id;
    var userInfo = wx.getStorageSync("userInfo");
    var user_ids=userInfo.user_id;
    var Eday="";
    if(ids==undefined){
      that.setData({
        char: false,
        char1: true
      })
    }else{
      if (userInfo.user_id == ids) {
        that.setData({
          char: false,
          char1: true
        })
      } else {
        that.setData({
          char: true,
          char1: false
        })
      }
    }
    if (ids==undefined){
      console.log('xxxxxxxxxxxxx'+userInfo);
      that.loading(user_ids);
    }else{
      user_ids=ids;
      console.log('xxxxxxxxxxxxx' +userInfo);
      that.loading(user_ids);
    }
// 微信授权相册
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']){
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success:function(res){
                // wx.startRecord();
              }
            })
        }
      }
    })

    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    that.setData({
      Eday: that.data.days[new Date().getDay()-1]
    })
    
  },
toCommity:function(){
  wx.redirectTo({
    url: '../commity/index'
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    var userInfos= wx.getStorageSync("userInfo");
  that.setData({
    Vcont:that.data.cont,
    Vcont1: that.data.cont1,
    V: true,
    T: false
  })
  wx.getSystemInfo({
    success: function(res) {
      that.setData({
        left:res.windowWidth,
        windowWidth1:res.windowWidth
      })
    },
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
  onShareAppMessage: function (res) {
    var user = wx.getStorageSync("userInfo").user_id;
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: '与我相关的，都在杂志里。',
      path: '/pages/usercenter/index?user_id='+user,
      success: function (res) {
        var shareTicket=res.shareTickets[0];
        // 转发成功
        wx.getShareInfo({
          shareTicket: shareTicket,
          success:function(res){
            console.log(res);
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '你取消了分享',
          showCancel:false
        })
        // 转发失败
      },
      complete:function(res){
      }
    }
  },
// 点击add按钮 按钮旋转
xuanzhuan:function(e){
    var that=this;
    if(that.data.degs==45){
      that.setData({
        degs:0,
        leftY:38,
        leftY1:38,
        leftY2:38,
        scale:0,
      })
    }else{
      that.setData({
        degs:45,
        leftY: 138,
        leftY1: 238,
        leftY2: 338,
        scale: 1,
      })
    }
},
// 点击编辑按钮
bianji:function(){
   isImgEdit=true;
    this.setData({
      Ishide1: false,
      open:true,
      Ishide:true,
      open1:false,
      cont: this.data.Vcont,
      cont1:this.data.Vcont1,
      none:"block",
      none1:"none",
      degs:0,
      leftY: 38,
      leftY1: 38,
      leftY2: 38,
      scale: 0,
    })
},
// 点击添加按钮
add:function(){
  var that = this;
  var userInfo = wx.getStorageSync("userInfo");
  var user_id = userInfo.user_id;
  wx.request({
    url: 'https://www.boerr.cn/Home/Magazine/AddPageMagazine',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    data: { page:1, user_id: user_id, magazine_id: that.data.magazine_id },
    success: function (res) {
      wx.redirectTo({
        url: '../novel/addModel?page=1' + "&magazine_id=" + that.data.magazine_id
      })
    },
  })
},
// 点击二维码按钮
erweicode:function(){
  wx.navigateTo({
    url: '../setting/ercode',
  })
},
// 点击完成按钮
 submit:function(){
   var userInfos = wx.getStorageSync("userInfo");
   var that=this;
   wx.request({
     url: 'https://www.boerr.cn/Home/Magazine/EditMagazine',
     method:"POST",
     data:{
       user_id:userInfos.user_id,
       magazine_id: that.data.magazine_id,
       magazine_title: that.data.cont1,
       title:that.data.Inputs,
       desc: that.data.cont
     },
     header:{
       "content-type":"application/x-www-form-urlencoded"
     },
     success:function(res){
       if(res.data.code==1){
          that.setData({
            Ishide1: true,
            open: false,
            Ishide: true,
            open1: true,
            degs: 0,
            none:"none",
            none1:"block",
            ishides: false,
            Tips:res.data.message
      })
          that.finde();
       }
       
     },
     fail:function(res){
       that.setData({
         Tips:"登陆失败",
       })
       that.finde();
     }
   })
 },
changes:function(e){
  if (e.currentTarget.dataset.id=="changes"){
    if (this.data.open1 == false) {
    } else {
      this.setData({
        left: 0,
        hide: false
      })
    }
  }else{
    return false;
  }
},
click_top:function(){
  this.setData({
    left: this.data.windowWidth1,
    hide: true
  })
},
  // 进入页面进行加载
loading: function (user_ids){
    var that=this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail',
      method: "POST",
      data: { user_id: user_ids },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var yuesa = res.data.time.split("/");
        that.setData({
          user_diy:res.data.user_diy,
          Times:res.data.time,
          Inputs:res.data.small_title,
          magazine_id: res.data.magazine_id,
          userName:res.data.user_name,
          cont:res.data.desc,
          Img: res.data.cover,
          cont1:res.data.title,
          Eyue: that.data.yues[parseInt(yuesa[1]-1)],
          shoucang:res.data.shoucang,
          Enian:yuesa[0],
          Eda:yuesa[2],
          Vcont: res.data.desc,
          Vcont1: res.data.title,
          cover:res.data.cover,
          header_Img: res.data.user_head,
        })
        if(res.data.shoucang1==0){
          that.setData({
            imgList: "../../images/quit.png",
          })
        }else{
          that.setData({
            imgList: "../../images/love.png",
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  // 监听输入信息
  jianting1:function(e){
    this.setData({
      cont1:e.detail.value,
      Vcont1:e.detail.value
    })
  },
  jianting2:function(e){
    this.setData({
      cont:e.detail.value,
      Vcont:e.detail.value
    })
  },
  jianting3:function(e){
    this.setData({
      Inputs: e.detail.value
    })
  },
  // 点击收藏按钮
  Save:function(){
    var that=this;
    var userInfo = wx.getStorageSync("userInfo");
    var user_ids = userInfo.user_id;
    wx.request({
      url: 'https://www.boerr.cn/Home/Magazine/LikeMagazine',
      method: "POST",
      data: { user_id: user_ids, magazine_id: that.data.magazine_id },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if(res.data.code==1){
          if(res.data.message=="添加收藏成功"){
            that.setData({
              imgList: "../../images/love.png",
              shoucang: parseInt(that.data.shoucang)+1
            })
          }else{
            that.setData({
              imgList: "../../images/quit.png",
              shoucang: parseInt(that.data.shoucang) - 1
            })
          } 
        }
      }
    })
  },
  // 点击下一页
  browse:function(e){
    var userInfo = wx.getStorageSync("userInfo");
    var user_ids = userInfo.user_id;
    var that=this;
    if (e.currentTarget.dataset.id == "browse"){
      that.setData({
        page: parseInt(that.data.page) + 1
      })
      wx.request({
        url: 'https://www.boerr.cn/Home/Magazine/MagazineDetail1',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: { page: that.data.page, user_id: user_ids, magazine_id: that.data.magazine_id },
        success: function (res) {
          if (res.data.moban == 1) {
            wx.redirectTo({
              url: '../novel/novel?user_id='+user_ids+'&modelType=1&magazine_id=' + that.data.magazine_id + "&page=" + that.data.page + "&isFinish=1",
            })
          } else {
            wx.request({
              url: 'https://www.boerr.cn/Home/Magazine/Checkagent',
              method: "POST",
              data: { user_id: user_ids },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                if (res.data.code == 0) {
                  that.setData({
                    Tips: "你什么都没有哦！还不赶快添加",
                    ishides: !that.data.ishides
                  })
                  that.finde();
                } else {
                  if (res.data.moban == 2) {
                    wx.navigateTo({
                      url: '../novel/goodsModel?user_id=' + user_ids + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" + parseInt(that.data.page),
                    })
                  }
                  else {
                    wx.navigateTo({
                      url: '../novel/novel?user_id=' + user_ids + '&magazine_id=' + that.data.magazine_id + "&isFinish=1" + "&page=" + parseInt(parseInt(that.data.page)) + "modelType=1",
                    })
                  }
                }
              }
            })

          }
        }
      });
    }else{
      return false;
    }
  },
  tishi:function(){
    wx.showModal({
      title: '',
      content: '敬请期待',
      showCancel: false,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  finde:function(){
    var that=this;
    var t=0;
    var time = setInterval(function(){
      t++;
      if(t>=2){
        clearInterval(time);
        that.setData({
          ishides:!that.data.ishides
        })
      }
    },1000)
  },
  // 点击封面图片更换
  chang:function(){
    if (!isImgEdit){
      return  false;
    }
    var that=this;
    wx.showActionSheet({
      itemList: ['选择相册/拍照更换封面'],
      success: function(res) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {
              wx.setStorage({
                key: "img_url",
                data: res.tempFilePaths[0]
              })
              wx.navigateTo({
                url: 'caijian?magazine_id=' + that.data.magazine_id,
              })
            },
            fail: function(res) {},
            complete: function(res) {},
          })
      },
    })
  }
})