import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import LoginScreen from './Components/LoginScreen';
import UserScreen from './Components/UserScreen';
import React from 'react';

const Stack = createBottomTabNavigator(
  {
    Login: { screen: LoginScreen },
    User: { screen: UserScreen },
  },
  {
    initialRouteName: 'Login',
  }
);

export default Stack;
