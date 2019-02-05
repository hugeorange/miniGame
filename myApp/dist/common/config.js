'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 图标总数量
var iconCfg = {
  num: 52, // 训练图标数量
  numberSpace: 40, // 数字空间-max-40
  limitTime: { // 训练限制时间
    time: 0, // 默认
    time1: 7,
    time2: 8,
    time3: 10
  },
  audio: ['https://www.zoomwei.cn/Public/mp3/succ.mp3', // 训练开场音乐，先废弃，下一版本再议
  'https://www.zoomwei.cn/Public/mp3/succ.wav', // 通过训练
  'https://www.zoomwei.cn/Public/mp3/fail.mp3' // 未通过训练
  ],
  img: 'https://www.zoomwei.cn/Public/images/1234569.jpg', // 焰灵姬福利照
  iconArr: ['icon-B', 'icon-bao', 'icon-dangao', 'icon-dilei', 'icon-fangwusvg', 'icon-feiji', 'icon-huatong', 'icon-jiahao', 'icon-jiantou', 'icon-lingdang', 'icon-qiansvg', 'icon-tuding', 'icon-xinhao', 'icon-xingxing', 'icon-tanhao', 'icon-yinle', 'icon-yumao', 'icon-ye', 'icon-zhishipai', 'icon-zuobiao', 'icon-icon-test', 'icon-beizi', 'icon-M', 'icon-chazi', 'icon-baozi', 'icon-DNA', 'icon-duihuakuang', 'icon-denglou', 'icon-chuan', 'icon-fenzi', 'icon-fuzi', 'icon-gaogenxie', 'icon-gaojiaobei', 'icon-jiweijiu', 'icon-erji', 'icon-huoguo', 'icon-nan', 'icon-gou', 'icon-laba', 'icon-jiandao', 'icon-maozi', 'icon-qizinan', 'icon-pingzi', 'icon-regou', 'icon-waitao', 'icon-xigua', 'icon-xiangji', 'icon-xuegao', 'icon-yaling', 'icon-xiongzhao', 'icon-yusan', 'icon-yueliang', 'icon-yanjing'],
  gameMode: ['1', // 记忆图标训练简易模式
  '2', // 记忆图标训练正常模式
  '7'],
  numberMode: '3', // 数字空间训练正常模式
  title: {
    d1: {
      title: '记忆小白',
      img: 'xiaobai.jpg'
    },
    d2: {
      title: '记忆能手',
      img: 'nengshou.jpg'
    },
    d3: {
      title: '记忆超群',
      img: 'chaoqun.jpg'
    },
    d4: {
      title: '记忆大师',
      img: 'dashi.jpg'
    },
    d5: {
      title: '记忆宗师',
      img: 'zongshi.jpg'
    }
  }
};

exports.default = iconCfg;