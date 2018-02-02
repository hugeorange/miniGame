const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 从一个数组里随机取出一个元素
const getOneArray = (items) => {
  const index = Math.floor(Math.random()*items.length);
  const item = items[index];
  console.log('index:', index, 'item:', item);
  return {index, item};
}

// 从一个数组里随机取出几个不同的值组成一个新数组
const getNumArray = (arr, count) => {
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
}

function ajax(url, param, success, fail, type="get") {
  wx.showLoading({title: '加载中...'});
  wx.request({
    type: type,
    url: url,
    data: param,
    header: { 'content-type': 'application/json' },
    success: function(res) {
      wx.hideLoading();
      success && success(res.data);
    },
    fail: function(err) {
      wx.hideLoading();
      fail && fail(err);
    }
  })
}

// 微信成功toast
const showSucc = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 1500
  })
}
// 微信失败toast
const showNone = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 1500
  })
}

module.exports = {
  formatTime: formatTime,
  getOneArray: getOneArray,
  getNumArray: getNumArray,
  ajax: ajax,
  showSucc: showSucc,
  showNone: showNone,
}
