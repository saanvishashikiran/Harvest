import Home from './Home';
import CandidatesFeed from './CandidateFeed';
import Ratings from './Ratings';
import Messages from './Messages';
import Ionicons from '@react-native-vector-icons/ionicons';

type screenType = {
    Home: undefined;
    CandidatesFeed: undefined;
    Ratings: undefined;
    Messages: undefined;
};


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<screenType>();

const TabScreens = () => {
  return (
    <Tab.Navigator initialRouteName='CandidatesFeed' screenOptions={{
        tabBarActiveTintColor: "#F6F9F3",
        tabBarInactiveTintColor: "#BCDAC6",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#477943" },
    }}>
        <Tab.Screen name ="Home" component = {Home}/>
        <Tab.Screen name ="CandidatesFeed" component = {CandidatesFeed}/>
        <Tab.Screen name ="Ratings" component = {Ratings}/>
        <Tab.Screen name ="Messages" component = {Messages}/>


    </Tab.Navigator>
  )
}

export default TabScreens
