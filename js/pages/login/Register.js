/**
 * Created by Ward on 2018/8/29.
 * 注册界面视图
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
    AsyncStorage,
} from 'react-native';

import LocalVcode from '../../component/LocalValidation'; //本地验证码
import CusBaseText from "../../component/CusBaseText";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            veriyCode: '',
            inputUserName: '',  //注册的用户名
            inputPWD: '',  //注册的密码
            inputComformPWD: '', //确认的密码
            inputCode: '',  //输入的验证码
            inputInviteCode: '', //输入的邀请码
            isNeedInviteCode: '0',  //是否需要邀请码 0:不需要 1:需要
            imgConformCode: '',  //后台返回的Base64验证码
            userText: '',   //用户名
            pwdText: '',    //密码
            isShowPwd:true, //是否隐藏密码(输入密码)
            isShowCPwd:true, //是否隐藏密码(确认密码)
        }
    }

    //接收上一个页面传过来的title显示出来
    static navigationOptions = ({navigation}) => ({
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

    componentWillMount() {

        //获取本地是否缓存邀请码，防止请求失败后不需要邀请码的也会出现邀请码
        AsyncStorage.getItem('iSNeedInviteCode', (error, result) => {
            if (!error) {

                if (result !== '' && result !== null) {

                    let inviteCodeType = JSON.parse(result);
                    this.setState({
                        isNeedInviteCode: inviteCodeType,
                    })
                }
            }
            else {
                //没有缓存则读取请求的信息
                if (GlobalConfig.userData.param_type) {
                    this.setState({
                        isNeedInviteCode: GlobalConfig.userData.param_type,
                    })
                }
            }
        })
    }

    componentDidMount() {

        global.infoLogin = this.props.navigation.state.key;

        global.invCode ? this.state.inputInviteCode = global.invCode : this.state.inputInviteCode = "";  //如果有默认邀请码则赋值

        this.props.navigation.setParams({
            chartSerivceClick:this._chatClcik,
        })

    }

    //客服按钮点击
    _chatClcik = (navigation) => {

        navigation.navigate('ChatSerivce');
    }


    //注册按钮点击的方法
    _registerMethod() {

        this.state.inputUserName = this.state.inputUserName.trim();
        this.state.inputPWD = this.state.inputPWD.trim();


        //是否需要邀请码进行注册
        let result = this.state.isNeedInviteCode == '' ? (this.state.inputUserName.length == 0 || this.state.inputPWD.length == 0
            || this.state.inputComformPWD.length == 0 || this.state.inputCode.length == 0 || this.state.inputInviteCode.length == 0) :
            (this.state.inputUserName.length == 0 || this.state.inputPWD.length == 0
                || this.state.inputComformPWD.length == 0 || this.state.inputCode.length == 0);

            if (result) {
                this._showInfo('请完善您填写的信息');
            }
            else {

                //账号格式不正确
                if (!Regex(this.state.inputUserName, 'user')){
                    this.refs.LoadingView && this.refs.LoadingView.showFaile('输入的账号格式不正确', 1);
                    return;
                }
                else if (!Regex(this.state.inputPWD, 'password')){
                    this.refs.LoadingView && this.refs.LoadingView.showFaile('输入的密码格式不正确', 1);
                    return;
                }
                else if (this.state.inputPWD != this.state.inputComformPWD) {
                    this._showInfo('两次输入的密码不一致');
                    return;
                }
                //验证码不正确
                else if (this.state.inputCode != this.state.veriyCode){
                    this.refs.LoadingView && this.refs.LoadingView.showFaile('验证码不正确', 1);
                    return;
                }
                else {
                    this.refs.LoadingView && this.refs.LoadingView.showLoading('正在注册'); //注册成功

                    let isNeedInvitedCode = this.state.isNeedInviteCode == '' ? true : false;
                    let appendInvitedCode = ''; //需要提交的邀请码

                    if (isNeedInvitedCode == true){
                        //需要邀请码时则直接等于输入的邀请码。默认的gobal.invCode已经赋值了
                        appendInvitedCode = this.state.inputInviteCode.trim();
                    }
                    else {
                        //不需要邀请码模式
                        if (global.invCode != ''){
                            //优先传入业主设置的invCode.
                            appendInvitedCode = global.invCode;
                        }
                        else {
                            //业主设置的invCode为空。则提交总后台设置的bind_param
                            appendInvitedCode = GlobalConfig.userData.bind_param;
                        }
                    }

                    let params = new FormData();  //创建请求数据表单
                    params.append("ac", "regUser");
                    params.append("username", this.state.inputUserName);
                    params.append("password", this.state.inputPWD);
                    params.append("tg_code", appendInvitedCode); //非邀请码模式默认传后台返回的邀请码
                    params.append("vcode", '6666');
                    params.append("vid", 'b97ec930-7c7c-11e8-acae-0242ac190002');
                    params.append("edition", global.VersionNum);
                    var mainUrl =  global.GlobalConfig.baseURL;
                    if (mainUrl.includes('http://'))
                    {
                        mainUrl = mainUrl.substring(7,mainUrl.length);
                    }
                    params.append("domain", mainUrl);  //附带主线路域名

                    var promise = GlobalBaseNetwork.sendNetworkRequest(params);

                    promise
                        .then(response => {

                            this.refs.LoadingView && this.refs.LoadingView.cancer(0); //注册成功
                            //请求成功
                            if (response.msg == 0 && response.data) {

                                this._encodeLoginAuto(response.data.code, response.data.uid);
                            }
                            else {
                                //验证码不正确重新刷新
                                this._showInfo(response.param ? response.param : '');
                            }
                        })
                        .catch(err => {

                            let errStr = err.message;

                            if (errStr.includes("request failed")) {
                                errStr = '服务器请求失败';
                            }

                            this.refs.LoadingView && this.refs.LoadingView.showFaile(errStr, 3);  //服务器请求错误提示

                        });
                }
            }
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
                    'session_key':response.data.session_key,
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
                    'is_Guest': response.data.text,//判断是否是试玩账号 test 0=正式 ，1=测试 ，2=试玩
                    'fp_ssc': response.data.fp_ssc, // 时时彩
                    'fp_pcdd': response.data.fp_pcdd, // PC蛋蛋
                    'fp_k3': response.data.fp_k3, // 快3
                    'fp_pk10': response.data.fp_pk10, // PK10
                    'fp_3d': response.data.fp_3d, // 3D
                    'fp_11x5': response.data.fp_11x5, // 11选5
                    'fp_lhc': response.data.fp_lhc, // 六合彩
                    'fp_other':response.data.fp_other, //其他彩种的返点
                    'user_Name': this.state.inputUserName, //用户名称
                    'user_Pwd': this.state.inputPWD,  //用户密码
                    'codePWD' : response.data.code,  //加密登录
                };

                global.UserLoginObject = loginObject;

                //将数据存到本地
                global.UserInfo.shareInstance();
                global.UserInfo.saveUserInfo(loginObject, (result) => {
                });

                this.refs.LoadingView && this.refs.LoadingView.showSuccess('注册成功');

                // 从投注界面进来的。
                if (this.props.navigation.state.params.isBuy == true) {
                    //global.ShouYeYinDao=1;
                    PushNotification.emit('RefreshBalls');
                }

                this.props.navigation.goBack();

                setTimeout(() => {
                    PushNotification.emit('LoginSuccess', global.UserLoginObject);
                    PushNotification.emit('HomeYinDao', global.UserLoginObject);
                }, 300)
            })
            .catch(err => {

            });
    }

    //弹出提示框的方法
    _showInfo(content) {

        Alert.alert(
            '温馨提示',
            content,
            [
                {
                    text: '确定', onPress: () => {
                }
                },
            ]
        )
    }

    render() {

        return <View style = {{flex:1, backgroundColor:'#efeef5'}}>
            <View style = {{height:20,width:SCREEN_WIDTH}}/>
            {this.state.isNeedInviteCode == '' ? <View style = {styles.registerInputStyle}>
                <View style = {{flex:0.25}}>
                    <CusBaseText style = {styles.leftTitleStyle}>
                        邀请码
                    </CusBaseText>
                </View>
                <View style = {{flex:0.75}}>
                    <TextInput
                        allowFontScaling={false}
                        returnKeyType="done"
                        keyboardType={'number-pad'}
                        onChangeText={(text) => this.setState({inputInviteCode: text})} maxLength={6}
                        placeholder='请输入邀请码'
                        style={{width: 200, fontSize: Adaption.Font(16, 14), marginLeft: 20, padding: 0}}
                    />
                </View>
            </View> : null}
            <View style = {styles.registerInputStyle}>
                <View style = {{flex:0.25}}>
                    <CusBaseText style = {styles.leftTitleStyle}>
                        账号
                    </CusBaseText>
                </View>
                <View style = {{flex:0.75}}>
                    <TextInput
                        allowFontScaling={false}
                        returnKeyType="done"
                        keyboardType={'number-pad'}
                        onChangeText={(text) => this.setState({inputUserName: text})}
                        placeholder='请输入账号'
                        style={{width: 200, fontSize: Adaption.Font(16, 14), marginLeft: 20, padding: 0}}
                    />
                </View>
            </View>
            <View style = {styles.registerInputStyle}>
                <View style = {{flex:0.25}}>
                    <CusBaseText style = {styles.leftTitleStyle}>
                       设置密码
                    </CusBaseText>
                </View>
                <View style = {{flex:0.6}}>
                    <TextInput
                        allowFontScaling={false}
                        returnKeyType="done"
                        keyboardType={'number-pad'}
                        secureTextEntry={this.state.isShowPwd}
                        onChangeText={(text) => this.setState({inputPWD: text})}
                        placeholder='请输入密码'
                        style={{width: 150, fontSize: Adaption.Font(16, 14), marginLeft: 20, padding: 0}}
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
            <View style = {styles.registerInputStyle}>
                <View style = {{flex:0.25}}>
                    <CusBaseText style = {styles.leftTitleStyle}>
                        确定密码
                    </CusBaseText>
                </View>
                <View style = {{flex:0.6}}>
                    <TextInput
                        allowFontScaling={false}
                        returnKeyType="done"
                        keyboardType={'number-pad'}
                        secureTextEntry={this.state.isShowCPwd}
                        onChangeText={(text) => this.setState({inputComformPWD: text})}
                        placeholder='请输入密码'
                        style={{width: 150, fontSize: Adaption.Font(16, 14), marginLeft: 20, padding: 0}}
                    />
                </View>
                <TouchableOpacity
                    style = {{flex:0.15, alignItems:'center'}}
                    activeOpacity={0.7}
                    onPress = {()=>{
                        this.setState({isShowCPwd:!this.state.isShowCPwd})
                    }}
                >
                    <Image style = {{width:30,height:20}} source={this.state.isShowCPwd == false ? require('./img/ic_loginHide.png') : require('./img/ic_loginShow.png')}/>
                </TouchableOpacity>
            </View>
            <View style = {styles.registerInputStyle}>
                <View style = {{flex:0.25}}>
                    <CusBaseText style = {styles.leftTitleStyle}>
                        验证码
                    </CusBaseText>
                </View>
                <View style = {{flex:0.35}}>
                    <TextInput
                        allowFontScaling={false}
                        returnKeyType="done"
                        keyboardType={'number-pad'}
                        onChangeText={(text) => this.setState({inputCode: text})} maxLength={4}
                        placeholder='请输入验证码'
                        style={{width: 100, fontSize: Adaption.Font(16, 14), marginLeft: 20, padding: 0}}
                    />
                </View>
                <View style = {{flex:0.4, alignItems:'flex-end'}}>
                    <LocalVcode
                        type={'number'}
                        maxDeg={5}
                        minDeg={-5}
                        maxFont={16}
                        minFont={14}
                        fontWeightArr={['normal']}
                        fontArr={['normal']}
                        getValue={(vcode) => this.state.veriyCode = vcode}
                    />
                </View>
            </View>
            <View style = {{alignItems:'flex-end', height:50, justifyContent:'center', marginRight:15}}>
                <TouchableOpacity>
                    <CusBaseText style = {{color:COLORS.appColor}}>
                        已有账号?立即登录
                    </CusBaseText>
                </TouchableOpacity>
            </View>
            <View style={{marginLeft: 15, marginRight: 15}}>
                <TouchableOpacity activeOpacity={1} onPress={() => this._registerMethod()} style={{ backgroundColor: COLORS.appColor, height: Adaption.Width(44), borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <CusBaseText style={{ fontSize: Adaption.Font(18, 16), color: 'white' }}>立即注册</CusBaseText>
                </TouchableOpacity>
            </View>
            <LoadingView ref="LoadingView"/>
        </View>
    }
}

const styles = StyleSheet.create({

    //注册输入框的样式
    registerInputStyle:{
        height:50,
        width:SCREEN_WIDTH,
        backgroundColor:'#fff',
        alignItems:'center',
        flexDirection:'row',
        borderBottomWidth:.5,
        borderBottomColor:'#f3f3f3',
    },

    //左边文字的样式
    leftTitleStyle:{
        color:'black',
        fontSize:Adaption.Font(17,14),
        marginLeft:20
    }
})
