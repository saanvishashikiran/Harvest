import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Ratings from './screens/farmer/Ratings';
import RatingPost from "./screens/ratingComponents/RatingPost"
import RateWorker from './screens/ratingComponents/RateWorker'; 
import CandidatesFeed from './screens/farmer/CandidateFeed';
import FarmerPost from './screens/jobcomponents/FarmerPost';
import FarmerTabScreens from './FarmerTabScreens';


export type StackParamList = {
  MainTabs: undefined; 
  RateWorker: undefined;
  Ratings: undefined;
  CandidateFeed: undefined;
  FarmerPost: undefined;
  RatingPost: undefined;
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
      <Stack.Screen name="CandidateFeed" component={CandidatesFeed} />
      <Stack.Screen name="FarmerPost" component={FarmerPost} />
    </Stack.Navigator>
  );
};


export default StackNav

const styles = StyleSheet.create({})