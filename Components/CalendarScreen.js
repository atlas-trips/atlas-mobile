import React, {Component} from 'react';
import {getTripCalendar} from '../store/trip';
import {connect} from 'react-redux';
import CalendarActivities from './CalendarActivities';
import CalendarAccommodations from './CalendarAccommodations';
import CalendarTransportation from './CalendarTransportation';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import Navbar from './Navbar';

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSchedule(this.props.trip.id);
  }

  render() {
    const {schedule, trip} = this.props;
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
