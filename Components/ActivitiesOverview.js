import React from 'react';
import { Styelsheet, Text, SafeAreaView, View } from 'react-native';

const ActivitiesOverview = props => {
  return (
    <SafeAreaView>
      <Text>Activities:</Text>
      {props.activities.filter((item, idx) => idx < 3).map(activity => {
        return (
          <View key={activity.id}>
            <Text>{activity.name}</Text>
          </View>
        );
      })}
      ...
      {/* <Link to="/activities">See more</Link> */}
    </SafeAreaView>
  );
};

export default ActivitiesOverview;
