import React from 'react';
import { Styelsheet, Text, SafeAreaView, View, ScrollView } from 'react-native';

const CalendarAccommodations = props => {
  const {accommodations} = props;
  return (
    <View>
      {accommodations.map(acc => {
        return (
          <View key={acc.id}>
            <Text>{acc.name}</Text>
            {acc.users.map((user,i) => <Text key={i}>{user}</Text>)}
          </View>
        );
      })}
    </View>
  );
};

export default CalendarAccommodations;
