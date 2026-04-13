import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function UpcomingScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Upcoming Screen!</Text>
      </View>
    </SafeAreaView>
  );
}
