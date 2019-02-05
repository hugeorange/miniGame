import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import "./home.less";

class Index extends Component {
  config = {
    navigationBarTitleText: "记忆力训练",
    navigationBarBackgroundColor: "#fac800"
  };

  itemClick = (type) => {
    const path = `../${type}/${type}`
    console.log(path)
    Taro.navigateTo({url: path})
  }

  render() {
    return (
      <View className="index">
        <View className="item-c">
          <View className="item" hover-class="item-hover" onClick={this.itemClick.bind(this, 'icon')}>记忆图标</View>
          <View className="item" hover-class="item-hover" bindtap={this.itemClick.bind(this, 'space')}>数字空间</View>
        </View>

        <View className="more-ac">更多项目，敬请期待...</View>

      </View>
    );
  }
}

export default Index;
