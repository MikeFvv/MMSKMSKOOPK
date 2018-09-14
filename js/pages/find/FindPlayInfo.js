/**
 * Created by kl on 2018/8/28.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image, Dimensions,
    Text,
    ImageBackground,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Colors from "../../component/Colors";

let {height, width} = Dimensions.get('window');
let imageWith = width / 4.0;
export default class FindPlayInfo extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({

        header: (
            <CustomNavBar
                centerText={"玩家信息"}
                leftClick={() => {

                    navigation.goBack()
                }}
            />
        ),

    });


    constructor(props) {
        super(props);
        this.state = {selectedImageIndex: 0};
    }


    componentWillMount() {

    }

    render() {

        let arr = [<FindPlayInfoPage type={this.props.navigation.state.params.type}/>, <FindPlayInfoPage type={this.props.navigation.state.params.type}/>];

        // 小圆点指示器
        let circles = [];

        // 小圆点位置居中显示
        let imageLength = 2;
        let circleLength = 10 * imageLength + 5 * imageLength * 2;
        let center = (width - circleLength) / 2;
        for (let i = 0; i < arr.length; i++) {
            circles.push(<View key={i + ""}
                               style={[styles.circle, {backgroundColor: this.state.selectedImageIndex == i ? Colors.appColor : 'gray'}]}/>);
        }


        return (
            <View style={styles.container}>
                <Image source={require('./img/ic_bg.png')} style={{width: width, height: width / 3.0}}/>
                <Image
                    source={this.props.navigation.state.params.type == 1 ? require('./img/test.jpeg') : require('./img/test2.jpeg')}
                    style={{
                        borderRadius: imageWith / 2.0,
                        borderColor: 'white',
                        borderWidth: 5,
                        width: imageWith,
                        height: imageWith,
                        position: 'absolute', left: (width - imageWith) / 2.0, top: width / 3.0 - imageWith / 2.0
                    }}/>

                <View style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#d0d0d0',
                    marginTop: imageWith / 2.0 + 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 20,
                }}>
                    <View style={{
                        flexDirection: 'row', width: width, justifyContent: 'center',
                        alignItems: 'center'
                    }}><Text
                        style={{fontSize: 18}}>{this.props.navigation.state.params.type == 1 == 1 ? '一栗莎子' : '渡边麻友'}</Text><ImageBackground
                        style={{
                            width: 118/2.0,
                            height: 65/2.0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            right: 0

                        }}

                        source={require('./img/ic_bgr.png')}
                    ><Text style={{color: 'white', fontSize: 18}}>VIP3</Text></ImageBackground></View>
                    <Text style={{fontSize: 18, color: '#727272', marginTop: 5}}>账号:1314520</Text>
                    <Text style={{fontSize: 20, marginTop: 15}}>累计中奖金额: <Text
                        style={{color: Colors.appColor}}>21980</Text>元</Text>
                </View>

                <View style={{paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}><Text
                    style={{fontSize: 25}}>Ta 喜欢的彩票</Text></View>

                {/*滚动视图*/}
                <View style={[{width: width, marginTop: 20}, {height: 200}]}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={[{width: width}, {height: 200}]}
                        pagingEnabled={true}
                        onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}

                        ref={(scrollView) => {
                            this._scrollView = scrollView;
                        }}
                    >
                        {arr}
                        {/*{pageArray}*/}
                        {/*[(<View style={{width:width,height:200,backgroundColor:'yellow'}}></View>),(<View style={{width:width,height:200,backgroundColor:'orange'}}></View>)]*/}
                    </ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 10,
                        left: center
                    }}>{circles}</View>

                </View>


            </View>
        );
    }


    onAnimationEnd(e) {
        let offSetX = e.nativeEvent.contentOffset.x;
        // console.log(offSetX,width);
        this._index = Math.floor(offSetX / width);
        console.log(this._index);

        this._refreshFocusIndicator();
    }

    _refreshFocusIndicator() {
        this.setState({selectedImageIndex: this._index});
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigateRightPress: this._navigateRightPress,
        });
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

class FindPlayInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedImageIndex: 0};
    }


    componentWillMount() {

    }


    render() {
        let mainWith = width - 20 * 2;
        let unitWith = (mainWith - 10 * 2 * 4) / 4.0;
        let  contentArr = [];
        for(let i = 0 ; i < 4; i++){
            contentArr.push(<TouchableOpacity activeOpacity={0.8}
                                              style={[styles.unitStyle, {
                                                  width: unitWith,
                                                  height: unitWith
                                              }]}><Image
                source={this.props.type==1?require('./img/test.jpeg'):require('./img/test2.jpeg')} style={{
                width: unitWith,
                height: unitWith,
                borderRadius: unitWith / 2.0
            }}/></TouchableOpacity>)
        }

        return (<View style={{width: width, paddingHorizontal: 20, height: 200}}><View
            style={{height: 100, flexDirection: 'row'}}>{contentArr}</View><View
            style={{height: 100, flexDirection: 'row'}}>{contentArr}</View></View>)
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    circle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: Colors.appColor,
        marginHorizontal: 5,
    },
    unitStyle: {
        marginHorizontal: 10
    },
    imageStyle: {}

});