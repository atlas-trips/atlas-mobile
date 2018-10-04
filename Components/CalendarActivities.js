import React from 'react';
import { Styelsheet, Text, SafeAreaView, View, ScrollView } from 'react-native';

const CalendarActivities = props => {
  const {activities} = props;
  return (
    <View>
      {activities.map(act => {
        return (
          <View key={act.id}>
            <Text>{act.name}</Text>
            {act.users.map((user, i) => <Text key={i}>{user}</Text>)}
          </View>
        );
      })}
    </View>
  );
};

export default CalendarActivities;
