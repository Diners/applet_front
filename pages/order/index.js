// pages/order/order_detail.js
var h = 0;
Page({
  data: {
    state: 0,
    value: 0,
    isRemind: 1,
    imgs: "../../images/check.png",
    Imgs1: "../../images/uncheck.png",
    imgList:[
      "../../images/check.png",
      "../../images/uncheck.png"
    ],
    Ishide1:true,
    Tip:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      duihuan:"兑换"
    })
    
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
  duihuan_btn:function(){
    if(isNaN(this.data.cont)){
      this.setData({
        Tip: "请输入数字",
        isRemind:false
      })
     this.setTime();
    }else{
      this.setData({
        Tip:"兑换成功",
        duihuan:"兑换成功",
        isRemind: false
      })
     this.setTime();
    }
  },
  // 输入input内容
  Input_content:function(e){
    var cont = e.detail.value;
    this.setData({
      cont:cont
    })
  },
  
  // 提示框的状态
  setTime: function () {
    var that = this;
   var Times=setInterval(function(){
      h++;
      console.log(h);
      if(h>=2){
        clearInterval(Times)
      }
    },1000)
  },
  // 选择支付方式
  change:function(e){
    console.log(e);
  }
})