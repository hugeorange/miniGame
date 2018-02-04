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
  }
})
