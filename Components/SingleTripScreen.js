import React from 'react'
import { StyleSheet, Text, SafeAreaView, View, Button} from 'react-native';
import ParticipantsOverview from './ParticipantsOverview'
import ActivitiesOverview from './ActivitiesOverview'
import AccommodationOverview from './AccommodationOverview'
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

const SingleTrip = props => {
  const trip = props.trip
  return trip.name ? (
    <SafeAreaView>
      <Text>
        {trip.name}: {trip.startDate.slice(0, 10)} to{' '}
        {trip.endDate.slice(0, 10)}
      </Text>
      <View>
        <ParticipantsOverview peeps={trip.users} />
        <ActivitiesOverview activities={trip.activities} />
        <AccommodationOverview accommodations={trip.accommodation} />
      </View>
    </SafeAreaView>
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

const styles = StyleSheet.create({
  noTrip: {
    textAlign: 'center',
    fontSize: 20,
    color: '#53aad9',
    marginBottom: -5,
    marginTop: 15
  }
})

const mapStateToProps = state => ({
  trip: state.trip.selected,
})

export default withNavigation(connect(mapStateToProps)(SingleTrip));
