/**
 * Created by kl on 2018/8/22.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    Text,
    Dimensions,
    Alert,
} from 'react-native';

import MyImage from "./MeListImg";
import CusBaseText from "../../component/CusBaseText";
let {height, width} = Dimensions.get('window');

export default class Me extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isLogin: '',  //刷新界面用到
            userName: '', //用户名
            headerIcon: '',//用户头像
            totalMoney:  '0.00',//用户总金额
            tkPrice: '0.00', //提款金额
            Level:'',//代理
            is_GuestShiWan:0, //是否为试玩
            sign_event:0,    //是否开启签到
            messageArray:0, //个人消息数组
            gerenfankui:0,
            personListData:[],   //个人中心数组
            isShowShiWan:false,//免费试玩体验公告
            qiandao:0,
            anquanzhongxin:0,
            isHideMoney:false,
        })

        this.freshMoneyClick = false;  //防止快速点击刷新金额按钮

    }
    

     //接收上一个页面传过来的title显示出来
     static navigationOptions = ({ navigation }) => ({
        header: (
            <View style ={{width:SCREEN_WIDTH,backgroundColor:COLORS.appColor,flexDirection:'row', height: SCREEN_HEIGHT == 812 ? 88 : 64,}}>     
            <View style ={{flex:0.8,marginTop:SCREEN_HEIGHT == 812 ? 39 : 15,alignItems:'center', justifyContent:'center',}}>
            <CusBaseText style = {{marginLeft:SCREEN_WIDTH/5,fontWeight:'bold',fontSize:Adaption.Font(20,18), color: 'white',}}>
                            我的账户
            </CusBaseText>
            </View>   

            <TouchableOpacity onPress={()=>{navigation.navigate('ChatSerivce')}} activeOpacity={0.7} style = {{flex:0.2, alignItems:'center', justifyContent:'center', width:60,marginTop:SCREEN_HEIGHT == 812 ? 42 : 18,}}>
                        <CusBaseText style = {{marginLeft:4,color:'#fff', fontSize:Adaption.Font(18,15)}}>
                            客服
                        </CusBaseText>
            </TouchableOpacity>
            </View>
        ),
    });

    
    componentWillMount() {

        this.setState({

            isLogin: global.UserLoginObject.Token,  //Token
            userName: global.UserLoginObject.UserName, //用户名
            headerIcon: global.UserLoginObject.UserHeaderIcon,//用户头像
            totalMoney: global.UserLoginObject.TotalMoney,//用户总金额
            tkPrice: global.UserLoginObject.TKPrice ? global.UserLoginObject.TKPrice : '0.00', //提款金额
            Level:global.UserLoginObject.Level,//代理
            is_GuestShiWan:global.UserLoginObject.is_Guest,
            sign_event:global.UserLoginObject.Sign_event,

        })
    }

    componentDidMount() {

                //接受用户登录成功的通知
                this.subscription = PushNotification.addListener('LoginSuccess', (loginObject)=>{

                    this.setState({
        
                        isLogin: loginObject.Token,  //Token
                        userName: loginObject.UserName, //用户名
                        headerIcon: loginObject.UserHeaderIcon,//用户头像
                        totalMoney: loginObject.TotalMoney,//用户总金额
                        tkPrice: loginObject.TKPrice ? loginObject.TKPrice : '0.00', //提款金额
                        Level:loginObject.Level,//代理
                        is_GuestShiWan:loginObject.is_Guest,
                        sign_event:loginObject.Sign_event,
        
                    })
                    if(loginObject.is_Guest==2) {
                        this.setState({isShowShiWan:true})
                    }

                });

                 //接受用户退出登录的通知
         this.subscription4 = PushNotification.addListener('LoginOutSuccess', ()=>{
            this.refs.Toast && this.refs.Toast.show('退出登录成功!', 1000);
            this.setState({isLogin:'',messageArray:0,gerenfankui:0,qiandao:0,anquanzhongxin:0});
        });

        //接受用户修改头像的通知
        this.subscription3 = PushNotification.addListener('ChangeUserImage', (headerImage) => {
            this.setState({headerIcon:headerImage});
        });

        
    }

    componentWillReceiveProps(nextProps) {}

    componentWillUpdate() {}

    componentDidUpdate() {}

    componentWillUnmount() {

        if (typeof(this.subscription) == 'object'){
            this.subscription && this.subscription.remove();
        }

        if (typeof(this.subscription4) == 'object'){
            this.subscription4 && this.subscription4.remove();
        }

        if (typeof(this.subscription2) == 'object'){
            this.subscription2 && this.subscription2.remove();
        }

        if (typeof(this.subscription3) == 'object'){
            this.subscription3 && this.subscription3.remove();
        }
    }


    render() {
       
    return (
    <View style={styles.container}>
    <View style = {{backgroundColor:'white', height:SCREEN_HEIGHT == 812 ? 134 : 114, width:SCREEN_WIDTH,}}>
          {this._changeHaderView()} 
    </View>

         <View style = {{height:2, width:SCREEN_WIDTH,backgroundColor:'#f3f3f3'}}></View>
         <View style = {{height:70, width:SCREEN_WIDTH}}>
                <View style = {{height:63, backgroundColor:'#fff', flexDirection:'row'}}>
                    {this._allHaderItemView()}
                </View>
                <View style = {{height:7, backgroundColor:'#f3f3f3'}}/>
         </View>
            <FlatList
                data={MyImage.itemList}
                renderItem={item => this._renderItemView(item)}
                horizontal={false} //水平还是垂直
                keyExtractor={this._keyExtractor}
            />
            </View>
        );
    }


    _changeHaderView(){
        console.log(this.state.headerIcon);
        const { navigate } = this.props.navigation;
        console.log('是否登陆',this.state.isLogin);
        return (
            this.state.isLogin == '' ?
            <View style = {{justifyContent:'center', alignItems:'center', flex:0.8, marginTop:15}}>
                    <Image style = {{width:50, height:50,}} source = {MyImage.ic_haderImage}/>
                    <View style = {{flexDirection:'row', marginTop:5}}>
                        <TouchableOpacity activeOpacity={0.8} onPress = {() => this._clickMeBtn(15, navigate)}>
                            <CusBaseText style = {{marginRight:10,fontSize:20,}}>
                                登录
                            </CusBaseText>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this._clickMeBtn(16, navigate)}>
                            <CusBaseText style = {{marginLeft:10,fontSize:20,}}>
                                注册
                            </CusBaseText>
                        </TouchableOpacity>
                    </View>
                </View>  :   
                <View style = {{flex:0.8, marginTop:18,flexDirection:'row',marginLeft:10}}>
                 <TouchableOpacity onPress={() => global.UserLoginObject.is_Guest == 2 ?  Alert.alert('温馨提示', '您的账号是试玩账号,没有权限访问!', [{text: '确定', onPress: () => {}}]) : navigate('MyInfo')} activeOpacity={0.7}>
                <Image style = {{width:80, height:80,borderRadius:40}} 
                 source = {this.state.headerIcon != "" ? { uri: this.state.headerIcon } : MyImage.ic_haderImage}
                 onError={({ nativeEvent: { error } }) => {
                     this.setState({headerIcon:''});
                 }} />
                 </TouchableOpacity>

                <View style = {{flexDirection:'column', marginTop:12,marginLeft:10}}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <CusBaseText style = {{fontSize:18,}}>
                            {`账号：${this.state.userName}`}
                        </CusBaseText>
                    </TouchableOpacity>

               <View style ={{marginTop:12,flexDirection:'row'}}>
                  <CusBaseText style = {{fontSize:18,}}>
                   {`余额：${this.state.isHideMoney == false ? this.state.totalMoney :'******'}`}
                </CusBaseText>
         <TouchableOpacity style ={{marginLeft:12,width:50,height:30}} activeOpacity={0.8} onPress={() => this._isHideMoneyClick()}>
         <CusBaseText style = {{fontSize:18,color:COLORS.appColor}}>
           {this.state.isHideMoney == false ? '隐藏' :'显示'}
            </CusBaseText>
            </TouchableOpacity>
            </View>
            </View>
            </View>  
        );
    }

    _isHideMoneyClick(){
        
        this.setState({
            isHideMoney:!this.state.isHideMoney,
        });   
    }

 
    _keyExtractor = (item,index) => {
        return String(index);
     }

    _allHaderItemView(){

        const { navigate } = this.props.navigation;
        var arrayTitle =[];
        for (let i = 0; i< MyImage.haderItemTitle.length; i++){
           arrayTitle.push(
            <TouchableOpacity  key={i} onPress = {() => this._clickMeBtn(MyImage.haderItemTitle[i].keyId, navigate)} style = {{flex:40, justifyContent:'center', alignItems:'center'}} activeOpacity={0.7}>
                        <Image resizeMode={'stretch'} style = {{width:25, height:25}} source={MyImage.allHaderFruo_Array[i]}/>
                        <CusBaseText style = {{fontSize:16, color:'#7d7d7d', marginTop:5}}>
                        {MyImage.haderItemTitle[i].value.title}
                        </CusBaseText>
        </TouchableOpacity> 
        )
     }
     
        return  arrayTitle;
    }


     //渲染每个Item
     _renderItemView(item) {

        const { navigate } = this.props.navigation;

        if (item.index == 2) {

            return (
                <TouchableOpacity onPress = {() => {this._clickMeBtn(item.item.key, navigate)}} activeOpacity={1} style = {{borderRightWidth:1, borderBottomWidth:1, borderColor:'#f3f3f3', width:SCREEN_WIDTH, height:42, backgroundColor:'#fff'}}>
                    <View style = {{flexDirection:'row'}}>
                    <Image style = {{marginLeft:5,width:23, height:23,marginTop:10}} source={this.state.Level == 0 ? MyImage.ic_apply_agency : MyImage.allMelist_ballArray[item.index]}/>
                    <CusBaseText style = {{marginLeft:5,fontSize:16, color:'#414141', marginTop:12}}> {this.state.Level == 0 ? '代理申请' : '代理中心' }</CusBaseText>   
                    <Image style = {{marginLeft:SCREEN_WIDTH/2+50,width:15, height:15,marginTop:15}} source={MyImage.ic_Black_arrow}/>
                   </View>  
                </TouchableOpacity>
                );

        } else {
            return (
                <TouchableOpacity onPress = {() => {this._clickMeBtn(item.item.key, navigate)}} activeOpacity={1} style = {{borderRightWidth:1, borderBottomWidth:1, borderColor:'#f3f3f3', width:SCREEN_WIDTH, height:42, backgroundColor:'#fff'}}>
                    <View style = {{flexDirection:'row'}}>
                    <Image style = {{marginLeft:5,width:23, height:23,marginTop:10}} source={MyImage.allMelist_ballArray[item.index]}/>
                    <CusBaseText style = {{marginLeft:5,fontSize:16, color:'#414141', marginTop:12}}> {item.item.value.title} </CusBaseText>   
                    <Image style = {{marginLeft:SCREEN_WIDTH/2+50,width:15, height:15,marginTop:15}} source={MyImage.ic_Black_arrow}/>
                   </View>  
                </TouchableOpacity>
                );
        }
        
    }


    _clickMeBtn(item, navigate) {

            if (this.state.isLogin != '' && this.state.is_GuestShiWan == 2){

                if (item == 14) { //投注记录
                
                    navigate('TouZhuRecord',{wanfa: 1});

                    } else if  (item == 1) { //中奖记录
                        navigate('MeWinRecord'); //中奖记录
                    } else if (item == 10){

                        navigate('MoreSeting');  //Alert.alert('更多设置');

                    } else{

                        Alert.alert(
                            '温馨提示',
                            '您的账号是试玩账号,没有权限访问!',
                            [
                                {text: '确定', onPress: () => {}},
                            ]
                        )

                    }
                
            } else {

                if (this.state.isLogin != '' ){

                 if (item == 0){

                    navigate('MyInfo',{switchSegment:true}); //个人信息

                 } else if (item == 1){

                     navigate('MeWinRecord'); //中奖记录

                 }else if (item == 2){

                     //代理中心
                     if (this.state.Level == 0) {
                        navigate('ApplicationAgentDelege')
                    } else {
                        navigate('Theagency', {title: '代理中心'})
                    }
                        
                    //Alert.alert('代理中心');

                 } else if (item == 3){ //

                     if (global.UserLoginObject.Card_num){    
                        navigate('CashTrasaAcount');

                     }else {

                    navigate('BindBankCard',{callback: () => {},BindBankCardPreviousAction:'CashTrasaCenter'});
                   }
                   
                 }else if (item == 4){

                    Alert.alert('时时返水');

                 } else if (item == 5){  //充值记录
                    navigate('RechargeRecord', {title: '充值记录'}) 
            
                 }else if (item == 6){

                    navigate('GetBuyRecord');  //提款记录

                 } else if (item == 7){

                    navigate('SafetyCenter',{title: '安全中心',}); //Alert.alert('安全中心');
                 }else if (item == 8){

                    navigate('PersonalMessage'); // Alert.alert('我的消息');
                 } else if (item == 9){

                    navigate('FeedbackList'); //Alert.alert('意见反馈');
                    
                 }else if (item == 10){

                    navigate('MoreSeting');  //Alert.alert('更多设置'); 

                 } else if (item == 11){

                    navigate('RechargeCenter') // 我要充值

                 }else if (item == 12){ //我要提款

                    if (global.UserLoginObject.Card_num){
                        navigate('DrawalInfo');
                    }
                    else {
                        navigate('BindBankCard',{callback: () => {},BindBankCardPreviousAction:'DrawalCenter'});
                    }
                    
                 } else if (item == 13){
                     navigate('AccountDetails'); //交易记录
                    
                 }else if (item == 14){

                    navigate('TouZhuRecord',{wanfa: 1}); //投注记录
                 }
                 
                } else {

                    if (item == 15){  //登陆
                        navigate('Login', {title:'用户登录'});
                    } else if (item == 16){
                        navigate('Register', {title:'用户注册'});
                    } else if (item == 10){
    
                        navigate('MoreSeting');  //Alert.alert('更多设置'); 

                    } else {

                        Alert.alert(
                            '提示',
                            '您还未登录,请先去登录',
                            [
                                {text: '确定', onPress: () => {navigate('Login',{title:'登录',})}},
                                {text: '取消', onPress: () => {}},
                            ]
                        )
                    }

                }

           }       
     }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

});