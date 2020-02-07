import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Appbar} from 'react-native-paper';
import ProfileList from '../../components/molecules/Profile';
import ImagePicker from 'react-native-image-picker';
import FitImage from 'react-native-fit-image';

const styles = {
  flex: {
    flex: 1,
  },
  profilePic: {
    marginTop: hp('16%'),
    marginBottom: hp('2%'),
    flexDirection: 'row',
  },
  wrapper: {
    borderRadius: wp('25%'),
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
};

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: '',
      email: '',
      displayName: '',
      currentUser: null,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      const source = {uri: response.uri};
      if (response.uri) {
        this.setState({photo: source});
      }
    });
  };

  render() {
    return (
      <View style={styles.flex}>
        {/* header */}
        <Appbar.Header
          theme={{
            colors: {primary: '#D3DDE6', underlineColor: 'transparent'},
          }}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Profile" />
        </Appbar.Header>
        {/* end header */}
        {/* profile pic */}
        <View style={styles.profilePic}>
          <View style={styles.flex} />
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={this.handleChoosePhoto}>
              <FitImage
                source={
                  this.state.photo !== ''
                    ? this.state.photo
                    : require('../../assets/img/avatar.jpg')
                }
                style={{height: hp('18%'), width: wp('38%')}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.flex} />
        </View>
        {/* end pic */}
        {/* info */}
        <View style={styles.row}>
          <View style={styles.flex} />
          <View style={{height: hp('44%'), width: wp('82%')}}>
            <ProfileList type="Username" content="Ihsankl" />
            <ProfileList type="Email" content="ihsan@ihsan.com" />
            <ProfileList type="Phone" content="0899999" />
            <ProfileList type="Date of Birth" content="01-01-1980" />
            <ProfileList type="Address" content="Royal Street" />
          </View>
          <View style={styles.flex} />
        </View>
        {/* end info */}
      </View>
    );
  }
}
