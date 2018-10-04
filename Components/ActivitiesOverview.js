import React from 'react';
import { Styelsheet, Text, SafeAreaView, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

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
      <Text>...</Text>
      <Button
        title="See more"
        onPress={() => props.navigation.navigate('Activities')}
      />
    </SafeAreaView>
  );
};

export default withNavigation(ActivitiesOverview);
