import Taro, { Component } from "@tarojs/taro";
import { connect } from '@tarojs/redux'
import { View, Button, Text } from "@tarojs/components";
import iconCfg from '../../common/config'
import {changeState, asyncChangeState, baseList} from '../../actions/icon'

@connect(({ icon }) => ({
  icon
}), (dispatch) => ({
  changeState(param) {
    dispatch(changeState(param))
  },
  asyncChangeState(param) {
    return dispatch(asyncChangeState(param))
  }
}))

class Step1 extends Component {
  static externalClasses = ['step1-class']
  static options = {
    addGlobalClass: true
  }

  // 开始模式
  goStart(time) {
    this.props.changeState({
      showStep: 2,
      modeTime: time,
      gameMode: time
    })
  }

  render() {
    const time1 = iconCfg.limitTime.time1
    console.log('step111')
    return (
      <View className="step1-class">
        <View className="game-mode">
          <View className="mode" onClick={this.goStart.bind(this, -1)} hoverClass="mode-hover">训练模式</View> 
          <View className="mode" onClick={this.goStart.bind(this, time1)} hoverClass="mode-hover">挑战模式-{time1}s</View> 
        </View>

        <View className="tips tips1">说明：</View>
        <View className="tips">1、找出并点击屏幕中首次出现新图标</View>
        <View className="tips">2、选择指定模式-即允许记忆的最大时间</View>
        <View className="tips">3、只有挑战模式的成绩才会记录进达人行榜</View>
        <View className="tips">4、训练图标数-54</View>
      </View>
    );
  }
}

export default Step1;
