import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PickerTabScreens from './Navigation/PickerTabScreens';
import FarmerStackNav from './Navigation/FarmerStackNav';
import TabScreens from './BottomTab/TabScreens';
import StackNav from './BottomTab/StackNav';

export default function App() {

  return (
    <NavigationContainer>
      <PickerTabScreens />
      {/*<FarmerStackNav />*/}
      {/*<StackNav />*/}
    </NavigationContainer>
  );
}
