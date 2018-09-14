/**
 * Created by kl on 2018/8/22.
 */

import React, {Component} from 'react';
import {
    Text,
} from 'react-native';

export default class CusBaseText extends Component {

    render() {
        return (
            <Text {...this.props} allowFontScaling={false}>
            </Text>
        );
    }

}
