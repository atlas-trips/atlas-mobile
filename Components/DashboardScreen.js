import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllTrips from './AllTrips';
import { fetchTrips } from '../store/trip';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import Navbar from './Navbar';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchTrips(this.props.user.id);
  }
  render() {
    return (
      <View>
        <Navbar />
        <View>
          {this.props.trips.length > 0 ? (
            <AllTrips trips={this.props.trips}/>
          ) : (
            <View>
              <Navbar />
              <Text style={styles.noTrips}>No Trips Available</Text>
            </View>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  noTrips: {
    fontSize: 35,
    color: '#004f78'
  }
});

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trip.all,
});

const mapDispatch = dispatch => ({
  fetchTrips: id => dispatch(fetchTrips(id)),
});

export default connect(
  mapStateToProps,
  mapDispatch
)(Dashboard);
