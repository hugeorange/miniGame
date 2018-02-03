//index.js
//获取应用实例
const app = getApp()
const cfg = require('../../utils/config.js');

Page({
  data: {
    
  },
  onLoad: function () {

  },
  goGame(e) {
    console.log(e);
    var pageParam = e.currentTarget.dataset.game;
    wx.navigateTo({url: '../' + pageParam + '/' + pageParam});
  },
  playVoice(e) {
    let url = cfg.audioCfg[e.currentTarget.dataset.url];
    console.log(url);

    // const innerAudioContext = wx.createInnerAudioContext();
    // innerAudioContext.autoplay = true;
    // innerAudioContext.src = url;
    // innerAudioContext.onPlay(() => {
    //     console.log('开始播放')
    // });
    // innerAudioContext.onError((res) => {
    //     console.log(res.errMsg)
    //     console.log(res.errCode)
    // });


    var res = wx.getSystemInfoSync()
    if (res.platform == 'ios') {
    this.audio = wx.getBackgroundAudioManager()
    } else {
    this.audio = wx.createInnerAudioContext();
    }
  
    this.audio.title = "音乐文件";
    this.audio.src = url;
    this.audio.play();
    console.log('播放音频...');

  }
})
