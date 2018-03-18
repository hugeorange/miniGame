//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js');

Page({
  data: {
    uimg: "",
  },
  onLoad: function () {
    this.setData({
      uimg: app.globalData.userInfo.avatarUrl || 'https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/7.png',
      nickName: app.globalData.userInfo.nickName || '---'
    }, () => {
      // this.drawImage();
      this.downloadImg();
    })
  },


  // 下载称号图片文件
  downloadImg() {
    utils.showLoading('加载中...');
    wx.downloadFile({
      url: this.data.uimg,
      success:(res) => {  
        console.log(res);
        this.drawImage(res.tempFilePath);
      },
      fail: (err) => {  
        console.log(err);
        this.drawImage('../../assets/image/default.png');
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },

  // drawImage
  drawImage(imgUrl) {
    const ctx = wx.createCanvasContext('myCanvas');
    const nickName = app.globalData.userInfo.nickName || '---';
    ctx.setFillStyle('#fff');
    ctx.fillRect(0, 0, 400, 400);
    ctx.setFontSize(12);    
    ctx.setFillStyle("orange");  

    ctx.setFontSize(14);
    ctx.drawImage(imgUrl, 125, 10, 50, 50);
    ctx.setTextAlign('center');
    ctx.fillText(nickName, 150, 80);
    ctx.fillText('在keep记忆中达到了18级', 150, 100);
    ctx.fillText('获得了战神称号', 150, 120);
    ctx.fillText('来挑战我吧！', 150, 140);

    ctx.drawImage('../../assets/image/icon/xiaobai.jpg', 90, 160, 120, 120);    

    ctx.drawImage('../../assets/image/sharema.jpg', 110, 300, 80, 80);    
    ctx.setTextAlign('center');
    ctx.fillText('长按图片来挑战吧', 150, 395);

    ctx.draw();
  },

  // 保存 canvas 图片
  saveCanvas() {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: (res) => {
        console.log(res);
        this.goDownload(res.tempFilePath);
      } 
    })
  },
  // 下载 canvas 保存的图片
  goDownload(url) {
    console.log(url);
    utils.showLoading('下载中...');
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success: function (res) {
        wx.hideLoading();
        utils.showSucc('下载成功！');
      },
      fail: function (err) {
        console.log(err);
        wx.hideLoading();
        utils.showSucc('下载失败！');
      }
    })
  },


  canvas_circle() {
    const ctx = wx.createCanvasContext('myCanvas1');
    let src = this.data.uimg;
    ctx.save();
    ctx.arc(20, 20, 20, 0, 2 * Math.PI);
    // 从画布上裁剪出这个圆形
    ctx.clip();
    ctx.drawImage(src, 0, 0, 40, 40);
    ctx.draw(false, () => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas1',
        success: (res) => {
          this.circleImg = res.tempFilePath;
          console.log("resss:", res.tempFilePath);
        } 
      })
    });
  },

  start: function(e) {
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  move: function(e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end: function(e) {
    this.setData({
      hidden: true
    })
  }
})
    

    // var query = wx.createSelectorQuery();
    // query.select('#canvas').boundingClientRect();
    // query.exec(function (res) {
    //   let width = res[0].height;
    //   utils.canvasTextAutoLine('大桔子在keep记忆中闯过了15关，正在邀请你来一起比拼。。。', ctx, width, 0, 30, 2);
    // });
