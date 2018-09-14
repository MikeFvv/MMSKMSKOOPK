/**
 * Created by kl on 2018/8/22.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image, Dimensions,
    AsyncStorage,
} from 'react-native';

import MyImage from "../me/MeListImg";

import HomeCaiBlockView from './HomeCaiBlockView';


let { height, width } = Dimensions.get('window');

export default class BuyLot extends Component {



    static navigationOptions = ({ navigation }) => ({
        header: (
            <View style ={{width:SCREEN_WIDTH,backgroundColor:COLORS.appColor,flexDirection:'row', height: SCREEN_HEIGHT == 812 ? 88 : 64,}}>
                <View style ={{flex:0.8,marginTop:SCREEN_HEIGHT == 812 ? 39 : 15,alignItems:'center', justifyContent:'center',}}>
                    <CusBaseText style = {{marginLeft:SCREEN_WIDTH/5,fontWeight:'bold',fontSize:Adaption.Font(20,18), color: 'white',}}>
                        首页
                    </CusBaseText>
                </View>

                <TouchableOpacity onPress={()=>{navigation.navigate('ChatSerivce')}} activeOpacity={0.7} style = {{flex:0.2, alignItems:'center', justifyContent:'center', width:60,marginTop:SCREEN_HEIGHT == 812 ? 42 : 18,flexDirection:'row'}}>
                    <CusBaseText style = {{marginLeft:4,color:'#fff', fontSize:Adaption.Font(18,15)}}>
                        APP
                    </CusBaseText>
                    <Image style = {{width:15, height:15,}} source = {require('./img/home_xiazai.png')}/>
                </TouchableOpacity>
            </View>
        ),
    });




    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
        };
    }

    componentWillMount()
    {
        this._fetchHomeArray();



        global.UserInfo.shareInstance();
        global.UserInfo.queryUserInfo((result) => {

            if (result.msg == 0) {
                global.UserLoginObject = result.data;
            }
        });

    }

    _fetchHomeArray() {
        //请求参数
        let params = new FormData();
        params.append("ac", "getGameListAtin");
        params.append("types", "");
        var promise = GlobalBaseNetwork.sendNetworkRequest(params, this.lineIPIndex3);
        promise
            .then(response => {

                if (response.msg == 0) {

                    let datalist = response.data;
                    if (datalist != undefined) {

                        // 初始化
                        this.lineIPIndex3 = 0;
                        let datalist = response.data;

                        let indexArray = [];
                        let dataBlog = [];
                        let i = 0;

                        datalist.map(dict => {
                            dataBlog.push({ key: i, value: dict });
                            i++;
                        });
                        datalist.map((item) => {
                            if (item.type == 1) {

                                if (item.hot == 1) {
                                    indexArray.push({ key: i, value: item });
                                }
                            } else {
                                if (item.hot == 1) {
                                    indexArray.push({ key: i, value: item });
                                }
                            }
                            i++;
                        })
                        indexArray.push({ key: 99, value: {} });

                        this.setState({dataSource: indexArray })

                        let datas = JSON.stringify(datalist);
                        AsyncStorage.setItem('GameListData', datas, (error) => { });
                        let newmodel = {}
                        let openGameList = [];
                        for (let i = 0; i < datalist.length; i++) {
                            let model = datalist[i];
                            if (model.enable != 2 && model.type == 1) { //只存type == 1的正常彩票。除了体育彩
                                openGameList.push(model);
                            }
                            // 存yearid
                            if (model.js_tag == 'lhc') {
                                global.yearId = model.yearid;
                                if (global.yearId.length > 0) {
                                    break;  // 防止拿到空值，有值再退出
                                }
                            }
                            newmodel[`${model.game_id}`] = model; // game_id作为key，每个key对应的Model存起来
                        }
                        global.AllPlayGameList = openGameList;
                        global.GameListConfigModel = newmodel;
                    }
                }
            })
            .catch(err => {

            });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{width:width,height:width * 9 / 20,backgroundColor:'blue'}} />


                <View style={{flex:1,marginTop:10,marginBottom:10}}>


                    <HomeCaiBlockView
                        caizhongIndex={1}
                        dataSource={this.state.dataSource}
                        navigator={this.props.navigation}
                        backAction={this.props.backAction}
                    />

                </View>
            </View>
        );
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return true;
    // }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgb(239,238,246)',
    },

});