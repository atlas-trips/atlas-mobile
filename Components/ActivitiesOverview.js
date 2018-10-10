import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

const ActivitiesOverview = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.pic} source={require('../assets/images/activity.png')} />
      <Text style={[styles.words, {fontSize: 20}]}>Activities:</Text>
      <View style={styles.activityContainer}>
        {props.activities.filter((item, idx) => idx < 3).map(activity => {
          return (
            <View key={activity.id} >
              <Text style={[styles.words, {textAlign: 'right'}]}>{activity.name}</Text>
            </View>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Activities')}
      >
        <Text style={[styles.words, {color: '#2c02ca', marginLeft: 150}]}>...see more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    backgroundColor: '#c60057',
    alignItems: 'center',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5,
    marginTop: 5,
  },
  pic: {
    width: 300,
    height: 300,
    position: "absolute",
    top: 0,
    right: 0,
  },
  words: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  activityContainer: {
    marginTop: 25,
    marginLeft: 90,
  }
})

export default withNavigation(ActivitiesOverview);
