import React, { Component } from 'react';
import axios from 'axios';
import { Styelsheet, Text, View } from 'react-native';

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      mounted: false
    };
  }

  static navigationOptions = {
    title: 'Welcome to Atlas'
  };

  async componentDidMount() {
    const res = await axios.get('http://atlas-trips.herokuapp.com/api/users');
    const users = res.data;

    this.setState({ users, mounted: true });
  }

  render() {
    return !this.state.mounted ? null : (
      <View>
        {this.state.users.map(user => (
          <Text key={user.id}>{user.email}</Text>
        ))}
      </View>
    );
  }
}

export default UserScreen;
