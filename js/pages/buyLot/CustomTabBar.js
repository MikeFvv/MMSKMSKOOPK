import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
    Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

class CustomTabBar extends React.Component {
  icons = [ require('./img/more_all_white.png'),
      require('./img/more_kuaisan_white.png'),
      require('./img/more_shishicai_white.png'),
      require('./img/more_shishicai_white.png'),

      require('./img/more_shiyi_white.png'),
      require('./img/more_liuhecai_white.png'),
      require('./img/more_pc_white.png'),
      require('./img/more_other_white.png'),
      require('./img/more_tiyu_white.png'),
      require('./img/more_dianzi_white.png'),


  ];

  constructor(props) {
    super(props);

    this.icons = [ require('./img/more_all_white.png'),
                   require('./img/more_kuaisan_white.png'),
                   require('./img/more_shishicai_white.png'),
                    require('./img/more_shishicai_white.png'),

        require('./img/more_shiyi_white.png'),
        require('./img/more_liuhecai_white.png'),
        require('./img/more_pc_white.png'),
        require('./img/more_other_white.png'),
        require('./img/more_tiyu_white.png'),
        require('./img/more_dianzi_white.png'),
    ];

      this.blackicons = [ require('./img/more_all_black.png'),
          require('./img/more_kuaisan_black.png'),
          require('./img/more_shishicai_black.png'),
          require('./img/more_shishicai_black.png'),

          require('./img/more_shiyi_black.png'),
          require('./img/more_liuhecai_black.png'),
          require('./img/more_pc_black.png'),
          require('./img/more_other_black.png'),
          require('./img/more_tiyu_black.png'),
          require('./img/more_dianzi_black.png'),
      ];
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({ value, }) {

    // this.icons.forEach((icon, i) => {
    //   const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
    //   icon.setNativeProps({
    //     style: {
    //       color: this.iconColor(progress),
    //     },
    //   });
    // });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>

      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Image

              source={this.props.activeTab === i ? this.icons[i] :this.blackicons[i]}
              style={{height:30,width:30,marginTop:10}}
            // name={tab}
            // size={30}
            // color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
            // ref={(icon) => { this.icons[i] = icon; }}
          />
            <Text style={{marginTop:8,backgroundColor:'red'}} >哈哈</Text>
        </TouchableOpacity>;
      })}
    </View>;
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 74,
    flexDirection: 'row',
    paddingTop: 5,
    // borderWidth: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    // borderBottomColor: 'rgb(32,41,44)',
      backgroundColor:'rgb(32,41,44)',
  },
});

export default CustomTabBar;
