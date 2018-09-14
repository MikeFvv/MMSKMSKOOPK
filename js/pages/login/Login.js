/**
 * Created by Ward on 2018/8/28.
 * 登录界面视图
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Keyboard,
    Alert,
    NetInfo,
    AsyncStorage,
    FlatList,
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import CusBaseText from "../../component/CusBaseText";
var isNetWorkConnected = true;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userText: '',  //输入的用户名
            pwdText: '',   //输入的密码
            imgConformCode: '', //后台返回的Base64验证码
            isShowPwd:true, //是否显示密码
            isShowHistoryList:false, //是否显示
            userNameList:[], //输入过的用户名本地缓存列表
        }
    }

    //接收上一个页面传过来的title显示出来
    static navigationOptions = ({ navigation }) => ({
        header: (
            <CustomNavBar
                leftClick={() => navigation.goBack()}
                centerText={navigation.state.params.title}
                rightView={
                    <TouchableOpacity onPress={()=>{navigation.state.params ? navigation.state.params.chartSerivceClick(navigation) : null}} activeOpacity={0.7} style = {{height:40, width:60, marginTop:SCREEN_HEIGHT == 812 ? 44 : 20, alignItems:'center', justifyContent:'center'}}>
                        <CusBaseText style = {{color:'#fff', fontSize:Adaption.Font(18,15)}}>
                            客服
                        </CusBaseText>
                    </TouchableOpacity>
                }
            />
        ),
    });

    componentDidMount() {

        //记住注册，免费试玩登录的key 成功后跳转

        // global.RegisterSuccessGoToMeKey = this.props.navigation.state.key;
        //
        // if (this.props.navigation.state.params.indexR == 1) {
        //     this.refs.Toast.show('登录超时,请重新登录!', 1000);
        // }

        NetInfo.isConnected.fetch().then(isConnected => {

            isNetWorkConnected = isConnected;
        });

        this.props.navigation.setParams({
            chartSerivceClick:this._chatClcik,
        })

        AsyncStorage.getItem('UserNamerHistoryList', (error, result) => {

            if (!error){

                if (result && result != ''){
                    let resultStr = JSON.parse(result);
                    let localUserList = resultStr.split('+');
                    localUserList.splice(localUserList.length - 1,1);
                    this.setState({userNameList:localUserList});
                }
            }
        })
    }

    //客服按钮点击
    _chatClcik = (navigation) => {

        navigation.navigate('ChatSerivce');
    }


    //登录点击的函数
    _lonGinBtnClick() {
        //隐藏键盘
        Keyboard.dismiss();

        this.state.userText = this.state.userText.trim();
        this.state.pwdText = this.state.pwdText.trim();

        if (this.state.userText.length == 0) {
            this._showInfo('用户名不能为空');
            return;
        }
        else if (this.state.userText.length < 4) {
            this._showInfo('用户名的格式不正确');
            return;
        }
        else if (this.state.pwdText.length == 0) {
            this._showInfo('密码不能为空');
            return;
        }
        else if (this.state.pwdText.length < 4) {
            this._showInfo('密码的格式不正确');
            return;
        }
        else if (!Regex(this.state.userText, 'LoginUser')) {
            this._showInfo('用户名请输入4-20个英文字母 或数字 或下划线');
            return;
        }
        else if (!Regex(this.state.pwdText, 'LoginPassword')) {
            this._showInfo('密码请输入6-20个英文字母 或数字 或下划线');
            return;
        }
        else {
            this.refs.LoadingView && this.refs.LoadingView.showLoading('正在登录...');
            let params = new FormData();
            params.append("ac", "userLogin");
            params.append("username", this.state.userText);  //去掉首尾空格
            params.append("password", this.state.pwdText);
            params.append("edition", global.VersionNum);
            params.append("vcode", '6666');
            params.append("vid", 'b97ec930-7c7c-11e8-acae-0242ac190002');

            var mainUrl = global.GlobalConfig.baseURL;
            if (mainUrl.includes('http://')) {
                mainUrl = mainUrl.substring(7, mainUrl.length);
            }
            params.append("domain", mainUrl);  //附带主线路域名

            var promise = GlobalBaseNetwork.sendNetworkRequest(params);

            promise
                .then(response => {

                    this.refs.LoadingView && this.refs.LoadingView.cancer(0);
                    //请求成功
                    if (response.msg == 0 && response.data) {

                        this.refs.LoadingView && this.refs.LoadingView.showSuccess('登录成功');

                        this.props.navigation.state.params.indexR == 0;
                        let headerIcon = '';
                        if (response.data.head_icon.length > 0) {
                            headerIcon = response.data.head_icon;
                        }

                        let loginObject = {
                            'session_key': response.data.session_key,
                            'Uid': response.data.uid,
                            'Question_1': response.data.question_1,
                            'Question_2': response.data.question_2,
                            'Question_3': response.data.question_3,
                            'Tkpass_ok': response.data.tkpass_ok,
                            'Phone': response.data.phone,
                            'Email': response.data.email,
                            'Wechat': response.data.wechat,
                            'Qq_num': response.data.qq,
                            'Real_name': response.data.real_name,
                            'Token': response.data.token,
                            'TotalMoney': response.data.price.toString(),
                            'UserName': response.data.username,
                            'TKPrice': response.data.last_get_price.toString(),
                            'UserHeaderIcon': headerIcon,
                            'Sign_event': response.data.sign_event,//判断每日签到通道是否开启 0 未开，1开启
                            'Gift_event': response.data.gift_event,//判断红包通道是否开启0 未开，1开启
                            'Card_num': response.data.bank_typename,//默认的银行卡号 判断是否绑定银行卡
                            'Level': response.data.level,//代理判断
                            'is_Guest': response.data.test,//判断是否是试玩账号 test 0=正式 ，1=测试 ，2=试玩
                            'fp_ssc': response.data.fp_ssc, // 时时彩
                            'fp_pcdd': response.data.fp_pcdd, // PC蛋蛋
                            'fp_k3': response.data.fp_k3, // 快3
                            'fp_pk10': response.data.fp_pk10, // PK10
                            'fp_3d': response.data.fp_3d, // 3D
                            'fp_11x5': response.data.fp_11x5, // 11选5
                            'fp_lhc': response.data.fp_lhc, // 六合彩
                            'fp_other':response.data.fp_other, //其他彩种的返点
                            'user_Name': this.state.userText, //用户名称
                            'user_Pwd': this.state.pwdText,  //用户密码
                            'codePWD': response.data.code,  //加密登录
                        };

                        //赋值
                        global.UserLoginObject = loginObject;

                        global.UserInfo.shareInstance();
                        global.UserInfo.saveUserInfo(global.UserLoginObject, (result) => {
                        });

                        global.GPlayDatas = {}; //重新登录，清空玩法数据, 再存GPlayDatas数据
                        let datas = JSON.stringify(global.GPlayDatas);
                        AsyncStorage.setItem('PlayDatas', datas, (error) => { });

                        //判断本地是否缓存过相应的用户名
                        if (this.state.userNameList.length != 0){

                            let isRepeat = false;

                            for (let name of this.state.userNameList){

                                if (name == loginObject.UserName){
                                    isRepeat = true;
                                    break;
                                }
                            }

                            //如果缓存存过对应的账户名。则不写入缓存
                            if (isRepeat == false){

                                let localStr = '';

                                for (userStr of this.state.userNameList){
                                    localStr += userStr + '+';
                                }

                                localStr = loginObject.UserName + '+' + localStr;
                                let newLocalStr = JSON.stringify(localStr);
                                AsyncStorage.setItem('UserNamerHistoryList', newLocalStr, (error) => {});
                            }
                        }
                        else {
                            let userName = JSON.stringify(`${loginObject.UserName}+`)
                            AsyncStorage.setItem('UserNamerHistoryList', userName, (error) => {});
                        }

                        // 从投注界面进来的。
                        if (this.props.navigation.state.params.isBuy == true) {
                            PushNotification.emit('RefreshBalls');
                        }

                        this.props.navigation.goBack();
                        setTimeout(() => {
                            PushNotification.emit('HomeYinDao', global.UserLoginObject);
                            PushNotification.emit('LoginSuccess', global.UserLoginObject);
                        }, 300)

                    }
                    else {

                        if (response.param) {

                            if (response.param.includes('JSON')){
                                this.refs.LoadingView && this.refs.LoadingView.showFaile('登录失败!');
                            }
                            else {

                                this.refs.LoadingView && this.refs.LoadingView.showFaile(response.param);
                            }
                        }
                    }
                })
                .catch(err => {


                    let errStr = err.message;
                    if (errStr.includes("request failed")) {

                        if (isNetWorkConnected == true) {
                            errStr = '服务器请求失败';
                        }
                        else {
                            errStr = '网络请求失败';
                        }
                    }
                    else if (errStr.includes('JSON')){

                        this.refs.LoadingView && this.refs.LoadingView.showFaile('服务器错误,登录失败!');
                    }

                    this.refs.LoadingView && this.refs.LoadingView.showFaile(errStr);
                });
        }
    }

    _showInfo(title) {
        Alert.alert(
            '温馨提示',
            title,
            [
                { text: '确定', onPress: () => { } },
            ]
        )
    }

    //注册成功后进行加密登录
    _encodeLoginAuto(code, uid){

        let params = new FormData();
        params.append("ac", "encodeLogin");
        params.append("uid", uid);  //去掉首尾空格
        params.append("code", code);
        params.append("edition", global.VersionNum);

        var promise = GlobalBaseNetwork.sendNetworkRequest(params);

        promise
            .then(response => {

                let headerIcon = '';
                if (response.data.head_icon.length > 0) {
                    headerIcon = response.data.head_icon;
                }

                let loginObject = {
                    'session_key': response.data.session_key,
                    'Uid': response.data.uid,

                    'Token': response.data.token,
                    'TotalMoney': response.data.price.toString(),
                    'UserName': response.data.username,
                    'UserHeaderIcon': headerIcon,
                    'TKPrice': response.data.last_get_price.toString(),
                    'Level': response.data.level,//代理判断
                    'is_Guest': response.data.test,//判断是否是试玩账号 test 0=正式 ，1=测试 ，2=试玩
                    'codePWD': response.data.code,  //加密登录
                };

                global.UserLoginObject = loginObject;

                //将数据存到本地
                global.UserInfo.shareInstance();
                global.UserInfo.saveUserInfo(loginObject, (result) => {
                });

                this.refs.LoadingView && this.refs.LoadingView.showSuccess('登录成功');

                // 从投注界面进来的。
                if (this.props.navigation.state.params.isBuy == true) {
                    // global.ShouYeYinDao=1;
                    PushNotification.emit('RefreshBalls');
                }

                this.props.navigation.goBack();


                setTimeout(() => {
                    PushNotification.emit('HomeYinDao', global.UserLoginObject);
                    PushNotification.emit('LoginSuccess', global.UserLoginObject);
                }, 300)
            })
            .catch(err => {

            });
    }
    //登录试玩的函数
    _lonGinShiwanClick() {

        this.refs.LoadingView && this.refs.LoadingView.showLoading('正在登录...');
        let params = new FormData();
        params.append("ac", "regGuestUser");
        params.append("edition", global.VersionNum);
        params.append("tg_code", GlobalConfig.userData.bind_param ? GlobalConfig.userData.bind_param : '');


        var promise = GlobalBaseNetwork.sendNetworkRequest(params);

        promise
            .then(response => {

                this.refs.LoadingView && this.refs.LoadingView.cancer(0);
                //请求成功
                if (response.msg == 0 && response.data) {

                    this._encodeLoginAuto(response.data.code, response.data.uid);
                }
                else {

                    if (response.param) {
                        this.refs.LoadingView && this.refs.LoadingView.showFaile(response.param);
                    }
                }
            })
            .catch(err => {


                let errStr = err.message;
                if (errStr.includes("request failed")) {

                    if (isNetWorkConnected == true) {
                        errStr = '服务器请求失败';
                    }
                    else {
                        errStr = '网络请求失败';
                    }
                }

                this.refs.LoadingView && this.refs.LoadingView.showFaile(errStr);
            });
    }

    //用户名历史下拉列表
    _renderItemView = (item) =>{

        return <TouchableOpacity onPress={()=>{this.setState({userText:item.item, isShowHistoryList:!this.state.isShowHistoryList})}} activeOpacity={0.7} style = {{flexDirection:'row',width:SCREEN_WIDTH, height:40,  backgroundColor:"#fff", justifyContent:'center'}}>
            <View style = {{flex:0.15}}/>
            <View style = {{flex:0.85, justifyContent:'center'}}>
                <CusBaseText style = {{marginLeft: 20,fontSize:Adaption.Font(20,17)}}>
                    {item.item}
                </CusBaseText>
            </View>
        </TouchableOpacity>
    }

    render (){

        const { navigate } = this.props.navigation;

        return <View style = {{flex:1, backgroundColor:'#efeef5'}}>
            <View style = {{height:120, alignItems:'center', justifyContent:'center'}}>
                <Image style = {styles.loginHeaderImgStyle} source = {require('../me/Me_Ico/ic_userHB.png')}/>
            </View>
            <View style = {styles.loginInputViewStyle}>
                <View style = {{flex:0.15, alignItems:'flex-end'}}>
                    <Image style = {{width:20,height:20}} source={require('./img/ic_loginUser.png')}/>
                </View>
                <View style = {{flex:0.7}}>
                    <TextInput
                        allowFontScaling={false}
                        returnKeyType="done"
                        autoCapitalize={'none'}
                        defaultValue={this.state.userText}
                        onChangeText={(text) => this.setState({userText: text})}
                        placeholder='请输入账号'
                        style={{ marginLeft: 20, width:200, fontSize: 18, padding: 0 }}
                    />
                </View>
                <TouchableOpacity
                    style = {{flex:0.15, alignItems:'center'}}
                    activeOpacity={0.7}
                    onPress={() => {
                        this.setState({isShowHistoryList:!this.state.isShowHistoryList});
                    }}
                >
                    <Image style = {{width:15,height:15}} source={require('./img/ic_loginDown.png')}/>
                </TouchableOpacity>
            </View>
            <View style = {styles.loginInputViewStyle}>
                <View style = {{flex:0.15, alignItems:'flex-end'}}>
                    <Image style = {{width:20,height:20}} source={require('./img/ic_loginpwd.png')}/>
                </View>
                <View style = {{flex:0.7}}>
                    <TextInput
                        allowFontScaling={false}
                        returnKeyType="done"
                        autoCapitalize={'none'}
                        secureTextEntry={this.state.isShowPwd}
                        onChangeText={(text) => this.setState({pwdText: text})}
                        placeholder='请输入密码'
                        style={{marginLeft: 20, width:200, fontSize: 18, padding: 0 }}
                    />
                </View>
                <TouchableOpacity
                    style = {{flex:0.15, alignItems:'center'}}
                    activeOpacity={0.7}
                    onPress = {()=>{
                        this.setState({isShowPwd:!this.state.isShowPwd})
                    }}
                >
                    <Image style = {{width:30,height:20}} source={this.state.isShowPwd == false ? require('./img/ic_loginHide.png') : require('./img/ic_loginShow.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30, marginLeft: 15, marginRight: 15 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => this._lonGinBtnClick()} style={{ backgroundColor: COLORS.appColor, height: Adaption.Width(44), borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <CusBaseText style={{ fontSize: Adaption.Font(18, 16), color: 'white' }}>立即登录</CusBaseText>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 17, marginLeft: 15, marginRight: 15 }}>
                {GlobalConfig.userData.guest_status != '0' ?  <TouchableOpacity activeOpacity={1} onPress={() => this._lonGinShiwanClick()} style={{ backgroundColor: 'white', borderColor: COLORS.appColor, borderWidth: 1, height: Adaption.Width(44), borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <CusBaseText style={{ fontSize: Adaption.Font(18, 16), color: COLORS.appColor }}>免费试玩</CusBaseText>
                </TouchableOpacity> : null}
            </View>
            <View style = {{height:60, flexDirection:'row', alignItems:'center'}}>
                <View style = {{flex:0.48, alignItems:'flex-end', justifyContent:'center'}}>
                    <TouchableOpacity activeOpacity={0.7} onPress = {()=>{navigate('Register', {title:'用户注册'})}}>
                        <CusBaseText style = {{color:COLORS.appColor, fontSize:Adaption.Font(16,13)}}>
                            立即注册
                        </CusBaseText>
                    </TouchableOpacity>
                </View>
                <View style = {{marginLeft:5,marginRight:5, height:16, width:1, backgroundColor:'gray'}} />
                <View style = {{flex:0.48}}>
                    <TouchableOpacity activeOpacity={0.7} onPress = {()=>{navigate('ForgetPWD', {title:'忘记密码'})}}>
                        <CusBaseText style = {{color:'gray', fontSize:Adaption.Font(16,13)}}>
                           忘记密码
                        </CusBaseText>
                    </TouchableOpacity>
                </View>
            </View>
            {this.state.isShowHistoryList == true ? <FlatList
                style = {{position:'absolute', left:0, top:170, height:120, width:SCREEN_WIDTH, backgroundColor:'#fff'}}
                renderItem={this._renderItemView}
                data={this.state.userNameList.length != 0 ? this.state.userNameList : []}
                /> : null}
            <Toast
                ref="toast"
                position='bottom'
            />
            <LoadingView ref='LoadingView' />
        </View>
    }
}

//样式创建
const styles = StyleSheet.create({

    //用户头像视图样式
    loginHeaderImgStyle:{
        width:60,
        height:60,
        resizeMode:'contain',
    },

    //登录输入框的样式视图
    loginInputViewStyle:{
        height:50,
        backgroundColor:'#fff',
        width:SCREEN_WIDTH,
        borderBottomWidth:.5,
        borderBottomColor:'#f3f3f3',
        flexDirection:'row',
        alignItems:'center',
    }
})