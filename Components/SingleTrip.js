import React from 'react'
import { Styelsheet, Text, SafeAreaView, View} from 'react-native';
import ParticipantsOverview from './ParticipantsOverview'
import ActivitiesOverview from './ActivitiesOverview'
import AccommodationOverview from './AccommodationOverview'

const SingleTrip = props => {
  const trip = props.trip
  return (
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
  )
}

export default SingleTrip;
