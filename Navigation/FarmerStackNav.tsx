import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Ratings from './screens/farmer/Ratings';
import RateWorker from './screens/ratingComponents/RateWorker'; 
import FarmerTabScreens from './FarmerTabScreens';
import CandidateFeed from './screens/farmer/CandidateFeed';
import { NavigationContainer } from '@react-navigation/native';
import FarmerPost from './screens/jobcomponents/FarmerPost';

export type StackParamList = {
  MainTabs: undefined; 
  RateWorker: undefined;
  Ratings: undefined;
  CandidateFeed: undefined;
  FarmerPost: undefined;
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
        <Stack.Screen name="CandidateFeed" component={CandidateFeed} />
        <Stack.Screen name="FarmerPost" component={FarmerPost} />
      </Stack.Navigator>
  );

};


export default StackNav

const styles = StyleSheet.create({})