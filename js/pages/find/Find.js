/**
 * Created by Allen on 2018/8/25.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text, Dimensions, TouchableOpacity
} from 'react-native';
import Colors from "../../component/Colors";
import CusBaseText from "../../component/CusBaseText";
import FindContentView from './FindContentView';

let {height, width} = Dimensions.get('window');
let prizeInfo = true;
export default class Find extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({

        header: (
            <FindHeader navigation={navigation}/>
        ),

    });


    constructor(props) {
        super(props);
        this.state = {prizeInfo: true};
        prizeInfo = true;
        console.log("有没有");
    }

    componentWillMount() {

    }

    render() {
        return (
            <FindContentView prizeinfo={this.state.prizeInfo}  navigator={this.props.navigation}/>
        );
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigateRightPress: this._navigateRightPress,
        });

    }

    _navigateRightPress = (type) => {
        console.log(type);

        this.setState({prizeInfo: type == 1});
        prizeInfo = (type == 1);


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


class FindHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {whichType: prizeInfo?1:2};
        console.log("走向");
    }

    render() {

        return (<View style={[styles.container, {backgroundColor: COLORS.appColor}]}>


            <View style={[styles.imageLogoStyle2, {
                height: 35, width: 219, marginTop: height == 812 ? 41 : 22, backgroundColor: 'transparent',
                flexDirection:
                    'row',
                alignItems: 'center',
                justifyContent:
                    'center',
                borderRadius: 5,
                borderWidth: 2,
                borderColor: 'white',
                position: 'absolute',
                left: (width - 219) / 2.0
            }]}>
                <TouchableOpacity onPress={() => {

                    this.props.navigation.state.params.navigateRightPress(1)
                    this.setState({whichType: 1});
                }} activeOpacity={0.7} style={{
                    height: 31,
                    width: (219) / 2.0 - 2,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: this.state.whichType == 1 ? 'white' : Colors.appColor
                }}><CusBaseText
                    style={{color: this.state.whichType == 1 ? Colors.appColor : 'white'}}>中奖信息</CusBaseText></TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.state.params.navigateRightPress(2)
                    this.setState({whichType: 2});
                }} activeOpacity={0.7} style={{
                    height: 31,
                    width: (219) / 2.0 - 2,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: this.state.whichType == 2 ? 'white' : Colors.appColor
                }}><CusBaseText
                    style={{color: this.state.whichType == 2 ? Colors.appColor : 'white'}}>昨日奖金榜</CusBaseText></TouchableOpacity>
            </View>

        </View>)
    }


}

const styles = StyleSheet.create({
    container: {
        height: height == 812 ? 88 : 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftStyle: {
        position: 'absolute',
        top: 18,
        left: 20,
        paddingLeft: 15,
        width: 10,

        resizeMode: 'contain'
    },
    rightStyle: {
        // backgroundColor: 'yellow',
        marginTop: height == 812 ? 44 : 20,
        paddingRight: 10,
        // marginRight: 15,
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end',
        alignSelf: 'center',
        textAlign: 'right',
        color: 'white',
        fontSize: 18,
        width: (width - 180) / 2,
    },
    // 1 cover 等比拉伸
    // 2 stretch 保持原有大小
    // 3 contain  图片拉伸  充满空间
    imageLogoStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: width / 2.0 - 75,
        marginTop: height == 812 ? 54 : 30,
        width: 150,
        fontSize: 18,

        color: 'white',

        textAlign: 'center'
    },

    imageLogoStyle2: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: width / 2.0 - 100,
        marginTop: height == 812 ? 54 : 30,
        width: 150,
        fontSize: 18,

        color: 'white',

        textAlign: 'center'
    },

    nav_headerLeft_view: {
        width: 15,
        height: 15,
        borderColor: '#fff',
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        transform: [{rotate: '45deg'}],
        position: 'absolute',

        left: 13,
        paddingLeft: 15,
        width: 10,
    },


});

