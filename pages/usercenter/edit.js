// pages/usercenter/edit.js
var app=getApp();
Page({
  data: {
    isSex:true,
    sex:0,
    isDo:true,
    isphone:true,
    sendText:'发送'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用应用实例的方法获取全局数据 
    app.getUserInfo(function (userInfo){
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //获取本地的user_id;
   var userInfo = wx.getStorageSync("userInfo");
    that.initPage(userInfo.user_id);
  },
  //点击编辑
  tochange:function(){
    var that = this;
    that.setData({
      isDo: false,
    });
  },
  
  //打开弹框
  showSex:function(){
    console.log("showSex");
    var that=this;
    if (that.data.isDo==true) {
      return false;
   }
    that.setData({
     isSex:false
    });
  },
 //关闭弹框
  closeSex:function(){
    var that = this;
    that.setData({
      isSex: true
    });
  },
  //点击改变性别
  changeSex:function(){
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    var user_id=userInfo.user_id;
    wx.request({
      url: 'https://www.boerr.cn/Home/Person/GetPersonInfo',
      data: { user_id: user_id },
      method: "get",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {   
        if (that.data.sex == 0) {
          res.data.user_sex = 0;
        } else {
          res.data.user_sex = 1;
        }
        that.setData({
          user: res.data
        })
      }
    });
       that.closeSex();
  },
  
  //选择性别
  chooseSex:function(){
    var that=this;
    that.setData({
      sex: !that.data.sex
    });
  },
  //点击更换打开弹窗
  changePhone:function(){
    var that = this;
    if (that.data.isDo == true) {
      return false;
    }
    that.setData({
      isphone: false
    });
  },
  //获取手机号
  getphoneValue:function(e){
   var that=this;
   var phone=e.detail.value;
   that.setData({
     phone: phone
   });
  },
  //验证码
  getcodeValue:function(e){
    var that = this;
    var code = e.detail.value;
    that.setData({
      code: code
    });
  },
 //发送短信
  sendMess: function () {
    console.log(1);
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    var user_id=userInfo.user_id;
    if (that.data.sendText == "发送") {
      if (that.data.phone == "") {
        wx.showToast({
          title: '',
          content:"请输入手机号!"
        })
      } else {
        wx.request({
          url: 'https://www.boerr.cn/Home/SendMessage/ChangeSendMessage',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: { phone: that.data.phone, user_id: user_id},
          success: function (res) {
            console.log(res.data);
            var a = 60;
            that.setData({
              sendText: "60s"
            })
            var timer = setInterval(function () {
              a--;
              that.setData({
                sendText: a + "s"
              })
              if (a == 0) {
                clearInterval(timer);
                that.setData({
                  sendText: "发送"
                })
              };
            }, 1000);
          }
        });
      }
    }
  },
  //关闭弹框
  closePhone:function(){
    var that = this;
    that.setData({
      isphone: true
    });
  },
  //确定更换
  sureChangePhone:function(){
    var that=this;
    var userInfo = wx.getStorageSync("userInfo");
    var user_id = userInfo.user_id;
    wx.request({
      url: 'https://www.boerr.cn/Home/SendMessage/CheckSendMessage',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {phone:that.data.phone,code:that.data.code,user_id:user_id},
      success: function (res) {
        console.log(res.data);
        if(res.data.code==1){
          that.closePhone();
          that.getphoneValue();
          wx.showModal({
            title: '',
            content: '手机号设置成功',
          })
        }
        
      }
    });
  },

  //去地址管理
  toAddress:function(){
    var that = this;
    if (that.data.isDo == true) {
      return false;
    }
   wx.navigateTo({
     url: '../address/index',
   })
  },

  //点击编辑完成
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: 'https://www.boerr.cn/Home/Person/EditPersonInfo',
      data: formData,
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          isDo: true,
        });
      }
    });
  }, 
  //初始化页面 
  initPage:function(user_id){
    var that=this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Person/GetPersonInfo',
      data: {user_id:user_id},
      method: "get",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          user: res.data
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