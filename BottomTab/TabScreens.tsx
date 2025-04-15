import Home from './Home';
import CandidatesFeed from '../screens/farmer/CandidateFeed';
import Ratings from './Ratings';
import Messages from './Messages';
import { Image } from 'react-native';


type screenType = {
    Home: undefined;
    CandidatesFeed: undefined;
    Ratings: undefined;
    Messages: undefined;
    StackNav: undefined;
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
        tabBarShowLabel: false,
    }}>
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../assets/home.png')}
                  style={{
                    width: 34, 
                    height: 34,
                    tintColor: focused ? '#F6F9F3' : '#BCDAC6',
                    marginTop: 15,
                  }}
                />
              ),
            }}
        />
        <Tab.Screen name ="CandidatesFeed" component = {CandidatesFeed}
        options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../assets/explore.png')}
                  style={{
                    width: 34, 
                    height: 34,
                    tintColor: focused ? '#F6F9F3' : '#BCDAC6',
                    marginTop: 15,
                  }}
                />
              ),
            }}
        />
        <Tab.Screen name ="Ratings" component = {Ratings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/clock.png')}
              style={{
                width: 32, 
                height: 32,
                tintColor: focused ? '#F6F9F3' : '#BCDAC6',
                marginTop: 15,
              }}
            />
          ),
        }}
    />
        <Tab.Screen name ="Messages" component = {Messages}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/user.png')}
              style={{
                width: 36, 
                height: 36,
                tintColor: focused ? '#F6F9F3' : '#BCDAC6',
                marginTop: 15,
              }}
            />
          ),
        }}
    />


    </Tab.Navigator>
  )
}

export default TabScreens
