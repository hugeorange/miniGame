'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatTime = exports.formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

var formatNumber = exports.formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

// 从一个数组里随机取出一个元素
var getOneArray = exports.getOneArray = function getOneArray(items) {
  var index = Math.floor(Math.random() * items.length);
  var item = items[index];
  return { index: index, item: item };
};

// 从一个数组里随机取出几个不同的值组成一个新数组
var getNumArray = exports.getNumArray = function getNumArray(arr, count) {
  var shuffled = arr.slice(0);
  var i = arr.length;
  var min = i - count;
  var temp;
  var index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};

function ajax(url, param, _success, _fail, method) {
  var isShow = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

  var param = Object.assign({}, param, { "PHPSESSID": app.globalData.PHPSESSID }, { "uid": app.globalData.uid });
  console.log(url, param, method);
  if (isShow) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
  }
  wx.request({
    method: method,
    url: url,
    data: param,
    header: { 'content-type': 'application/json' },
    success: function success(res) {
      wx.hideLoading();
      _success && _success(res.data);
    },
    fail: function fail(err) {
      wx.hideLoading();
      _fail && _fail(err);
    }
  });
}

// 成功toast
var showSucc = function showSucc(msg) {
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 1500
  });
};
// 失败toast
var showNone = function showNone(msg) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;

  wx.showToast({
    title: msg,
    icon: 'none',
    duration: time
  });
};

// loading
var showLoading = function showLoading(msg) {
  wx.showLoading({
    title: msg,
    mask: true
  });
};

// 防抖函数
var throttle = function throttle(method, delay, context) {
  clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    console.log(111);
    method.call(context);
  }, delay);
};

/*
canvas filltext API 自动换行

str:要绘制的字符串
canvas:canvas对象
initX:绘制字符串起始x坐标
initY:绘制字符串起始y坐标
lineHeight:字行高，自己定义个值即可
*/

var canvasTextAutoLine = function canvasTextAutoLine(str, ctx, canvasWidth, initX, initY, lineHeight) {
  var lineWidth = 0;
  // var canvasWidth = c.width; 
  var lastSubStrIndex = 0;
  for (var i = 0; i < str.length; i++) {
    console.log(str[i]);
    // debugger
    lineWidth += ctx.measureText(str[i]).width;
    if (lineWidth > canvasWidth - initX) {
      //减去initX,防止边界出现的问题
      ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
      initY += lineHeight;
      lineWidth = 0;
      lastSubStrIndex = i;
    }
    if (i == str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
    }
  }
};

/*
function canvasTextAutoLine(str,canvas,initX,initY,lineHeight){
  var ctx = canvas.getContext("2d"); 
  var lineWidth = 0;
  var canvasWidth = c.width; 
  var lastSubStrIndex= 0; 
  for(let i=0;i<str.length;i++){ 
      lineWidth+=ctx.measureText(str[i]).width; 
      if(lineWidth>canvasWidth-initX){//减去initX,防止边界出现的问题
          ctx.fillText(str.substring(lastSubStrIndex,i),initX,initY);
          initY+=lineHeight;
          lineWidth=0;
          lastSubStrIndex=i;
      } 
      if(i==str.length-1){
          ctx.fillText(str.substring(lastSubStrIndex,i+1),initX,initY);
      }
  }
}
*/

// module.exports = {
//   formatTime: formatTime,
//   getOneArray: getOneArray,
//   getNumArray: getNumArray,
//   ajax: ajax,
//   showSucc: showSucc,
//   showNone: showNone,
//   showLoading: showLoading,
//   throttle: throttle,
//   canvasTextAutoLine: canvasTextAutoLine,
// }