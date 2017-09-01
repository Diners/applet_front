//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  toSetting: function () {
    wx.navigateTo({
       url: '../address/addAddress?address_id=2'
      // url: '../account/takecash'
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
