import React from 'react';
import { Styelsheet, Text, SafeAreaView, View, ScrollView } from 'react-native';


const CalendarTransportation = props => {
  const {transportation} = props;
  return (
    <View>
      {transportation.map(trans => {
        return (
          <View key={trans.id}>
            <Text>{trans.name}</Text>
            {trans.users.map((user,i) => <Text key={i}>{user}</Text>)}
          </View>
        );
      })}
    </View>
  );
};

export default CalendarTransportation;
