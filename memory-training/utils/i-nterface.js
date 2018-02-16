/**
 * 后台接口列表
 */
const utils = require('util.js');

/**
 * 参数： code: 通过 wx.login 方法获得
 * 返回值：uid、PHPSESSIONID
 */

const sendSessionCode = (param, succ, fail) => {
  const url = "https://www.zoomwei.cn/api/59715d4f7dd24.html";
  var param = param || {};
  utils.ajax(url, param, succ, fail, 'get');
}


/**
 * 具体怎么个流程还是十分模糊
 * 用户数据的签名验证和加解密  ==> 安全起见，确保发往服务器信息的可靠性、校验数据的完整性
 * 数据签名检验
 * 通过调用 wx.getUserInfo获取数据时，接口会同时返回 rawData、signature，其中 signature = sha1( rawData + session_key )
 * 开发者将 signature、rawData 发送到开发者服务器进行校验。服务器利用用户对应的 session_key 使用相同的算法计算出签名 signature2 ，比对 signature 与 signature2 即可校验数据的完整性
 * 
 * 参数：uid、resData用户信息
 * 返回值：true/false
 */
const saveUserInfo = (param, succ, fail) => {
  const url = "https://www.zoomwei.cn/api/59759d7d8e64c.html";
  var param = param || {};
  utils.ajax(url, param, succ, fail, 'get');
}

/**
 * 存储用户成绩数据
 * 参数：uid、gameMode、level
 */
const saveUserInfoScore = (param, succ, fail, isShow) => {
  const url = "https://www.zoomwei.cn/api/5975aa40c4afd.html";
  var param = param || {};
  utils.ajax(url, param, succ, fail, 'get', isShow);
}


 /**
  * 获取该用户最高得分
  * 无参数
  */
const getWxUserScore = (param, succ, fail) => {
  const url = "https://www.zoomwei.cn/api/5976aef463a77.html";
  var param = param || {};
  utils.ajax(url, param, succ, fail, 'get');
}

/**
 * 获取达人榜
 */
const getTop = (param, succ, fail) => {
  const url = "https://www.zoomwei.cn/api/5a794e34638cd.html";
  var param = param || {};
  utils.ajax(url, param, succ, fail, 'get');
}


module.exports = {
  sendSessionCode: sendSessionCode,
  saveUserInfo: saveUserInfo,
  saveUserInfoScore: saveUserInfoScore,
  getWxUserScore: getWxUserScore,
  getTop: getTop,
}