// 图标总数量
const iconCfg = {
	num: 54, // 游戏图标数量
	limitTime: { // 游戏限制时间
		time: 0, // 默认
		time1: 7,
		time2: 8,
		time3: 10
	},
	audio: [
		'https://www.zoomwei.cn/Public/mp3/succ.mp3', // 开场音乐，先废弃，下一版本再议
		'https://www.zoomwei.cn/Public/mp3/succ.mp3', // 成功
		'https://www.zoomwei.cn/Public/mp3/fail.mp3' // 失败
	],
	img: 'https://www.zoomwei.cn/Public/images/1234569.jpg', // 焰灵姬福利照
    iconArr: [
		"icon-huaxue",
		"icon-huahua",
		"icon-lishi",
		"icon-feichuan",
		"icon-huojian",
		"icon-lunchuan",
		"icon-fanchuan",
		"icon-laoshihuoche",
		"icon-huoche",
		"icon-bashi",
		"icon-shuiche",
		"icon-wuche",
		"icon-gongjiaoche",
		"icon-chuzuche",
		"icon-motuoche",
		"icon-xiaomotuo",
		"icon-zihangche",
		"icon-dalishuishou-",
		"icon-mingzhentankenan-",
		"icon-xinpusen-",
		"icon-shinubi-",
		"icon-longmao-",
		"icon-zuqiuxiaojiang-",
		"icon-tangmumao-",
		"icon-jieruishu-",
		"icon-atongmu-",
		"icon-dingdinglixianji-",
		"icon-yanshudegushi-",
		"icon-milaoshu--",
		"icon-labixiaoxin-",
		"icon-shenqibaobei-",
		"icon-feitianxiaonvjing-",
		"icon-haimianbaobao-",
		"icon-duolaameng-",
		"icon-xiaoxiongweini-",
		"icon-suanpan",
		"icon-qiqiaoban",
		"icon-shuiqiang",
		"icon-jimu",
		"icon-huabanche",
		"icon-fengche",
		"icon-fengzheng",
		"icon-jingziqi",
		"icon-zhifeiji",
		"icon-qizi",
		"icon-qiqiu",
		"icon-tuya",
		"icon-xiaopiqiu",
		"icon-xiaoxiong",
		"icon-youxiji",
		"icon-yazi",
		"icon-zhuqingting",
		"icon-hua",
		"icon-nanhai",
		"icon-nvhai",
		"icon-laodong",
		"icon-shijian",
		"icon-siwei",
		"icon-yiwen",
		"icon-fenxi",
		"icon-shuimianshi",
		"icon-yiwushi",
		"icon-taolun",
		"icon-dili",
		"icon-zhengzhi",
		"icon-yuwen",
		"icon-yingyu",
		"icon-shuxue",
		"icon-shufa",
		"icon-yinle",
	],
	gameMode:[
		'1', // 记忆图标简易模式
		'2', // 记忆图标正常模式
		'7', // 记忆图标7s
	]
}


module.exports = {
    iconNum: iconCfg.num,
	iconArr: iconCfg.iconArr,
	limitTime: iconCfg.limitTime,
	audioCfg: iconCfg.audio,
	img: iconCfg.img,
}