/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image,} from 'react-native';
import { StackNavigator, TabNavigator,} from "react-navigation";
import BuyLot from "./pages/buyLot/BuyLot";
import Activity from "./pages/activity/Activity";
import Find from "./pages/find/Find";
import Me from "./pages/me/Me";

import FindPlayInfo from './pages/find/FindPlayInfo';//玩家信息


import Login from './pages/login/Login';  //登录界面
import AppDownload from "./pages/buyLot/AppDownload";
import Register from './pages/login/Register'; //注册界面
import ForgetPWD from './pages/login/forgetpwd/Forgetpwd'; //忘记密码界面
import FindPWD from './pages/login/forgetpwd/Findpassword'; //找回密码方式列表
import FindpsTrans from './pages/login/forgetpwd/FindpsTrans'; //通过交易密码找回密码
import PasswordSetting from './pages/login/forgetpwd/PasswordSetting'; //找回密码重置
import FindpsEmail from './pages/login/forgetpwd/FindpsEmail'; //通过邮箱找回密码
import FindpsPhoneNum from './pages/login/forgetpwd/FindpsPhoneNum'; //通过手机号码找回密码
import FindpsEncrypt from './pages/login/forgetpwd/FindpsEncrypt'; //通过密保问题找回密码
import ChatSerivce from './pages/login/ChatSerivce';
import ActivityDetail from "./pages/activity/ActivityDetail"; //在线客服

import TouZhuRecord from './pages/me/MyAllClass/BettingRecord/TouZhuRecord'; //投注记录


import MeWinRecord from './pages/me/MyAllClass/MeWinRecord'; //中奖记录
import MeWinRecordDetails from './pages/me/MyAllClass/MeWinRecordDetails'; //中奖记录详情
import GetBuyRecord from './pages/me/MyAllClass/BuyRecord'; //提款记录
import TheRecorDatail from './pages/me/MyAllClass/TheRecorDatail'; //提款记录详情

import More from './pages/buyLot/more';


//银行卡的类
import BindBankCard from './pages/me/MyAllClass/drawalCenter/BindBankCard'; //交易记录
import DrawalInfo from './pages/me/MyAllClass/drawalCenter/DrawalInfo'; //提款信息
import DrawalSubmit from './pages/me/MyAllClass/drawalCenter/DrawalSubmit'; //提款提交

//充值银行卡的类
import RechargeCenter from './pages/me/MyAllClass/rechargeCenter/RechargeCenter'; //充值中心
import RechargeInfo from './pages/me/MyAllClass/rechargeCenter/RechargeInfo'; //充值信息
import ThridWebPay from './pages/me/MyAllClass/rechargeCenter/ThridWebPay'; //第三方web支付
import BankTransferInfo from './pages/me/MyAllClass/rechargeCenter/BankTransferInfo'; //银行转账详情
import RechargeSubmit from './pages/me/MyAllClass/rechargeCenter/RechargeSubmit'; //充值提交
import PayModelList from './pages/me/MyAllClass/rechargeCenter/PayModelList'; //wx,qq,ali充值方式
import OnlineModelList from './pages/me/MyAllClass/rechargeCenter/OnlineModelList'; //在线支付
import BankModelList from './pages/me/MyAllClass/rechargeCenter/BankModelList'; //网银转账

//个人消息
import PersonalMessage from './pages/me/MyAllClass/PersonalMessage'; //个人消息
import PersonMessageDetial from './pages/me/MyAllClass/PersonMessageDetial'; //个人消息详情

//先进交易
import CashTrasaAcount from './pages/me/MyAllClass/cashTrasaCenter/CashTrasaAcount'; //现金交易 输入账户
import CashTrasaInfo from './pages/me/MyAllClass/cashTrasaCenter/CashTrasaInfo';//现金交易信息
import CashTrasaSubmit from './pages/me/MyAllClass/cashTrasaCenter/CashTrasaSubmit';//现金交易提交

//充值记录

import AccountDetails from "./pages/me/MyAllClass/accountDetails/AccountDetails";//账户详情
import RechargeRecord from "./pages/me/MyAllClass/accountDetails/RechargeRecord";//充值记录
import RechargeDetail from "./pages/me/MyAllClass/accountDetails/RechargeDetail";//充值详情

//个人信息
import MyInfo from './pages/me/MyAllClass/myinformation/MyInfo'; //个人信息
import GrowthDetail from './pages/me/MyAllClass/myinformation/GrowthDetail'; //成长明细
import LevelReward from './pages/me/MyAllClass/myinformation/LevelReward'; //等级奖励
import MissionPackage from './pages/me/MyAllClass/myinformation/MissionPackage'; //任务礼包


//安全中心
import SafetyCenter from './pages/me/MyAllClass/safeCenter/Safetycenter';  
import FinalChangeEncry from './pages/me/MyAllClass/safeCenter/FinalChangeEncry'; //安全中心验证密保问题后修改
import ChangePsd from './pages/me/MyAllClass/safeCenter/ChangePsd'; //安全中心修改密码
import ChangeName from './pages/me/MyAllClass/safeCenter/ChangeName'; //安全中心修改真实姓名
import BindQQ from './pages/me/MyAllClass/safeCenter/BindQQ'; //安全中心修改QQ绑定
import ChangePhoNum from './pages/me/MyAllClass/safeCenter/ChangePhoNum'; //安全中心修改手机号码
import BindWechat from './pages/me/MyAllClass/safeCenter/BindWechat'; //安全中心绑定微信号
import BindEmail from './pages/me/MyAllClass/safeCenter/BindEmail'; //安全中心绑定邮箱
import NewChangeTransPsd from './pages/me/MyAllClass/safeCenter/newTradingPassword'; //安全中心绑定邮箱
import ChangeEncrypt from './pages/me/MyAllClass/safeCenter/ChangeEncrypt'; //安全中心修改密保问题
import BangBankCar from './pages/me/MyAllClass/safeCenter/BangBankCar'; //银行卡列表
import ReviseBankCar from './pages/me/MyAllClass/safeCenter/ReviseBankCar'; //修改银行卡

// 意见反馈
import FeedbackList from "./pages/me/MyAllClass/FeedbackList";
import Feedback from './pages/me/MyAllClass/Feedback'; //我要反馈
import MoreSeting from './pages/me/MyAllClass/MoreSeting'; //更多设置
import AboutUs from './pages/me/MyAllClass/Aboutus';  //关于我们

//代理申请 代理中心
import ApplicationAgentDelege from './pages/me/TheagenClass/ApplicationAgentDelege'; //申请代理
import Theagency from './pages/me/TheagenClass/Theagency'; //代理中心

import SubAccount from './pages/me/TheagenClass/agentCenter/subAccount/SubAccount'; // 下级开户
import RebateOddsTable from './pages/me/TheagenClass/agentCenter/subAccount/RebateOddsTable'; // 返点赔率表
import AddDomainName from './pages/me/TheagenClass/agentCenter/subAccount/AddDomainName'; // 添加域名

//import TouZhuZongHeDetial from './pages/home/TouZhuZongHeDetial'; //足球综合过关投注详情

import TheReportlower from './pages/me/TheagenClass/TheDelegate/TheReportlower'     //下级报表
import TheLowerManager from './pages/me/TheagenClass/TheDelegate/TheLowerManager'     //下级管理
import TheDetails from './pages/me/TheagenClass/TheDelegate/TheDetails'     //交易明显
import TheSeenReport from './pages/me/TheagenClass/TheDelegate/TheSeenReport'     //查看代理下级
import TheSeenManagement from './pages/me/TheagenClass/TheDelegate/TheSeenManagement'     //查看代理下级
import DelegeTouZhuDetial from './pages/me/TheagenClass/TheDelegate/DelegeTouZhuDetial'; //代理投注明细
import DelegeTouXiangQing from './pages/me/TheagenClass/TheDelegate/DelegtTouXiangQing'; //代理投注明细详情
import Agenthat from './pages/me/TheagenClass/TheDelegate/Agenthat'; //代理说明
import TheStatements from './pages/me/TheagenClass/TheDelegate/TheStatements'; //代理报表

//购彩相关的类
import BuyLotDetail from './pages/buyLot/buyLotDetail/BuyLotDetail';  //购彩类名
// import RoadPaper from './pages/buyLot/roadPaper/RoadPaper'; // 路纸图
import ShopCarView from './pages/buyLot/buyLotDetail/shoppingCar/ShopCarDetail'; //购物车
import ServiceArgreement from './pages/buyLot/buyLotDetail/shoppingCar/ServiceProtocal';  //服务协议
//智能追号
import SmartChaseNumber from './pages/buyLot/buyLotDetail/touzhu2.0/SmartChaseNumber/SmartChaseNumber';//智能追号
import AllenSmartChaseNumberVersion2 from './pages/buyLot/buyLotDetail/touzhu2.0/SmartChaseNumber/AllenSmartChaseNumberVersion2'; //智能追号version2
import AllenSmartChaseNumberVersion3 from './pages/buyLot/buyLotDetail/touzhu2.0/SmartChaseNumber/AllenSmartChaseNumberVersion3'; //智能追号version3

import KnowChanPlan3 from './pages/buyLot/buyLotDetail/touzhu2.0/SmartChaseNumber/KnowChanPlan';//智能追号3.0
import HighEnergy from './pages/buyLot/buyLotDetail/touzhu2.0/SmartChaseNumber/HighEnergy';//智能追号3.0

//体彩相关的类
import FBShopCarView from './pages/buyLot/FootBall/fbShopCar/FBShopCarList'; //体彩购物车列表
import FootballResult from './pages/buyLot/FootBall/Result/FootballResult';
import FootballResultDetail from "./pages/buyLot/FootBall/Result/FootballResultDetail";
import FootballGame from './pages/buyLot/FootBall/FootballGame';  // 足球Buy详情
import FBAllGame from './pages/buyLot/FootBall/FBGameCenter/AllGame/FBAllGame'; // 足球所有玩法
import Screening from './pages/buyLot/FootBall/more/Screening';  // 足球 筛选联赛
import GameRulesHome from './pages/buyLot/FootBall/GameRules/GameRulesHome'; // 足球玩法规则
import FootballPeilvCaculate from './pages/buyLot/FootBall/more/PeilvCaculateTable';  //足彩赔率计算表

// 通过TabNavigator做路由映射
const MainTab = TabNavigator({
    BuyLot: {
        screen: BuyLot,
        navigationOptions: () => TabOptions('购彩大厅',require('./res/ic_tabbar_buylot.png'), require('./res/ic_tabbar_buylot_select.png'), '购彩大厅'),
    },
    Activity: {
        screen: Activity,
        navigationOptions: () => TabOptions('活动中心', require('./res/ic_tabbar_activity.png'),require('./res/ic_tabbar_activity_select.png'), '活动中心'),
    },
    Find: {
        screen: Find,
        navigationOptions: () => TabOptions('发现', require('./res/ic_tabbar_find.png'), require('./res/ic_tabbar_find_select.png'), '发现'),
    },
    Me: {
        screen: Me,
        navigationOptions: () => TabOptions('我的账户', require('./res/ic_tabbar_me.png'), require('./res/ic_tabbar_me_selct.png'), '我的账户'),
    },
}, {
    animationEnabled: false,  // 是否在更改标签时显示动画。
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否允许在标签之间进行滑动。
    lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    StatusBar: {
        translucent: true,
    },
    tabBarOptions: {
        // iOS属性
        // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
        activeTintColor: COLORS.appColor, // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor: '#999', // label和icon的前景色 不活跃状态下(未选中)。

        activeBackgroundColor: '#21292C', //label和icon的背景色 活跃状态下（选中） 。
        inactiveBackgroundColor: '#21292C', // label和icon的背景色 不活跃状态下（未选中）。
        showLabel: true, // 是否显示label，默认开启。
        style: {
            height: 49,
            backgroundColor: '#f3f3f3', // TabBar 背景色
        }, // tabbar的样式。
        labelStyle: { fontSize: 12 }, //label的样式。
        iconStyle: {
            margin: {},//对于安卓底部tab适配
        },
    },
});

const MainNav = StackNavigator({

    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    MainTab: { screen: MainTab },

    //将需要跳转的页面注册在这里，全局才可以跳转

    //登录模块的类
    Login: { screen: Login },
    Register: {screen: Register},
    ForgetPWD: { screen: ForgetPWD},
    FindPWD: { screen: FindPWD },
    FindpsTrans: { screen: FindpsTrans },
    PasswordSetting: { screen: PasswordSetting },
    FindpsEmail: { screen: FindpsEmail },
    FindpsPhoneNum: { screen: FindpsPhoneNum },
    FindpsEncrypt: { screen: FindpsEncrypt },
    ChatSerivce: {screen: ChatSerivce},

    //发现模块里面的玩家信息
    FindPlayInfo: {screen: FindPlayInfo},
    AppDownload: { screen: AppDownload },
    ActivityDetail: { screen: ActivityDetail },

    TouZhuRecord:{screen:TouZhuRecord}, //提款记录
    TheRecorDatail:{screen:TheRecorDatail}, //提款记录详情

    MeWinRecord: {screen:MeWinRecord}, //中奖记录
    MeWinRecordDetails:{screen:MeWinRecordDetails},
    GetBuyRecord:{screen:GetBuyRecord}, //交易记录

    //个人信息
    MyInfo: { screen: MyInfo },
    GrowthDetail: { screen: GrowthDetail },
    LevelReward: { screen: LevelReward },
    MissionPackage: { screen: MissionPackage },

    //银行卡
    BindBankCard:{screen:BindBankCard},
    DrawalInfo:{screen:DrawalInfo},
    DrawalSubmit:{screen:DrawalSubmit},

    //交易中心
    RechargeCenter: { screen: RechargeCenter },
    RechargeInfo: { screen: RechargeInfo },
    BankTransferInfo: { screen: BankTransferInfo },
    ThridWebPay: { screen: ThridWebPay },
    RechargeSubmit: { screen: RechargeSubmit },
    PayModelList: { screen: PayModelList },
    OnlineModelList: { screen: OnlineModelList },
    BankModelList: { screen: BankModelList },

    //我的消息
     PersonalMessage :{ screen: PersonalMessage }, //我的消息
     PersonMessageDetial :{ screen: PersonMessageDetial},

    //现金交易
    CashTrasaAcount: { screen: CashTrasaAcount },
    CashTrasaInfo: { screen: CashTrasaInfo },
    CashTrasaSubmit: { screen: CashTrasaSubmit },

    //充值记录
     RechargeRecord: { screen: RechargeRecord },
     AccountDetails: { screen: AccountDetails }, 
     RechargeDetail: { screen: RechargeDetail },



    //安全中心
    SafetyCenter : { screen: SafetyCenter },
    FinalChangeEncry : { screen: FinalChangeEncry}, //安全中心验证密保问题后修改
    ChangePsd : { screen: ChangePsd}, //安全中心修改密码
    ChangeName :{ screen: ChangeName}, //安全中心修改真实姓名
    BindQQ :{ screen: BindQQ}, //安全中心修改QQ绑定
    ChangePhoNum :{ screen: ChangePhoNum}, //安全中心修改手机号码
    BindWechat :{ screen: BindWechat}, //安全中心绑定微信号
    BindEmail :{ screen: BindEmail}, //安全中心绑定邮箱
    NewChangeTransPsd :{ screen: NewChangeTransPsd},//安全中心绑定邮箱
    ChangeEncrypt :{ screen:ChangeEncrypt }, //安全中心修改密保问题
    BangBankCar :{ screen: BangBankCar}, //银行卡列表
    ReviseBankCar :{ screen:ReviseBankCar }, ////修改银行卡

   //意见反馈
    FeedbackList:{screen:FeedbackList},
    Feedback: {screen:Feedback}, //我要反馈
    MoreSeting: {screen:MoreSeting}, //更多设置
    AboutUs: {screen:AboutUs}, //关于我们

    //代理申请 代理中心
    ApplicationAgentDelege: {screen:ApplicationAgentDelege}, //代理申请
    Theagency:{screen:Theagency}, //代理中心
    TheReportlower :{screen:TheReportlower},     //下级报表
    TheLowerManager :{screen:TheLowerManager},  //下级管理
    TheDetails  :{screen:TheDetails}, //交易明显
    TheSeenReport :{screen:TheSeenReport},    //查看代理下级
    TheSeenManagement:{screen:TheSeenManagement},  //查看代理下级
    DelegeTouZhuDetial :{screen:DelegeTouZhuDetial}, //代理投注明细
    DelegeTouXiangQing :{screen:DelegeTouXiangQing}, //代理投注明细详情
    Agenthat:{screen:Agenthat}, //代理说明
    TheStatements:{screen:TheStatements}, //代理报表

    SubAccount :{screen: SubAccount}, // 下级开户
    RebateOddsTable:{screen:RebateOddsTable},  // 返点赔率表
    AddDomainName:{screen:AddDomainName}, // 添加域名
    

    //首页

    More:{screen:More}, //更多彩种
    BuyLotDetail:{screen:BuyLotDetail},
    ShopCarView:{screen:ShopCarView},
    ServiceArgreement:{screen:ServiceArgreement},

    //智能追号
    SmartChaseNumber:{screen:SmartChaseNumber},
    KnowChanPlan3:{screen:KnowChanPlan3},
    HighEnergy:{screen:HighEnergy},

    //智能追号Version
    AllenSmartChaseNumberVersion2:{screen:AllenSmartChaseNumberVersion2},

    //智能追号Version3版本
    AllenSmartChaseNumberVersion3:{screen:AllenSmartChaseNumberVersion3},

    //足彩相关的
    FootballGame: {screen: FootballGame},  // 足球
    FBAllGame: {screen: FBAllGame}, // 足球所有玩法
    Screening : {screen: Screening },  // 筛选联赛
    FBShopCar : {screen: FBShopCarView}, //体彩购物车列表
    GameRulesHome: {screen: GameRulesHome},  // 足球玩法规则

    FootballResult:{screen:FootballResult}, //足球结果
    FootballResultDetail:{screen:FootballResultDetail}, //足球结果详情
    PeilvCaculate: {screen: FootballPeilvCaculate},//足彩赔率计算表
});


const TabOptions = (tabBarTitle, normalImage, selectedImage, navTitle) => {

    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({ tintColor, focused }) => {
        return (
            <Image resizeMode="stretch"
                // 可以用过判断focused来修改选中图片和默认图片
                   source={!focused ? normalImage : selectedImage}
                // 如果想要图标原来的样子可以去掉tintColor
                   style={{height:26, width:26}}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = { fontSize: 18, color: 'white', alignSelf: 'center' };
    // header的style
    const headerStyle={backgroundColor: COLORS.appColor, marginTop: 0};
    const tabBarVisible = true;
    // const header = null;
    return { tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle, tabBarVisible };
};

export default MainNav;
