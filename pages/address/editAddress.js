// pages/address/addAddress.js
var app=getApp();
var tcity = require("../../utils/citys.js");
Page({
  data: {
     provinces: [],
     province: "",
     citys: [],
     city: "",
     countys: [],
     county: '',
     value: [0, 0, 0],
     values: [0, 0, 0],
     condition: false,
     isDo:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var address_id = options.address_id;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo && userInfo != "undefined") {
      var user_id = userInfo.user_id;
    }
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      address_id:address_id,
      user_id: user_id
    })
    that.initPage(user_id, address_id);
  },
 //点击编辑按钮
  toEdit:function(){
    var that = this;
    that.setData({
      isDo: false,
    });
  },
  //设为默认地址
  setDefault:function(e){
    console.log(e);
    var that = this;
    var value = e.currentTarget.dataset.value;
    if (that.data.isDo == true) {
      return false;
    }
    value=value==1?'0':'1';
    wx.request({
      url: 'https://www.boerr.cn/Home/Address/ShowAddress',
      data: { user_id: that.data.user_id, address_id: that.data.address_id },
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        res.data.address.user_imp = value;
        that.setData({
          address: res.data.address
        })
      }
    });
  },
  //点击确定按钮
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData);
    wx.request({
      url: 'https://www.boerr.cn/Home/Address/EditAddress',
      data: formData,
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          isDo: true,
        });
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '../address/index?isSuccess=1'
          }) 
        }
      }
    });
  },
  bindChange: function (e) {
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      const citys = [];
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }
      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        county: cityData[val[0]].sub[0].sub[0].name,
        citys: citys,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      }) 
      this.changeAddDetail();
      return;
    }
    if (val[1] != t[1]) {
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      this.changeAddDetail();
      return;
    }
    if (val[2] != t[2]) {
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      this.changeAddDetail();
      return;
    }
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  initPage: function (user_id, address_id){
   var that = this;
   wx.request({
     url:'https://www.boerr.cn/Home/Address/ShowAddress',
     data: { user_id: user_id, address_id: address_id},
     method: "post",
     header: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     success: function (res) {
       console.log(res.data);
       that.setData({
         address: res.data.address
       })
     }
   });
 },
changeAddDetail:function(){
  var that = this;
  var user_address = that.data.province + " " + that.data.city + " " + that.data.county;
  wx.request({
    url: 'https://www.boerr.cn/Home/Address/ShowAddress',
    data: { user_id: that.data.user_id, address_id: that.data.address_id },
    method: "post",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      res.data.address.user_address = user_address;
      that.setData({
        address: res.data.address
      })
    }
  });
},
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