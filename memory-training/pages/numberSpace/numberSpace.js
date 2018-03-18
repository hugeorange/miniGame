//获取应用实例
const app = getApp()
const cfg = require('../../utils/config.js');
const utils = require('../../utils/util.js');
const inter = require('../../utils/i-nterface.js');

Page({
  data: {
    isShowPanel: 1,
    level: 1,
    baseList: [],  // 基础列表
    numberList: [], // 训练数字数组
    posArr: [], // 训练数字位置
    reFlag: false, // 记好了标记     
  },
 
  onLoad: function () {
    this.judgeSystem();
    this.init();
  },
  // 训练初始化
  init() {
    this.currentMode = ''; // 当前训练模式
    this.currentPos = []; //当前训练等级数字位置
    this.index = 1; // 全局索引标记 
    let list1 = [];
    let list2 = [];
    let list3 = [];
    let num = cfg.numberSpace;
    for(let i=0; i< num; i++) {
      let obj1 = { no: i, num: '' };
      let obj2 = { no: i, num: '' };
      list1.push(obj1);
      list2.push(obj2);
      list3.push(i);
    }
    this.setData({
      baseList: list1,
      numberList: list2,
      posArr: list3,
      reFlag: false, // 记好了标记
    }, () => {
      this.createCurrent();
    });
  },
  // 创建当前训练等级
  createCurrent() {
    let level = this.data.level;
    let posArr = this.data.posArr;
    let list = [];
    let pos = utils.getNumArray(posArr, level);
    for(let i=1; i<=level; i++) {
      let obj = {i:'', pos: '', remeberFlag: false}; 
      obj.i = i;
      obj.pos = pos[i-1];
      list.push(obj);
    }
    this.currentPos = list;
    this.renderNumber();
  },
  renderNumber() {
    let baseList = this.data.baseList;
    for(let i=1; i<=this.currentPos.length; i++) {
      for(let j=0; j<baseList.length; j++) {
        if(this.currentPos[i-1].pos === baseList[j].no) {
          baseList[j].num = i;
          baseList[j].remeberFlag = this.currentPos[i-1].remeberFlag;
        }
      }
    }
    this.setData({
      baseList: baseList
    })
  },
  // 记好了
  goRemembered() {
    let reFlag = this.data.reFlag;
    let baseList = this.data.baseList;
    if(!reFlag) {
      baseList.forEach(element => {
        if(element.remeberFlag === false) {
          element.remeberFlag = true;
        }
      });
      this.setData({
        baseList: baseList,
        reFlag: true,
      })
    }
  },
  // 选择数字
  selectNum(e) {
    let level = this.data.level;
    let reFlag = this.data.reFlag;
    let baseList = this.data.baseList;
    let num = e.target.dataset.num;
    let no = e.target.dataset.no;
    let rem = e.target.dataset.rem;
    console.log(num, no, 'this.index:', this.index);
    if(reFlag && num && rem) {
      console.log('我执行了...');
      baseList[no].remeberFlag = false;
      if(num === this.index) {
        console.log('训练成功');
        this.playVoice(1);
        this.index++;
      } else {
        console.log('训练失败');
        baseList[no].fail = 1;
        this.playVoice(2);
        setTimeout(() => {
          this.noPass();
        }, 2000);
      }
      this.setData({
        baseList: baseList,
      });
      if (this.index === level + 1) {
        console.log('通过训练');
        level++;
        setTimeout(() => {
          this.pass(level);
        }, 800);
      }
    }
    if(!reFlag) {
      utils.showNone('请先点击记好了，然后才能开始训练...');      
    }
  },

  // 通过当前训练等级
  pass(level) {
    if(level > cfg.numberSpace) {
      wx.showModal({
        title: '提示',
        content: '恭喜您，通过全部训练',
        complete: () => {
          this.m_postInfo( level-1 ); // 提交成绩
          this.setData({ isShowPanel: 3 });
          this.downloadImg("myCanvas1");
        }
      })
      return;
    }
    this.setData({
      level: level,
    }, () => {
      this.setData({
        reFlag: false,
      })
      this.init();
    })
  },
  // 未通过当前训练等级
  noPass() {
    this.setData({
      isShowPanel: 2,
    })
    utils.showNone('当前等级训练失败！', 2500);
    this.m_postInfo( this.data.level-1 );
    this.downloadImg();
  },
  // 继续训练
  goPlay() {
    this.setData({
      isShowPanel: 1,
      level: 1,
    }, () => {
      this.init();
    })
  },
  // 不练了
  noPlay() {
    wx.navigateBack();
  },
   // 提交当前数据
   m_postInfo(level) {
    let param = {
      type: cfg.numberMode,
      orginal: 1,
      score: level,
    }
    inter.saveUserInfoScore(param, (res) => {
      console.log(res);
      wx.showToast({
        title: '成绩提交成功！',
        icon: 'success',
        duration: 3000
      })
    }, (err) => {
      console.log(err);
    })
  },

  // 分享信息
  onShareAppMessage: function (res) {
    let title = '';
    let level = this.data.level - 1;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      title = '我在keep记忆训练中，完成了' + level + '级训练';
    } else {
      title = app.globalData.userInfo.nickName + "正在邀请您进行keep记忆训练，一起来训练吧";
    }
    return {
      title: title,
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
  },

  judgeSystem() {
    const res = wx.getSystemInfoSync();
    this.setData({ systemInfo: res });
  },
  // 播放声音 传递的为声音在cfg文件的索引
  playVoice(audioNo) {
    let systemInfo = this.data.systemInfo;
    let audioSource = cfg.audioCfg;
    let audioItem = audioSource[audioNo];
    let url;
    url = cfg.audioCfg[audioNo];
    // if (systemInfo.platform == 'ios') {    // 安卓、ios兼容,好像不好使了
      // this.audio = wx.getBackgroundAudioManager();
    // } else {
      this.audio = wx.createInnerAudioContext();
    // }
    console.log(url);
    this.audio.title = '...'; // 必须加这一行，不然ios会报错
    this.audio.src = url;
    this.audio.play();
    this.audio.onPlay(() => {
      console.log('播放音频...');
    })
  },
  // 通关下载福利照
  goDownYLJ() {
    const url = cfg.img;
    console.log(url);
    utils.showLoading('下载中...');
    wx.downloadFile({
      url: url,  
      success:function(res){  
        console.log(res)  
        wx.saveImageToPhotosAlbum({  
          filePath: res.tempFilePath,  
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
      fail:function(err){  
        wx.hideLoading();
        console.log(err);
        utils.showSucc('下载失败！');
      }  
    })
  },
  onUnload() {
    let isShowPanel = this.data.isShowPanel;
    let level = this.data.level;
    if(isShowPanel === 1 && level > 1) {
      this.m_postInfo(level - 1);
    }
    console.log('我反悔了');
  },

    /************************************************* 画布 ***********************************************/
   // 下载称号图片文件
   downloadImg(canvas) {
    utils.showLoading('加载中...');
    wx.downloadFile({
      url: app.globalData.userInfo.avatarUrl || 'https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/7.png',
      success:(res) => {
        console.log(res);
        this.drawImage(res.tempFilePath, canvas);
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
  drawImage(imgUrl, ctxCanvas) {
    console.log("ctxCanvas:", ctxCanvas, "imgUrl:", imgUrl);
    let contextCanvas = ctxCanvas || "myCanvas";
    const titleObj = this.getTitle();
    const nickName = app.globalData.userInfo.nickName || '---';

    const ctx = wx.createCanvasContext(contextCanvas);
    ctx.setFillStyle('#fff');
    ctx.fillRect(0, 0, 400, 440);
    ctx.setFontSize(12);
    ctx.setFillStyle("orange");

    ctx.setFontSize(14);
    ctx.drawImage(imgUrl, 125, 20, 50, 50);
    ctx.setTextAlign('center');
    ctx.fillText(nickName, 150, 90);
    ctx.fillText(`在keep记忆中达到了 ${ctxCanvas ? '满' : this.data.level - 1} 级`, 150, 110);
    ctx.fillText(`获得了 ${titleObj.title} 称号`, 150, 130);
    ctx.fillText('来挑战我吧！', 150, 150);

    ctx.drawImage(`../../assets/image/icon/${titleObj.img}`, 90, 170, 120, 120);    

    ctx.drawImage('../../assets/image/sharema.jpg', 110, 300, 80, 80);    
    ctx.setTextAlign('center');
    ctx.fillText('长按图片来挑战吧', 150, 395);

    ctx.draw();
  },

  // 获取称号
  getTitle() {
    let level = this.data.level -1 ;
    let num = parseInt(level/10) + 1;
    let titleObj = {};
    if(num < 5) {
      titleObj = {
        title: cfg.title['d' + num].title,
        img:  cfg.title['d' + num].img,
      }
    } else {
      titleObj = {
        title: cfg.title.d5.title,
        img:  cfg.title.d5.img,
      }
    }
    return titleObj;
  },

  // 保存 canvas 图片
  saveCanvas(e) {
    console.log(e);
    let ctxCanvas = e.target.dataset.canvas;
    wx.canvasToTempFilePath({
      canvasId: ctxCanvas,
      success: (res) => {
        console.log(res);
        this.canvasImgUrl = res.tempFilePath;
        this.goDownload();
      } 
    })
  },
  // 下载 canvas 保存的图片
  goDownload() {
    wx.showModal({
      title: '提示',
      content: '点击确定下载截图到相册，分享截图到朋友圈，邀请更多朋友一起来挑战',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if(res.confirm) {
          utils.showLoading('下载中...');
          wx.saveImageToPhotosAlbum({
            filePath: this.canvasImgUrl,
            success: function (res) {
              wx.hideLoading();
              utils.showNone('成功下载到相册，请到相册选择图片分享到朋友圈，邀请更多朋友一起来挑战', 6000);
            },
            fail: (err) => {
              console.log(err);
              wx.hideLoading();
              if(err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                utils.showSucc('下载失败！');
              } else {
                // "saveImageToPhotosAlbum:fail auth deny"
                this.guideUserAuth();
              }
            }
          })
        }  
      }
    })
  },
  /************************************************ 画布 *******************************************************/  
  // 卸载页面
  onUnload() {
    this.handlerLimit && clearInterval(this.handlerLimit);
    console.log('卸载页面');
  },
   // 弹框提示引导用户去授权
   guideUserAuth() {
    wx.showModal({
      title: '提示',
      content: '您尚未授权小程序访问您的相册，这将影响您下载图片发布朋友圈',
      confirmText: '授权',
      cancelText: '不授权',
      success: (res) => {
        if (res.confirm) {
          this.setUserAuth();
        } else if (res.cancel) {
          console.log('用户拒绝授权...');
        }
      }
    })
  },
  // 强制用户去授权
  setUserAuth() {
    wx.openSetting({
      success: (res) => {
        console.log(res);
        this.goDownload();
      },
      fail: (err) => {
        console.log(err);
        utils.showSucc('授权失败！');
      }
    })
  },

})

