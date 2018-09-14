import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';


let { height, width } = Dimensions.get('window');


class newTabBar extends Component {



     propType = {
        goToPage    : this.PropTypes.func,
        activeTab   : this.PropTypes.number,
        tabs        : this.PropTypes.array,

        tabNames    : this.PropTypes.array,
        tabIconNames: this.PropTypes.array
    };



    render() {
        return (
            <View style={[styles.tabs, {borderTopWidth:height}]}>
                {this.props.tabs.map((tab, i) => {
                    let color = this.props.activeTab === i ? 'red' : 'gray';
                    let icon = this.props.activeTab == i ? this.props.selectedTabIconNames[i] : this.props.tabIconNames[i];
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            style={styles.tab}
                            onPress={()=>this.props.goToPage(i)}
                        >
                            <View style={styles.tabItem}>
                                <Image
                                    style={styles.icon}
                                    source={icon}
                                />
                                <Text style={{color: color, fontSize: 12}}>
                                    {this.props.tabNames[i]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 49,
        borderTopColor: '#d9d9d9',
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    icon: {
        width: 26,
        height: 26,
        marginBottom: 2
    }
})

export default newTabBar;
