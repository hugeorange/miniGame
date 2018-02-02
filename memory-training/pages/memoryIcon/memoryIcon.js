//index.js
//获取应用实例
const app = getApp();
const cfg = require('../../utils/config.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    isShowPanel: 1,
    timeCfg: {
      time1: cfg.limitTime.time1,
      time2: cfg.limitTime.time2,
      time3: cfg.limitTime.time3
    }, // 游戏限制时间
    spareTime: '', // 剩余时间
    currentModeTime: '', // 当前模式时间
    baseList: [],
    iconList: [],  // 图标元素
    iconPosArr: [], // 图标位置
    level: 1, // 当前关卡数
    passArr: [], // 已使用过的图标数组
    currentArr: [], // 当前关卡的图标数组
    clickNo: '', // 当前点击的索引
    isPassClass: '', // 是否过关的标志
  },
  
  onLoad: function () {
    // this.postInfo();
  },

  // 刷新page，相当于将页面状态全部置为初始化时候
  refreshPage() {
    this.setData({
      isShowPanel: 1,
      timeCfg: {
        time1: cfg.limitTime.time1,
        time2: cfg.limitTime.time2,
        time3: cfg.limitTime.time3
      }, // 游戏限制时间
      spareTime: '', // 剩余时间
      currentModeTime: '', // 当前模式时间
      baseList: [],
      iconList: [],  // 图标元素
      iconPosArr: [], // 图标位置
      level: 1, // 当前关卡数
      passArr: [], // 已使用过的图标数组
      currentArr: [], // 当前关卡的图标数组
      clickNo: '', // 当前点击的索引
      isPassClass: '', // 是否过关的标志
    }, () => {
      console.log(this.data);
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
      let obj1 = { no: i, icon: '' };
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

  // 根据当前关卡随机出相应数量的图标
  createCurrent() {
    let level = this.data.level;  // 当前关卡
    let iconList = this.data.iconList;  // 所剩图标数组
    let currentArr = this.data.currentArr;  // 当前关卡图标元素数组
    let iconPosArr = this.data.iconPosArr; // 位置数组
    let [...passArr] = currentArr; // 深拷贝上一关卡的图标数组

    let { index, item } = utils.getOneArray(iconList); // 随机取出当前这关的新图标
    let posArr = utils.getNumArray(iconPosArr, level); // 取出当前关卡的随机位置

    currentArr.push(item);
    iconList.splice(index, 1);
        
    currentArr.forEach((element, index) => {
      element.no = posArr[index];
    });    

    console.log("currentArr:", currentArr);
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
    let currentArr = this.data.currentArr; // 当前关卡随机出来的icon
    let time = this.data.currentModeTime; // 当前模式限制时间

    for(let i=0; i<currentArr.length; i++) {
      for(let j=0; j<baseList.length; j++) {
        if(currentArr[i].no === baseList[j].no) {
          baseList[j].icon = currentArr[i].icon;
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
    const time = e.currentTarget.dataset.time;
    this.setData({ currentModeTime: time }); // 存储当前模式的限制时间
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
          console.log('倒计时结束！挑战失败');
          this.countDownNoPass();
        }
      }, 1000);
    }
  },
  // 点击图标
  selectIcon(e) {
    let icon = e.currentTarget.dataset.icon;
    let no = e.currentTarget.dataset.no;
    let passArr = this.data.passArr;
    if(icon) {
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
  
  // 挑战成功进入下一关
  passLevel(no) {
    let level = this.data.level;
    this.setData({ 
      clickNo: no,
      isPassClass: "passClass"
    });

    if(level >= cfg.iconNum) {
      wx.showModal({
        title: '提示',
        content: '恭喜您，闯关成功',
        complete: () => {
          this.setData({ isShowPanel: 4 })
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

  // 挑战失败
  noPassLevel(no) {
    this.handlerLimit && clearInterval(this.handlerLimit);
    this.setData({ 
      clickNo: no,
      isPassClass: "nopassClass"
    });
    wx.vibrateLong({
      complete: () => {
        setTimeout(() => {
          console.log("选择失败！");
          this.setData({ 
            isShowPanel: 3,
            clickNo: no,
            isPassClass: ""
          });
        }, 600)
      }
    });
  },

  // 倒计时挑战失败
  countDownNoPass() {
    this.handlerLimit && clearInterval(this.handlerLimit);
    wx.vibrateLong({
      complete: () => {
        this.setData({ 
          isShowPanel: 3
        });
      }
    });
  },

  // 继续玩
  goPlay() {
    this.refreshPage();
  },

  // 不玩了
  noPlay() {
    wx.navigateBack();
  },

  // 通关下载福利照
  goDownload() {
    wx.downloadFile({  
      url: 'https://www.easy-mock.com/public/images/easy-mock.png',  
      success:function(res){  
        console.log(res)  
        wx.saveImageToPhotosAlbum({  
          filePath: res.tempFilePath,  
          success: function (res) {  
            utils.showSucc('下载成功！');
          },  
          fail: function (res) {  
            console.log(res)  
            utils.showSucc('下载失败！');
          }  
        })  
      },
      fail:function(){  
        utils.showSucc('下载失败！');
      }  
    })
  },
  // 提交当前数据
  m_Info(data, success, fail) {
    let param = data || {id: '1230600'};
    utils.ajax('https://www.easy-mock.com/mock/596e2463a1d30433d836f112/ele/ele', param, (res) => {
      success && success();
    }, (err) => {
      fail && fail();
    })
  },

  // 分享信息
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我闯过了' + this.data.level -1 + '关，不服来挑战',
      path: "pages/memoryIcon/memoryIcon",
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
