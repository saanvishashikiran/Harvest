import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FarmerStackNav from './Navigation/FarmerStackNav';
import PrickerTabScreens from './Navigation/PickerTabScreens';

export default function App() {

  return (
    <NavigationContainer>
    {/* <PickerTabScreens /> */}
    <FarmerStackNav />
    </NavigationContainer>
  );

}
