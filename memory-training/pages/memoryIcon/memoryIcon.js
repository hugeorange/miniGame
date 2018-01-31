//index.js
//获取应用实例
const app = getApp();
const cfg = require('../../utils/config.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    isStart: false,
    baseList: [],
    iconList: [],  //全部图标数组
    level: 1, // 当前关卡数
    pass: [] // 已使用过的图标数组
  },
  
  onLoad: function () {
    this.initIcon();
    this.createCurrent();
    this.renderIcon();
  },
  // 初始化图标
  initIcon() {
    let list = [];
    let num = cfg.iconNum;
    for(let i=1; i<=num; i++){
      let obj = {
        no: i,
        icon: ''
      };
      list.push(obj);
    }
    this.setData({
      baseList: list,
      iconList: list
    });
  },

  // 根据当前关卡随机出相应数量的图标
  createCurrent() {
    let level = this.data.level;
    let iconList = this.data.iconList;
    let pass = this.data.pass; 

    let {index, item} = utils.getOneArray(iconList); // 取出当前这一关的新图标
    console.log('index:', index, 'item:', item);

    pass.push(item);
    this.data.iconList.splice(index, 1);
    
    this.setData({
      pass: pass,
      iconList: iconList
    });



  },

  // 将获得当前新数组渲染在页面上
  renderIcon() {
    console.log("pass:", this.data.pass);
    console.log("iconList:", this.data.iconList);
    let baseList = this.data.baseList;
    let pass = this.data.pass;

    for(let i=0; i<pass.length; i++) {
      for(let j=0; j<baseList.length; j++) {
        if(pass[i].no === baseList[j].no) {
          console.log(baseList[j].index);
          baseList[j].icon = 'icon-' + baseList[j].icon;
        }
      }
    }

    this.setData({
      baseList: baseList
    })
  },

  // 开始按钮
  goStart() {
    let flag = this.data.isStart;
    this.setData({isStart: !flag});
  },

  // 点击图标
  selectIcon(e) {
    var icon = e.currentTarget.dataset.icon;
    console.log(icon);
    
  }
})
