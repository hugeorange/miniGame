/**
 * 后台接口列表
 */

/**
 * 参数： code: 通过 wx.login 方法获得
 * 返回值：uid、PHPSESSIONID
 */


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


/**
 * 存储用户成绩数据
 * 参数：uid、gameMode、level
 */


 /**
  * 用户排行榜数据
  * 无参数
  */