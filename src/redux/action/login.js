import firebase from 'react-native-firebase';

const ref = firebase.database().ref('user');

export const getuser = search => {
  return {
    type: 'GET_USER',
    payload: ref.once('value'),
  };
};
