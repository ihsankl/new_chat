import React, {Component} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// screens
import Login from './src/containers/pages/Login';
import Register from './src/containers/pages/Register';
import Mainscreen from './src/containers/pages/Main';
import Chat from './src/containers/pages/Chat';
import Profile from './src/containers/pages/Profile';

const AuthNav = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const Mainapp = createStackNavigator({
  Mainscreen: {
    screen: Mainscreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      headerShown: false,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const SwitchNav = createSwitchNavigator(
  {AuthNav, Mainapp},
  {
    initialRouteName: 'AuthNav',
  },
);

const AppContainer = createAppContainer(SwitchNav);

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    );
  }
}
