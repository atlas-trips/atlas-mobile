import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const ParticipantsOverview = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.pic} source={require('../assets/images/people.png')} />
      <Text style={styles.words}>Who's coming:</Text>
      <View style={styles.nameContainer}>
        {props.peeps.map(person => {
          return (
            <View key={person.id} style={styles.namesInnerContainer}>
              <Text style={styles.words}>{person.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    backgroundColor: '#53aad9',
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
    width: 250,
    height: 300,
    position: "absolute",
    top: 0,
    right: 0,
  },
  words: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameContainer: {
    marginTop: 100,
  },
  namesInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 3,
    marginRight: 160,
  }
})

export default ParticipantsOverview;
