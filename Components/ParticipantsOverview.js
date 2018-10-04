import React from 'react';
import { Styelsheet, Text, SafeAreaView, View } from 'react-native';

const ParticipantsOverview = props => {
  return (
    <SafeAreaView>
      <Text>Who's coming:</Text>
      <View>
        {props.peeps.map(person => {
          return (
            <View key={person.id}>
            <Text>{person.name}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default ParticipantsOverview;
