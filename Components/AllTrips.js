import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';

const images = {
  vegas: require('../assets/images/vegas.jpg'),
  cancun: require('../assets/images/cancun.jpg'),
}

const AllTrips = props => {
  const trips = props.trips

  return !trips.length ? null : (
    <ScrollView contentContainerStyle={styles.container}>
      {trips.map(trip => {
        const pic = images[trip.name.toLowerCase()]
        return (
          <View key={trip.name} style={styles.tripCard}>
            <TouchableOpacity
              onPress={() => props.press(trip.id)}
              style={styles.tripCardContent}
            >
              <Text style={styles.tripName}>{trip.name}</Text>
              <Image
                source={pic}
                style={{width: 270, height: 180}}
              />
              <View style={styles.dateContainer}>
                <View style={styles.date}>
                  <Text style={styles.dateWhen}>From:</Text>
                  <Text>
                    {(new Date(trip.startDate.slice(0, 10)).toString()).slice(0,16)}
                  </Text>
                </View>
                <View style={styles.separate}/>
                <View style={styles.date}>
                  <Text style={styles.dateWhen}>To:</Text>
                  <Text>
                    {(new Date(trip.endDate.slice(0, 10)).toString()).slice(0,16)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tripCard: {
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: '#004f78',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 4,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  tripName: {
    alignItems: 'center',
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    justifyContent: 'center',
    fontFamily: 'Copperplate'
  },
  tripCardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  dateContainer: {
    width: 250,
    backgroundColor: 'white',
    height: 65,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dateWhen: {
    fontSize: 20,
    color: '#c60057',
  },
  separate: {
    width: 2,
    height: 65,
    backgroundColor: '#ff0f83',
  }
});

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(AllTrips)
