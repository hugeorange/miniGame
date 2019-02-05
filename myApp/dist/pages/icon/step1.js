"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class, _class2, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _config = require("../../common/config.js");

var _config2 = _interopRequireDefault(_config);

var _icon = require("../../actions/icon.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step1 = (_dec = (0, _index3.connect)(function (_ref) {
  var icon = _ref.icon;
  return {
    icon: icon
  };
}, function (dispatch) {
  return {
    changeState: function changeState(param) {
      dispatch((0, _icon.changeState)(param));
    },
    asyncChangeState: function asyncChangeState(param) {
      return dispatch((0, _icon.asyncChangeState)(param));
    },
    baseList: function baseList(param) {
      return dispatch((0, _icon.baseList)(param));
    }
  };
}), _dec(_class = (_temp2 = _class2 = function (_BaseComponent) {
  _inherits(Step1, _BaseComponent);

  function Step1() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Step1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Step1.__proto__ || Object.getPrototypeOf(Step1)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["time1", "changeState", "icon"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Step1, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Step1.prototype.__proto__ || Object.getPrototypeOf(Step1.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "goStart",
    value: function goStart(time) {
      this.props.changeState({
        showStep: 2,
        modeTime: time,
        gameMode: time
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      var timeCfg = this.__props.icon.timeCfg;

      var time1 = _config2.default.limitTime.time1;
      console.log('step111');
      Object.assign(this.__state, {
        time1: time1
      });
      return this.__state;
    }
  }]);

  return Step1;
}(_index.Component), _class2.properties = {
  "changeState": {
    "type": null,
    "value": null
  },
  "icon": {
    "type": null,
    "value": null
  }
}, _class2.$$events = ["goStart"], _class2.externalClasses = ['step1-class'], _class2.options = {
  addGlobalClass: true

  // 开始模式
}, _temp2)) || _class);
exports.default = Step1;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Step1));