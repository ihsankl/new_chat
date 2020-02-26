import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = {
  profileWarp: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#D3DDE6',
    paddingVertical: hp('3%'),
  },
  flex: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: wp('1%'),
  },
};

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.profileWarp}>
        <Text style={styles.padding}>{this.props.type}</Text>
        <View style={styles.flex} />
        <Text style={styles.padding}>{this.props.content}</Text>
      </View>
    );
  }
}
