import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabScreens from './BottomTab/TabScreens';
import StackNav from './BottomTab/StackNav';

export default function App() {

  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
