import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Ratings from './Ratings';
import RateWorker from './RateWorker'; 
import TabScreens from './TabScreens';

export type StackParamList = {
  MainTabs: undefined; // rename from TabScreens to MainTabs (more conventional)
  RateWorker: undefined;
  Ratings: undefined;
};


const Stack = createStackNavigator<StackParamList>();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabScreens} />
      <Stack.Screen name="RateWorker" component={RateWorker} />
      <Stack.Screen name="Ratings" component={Ratings} />
    </Stack.Navigator>
  );
};


export default StackNav

const styles = StyleSheet.create({})