import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from '@tarojs/redux'
import {setUserInfo} from '../../actions/globalData'
import { saveUserInfo, getWxUserScore } from "../../common/api";
import "./index.less";
const app = Taro.getApp()

@connect(({ globalData }) => ({globalData}), (dispatch) => ({
  setUserInfo(param) {
    dispatch(setUserInfo(param))
  }
}))
class Index extends Component {
  config = {
    navigationBarTitleText: "用户授权",
    navigationBarBackgroundColor: "#fac800"
  };
  constructor(props) {
    super(props)
    this.state = {
      isAuth: false
    }
  }
  componentDidMount() {
    console.log('indexjs启动')
  }

  onGotUserInfo(e) {
    console.log(e.detail, app.globalData)
    const authInfo = e.detail
    if (authInfo.errMsg === "getUserInfo:ok") {
      // this.postUserInfo(authInfo)
      app.globalData.userInfo = authInfo.userInfo
      Taro.setStorage({key: "userInfo", data: authInfo.userInfo})
      // this.props.setUserInfo({userInfo: authInfo.userInfo})
    }
    // 跳转到首页
    Taro.switchTab({url: '../home/home'})
  }

  postUserInfo(res) {
    let param = {
      encryptedData: res.encryptedData,
      iv: res.iv
    }
    saveUserInfo(param);
  }

  render() {
    return (
      <View className="index">

        <Button
          className="btn"
          openType="getUserInfo"
          lang="zh_CN"
          type="primary"
          onGetUserInfo={this.onGotUserInfo}
        >
          微信用户快速登录
        </Button>
      </View>
    );
  }
}

export default Index;
