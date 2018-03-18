//index.js
//获取应用实例
const app = getApp();
const cfg = require('../../utils/config.js');
const utils = require('../../utils/util.js');
const inter = require('../../utils/i-nterface.js');

Page({
  data: {
    isShowPanel: 1,
    timeCfg: {
      time1: cfg.limitTime.time1,
      time2: cfg.limitTime.time2,
      time3: cfg.limitTime.time3
    },
    spareTime: '', // 剩余时间
    currentModeTime: '', // 当前模式时间
    currentGameMode: '', // 当前训练模式
    baseList: [],
    iconList: [],  // 图标元素
    iconPosArr: [], // 图标位置
    level: 1, // 当前训练等级
    passArr: [], // 已使用过的图标数组
    currentArr: [], // 当前训练的图标数组
    clickNo: '', // 当前点击的索引
    isPassClass: '', // 是否通过训练的标志
    systemInfo: {}, // 系统信息
    audioSource: [], //声音资源
  },
  
  onLoad: function () {
    // this.loadSource();
    // this.downloadImg();
  },

  loadSource() {
    utils.showLoading('加载中...');
    const res = wx.getSystemInfoSync();
    this.setData({ systemInfo: res });
    let url = cfg.audioCfg;

    let source = [url[0], url[1], url[2]];
    let paromiseArr = [];
    let promiseItem;

    source.forEach((element,index) => {
      promiseItem = new Promise((resolve, reject) => {
        this.downloadMp3(url[index], (res) => {
          resolve(res);
        })
      })
      paromiseArr.push(promiseItem);
    })

    Promise.all(paromiseArr).then((res) => {
      res.forEach((item, index) => {
        if(item.errMsg === "downloadFile:ok") {
          item.flag = true;
        } else {
          item.flag = false;
        }
      })
      console.log('声音素材加载完成！', res);
      this.setData({audioSource: res});
      wx.hideLoading();
    })
  },

  // 下载文件
  downloadMp3(url, cb) {
    wx.downloadFile({
      url: url,  
      success:function(res){  
        console.log(res);
        cb && cb(res);
      },
      fail:function(err){  
        console.log(err);
        cb && cb(err);
      }  
    })
  },

  // 刷新page，相当于将页面状态全部置为初始化时候
  refreshPage() {
    this.setData({
      isShowPanel: 1,
      timeCfg: {
        time1: cfg.limitTime.time1,
        time2: cfg.limitTime.time2,
        time3: cfg.limitTime.time3
      },
      spareTime: '',
      currentModeTime: '',
      currentGameMode: '',
      baseList: [],
      iconList: [],
      iconPosArr: [],
      level: 1,
      passArr: [],
      currentArr: [],
      clickNo: '',
      isPassClass: '',
    }, () => {
      // 进入模式选择页面了，所以不需要做什么事情了。
    })
  },

  // 初始化图标
  initIcon() {
    let list1 = [];
    let list2 = [];
    let list3 = [];
    let num = cfg.iconNum;
    let iconArr = cfg.iconArr;
    for(let i=0; i< num; i++) {
      let obj1 = { no: i, icon: '', isSelect: false };
      let obj2 = { no: i, icon: iconArr[i]};
      list1.push(obj1);
      list2.push(obj2);
      list3.push(i);
    }
    this.setData({
      baseList: list1, // 基础列表
      iconList: list2, // 基础图标
      iconPosArr: list3 // 图标位置
    }, () => {
      this.createCurrent();
    });
  },

  // 根据当前等级随机出相应数量的图标
  createCurrent() {
    let level = this.data.level;  // 当前等级
    let gameMode = this.data.currentGameMode; // 当前等级模式
    let iconList = this.data.iconList;  // 所剩图标数组
    let currentArr = this.data.currentArr;  // 当前等级图标元素数组
    let iconPosArr = this.data.iconPosArr; // 位置数组
    let [...passArr] = currentArr; // 深拷贝上一等级的图标数组

    let { index, item } = utils.getOneArray(iconList); // 随机取出当前等级的新图标
    let posArr = utils.getNumArray(iconPosArr, level); // 取出当前等级的随机位置

    currentArr.push(item);
    iconList.splice(index, 1);
    
    // 每完成一级训练打乱位置
    if(gameMode !== '1') {
      currentArr.forEach((element, index) => {
        element.no = posArr[index];
      });
    }
    this.setData({
      passArr: passArr,
      currentArr: currentArr,
      iconList: iconList
    }, () => {
      this.renderIcon();
    });
  },

  // 将获得当前新数组渲染在页面上
  renderIcon() {
    let baseList = this.data.baseList; // 基础列表布局
    let currentArr = this.data.currentArr; // 当前等级随机出来的icon
    let time = this.data.currentModeTime; // 当前模式限制时间

    for(let i=0; i<currentArr.length; i++) {
      for(let j=0; j<baseList.length; j++) {
        if(currentArr[i].no === baseList[j].no) {
          baseList[j].icon = currentArr[i].icon;
          baseList[j].isSelect = false;
        }
      }
    }
    this.setData({
      baseList: baseList
    }, () => {
      this.handlerLimit && clearInterval(this.handlerLimit);
      this.countDownTime(time);
    });
  },

  // 清空baseList布局
  clearBaseList(cb) {
    let baseList = this.data.baseList; // 基础列表布局
    baseList.forEach((element) => {
      element.icon = '';
    })
    this.setData({
      baseList: baseList
    }, () => {
      cb && cb();
    })
  },

  // 开始按钮
  goStart(e) {
    this.setData({isShowPanel: 2});
    // this.playVoice(0); 声音暂时去除，体验不好...
    const time = e.currentTarget.dataset.time; // 倒计时
    const mode = e.currentTarget.dataset.mode || ''; // 简易、困难模式
    this.setData({
      currentModeTime: time,  // 存储当前模式的限制时间
      currentGameMode: mode
    });
    this.initIcon();
  },

  // 启动倒计时
  countDownTime(time) {
    if(time > 0) {
      this.setData({ spareTime: time });
      this.handlerLimit = setInterval(() => {
        let spareTime = this.data.spareTime;
        this.setData({
          spareTime: --spareTime
        })
        if(this.data.spareTime <=  0) {
          console.log('倒计时结束！训练失败');
          this.countDownNoPass();
        }
      }, 1000);
    }
  },
  // 点击图标
  selectIcon(e) {
    let baseList = this.data.baseList;
    let icon = e.currentTarget.dataset.icon;
    let no = e.currentTarget.dataset.no;
    let isSelect = e.currentTarget.dataset.flag;
    let passArr = this.data.passArr;
    if(icon && !isSelect) {
      baseList[no].isSelect = true;
      this.setData({
        baseList: baseList,
      })
      if(passArr.length) {
        let flag = passArr.every((element, index) => {
          return icon !== element.icon;
        })
        if(flag) {
          this.passLevel(no);
        } else {
          this.noPassLevel(no);
        }
      } else {
        this.passLevel(no);
      }
    }
  },
  
  // 成功进入下一级训练模式
  passLevel(no) {
    let level = this.data.level;
    this.playVoice(1);
    this.setData({
      clickNo: no,
      isPassClass: "passClass"
    });

    if(level >= cfg.iconNum) {
      this.handlerLimit && clearInterval(this.handlerLimit);
      wx.showModal({
        title: '提示',
        content: '恭喜您，通过全部训练',
        complete: () => {
          this.m_postInfo(); // 提交成绩
          this.setData({ isShowPanel: 4 })
          this.downloadImg("myCanvas1");
        }
      })
    } else {
      setTimeout(() => {
        this.setData({
          level: ++level,
          clickNo: no,
          isPassClass: ""
        });
        this.clearBaseList(this.createCurrent);
      }, 600);
    }
  },

  // 训练失败
  noPassLevel(no) {
    this.handlerLimit && clearInterval(this.handlerLimit);
    this.playVoice(2);
    this.setData({
      clickNo: no,
      isPassClass: "nopassClass"
    });
    wx.vibrateLong({
      complete: () => {
        setTimeout(() => {
          console.log("选择失败！");
          this.m_postInfo(); // 提交训练成绩
          this.setData({
            isShowPanel: 3,
            clickNo: no,
            isPassClass: ""
          }, () => {
            this.downloadImg();
          });
        }, 600)
      }
    });
  },

  // 倒计时训练失败
  countDownNoPass() {
    this.handlerLimit && clearInterval(this.handlerLimit);
    this.playVoice(2);

    wx.vibrateLong({
      complete: () => {
        this.m_postInfo();
        this.setData({
          isShowPanel: 3
        }, () => {
          this.downloadImg();
        });
      }
    });
  },

  // 继续训练
  goPlay() {
    this.refreshPage();
  },

  // 不练了
  noPlay() {
    wx.navigateBack();
  },

  // 通过全部训练下载福利照
  goDownYLJ() {
    const url = cfg.img;
    console.log(url);
    utils.showLoading('下载中...');
    wx.downloadFile({
      url: url,
      success:function(res){
        console.log(res);
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
  
  // 提交当前数据
  m_postInfo() {
    let param = {
      type: this.data.currentGameMode,
      orginal: 1,
      score: this.data.level,
    }
    let isShowLoading = param.type === '7' ? true : false;
    inter.saveUserInfoScore(param, (res) => {
      console.log(res);
      if(param.type === '7') {
        wx.showToast({
          title: '成绩提交成功！',
          icon: 'success',
          duration: 3000
        })
      }
    }, (err) => {
      console.log(err);
    }, isShowLoading);
  },

  // 分享信息
  onShareAppMessage: function (res) {
    let title = '';
    let level = this.data.level - 1;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      title = '我在keep记忆中，完成了' + level + '级，一起来训练吧';
    } else {
      title = app.globalData.userInfo.nickName + "正在邀请您进行keep记忆，一起来训练吧";
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

  // 播放声音 传递的为声音在cfg文件的索引
  playVoice(audioNo) {
    let systemInfo = this.data.systemInfo;
    let audioSource = this.data.audioSource;
    let audioItem = audioSource[audioNo];
    let url;
    // if(audioItem.flag) {
    //   url = audioItem.tempFilePath;
    // } else {
    //   url = cfg.audioCfg[audioNo];
    // }
    //  不知道什么问题，读缓存文件ios微信主页上上会提示版权受限无法播放音乐
    url = cfg.audioCfg[audioNo];
    if (systemInfo.platform == 'ios') {    // 安卓、ios兼容
      this.audio = wx.getBackgroundAudioManager();
    } else {
      this.audio = wx.createInnerAudioContext();
    }
    console.log(url);
    this.audio.title = '...'; // 必须加这一行，不然ios会报错
    this.audio.src = url;
    this.audio.play();
    this.audio.onPlay(() => {
      console.log('播放音频...');
    })
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
