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
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

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
      message: '',
      messageList: [],
      receiver: '',
      receiverID: '',
      userId: '',
    };
  }

  componentDidMount() {
    this.fireUp();
  }

  // componentDidMount = async () => {
  //   const userId = await AsyncStorage.getItem('userid');
  //   const userName = await AsyncStorage.getItem('user.name');
  //   const userAvatar = await AsyncStorage.getItem('user.photo_users');
  //   this.setState({userId, userName, userAvatar});
  //   firebase
  //     .database()
  //     .ref('messages')
  //     .child(this.state.userId)
  //     .child(this.state.personid)
  //     .on('child_added', val => {
  //       this.setState(previousState => ({
  //         messageList: GiftedChat.append(previousState.messageList, val.val()),
  //       }));
  //     });
  // };

  fireUp = async () => {
    const userId = await AsyncStorage.getItem('userID');
    const receiver = this.props.navigation.getParam('receiver');
    const receiverID = this.props.navigation.getParam('receiverID');
    this.setState({
      receiver,
      receiverID,
      userId,
    });
    firebase
      .database()
      .ref('messages')
      .child(userId)
      .child(receiverID)
      .on('child_added', snapshot => {
        this.setState(previousState => ({
          messageList: GiftedChat.append(
            previousState.messageList,
            snapshot.val(),
          ),
        }));
      });
  };

  onSend = async () => {
    if (this.state.message.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.userId)
        .child(this.state.receiverID)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.userId,
          name: this.state.userName,
        },
      };
      updates[
        'messages/' +
          this.state.userId +
          '/' +
          this.state.receiverID +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.receiverID +
          '/' +
          this.state.userId +
          '/' +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({message: ''});
    }
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#18A4E1',
          },
          left: {
            backgroundColor: '#D3DDE6',
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

  // onSend(messages = []) {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }));
  // }

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
          <Appbar.Content title={this.state.receiver} />
        </Appbar.Header>
        {/* content */}
        <GiftedChat
          style={styles.justifyContent}
          onInputTextChanged={val => {
            this.setState({message: val});
          }}
          messages={this.state.messageList}
          onSend={() => this.onSend()}
          user={{
            _id: this.state.userId,
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
