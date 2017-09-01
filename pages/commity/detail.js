// pages/commity/detail.js
var app=getApp();
var page=1;
var collect_url;
var joinUrl;
Page({
  data: {
    currentTab: 0,
    topicList:[],
    goodsList:[],
    community_message:{},
    brand_id:[],
    isReport:true,
    isDel: true,
    isFold:0,
    sumPage: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //获取commityId
    var that = this;
    var commityId = options.commityId;
    that.setData({
      commityId: commityId
    })
    
    //调用应用实例的方法获取全局数据
    var userInfo= wx.getStorageSync("userInfo");
    if(userInfo&&userInfo!="undefined"){
      that.setData({
        user_id: userInfo.user_id
      })
    }
    that.fectchList(commityId, that.data.user_id, page);
    that.fetchGoodsList(commityId, page);
  },
  //展开收起
  load:function(){
    var that=this;
    this.setData({
      text: !this.data.text,
      isFold: !this.data.isFold
    });
  },
   //tab切换
  navbarTap: function (e) {
    var that=this;
    that.setData({
      currentTab: e.target.dataset.idx
    }) 
  },
  //加入
  follow: function (e) {
    var that = this;
    var join_type = e.currentTarget.dataset.value;
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo && userInfo != "undefined") {var user_id=userInfo.user_id}
    if (join_type==1){
      joinUrl = 'https://www.boerr.cn/Home/Community/QuitCommunity';
    } else if (join_type ==0){
      joinUrl ='https://www.boerr.cn/Home/Community/JoinCommunity';  
   }
   wx.request({
     url: joinUrl,
     data: {
       community_id:that.data.commityId,
       user_id: user_id
     },
     method: "post",
     header: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     success: function (res) {
       that.pullDownRefresh();
     }
   })
  },
  //举报
  report:function(){
    var that = this;
    //定义动画
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(300).step();
    that.setData({
      isReport: false,
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }.bind(that), 200) 
  },
  //删除
  showDel: function (e) {
    var that = this;
    that.setData({
      isDel: false,
      isReport: true
    })
  },
  //关闭删除
  closeDel: function () {
    var that = this;
    that.setData({
      isDel: true
    })
  },
  //关闭举报
  closeReport:function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(300).step()
    that.setData({
      animationData: animation.export(),  
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        isReport: true
      })
    }.bind(that), 200)
  
  },
  //收藏
  isAddLove:function(e){
    var state = e.currentTarget.dataset.id;
    var article_id = e.currentTarget.dataset.articleid;
    var that=this;
    if (state==1){
      collect_url ="https://www.boerr.cn/Home/Community/ArticleCancelLike"
    } else if (state==0){
      collect_url ="https://www.boerr.cn/Home/Community/ArticleLike"
    }
    wx.request({
      url: collect_url,
      data: {
        article_id: article_id,
        user_id: that.data.user_id
      },
      method:"post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.pullDownRefresh();
      }
    })
  },
  //去发表
  toPost:function(){
    var that = this;
    wx.redirectTo({
      url: '../commity/post?commityId=' + that.data.commityId,
      success: function () { 
      }
    })
  },
  // //下拉刷新
  // pullDownRefresh: function () { 
  //   var that = this;
  //   page = 1;
  //   that.setData({
  //     topicList: [],
  //     goodsList:[]
  //   });
  //   that.fectchList(that.data.commityId, that.data.user_id,page);
  //   that.fetchGoodsList(that.data.commityId,page);
  //   setTimeout(function () {
  //     wx.stopPullDownRefresh();
  //   }, 1000);
  // },
  // reachBottom: function () { // 上拉加载更多
  //   var that = this;
  //   var num = that.data.sumPage / 3;
  //    num=parseInt(num)+1;
  //   if (that.data.sumPage && page <= num) {
  //     page=page+1;
  //     console.log(page)
  //     that.fectchList(that.data.commityId, that.data.user_id,page);
  //     that.fetchGoodsList(that.data.commityId, page);
  //   }
  // },
  fectchList: function (commityId, user_id, page){
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Community/CommunityList',
      data: {
        page_size: 3,
        page: page,
        user_id: user_id,
        community_id:commityId
      },
      method:"get",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
         that.setData({
           topicList: that.data.topicList.concat(res.data.article_list),
          // topicList: res.data.article_list,
           community_message: res.data.community_message,
           title: res.data.community_message.title,
           sumPage: res.data.count
         })
         console.log(that.data.topicList);
         //动态实现标题转化
         wx.setNavigationBarTitle({
           title: res.data.community_message.title,
           success: function () {},
         });
      }
    })
  },
  //去杂志页
  toUserCenter:function(e){
    var user_id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../usercenter/index?user_id=' + user_id,
    })
  },
  fetchGoodsList: function (commityId, page){
    var that = this;
    wx.request({
      url: 'https://www.boerr.cn/Home/Community/AdviceList',
      data: {
        page_size: 3,
        page: page,
        community_id: commityId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          goodsList: that.data.goodsList.concat(res.data.brand_list), 
          sumPage: res.data.count,
          brand_id:res.data.brand_id
        })
        var length = res.data.brand_list.length;
        for (let i = 0; i<length; i++) {
          var goods_list = res.data.brand_list[i].goods_list;
          var brand_id=res.data.brand_id[i].brand_id;
          that.setData({
            goods_list: goods_list,
            brand_id:brand_id
          })
        }
      }
    })
  },
  //去商品详情
  forGoodsDetail:function(e){
     var goods_id = e.currentTarget.dataset.id;
     for (var i = 0; i < this.data.goodsList.length;i++){
       var brand_id=this.data.goodsList[i].brand_id;
    }
     wx.navigateTo({
       url: '../goods/goodsDetail?goods_id=' + goods_id + "&brand_id=" + brand_id,
    })
  },
  //显示提示框
  showLoading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
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
    return {
      title: this.data.title,
      path: "/pages/commity/detail?commityId=" + this.data.commityId,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    }
  }
})
