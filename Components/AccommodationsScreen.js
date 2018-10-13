import React from 'react';
import {getAccommodations} from '../store/accommodation';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import Navbar from './Navbar';

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

class AccommodationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offlineAccommodations: [],
      offlineTrip: {},
    }
  }

  async componentDidMount() {
    const storedTripString = await retrieveData(`${this.props.trip.name}`);
    if (storedTripString) {
      const storedTrip = JSON.parse(storedTripString);
      this.setState({
        offlineTrip: storedTrip,
        offlineAccommodations: storedTrip["accommodation"]
      })
    } else {
      await storeData(`${this.props.trip.name}`, JSON.stringify(this.props.trip));
    }

    if (!this.state.offlineAccommodations) {
      await this.props.getAccommodations(this.props.trip.id);
    }
  }

  render() {
    const accommodations = this.state.offlineAccommodations ? this.state.offlineAccommodations : this.props.accommodadtions;
    const trip = this.state.offlineTrip ? this.state.offlineTrip : this.props.trip;
    return trip.name ? (
      <View>
        <Navbar />
        {accommodations.length > 0
          ? accommodations.map(accom => {
              return (
                <View key={`accom${accom.id}`} style={styles.accom}>
                  <Text h1 style={{fontSize: 30}}>{accom.name}</Text>
                  <Text h3 style={{fontSize: 20}}>
                    {'Check In: '+accom.startDate.slice(0, 10) + '\nCheck Out: '+accom.endDate.slice(0, 10)}
                  </Text>
                </View>
              );
            })
          : <Text h1>'No Accommodations Booked'</Text>}
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
  accom : {

  }
})

const mapState = state => ({
  accommodations: state.accommodation.accommodations,
  trip: state.trip.selected
});

const mapDispatch = dispatch => ({
  getAccommodations: tripId => dispatch(getAccommodations(tripId))
});

export default connect(mapState, mapDispatch)(AccommodationsScreen);
