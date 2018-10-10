import React from 'react';
import {getAccommodations} from '../store/accommodation';
import {connect} from 'react-redux';
import { StyleSheet, Text, SafeAreaView, Image, View, Button } from 'react-native';
import Navbar from './Navbar';

const hotel = require('../assets/images/hotel.png')

class AccommodationsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const tripId = this.props.trip.id;
    this.props.getAccommodations(tripId);
  }
  render() {
    return this.props.trip.name ? (
      <View>
        <Navbar />
        {this.props.accommodations.length > 0
          ? this.props.accommodations.map(accom => {
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
