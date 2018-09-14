import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";

import Moment from 'moment';


export default class PersonMessageDetial extends Component {
  static navigationOptions = ({ navigation }) => ({

      header: (
          <CustomNavBar
              centerText = {"消息详情"}
              leftClick={() => {navigation.goBack()}}
          />
      ),
  });
  componentDidMount() {
    if (this.props.navigation.state.params.personArray.item.value.status==0) {
        this._fetchPersonalMessagesData();
    }
  }
 _fetchPersonalMessagesData(){

       //请求参数
       let params = new FormData();
       params.append("ac", "readUserMessage");
       params.append("uid", global.UserLoginObject.Uid);
       params.append("token", global.UserLoginObject.Token);
       params.append("sessionkey", global.UserLoginObject.session_key);
       params.append("id",this.props.navigation.state.params.personArray.item.value.guid);

       var promise = GlobalBaseNetwork.sendNetworkRequest(params);

       promise
         .then(response => {
           if (response.msg==0) {
             PushNotification.emit('BiaoJiMessageSuccess');
           }else {

           }
         })
         .catch(err => { });
 }

  render() {
    return (
      <View style = {styles.container}>
        <CusBaseText  style = {{fontSize:16,color:'#000',textAlign:'center'}}>
          {this.props.navigation.state.params.personArray.item.value.title}
        </CusBaseText>
        <CusBaseText  style = {{fontSize:13,color:'#666666',textAlign:'center',marginTop:5}}>
            {Moment.unix(this.props.navigation.state.params.personArray.item.value.sendtime).format('YYYY-MM-DD HH:mm:ss')}
        </CusBaseText>
        <CusBaseText  style = {{fontSize:15,color:'#222222',marginTop:5}}>
          {this.props.navigation.state.params.personArray.item.value.content}
        </CusBaseText>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding:10
  },

});
