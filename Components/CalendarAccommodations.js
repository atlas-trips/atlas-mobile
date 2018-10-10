import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';

const CalendarAccommodations = props => {
  const {accommodations} = props;
  return (
    <View>
      {accommodations.map(acc => {
        return (
          <View key={acc.id} style={styles.sectionInner}>
            <Text style={styles.sectionText}>{acc.name}</Text>
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

export default CalendarAccommodations;
