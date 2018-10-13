import React, {Component} from 'react'
import { StyleSheet, Text, ScrollView, View, Button, AsyncStorage} from 'react-native';
import ParticipantsOverview from './ParticipantsOverview'
import ActivitiesOverview from './ActivitiesOverview'
import AccommodationOverview from './AccommodationOverview'
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

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
    } else {
      return null;
    }
  } catch (error) {
    console.log(error)
  }
}

class SingleTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offlineTrip: {},
    }
  }

  async componentDidMount() {
    const storedTripString = await retrieveData(`${this.props.trip.name}`);
    if (storedTripString) {
      this.setState({
        offlineTrip: JSON.parse(storedTripString),
      })
    } else {
      await storeData(`${this.props.trip.name}`, JSON.stringify(this.props.trip));
    }
  }

  render() {
    const trip = this.state.offlineTrip.name ? this.state.offlineTrip : this.props.trip;
    return trip.name ? (
      <View>
        <Navbar />
        <ScrollView>
          <Text style={styles.tripTitle}>
            {trip.name}
          </Text>
          <Text style={styles.dates}>
            {(new Date (trip.startDate.slice(0, 10))).toString().slice(0,16)} to {(new Date (trip.endDate.slice(0, 10))).toString().slice(0,16)}
          </Text>
          <View style={styles.container}>
            <ParticipantsOverview peeps={trip.users} />
            <ActivitiesOverview activities={trip.activities} />
            <AccommodationOverview accommodations={trip.accommodation} />
          </View>
        </ScrollView>
      </View>
    ) : (
      <View>
        <Navbar />
        <View>
          <Text style={styles.noTrip}>
            You have not yet selected a trip. Please choose one from your
          </Text>
          <Button onPress={() => props.navigation.navigate('Dashboard')} title="dashboard."/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  noTrip: {
    textAlign: 'center',
    fontSize: 20,
    color: '#53aad9',
    marginBottom: -5,
    marginTop: 15
  },
  tripTitle: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#c60057',
  },
  dates: {
    color: '#004f78',
    fontSize: 13,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
  }
})

const mapStateToProps = state => ({
  trip: state.trip.selected,
})

export default withNavigation(connect(mapStateToProps)(SingleTrip));
