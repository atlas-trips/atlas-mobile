import React from 'react';
import {getAccommodations} from '../store/accommodation';
import {connect} from 'react-redux';
import { StyleSheet, Text, SafeAreaView, View, Button } from 'react-native';
import Navbar from './Navbar';


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
                <View key={`accom${accom.id}`}>
                  <Text>{accom.name}</Text>
                  <Text>{accom.location}</Text>
                  <Text>
                    {accom.startDate.slice(0, 10)} -{' '}
                    {accom.endDate.slice(0, 10)}
                  </Text>
                </View>
              );
            })
          : <Text>'No Accommodations Booked'</Text>}
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
})

const mapState = state => ({
  accommodations: state.accommodation.accommodations,
  trip: state.trip.selected
});

const mapDispatch = dispatch => ({
  getAccommodations: tripId => dispatch(getAccommodations(tripId))
});

export default connect(mapState, mapDispatch)(AccommodationsScreen);
