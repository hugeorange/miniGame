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

var _icon = require("../../actions/icon.js");

var _util = require("../../common/util.js");

var _config = require("../../common/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step2 = (_dec = (0, _index3.connect)(function (_ref) {
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
  _inherits(Step2, _BaseComponent);

  function Step2() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Step2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Step2.__proto__ || Object.getPrototypeOf(Step2)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "clickNo", "isPassClass", "baseList", "asyncChangeState", "icon", "changeState"], _this.renderIcon = function (iconProps) {
      var baseList = iconProps.baseList,
          currArr = iconProps.currArr;

      var currMap = currArr.reduce(function (acc, cur) {
        acc[cur.no] = cur;
        return acc;
      }, {});
      // 不可以在原数据上修改，必须在新数据上修改，需要一层深拷贝，再仔细阅读下redux文档，对复杂数据类型的处理
      // let list = JSON.parse(JSON.stringify(baseList))
      // let list = [...baseList]
      // let list = Object.assign([], baseList)
      // let list = baseList.concat([])
      // 不知道为什么👇这样写又可以了
      // class 类不知道为什么总是生成两个

      baseList.forEach(function (item) {
        if (currMap[item.no]) {
          item.icon = currMap[item.no]['icon'];
          item.isSelect = false;
        }
      });
      _this.props.baseList({ baseList: baseList });
    }, _this.clickIcon = function (item) {
      var _this$props$icon = _this.props.icon,
          baseList = _this$props$icon.baseList,
          passArr = _this$props$icon.passArr;
      var no = item.no,
          icon = item.icon,
          isSelect = item.isSelect;

      if (icon && !isSelect) {
        baseList[no].isSelect = true;
        _this.props.baseList({ baseList: baseList });
        if (passArr.includes(icon)) {
          // 未通过当前关卡挑战
          _this.noPassLevel(item);
        } else {
          // 通过当前关卡挑战
          _this.passLevel(item);
        }
      }
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Step2, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Step2.prototype.__proto__ || Object.getPrototypeOf(Step2.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('我是不是只执行了一次次');
      this.initIcon();
    }
  }, {
    key: "initIcon",
    value: function initIcon() {
      var _this2 = this;

      var list1 = [];
      var list2 = [];
      var list3 = [];
      var num = _config2.default.num;
      var iconArr = _config2.default.iconArr;
      for (var i = 0; i < num; i++) {
        var obj1 = { no: i, icon: '', isSelect: false };
        var obj2 = { no: i, icon: iconArr[i] };
        list1.push(obj1);
        list2.push(obj2);
        list3.push(i);
      }
      // https://stackoverflow.com/questions/39524855/how-to-trigger-off-callback-after-updating-state-in-redux
      this.props.asyncChangeState({
        baseList: list1, // 基础列表
        iconList: list2, // 基础图标
        iconPosArr: list3 // 图标位置
      }).then(function (res) {
        // 在这个 then 里面 this.props 里面拿不到东西，不明白 redux-thunk 如何使用，回头再来探究
        _this2.createCurrent(res.icon);
      });
    }
  }, {
    key: "createCurrent",
    value: function createCurrent(iconProps) {
      var _this3 = this;

      var level = iconProps.level,
          gameMode = iconProps.gameMode,
          iconList = iconProps.iconList,
          currArr = iconProps.currArr,
          iconPosArr = iconProps.iconPosArr;

      var passArr = currArr.map(function (item) {
        return item.icon;
      }); // 深拷贝上一等级的图标数组

      var _getOneArray = (0, _util.getOneArray)(iconList),
          index = _getOneArray.index,
          item = _getOneArray.item; // 随机取出当前等级的新图标


      var posArr = (0, _util.getNumArray)(iconPosArr, level); // 取出当前等级的随机位置
      currArr.push(item);
      iconList.splice(index, 1);

      // // 每完成一级训练打乱位置, -1 为训练模式
      if (gameMode !== '-1') {
        currArr.forEach(function (element, index) {
          return element.no = posArr[index];
        });
      }

      this.props.asyncChangeState({ passArr: passArr, currArr: currArr, iconList: iconList }).then(function (res) {
        return _this3.renderIcon(res.icon);
      });
    }
  }, {
    key: "passLevel",
    value: function passLevel(item) {
      var _this4 = this;

      var level = this.props.icon.level;

      // 播放通关音乐
      // 展示挑战成功状态

      this.props.changeState({ clickNo: item.no, isPassClass: 'passClass' });

      // 下一关卡渲染
      setTimeout(function () {
        _this4.props.changeState({ isPassClass: '', level: ++level });
        _this4.clearBaseList('createCurrent');
      }, 800);
    }

    // 清空baseList布局

  }, {
    key: "clearBaseList",
    value: function clearBaseList(cb) {
      var _this5 = this;

      var baseList = this.props.icon.baseList;

      baseList.forEach(function (item) {
        return item.icon = '';
      });
      this.props.baseList({ baseList: baseList }).then(function (res) {
        cb && _this5[cb](res.icon);
      });
    }
  }, {
    key: "noPassLevel",
    value: function noPassLevel(item) {
      console.log('挑战失败，不通过...');
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      var _props$icon = this.__props.icon,
          baseList = _props$icon.baseList,
          clickNo = _props$icon.clickNo,
          isPassClass = _props$icon.isPassClass;

      console.log('step2222');
      var loopArray0 = baseList.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = String(index);
        return {
          $loopState__temp2: $loopState__temp2,
          $original: item.$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        clickNo: clickNo,
        isPassClass: isPassClass,
        baseList: baseList
      });
      return this.__state;
    }
  }]);

  return Step2;
}(_index.Component), _class2.properties = {
  "asyncChangeState": {
    "type": null,
    "value": null
  },
  "baseList": {
    "type": null,
    "value": null
  },
  "icon": {
    "type": null,
    "value": null
  },
  "changeState": {
    "type": null,
    "value": null
  }
}, _class2.$$events = ["clickIcon"], _class2.externalClasses = ['step2-class'], _class2.options = {
  addGlobalClass: true
}, _temp2)) || _class);
exports.default = Step2;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Step2));