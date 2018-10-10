import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchActivities } from '../store/trip';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
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
    return (
      <View >
        <Navbar />
        <View style={styles.header}>
          <Text style={styles.headerText}>Activities List:</Text>
        </View>
        <View styles={styles.container}>
        {!this.props.trip.activities.length
            ? null
            : this.props.trip.activities.map(activity => {
              return (       
                <TouchableOpacity
                  onPress={() => this.handlePress(activity.location)}
                  key={activity.id}
                  style={styles.activity}
                >
                  <Text style={{fontSize: 20}}>{activity.name}</Text>
                  <Image source={openIcon} style={{height: 20, width: 20}} />
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00adef'
  },
  activity: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '70%'
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
