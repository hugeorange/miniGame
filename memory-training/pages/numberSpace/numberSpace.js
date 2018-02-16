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
        }, 1000);
      }
      this.setData({
        baseList: baseList,
      });
      if (this.index === level + 1) {
        console.log('通过训练');
        level++;
        this.pass(level);
      }
      console.log("this.index:", this.index);
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
          this.m_postInfo(); // 提交成绩
          this.setData({ isShowPanel: 3 })
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
   m_postInfo() {
    let param = {
      type: cfg.numberMode,
      orginal: 1,
      score: this.data.level,
    }
    inter.saveUserInfoScore(param, (res) => {
      console.log(res);
      wx.showToast({
        title: '提交成功！',
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
  // 通关下载福利照
  goDownload() {
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
})

