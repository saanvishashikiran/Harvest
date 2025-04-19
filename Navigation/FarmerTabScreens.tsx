import ActivePostsPage from "./screens/farmer/ActivePostsPage";

import Ratings from "./screens/farmer/Ratings";
import AddPostPage from "./screens/farmer/AddPostPage";
import FarmerPersonalProfile from "./screens/farmer/FarmerPersonalProfile";
import { Image } from "react-native";

type screenType = {
  ActivePostsPage: undefined;

  Ratings: undefined;
  AddPostPage: undefined;
  FarmerPersonalProfile: undefined;
};

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator<screenType>();

const FarmerTabScreens = () => {
  return (
    <Tab.Navigator
      initialRouteName="ActivePostsPage"
      screenOptions={{
        tabBarActiveTintColor: "#F6F9F3",
        tabBarInactiveTintColor: "#BCDAC6",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#477943" },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="ActivePostsPage"
        component={ActivePostsPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/home.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#F6F9F3" : "#BCDAC6",
                marginTop: 15,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ratings"
        component={Ratings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/clock.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#F6F9F3" : "#BCDAC6",
                marginTop: 15,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPostPage"
        component={AddPostPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/feed.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#F6F9F3" : "#BCDAC6",
                marginTop: 15,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FarmerPersonalProfile"
        component={FarmerPersonalProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/user.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#F6F9F3" : "#BCDAC6",
                marginTop: 15,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default FarmerTabScreens;
