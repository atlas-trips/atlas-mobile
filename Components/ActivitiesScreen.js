import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchActivities } from '../store/trip';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image, Button } from 'react-native';
import Navbar from './Navbar';
import AppLink from 'react-native-app-link';
const openIcon = require('../assets/images/open.png')


class Activities extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchActivities(this.props.trip.id);
  }

  handlePress(location) {
    AppLink.maybeOpenURL(`https://www.google.com/maps/search/?api=1&query=${location}`, { appName:'Google Maps - Transit & Food', appStoreId: '585027354', appStoreLocale: 'us' })
    .catch((err) => {
      console.log(err)
    });
  }

  render() {
    return this.props.trip.name ? (
      <View>
        <Navbar />
        <View style={styles.header}>
          <Text style={styles.headerText}>Activities List:</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
        {!this.props.trip.activities.length
            ? null
            : this.props.trip.activities.map(activity => {
              return (
                <View key={activity.id}>
                  <TouchableOpacity
                  onPress={() => this.handlePress(activity.location)}
                  >
                <View style={styles.activityContainer}  >
                  <Text style={{fontSize: 20}}>{activity.name}</Text>
                  <Image source={openIcon} style={{height: 25, width: 25}} />
                </View>
                </TouchableOpacity>
                </View>
              );
            })
          }
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


const mapStateToProps = state => ({
  user: state.user,
  trip: state.trip.selected,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchActivities: id => dispatch(fetchActivities(id))
  };
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00adef'
  },

  headerText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  activityContainer: {
    display: 'flex',
    marginTop: 20,
    marginBottom: 20,
    height: 70,
    width: 300,
    borderRadius: 10,
    backgroundColor: '#ddeaff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  noTrip: {
    textAlign: 'center',
    fontSize: 20,
    color: '#53aad9',
    marginBottom: -5,
    marginTop: 15
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
