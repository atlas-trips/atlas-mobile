import React, {Component} from 'react';
import {getTripCalendar} from '../store/trip';
import {connect} from 'react-redux';
import CalendarActivities from './CalendarActivities';
import CalendarAccommodations from './CalendarAccommodations';
import CalendarTransportation from './CalendarTransportation';
import { StyleSheet, Text, View, ScrollView, Button, AsyncStorage } from 'react-native';
import Navbar from './Navbar';

const storeData = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (error) {
    console.log(error);
  }
}

const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error)
  }
}

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offlineSchedule: {},
      offlineTrip: {},
    }
  }

  async componentDidMount() {
    const storedTripString = await retrieveData(`${this.props.trip.name}`);
    if (storedTripString) {
      this.setState({
        offlineTrip: JSON.parse(storedTripString),
      })
    } else {
      await storeData(`${this.props.trip.name}`, JSON.stringify(this.props.trip));
    }
    const storedScheduleString = await retrieveData(`${this.props.trip.name}Schedule`);
    if (storedScheduleString) {
      this.setState({
        offlineSchedule: JSON.parse(storedScheduleString),
      })
    } else {
      await this.props.getSchedule(this.props.trip.id);
      await storeData(`${this.props.trip.name}Schedule`, JSON.stringify(this.props.schedule));
    }
  }

  render() {
    const schedule = this.state.offlineSchedule ? this.state.offlineSchedule : this.props.schedule;
    const trip = this.state.offlineTrip ? this.state.offlineTrip : this.props.trip;
    if (!trip.name) {
      return (
        <View>
          <Navbar />
          <View>
            <Text style={styles.noTrip}>
              You have not yet selected a trip. Please choose one from your
            </Text>
            <Button onPress={() => this.props.navigation.navigate('Dashboard')} title="dashboard."/>
          </View>
        </View>
      )
    }
    return schedule.length ? (
      <View>
        <Navbar />
        <ScrollView>
          {schedule.map((day, i) => {
            return (
              <View key={day.date + i} style={styles.dateContainer}>
                <View style={styles.date}>
                  <Text style={styles.dateText}>{(new Date(day.date)).toString().slice(0, 16)}</Text>
                </View>
                {day.hasOwnProperty('activities') ? (
                  <View>
                    <Text style={styles.sectionTitle}>Activities:</Text>
                    <CalendarActivities activities={day.activities} />
                  </View>
                ) : null}
                {day.hasOwnProperty('accommodations') ? (
                  <View>
                    <Text style={[styles.sectionTitle, {marginRight: 73}]}>Accommodations:</Text>
                    <CalendarAccommodations
                      accommodations={day.accommodations}
                    />
                  </View>
                ) : null}
                {day.hasOwnProperty('transportation') ? (
                  <View>
                    <Text style={[styles.sectionTitle, {marginRight: 96}]}>Transportation:</Text>
                    <CalendarTransportation
                      transportation={day.transportation}
                    />
                  </View>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      </View>
    ) : (
      <View>
        <Navbar />
        <Text>nothing currently scheduled...</Text>
      </View>
    );
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
  dateContainer: {
    alignItems: 'center',
  },
  date: {
    backgroundColor: '#53aad9',
    marginTop: 30,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  dateText: {
    color: 'white',
    fontSize: 30,
  },
  sectionTitle: {
    color: '#c60057',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    marginRight: 150,
  },
})

const mapStateToProps = state => ({
  trip: state.trip.selected,
  schedule: state.trip.tripCalendar
});

const mapDispatchToProps = dispatch => ({
  getSchedule: tripId => dispatch(getTripCalendar(tripId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
