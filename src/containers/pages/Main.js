import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Searchbar, Appbar} from 'react-native-paper';
import FitImage from 'react-native-fit-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import firebase from 'react-native-firebase';
import {withNavigation} from 'react-navigation';

const styles = {
  footerContent: {
    flexDirection: 'row',
    marginHorizontal: wp('11%'),
    justifyContent: 'space-between',
  },
  footer: {
    height: hp('7%'),
    backgroundColor: '#D3DDE6',
  },
  secondContentColor: {
    color: '#D3DDE6',
  },
  secondContent: {
    flex: 1,
    marginLeft: wp('2%'),
  },
  noteIcon: {
    color: '#053354',
    flex: 1,
    marginHorizontal: wp('3%'),
  },
  avatar: {
    marginVertical: hp('3.5%'),
    marginHorizontal: wp('2%'),
    borderRadius: wp('100%'),
    overflow: 'hidden',
  },
  searchBar: {
    height: hp('6.5%'),
    marginLeft: wp('4%'),
    width: wp('67%'),
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  item: {
    height: hp('9%'),
    paddingHorizontal: wp('2.8%'),
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderColor: '#D3DDE6',
    flexDirection: 'row',
  },
  friendAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: wp('2%'),
    overflow: 'hidden',
  },
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarWrapper: {
    width: wp('15%'),
    backgroundColor: '#053354',
  },
  flex: {
    flex: 1,
  },
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstQuery: '',
      isLoading: false,
      data: [],
      myUserID: '',
      myUsername: '',
    };
  }

  async componentDidMount() {
    this.fierUp();
  }

  fierUp = async () => {
    this.setState({isLoading: true});
    const user = await AsyncStorage.getItem('username');
    const userID = await AsyncStorage.getItem('userID');
    const ref = firebase.database().ref('users/');
    try {
      ref.once('value', snapshot => {
        this.setState({
          data: Object.values(snapshot.val()),
          myUserID: userID,
          myUsername: user,
        });
      });
    } catch (error) {
      console.log(error);
    }

    this.setState({isLoading: false});
  };

  handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('userID');
    this.props.navigation.navigate('AuthNav');
  };

  render() {
    return (
      <View style={styles.root}>
        {/* sidebar */}
        <View style={styles.sidebarWrapper}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <View style={styles.avatar}>
              <FitImage
                style={{height: hp('6%'), width: wp('12%')}}
                source={require('../../assets/img/myFile.jpg')}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.flex} />
          <TouchableOpacity onPress={this.handleLogout}>
            <View style={styles.avatar}>
              <AntDesign color="#FCF7F1" size={30} name="logout" />
            </View>
          </TouchableOpacity>
        </View>
        {/* end sidebar */}

        {/* main content */}
        <View style={styles.flex}>
          <Appbar.Header
            theme={{
              colors: {primary: '#D3DDE6', underlineColor: 'transparent'},
            }}>
            <Searchbar
              style={styles.searchBar}
              placeholder="Search"
              onChangeText={query => {
                this.setState({firstQuery: query});
              }}
              value={this.state.firstQuery}
              IconSource={() => <AntDesign size={20} name="search1" />}
            />
            <TouchableOpacity style={styles.noteIcon}>
              <Foundation name="clipboard-notes" size={25} />
            </TouchableOpacity>
          </Appbar.Header>

          {/* real main content */}
          <View style={styles.flex}>
            <FlatList
              data={this.state.data}
              renderItem={({item}) =>
                item.userid === this.state.myUserID ? (
                  <></>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Chat', {
                        receiver: item.username,
                        receiverID: item.userid,
                      })
                    }>
                    <View style={styles.item}>
                      <View style={styles.friendAvatar}>
                        <FitImage
                          style={styles.flex}
                          source={require('../../assets/img/myFile.jpg')}
                        />
                      </View>
                      <View style={styles.secondContent}>
                        <Text>{item.username}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
              keyExtractor={item => item.username}
            />
          </View>
          {/* end real main content */}

          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Profile')}
                style={{marginTop: hp('0.4%')}}>
                <FontAwesome color="#053354" name="user-circle-o" size={35} />
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: hp('0.4%')}}>
                <AntDesign color="#053354" name="star" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <AwesomeAlert
          show={this.state.isLoading}
          title="Loading"
          showProgress={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
        {/* end main content */}
      </View>
    );
  }
}

const MainOri = withNavigation(Main);
export default MainOri;
