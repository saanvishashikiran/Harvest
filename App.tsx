import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Tabs from "./components/Tabs"
import FarmerPersonalProfile from './components/FarmerPersonalProfile';
import JobsPage from './components/JobsPage';
import PickerPersonalProfile from './components/PickerPersonalProfile';
import AddPostPage from './components/AddPostPage';



export default function App() {
  return (
    <NavigationContainer>
      <AddPostPage />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

