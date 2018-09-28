import React, { Component } from 'react';
import {
  Styelsheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to Atlas'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Welcome to Login!</Text>
        <TouchableHighlight onPress={() => navigate('User')}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default LoginScreen;
