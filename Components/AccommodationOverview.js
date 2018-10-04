import React from 'react';
import { Styelsheet, Text, SafeAreaView, View } from 'react-native';

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
      ...
      {/* <Link to="/accommodations">See more</Link> */}
    </View>
  );
};

export default AccommodationOverview;
