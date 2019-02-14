import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import "./icon.less";

import { refresh } from "../../actions/icon";

class Icon extends Component {
  config = {
    navigationBarTitleText: "记忆图标",
    navigationBarBackgroundColor: "#fac800"
  };

  componentWillUnmount() {
    this.props.refresh();
  }

  render() {
    const { showStep } = this.props.icon;
    return (
      <View className="icon">
        {showStep == 1 && <Step1 step1-class="step1" />}
        {showStep == 2 && <Step2 step2-class="step2" />}
        {showStep == 3 && <Step3 step3-class="step3" />}
        {showStep == 4 && <Step4 />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { icon: state.icon };
};

const mapDispatchToProps = dispatch => {
  return {
    refresh: () => dispatch(refresh())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Icon);

// 装饰器写法
// @connect(({ icon }) => ({icon}), (dispatch) => ({
//   refresh() {
//     return dispatch(refresh())
//   }
// }))