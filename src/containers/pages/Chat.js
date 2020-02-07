import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Appbar} from 'react-native-paper';
import FitImage from 'react-native-fit-image';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
// import firebase from 'react-native-firebase';
// import AsyncStorage from '@react-native-community/async-storage';

const styles = {
  justifyContent: {
    justifyContent: 'center',
  },
  avatar: {
    marginVertical: hp('3.5%'),
    marginHorizontal: wp('2%'),
    borderRadius: wp('100%'),
    overflow: 'hidden',
  },
  actions: {
    marginBottom: hp('1.5%'),
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  toolbarInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    marginRight: 10,
    marginBottom: 5,
  },
};
export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.defaultMessage();
  }

  // componentDidMount = async () => {
  //   const uid = await AsyncStorage.getItem('userid');
  //   this.setState({uid: uid, refreshing: true});
  //   await firebase
  //     .database()
  //     .ref('/user')
  //     .on('child_added', data => {
  //       let person = data.val();
  //       // eslint-disable-next-line eqeqeq
  //       if (person.id != uid) {
  //         this.setState(prevData => {
  //           return {userList: [...prevData.userList, person]};
  //         });
  //         this.setState({refreshing: false});
  //       }
  //     });
  // };

  defaultMessage = () => {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#18A4E1',
          },
        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendIcon}>
          <Feather name="send" size={25} color="#18A4E1" />
        </View>
      </Send>
    );
  }

  renderActions = () => {
    return (
      <View style={styles.actions}>
        <TouchableOpacity>
          <Feather
            style={{marginHorizontal: wp('2%')}}
            name="image"
            size={25}
            color="#18A4E1"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="map" size={25} color="#18A4E1" />
        </TouchableOpacity>
      </View>
    );
  };

  renderInputToolbar(props) {
    //Add the extra styles via containerStyle
    return <InputToolbar {...props} containerStyle={styles.toolbarInput} />;
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  _handleSearch = () => console.log('Searching');

  _handleMore = () => console.log('Shown more');
  render() {
    return (
      <View style={styles.flex}>
        <Appbar.Header
          theme={{
            colors: {primary: '#D3DDE6', underlineColor: 'transparent'},
          }}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Name" />
          <TouchableOpacity>
            <View style={styles.avatar}>
              <FitImage
                style={{height: hp('6%'), width: wp('12%')}}
                source={require('../../assets/img/myFile.jpg')}
              />
            </View>
          </TouchableOpacity>
        </Appbar.Header>
        {/* content */}
        <GiftedChat
          style={styles.justifyContent}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          renderActions={this.renderActions}
          renderInputToolbar={this.renderInputToolbar}
        />
      </View>
    );
  }
}
