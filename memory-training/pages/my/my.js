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
  },
  onShareAppMessage() {
    let nickName = app.globalData.userInfo.nickName || '';
    return {
      title: nickName + "正在邀请您玩keep记忆，一起来玩吧",
      path: "pages/index/index",
      imageUrl: "../../assets/image/share.jpg",
      success: function(res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '转发失败',
          icon: 'success',
          duration: 1500
        })
      }
    }
  }
})
