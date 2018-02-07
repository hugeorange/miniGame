### 小程序

- 移动应用分享与收藏功能（https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&lang=zh_CN）
- 微信分享及收藏是指第三方App通过接入该功能，让用户可以从App分享文字、图片、音乐、视频、网页至微信好友会话、朋友圈或添加到微信收藏。
- 支持从APP分享小程序类型消息至微信，用户接收后可打开进入小程序。
- 1. 发起分享的App与小程序属于同一微信开放平台帐号。
- 2. 支持分享小程序类型消息至会话，暂不支持分享至朋友圈。
- 3. 若客户端版本低于6.5.6或在iPad客户端接收，小程序类型分享将自动转成网页类型分享。开发者必须填写网页链接字段，确保低版本客户端能正常打开网页链接。




- 微信公众平台小程序： 1725908367@qq.com  @19910602@XYZ 
- 微信公众平台公众号： 2823395872@qq.com  @19910602@XYz
- 同一处登录不同账号

- 简易教程 `https://mp.weixin.qq.com/debug/wxadoc/dev/index.html`

- 按照简易教程一步步走，就可以初始化一个小程序项目，包括账号注册（只能用没有绑定过微信的邮箱注册），开发工具下载

- 微信公众平台，微信开放平台的区别 

- 小程序绑定微信开放平台账号 - unionid 打通同一微信开放平台下的所有应用用户信息

### quickStart
- quickStart 生成的目录结构
- JSON配置： app.json 全局配置 => `pages: 页面路由配置` `window: 窗口样式`
- 公用的 入口文件 `app.js` 共用样式文件 `app.wxss`  , 小程序启动之后，在app.js中定义的App实例的 onLaunch 回调会被执行 整个小程序只有一个 App实例，是全部页面共享的
- 工具配置 project.config.json 相当于 `package.json`
- 页面配置 `page.json` 路由页面的配置
- WXML模板
- WXSS样式
- js 每个页面都是一个 Page({});  Page是一个页面构造器，这个构造器就生成了一个页面。Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
- const app = getApp()
- 组件
- API 为了让开发者可以方便的掉起微信提供的能力
- 发布前准备
- 上线
- 小程序运行机制 - `冷启动` `热启动` `多种打开场景值`
- 
- 


# 小程序代码问题
- setData 不同于 vue 可以直接改变 data 选项里的数据，和 react 类似必须调用 setData 才是正确的修改数据的方式，但有一点不同的是 react 明确指出 setState 不保证是同步操作，而小程序的setData 是这样说的 `setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。` 同样的也不允许直接修改 data 里面的值，否则可能会发生意想不到的问题
- 全局的 `getApp()` 函数可以用来获取到小程序实例。` App()` 函数用来注册一个小程序。接受一个 `object` 参数，其指定小程序的生命周期函数等。在其上有诸多声明周期方法， 其类似一个` vue` 实例
- 

- NodeJS式的模块化风格，`导出：module.exports = {}` `引入 require `
- 
- 类 vue 的 wxml 写法 
- 
- wxs 组件化尚未尝试
- 
- 自定义组件尚未尝试
-
- 分享小程序
- 
- wx.login 方法
- 
- 播放声音
```
由于写的demo中需要播放一点效果声音所以用到了微信播放声音的 api

遇到的坑：
官方文档推荐：用以下两个api创建音频管理器
wx.getBackgroundAudioManager()
wx.createInnerAudioContext()
使用过程中，发现了 ios/安卓的兼容性问题
做一下处理
const res = wx.getSystemInfoSync();
if (systemInfo.platform == 'ios') {    // 安卓、ios兼容
    this.audio = wx.getBackgroundAudioManager()
} else {
    this.audio = wx.createInnerAudioContext();
}
this.audio.title = '...'; // 必须加这一行，不然ios会报错
this.audio.src = url;
this.audio.play();
this.audio.onPlay(() => {
  console.log('播放音频...');
})

使用后，这样写会造成第一次加载音乐资源时卡顿，故需要在页面初始化的时候先将资源下载到临时文件，然后播放时从临时文件中去读取
wx.downloadFile({
  url: url,  
  success:function(res){  
    console.log(res);
    cb && cb(res);
  },
  fail:function(err){  
    console.log(err);
    utils.showSucc('下载失败！');
    cb && cb(err);
  }  
})

下载图片也是类似，需要先将资源下载到临时文件，然后调用保存图片api
wx.downloadFile({
  url: url,  
  success:function(res){  
    console.log(res)  
    wx.saveImageToPhotosAlbum({  
      filePath: res.tempFilePath,  
      success: function (res) {  
        wx.hideLoading();
        utils.showSucc('下载成功！');
      },  
      fail: function (err) {  
        console.log(err)  
        wx.hideLoading();
        utils.showSucc('下载失败！');
      }  
    })  
  },
  fail:function(err){  
    wx.hideLoading();
    console.log(err);
    utils.showSucc('下载失败！');
  }  
})
```
















