import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';


const CalendarTransportation = props => {
  const {transportation} = props;
  return (
    <View>
      {transportation.map(trans => {
        return (
          <View key={trans.id}>
            <Text style={styles.sectionText}>{trans.name}</Text>
            {trans.users.map((user,i) => <Text style={{marginLeft: 40}} key={i}>{user}</Text>)}
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

export default CalendarTransportation;
