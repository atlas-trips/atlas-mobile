import React, { Component } from 'react';
import axios from 'axios';
import { Styelsheet, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      mounted: false,
    };
  }

  async componentDidMount() {
    const res = await axios.get('http://atlas-trips.herokuapp.com/api/users');
    const users = res.data;

    this.setState({ users, mounted: true });
  }

  render() {
    return !this.state.mounted ? null : (
      <SafeAreaView>
        <Text>WHAT UP {this.props.user.name}</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserScreen);
