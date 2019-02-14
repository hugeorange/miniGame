import "@tarojs/async-await";
import Taro, { Component, getApp } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import Index from "./pages/index";
import configStore from "./store";
// import { connect } from '@tarojs/redux'
// import {setUserInfo} from '../../actions/globalData'

import "./app.less";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  config = {
    pages: [
      // "pages/index/index",
      "pages/home/home",
      "pages/icon/icon",
      "pages/space/space",
      "pages/my/my"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      backgroundColor: "#fff",
      selectedColor: "#ffbf00",
      list: [
        {
          pagePath: "pages/home/home",
          text: "训练",
          iconPath: "assets/image/mm.png",
          selectedIconPath: "assets/image/mm1.png"
        },
        {
          pagePath: "pages/my/my",
          text: "我的",
          iconPath: "assets/image/gg1.png",
          selectedIconPath: "assets/image/gg.png"
        }
      ]
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    }
  };
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log("app启动。。。", this.globalData);
    this.loginServer()
    // this.getUserInfo()
  }

  // login --> 向自己后台服务存储用户信息
  loginServer() {
    wx.showLoading({ title: '加载中...', mask: true });
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        let param = { code: res.code };
        wx.request({
          method: "get",
          url: "https://www.zoomwei.cn/api/59715d4f7dd24.html",
          data: param,
          header: { "content-type": "application/json" },
          success: res => {
            console.log("登陆成功:", res);
            this.globalData.PHPSESSID = res.data.data.PHPSESSID;
            this.globalData.uid = res.data.data.uid;
            wx.hideLoading();
          },
          fail: err => {
            console.log(err);
            wx.hideLoading();
          }
        });
      }
    });
  }





  componentDidShow() {

  }

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  globalData = {
    userInfo: null
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
