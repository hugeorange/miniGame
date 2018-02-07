//index.js
//获取应用实例
const app = getApp()
const cfg = require('../../utils/config.js');
const utils = require('../../utils/util.js');
const inter = require('../../utils/interface.js');

Page({
  data: {
    
  },
  onLoad: function () {
    this.getUserInfo();
  },
  goGame(e) {
    var pageParam = e.currentTarget.dataset.game;
    if(pageParam !== 'numberSpace') {
      wx.navigateTo({url: '../' + pageParam + '/' + pageParam});
    } else {
      utils.showNone('正在努力开发中...');
    }
  },
  postUserInfo(res) {
    let param = {
      encryptedData: res.encryptedData,
      iv: res.iv
    }
    inter.saveUserInfo(param);
  },
  getUserInfo() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res);
              this.postUserInfo(res);
              app.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
  }
})
