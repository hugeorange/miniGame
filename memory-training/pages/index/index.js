//index.js
//获取应用实例
const app = getApp()
const cfg = require('../../utils/config.js');
const utils = require('../../utils/util.js');
const inter = require('../../utils/interface.js');

Page({
  data: {
    iconArr: []
  },
  onLoad: function () {
    this.getUserInfo();
    // this.testIcon();
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
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.postUserInfo(res);
        app.globalData.userInfo = res.userInfo;
        console.log("appInfo:", app.globalData.userInfo);
      },
      fail: err => {
        console.log("err:", err);
        this.guideUserAuth();
      }
    })
  },
  // 弹框提示引导用户去授权
  guideUserAuth() {
    wx.showModal({
      title: '提示',
      content: '您尚未授权小程序获取您的用户信息，这将影响您的游戏成绩的上传',
      confirmText: '授权',
      cancelText: '不授权',
      success: (res) => {
        if (res.confirm) {
          this.setUserAuth();
        } else if (res.cancel) {
          console.log('用户拒绝授权...')
        }
      }
    })
  },
  // 强制用户去授权
  setUserAuth() {
    wx.openSetting({
      success: (res) => {
        console.log(res);
      }
    })
  },

  testIcon() {
    var iconArr = cfg.iconArr;
    console.log(iconArr);
    this.setData({
      iconArr: iconArr
    })
  },
  // 分享信息
  onShareAppMessage() {
    let nickName = app.globalData.userInfo.nickName || '';
    return {
      title: nickName + "正在邀请您玩记忆力大挑战，一起来玩吧",
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
