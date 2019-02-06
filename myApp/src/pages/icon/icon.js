import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from '@tarojs/redux'
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import "./icon.less";

import { add, minus, asyncAdd } from '../../actions/counter'


@connect(({ icon }) => ({
  icon
}), (dispatch) => ({
  // add () {
  //   dispatch(add())
  // },
  // dec () {
  //   dispatch(minus())
  // },
  // asyncAdd () {
  //   dispatch(asyncAdd())
  // }
}))

class Icon extends Component {
  config = {
    navigationBarTitleText: "记忆图标",
    navigationBarBackgroundColor: "#fac800"
  };

  render() {
    const {
      showStep
    } = this.props.icon
    // 初次加载时，未展示的组件也会 render 一次 
    return (
      <View className="icon">
        {showStep == 1 && <Step1 step1-class="step1"/>}
        {showStep == 2 && <Step2 step2-class="step2"/>}
        {showStep == 3 && <Step3 step3-class="step3"/>}
        {showStep == 4 && <Step4/>}
      </View>
    );
  }
}

export default Icon;
