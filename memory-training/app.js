//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    // wx.showLoading({ title: '加载中...', mask: true });
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        let param = { code: res.code };
        wx.request({
          method: "get",
          url: "https://www.zoomwei.cn/api/59715d4f7dd24.html",
          data: param,
          header: { 'content-type': 'application/json' },
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
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})