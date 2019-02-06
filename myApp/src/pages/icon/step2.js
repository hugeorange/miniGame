import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Icon } from "@tarojs/components";
import { connect } from '@tarojs/redux'
import {changeState, baseList, asyncChangeState} from '../../actions/icon'
import {getOneArray, getNumArray} from '../../common/util'
import iconCfg from '../../common/config'

@connect(({ icon }) => ({
  icon
}), (dispatch) => ({
  changeState(param) {
    dispatch(changeState(param))
  },
  asyncChangeState(param) {
    return dispatch(asyncChangeState(param))
  },
  baseList(param) {
    return dispatch(baseList(param))
  }
}))
class Step2 extends Component {
  static externalClasses = ['step2-class']
  static options = {
    addGlobalClass: true
  }

  componentDidMount() {
    console.log('我是不是只执行了一次次')
    this.initIcon()
  }

  initIcon() {
    let list1 = [];
    let list2 = [];
    let list3 = [];
    let num = iconCfg.num;
    let iconArr = iconCfg.iconArr;
    for(let i=0; i< num; i++) {
      let obj1 = { no: i, icon: '', isSelect: false };
      let obj2 = { no: i, icon: iconArr[i]};
      list1.push(obj1);
      list2.push(obj2);
      list3.push(i);
    }
    // https://stackoverflow.com/questions/39524855/how-to-trigger-off-callback-after-updating-state-in-redux
    this.props.asyncChangeState({
      baseList: list1, // 基础列表
      iconList: list2, // 基础图标
      iconPosArr: list3 // 图标位置
    })
    .then(res => {
      // 在这个 then 里面 this.props 里面拿不到东西，不明白 redux-thunk 如何使用，回头再来探究
      this.createCurrent(res.icon)
    })
  }

  createCurrent(iconProps) {
    let {
      level,  // 当前等级
      gameMode, // 当前等级模式
      iconList,  // 所剩图标数组
      currArr,  // 当前等级图标元素数组
      iconPosArr // 位置数组
    } = iconProps
    let passArr = currArr.map(item => item.icon); // 深拷贝上一等级的图标数组
    let { index, item } = getOneArray(iconList); // 随机取出当前等级的新图标
    let posArr = getNumArray(iconPosArr, level); // 取出当前等级的随机位置
    currArr.push(item);
    iconList.splice(index, 1);
    
    // // 每完成一级训练打乱位置, -1 为训练模式
    if(gameMode !== '-1') {
      currArr.forEach((element, index) => element.no = posArr[index])
    }

    this.props.asyncChangeState({passArr, currArr, iconList})
    .then(res => this.renderIcon(res.icon))
  }

  renderIcon = iconProps => {
    let {
      baseList, // 基础列表布局
      currArr, // 当前等级随机出来的 icon
      modeTime,
    } = iconProps
    const currMap = currArr.reduce((acc, cur) => {
      acc[cur.no] = cur
      return acc
    }, {})
    // 不可以在原数据上修改，必须在新数据上修改，需要一层深拷贝，再仔细阅读下redux文档，对复杂数据类型的处理
    // let list = JSON.parse(JSON.stringify(baseList))
    // let list = [...baseList]
    // let list = Object.assign([], baseList)
    // let list = baseList.concat([])
    // 不知道为什么 👇 这样写又可以了
    // class 类不知道为什么总是生成两个

    baseList.forEach(item => {
      if (currMap[item.no]) {
        item.icon = currMap[item.no]['icon']
        item.isSelect = false
      }
    })
    this.props.baseList({baseList})
    setTimeout(() => {
      this.countDownTime(modeTime)
    })
  }

  // 倒计时
  countDownTime = time => {
    if(time > 0) {
      this.props.changeState({spareTime: time})
      this.handlerCountDownTime = setInterval(() => {
        let spareTime = this.props.icon.spareTime;
        this.props.changeState({spareTime: --spareTime})
        if(this.props.icon.spareTime <=  0) {
          console.log('倒计时结束！训练失败');
          this.countDownNoPass();
        }
      }, 1000);
    }
  }

  // 倒计时训练失败
  countDownNoPass() {
    this.handlerCountDownTime && clearInterval(this.handlerCountDownTime)
    Taro.vibrateShort({}).then(res => {
      setTimeout(() => {
        this.props.changeState({showStep: 3})
      }, 600)
    })
    console.log('倒计时训练失败。。。')
  }

  clickIcon = item => {
    let {
      baseList,
      passArr,
    } = this.props.icon
    let {no, icon, isSelect} = item
    if (icon && !isSelect) {
      baseList[no].isSelect = true
      this.props.baseList({baseList})
      if (passArr.includes(icon)) {
        // 未通过当前关卡挑战
        this.noPassLevel(item)
      } else {
        // 通过当前关卡挑战
        this.passLevel(item)
      }
    }
  }

  passLevel(item) {
    this.handlerCountDownTime && clearInterval(this.handlerCountDownTime)
    let {level} = this.props.icon
    // 播放通关音乐
    // 展示挑战成功状态
    this.props.changeState({clickNo: item.no, isPassClass: 'passClass'})
    // 下一关卡渲染
    setTimeout(() => {
      this.props.changeState({isPassClass: '', level: ++level})
      this.clearBaseList('createCurrent')
    }, 600)
  }

  noPassLevel(item) {
    this.handlerCountDownTime && clearInterval(this.handlerCountDownTime)
    console.log('挑战失败，不通过...')
    this.props.changeState({clickNo: item.no, isPassClass: 'nopassClass'})
    Taro.vibrateShort({}).then(res => {
      setTimeout(() => {
        this.props.changeState({
          showStep: 3,
          clickNo: item.no,
          isPassClass: ""
        })
      }, 600)
    })
    // 到 step3 或 step4 页面
  }

  

  // 清空baseList布局
  clearBaseList(cb) {
    let {baseList} = this.props.icon
    baseList.forEach(item => item.icon = '')
    this.props.baseList({baseList})
    .then(res => {
      cb && this[cb](res.icon)
    })
  }

  render() {
    const {
      level,
      modeTime,
      spareTime,
      baseList,
      clickNo,
      isPassClass,
    } = this.props.icon
    console.log('step2222')
    return (
      <View className="step2-class">
        <View className="started">
          <View className="current-tips">
            <Text>训练等级：{level}</Text>
            {modeTime == -1 ? <Text>训练模式</Text> : <Text className="count-down">倒计时：{spareTime}</Text>}
            
          </View>
          <View className="icon-list">
            {
              baseList.map((item, index) => {
                return <Icon 
                  className={`list-item iconfont ${item.icon} ${clickNo == index ? isPassClass : ''}`} 
                  onClick={this.clickIcon.bind(this, item)}
                  key={String(index)}/>
              })
            }
          </View>
        </View>
      </View>
    );
  }
}
export default Step2;
