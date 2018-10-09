import { createDrawerNavigator } from 'react-navigation';
import LoginScreen from './Components/LoginScreen';
import DashboardScreen from './Components/DashboardScreen';
import AccommodationsScreen from './Components/AccommodationsScreen';
import ActivitiesScreen from './Components/ActivitiesScreen';
import CalendarScreen from './Components/CalendarScreen';
import SingleTripScreen from './Components/SingleTripScreen';

const Stack = createDrawerNavigator(
  {
    Login: { screen: LoginScreen },
    Dashboard: { screen: DashboardScreen },
    Accommodations: { screen: AccommodationsScreen },
    Activities: { screen: ActivitiesScreen },
    Calendar: { screen: CalendarScreen },
    'My Trip': { screen: SingleTripScreen }
  },
  {
    initialRouteName: 'Login',
  }
);

export default Stack;
