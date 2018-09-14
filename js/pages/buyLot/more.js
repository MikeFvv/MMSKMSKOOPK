'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    NetInfo,
    AsyncStorage,
} from 'react-native';




import ScrollableTabView, { DefaultTabBar,ScrollableTabBar } from 'react-native-scrollable-tab-view';
import LotBlockView from './LotBlockView';
import FaceBookTabBar from './CustomTabBar';
import newTabBar from './newTabBar';

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

const tabTitles = ['食物百科', '逛吃', '我的']

const tabIcons = [
    require('./img/ic_buy_collection_frist.png'),
    require('./img/ic_buy_collection_frist.png'),
    require('./img/ic_buy_collection_frist.png')
]
const tabSelectedIcon = [
    require('./img/ic_buy_collection_frist.png'),
    require('./img/ic_buy_collection_frist.png'),
    require('./img/ic_buy_collection_frist.png')
]


class BuyLot extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({

        header: (
            <CustomNavBar
                centerText = {"全部彩种"}
                leftClick={() =>  {navigation.state.params.backAction ? navigation.state.params.backAction() : null; navigation.goBack()}}
            />
        ),
    });

    constructor(props) {
        super(props);

        this.state = {
            showStyle: 'block',
            isLoading: false,
            tabNames: ['Tab1', 'Tab2', 'Tab3', 'Tab4'],
            tabIconNames: ['ios-paper', 'ios-albums', 'ios-paper-plane', 'ios-person-add'],
        };

        this.allList = [];
        this.shishicaiList = [];
        this.kuaisanList = [];
        this.pkshiList = [];
        this.shiyixuanwuList = [];
        this.liuhecaiList = [];
        this.fucaiList = [];
        this.erbaList = [];
        this.sportList= [];
        this.otherList= [];

        this.headArray = ['Tab1', 'Tab2', 'Tab3', 'Tab4'];
    }

    componentDidMount() {

        // 检测网络是否连接
        NetInfo.isConnected.fetch().then(isConnected => {
            // this.setState({ isConnected });
        });


        //监听网络链接变化事件
        NetInfo.isConnected.addEventListener('connectionChange', this._handleIsConnectedChange);

        let BuyLotKey = 'BuyLotCaiZhongObjcet';
        AsyncStorage.getItem(BuyLotKey, (error, result) => {

            if (!error) {
                if (result !== '' && result !== null) {

                    let BuyLotModel = JSON.parse(result);
                    this.allList = [];
                    this.shishicaiList = [];
                    this.kuaisanList = [];
                    this.pkshiList = [];
                    this.shiyixuanwuList = [];
                    this.liuhecaiList = [];
                    this.fucaiList = [];
                    this.erbaList = [];
                    this.sportList= [];
                    this.otherList= [];

                    let i = 0;
                    if (BuyLotModel.BuyLotCaiZhongArray && BuyLotModel.BuyLotCaiZhongArray.length > 0 )
                    {
                        BuyLotModel.BuyLotCaiZhongArray.map((item) => {

                                this.allList.push(item);

                                if (item.js_tag === '3d')
                                {
                                    this.fucaiList.push(item);
                                }
                                else if (item.js_tag === 'ssc')
                                {
                                    this.shishicaiList.push(item);
                                }
                                else if (item.js_tag === 'k3')
                                {
                                    this.kuaisanList.push(item);
                                }

                                else if(item.js_tag === 'pk10')
                                {
                                    this.pkshiList.push(item);
                                }
                                else if(item.js_tag === 'lhc')
                                {
                                    this.liuhecaiList.push(item);
                                }
                                else if(item.js_tag === 'pcdd')
                                {
                                    this.erbaList.push(item);
                                }
                                else if(item.js_tag === '11x5')
                                {
                                    this.shiyixuanwuList.push(item)
                                }
                                else if(item.js_tag === 'sport_key')
                                {
                                    this.sportList.push(item)
                                }
                                else
                                {
                                    this.otherList.push(item)
                                }
                            i++;
                        })

                    }

                    this.setState({
                        isLoading: false,
                    });


                }else {
                    this._fetchData();
                }

            }else {
                this._fetchData();
            }
        });

        this.props.navigation.setParams({
            navigatePress: this._switchShowStyle,
            buyLot_showImg: 'block',
            navLeftPress: this._leftClick,
        });
        setTimeout(() => {
            this._fetchData();
        }, 3000);

    }

    _leftClick = () => {
        this.props.navigation.goBack();
    }

    // 网络监听方法
    _handleIsConnectedChange = (isConnected) => {
        // 网络有变化时请求一遍数据
        if (isConnected) {

            this._fetchData();

        } else {

            let BuyLotKey = 'BuyLotCaiZhongObjcet';
            AsyncStorage.getItem(BuyLotKey, (error, result) => {
                if (!error) {

                    if (result !== '' && result !== null) {
                        let BuyLotModel = JSON.parse(result);

                        this.allList = [];
                        this.shishicaiList = [];
                        this.kuaisanList = [];
                        this.pkshiList = [];
                        this.shiyixuanwuList = [];
                        this.liuhecaiList = [];
                        this.fucaiList = [];
                        this.erbaList = [];
                        this.sportList= [];
                        this.otherList= [];

                        let i = 0;

                        if(BuyLotModel.BuyLotCaiZhongArray && BuyLotModel.BuyLotCaiZhongArray.length > 0)
                        {
                            BuyLotModel.BuyLotCaiZhongArray.map((item) => {

                                    this.allList.push(item);

                                    if (item.js_tag === '3d')
                                    {
                                        this.fucaiList.push(item);
                                    }
                                    else if (item.js_tag === 'ssc')
                                    {
                                        this.shishicaiList.push(item);
                                    }
                                    else if (item.js_tag === 'k3')
                                    {
                                        this.kuaisanList.push(item);
                                    }

                                    else if(item.js_tag === 'pk10')
                                    {
                                        this.pkshiList.push(item);
                                    }
                                    else if(item.js_tag === 'lhc')
                                    {
                                        this.liuhecaiList.push(item);
                                    }
                                    else if(item.js_tag === 'pcdd')
                                    {
                                        this.erbaList.push(item);
                                    }
                                    else if(item.js_tag === '11x5')
                                    {
                                        this.shiyixuanwuList.push(item)
                                    }
                                    else if(item.js_tag === 'sport_key')
                                    {
                                        // this.sportList.push(item)
                                    }
                                    else
                                    {
                                        this.otherList.push(item)
                                    }
                                i++;
                            })

                        }

                        this.setState({
                            isLoading: false,
                        });

                    }
                }
            });
        }
    }


    _reloadData = () => {
        if (this.allList.length === 0) {
            this._fetchData();
        }
    }

    // 箭头函数自动绑定this
    _switchShowStyle = () => {

        if (this.state.showStyle == 'block') {

            this.setState({
                showStyle: 'list',
            });

            this.props.navigation.setParams({
                buyLot_showImg: 'list',
            })

        } else {

            this.setState({
                showStyle: 'block',
            });


            this.props.navigation.setParams({
                buyLot_showImg: 'block',
            })

        }
    }

    //请求网络数据
    _fetchData = () => {

        if (this.state.isLoading === true) {
            return;
        }

        this.setState({
            isLoading: true,
        });

        {
            let params = new FormData();
            params.append("ac", "getGameListAtin");
            // params.append("enable", "0");

            var promise = GlobalBaseNetwork.sendNetworkRequest(params);
            promise
                .then((responseData) => {
                    //处理数据
                    if (responseData.msg != 0) {
                        if (responseData.param) {
                            Alert.alert(responseData.param);
                        }
                        return;
                    }

                    // this.allList = global.AllPlayGameList;
                    this.allList = [];
                    this.shishicaiList = [];
                    this.kuaisanList = [];
                    this.pkshiList = [];
                    this.shiyixuanwuList = [];
                    this.liuhecaiList = [];
                    this.fucaiList = [];
                    this.erbaList = [];
                     this.sportList= [];
                    this.otherList= [];
                    let i = 0;
                    if(responseData.data && responseData.data.length > 0)
                    {
                        responseData.data.map((item) => {
                                this.allList.push(item);

                                if (item.js_tag === '3d')
                                {
                                    this.fucaiList.push(item);
                                }
                                else if (item.js_tag === 'ssc')
                                {
                                    this.shishicaiList.push(item);
                                }
                                else if (item.js_tag === 'k3')
                                {
                                    this.kuaisanList.push(item);
                                }

                                else if(item.js_tag === 'pk10')
                                {
                                    this.pkshiList.push(item);
                                }
                                else if(item.js_tag === 'lhc')
                                {
                                    this.liuhecaiList.push(item);
                                }
                                else if(item.js_tag === 'pcdd')
                                {
                                    this.erbaList.push(item);
                                }
                                else if(item.js_tag === '11x5')
                                {
                                    this.shiyixuanwuList.push(item)
                                }
                                else  if(item.js_tag === 'sport_key')
                                {
                                    this.sportList.push(item)
                                }
                                else
                                {
                                    this.otherList.push(item)
                                }
                            i++;
                        })

                        //加一个足彩位置
                        // this.allList.push({'99':'11'});

                    }


                    this.setState({
                        isLoading: false,
                    });

                    let BuyLotObjcet = {
                        BuyLotCaiZhongArray: this.allList,
                    }

                    let BuyLotCaizhongValue = JSON.stringify(BuyLotObjcet);

                    let key = 'BuyLotCaiZhongObjcet';
                    UserDefalts.setItem(key, BuyLotCaizhongValue, (error) => {
                    });

                })

                .catch((err) => {

                    this.setState({
                        isLoading: false,
                    });

                })
        }


    }

    renderLoadingView = () => {

        return (
            <View style={styles.container}>

              <Image
                  source =  {require('./img/ic_buy_collection_frist.png')}
                  style={{resizeMode:'stretch',width:screenWidth,height:screenHeight  - 49 }}
              />

              <ActivityIndicator
                  animating={true}
                  style={{ height: 80,position:'absolute',left:screenWidth/2 - 18, top:screenHeight / 2 - 80}}
                  color='#d3d3d3'
                  size="large"

              />

            </View>
        )
    }

    //加载失败view
    renderErrorView = (errorInfo) => {
        return (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>
                  {errorInfo}
              </Text>
            </View>
        );
    }

    render()
    {

        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;

        if (this.state.isLoading && this.allList.length === 0)
        {
            //加载等待的view
            return this.renderLoadingView();
        }
        return (

            <ScrollableTabView
                renderTabBar={() =>  <FaceBookTabBar/>}
                tabBarPosition='top'>


                <View style={styles.content} tabLabel='key221'>
                    <Text>内容1</Text>
                </View>

                <View style={styles.content} tabLabel='key32'>
                    <Text>内容2</Text>
                </View>

                <View style={styles.content} tabLabel='key333'>
                    <Text>内容3</Text>
                </View>

                <View style={styles.content} tabLabel='key44'>
                    <Text>内容4</Text>
                </View>
                <View style={styles.content} tabLabel='key44'>
                    <Text>内容4</Text>
                </View>
                <View style={styles.content} tabLabel='key44'>
                    <Text>内容4</Text>
                </View>
                <View style={styles.content} tabLabel='key44'>
                    <Text>内容4</Text>
                </View>
                <View style={styles.content} tabLabel='key44'>
                    <Text>内容4</Text>
                </View>
                {/*this._views();*/}
            </ScrollableTabView>

        );
    }



    //创建子页面
    _views() {

        let viewArr = []

        if (this.state.showStyle == 'block')
        {

            viewArr.push(<LotBlockView
                key={0}
                type = {0}
                dataSource={this.allList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='全部彩种'
                style={styles.page1}
                backAction={this.props.backAction}

            />);
            viewArr.push(<LotBlockView
                key={1}
                type = {1}

                dataSource={this.shishicaiList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='时时彩'
                style={styles.page2}
                backAction={this.props.backAction}

            />);
            viewArr.push(<LotBlockView
                key={2}
                type = {2}
                dataSource={this.kuaisanList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='快三'
                style={styles.page3}
                backAction={this.props.backAction}

            />);
            viewArr.push(<LotBlockView
                key={3}
                type = {3}

                dataSource={this.sportList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='体育彩'
                style={styles.page3}
                backAction={this.props.backAction}

            />);
            viewArr.push(<LotBlockView
                key={4}
                type = {4}

                dataSource={this.pkshiList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='PK 拾'
                style={styles.page3}
                backAction={this.props.backAction}

            />);
            viewArr.push(<LotBlockView
                key={5}
                type = {5}

                dataSource={this.shiyixuanwuList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='11 选 5'
                style={styles.page3}
                backAction={this.props.backAction}

            />);

            viewArr.push(<LotBlockView
                key={6}
                type = {6}

                dataSource={this.fucaiList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='3D'
                style={styles.page3}
                backAction={this.props.backAction}

            />);
            viewArr.push(<LotBlockView
                key={7}
                type = {7}

                dataSource={this.liuhecaiList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='六合彩'
                style={styles.page3}
            />);

            viewArr.push(<LotBlockView
                key={8}
                type = {8}

                dataSource={this.erbaList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='PC 蛋蛋'
                style={styles.page3}
                backAction={this.props.backAction}

            />);

            viewArr.push(<LotBlockView
                key={9}
                type = {9}
                dataSource={this.otherList}
                navigator={this.props.navigation}
                countDownFinished={() => this._fetchData()}
                tabLabel='其他'
                style={styles.page3}
                backAction={this.props.backAction}

            />);
        }
        return viewArr;
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    switchView: {
        backgroundColor: 'white',
        height: 100,
    },

    errorView: {
        height: SCREEN_HEIGHT - 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    errorText: {
        color: 'red',
        fontSize: 20,
    },

    page1: {
        backgroundColor: 'white',
    },

    page2: {
        backgroundColor: 'white',
    },

    page3: {
        backgroundColor: 'white',
    },

});


export default BuyLot;
