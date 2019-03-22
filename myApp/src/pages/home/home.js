import Taro, { Component, getApp } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import "./home.less";
const app = getApp();

class Index extends Component {
  config = {
    navigationBarTitleText: "",
    navigationBarBackgroundColor: "#fac800"
  };
  constructor(props) {
    super(props);
    this.state = {
      isGetUser: false,
      flag: false
    };
    Taro.hideTabBar()
  }

  componentWillMount() {
    this.getUserInfo();
  }

  // 检测是否获取用户基本信息
  getUserInfo() {
    const userInfo = Taro.getStorageSync("userInfo");
    if (userInfo) {
      this.setState({ isGetUser: true });
      Taro.setNavigationBarTitle({ title: "记忆力训练" });
      Taro.showTabBar()
    } else {
      Taro.setNavigationBarTitle({ title: "登录授权" });
    }
    this.setState({ flag: true });
  }

  itemClick = type => {
    const path = `../${type}/${type}`;
    Taro.navigateTo({ url: path });
  };

  onGotUserInfo(e) {
    console.log(e.detail, app.globalData);
    const authInfo = e.detail;
    if (authInfo.errMsg === "getUserInfo:ok") {
      // this.postUserInfo(authInfo)
      app.globalData.userInfo = authInfo.userInfo;
      Taro.setStorage({ key: "userInfo", data: authInfo.userInfo });
      // this.props.setUserInfo({userInfo: authInfo.userInfo})
      this.setState({ isGetUser: true });
      Taro.showTabBar()
    }
  }

  postUserInfo(res) {
    let param = {
      encryptedData: res.encryptedData,
      iv: res.iv
    };
    saveUserInfo(param);
  }

  render() {
    if (!this.state.flag) return null;
    return (
      <View className="home">
        {!this.state.isGetUser ? (
          <View className="btn-bg">
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
        ) : (
          <View>
            <View className="item-c">
              <View
                className="item"
                hover-class="item-hover"
                onClick={this.itemClick.bind(this, "icon")}
              >
                记忆图标
              </View>
              <View
                className="item"
                hover-class="item-hover"
                bindtap={this.itemClick.bind(this, "space")}
              >
                数字空间
              </View>
            </View>

            <View className="more-ac">更多项目，敬请期待...</View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
