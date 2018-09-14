/**
 * Created by kl on 2018/8/28.
 */

import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    RefreshControl,
    ScrollView,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Colors from "../../component/Colors";
import FindPlayInfo from "./FindPlayInfo";

let {height, width} = Dimensions.get('window');
let fontSize = 16;
let paddingHorizontal = 10;
export default class FindContentView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPullRefresh: false,
            isPullRefresh2: false,
            prizeinfo: props.prizeinfo,
            data1: [this.sourceDataUnit(1), this.sourceDataUnit(1)],
            data2: [this.sourceDataUnit(2)],

        }
    }

    componentWillMount() {

    }

    sourceDataUnit(type) {
        return (<TouchableOpacity activeOpacity={0.8} style={{
            flexDirection: 'row',
            height: 70,
            alignItems: 'center',
            paddingHorizontal: 10,
            borderBottomWidth: 0.5,
            borderBottomColor: '#d0d0d0'
        }} onPress={() => {

            this.props.navigator.navigate('FindPlayInfo', {title:'玩家信息',type:type});
        }}><Image
            source={type ==1?require('./img/test.jpeg'):require('./img/test2.jpeg')} style={{width: 50, height: 50, borderRadius: 25}}/><View
            style={{paddingHorizontal: paddingHorizontal}}><View style={{flexDirection: 'row'}}><Text
            style={{color: 'pink', fontSize: fontSize}}>{type == 1 ? "一栗沙子" : "渡边麻油"} </Text><Text
            style={{fontSize: fontSize}}>在大发时时彩</Text></View>
            <View style={{flexDirection: 'row', marginTop: 5}}><Text style={{fontSize: fontSize}}>喜中 </Text><Text
                style={{fontSize: fontSize, color: Colors.appColor}}>￥1314</Text></View>
            <View></View>
        </View><Image source={require('./img/arrow.png')}
                      style={{position: 'absolute', right: 15, height: 18, width: 18}}/></TouchableOpacity>)
    }

    render() {
        console.log(this.state.isPullRefresh, this.state.isPullRefresh2);
        return this.state.prizeinfo ? (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView style={{height: height - 100 - (height == 812 ? 88 : 64)}}
                            automaticallyAdjustContentInsets={false}
                            alwaysBounceHorizontal={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isPullRefresh}  // 刷新时显示指示器
                                    onRefresh={() => this._onRefresh()}  // 开始刷新时调用
                                >
                                </RefreshControl>
                            }
                >
                    {this.state.data1}
                </ScrollView>
            </View>

        ) : (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView style={{height: height - 100 - (height == 812 ? 88 : 64)}}
                        automaticallyAdjustContentInsets={false}
                        alwaysBounceHorizontal={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isPullRefresh2}  // 刷新时显示指示器
                                onRefresh={() => this._onRefresh2()}  // 开始刷新时调用
                            >
                            </RefreshControl>
                        }
            >
                {this.state.data2}
            </ScrollView></View>);
    }


    _onRefresh() {
        // this._requestTrendData(this.props.game_id, false);  // 请求
        console.log("爽了吗");
        setTimeout(() => {
            console.log("爽了吗没了");
            this.state.data1.push(this.sourceDataUnit(1));
            this.setState({
                isPullRefresh: false,
            })
        }, 4000),
            this.setState({
                isPullRefresh: true,
            })
    }


    _onRefresh2() {
        // this._requestTrendData(this.props.game_id, false);  // 请求
        console.log("爽了吗2");
        setTimeout(() => {
            console.log("爽了吗2没了");
            this.state.data2.push(this.sourceDataUnit(2));
            this.setState({
                isPullRefresh2: false,
            })
        }, 4000),
            this.setState({
                isPullRefresh2: true,
            })
    }


    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps.prizeinfo",nextProps.prizeinfo);
        this.state.prizeinfo = nextProps.prizeinfo;
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
        backgroundColor: 'white',
    },

});