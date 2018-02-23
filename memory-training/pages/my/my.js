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
    wx.navigateTo({ url: '../rank_list/rank_list?type=no' });    
  },
  onShareAppMessage() {
    let nickName = app.globalData.userInfo.nickName || '';
    return {
      title: nickName + "正在邀请您进行keep训练，一起来训练吧",
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
