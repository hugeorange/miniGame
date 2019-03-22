import Taro from "@tarojs/taro";
export function setUserAuth(target) {
  Object.assign(target.prototype, {
    guideUserAuth: function(tips = "", cbObj) {
      Taro.showModal({
        title: "提示",
        content: tips,
        confirmText: "授权",
        cancelText: "不授权",
        success: function() {
          wx.openSetting({
            success: res => {
              console.log(res);
              cbObj.success && cbObj.success(cbObj.param)
            },
            fail: err => {
              console.log(err);
              Taro.showToast({title: '授权失败'})
            }
          });
        },
        fail: function(err) {
          console.log("用户拒绝授权...", err);
        }
      });
    }
  });
}
