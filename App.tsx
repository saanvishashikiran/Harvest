import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FarmerPersonalProfile from './components/FarmerPersonalProfile';
import AddPostPage from './components/AddPostPage';
import PickerPersonalProfile from './components/PickerPersonalProfile';

export default function App() {
  return (
       <PickerPersonalProfile />
  );
}

