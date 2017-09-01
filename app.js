//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // wx.removeStorage("userInfo");
    // if (wx.getStorageSync("userInfo")) return;
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://www.boerr.cn/Home/Login/WxLogin',
            data: { code: res.code },
            mothed: "get",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data.openid && res.data.code == 0) {
                ajaxUserInfo(res.data.openid);
              } else {
                console.log('xxxxxxxxxxxxxxxx'+res.data.user_message);
                wx.setStorageSync("userInfo", res.data.user_message);
              }
            }
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
function ajaxUserInfo(openid) {
  wx.getUserInfo({
    withCredentials: false,
    success: function (res) {
      var user_name = res.userInfo.nickName;
      var user_avatar_url = res.userInfo.avatarUrl;
      var user_sex = res.userInfo.gender;
      var user_country = res.userInfo.country;
      var user_province = res.userInfo.province;
      var user_city = res.userInfo.city;
      wx.request({
        url: 'https://www.boerr.cn/Home/Login/UserInfoSet',
        data: { openid: openid, user_name: user_name, sex: user_sex, user_head: user_avatar_url, user_addr: user_country + user_province + user_city },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.user_message) {
            wx.setStorageSync("userInfo", res.data.user_message);
          } else {
            console.log('注册用户信息接口没有返回用户信息！');
          }

        }
      })
    }
  })
}
