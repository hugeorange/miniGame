//index.js
//获取应用实例
const app = getApp()
const inter = require('../../utils/i-nterface.js');
const util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    layerFlag: true
  },
  onLoad: function () {
    console.log('xxxxxxxxx');
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
  close() {
    this.setData({
      layerFlag: true
    })
  },
  noDevelop() {
    util.showNone('正在努力开发中...');
  }
})
