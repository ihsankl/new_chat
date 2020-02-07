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

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstQuery: '',
    };
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem('username');
    console.log(user);
  }

  handleLogout = async () => {
    await AsyncStorage.removeItem('username');
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
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Chat')}>
                  <View style={styles.item}>
                    <View style={styles.friendAvatar}>
                      <FitImage
                        style={styles.flex}
                        source={require('../../assets/img/myFile.jpg')}
                      />
                    </View>
                    <View style={styles.secondContent}>
                      <Text>{item.title}</Text>
                      <Text style={styles.secondContentColor}>asd</Text>
                    </View>
                    <View style={{marginLeft: wp('10%')}}>
                      <Text>5 min</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
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
        {/* end main content */}
      </View>
    );
  }
}
