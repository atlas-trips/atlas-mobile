import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

const AccommodationOverview = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.pic} source={require('../assets/images/bed.png')} />
      <Text style={styles.words}>Accommodations:</Text>
      <View style={styles.accommodationContainer}>
        {props.accommodations.filter((item, idx) => idx < 3).map(accom => {
          return (
            <View key={accom.id}>
              <Text style={[styles.words, {textAlign: 'right', fontSize: 10}]}>
                {accom.name} - {(new Date(accom.startDate.slice(0,10))).toString().slice(0,16)}
              </Text>
            </View>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Accommodations')}
      >
        <Text style={[styles.words, {color: '#007ba7', marginLeft: 150, fontSize: 15}]}>...see more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    backgroundColor: '#c55100',
    alignItems: 'center',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 145,
    marginTop: 5,
  },
  pic: {
    width: 300,
    height: 250,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  words: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  accommodationContainer: {
    marginTop: 125,
    marginLeft: 70,
  }
})

export default withNavigation(AccommodationOverview);
