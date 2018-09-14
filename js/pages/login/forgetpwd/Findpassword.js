import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import CusBaseText from "../../../component/CusBaseText";

export default class Findpassword extends Component {

    constructor(props){
        super(props);

        this.state = ({
             findList: this.props.navigation.state.params.list,  //上一个界面传值
        })
    }


    _createListView(navigate,listArr){

    //1=密保问题,2=邮箱,3=手机号码,4=提款密码

        var ViewArr = [];  //空的视图数组

        for (var i = 0; i < listArr.length; i++)
        {
            let listStr = listArr[i];
            var contentStr = '';

            if (listStr == '1')
            {
                contentStr = '通过密保问题';
            }
            else if (listStr == '2')
            {
                contentStr = '通过密保邮箱';
            }
            else if (listStr == '3')
            {
                contentStr = '通过手机号码';
            }
            else if (listStr == '4')
            {
                contentStr = '通过交易密码';
            }

            //把视图加入数组里，然后返回数组
             ViewArr.push(<TouchableOpacity  key={i}  onPress={() => this.onClickItem(navigate,listStr)} style = {{marginTop:20, backgroundColor:'#ffffff', height:40, flexDirection:'row', alignItems:'center',}}>
                 <View style = {{flex:0.9}}><CusBaseText style = {{fontSize:Adaption.Font(18,16), color:'black', marginLeft:20}}>{contentStr}</CusBaseText></View>
                 <View style = {{flex:0.1}}><Image style = {{width:15, height:15}} source = {require('../img/ic_loginArrow.png')} /></View>
             </TouchableOpacity>)
        }

        return ViewArr;

    }

    onClickItem(navigate,listStr){

        //1=密保问题:FindpsEncrypt,2=邮箱,3=手机号码,4=提款密码:FindpsTrans

        if (listStr == '1')
        {
            //contentStr = '通过密保问题';user:this.state.user,
            navigate('FindpsEncrypt', {title:'密码找回',username:this.props.navigation.state.params.username})

        }
        else if (listStr == '2')
        {
            //contentStr = '通过密保邮箱';
            navigate('FindpsEmail', {title:'密码找回',username:this.props.navigation.state.params.username})
        }
        else if (listStr == '3')
        {
            //contentStr = '通过手机号码';
            navigate('FindpsPhoneNum', {title:'密码找回',username:this.props.navigation.state.params.username})
        }
        else if (listStr == '4')
        {
            //contentStr = '通过交易密码';
            navigate('FindpsTrans', {title:'密码找回',username:this.props.navigation.state.params.username})
        }

    }

    //接收上一个页面传过来的title显示出来
    static navigationOptions = ({ navigation }) => ({

        header: (
            <CustomNavBar
                centerText = {navigation.state.params.title}
                leftClick={() =>  navigation.goBack() }
            />
        ),

    });


    render(){
        const { navigate } = this.props.navigation;

        return (
           <View style = {styles.container}>
               {this._createListView(navigate,this.state.findList)}
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f3f3f3',
    },

})
