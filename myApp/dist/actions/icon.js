"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.asyncChangeState = asyncChangeState;
exports.baseList = baseList;

var _icon = require("../constants/icon.js");

var changeState = exports.changeState = function changeState(param) {
  return {
    type: _icon.CHANGESTATE,
    payload: _extends({}, param)
  };
};

function asyncChangeState(param) {
  return function (dispatch, getState) {
    dispatch({
      type: _icon.CHANGESTATE,
      payload: _extends({}, param)
    });
    var state = getState();
    return Promise.resolve(state);
  };
}

function baseList(param) {
  return function (dispatch, getState) {
    dispatch({
      type: _icon.BASELIST,
      payload: _extends({}, param)
    });
    var state = getState();
    return Promise.resolve(state);
  };
}