import { createStackNavigator } from 'react-navigation';
import User from './Components/UserScreen';
import LoginScreen from './Components/LoginScreen';
import UserScreen from './Components/UserScreen';
import { StyleSheet, Text, View } from 'react-native';

const App = createStackNavigator({
  Login: { screen: LoginScreen },
  User: { screen: UserScreen }
});

export default App;
