import React from 'react';
import { Styelsheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

const AccommodationOverview = props => {
  return (
    <View>
      <Text>Accommodations:</Text>
      {props.accommodations.filter((item, idx) => idx < 3).map(accom => {
        return (
          <View key={accom.id}>
            <Text>{accom.name} - {accom.startDate.slice(0,10)}</Text>
          </View>
        );
      })}
      <Text>...</Text>
      <Button
        onPress={() => props.navigation.navigate('Accommodations')}
        title='See more'
      />
    </View>
  );
};

export default withNavigation(AccommodationOverview);
