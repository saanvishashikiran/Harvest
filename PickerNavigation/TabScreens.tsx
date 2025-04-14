import JobsPage from './JobsPage';
import MyJobs from './MyJobs';
import PickerPersonalProfile from './PickerPersonalProfile';
import { Image } from 'react-native';


type screenType = {
    JobsPage: undefined;
    MyJobs: undefined;
    PickerPersonalProfile: undefined;
};


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator<screenType>();

const TabScreens = () => {
  return (
    <Tab.Navigator initialRouteName='JobsPage' screenOptions={{
        tabBarActiveTintColor: "#F6F9F3",
        tabBarInactiveTintColor: "#BCDAC6",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#477943" },
        tabBarShowLabel: false,
    }}>
        <Tab.Screen
            name="JobsPage"
            component={JobsPage}
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
        <Tab.Screen name ="MyJobs" component = {MyJobs}
        options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../assets/feed.png')}
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
        <Tab.Screen name ="PickerPersonalProfile" component = {PickerPersonalProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/ratings.png')}
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

    </Tab.Navigator>
  )
}

export default TabScreens
