import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { saveUserInfo } from "../../common/api";
import "./index.less";

class Index extends Component {
  config = {
    navigationBarTitleText: "用户授权",
    navigationBarBackgroundColor: "#fac800"
  };

  onGotUserInfo(e) {
    console.log(e.detail);
    const authInfo = e.detail;
    if (authInfo.errMsg === "getUserInfo:ok") {
      this.postUserInfo(authInfo)
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
