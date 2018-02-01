//index.js
//获取应用实例
const app = getApp();
const cfg = require('../../utils/config.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    isShowPanel: 1,
    aniFlag: false, // 触发转场动画的标志
    aniPage: 0,
    baseList: [],
    iconList: [],  // 图标元素
    iconPosArr: [], // 图标位置
    level: 1, // 当前关卡数
    passArr: [], // 已使用过的图标数组
    currentArr: [], // 当前关卡的图标数组

  },
  
  onLoad: function () {
    // this.postInfo();
  },

  // 刷新page，相当于将页面状态全部置为初始化时候
  refreshPage() {

    this.setData({
      isShowPanel: 1,
      aniFlag: false,
      aniPage: 0,
      baseList: [],
      iconList: [],
      iconPosArr: [],
      level: 1,
      passArr: [],
      currentArr: []
    }, () => {
      console.log(this.data);
      
    })
  },

  // 初始化图标
  initIcon() {
    let list1 = [];
    let list2 = [];
    let list3 = [];
    let num = cfg.iconNum;
    for(let i=1; i<=num; i++){
      let obj1 = { no: i, icon: '' };
      let obj2 = { no: i,  icon: 'i-' + i };    // 位置 名称
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
    for(let i=0; i<currentArr.length; i++) {
      for(let j=0; j<baseList.length; j++) {
        if(currentArr[i].no === baseList[j].no) {
          console.log(baseList[j].no);
          baseList[j].icon = currentArr[i].icon;
        }
      }
    }
    this.setData({
      baseList: baseList
    })
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
  goStart() {
    this.setData({isShowPanel: 2});
    this.initIcon();
  },

  // 点击图标
  selectIcon(e) {
    let icon = e.currentTarget.dataset.icon;
    let passArr = this.data.passArr;
    let level = this.data.level;
    if(icon) {
      if(passArr.length) {
        let flag = passArr.every((element, index) => {
          return icon !== element.icon;
        })
        if(flag) {
          console.log("选择成功！");
          this.setData({level: ++level});
          console.log(this.data.level);
          this.passLevel();
          // this.clearBaseList(this.createCurrent);
        } else {
          wx.vibrateLong({
            complete: () => {
              console.log("选择失败！");
              this.noPassLevel();
            }
          });
        }
      } else {
        this.setData({level: ++level}); 
        console.log("选择成功！", this.data.level); 
        this.passLevel();
        // this.clearBaseList(this.createCurrent);
      }
    }
  },
  // 点击图标成功进入下一关
  passLevel() {
    wx.showToast({
      title: '第 ' + this.data.level + ' 关',
      icon: 'success',
      duration: 1500
    })
    this.clearBaseList(this.createCurrent);
  },

  // 点击图标失败再来一次
  noPassLevel() {
    this.setData({ isShowPanel: 3 });
    
  },

  // 继续玩
  goPlay() {
    this.refreshPage();
  },

  // 不玩了
  noPlay() {
    wx.navigateBack();
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
      title: '我闯过了' + this.data.level + '关，不服来挑战',
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
