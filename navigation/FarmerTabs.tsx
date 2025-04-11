import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import JobsPage from "../screens/farmer/ActivePostsPage";
import AddPage from "../screens/farmer/AddPage";
import EmailPage from "../screens/EmailPage";
import ActivePostsPage from "../screens/farmer/ActivePostsPage";

const Tab = createBottomTabNavigator();

const FarmerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#477943",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ActivePostsPage}
        options={{ 
          tabBarIcon: () => (
            <View style={styles.image}>
              <Image source={require("../assets/home.png")} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddPage}
        options={{
          tabBarIcon: () => (
            <View style={{ marginTop: 25 }}>
              <Image source={require("../assets/feed.png")} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Email"
        component={EmailPage}
        options={{
          tabBarIcon: () => (
            <View style={{ marginTop: 25 }}>
              <Image source={require("../assets/messages.png")} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default FarmerTabs;

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
  },
});
