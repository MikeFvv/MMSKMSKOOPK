/**
 * Created by kl on 2018/8/22.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import ActivityDetail from "./ActivityDetail";

export default class Activity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activitys: null, //优惠活动数据
        };
    }

    componentWillMount() {
        this._preferentialData();
    }

    //获取优惠活动数据
    _preferentialData() {
        this.refs.LoadingView && this.refs.LoadingView.showLoading('loading');
        let params = new FormData();
        params.append("ac", "getGameEventList");
        let promise = GlobalBaseNetwork.sendNetworkRequest(params);
        promise
            .then(response => {
                if (response.msg != 0) {
                    this.refs.LoadingView && this.refs.LoadingView.showFaile(response.param);
                    return;
                }
                this.setState({activitys:response.data});
            })
            .catch(err => {
                if (err && typeof (err) === 'string' && err.length > 0) {
                    this.refs.LoadingView && this.refs.LoadingView.showFaile(err);
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    automaticallyAdjustContentInsets={false}
                    alwaysBounceHorizontal={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.activitys}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={this._renderListFooter}
                    ListHeaderComponent={this._renderListHeader}
                />
                <LoadingView ref = 'LoadingView'/>
            </View>
        );
    }

    _renderItem = (info) => {
        let item = info.item;
        return (
            <TouchableOpacity style={styles.item} onPress={()=>this._itemClicked(item.event_id)}>
                <Image style={styles.itemImg}
                       source={{uri:item.phone_head}}/>
                <View style={{marginLeft:15,flex:1}}>
                    <CusBaseText style={styles.itemTitle}>{item.event_title}</CusBaseText>
                    <CusBaseText style={styles.itemDesc}>{item.event_short}</CusBaseText>
                </View>
                <Image style={styles.itemArrow}
                       source={require('./img/ic_activity_arrow.png')}/>
            </TouchableOpacity>
        );
    }

    _renderSeparator = () => {
        return (
            <View style={styles.itemSeparator}/>
        );
    }

    _keyExtractor = (item, index) => {
        return String(index);
    }

    _renderListHeader = () => {
        return (
            <View style={{height:15}} />
        );
    }

    _renderListFooter = () => {
        return (
            <View style={{height:10}} />
        );
    }

    _itemClicked = (eventId) => {
        this.props.navigation.navigate('ActivityDetail', {eventId: eventId});
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#EFEEF4',
    },
    item:{
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
    },
    itemImg:{
        width:45,
        height:45,
        borderRadius:30,
    },
    itemTitle:{
        fontSize:18,
        marginTop:10,
        marginBottom:10,
    },
    itemDesc:{
        fontSize:15,
        color:'#6E6E6E',
        marginBottom:10,
    },
    itemArrow:{
        width:14,
        height:14,
        marginLeft:10,
    },
    itemSeparator:{
        height:15,
    }
});