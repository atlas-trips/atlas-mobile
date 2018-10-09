import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../store/store';
import LoginBackground from './LoginBackground';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formName: 'login'
    };
    this.handlePress = this.handlePress.bind(this);
  }

  async handlePress() {
    const { email, password, formName } = this.state;
    await this.props.submitLogin(email, password, formName);
    this.props.navigation.navigate('Dashboard');
  }

  static navigationOptions = {
    title: 'Welcome to Atlas'
  };
  render() {
    return (
      <LoginBackground>
        <SafeAreaView style={styles.loginContainer}>
          <Text>Welcome to Login!</Text>
          <Text>Email: </Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text.toLowerCase() })}
          />
          <Text>Password: </Text>
          <TextInput
            style={styles.input}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
          />
          <TouchableHighlight style={styles.button} onPress={this.handlePress}>
            <Text>LOG IN!</Text>
          </TouchableHighlight>
        </SafeAreaView>
      </LoginBackground>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: 200,
    height: 50,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 25
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#32bcf2',
    margin: 10,
    width: 200,
    height: 60,
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50
  }
});

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  submitLogin: (email, password, formName) =>
    dispatch(auth(email, password, formName))
});

export default connect(
  mapStateToProps,
  mapDispatch
)(LoginScreen);
