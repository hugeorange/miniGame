"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = icon;

var _config = require("../common/config.js");

var _config2 = _interopRequireDefault(_config);

var _icon = require("../constants/icon.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
  showStep: 1,
  timeCfg: {
    time1: _config2.default.limitTime.time1,
    time2: _config2.default.limitTime.time2,
    time3: _config2.default.limitTime.time3
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

function icon() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _icon.CHANGESTATE:
      return _extends({}, state, action.payload);
    case _icon.BASELIST:
      return _extends({}, state, {
        baseList: action.payload.baseList.concat([])
      });
    default:
      return state;
  }
}