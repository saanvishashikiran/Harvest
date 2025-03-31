import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabScreens from './BottomTab/TabScreens';
// import ProfileButton from './BottomTab/ProfileButton';

export default function App() {

  return (
    <NavigationContainer>
      <TabScreens />
    </NavigationContainer>
  );
}