import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';

const CalendarActivities = props => {
  const {activities} = props;
  return (
    <View>
      {activities.map(act => {
        return (
          <View key={act.id}>
            <Text style={styles.sectionText}>{act.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionText: {
    marginLeft: 20,
    color: '#004f78'
  }
})

export default CalendarActivities;
