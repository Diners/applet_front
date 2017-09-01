// pages/order/order_detail.js
var h = 0;
var flag=0;
Page({
  data: {
    state: 0,
    value: 0,
    isRemind: 1,
    ishide:true,
    imgs: "../../images/check.png",
    Imgs: "../../images/uncheck.png",
    Imgs1: "../../images/uncheck.png",
    imgList:[
      "../../images/check.png",
      "../../images/uncheck.png"
    ],
    Ishide1:true,
    Tip:"",
    money:209,
    yue:198,
    brand_message:[],
    goods_list:[],
    order_message:[],
    address_message:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr=new Array();
    var userInfo = wx.getStorageSync("userInfo");
    var user_id=userInfo.user_id;
    var order_pay_id = options.order_pay_id;
    this.setData({
      duihuan:"兑换",
      order_pay_id:order_pay_id,
      openid:userInfo.openid
    });
    for(var i=0;i<2;i++){
      arr.push(i);
      arr.push("兑换");
    };
    if(this.data.money>this.data.yue){
      this.setData({
        imgs:"../../images/uncheck.png",
        Imgs1:"../../images/check.png",
        posts:1
      })
    };
    this.setData({
      openid:userInfo.openid
    })

    var address_id = options.address_id;
    var getAddress = options.getAddress;
    console.log(options)
    if (getAddress&&getAddress==1) {
      this.initAddress(user_id, address_id);
      flag=1;
      this.setData({
        address_id: address_id
      })
    }
    this.loding(flag, user_id, order_pay_id);
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //加入
  follow: function () {
    this.setData({
      followed: !this.data.followed,
      value: !this.data.value,
      isRemind: !this.data.isRemind
    });
    this.setTime();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setTimeout((function () {
      this.setData({ isRemind: 1 });
    }).bind(this), 3000);
    for (var i = 0; i < this.data.imgList.length;i++){
      this.setData({
        img: this.data.imgList[i]
      })
    }
  },
  initAddress: function (user_id,address_id) {
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Address/ShowAddress',
      data: { user_id: user_id, address_id: address_id },
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          user_rec_name: res.data.address.user_rec_name,
          user_rec_mobile: res.data.address.user_rec_mobile,
          user_address: res.data.address.user_address,
        })
      }
    });
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
  // 提交订单按钮事件
  submit_btn:function(){
    this.setData({
      Ishide1: !this.data.Ishide1
    })
  },
  // 关闭弹框
  close_btn:function(){
    this.setData({
      Ishide1:!this.data.Ishide1
    })
  },
  // 兑换按钮
  duihuan_btn:function(e){
    console.log(this.data.index+" "+e.target.dataset.index);
    if (this.data.index == e.target.dataset.index){
      if (this.data.cont.length < 6) {
        this.setData({
          Tip: "请输入兑换码",
          ishide: false
        })
      } else {
        if (isNaN(this.data.cont)) {
          this.setData({
            Tip: "请输入数字",
            isRemind: false,
            ishide: false
          })
          this.setTime();
        } else {
          this.setData({
            Tip: "兑换成功",
            isRemind: false,
            ishide: false
          })
          this.setTime();
        }
      }
    }else{
    }
  },
  // 输入input内容
  Input_content:function(e){
    var index=e.target.dataset.index;
    var cont = e.detail.value;
    this.setData({
      cont:cont,
      index:index
    })
  },
  
  // 提示框的状态
  setTime: function () {
    var that = this;
   var Times=setInterval(function(){
      h++;
      if(h>=2){
        clearInterval(Times);
        that.setData({
          ishide: true
        })
      }
    },1000)
  },
  // 切换支付方式事件1
  change: function (e) {
    var that = this;
    that.setData({
      posts: 0
    })
    if (that.data.Imgs == that.data.imgs) {
      that.setData({
        imgs: "../../images/check.png",
        Imgs: "../../images/uncheck.png",
        posts: 0
      })
    }
    else {
      that.setData({
        imgs: "../../images/uncheck.png",
        Imgs: "../../images/uncheck.png",
        Imgs1: "../../images/check.png"
      })
    }
    if (that.data.Imgs1 == that.data.imgs) {
      that.setData({
        Imgs1: "../../images/uncheck.png"
      })
    }
  },
  // 切换支付方式事件2
  change1: function (e) {
    var that = this;
    that.setData({
      posts: 1
    })
    if (that.data.Imgs == that.data.imgs) {
      that.setData({
        imgs: "../../images/check.png",
        Imgs: "../../images/uncheck.png",
      })
    }
    else {
      that.setData({
        imgs: "../../images/uncheck.png",
        Imgs: "../../images/uncheck.png",
        Imgs1: "../../images/check.png"
      })
    }
    if (that.data.Imgs1 == that.data.imgs) {
      that.setData({
        Imgs1: "../../images/uncheck.png",

      })
    }
  },
  // 点击选择地址
  address:function(){
    wx.redirectTo({
      url: '../address/index',
    })
  },
  // 点击提交订单
  payment:function(){
    // 选择的方式
    var posts=this.data.posts;
    if(posts==1){
      this.pay();
    }
  },
  loding: function (flag,user_id,order_pay_id){
    var that=this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Order/GetOrder',
      data: { user_id: user_id, order_pay_id: order_pay_id},
      method:"GET",
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        console.log(res);
        var total=0;
        var order_message;
        var he=new Array();
        if(res.data.order_list!=null){
          for (var i = 0; i < res.data.order_list.length; i++) {
            order_message = res.data.order_list[i];
            he.push(order_message);
          }
        }
        var address_message = res.data.address_message;
        that.setData({
          address_message: address_message
        })
        if (address_message!=null){
          if (flag!=1){
            that.setData({
              user_rec_name: res.data.address_message.user_rec_name,
              user_rec_mobile: res.data.address_message.user_rec_mobile,
              user_address: res.data.address_message.user_address,
              address_id: res.data.address_message.address_id,
              show: false,
              show1:true
            })
          }       
        }else{
          that.setData({
            show:true,
            show1:false
          })
        }
        that.setData({
          order_message:he,
          money: res.data.total_fee
        })
      }
    })
  },
  // 支付接口
  pay:function(res){
    var userInfo = wx.getStorageSync("userInfo");
    var user_id = userInfo.user_id;
    var that=this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Pay/PayOrder',
      data: { 
        openid:that.data.openid,
        order_pay_id: that.data.order_pay_id
        },
        method:"POST",
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          var timeStamp=res.data.timeStamp;
          wx.requestPayment({
            timeStamp:timeStamp.toString(),
            nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success:function(res){
            console.log('order_pay_id=' + that.data.address_id + that.data.order_pay_id);
            if (res.errMsg =="requestPayment:ok"){
              wx.request({
                url: 'https://www.boerr.cn/Home/Pay/PaySuccessCallback',
                data: { order_pay_id: that.data.order_pay_id , address_id:that.data.address_id, user_id:user_id},
                method:"POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success:function(res){
                  if(res.data=="true"){
                    wx.redirectTo({
                      url: '../usercenter/index',
                    })
                  }
                }
              })
            }
          },
          fail:function(res){
            console.log(res);
          }
        })
        },
        fail:function(res){
          console.log(res.data.timeStamp);
        }
    })
  }
})