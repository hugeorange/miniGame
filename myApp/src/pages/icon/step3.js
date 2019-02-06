import Taro, { Component } from "@tarojs/taro";
import { View, Button, Canvas } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { changeState, baseList, asyncChangeState } from "../../actions/icon";
import cfg from "../../common/config";

import defaultImg from "../../assets/image/default.png";
import sharema from "../../assets/image/sharema.jpg";
@connect(
  ({ icon }) => ({
    icon
  }),
  dispatch => ({
    changeState(param) {
      dispatch(changeState(param));
    },
    asyncChangeState(param) {
      return dispatch(asyncChangeState(param));
    },
    baseList(param) {
      return dispatch(baseList(param));
    }
  })
)
class Step3 extends Component {
  static externalClasses = ["step3-class"];
  static options = {
    addGlobalClass: true
  };

  componentDidMount() {
    this.downloadImg();
  }

  reStart = () => {
    this.refreshPage();
  };

  refreshPage() {
    let refreshObj = {
      showStep: 1,
      timeCfg: {
        time1: cfg.limitTime.time1,
        time2: cfg.limitTime.time2,
        time3: cfg.limitTime.time3
      },
      spareTime: "", // 剩余时间
      modeTime: "", // 当前模式时间
      gameMode: "", // 当前训练模式
      baseList: [],
      iconList: [], // 图标元素
      iconPosArr: [], // 图标位置
      level: 1, // 当前训练等级
      passArr: [], // 已使用过的图标数组
      currArr: [], // 当前训练的图标数组
      clickNo: "", // 当前点击的索引
      isPassClass: "", // 是否通过训练的标志
      systemInfo: {}, // 系统信息
      audioSource: [] //声音资源
    };
    this.props.changeState(refreshObj);
  }

  downloadImg(canvas) {
    // Taro.showLoading({ title: "加载中..." });
    this.drawImage("../../assets/image/default.png");

    // wx.downloadFile({
    //   url:
    //     app.globalData.userInfo.avatarUrl ||
    //     "https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/7.png",
    //   success: res => {
    //     console.log(res);
    //     this.drawImage(res.tempFilePath, canvas);
    //   },
    //   fail: err => {
    //     console.log(err);
    //     this.drawImage("../../assets/image/default.png");
    //   },
    //   complete: () => {
    //     wx.hideLoading();
    //   }
    // });
  }

  // drawImage
  drawImage(imgUrl, ctxCanvas) {
    console.log("ctxCanvas:", ctxCanvas, "imgUrl:", imgUrl);
    const { level } = this.props.icon;
    let contextCanvas = ctxCanvas || "myCanvas";
    const titleObj = this.getTitle();
     
    console.log('titleObj', titleObj)

    const nickName = "test" || app.globalData.userInfo.nickName || "---";

    const ctx = Taro.createCanvasContext(contextCanvas, this);

    ctx.setFillStyle("#fff");
    ctx.fillRect(0, 0, 250, 300);
    ctx.setFontSize(12);
    ctx.setFillStyle("orange");

    ctx.setFontSize(14);
    ctx.drawImage(defaultImg, 100, 20, 50, 50);
    ctx.setTextAlign("center");
    ctx.fillText(nickName, 125, 90);
    ctx.setTextAlign("center");
    ctx.fillText(`在keep记忆中达到了 ${ctxCanvas ? "满" : level - 1} 级`, 125, 110);
    ctx.fillText(`获得了 ${titleObj.title} 称号`, 125, 130);
    ctx.fillText("来挑战我吧！", 125, 150);

    console.log('----', `../../assets/image/icon/${titleObj.img}.jpg`)


    // ctx.drawImage(require(`../../assets/image/icon/${titleObj.img}.jpg`), 30, 170, 80, 80);

    ctx.drawImage(sharema, 150, 170, 80, 80);

    ctx.setTextAlign("center");
    ctx.fillText("长按图片识别小程序码来挑战吧", 120, 280);

    ctx.draw();
  }

  // 获取称号
  getTitle() {
    let level = this.props.icon.level - 1;
    let num = parseInt(level / 10) + 1;
    let titleObj = {};
    if (num < 5) {
      titleObj = {
        title: cfg.title["d" + num].title,
        img: cfg.title["d" + num].img
      };
    } else {
      titleObj = {
        title: cfg.title.d5.title,
        img: cfg.title.d5.img
      };
    }
    return titleObj;
  }

  // 分享信息
  onShareAppMessage(res) {
    console.log(res);
    // let title = "";
    // let level = this.props.icon.level - 1;
    // if (res.from === "button") {
    //   // 来自页面内转发按钮
    //   title = "我在keep记忆中，完成了" + level + "级，一起来训练吧";
    // } else {
    //   title =
    //     app.globalData.userInfo.nickName +
    //     "正在邀请您进行keep记忆，一起来训练吧";
    // }

    // return {
    //   title: title,
    //   path: "pages/index/index",
    //   imageUrl: "../../assets/image/share.jpg",
    //   success: function(res) {
    //     wx.showToast({
    //       title: "转发成功",
    //       icon: "success",
    //       duration: 1500
    //     });
    //   },
    //   fail: function(res) {
    //     wx.showToast({
    //       title: "转发失败",
    //       icon: "success",
    //       duration: 1500
    //     });
    //   }
    // };
  }

  render() {
    console.log("step3333");
    return (
      <View className="step3-class">
        <Canvas canvasId="myCanvas" className="canvas-image" />
        <View className="guidetips">
          点击下方分享朋友圈按钮，邀请更多好友一起来训练
        </View>
        <View className="bottom-btn">
          <Button type="primary" size="mini" onClick={this.reStart}>
            继续练
          </Button>
          <Button type="primary" size="mini" data-canvas="myCanvas">
            分享朋友圈
          </Button>
          <Button type="primary" open-type="share" size="mini">
            炫一下
          </Button>
        </View>
      </View>
    );
  }
}

export default Step3;
