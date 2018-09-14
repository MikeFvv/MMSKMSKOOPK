/**
 * Created by kl on 2018/8/29.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';

export default class ActivityDetail extends Component {

    static navigationOptions = ({navigation}) => ({
        header: (
            <CustomNavBar
                centerText={"活动详情"}
                leftClick={() => navigation.goBack()}
            />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {html:'',};
    }

    componentWillMount() {
        this.eventId = this.props.navigation.state.params.eventId;
        this._activityDetail();
    }

    _activityDetail() {
        this.refs.LoadingView && this.refs.LoadingView.showLoading('loading...');
        let params = new FormData();
        params.append("ac", "getEventContent");
        params.append("eid", this.eventId);
        params.append("wtype", "");
        let promise = GlobalBaseNetwork.sendHuoDongNetworkRequest(params);
        promise.then(response => {
            let array = response.split('"data":"');
            let datalist = array[1].substr(0, array[1].length-2);
            let preg = /^[A-Za-z0-9]+$/;
            let is = preg.test(datalist);
            let aaa = '';
            if(is==true){
                aaa =  this._decipher(datalist);
            }else {
                aaa = datalist;
            }
            let aa = aaa.replace(/&amp;/g,"&");
            let bb = aa.replace(/&gt;/g,">");
            let cc = bb.replace(/&lt;/g,"<");
            let dd = cc.replace(/&quot;/g,"'");
            let pop = dd.replace(/&#039;/g,"\"");
            this.setState({html: pop});
        }).catch(err => {
            this.refs.LoadingView && this.refs.LoadingView.cancer();
        });
    }

    _decipher(val) {
        let valByte = [];
        let keyByte = [`0`.charCodeAt(0)]; // 48
        for (let a = 0; a < val.length; a++) {
            valByte.push( parseInt(val[a], 16));
        }
        if (valByte.length % 2 != 0) {
            return;
        }
        let tempAr = [];
        for (let i = 0; i < valByte.length; i+=2) {
            tempAr.push( valByte[i] << 4 | valByte[i + 1] );
        }
        for (let a = 0; a < tempAr.length; a++) {
            for (let b = keyByte.length - 1; b >= 0; b--) {
                tempAr[a] = tempAr[a] ^ keyByte[b];
            }
        }
        let str = '';
        for (var i = 0; i < tempAr.length; i++) {
            str += String.fromCharCode(tempAr[i]);
        }
        return decodeURIComponent(escape(str));
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.container}
                    source={{html:this.state.html}}
                    mixedContentMode={'always'} //接受不安全链接
                    javaScriptEnabled={true} //Android iOS平台JavaScript是默认开启的
                    startInLoadingState={false} //强制WebView在第一次加载时先显示loading视图。默认为true。
                    scalesPageToFit={true} //设置是否要把网页缩放到适应视图的大小，以及是否允许用户改变缩放比例。
                    bounces={false}
                    onLoadEnd = {()=>{
                        this.refs.LoadingView && this.refs.LoadingView.cancer();
                    }}
                />
                <LoadingView ref = 'LoadingView'/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});