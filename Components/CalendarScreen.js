import React, {Component} from 'react';
import {getTripCalendar} from '../store/trip';
import {connect} from 'react-redux';
import CalendarActivities from './CalendarActivities';
import CalendarAccommodations from './CalendarAccommodations';
import CalendarTransportation from './CalendarTransportation';
import { Styelsheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import Navbar from './Navbar';

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSchedule(this.props.trip.id);
  }

  render() {
    const {schedule} = this.props;
    return schedule.length ? (
      <View>
        <Navbar />
        <ScrollView>
          {schedule.map((day, i) => {
            return (
              <View key={day.date + i}>
                <View>
                  <Text>{day.date}</Text>
                </View>
                {day.hasOwnProperty('activities') ? (
                  <View>
                    <Text>Activities:</Text>
                    <CalendarActivities activities={day.activities} />
                  </View>
                ) : null}
                {day.hasOwnProperty('accommodations') ? (
                  <View>
                    <Text>New Accommodations:</Text>
                    <CalendarAccommodations
                      accommodations={day.accommodations}
                    />
                  </View>
                ) : null}
                {day.hasOwnProperty('transportation') ? (
                  <View>
                    <Text>Transportation:</Text>
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

const mapStateToProps = state => ({
  trip: state.trip.selected,
  schedule: state.trip.tripCalendar
});

const mapDispatchToProps = dispatch => ({
  getSchedule: tripId => dispatch(getTripCalendar(tripId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
