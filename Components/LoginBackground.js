import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

class LoginBackground extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../assets/splash.jpg')}
        style={{
          backgroundColor: '#ccc',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default LoginBackground;
