// pages/cart/index.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    top:0,
    left:0,
    Ishide:true,
    Ishide1:true,
    imgs:"../../images/check.png",
    Imgs:"../../images/uncheck.png",
    Imgs1: "../../images/uncheck.png",
    posts:0,
    cart_list:[],
    arr:[],
    total:0,
    len:[],
    lang:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id =parseInt(options.user_id);
    this.setData({
      user_id: user_id
    })
    this.showCart(user_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          top: (res.windowHeight - 247)/2,
          left: (res.windowWidth - 302)/2+10
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
  onShareAppMessage: function () {
  
  },
  // 点击Y事件
  OkTap:function(e){
    var that=this;
    that.setData({
      Ishide:!that.data.Ishide,
      car_id: e.currentTarget.dataset.id
    })
    console.log(that.data.car_id);
  },
  // 点击隐藏删除按钮
  hide:function(){
    this.setData({
      Ishide: !this.data.Ishide,
    })
  },
  // 点击x事件
  checkTap:function(e){
    var that=this;
    that.setData({
      Ishide1:!that.data.Ishide1
    })
  },
  // 点击结算按钮事件
  Settlement:function(){
    var that = this;
    var goods_id=new Array();
    var standard_id=new Array();
    var goods_number=new Array();
    for(var i=0;i<that.data.cart_list.length;i++){
      for(var j=0;j<that.data.cart_list[i].goods.length;j++){
        goods_id.push(that.data.cart_list[i].goods[j].goods_id);
        goods_number.push(that.data.cart_list[i].goods[j].num);
        standard_id.push(that.data.cart_list[i].goods[j].standard_id);
      }
    }
    wx.request({
      url: 'https://www.boerr.cn/Home/Order/AddOrder',
      data: {
        goods_id: goods_id,
        goods_number: goods_number,
        standard_id: standard_id,
        order_price: that.data.num1,
        user_id : that.data.user_id,
        address_id: 1
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var order_pay_id = res.data.order_pay_id;
        wx.redirectTo({
          url: '../buy/index?order_pay_id=' + order_pay_id,
        })
      }
    })
  },
  // 点击+事件
  addNum: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    for(var i=0;i<that.data.cart_list.length;i++){
      for(var j=0;j<that.data.cart_list[i].goods.length;j++){
        if (that.data.cart_list[i].goods[j].brand_id==id){
          var num = that.data.cart_list[i].goods[index].num;
          num++;
          var NewNum = that.data.cart_list;
          NewNum[i].goods[index].num=num;
          that.setData({
            cart_list: NewNum,
            num1: (parseFloat(NewNum[i].goods[index].price) + parseFloat(that.data.num1)).toFixed(2)
          })
          return false;
        }
      }
    }
  },
  // 点击-事件
  reduce:function(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    for (var i = 0; i < that.data.cart_list.length; i++) {
      for (var j = 0; j < that.data.cart_list[i].goods.length; j++) {
        if (that.data.cart_list[i].goods[j].brand_id == id) {
          var num = that.data.cart_list[i].goods[index].num;
          num--;
          var NewNum = that.data.cart_list;
          NewNum[i].goods[index].num = num;
          if(num<=0){
            num=1;
          }else{
            that.setData({
              cart_list: NewNum,
              num1: (parseFloat(that.data.num1) - parseFloat(NewNum[i].goods[index].price)).toFixed(2)
            })
          }
          return false;
        }
      }
    } 
  },
  // 支付事件
  payment:function(){
    console.log(this.data.posts);
    if(this.data.posts==0){
      wx.redirectTo({
        url: '../buy/index',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '您选择了微信支付',
        showCancel: false,
        success: function (res) {
        }
      })
    }
  },
  // 渲染购物车列表
  showCart:function(user_id){
    var that=this;
    var num1=0;
    var user;
    wx.request({
      url: 'https://www.boerr.cn/Home/Cart/ShowCart',
      data:{user_id:user_id},
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        that.setData({
          cart_list: res.data.cart
        })
        for(var i=0;i<res.data.cart.length;i++){
          for(var j=0;j<res.data.cart[i].goods.length;j++){
            num1+=res.data.cart[i].goods[j].price*res.data.cart[i].goods[j].num;
          }
        }
        that.setData({
          num1:num1.toFixed(2)
        })
        console.log(that.data.num1);
      }
    })
  },
  // 删除购物车列表
  delet:function(){
    var cart_id = this.data.car_id;
    var userInfo = wx.getStorageSync("userInfo");
    var user_ids = userInfo.user_id;
    wx.request({
      url: 'https://www.boerr.cn/Home/Cart/DelCart',
      data: { cart_id: cart_id,user_id:user_ids},
      method:"POST",
      header:{
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          if(res.data.code==1){
           this.setData({
             Tips:"删除成功",
             ishides:!this.data.ishides
           })
           this.finde();
          }else{
            this.setData({
              Tips: "删除失败",
              ishides: !this.data.ishides
            })
            this.finde();
          }
        },
        fail:function(res){
          console.log(res);
        },
        complete:function(res){
          console.log(res);
        }
      }
    })
  },
})