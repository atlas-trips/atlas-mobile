import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchActivities } from '../store/trip';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import Navbar from './Navbar';
import AppLink from 'react-native-app-link';


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
    return (
      <View>
        <Navbar />
          <View >
            <Text>Activities List:</Text>
              {!this.props.trip.activities.length
                ? null
                : this.props.trip.activities.map(activity => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.handlePress(activity.location)}
                        key={activity.id}
                      >
                        <Text>{activity.name}</Text>
                      </TouchableOpacity>
                    );
                })
              }
          </View>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
