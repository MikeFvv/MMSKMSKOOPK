/**
 * Created by kl on 2018/8/28.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';

export default class AppDownload extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        header: (
            <CustomNavBar
                centerText={"App下载"}
                leftClick={() => navigation.goBack()}
            />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={{flex:1,position:'absolute'}} source={require('./img/ic_appDownbg.png')} />
                <Image style={styles.appicon}/>
                <CusBaseText style={styles.appname}>必发APP</CusBaseText>
                <CusBaseText style={styles.appdesc}>掌上购彩，随时随地~</CusBaseText>
                <TouchableOpacity style={styles.appDown}>
                    <Image style={styles.devicelogo} source={require('./img/ic_applelogo.png')} />
                    <CusBaseText style={styles.devicedesc}>点击下载 ios版</CusBaseText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appDown,{marginTop:25}]}>
                    <Image style={styles.devicelogo} source={require('./img/ic_androidlogo.png')} />
                    <CusBaseText style={styles.devicedesc}>点击下载 安卓版</CusBaseText>
                </TouchableOpacity>
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
        backgroundColor: 'white',
        alignItems:'center',
    },
    appicon:{
        width:120,
        height:120,
        marginTop:45,
        backgroundColor:'green',
    },
    appname:{
        marginTop:30,
        color:'#FFFFFF',
        fontSize:20,
        marginBottom:10,
    },
    appdesc:{
        color:'#FFFFFF',
        fontSize:20,
    },
    appDown:{
        marginTop:80,
        width:305,
        height:55,
        borderRadius:5,
        borderWidth:1,
        borderColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    devicelogo:{
        width:30,
        height:30,
        marginRight:20,
    },
    devicedesc:{
        color:'#FFFFFF',
        fontSize:22,
    },

});