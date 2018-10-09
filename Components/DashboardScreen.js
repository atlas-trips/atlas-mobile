import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllTrips from './AllTrips';
import SingleTrip from './SingleTrip';
import { fetchTrips, fetchSelected } from '../store/trip';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import Navbar from './Navbar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.handlePress = this.handlePress.bind(this);
  }
  componentDidMount() {
    this.props.fetchTrips(this.props.user.id);
  }

  async handlePress(id) {
    await this.props.fetchSelected(id);
    this.setState({ selected: true });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Navbar />
        <View>
          {this.props.trips.length > 0 ? (
            <AllTrips trips={this.props.trips}/>
          ) : (
            <SafeAreaView>
              <Text>No Trips Available</Text>
            </SafeAreaView>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trip.all,
  selected: state.trip.selected
});

const mapDispatch = dispatch => ({
  fetchTrips: id => dispatch(fetchTrips(id)),
  fetchSelected: tripId => dispatch(fetchSelected(tripId))
});

export default connect(
  mapStateToProps,
  mapDispatch
)(Dashboard);
