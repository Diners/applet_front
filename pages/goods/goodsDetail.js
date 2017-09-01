// pages/goods/goodsDetail.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  right:0,
  userInfo:"",
  Ishide:true,
  indexs:0,
  numbers:1,
  goods_standard:[],
  goods_images:[],
  goods_info1:[],
  urls:0,
  ishides:true,
  starnd_img:"../../images / shopping1.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var ids = options.goods_id;
    var brand_id = options.brand_id;
    var userInfo = wx.getStorageSync("userInfo");
    var user_id = userInfo.user_id;
    if(brand_id==undefined){
      console.log( );
    }else{
      that.setData({
        brand_id: brand_id
      })
    }
    that.show(ids,user_id);
    that.loading(user_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          right: res.windowWidth-20,
        })
      },
    })
    
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo.avatarUrl
      })
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
    return {
      title:"给你丢个好宝贝，快接住!"+this.data.goods_name,
      path:"/pages/goods/goodsDetail?goods_id="+this.data.goods_id,
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      }
    }
  },
  IsHIDE:function(e){
    var that=this;
    that.setData({
      Ishide:!that.data.Ishide,
      urls: e.currentTarget.dataset.id
    })
  },
  adctiveTap:function(e){
    var that=this;
    var price = e.target.dataset.price;
    var starnd = e.target.dataset.starnd;
    that.setData({
      indexs: e.target.dataset.starnd,
      indexs1: e.target.dataset.starnd,
      price: that.data.goods_standard[parseInt(e.target.dataset.starnd)-1].price,
      price1: that.data.goods_standard[parseInt(e.target.dataset.starnd) - 1].price,
      goods_price:price
    })
    for (var i = 0; i < that.data.goods_standard.length;i++){
      if (that.data.goods_standard[i].standard_id == starnd){
        var starnd_img = that.data.goods_standard[i].standard_image;
        that.setData({
          starnd_img: starnd_img
        })
      }
    }
  },
  reduceTap:function(){
    var that=this;
    var Num = that.data.numbers;
    if(Num<=1){
      Num:1,
        that.setData({
          ishides: !that.data. ishides,
          Tips: "一件起售",
          price: that.data.price1
        })
      that.finde();
    }else{
      that.setData({
        numbers:Num-1,
        price:parseInt(that.data.price)-parseInt(that.data.price1)+".00"
      })
    }
  },
  addTap: function () {
    var that = this;
    var Num = that.data.numbers;
    if (isNaN(parseInt(that.data.price1))){
      that.setData({
        ishides:!that.data.ishides,
        Tips:"请优先选择规格",
      })
      that.finde();
    }else{
      that.setData({
        numbers: Num + 1,
      })
      that.setData({
        price: parseInt(that.data.numbers) * parseInt(that.data.price1) + ".00"
      })
    }
    
  },
  Close_display:function(){
    var that = this;
    that.setData({
      Ishide: !that.data.Ishide
    })
  },
  show: function (ids,user_id) {
    var that=this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Goods/GoodsDetail',
      method: "GET",
      data: { user_id: user_id, goods_id: ids },
      header: {
        'conten-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          // 商品名字
          goods_name:res.data.goods_info.goods_name,
          // 商品id
          goods_id:res.data.goods_info.goods_id,
          // // 商品价格
          goods_price: res.data.goods_info.goods_price,
          // // 商品售出数量
          goods_sell_num: res.data.goods_info.goods_sell_number,
          // // 商品收藏数量
          // save_count: res.data.goods_info.save_count,
          // // 品牌id
          brand_id: res.data.brand.brand_id,
          // // 品牌名称
          brand_name: res.data.brand.brand_name,
          // // 品牌图片
          brand_img: res.data.brand.brand_img,
          // // 品牌标签
          brand_label: res.data.brand.brand_label,
          // // 品牌详情
          brand_desc: res.data.brand.brand_desc,
          // // 收藏状态
          // collect_type: res.data.collect_type
        })
        that.setData({
          goods_standard: res.data.goods_standard,
          goods_images: res.data.goods_images,
          goods_info1: res.data.goods_info,
          price:res.data.goods_standard[0].price,
          starnd_img:res.data.goods_images[0]
        })
        console.log(that.data.brand_id);
      }
    })
  },
  submit:function(){
    var that=this;
    var userInfo = wx.getStorageSync("userInfo");
    var user_id = userInfo.user_id;
    var goods_id=new Array();//商品详情id
    var goods_number = new Array();//商品数量
    var standard_id = new Array();//商品规格id
    goods_id.push(that.data.goods_id);
    goods_number.push(that.data.numbers);
    standard_id.push(that.data.indexs);
    if (that.data.urls==1){
      console.log(goods_id + " " + goods_number + " " + standard_id + " " + that.data.brand_id);
      wx.request({
        url: "https://www.boerr.cn/Home/Cart/AddCart",
        data: { user_id: user_id, goods_id: goods_id, num: goods_number, standard_id: standard_id, brand_id: that.data.brand_id },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              ishides: !that.data.ishides,
              Tips: "加入购物车成功",
            })
            that.finde();
          } else {
            that.setData({
              ishides: !that.data.ishides,
              Tips: "加入购物车失败",
            })
            that.finde();
          }
        }
      })
    }else{
      wx.request({
        url: 'https://www.boerr.cn/Home/Order/AddOrder',
        data: { 
          goods_id: goods_id,
           goods_number: goods_number, 
           standard_id: standard_id, 
           order_price: parseFloat(that.data.goods_price)*parseFloat(goods_number), 
           user_id, user_id, 
           address_id:1
           },
        method: "POST",
        header: {
         'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(res);
          var order_pay_id = res.data.order_pay_id;
          wx.redirectTo({
            url: '../buy/index?order_pay_id=' + order_pay_id,
          })
        }
      })
    }
  },
  cart:function(){
    var userInfo = wx.getStorageSync("userInfo");
    var user_ids = userInfo.user_id;
    wx.redirectTo({
      url: '../cart/index?user_id='+user_ids,
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
      if(t==1){
        that.setData({
          Ishide: !that.data.Ishide
        })
      }
    }, 1000)
  },
  pay:function(){
    var userInfo = wx.getStorageSync("userInfo");
    var user_id = userInfo.user_id;
  },
  // 获取用户信息
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
        that.setData({
          user_diy: res.data.user_diy,
          userName: res.data.user_name,
          header_Img: res.data.user_head,
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  back:function(){
    wx.navigateBack({
      delta:1
    })
  }
})