import React from 'react';
import {getAccommodations} from '../store/accommodation';
import {connect} from 'react-redux';
import { Styelsheet, Text, SafeAreaView, View } from 'react-native';
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
    return (
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
          : 'No Accommodations Booked'}
      </View>
    );
  }
}

const mapState = state => ({
  accommodations: state.accommodation.accommodations,
  trip: state.trip.selected
});

const mapDispatch = dispatch => ({
  getAccommodations: tripId => dispatch(getAccommodations(tripId))
});

export default connect(mapState, mapDispatch)(AccommodationsScreen);
