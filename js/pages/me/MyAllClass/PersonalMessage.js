import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Moment from 'moment';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'


export default class PersonalMessage extends Component {



  static navigationOptions = ({navigation, screenProps}) => ({

      header: (
          <CustomNavBar
          centerText = {"个人消息"}
          leftClick={() => {navigation.goBack()} }
          />
      ),

  });

  constructor(props) {
    super(props);
    this.state = {
      showPageIndex:0,
      error: false,
      errorInfo: "",
      MessageArray: [], //个人消息数据
      isShowTime:false,
      yijianDataArray:[],
    };
    { (this).keyExtractor = this.keyExtractor.bind(this) }
    this.moreTime = 0;//页码
    this.jiaZai = 0;
    this.messageType = 0;//消息状态类别,0=全部,1=未读,2=已读
    this.cellHeight = 90;
    this.yijianPageid = 0;
    this.lasttime = "0";//0=当天, 1=最近一周, 2=最近一个月, 3=最近三个月, 默认为当天
    this.showRedEnvelopeArray = [{ key: 0, value: '当天' }, { key: 1, value: '最近一周' }, { key: 2, value: '最近一月' }, { key: 3, value: '最近三月' }, { key: 4, value: '取消' }]
  }

  componentDidMount() {
  
  this.onHeaderRefresh();
    this.subscription = PushNotification.addListener('BiaoJiMessageSuccess', () => {
      this.onHeaderRefresh();
      this._fetchPersonalYiDuMessageData();
    });
  }

   //头部刷新
   onHeaderRefresh = () => {

    this.setState({ refreshState: RefreshState.HeaderRefreshing })
    this.moreTime = 0;
    this.state.MessageArray =[];
    this._fetchPersonalMessageData(true);

  }


  //移除通知
  componentWillUnmount() {
    this.subscription && this.subscription.remove();
  }

   //获取个人消息数据
   _fetchPersonalYiDuMessageData() {

    if (global.UserLoginObject.Uid != '' && global.UserLoginObject.Token != '') {
          //请求参数
  let params = new FormData();
  params.append("ac", "flushPrice");
  params.append("uid", global.UserLoginObject.Uid);
  params.append("token", global.UserLoginObject.Token);
  params.append("sessionkey", global.UserLoginObject.session_key);

      var promise = GlobalBaseNetwork.sendNetworkRequest(params);

      promise
          .then(response => {
              if (response.msg == 0) {
                  let datalist = response.data;
                  if (response.data == null || response.data.length == 0) {
                      PersonMessageArray=0;
                      Hongbaolihe = 0;
                      Gerenfankui = 0;
                      Fuliqiandao = 0;

                  } else {
                     if((1 & response.data.user_flag)>0){
                      Hongbaolihe = 1;
                     }else {
                      Hongbaolihe = 0;   
                     }
                     if((2 & response.data.user_flag)>0){
                      PersonMessageArray = 1;
                     }else {
                      PersonMessageArray = 0;
                     }
                     if((4 & response.data.user_flag)>0){
                      Gerenfankui = 1;
                     }else {
                      Gerenfankui = 0;
                     }
                     if((8 & response.data.user_flag)>0){
                      Fuliqiandao = 1;
                     }else {
                      Fuliqiandao = 0;
                     }
                  }

              } else {

              }

          })
          .catch(err => {
          });
    }
}
  //获取个人消息数据
  _fetchPersonalMessageData(isReload) {

        //请求参数
        let params = new FormData();
        params.append("ac", "getUserMessage");
        params.append("uid", global.UserLoginObject.Uid);
        params.append("token", global.UserLoginObject.Token);
        params.append("type", this.messageType);
        params.append("sessionkey", global.UserLoginObject.session_key);
        params.append("limit", "20");
        params.append("pageid", this.moreTime);

        var promise = GlobalBaseNetwork.sendNetworkRequest(params);

        promise
          .then(response => {
            if (response.msg==0) {
              this.jiaZai = 1;
              let datalist = response.data;

              if (this.moreTime==0) {
                this.setState({
                  refreshState:RefreshState.Idle,
                })
              }else {
                this.setState({
                  refreshState: response.data.length == 0 ? RefreshState.NoMoreData : RefreshState.Idle,
                })
              }

              let dataBlog = [];
              let i = 0;
              datalist.map(dict => {
                dataBlog.push({ key: i, value: dict });
                i++;
              });
              let dataList = isReload ? dataBlog : [...this.state.dataList, ...dataBlog]
              for (let i = 0; i < dataList.length; i++) {
                dataList[i].id = i
              }
              this.setState({
                MessageArray: dataList,
              })
              datalist = null;
              dataBlog = null;

            }else {
              if (this.moreTime==0) {
                this.setState({
                  refreshState:RefreshState.Failure,
                })
              }else {
                this.setState({
                  refreshState: response.data == null ? RefreshState.NoMoreData : RefreshState.Idle,
                })
              }
            NewWorkAlert(response.param)
            }
          })
           .catch(err => { });
  }


  //动态改变cell的高度
  _onTouchStart(e) {
    let descHeight = e.nativeEvent.layout.height;
    totalHeight = descHeight + 60 > 80 ? descHeight + 80 : 100;
    this.cellHeight = totalHeight;
  }

  _renderMessageItemView(item) {
    const { navigate } = this.props.navigation;
    let messImage = '';
    if (item.item.value.status == 1) {
      messImage = require('./img/ic_yidu.png');
    } else {
      messImage = require('./img/ic_weidu.png');
    }
    return (
      <TouchableOpacity ref={(h) => this._refMessageView = h} style={styles.cellStyle}
        activeOpacity={1} onPress={() => navigate('PersonMessageDetial', { personArray: item })}>
        <View style={{ flex: 1, flexDirection: 'column', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
          <CusBaseText style={{ color: '#222222', fontSize: 15, fontWeight: '600' }} >
            {item.item.value.title}
          </CusBaseText>
          <CusBaseText style={styles.itemTextStyke} onLayout={(e) => this._onTouchStart(e)}>
            {item.item.value.content}
          </CusBaseText>
          <CusBaseText style={{ color: '#999999', fontSize: 13, marginTop: 5 }}>
            {Moment.unix(item.item.value.sendtime).format('YYYY-MM-DD HH:mm:ss')}
          </CusBaseText>
        </View>
        <Image style={{ width: 30, height: 30 }} source={messImage}></Image>
      </TouchableOpacity>
    );

  }
  //无数据页面
  listEmptyComponent() {
    if (this.jiaZai == 0) {
      return (
        <View style={{ width: width, height: height - 180, justifyContent: 'center', alignItems: 'center' }}>
        <CusBaseText style={{ textAlign: 'center', marginTop: 5 }}>数据加载中...</CusBaseText>
        </View>
      );
      }else {
    return (
      <CusBaseText style={{ textAlign: 'center', marginTop: height / 2 - 100 }}>暂无数据</CusBaseText>
    );
  }
  }

  //请求错误
  renderErrorView(error) {
    return (
      <View style={styles.container}>
        <CusBaseText>Fail:{error}</CusBaseText>
      </View>
    );
  }

  keyExtractor = (item, index) => {
    return item.id
  }
  //尾部刷新
  onFooterRefresh = () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing })
    this.moreTime++;
    this._fetchPersonalMessageData(false);
  }


  //消息状态类别,0=全部,1=未读,2=已读
  _onclickMessage(obj) {
    if (obj.i == 0) {
      this.messageType = 0;
      this.onHeaderRefresh();

    } else if (obj.i == 1) {
      this.messageType = 2;
      this.onHeaderRefresh();
    } else {
      this.messageType = 1;
      this.onHeaderRefresh();
    }

  }

 
  render() {
 
      return (
        <ScrollableTabView
          locked={true}
          automaticallyAdjustContentInsets={false}
          alwaysBounceHorizontal={false}
          renderTabBar={() => <DefaultTabBar tabStyle={{ paddingBottom: 0 }} style={{ height: 35, backgroundColor: 'white' }} />}
          onChangeTab={(obj) => this._onclickMessage(obj)}
          tabBarUnderlineStyle={styles.lineStyle}
          tabBarActiveTextColor={COLORS.appColor}>
  
          <RefreshListView
            automaticallyAdjustContentInsets={false}
            alwaysBounceHorizontal={false}
            data={this.state.MessageArray}
            renderItem={item => this._renderMessageItemView(item)}
            keyExtractor={this.keyExtractor}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            ListEmptyComponent={this.listEmptyComponent(this)} // 没有数据时显示的界面
            onFooterRefresh={this.onFooterRefresh}
            tabLabel='全部'
          />
  
          <RefreshListView
            automaticallyAdjustContentInsets={false}
            alwaysBounceHorizontal={false}
            data={this.state.MessageArray}
            renderItem={item => this._renderMessageItemView(item)}
            keyExtractor={this.keyExtractor}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            ListEmptyComponent={this.listEmptyComponent(this)} // 没有数据时显示的界面
            onFooterRefresh={this.onFooterRefresh}
            tabLabel='已读'
          />
          <RefreshListView
            automaticallyAdjustContentInsets={false}
            alwaysBounceHorizontal={false}
            data={this.state.MessageArray}
            renderItem={item => this._renderMessageItemView(item)}
            keyExtractor={this.keyExtractor}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            ListEmptyComponent={this.listEmptyComponent(this)} // 没有数据时显示的界面
            onFooterRefresh={this.onFooterRefresh}
            tabLabel='未读'
          />
  
        </ScrollableTabView>
      );
    }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(222,222,222)'
  },
  cellStyle: {
    width: width - 20,
    marginLeft: 10,
    height: this.cellHeight,
    marginVertical: 5, // cell垂直之间的间隔
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    flexDirection: 'row',
  },

  itemTextStyke: {
    fontSize: 13,
    color: '#666666',
    marginTop: 5
  },
  lineStyle: {
    width: width / 3,
    height: 2,
    backgroundColor: COLORS.appColor,
  },
  yijianCell:{
    width: width - 30,
    
    height: 90,
    marginVertical: 8, // cell垂直之间的间隔
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  yijianZhanKaiCell:{
    width: width - 30,
    height: 175,
    marginVertical: 8, // cell垂直之间的间隔
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cdcdcd',
 
  }


});
