import cfg from "../../src/common/config";
import { CHANGESTATE, BASELIST, REFRESH } from "../constants/icon";

const INITIAL_STATE = {
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

export default function icon(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGESTATE:
      console.log('INITIAL_STATE123', INITIAL_STATE)
      return {
        ...state,
        ...action.payload
      };
    case BASELIST:
      return {
        ...state,
        baseList: action.payload.baseList.concat([])
      }
    case REFRESH:
      
      return INITIAL_STATE
    default:
      return state;
  }
}
