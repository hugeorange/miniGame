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
    passArr: [], // 已使用过的图标数组
    currentArr: []// 当前关卡的数组
  },
  
  onLoad: function () {
    this.initIcon();
    this.createCurrent();
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
    // let passArr = this.data.passArr;
    let currentArr = this.data.currentArr;

    // let passArr = utils.deepCopy(currentArr); // 将当前icon列表深拷贝后赋值给passArr--- 该方法不可行
    const [...passArr] = currentArr;

    console.log("passArr:", passArr);

    let {index, item} = utils.getOneArray(iconList); // 取出当前这一关的新图标
    console.log('index:', index, 'item:', item);

    currentArr.push(item);
    this.data.iconList.splice(index, 1); // 剔除当前关卡需要展示的图标
    
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

    let baseList = this.data.baseList; // 基础数据
    let currentArr = this.data.currentArr; // 当前关卡所需要的图标

    for(let i=0; i<currentArr.length; i++) {
      for(let j=0; j<baseList.length; j++) {
        if(currentArr[i].no === baseList[j].no) {
          console.log(baseList[j].index);
          baseList[j].icon = baseList[j].no;
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
    let icon = e.currentTarget.dataset.icon;
    let passArr = this.data.passArr;
    console.log("点击到的图标：", icon);
    console.log("已通过的数组：", passArr);
    let flag = false;
    if(icon) {
      if(passArr.length) {
        flag = this.data.passArr.every((element, index) => {
          return element.no === icon;
        });  
      }

      console.log(flag);
      if(!flag) {
        console.log('点击正确');
        this.createCurrent();
      } else {
        console.log('点击失败');
      }
    }
  },
 
})
