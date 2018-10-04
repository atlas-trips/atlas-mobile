import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import LoginScreen from './Components/LoginScreen';
import DashboardScreen from './Components/DashboardScreen';
import React from 'react';

const Stack = createBottomTabNavigator(
  {
    Login: { screen: LoginScreen },
    Dashboard: { screen: DashboardScreen },
  },
  {
    initialRouteName: 'Login',
  }
);

export default Stack;
