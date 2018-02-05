//index.js
//获取应用实例
const app = getApp()
const cfg = require('../../utils/config.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    
  },
  onLoad: function () {

  },
  goGame(e) {
    var pageParam = e.currentTarget.dataset.game;
    if(pageParam !== 'numberSpace') {
      wx.navigateTo({url: '../' + pageParam + '/' + pageParam});
    } else {
      utils.showNone('正在努力开发中...');
    }
    wx.setStorageSync('userInfo', {a:1, b: 2});
    // console.log(wx.getStorageSync('userInfo'));

    utils.ajax('https://www.zoomwei.cn/api/59715d4f7dd24.html', {code: '123456'}, (res) => {}, (err) => {}, 'post');
  }
})
