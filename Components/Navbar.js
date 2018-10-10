import React from 'react';
import { withNavigation } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Navbar = (props) => {
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        style={[styles.buttonContainer, {marginRight: 15}]}
        onPress={() => props.navigation.navigate('Dashboard')}
      >
        <Text style={styles.button}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.toggleDrawer()}
      >
        <View style={styles.insideButton}>
          <Text style={styles.button}>More</Text>
          <Image style={styles.pic} source={require('../assets/images/hamburger.png')} />
        </View>
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
    marginRight: 15,
  },
  pic: {
    width: 20,
    height: 20,
    marginTop: 3,
    marginLeft: 2,
  },
  insideButton: {
    display: 'flex',
    flexDirection: 'row',
  }
})


export default withNavigation(Navbar);
