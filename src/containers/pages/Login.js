import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput, Button} from 'react-native-paper';
import FitImage from 'react-native-fit-image';
import {withNavigation} from 'react-navigation';
import AwesomeAlert from 'react-native-awesome-alerts';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

const styles = {
  flex: {
    flex: 1,
  },
  register: {
    marginTop: 5,
  },
  wrapper: {
    height: hp('40%'),
    alignItems: 'center',
  },
  img: {
    width: wp('100%'),
    height: hp('38%'),
  },
  title: {
    top: hp('-25%'),
    color: '#FCF7F1',
    fontSize: 50,
  },
  inputWrapper: {
    flexDirection: 'row',
    marginTop: hp('13%'),
  },
  inputSize: {
    width: wp('75%'),
    height: hp('30%'),
  },
  input: {
    backgroundColor: '#FAF8F0',
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 10,
  },
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      Password: '',
      isLoading: false,
      showAlert: false,
    };
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem('username');
    if (user) {
      this.props.navigation.navigate('Mainapp');
    }
  }

  login = async (username, Password) => {
    if (username !== '' && Password !== '') {
      const ref = firebase.database().ref('users/');
      try {
        this.setState({isLoading: true});
        await ref
          .orderByChild('/username')
          .equalTo(username)
          .once('value', async snapshot => {
            if (snapshot.val() !== null) {
              const user = Object.entries(snapshot.val())[0];
              var index = user.find(item => item.username === username);
              if (user) {
                if (Password === index.password) {
                  await AsyncStorage.setItem('username', index.username);
                  this.props.navigation.navigate('Mainapp');
                } else {
                  alert('Wrong password!');
                }
              } else {
                this.setState({showAlert: true});
              }
            } else {
              alert('No user found!');
            }
          });
        this.setState({isLoading: false});
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please fill first');
    }
  };

  render() {
    return (
      <View style={styles.flex}>
        <View style={styles.wrapper}>
          <FitImage
            style={styles.img}
            source={require('../../assets/img/bg.png')}
          />
          <Text style={styles.title}>Chat App</Text>
        </View>
        <View style={styles.flex}>
          <View style={styles.inputWrapper}>
            <View style={styles.flex} />
            <View style={styles.inputSize}>
              <TextInput
                style={styles.input}
                label="Username"
                value={this.state.username}
                onChangeText={username => this.setState({username})}
                theme={{
                  colors: {primary: '#053354', underlineColor: 'transparent'},
                }}
              />
              <TextInput
                label="Password"
                style={styles.input}
                secureTextEntry
                value={this.state.Password}
                onChangeText={Password => this.setState({Password})}
                theme={{
                  colors: {primary: '#053354', underlineColor: 'transparent'},
                }}
              />
              <View style={{marginTop: hp('7%')}}>
                <Button
                  // onPress={() => this.props.navigation.navigate('Mainapp')}
                  onPress={() =>
                    this.login(this.state.username, this.state.Password)
                  }
                  mode="contained"
                  color="#18A4E1">
                  Login
                </Button>
                <Button
                  style={styles.register}
                  onPress={() => this.props.navigation.navigate('Register')}
                  mode="contained"
                  color="#18A4E1">
                  Register
                </Button>
              </View>
            </View>
            <View style={styles.flex} />
          </View>
        </View>
        <AwesomeAlert
          show={this.state.isLoading}
          title="Loading"
          showProgress={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
        <AwesomeAlert
          show={this.state.showAlert}
          title="Login Failed"
          message="No user exist with that credential"
          showProgress={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
      </View>
    );
  }
}

const HomeOri = withNavigation(Login);
export default HomeOri;
