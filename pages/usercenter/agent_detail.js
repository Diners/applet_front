// pages/usercenter/agent_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Index:0,
    header_Img:"",
    user_name:"",
    Ishide:true,
    fahuo:[{
      text: "确认发货",
      border:2,
      indexs:0
    },{
        text: "确认发货",
        border: 2,
        indexs:1
    }],
    top:0,
    left:0,
    isa: true,
    Inputcontent:"",
    Newarr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addArry();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          header_Img: res.userInfo.avatarUrl,
          user_name: res.userInfo.nickName,
          Ishide:false
        })
      }
    })
    var Times = setTimeout(function(){
      that.setData({
        Ishide:true
      })
      if(that.data.Ishide==true){
        clearTimeout(Times);
      }
    },2000)
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          top: (res.windowHeight-124)/2,
          left:(res.windowWidth-302)/2
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
    console.log(res.from);
  },
  changes:function(e){
    this.setData({
      Index: e.target.dataset.index
    })
  },
  // 更改确认收货和待确认收获的样式
  queding:function(e){
    let that=this;
    that.setData({
      isa: !that.data.isa
    })

  },
  // 获取文本框输入的内容
  InputTaps:function(e){
    var that=this;
    that.setData({
      Inputcontent:e.detail.value
    })
  },
  // 提交订单号
  SubmitINputContent:function(e){
    var that=this;
    // var index=e.target.dataset.index;
    // var Newborder=that.data.fahuo[index].borders;
    // var Newtext=that.data.fahuo[index].text;
    // Newtext ="待确认收货";
    // Newborder=0;
    // var txt=that.data.fahuo;
    // var txt1 = that.data.fahuo;
    // txt[index].text=Newtext;
    // txt1[index].border=Newborder;
    // var show = txt1[index].border;
    // that.setData({
    //   fahuo:txt,
    //   show: Newborder
    // })
    if(that.data.Inputcontent.length<=0){
     wx.showModal({
       title: '提示',
       content: '请输入订单号',
       showCancel:false,
     })
    }else if(isNaN(that.data.Inputcontent)==true){
      wx.showModal({
        title: '提示',
        content: '请输入数字',
        showCancel: false,
        success:function(res){
        console.log(res);
        }
      })
    }else{
      that.setData({
        isa: !that.data.isa
      })
    }
  },
  // 关闭输入订单号框
  closeBox:function(){
    this.setData({
      isa:!this.data.isa
    })
  },
  // 动态创建二维数组
  addArry:function(){
    var arr=new Array();
      for(var t=0;t<5;t++){
        arr=[{
            id:t,
            coun:t
        }]
        this.data.Newarr = arr.concat(this.data.Newarr);
      }
      var Kill=this.data.Newarr;
      for(var k=0;k<=Kill.length-1;k++){
        if(Kill[k].id==0){
          
        }
      }
      this.setData({
        Newarr: this.data.Newarr.concat(arr)
      })
  }
})