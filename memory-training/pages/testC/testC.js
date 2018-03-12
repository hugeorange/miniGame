//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js');

Page({
  data: {
  },
  onLoad: function () {
    const ctx = wx.createCanvasContext('myCanvas')
    // drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.setFontSize(20)
    ctx.setFillStyle('red')
    ctx.fillText('大桔子在keep记忆中闯过了15关，正在邀请你来一起比拼。。。', 20, 20)

    ctx.drawImage('../../assets/image/sharema.jpg', 35, 70, 230, 230);
    ctx.draw();
  },
})
