import React from 'react';
import { withNavigation } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Navbar = (props) => {
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate('Dashboard')}
      >
        <Text style={styles.button}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.toggleDrawer()}
      >
        <Text style={styles.button}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles= StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#007BA7',
    height: 80,
    justifyContent: 'flex-end'
  },
  button: {
    color: 'white',
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 50,
    marginLeft: 8,
    marginRight: 8,
  }
})


export default withNavigation(Navbar);
