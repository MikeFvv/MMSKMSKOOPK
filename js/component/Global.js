/**
 * Created by kl on 2018/8/22.
 */

import React from 'react';
import {
    Dimensions,
    PixelRatio,
    DeviceEventEmitter,
    Platform,
    AsyncStorage,
} from 'react-native';

import Colors from "./Colors";
import CusBaseText from "./CusBaseText";
import AllenNavStyle from "./AllenNavStyle";
import RNLoading from './RNLoading';
import BaseNetwork from './BaseNetwork';
import Config from './Config';
import UserInfo from './UserInfoObject';
import Adaption from './Adaption';
import Regex from './Regex';
import FontSize from './TextSize';



let { height, width } = Dimensions.get('window');

const X_WIDTH = 375;
const X_HEIGHT = 812;

// ✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰
// 手动修改这里  ✰✰✰✰✰✰✰✰✰ 🐶🐶🐶 ✰✰✰✰✰✰✰✰✰

// 使用RN调整参数  默认 false
// 是  true  
// 否  false 
global.GLOBALisRNParameters = true;

// 切换路由
// 0 自动判断=>真页面或者输入域名页面；
// 1 真页面；
// 2 马甲页面；
global.SwitchRoute = 1;

// 版本号    版本号的格式：v<主版本号>.<副版本号>.<发布号>
global.VersionNum = 'v0.01.0';
// --------------------

// 测试业主域名
global.SwitchURLIndex = 0;

// ✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰





// 获取屏幕宽度  使用： 例  SCREEN_WIDTH
global.SCREEN_WIDTH = width;
// 获取屏幕高度  使用： 例  SCREEN_HEIGHT
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率  iPhone5 = 2  iPhone6 = 2  iPhone 6 Plus = 3
global.PixelRatio = PixelRatio.get();
// 常用颜色    使用：COLORS.appColor
global.COLORS = Colors;
// 适配字体  使用： 例  FONT_SIZE(14)  会根据屏幕大小调整字体大小, 以iPhone5屏幕大小为基准字体
global.FONT_SIZE = FontSize;
//基础文本类
global.CusBaseText = CusBaseText;
//自定义导航栏
global.CustomNavBar = AllenNavStyle;
//进度提示框
global.LoadingView = RNLoading;
// 网络请求
global.GlobalBaseNetwork = BaseNetwork;
// 配置文件
global.GlobalConfig = Config;
//用户信息 UserInfo
global.UserInfo = UserInfo;
//字体大小，宽高适配类
global.Adaption = Adaption;
//正则校验的工具类
global.Regex = Regex;
// 通知监听的方法
global.PushNotification = DeviceEventEmitter;
//用户登录后存储的信息
global.UserLoginObject = {
    'session_key':'',
    'Uid': '',
    'Question_1': '',
    'Question_2': '',
    'Question_3': '',
    'Tkpass_ok': '',
    'Phone': '',
    'Email': '',
    'Wechat': '',
    'Qq_num': '',
    'Real_name': '',
    'Token': '',
    'TotalMoney': '',
    'UserName': '',
    'TKPrice': '',
    'UserHeaderIcon': '',
    'Sign_event': '',//判断每日签到通道是否开启 0 未开，1开启
    'Gift_event': '',//判断红包通道是否开启0 未开，1开启
    'Card_num': '',//默认的银行卡号 判断是否绑定银行卡
    'Level': '',//代理判断
    'is_Guest': '',//判断是否是试玩账号
    'RiseEvent': '',//是不是开放等级页面
    'fp_ssc': '', // 时时彩
    'fp_pcdd': '', // PC蛋蛋
    'fp_k3': '', // 快3
    'fp_pk10': '', // PK10
    'fp_3d': '', // 3D
    'fp_11x5': '', // 11选5
    'fp_lhc': '', // 六合彩
    'fp_other':'', //其他彩种的返点
    'user_Name': '', //用户名称
    'user_Pwd': '',  //用户密码 
    'rise_lock': '', //每日加奖是否跳动
    'codePWD' : '',  //加密登录密文
}
//银行卡列表数组
global.BankListArray = [];
//记录投注的gameid,用来搞游戏偏好。 目前还不知道游戏偏好
global.GTouZhuGameID = {};
//存储本地的方法
global.UserDefalts = AsyncStorage;
//判断字符串是”“或者空格或者连续空格
global.global_isSpace = (str) => {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}
//是不是iphoneX  使用global.isIphoneX()
global.isIphoneX = () => {
    return (
        Platform.OS === 'ios' &&
        ((height === X_HEIGHT && width === X_WIDTH) ||
            (height === X_WIDTH && width === X_HEIGHT))
    );
};

//彩票相关的全局变量
global.GPlayDatas = {};  //初始化数据
global.BeiShu = '1';     //保存用户选的倍数
global.ZhuiQiShu = '1';   //保存用户选的期数

