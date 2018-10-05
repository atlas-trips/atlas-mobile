import React, { Component } from 'react';
import {
  Styelsheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../store/store';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formName: 'login',
    };
    this.handlePress = this.handlePress.bind(this);
  }

  async handlePress() {
    const { email, password, formName } = this.state;
    await this.props.submitLogin(email, password, formName);
    this.props.navigation.navigate('Dashboard');
  }

  static navigationOptions = {
    title: 'Welcome to Atlas',
  };
  render() {
    return (
      <SafeAreaView>
        <Text>Welcome to Login!</Text>
        <Text>Email: </Text>
        <TextInput
          style={{
            width: 200,
            height: 50,
            backgroundColor: 'blue',
            color: 'white',
            fontSize: 25,
          }}
          value={this.state.email}
          onChangeText={text => this.setState({ email: text.toLowerCase() })}
        />
        <Text>Password: </Text>
        <TextInput
          style={{
            width: 200,
            height: 50,
            backgroundColor: 'blue',
            color: 'white',
            fontSize: 25,
          }}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
        />
        <TouchableHighlight onPress={this.handlePress}>
          <Text>LOG IN!</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  submitLogin: (email, password, formName) =>
    dispatch(auth(email, password, formName)),
});

export default connect(
  mapStateToProps,
  mapDispatch
)(LoginScreen);
