//index.js
//获取应用实例
const app = getApp()
const inter = require('../../utils/interface.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    layerFlag: true
  },

  onLoad: function () {
    this.getUserInfo();
  },

  getUserInfo: function(e) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  },
  icon_rank() {
    wx.navigateTo({ url: '../rank_list/rank_list?type=icon' });
  },
  aboutMe() {
    this.setData({
      layerFlag: false
    })
  },
  noDevelop() {
    utils.showNone('正在努力开发中...');
  }
})
