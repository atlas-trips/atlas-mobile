import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import LoginScreen from './Components/LoginScreen';
import DashboardScreen from './Components/DashboardScreen';
import AccommodationsScreen from './Components/AccommodationsScreen';
import ActivitiesScreen from './Components/ActivitiesScreen';

const Stack = createBottomTabNavigator(
  {
    Login: { screen: LoginScreen },
    Dashboard: { screen: DashboardScreen },
    Accommodations: { screen: AccommodationsScreen },
    Activities: { screen: ActivitiesScreen }
  },
  {
    initialRouteName: 'Login',
  }
);

export default Stack;
