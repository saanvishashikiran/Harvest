import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Ratings from './screens/farmer/Ratings';
import RateWorker from './screens/ratingComponents/RateWorker'; 
import FarmerTabScreens from './FarmerTabScreens';

export type StackParamList = {
  MainTabs: undefined; 
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
      <Stack.Screen name="MainTabs" component={FarmerTabScreens} />
      <Stack.Screen name="RateWorker" component={RateWorker} />
      <Stack.Screen name="Ratings" component={Ratings} />
    </Stack.Navigator>
  );
};


export default StackNav

const styles = StyleSheet.create({})