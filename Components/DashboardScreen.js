import React, { Component } from 'react'
import {connect} from 'react-redux'
import AllTrips from './AllTrips'
import SingleTrip from './SingleTrip'
import {fetchTrips, fetchSelected} from '../store/trip'
import { Styelsheet, Text, SafeAreaView, View } from 'react-native';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
    }
    this.handlePress = this.handlePress.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchTrips(this.props.user.id);
  }

  async handlePress(id) {
    await this.props.fetchSelected(id)
    this.setState({selected: true})
  }

  render() {
    const {user} = this.props
    const { navigate } = this.props.navigation;
    if (this.props.trips.length > 0) {
      return (
        <SafeAreaView>
          {this.state.selected ? (
            <View>
              <Text>{user.name}'s Trip:</Text>
              <SingleTrip trip={this.props.selected} />
            </View>
          ) : (
            <AllTrips trips={this.props.trips} press={this.handlePress} />
          )}
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView>
          <Text>No Trips Available</Text>
        </SafeAreaView>
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trip.all,
  selected: state.trip.selected
})

const mapDispatch = dispatch => ({
  fetchTrips: id => dispatch(fetchTrips(id)),
  fetchSelected: tripId => dispatch(fetchSelected(tripId))
})

export default connect(mapStateToProps, mapDispatch)(Dashboard)
