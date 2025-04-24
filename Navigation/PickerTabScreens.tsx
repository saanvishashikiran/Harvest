import JobsPage from "./screens/picker/JobsPage";
import MyJobs from "./screens/picker/MyJobsPage";
import PickerPersonalProfile from "./screens/picker/PickerPersonalProfile";
import { Image } from "react-native";

type screenType = {
  JobsPage: undefined;
  MyJobs: undefined;
  PickerPersonalProfile: undefined;
};

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator<screenType>();

const PickerTabScreens = () => {
  return (
    <Tab.Navigator
      initialRouteName="JobsPage"
      screenOptions={{
        tabBarActiveTintColor: "#F6F9F3",
        tabBarInactiveTintColor: "#BCDAC6",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#477943" },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="JobsPage"
        component={JobsPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/home.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#F6F9F3" : "#BCDAC6",
                marginTop: 20,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyJobs"
        component={MyJobs}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/briefcase.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#F6F9F3" : "#BCDAC6",
                marginTop: 20,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PickerPersonalProfile"
        component={PickerPersonalProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/user.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#F6F9F3" : "#BCDAC6",
                marginTop: 20,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default PickerTabScreens;
