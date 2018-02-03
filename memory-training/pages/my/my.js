//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    // this.getGameUserInfo(); // 获取用户信息，如果button组件不起作用的话，可调用 wx.getUserInfo

    this.getGameUserInfo2();
  },

  getGameUserInfo2() {
    wx.getUserInfo({
      success: res => {
        console.log("res:", res);
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },




// ===================================================================================================

  // 初始化项目初始出来的参数自带方法
  getGameUserInfo() {
    if (app.globalData.userInfo) {
      console.log('11111');
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      console.log('22222');
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log('33333');
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },




  /**
   * 利用 open-type="getUserInfo" bindgetuserinfo="getUserInfo"
   * 小程序新版本开放的能力，需要用 canIUse 验证
   * 以上两个均为 button 组件上的默认属性
   */
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
