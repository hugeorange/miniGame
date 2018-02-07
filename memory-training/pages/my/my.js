//index.js
//获取应用实例
const app = getApp()
const inter = require('../../utils/interface.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    rank_list: 'xxx',
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
    console.log('--===')
    const param = {
      gt_type: 7,
      gt_orginal: 1,
      top: 50
    }
    inter.getTop(param, (res) => {
      console.log(res);
      this.setData({
        rank_list: JSON.stringify(res)
      })
    }, (err) => {
      console.log(err);
    })
  }
})
