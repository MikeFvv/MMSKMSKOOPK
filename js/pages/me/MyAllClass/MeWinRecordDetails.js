import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    StatusBar,
    TouchableOpacity,
    Alert,
} from 'react-native';
export default class MeWinRecordDetails extends Component {

    //接收上一个页面传过来的titl  e显示出来
    static navigationOptions = ({ navigation }) => ({
        header: (

            <CustomNavBar
                leftClick={() =>  navigation.goBack() }
                centerText = {"中奖详情"}
             />
        ),
    });

    constructor(props) {
        super(props);
        this.state = ({
              detialArray:this.props.navigation.state.params.detialArray, //详情数据
          });
    
    }
    
    render() {
        
        return (
           <View style={{flex:1,flexDirection:'column'}}>

               <View style={{flexDirection:'row',height:60}}>
                   <View style={{flex:1,justifyContent:'center',alignItems:'center',height:60}}>
                       <Image style={{width:50,height:50,marginTop:28}} source={{uri:this.state.detialArray.value.icon}}/>
                   </View>
                   <View style={{flex:3,flexDirection:'column',paddingLeft:10,marginTop:5}}>
                       <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center',}}>
                           <CusBaseText style={{flex:2,fontSize:17,color:'#606053'}}>{this.state.detialArray.value.game_name}</CusBaseText>
                           <CusBaseText style={{flex:3,textAlign:'center'}}>{'第'+this.state.detialArray.value.qishu+'期'}</CusBaseText>
                       </View>
                       <View style={{marginTop:5,flexDirection:'row'}}>
                           <CusBaseText style={{flex:1}}>{'开奖号码:'}</CusBaseText>
                           <CusBaseText style={{color:'#D6958C',flex:2,marginLeft:-25}}>{this.state.detialArray.value.kj_balls}</CusBaseText>
                       </View>
                       <View style={{marginTop:5}}>
                           <CusBaseText style={{color:'#7E9980',fontSize:17}}>{'已中奖,赢得'+this.state.detialArray.value.win+'元'}</CusBaseText>
                       </View>
                   </View>

               </View>

               <View style={{height:0.5,backgroundColor:'black',marginTop:35}}>

               </View>

               <View style={{height:25,paddingLeft:20,alignItems:'center', justifyContent:'center',marginTop:5}}>
                   <CusBaseText style={{fontSize:17,color:'#606053'}}>{'订单内容'}</CusBaseText>
               </View>


               <View style={{flexDirection:'column',height:200}}>
                   <View style={styles.conview}>
                            <CusBaseText style={styles.contleft}>{'订单号'}</CusBaseText>
                            <CusBaseText style={styles.contright}>{this.state.detialArray.value.zhudan}</CusBaseText>
                   </View>

                   <View style={styles.conview}>
                       <CusBaseText style={styles.contleft}>{'投注金额'}</CusBaseText>
                       <CusBaseText style={styles.contright}>{this.state.detialArray.value.price}</CusBaseText>
                   </View>
                   <View style={styles.conview}>
                       <CusBaseText style={styles.contleft}>{'投注注数'}</CusBaseText>
                       <CusBaseText style={styles.contright}>{this.state.detialArray.value.zhushu}</CusBaseText>
                   </View>
                   <View style={styles.conview}>
                       <CusBaseText style={styles.contleft}>{'投注返点'}</CusBaseText>
                       <CusBaseText style={styles.contright}>{this.state.detialArray.value.fandian}</CusBaseText>
                   </View>
                   <View style={styles.conview}>
                       <CusBaseText style={styles.contleft}>{'投注赔率'}</CusBaseText>
                       <CusBaseText style={styles.contright}>{'1:'+this.state.detialArray.value.peilv}</CusBaseText>
                   </View>
                   <View style={styles.conview}>
                       <CusBaseText style={styles.contleft}>{'投注时间'}</CusBaseText>
                       <CusBaseText style={styles.contright}>{this.state.detialArray.value.tz_time}</CusBaseText>
                   </View>
                   <View style={styles.conview}>
                       <CusBaseText style={styles.contleft}>{'是否中奖'}</CusBaseText>
                       <CusBaseText style={styles.contright}>{'已中奖'}</CusBaseText>
                   </View>
                   <View style={styles.conview}>
                       <CusBaseText style={styles.contleft}>{'开奖时间'}</CusBaseText>
                       <CusBaseText style={styles.contright}>{this.state.detialArray.value.js_time}</CusBaseText>
                   </View>
                   <View style={styles.conview}>
                       <CusBaseText style={styles.contleft}>{'玩法名称'}</CusBaseText>
                       <CusBaseText style={styles.contright}>{this.state.detialArray.value.wanfa}</CusBaseText>
                   </View>
               </View>
                   <View style={{height:25,height:30,paddingLeft:20,marginTop:6}}>
                       <CusBaseText style={{fontSize:17,color:'#606053'}}>{'投注号码'}</CusBaseText>
                   </View>

                   <View style={{flexDirection:'row',height:18,marginTop:3}}>
                       <CusBaseText style={{paddingLeft:20}}>{this.state.detialArray.value.xiangqing}</CusBaseText>
                   </View>

               <TouchableOpacity onPress={this.anotherNote} style = {{marginLeft:30,marginTop:20,alignItems:'center', justifyContent:'center',width:SCREEN_WIDTH-60, borderRadius:5,height:45,backgroundColor:'#F27F52',}}>
                       <CusBaseText style={{color:'white'  }}>{'再来一注'}</CusBaseText>
               </TouchableOpacity>

             </View>
        );
    }

    anotherNote(){
        Alert.alert("再来一注")
    }

}

const styles = StyleSheet.create({

    contleft:{
        flex:1,
        textAlign: 'right',
        paddingLeft:25,
        textAlignVertical: 'center',
        color:'#7D7E80'
    },

    contright:{
        flex:3,
        textAlign: 'left',
        paddingLeft:10,
        textAlignVertical: 'center',
        color:'#4B4E4F'
    },

    conview:{
        flex:1,
        flexDirection:'row',
        height:15,
        marginTop:3
    }

})
