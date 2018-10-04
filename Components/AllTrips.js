import React from 'react'
import {connect} from 'react-redux'
import { Styelsheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';


const AllTrips = props => {
  const trips = props.trips

  return !trips.length ? null : (
    <SafeAreaView>
      {trips.map(trip => {
        return (
          <View key={trip.name}>
            <TouchableOpacity
              onPress={() => props.press(trip.id)}
            >
              <Text>{trip.name}</Text>
              <Text>
                {trip.startDate.slice(0, 10)} to {trip.endDate.slice(0, 10)}
              </Text>
            </TouchableOpacity>
          </View>
        )
      })}
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(AllTrips)
