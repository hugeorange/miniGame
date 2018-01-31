//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {

  },
  goGame(e) {
    console.log(e);
    var pageParam = e.currentTarget.dataset.game;
    wx.navigateTo({url: '../' + pageParam + '/' + pageParam});
  }
})
