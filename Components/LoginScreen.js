import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Image,
  View,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../store/store';
import LoginBackground from './LoginBackground';
const err = require('../assets/images/err.png');

const storeData = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (error) {
    console.log(error);
  }
}

const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error)
  }
}

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formName: 'login',
      failedLogin: false
    };
    this.handlePress = this.handlePress.bind(this);
  }

  async handlePress() {
    const { email, password, formName } = this.state;
    if(email.length && password.length) {
      await this.props.submitLogin(email, password, formName);
      if(this.props.user.id){
        await storeData('user', JSON.stringify(this.props.user));
        this.props.navigation.navigate('Dashboard');
      } else {
        this.setState({failedLogin: !this.state.failedLogin})
      }
    }
  }

  async componentDidMount() {
    const offlineUserString = await retrieveData('user');
    const offlineUser = JSON.parse(offlineUserString);
    // if (offlineUser["name"]) {
    //   this.props.navigation.navigate('Dashboard', {userExists: true});
    // }
  }

  static navigationOptions = {
    title: 'Login'
  };
  render() {
    return (
      <LoginBackground>
        <SafeAreaView style={styles.loginContainer}>
          <Image source={require('../assets/images/logo.png')} />
          <View style={styles.inputsContainer}>
            <Text style={styles.text}>Email:</Text>
            <TextInput
              style={styles.input}
              value={this.state.email}
              onChangeText={text => this.setState({ email: text.toLowerCase() })}
            />
            <Text style={[styles.text, {marginTop: 10}]}>Password:</Text>
            <TextInput
              style={styles.input}
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
            />
            <TouchableHighlight style={[styles.button, (this.state.email && this.state.password)? styles.enabled: styles.disabled] }
            onPress={this.handlePress}
            underlayColor={(this.state.email && this.state.password) ? '#ddeaff' : '#929292'}
            >
              <Text style={styles.logInText}>LOGIN</Text>
            </TouchableHighlight>
          {this.state.failedLogin ? (
            <View style={styles.error}>
              <Image source={err} style={{height: 30, width: 30}} />
              <Text style={styles.errorText}>{'Invalid Password'}</Text>
            </View>
          ): null}
          </View>
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
    fontSize: 20,
    paddingLeft: 3,
  },
  button: {
    alignItems: 'center',
    margin: 20,
    width: 200,
    height: 60,
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  enabled:{
    backgroundColor: '#32bcf2',
  },

  disabled: {
    backgroundColor: '#929292'
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  inputsContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  logInText: {
    color: 'white',
    fontSize: 20,
  },
  error: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    justifyContent: "space-evenly",
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
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
