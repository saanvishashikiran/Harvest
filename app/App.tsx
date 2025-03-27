import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator
 from './AuthNavigator';
const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <AuthNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


