//logs.js
const util = require('../../utils/util.js')
const inter = require('../../utils/i-nterface.js');
const cfg = require('../../utils/config.js');
const app = getApp();

Page({
  data: {
    rankList: [],
    type: ''
  },
  onLoad: function (option) {
    this.setData({ type: option.type });
    this.onShareAppMessage();
    this.icon_rank();
  },
  icon_rank() {
    let param;
    if (this.data.type === 'icon') {
      param = {
        gt_type: 7,
        gt_orginal: 1,
        top: 50
      }
    } else if(this.data.type === 'no') {
      param = {
        gt_type: cfg.numberMode,
        gt_orginal: 1,
        top: 50
      }
    }
    
    inter.getTop(param, (res) => {
      console.log(res.data);
      this.setData({ rankList: res.data });
    }, (err) => {
      console.log(err);
      wx.showToast({
        title: '网络异常，请稍候再试...',
        icon: 'none',
        duration: 2000
      })
    })
  },
  // 分享信息
  onShareAppMessage() {
    let nickName = app.globalData.userInfo.nickName || '';
    return {
      title: nickName + "正在邀请您进行记忆力训练，一起来训练吧",
      path: "pages/index/index",
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


